-- ============================================================
-- Migration 12 : prix du guide par activité
-- Chaque guide peut avoir un prix différent selon l'activité.
-- Stocké en JSONB : { "omra-classique": 150, "visite-historique-medine": 200 }
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

alter table public.guides
  add column if not exists activity_prices jsonb not null default '{}'::jsonb;

-- (Reprise) : pour les guides existants, on initialise le prix de chaque
-- activité déjà proposée (colonne services) avec l'ancien price_per_day.
update public.guides g
set activity_prices = (
  select coalesce(jsonb_object_agg(s, to_jsonb(g.price_per_day)), '{}'::jsonb)
  from unnest(coalesce(g.services, '{}')) as s
)
where (g.activity_prices = '{}'::jsonb or g.activity_prices is null)
  and coalesce(array_length(g.services, 1), 0) > 0;
