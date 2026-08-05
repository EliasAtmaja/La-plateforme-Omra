-- ============================================================
-- MIGRATION 14 — Disponibilités par ACTIVITÉ
-- Chaque guide gère désormais un calendrier distinct pour chacune
-- des activités que l'admin lui a assignées.
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

-- 1. Nouvelle colonne (les lignes existantes prennent '' = « toutes activités »)
alter table public.availability
  add column if not exists activity_slug text not null default '';

-- 2. La clé primaire devient (guide, activité, date)
alter table public.availability drop constraint if exists availability_pkey;
alter table public.availability add primary key (guide_id, activity_slug, date);

-- 3. Reprise de l'existant : chaque jour « toutes activités » est recopié
--    sur chacune des activités du guide, puis l'ancienne ligne est supprimée.
insert into public.availability (guide_id, activity_slug, date, slots)
select a.guide_id, s.slug, a.date, a.slots
from public.availability a
join public.guides g on g.id = a.guide_id
cross join lateral (
  select distinct t.slug
  from (
    select jsonb_object_keys(coalesce(g.activity_prices, '{}'::jsonb)) as slug
    union all
    select unnest(coalesce(g.services, '{}')) as slug
  ) t
  where t.slug is not null and t.slug <> ''
) s
where a.activity_slug = ''
on conflict (guide_id, activity_slug, date) do nothing;

delete from public.availability where activity_slug = '';

-- 4. RPC de réservation : la disponibilité est cherchée sur l'activité demandée.
--    (une réservation reste bloquante pour TOUTES les activités du guide :
--     le guide ne peut pas être à deux endroits sur le même créneau)
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
  where a.guide_id = p_guide_id
    and a.date = p_date
    and (p_activity_slug is null or a.activity_slug = p_activity_slug)
  order by (a.activity_slug = coalesce(p_activity_slug, '')) desc
  limit 1;

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
grant select, insert, update, delete on public.availability to anon, authenticated;
