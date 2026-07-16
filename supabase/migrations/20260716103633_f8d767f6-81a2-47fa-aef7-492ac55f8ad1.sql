DROP POLICY IF EXISTS "Remaster queue is publicly readable" ON public.remaster_queue;
REVOKE SELECT ON public.remaster_queue FROM anon, authenticated;