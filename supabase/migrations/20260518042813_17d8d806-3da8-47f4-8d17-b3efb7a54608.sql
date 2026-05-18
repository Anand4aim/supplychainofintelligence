
CREATE TABLE public.remaster_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('live_article','case_study','law_essay','prediction','layer','page')),
  target_id TEXT NOT NULL,
  target_label TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','processing','done','failed','skipped')),
  notes TEXT,
  result JSONB,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  UNIQUE (target_type, target_id, status) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX idx_remaster_queue_status_priority ON public.remaster_queue (status, priority DESC, created_at ASC);

ALTER TABLE public.remaster_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Remaster queue is publicly readable"
  ON public.remaster_queue FOR SELECT
  USING (true);
