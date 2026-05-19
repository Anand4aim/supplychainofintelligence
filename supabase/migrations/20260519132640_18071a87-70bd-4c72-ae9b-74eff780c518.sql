ALTER TABLE public.article_audits
  ADD COLUMN IF NOT EXISTS dimension_scores jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.article_audit_summary
  ADD COLUMN IF NOT EXISTS dimension_scores_avg jsonb NOT NULL DEFAULT '{}'::jsonb;