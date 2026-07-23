-- Sépare le prix en deux : prix du guide (payé sur place) + prix du service (payé en ligne)
ALTER TABLE public.guides
  ADD COLUMN IF NOT EXISTS service_price integer DEFAULT 0;

-- Renomme pour clarté : price_per_day = prix du guide (sur place)
COMMENT ON COLUMN public.guides.price_per_day IS 'Prix du guide — payé sur place';
COMMENT ON COLUMN public.guides.service_price IS 'Prix du service — payé en ligne';
