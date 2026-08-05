-- Accorder les droits de lecture sur app_admins à service_role
-- (nécessaire pour que les Edge Functions puissent vérifier si un user est admin)
GRANT SELECT ON public.app_admins TO service_role;
