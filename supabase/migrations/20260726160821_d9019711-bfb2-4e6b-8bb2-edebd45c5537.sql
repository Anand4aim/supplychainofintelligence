CREATE TABLE public.endorsements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text,
  institution text,
  email text,
  quote text NOT NULL,
  document text,
  permission_public boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT endorsements_name_len CHECK (char_length(name) BETWEEN 2 AND 120),
  CONSTRAINT endorsements_title_len CHECK (title IS NULL OR char_length(title) <= 160),
  CONSTRAINT endorsements_inst_len CHECK (institution IS NULL OR char_length(institution) <= 160),
  CONSTRAINT endorsements_email_len CHECK (email IS NULL OR char_length(email) <= 255),
  CONSTRAINT endorsements_quote_len CHECK (char_length(quote) BETWEEN 20 AND 1200),
  CONSTRAINT endorsements_doc_len CHECK (document IS NULL OR char_length(document) <= 120),
  CONSTRAINT endorsements_status_valid CHECK (status IN ('pending','approved','rejected'))
);

GRANT INSERT ON public.endorsements TO anon, authenticated;
GRANT ALL ON public.endorsements TO service_role;

ALTER TABLE public.endorsements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an endorsement"
  ON public.endorsements FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending');