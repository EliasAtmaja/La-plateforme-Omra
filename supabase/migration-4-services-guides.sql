-- Migration 4 : affectation des guides à des services (activités).
-- L'admin choisit les services que chaque guide propose (ex. Omra Privé
-- Premium PMR) ; le site ne propose alors que les guides affectés.
-- À exécuter dans le SQL Editor de Supabase.

alter table public.guides
  add column if not exists services text[] not null default '{}';
