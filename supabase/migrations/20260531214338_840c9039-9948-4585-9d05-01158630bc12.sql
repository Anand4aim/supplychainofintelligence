UPDATE public.live_articles
SET published_at = created_at
WHERE published_at > now();