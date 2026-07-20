-- Harden story_candidates: explicit REVOKE + explicit anon/authenticated
-- no-access policies. All reads/writes go through the admin edge functions
-- (which use the service role after passcode verification).

REVOKE ALL ON public.story_candidates FROM anon;
REVOKE ALL ON public.story_candidates FROM authenticated;
REVOKE ALL ON public.story_candidates FROM PUBLIC;

GRANT ALL ON public.story_candidates TO service_role;

-- Explicit deny policies for anon + authenticated so the RLS posture is
-- readable in policy listings and cannot be confused with "missing policy".
DROP POLICY IF EXISTS "story_candidates_deny_anon" ON public.story_candidates;
CREATE POLICY "story_candidates_deny_anon"
  ON public.story_candidates
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "story_candidates_deny_authenticated" ON public.story_candidates;
CREATE POLICY "story_candidates_deny_authenticated"
  ON public.story_candidates
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);