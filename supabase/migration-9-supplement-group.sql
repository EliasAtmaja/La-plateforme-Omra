-- Supplément appliqué quand le groupe est de 7 à 10 personnes.
-- Ajouté au (prix du guide + prix du service) pour les activités concernées.
ALTER TABLE public.guides
  ADD COLUMN IF NOT EXISTS supplement_7_10 integer DEFAULT 0;
