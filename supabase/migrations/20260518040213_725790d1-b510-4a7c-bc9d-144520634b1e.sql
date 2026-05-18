CREATE TABLE public.citation_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_label TEXT NOT NULL,
  issue_type TEXT NOT NULL DEFAULT 'other',
  message TEXT NOT NULL,
  reporter_email TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.citation_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can report a citation issue"
ON public.citation_reports
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(subject_id) > 0 AND length(subject_id) < 200
  AND length(subject) > 0 AND length(subject) < 300
  AND length(source_url) > 0 AND length(source_url) < 2000
  AND length(source_label) > 0 AND length(source_label) < 500
  AND issue_type IN ('broken-link','wrong-source','outdated','misattribution','other')
  AND length(message) > 0 AND length(message) < 2000
  AND (reporter_email IS NULL OR (length(reporter_email) < 255 AND reporter_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'))
  AND status = 'new'
);