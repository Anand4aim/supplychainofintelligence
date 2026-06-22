CREATE TABLE public.story_candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  source_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  source_domains JSONB NOT NULL DEFAULT '[]'::jsonb,
  company TEXT,
  discovered_for_date DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  status TEXT NOT NULL DEFAULT 'pending',
  rejected_reason TEXT,
  published_article_id UUID REFERENCES public.live_articles(id) ON DELETE SET NULL,
  tier1_verified BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT story_candidates_status_check CHECK (status IN ('pending','approved','rejected','published','processing'))
);

GRANT ALL ON public.story_candidates TO service_role;

ALTER TABLE public.story_candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access" ON public.story_candidates
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX story_candidates_status_idx ON public.story_candidates (status, discovered_for_date DESC);
CREATE UNIQUE INDEX story_candidates_dedupe_idx ON public.story_candidates (lower(headline), discovered_for_date);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_story_candidates_updated_at
  BEFORE UPDATE ON public.story_candidates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();