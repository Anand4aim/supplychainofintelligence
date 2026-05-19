-- Per-article audit results from cross-LLM critique runs
CREATE TABLE public.article_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES public.live_articles(id) ON DELETE CASCADE,
  run_id text NOT NULL,
  model text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  severity text NOT NULL CHECK (severity IN ('critical','needs_fix','minor','ok')),
  current_layers jsonb NOT NULL DEFAULT '[]'::jsonb,
  proposed_layers jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_sublayers jsonb NOT NULL DEFAULT '[]'::jsonb,
  proposed_sublayers jsonb NOT NULL DEFAULT '[]'::jsonb,
  flaws jsonb NOT NULL DEFAULT '[]'::jsonb,
  fixes jsonb NOT NULL DEFAULT '[]'::jsonb,
  suggested_headline text,
  suggested_subheadline text,
  verdict_check jsonb NOT NULL DEFAULT '{}'::jsonb,
  evidence_quotes jsonb NOT NULL DEFAULT '[]'::jsonb,
  raw_critique text,
  status text NOT NULL DEFAULT 'complete' CHECK (status IN ('pending','complete','failed')),
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_article_audits_article ON public.article_audits(article_id);
CREATE INDEX idx_article_audits_run ON public.article_audits(run_id, created_at DESC);
CREATE INDEX idx_article_audits_severity ON public.article_audits(severity, score);

ALTER TABLE public.article_audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audits readable for published articles"
ON public.article_audits FOR SELECT TO public
USING (EXISTS (
  SELECT 1 FROM public.live_articles la
  WHERE la.id = article_audits.article_id AND la.status = 'published'
));

-- Cross-LLM agreement summary (one row per article+run_id)
CREATE TABLE public.article_audit_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES public.live_articles(id) ON DELETE CASCADE,
  run_id text NOT NULL,
  composite_score integer NOT NULL CHECK (composite_score >= 0 AND composite_score <= 100),
  composite_severity text NOT NULL CHECK (composite_severity IN ('critical','needs_fix','minor','ok')),
  layer_jaccard real,
  sublayer_jaccard real,
  verdict_agreement boolean,
  models_run text[] NOT NULL DEFAULT '{}',
  consensus_layers jsonb NOT NULL DEFAULT '[]'::jsonb,
  consensus_sublayers jsonb NOT NULL DEFAULT '[]'::jsonb,
  disagreements jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (article_id, run_id)
);

CREATE INDEX idx_audit_summary_severity ON public.article_audit_summary(composite_severity, composite_score);
CREATE INDEX idx_audit_summary_run ON public.article_audit_summary(run_id, created_at DESC);

ALTER TABLE public.article_audit_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audit summaries readable for published articles"
ON public.article_audit_summary FOR SELECT TO public
USING (EXISTS (
  SELECT 1 FROM public.live_articles la
  WHERE la.id = article_audit_summary.article_id AND la.status = 'published'
));

-- Audit run registry (so the UI can list runs, show progress)
CREATE TABLE public.audit_runs (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running','paused','complete','failed')),
  models text[] NOT NULL DEFAULT '{}',
  total_articles integer NOT NULL DEFAULT 0,
  completed_articles integer NOT NULL DEFAULT 0,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  notes text
);

ALTER TABLE public.audit_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Audit runs are publicly readable"
ON public.audit_runs FOR SELECT TO public USING (true);