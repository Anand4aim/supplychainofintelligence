CREATE TABLE public.article_revisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.live_articles(id) ON DELETE CASCADE,
  round INTEGER NOT NULL,
  stage TEXT NOT NULL,
  draft JSONB,
  critic_a JSONB,
  critic_b JSONB,
  critic_a_score INTEGER,
  critic_b_score INTEGER,
  models JSONB NOT NULL DEFAULT '{}'::jsonb,
  accepted BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_article_revisions_article ON public.article_revisions(article_id, round);

ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Revisions for published articles are public"
  ON public.article_revisions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.live_articles la
      WHERE la.id = article_revisions.article_id
        AND la.status = 'published'
    )
  );