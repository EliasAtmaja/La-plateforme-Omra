-- ============================================================
-- MIGRATION 17 — Frais de service en POURCENTAGE
-- Les frais de service ne sont plus un montant fixe par guide,
-- mais un pourcentage appliqué au prix du guide pour l'activité
-- choisie (le prix variant d'une activité à l'autre).
--
--   Ex. guide à 20 % :
--     Omra PMR       → 100 € guide + 20 € de frais
--     Omra classique →  50 € guide + 10 € de frais
--
-- L'ancienne colonne service_price est conservée (historique des
-- réservations déjà payées) mais n'est plus utilisée par le site.
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

alter table public.guides
  add column if not exists service_percent integer not null default 0
  check (service_percent >= 0 and service_percent <= 100);
