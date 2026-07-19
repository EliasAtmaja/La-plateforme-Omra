-- Migration 3 : champ « J'ai déjà mes billets d'avion » sur les demandes
-- Conseils & Optimisation (formulaire planification).
-- À exécuter dans le SQL Editor de Supabase.

alter table public.planif_requests
  add column if not exists has_tickets boolean;
