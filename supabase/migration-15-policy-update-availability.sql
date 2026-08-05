-- ============================================================
-- MIGRATION 15 — Policy UPDATE manquante sur availability
-- L'enregistrement des disponibilités se fait par UPSERT
-- (INSERT ... ON CONFLICT DO UPDATE). Sans policy UPDATE, RLS
-- refuse la partie « DO UPDATE » :
--   new row violates row-level security policy (USING expression)
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

drop policy if exists "guide ou admin modifie ses dispos" on public.availability;

create policy "guide ou admin modifie ses dispos" on public.availability
  for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.guides g
      where g.id = availability.guide_id and g.auth_user_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.guides g
      where g.id = availability.guide_id and g.auth_user_id = auth.uid()
    )
  );
