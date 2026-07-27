// Shared auth for background jobs.
//
// Two accepted credentials:
//   1. REMASTER_ADMIN_PASSCODE  — a human acting from the admin UI
//   2. a scheduler token stored in public.cron_secrets — pg_cron jobs, which
//      cannot read edge-function secrets and so must carry a DB-held token
//
// Fail-closed: an empty or mismatched credential is always rejected.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

export async function isAuthorizedJobCall(
  supabase: SupabaseClient,
  opts: { passcode?: string | null; cronToken?: string | null },
): Promise<boolean> {
  const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
  if (expected && opts.passcode && timingSafeEqual(opts.passcode, expected)) return true;

  if (opts.cronToken) {
    const { data } = await supabase
      .from("cron_secrets")
      .select("token")
      .eq("name", "scheduler")
      .maybeSingle();
    if (data?.token && timingSafeEqual(opts.cronToken, data.token)) return true;
  }

  // Slow the loop down for anything that fails.
  await new Promise((r) => setTimeout(r, 250));
  return false;
}
