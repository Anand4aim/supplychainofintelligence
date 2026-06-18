/**
 * Crawl content check — verifies that the prerendered HTML actually contains
 * the page's own content, not the homepage shell.
 *
 * Failure mode this catches: a route is listed in App.tsx but missing from
 * scripts/prerender.ts (or the SSR render silently produced an empty tree),
 * so the published HTML for that path is byte-equivalent to "/" and only
 * paints real content after client-side hydration. Non-JS crawlers (most AI
 * importers, link unfurlers, many training crawlers) then see the homepage
 * for every "broken" URL.
 *
 * What it does:
 *   1. Fetches "/" once to learn the homepage shell's <title> and a couple
 *      of stable hero phrases.
 *   2. Fetches each sampled route with a plain HTTP client (no JS).
 *   3. Asserts the response is HTTP 200, NOT byte-identical to "/", and
 *      contains an expected substring unique to that page (usually the
 *      slug-derived headline). Falls back to "title differs from home"
 *      when no expected substring is provided.
 *
 * Usage:
 *   bunx tsx scripts/crawl-content-check.ts                 # against prod
 *   bunx tsx scripts/crawl-content-check.ts http://localhost:8080
 *
 * Exit 0 = every sampled route has its own SSR'd content.
 * Exit 1 = at least one route is serving the homepage shell.
 */

import { CASE_STUDIES } from "../src/data/caseStudies";
import { LAW_ESSAYS } from "../src/data/lawEssays";
import { POSTS } from "../src/data/posts";
import { VERTICALS } from "../src/data/verticalsRegistry";

const SITE = process.argv[2]?.replace(/\/$/, "") || "https://supplychainofai.com";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://pjococttuifybrwsxscy.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqb2NvY3R0dWlmeWJyd3N4c2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzEyNTgsImV4cCI6MjA5NDU0NzI1OH0.95DgDAjIqVcUxi3Yxf7u3CG2pWAK0GC8CCVM1tvHUx0";

const UA =
  "Mozilla/5.0 (compatible; SCOI-CrawlCheck/1.0; +https://supplychainofai.com)";

type Check = {
  path: string;
  // Substring that MUST appear in the prerendered HTML for this route to
  // count as "real content". Usually the headline or a slug-derived phrase.
  // Matched case-insensitively. Optional — if absent, we only check that
  // the route's HTML differs from "/".
  expect?: string;
  group: string;
};

const titleFrom = (html: string): string => {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : "";
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ");

/** Fetch a route and return body + status + content-length. */
async function get(path: string): Promise<{ status: number; html: string; bytes: number }> {
  const res = await fetch(`${SITE}${path}`, {
    headers: { "user-agent": UA, accept: "text/html" },
    redirect: "follow",
  });
  const html = await res.text();
  return { status: res.status, html, bytes: html.length };
}

async function fetchLiveSamples(): Promise<Array<{ slug: string; headline: string }>> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/live_articles?select=slug,headline&order=published_at.desc&limit=8`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
    );
    if (!res.ok) return [];
    return (await res.json()) as Array<{ slug: string; headline: string }>;
  } catch {
    return [];
  }
}

// Build the sample set. We don't need every URL — a representative slice
// per page-type is enough to catch a missing prerender registration.
function pick<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

async function buildChecks(): Promise<Check[]> {
  const checks: Check[] = [];

  // /live/:slug — the route family that was broken first
  const live = await fetchLiveSamples();
  for (const a of pick(live, 5)) {
    checks.push({
      group: "live",
      path: `/live/${a.slug}`,
      // First 5 words of the headline are stable enough to fingerprint.
      expect: a.headline.split(/\s+/).slice(0, 5).join(" "),
    });
  }

  // /market-map/:vertical — every "live" vertical (small set)
  for (const v of VERTICALS.filter((v) => v.status === "live")) {
    checks.push({
      group: "market-map",
      path: `/market-map/${v.slug}`,
      expect: v.label,
    });
  }
  // Plus a couple of "coming-soon" ones to confirm the coming-soon
  // shell is unique-per-vertical too.
  for (const v of pick(VERTICALS.filter((v) => v.status === "coming-soon"), 3)) {
    checks.push({
      group: "market-map",
      path: `/market-map/${v.slug}`,
      expect: v.label,
    });
  }

  // /analysis/:slug — sample, including the 5 the audit flagged
  const flaggedAnalysis = new Set([
    "jasper-vs-grammarly-copilot",
    "five-eras-of-software",
    "harvey-vs-generic-legal",
    "klarna-customer-service",
    "glean-enterprise-search-fortress",
  ]);
  for (const c of CASE_STUDIES) {
    if (flaggedAnalysis.has(c.slug)) {
      checks.push({
        group: "analysis",
        path: `/analysis/${c.slug}`,
        expect: c.title.split(/\s+/).slice(0, 4).join(" "),
      });
    }
  }
  for (const c of pick(
    CASE_STUDIES.filter((c) => !flaggedAnalysis.has(c.slug)),
    5,
  )) {
    checks.push({
      group: "analysis",
      path: `/analysis/${c.slug}`,
      expect: c.title.split(/\s+/).slice(0, 4).join(" "),
    });
  }

  // /laws/:slug — all of them, it's a small set
  for (const e of LAW_ESSAYS) {
    checks.push({
      group: "laws",
      path: `/laws/${e.slug}`,
      expect: e.title.split(/\s+/).slice(0, 4).join(" "),
    });
  }

  // /posts/:slug — sanity check, these were already passing
  for (const p of pick(POSTS, 3)) {
    checks.push({
      group: "posts",
      path: `/posts/${p.slug}`,
      expect: p.title.split(/\s+/).slice(0, 4).join(" "),
    });
  }

  return checks;
}

type Verdict = {
  check: Check;
  status: number;
  bytes: number;
  ok: boolean;
  reason: string;
};

async function run() {
  console.log(`crawl-content-check → ${SITE}\n`);

  const home = await get("/");
  if (home.status !== 200) {
    console.error(`✗ "/" returned ${home.status} — aborting.`);
    process.exit(1);
  }
  const homeTitle = titleFrom(home.html);
  const homeBytes = home.bytes;
  console.log(`baseline: "/"  ${homeBytes} bytes · <title>${homeTitle}</title>\n`);

  const checks = await buildChecks();
  const verdicts: Verdict[] = [];

  for (const check of checks) {
    let v: Verdict;
    try {
      const r = await get(check.path);
      const title = titleFrom(r.html);
      const hay = norm(r.html);
      const needle = check.expect ? norm(check.expect) : "";

      let ok = false;
      let reason = "";

      if (r.status !== 200) {
        reason = `HTTP ${r.status}`;
      } else if (r.bytes === homeBytes) {
        reason = `byte-identical to "/" (${r.bytes} bytes — homepage shell served)`;
      } else if (needle && !hay.includes(needle)) {
        reason = `expected "${check.expect}" not found in HTML`;
      } else if (!needle && title && title === homeTitle) {
        reason = `<title> matches homepage — likely SPA fallback`;
      } else {
        ok = true;
        reason = needle ? `found "${check.expect}"` : `title differs from home`;
      }
      v = { check, status: r.status, bytes: r.bytes, ok, reason };
    } catch (err) {
      v = {
        check,
        status: 0,
        bytes: 0,
        ok: false,
        reason: `fetch failed: ${(err as Error).message}`,
      };
    }
    verdicts.push(v);
    const mark = v.ok ? "✓" : "✗";
    console.log(
      `${mark} [${v.check.group.padEnd(10)}] ${v.check.path.padEnd(60)} ${String(v.status).padEnd(4)} ${String(v.bytes).padStart(7)}b  ${v.reason}`,
    );
  }

  const failed = verdicts.filter((v) => !v.ok);
  console.log(
    `\n${verdicts.length - failed.length}/${verdicts.length} routes serve their own SSR'd content.`,
  );
  if (failed.length > 0) {
    console.log(`\nFailures by group:`);
    const groups = [...new Set(failed.map((f) => f.check.group))];
    for (const g of groups) {
      const f = failed.filter((v) => v.check.group === g);
      console.log(`  ${g}: ${f.length} failing`);
      for (const v of f) console.log(`    - ${v.check.path} → ${v.reason}`);
    }
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
