-- ============================================================
-- Migration 11 : droits manquants pour le rôle service_role
-- (utilisé par les Edge Functions / webhook Stripe).
-- Sans ça, le webhook ne peut pas marquer un appel comme « payé ».
-- À coller dans : Supabase → SQL Editor → Run
-- ============================================================

grant select, insert, update, delete on public.call_slots to service_role;
grant select, insert, update, delete on public.call_bookings to service_role;
grant select on public.call_free_slots to service_role;

-- Par sécurité, on (ré)affirme aussi les droits sur les tables historiques
grant select, insert, update, delete on public.bookings to service_role;
grant select on public.guides to service_role;
