-- ============================================================
-- LA PLATEFORME OMRA — Schéma Supabase + sécurité RLS
-- À coller intégralement dans : Supabase → SQL Editor → Run
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- ADMINS
-- Table des administrateurs (référence les comptes Supabase Auth).
-- Après avoir créé ton utilisateur admin (Authentication → Add user),
-- exécute :  insert into public.app_admins
--            select id from auth.users where email = 'TON_EMAIL';
-- ============================================================
create table public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.app_admins enable row level security;

create policy "admin peut se voir lui-même" on public.app_admins
  for select using (auth.uid() = user_id);

-- Helper : l'utilisateur courant est-il admin ?
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.app_admins where user_id = auth.uid());
$$;

-- ============================================================
-- GUIDES
-- ============================================================
create table public.guides (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  first_name text not null,
  last_name text not null,
  city text not null check (city in ('medina', 'mecca')),
  photo text,
  diploma text,
  description text,
  languages text[] not null default '{}',
  price_per_day integer not null default 0,
  login text unique,
  created_at timestamptz not null default now()
);
alter table public.guides enable row level security;

create policy "guides visibles par tous" on public.guides
  for select using (true);
create policy "admin crée les guides" on public.guides
  for insert with check (public.is_admin());
create policy "admin modifie les guides" on public.guides
  for update using (public.is_admin());
create policy "admin supprime les guides" on public.guides
  for delete using (public.is_admin());

-- ============================================================
-- DISPONIBILITÉS (une ligne = un jour disponible pour un guide)
-- ============================================================
create table public.availability (
  guide_id uuid not null references public.guides(id) on delete cascade,
  date date not null,
  primary key (guide_id, date)
);
alter table public.availability enable row level security;

create policy "disponibilités visibles par tous" on public.availability
  for select using (true);
create policy "guide ou admin ajoute ses dispos" on public.availability
  for insert with check (
    public.is_admin()
    or exists (select 1 from public.guides g where g.id = guide_id and g.auth_user_id = auth.uid())
  );
create policy "guide ou admin retire ses dispos" on public.availability
  for delete using (
    public.is_admin()
    or exists (select 1 from public.guides g where g.id = guide_id and g.auth_user_id = auth.uid())
  );

-- ============================================================
-- AVIS
-- Créés par n'importe qui (toujours en attente), publics uniquement
-- une fois approuvés par l'admin.
-- ============================================================
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid references public.guides(id) on delete cascade,
  name text not null,
  text text not null,
  stars integer not null check (stars between 1 and 5),
  service text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;

create policy "avis approuvés publics, tout pour admin" on public.reviews
  for select using (status = 'approved' or public.is_admin());
create policy "tout le monde peut soumettre un avis en attente" on public.reviews
  for insert with check (status = 'pending');
create policy "admin modère les avis" on public.reviews
  for update using (public.is_admin());
create policy "admin supprime les avis" on public.reviews
  for delete using (public.is_admin());

-- ============================================================
-- RÉSERVATIONS
-- Contiennent des données client : lisibles uniquement par l'admin
-- et par le guide concerné. Le public ne voit que les dates occupées
-- via la vue booked_dates. Les visiteurs anonymes créent/annulent
-- leurs réservations via les fonctions RPC ci-dessous (jeton secret).
-- ============================================================
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.guides(id) on delete cascade,
  date date not null,
  slot text,
  activity_slug text,
  activity_name text,
  client_name text,
  client_email text,
  client_phone text,
  status text not null default 'confirmed'
    check (status in ('confirmed', 'pending-refusal', 'reassigned')),
  refusal_reason text,
  refusal_date timestamptz,
  replacement_of text,
  cancel_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);
-- Un guide ne peut avoir qu'une réservation active par jour
create unique index bookings_one_active_per_day
  on public.bookings (guide_id, date)
  where status <> 'reassigned';

alter table public.bookings enable row level security;

create policy "réservations lisibles par admin et guide concerné" on public.bookings
  for select using (
    public.is_admin()
    or exists (select 1 from public.guides g where g.id = guide_id and g.auth_user_id = auth.uid())
  );
create policy "guide concerné ou admin modifie (refus, réassignation)" on public.bookings
  for update using (
    public.is_admin()
    or exists (select 1 from public.guides g where g.id = guide_id and g.auth_user_id = auth.uid())
  );
create policy "admin insère (réassignations)" on public.bookings
  for insert with check (public.is_admin());
create policy "admin supprime" on public.bookings
  for delete using (public.is_admin());

-- Vue publique : uniquement les dates occupées (aucune donnée client)
create view public.booked_dates
with (security_invoker = off) as
  select guide_id, date
  from public.bookings
  where status <> 'reassigned';

-- RPC : créer une réservation (visiteur anonyme).
-- Vérifie la disponibilité et renvoie l'id + le jeton d'annulation.
create or replace function public.create_booking(
  p_guide_id uuid,
  p_date date,
  p_slot text default null,
  p_activity_slug text default null,
  p_activity_name text default null
)
returns json
language plpgsql security definer
set search_path = public
as $$
declare
  v_booking public.bookings;
begin
  if not exists (select 1 from public.availability a where a.guide_id = p_guide_id and a.date = p_date) then
    raise exception 'DATE_UNAVAILABLE';
  end if;
  if exists (select 1 from public.bookings b where b.guide_id = p_guide_id and b.date = p_date and b.status <> 'reassigned') then
    raise exception 'DATE_ALREADY_BOOKED';
  end if;
  if p_date < current_date then
    raise exception 'DATE_IN_PAST';
  end if;

  insert into public.bookings (guide_id, date, slot, activity_slug, activity_name)
  values (p_guide_id, p_date, nullif(trim(coalesce(p_slot, '')), ''), p_activity_slug, p_activity_name)
  returning * into v_booking;

  return json_build_object('id', v_booking.id, 'cancel_token', v_booking.cancel_token);
end;
$$;

-- RPC : annuler une réservation avec son jeton (retrait du panier)
create or replace function public.cancel_booking(p_booking_id uuid, p_token uuid)
returns boolean
language plpgsql security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  delete from public.bookings
  where id = p_booking_id and cancel_token = p_token and status = 'confirmed';
  get diagnostics v_count = row_count;
  return v_count > 0;
end;
$$;

-- ============================================================
-- DEMANDES DE PLANIFICATION (formulaire public, lecture admin)
-- ============================================================
create table public.planif_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  group_size integer,
  arrival date,
  departure date,
  phone text,
  email text,
  created_at timestamptz not null default now()
);
alter table public.planif_requests enable row level security;

create policy "tout le monde peut envoyer une demande planif" on public.planif_requests
  for insert with check (true);
create policy "admin lit les demandes planif" on public.planif_requests
  for select using (public.is_admin());
create policy "admin supprime les demandes planif" on public.planif_requests
  for delete using (public.is_admin());

-- ============================================================
-- DEMANDES DE VISA (contient des numéros de passeport : admin only)
-- ============================================================
create table public.visa_requests (
  id uuid primary key default gen_random_uuid(),
  visa_type text not null,
  name text not null,
  country text,
  passport text,
  arrival date,
  departure date,
  created_at timestamptz not null default now()
);
alter table public.visa_requests enable row level security;

create policy "tout le monde peut envoyer une demande visa" on public.visa_requests
  for insert with check (true);
create policy "admin lit les demandes visa" on public.visa_requests
  for select using (public.is_admin());
create policy "admin supprime les demandes visa" on public.visa_requests
  for delete using (public.is_admin());

-- ============================================================
-- DROITS D'ACCÈS API
-- (« Automatically expose new tables » est désactivé : on expose
-- explicitement — la sécurité réelle est assurée par les policies RLS)
-- ============================================================
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant select on public.booked_dates to anon, authenticated;
grant execute on all functions in schema public to anon, authenticated;
