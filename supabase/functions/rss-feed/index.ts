import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://supplychainofai.com";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: articles } = await supabase
    .from("live_articles")
    .select("slug, headline, subheadline, news_summary, published_at, verdict, vertical")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  const items = (articles ?? [])
    .map((a) => {
      const link = `${SITE}/live/${a.slug}`;
      const desc = `${a.verdict ? `[${a.verdict}] ` : ""}${a.subheadline ?? a.news_summary?.slice(0, 280) ?? ""}`;
      return `<item>
  <title>${esc(a.headline)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
  ${a.vertical ? `<category>${esc(a.vertical)}</category>` : ""}
  <description>${esc(desc)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Supply Chain of Intelligence, Live Feed</title>
  <link>${SITE}/live</link>
  <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
  <description>Every important AI move, scored on the 10-layer Supply Chain of Intelligence framework by Anand Arivukkarasu.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
});
