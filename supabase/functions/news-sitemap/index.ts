// Google News sitemap — only articles published in the last 48 hours, per
// Google News sitemap spec. Served at /news-sitemap.xml via public/_redirects.
import { createClient } from "npm:@supabase/supabase-js@2";

const BASE = "https://supplychainofai.com";
const PUBLICATION = "Supply Chain of Intelligence";

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  let rows: { slug: string; headline: string; published_at: string; vertical: string | null }[] = [];

  try {
    const { data, error } = await supabase
      .from("live_articles")
      .select("slug, headline, published_at, vertical")
      .eq("status", "published")
      .gte("published_at", since)
      .order("published_at", { ascending: false })
      .limit(1000);
    if (error) throw error;
    rows = (data ?? []) as typeof rows;
  } catch (e) {
    console.error("news-sitemap: fetch failed", e);
  }

  const urls = rows
    .filter((r) => r.slug && r.published_at)
    .map((r) => {
      const keywords = ["generative AI stack", "AI strategy", r.vertical ?? "AI"]
        .filter(Boolean)
        .join(", ");
      return [
        "  <url>",
        `    <loc>${xmlEscape(`${BASE}/live/${r.slug}`)}</loc>`,
        "    <news:news>",
        "      <news:publication>",
        `        <news:name>${xmlEscape(PUBLICATION)}</news:name>`,
        "        <news:language>en</news:language>",
        "      </news:publication>",
        `      <news:publication_date>${new Date(r.published_at).toISOString()}</news:publication_date>`,
        `      <news:title>${xmlEscape(r.headline)}</news:title>`,
        `      <news:keywords>${xmlEscape(keywords)}</news:keywords>`,
        "    </news:news>",
        "  </url>",
      ].join("\n");
    });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n` +
    urls.join("\n") +
    (urls.length ? "\n" : "") +
    `</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
