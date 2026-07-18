-- ============================================================
-- MIGRATION 2 — Créneaux (Matin / Après-midi / Soir / Nuit)
-- À coller dans Supabase → SQL Editor → Run
-- (après avoir déjà exécuté schema.sql)
-- ============================================================

-- 1. Disponibilités : chaque jour disponible porte la liste de ses créneaux
--    (par défaut : les 4 créneaux de la journée)
alter table public.availability
  add column if not exists slots text[] not null default '{"Matin","Après-midi","Soir","Nuit"}';

-- 2. Réservations : champ « vu par le guide »
alter table public.bookings
  add column if not exists seen boolean not null default false;

-- 3. Une réservation par CRÉNEAU (et plus par jour entier)
drop index if exists bookings_one_active_per_day;
create unique index if not exists bookings_one_active_per_slot
  on public.bookings (guide_id, date, slot)
  where status <> 'reassigned';

-- 4. La vue publique expose aussi le créneau réservé (toujours aucune donnée client)
drop view if exists public.booked_dates;
create view public.booked_dates
with (security_invoker = off) as
  select guide_id, date, slot
  from public.bookings
  where status <> 'reassigned';
grant select on public.booked_dates to anon, authenticated;

-- 5. RPC de réservation : vérifie le créneau précis
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
  v_slots text[];
begin
  if p_slot is null or not (p_slot = any (array['Matin','Après-midi','Soir','Nuit'])) then
    raise exception 'INVALID_SLOT';
  end if;
  if p_date < current_date then
    raise exception 'DATE_IN_PAST';
  end if;

  select a.slots into v_slots
  from public.availability a
  where a.guide_id = p_guide_id and a.date = p_date;

  if v_slots is null or not (p_slot = any (v_slots)) then
    raise exception 'SLOT_UNAVAILABLE';
  end if;

  if exists (
    select 1 from public.bookings b
    where b.guide_id = p_guide_id and b.date = p_date
      and (b.slot = p_slot or b.slot is null)
      and b.status <> 'reassigned'
  ) then
    raise exception 'SLOT_ALREADY_BOOKED';
  end if;

  insert into public.bookings (guide_id, date, slot, activity_slug, activity_name)
  values (p_guide_id, p_date, p_slot, p_activity_slug, p_activity_name)
  returning * into v_booking;

  return json_build_object('id', v_booking.id, 'cancel_token', v_booking.cancel_token);
end;
$$;

grant execute on all functions in schema public to anon, authenticated;
