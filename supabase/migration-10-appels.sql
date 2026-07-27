-- ============================================================
-- Migration 10 : Appels de planification (créneaux horaires + paiement)
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

-- 1) Créneaux ouverts par l'admin (date + heure). Aucune donnée client.
create table if not exists public.call_slots (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null,
  created_at timestamptz not null default now(),
  unique (date, time)
);
alter table public.call_slots enable row level security;

drop policy if exists "call_slots visibles par tous" on public.call_slots;
create policy "call_slots visibles par tous" on public.call_slots
  for select using (true);
drop policy if exists "admin ajoute des créneaux" on public.call_slots;
create policy "admin ajoute des créneaux" on public.call_slots
  for insert with check (public.is_admin());
drop policy if exists "admin supprime des créneaux" on public.call_slots;
create policy "admin supprime des créneaux" on public.call_slots
  for delete using (public.is_admin());

-- 2) Réservations d'appel (données du formulaire → admin uniquement)
create table if not exists public.call_bookings (
  id uuid primary key default gen_random_uuid(),
  slot_date date not null,
  slot_time text not null,
  name text not null,
  group_size integer,
  arrival date,
  departure date,
  phone text,
  email text,
  has_tickets boolean,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  amount_paid integer default 0,
  stripe_session_id text,
  cancel_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);
alter table public.call_bookings enable row level security;

drop policy if exists "admin lit les réservations d'appel" on public.call_bookings;
create policy "admin lit les réservations d'appel" on public.call_bookings
  for select using (public.is_admin());
drop policy if exists "admin modifie les réservations d'appel" on public.call_bookings;
create policy "admin modifie les réservations d'appel" on public.call_bookings
  for update using (public.is_admin());
drop policy if exists "admin supprime les réservations d'appel" on public.call_bookings;
create policy "admin supprime les réservations d'appel" on public.call_bookings
  for delete using (public.is_admin());

-- 3) Vue publique : créneaux libres (ouverts, à venir, non réservés). Aucune donnée client.
create or replace view public.call_free_slots
with (security_invoker = off) as
  select s.id, s.date, s.time
  from public.call_slots s
  where s.date >= current_date
    and not exists (
      select 1 from public.call_bookings b
      where b.slot_date = s.date and b.slot_time = s.time
        and b.status <> 'cancelled'
    );

-- 4) RPC : créer une réservation d'appel (visiteur anonyme, statut « pending »)
create or replace function public.create_call_booking(
  p_date date,
  p_time text,
  p_name text,
  p_group_size integer,
  p_arrival date,
  p_departure date,
  p_phone text,
  p_email text,
  p_has_tickets boolean
)
returns json
language plpgsql security definer
set search_path = public
as $$
declare
  v_booking public.call_bookings;
begin
  if not exists (select 1 from public.call_slots s where s.date = p_date and s.time = p_time) then
    raise exception 'SLOT_UNAVAILABLE';
  end if;
  if exists (
    select 1 from public.call_bookings b
    where b.slot_date = p_date and b.slot_time = p_time and b.status <> 'cancelled'
  ) then
    raise exception 'SLOT_ALREADY_BOOKED';
  end if;
  if p_date < current_date then
    raise exception 'DATE_IN_PAST';
  end if;

  insert into public.call_bookings (slot_date, slot_time, name, group_size, arrival, departure, phone, email, has_tickets)
  values (p_date, p_time, p_name, p_group_size, p_arrival, p_departure, p_phone, p_email, p_has_tickets)
  returning * into v_booking;

  return json_build_object('id', v_booking.id, 'cancel_token', v_booking.cancel_token);
end;
$$;

-- 5) Droits d'accès (la sécurité réelle vient des policies RLS ci-dessus)
grant select, insert, update, delete on public.call_slots to anon, authenticated;
grant select, insert, update, delete on public.call_bookings to anon, authenticated;
grant select on public.call_free_slots to anon, authenticated;
grant execute on function public.create_call_booking to anon, authenticated;
