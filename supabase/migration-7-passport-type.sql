-- Ajoute le type de passeport (Européen / Non européen) aux demandes de visa
ALTER TABLE public.visa_requests
  ADD COLUMN IF NOT EXISTS passport_type text;
