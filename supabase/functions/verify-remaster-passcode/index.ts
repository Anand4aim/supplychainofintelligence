// Verifies the admin passcode for /admin/remaster. No JWT required.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const expected = Deno.env.get("REMASTER_ADMIN_PASSCODE");
    if (!expected) throw new Error("REMASTER_ADMIN_PASSCODE not configured");
    const { passcode } = await req.json().catch(() => ({ passcode: "" }));
    const ok = typeof passcode === "string" && passcode.length > 0 && passcode === expected;
    // Small constant-ish delay to slow brute force
    await new Promise((r) => setTimeout(r, 250));
    return new Response(JSON.stringify({ ok }), {
      status: ok ? 200 : 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
