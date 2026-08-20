DELETE FROM public.article_audits WHERE article_id IN (SELECT id FROM public.live_articles WHERE status = 'draft' AND created_at < now() - interval '10 minutes');
DELETE FROM public.live_articles WHERE status = 'draft' AND created_at < now() - interval '10 minutes';
UPDATE public.story_candidates SET rejected_reason = NULL, notes = NULL, updated_at = now() WHERE status = 'pending';