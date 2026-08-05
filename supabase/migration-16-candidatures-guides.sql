-- ============================================================
-- MIGRATION 16 — Candidatures « Devenir guide »
-- Le formulaire /rejoindre/ écrivait dans une table qui n'existait pas :
-- l'insertion échouait, d'où le bouton qui « ne faisait rien ».
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

create table if not exists public.guide_applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  city text,
  languages text,
  experience text,
  status text not null default 'new' check (status in ('new', 'seen', 'archived')),
  created_at timestamptz not null default now()
);
alter table public.guide_applications enable row level security;

-- N'importe qui peut postuler ; seul l'admin lit et gère les candidatures.
drop policy if exists "tout le monde peut postuler" on public.guide_applications;
create policy "tout le monde peut postuler" on public.guide_applications
  for insert with check (true);

drop policy if exists "admin lit les candidatures" on public.guide_applications;
create policy "admin lit les candidatures" on public.guide_applications
  for select using (public.is_admin());

drop policy if exists "admin modifie les candidatures" on public.guide_applications;
create policy "admin modifie les candidatures" on public.guide_applications
  for update using (public.is_admin());

drop policy if exists "admin supprime les candidatures" on public.guide_applications;
create policy "admin supprime les candidatures" on public.guide_applications
  for delete using (public.is_admin());

grant select, insert, update, delete on public.guide_applications to anon, authenticated;
-- L'Edge Function d'envoi d'email lit la candidature avec la clé service_role
grant select on public.guide_applications to service_role;
