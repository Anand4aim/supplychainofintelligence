DROP POLICY IF EXISTS "cron_secrets_deny_anon" ON public.cron_secrets;
DROP POLICY IF EXISTS "cron_secrets_deny_authenticated" ON public.cron_secrets;

CREATE POLICY "cron_secrets_service_role_full_access" ON public.cron_secrets FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "cron_secrets_deny_anon" ON public.cron_secrets FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "cron_secrets_deny_authenticated" ON public.cron_secrets FOR ALL TO authenticated USING (false) WITH CHECK (false);