-- Migration 6 : Stripe payments
-- Ajouter dans Supabase → SQL Editor → Run

-- Nouveaux statuts pour le paiement
ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_status_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending', 'confirmed', 'paid', 'pending-refusal', 'reassigned'));

-- Colonne pour stocker l'ID de session Stripe
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS stripe_session_id text;

-- Colonne pour le montant payé (en centimes)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS amount_paid integer DEFAULT 0;

-- Par défaut les nouvelles réservations sont "pending" (en attente de paiement)
ALTER TABLE public.bookings
  ALTER COLUMN status SET DEFAULT 'pending';
