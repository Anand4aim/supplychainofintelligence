CREATE TABLE IF NOT EXISTS public.cron_secrets (
  name text PRIMARY KEY,
  token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.cron_secrets TO service_role;

ALTER TABLE public.cron_secrets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cron_secrets_deny_anon" ON public.cron_secrets AS RESTRICTIVE FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "cron_secrets_deny_authenticated" ON public.cron_secrets AS RESTRICTIVE FOR ALL TO authenticated USING (false) WITH CHECK (false);

INSERT INTO public.cron_secrets (name, token)
VALUES ('scheduler', encode(gen_random_bytes(32), 'hex'))
ON CONFLICT (name) DO NOTHING;