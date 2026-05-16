
CREATE TABLE public.live_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  headline TEXT NOT NULL,
  subheadline TEXT,
  news_summary TEXT NOT NULL,
  source_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  analysis JSONB NOT NULL,
  linkedin_post TEXT NOT NULL,
  verdict TEXT NOT NULL,
  vertical TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.live_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are public"
  ON public.live_articles FOR SELECT
  USING (status = 'published');

CREATE INDEX idx_live_articles_published_at ON public.live_articles(published_at DESC);
