REVOKE SELECT, UPDATE, DELETE ON public.endorsements FROM anon, authenticated;
GRANT INSERT ON public.endorsements TO anon, authenticated;
GRANT ALL ON public.endorsements TO service_role;

DROP POLICY IF EXISTS "endorsements_deny_public_select" ON public.endorsements;
CREATE POLICY "endorsements_deny_public_select"
  ON public.endorsements FOR SELECT TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "endorsements_deny_public_update" ON public.endorsements;
CREATE POLICY "endorsements_deny_public_update"
  ON public.endorsements FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "endorsements_deny_public_delete" ON public.endorsements;
CREATE POLICY "endorsements_deny_public_delete"
  ON public.endorsements FOR DELETE TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "endorsements_service_role_full_access" ON public.endorsements;
CREATE POLICY "endorsements_service_role_full_access"
  ON public.endorsements FOR ALL TO service_role USING (true) WITH CHECK (true);