/**
 * registration-diff.ts, white-box, prebuild diagnosis.
 *
 * Compares the set of routes that SHOULD exist (DB rows + static registries)
 * against the set of routes that scripts/prerender.ts actually registers,
 * and prints anything missing. Complement to crawl-content-check.ts:
 *
 *   crawl-content-check.ts  → post-deploy, fetches prod, catches regressions
 *   registration-diff.ts    → prebuild,    reads the repo, catches them earlier
 *
 * Exit 0 = every source slug is wired into the prerender route list.
 * Exit 1 = at least one source slug is missing from prerender.
 *
 * Usage:
 *   bunx tsx scripts/registration-diff.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";

import { CASE_STUDIES } from "../src/data/caseStudies";
import { LAYERS } from "../src/data/layers";
import { LAW_ESSAYS } from "../src/data/lawEssays";
import { POSTS } from "../src/data/posts";
import { VERTICAL_REGISTRY } from "../src/data/verticalsRegistry";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://pjococttuifybrwsxscy.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqb2NvY3R0dWlmeWJyd3N4c2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzEyNTgsImV4cCI6MjA5NDU0NzI1OH0.95DgDAjIqVcUxi3Yxf7u3CG2pWAK0GC8CCVM1tvHUx0";

type Source = {
  name: string;
  /** Every route this source declares as canonical. */
  routes: string[];
};

async function fetchLiveSlugs(): Promise<{ slugs: string[]; error?: string }> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/live_articles?select=slug&order=published_at.desc&limit=500`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
    );
    if (!res.ok) return { slugs: [], error: `HTTP ${res.status}` };
    const rows = (await res.json()) as Array<{ slug: string }>;
    return { slugs: rows.map((r) => r.slug).filter(Boolean) };
  } catch (err) {
    return { slugs: [], error: (err as Error).message };
  }
}

/**
 * Parse scripts/prerender.ts as text and pull out the literal route strings
 * + the source files it imports from. We don't execute the script, that
 * would re-do the full Supabase fetch and import the SSR bundle. Reading
 * it as text is enough to know "did the author wire this source in?".
 */
function readPrerenderRegistration(): {
  staticRoutes: Set<string>;
  importsLiveSlugs: boolean;
  importsVerticals: boolean;
  importsCaseStudies: boolean;
  importsLawEssays: boolean;
  importsPosts: boolean;
  importsLayers: boolean;
  raw: string;
} {
  const src = readFileSync(resolve("scripts/prerender.ts"), "utf8");
  const staticRoutes = new Set<string>();
  for (const m of src.matchAll(/"(\/[^"\s${}]*)"/g)) {
    staticRoutes.add(m[1]);
  }
  return {
    staticRoutes,
    importsLiveSlugs: /liveSlugs\.map\(\s*\(?s\)?\s*=>\s*`\/live\/\$\{s\}`\)/.test(src),
    importsVerticals: /VERTICALS\.map\(\s*\(?v\)?\s*=>\s*`\/market-map\/\$\{v\.slug\}`\)/.test(src),
    importsCaseStudies: /CASE_STUDIES\.map\(\s*\(?c\)?\s*=>\s*`\/analysis\/\$\{c\.slug\}`\)/.test(src),
    importsLawEssays: /LAW_ESSAYS\.map\(\s*\(?e\)?\s*=>\s*`\/laws\/\$\{e\.slug\}`\)/.test(src),
    importsPosts: /POSTS\.map\(\s*\(?p\)?\s*=>\s*`\/posts\/\$\{p\.slug\}`\)/.test(src),
    importsLayers: /LAYERS\.map\(/.test(src),
    raw: src,
  };
}

async function main() {
  console.log("registration-diff: comparing source-of-truth routes vs scripts/prerender.ts\n");

  const live = await fetchLiveSlugs();
  if (live.error) {
    console.warn(`! live_articles fetch failed (${live.error}). DB-driven /live/* diff will be skipped.\n`);
  }

  const sources: Source[] = [
    {
      name: "live_articles (DB)",
      routes: live.slugs.map((s) => `/live/${s}`),
    },
    {
      name: "VERTICAL_REGISTRY",
      routes: VERTICAL_REGISTRY.map((v) => `/market-map/${v.slug}`),
    },
    {
      name: "CASE_STUDIES",
      routes: CASE_STUDIES.map((c) => `/analysis/${c.slug}`),
    },
    {
      name: "LAW_ESSAYS",
      routes: LAW_ESSAYS.map((e) => `/laws/${e.slug}`),
    },
    {
      name: "POSTS",
      routes: POSTS.map((p) => `/posts/${p.slug}`),
    },
    {
      name: "LAYERS",
      routes: LAYERS.map(
        (l) => `/framework/${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`,
      ),
    },
  ];

  const reg = readPrerenderRegistration();

  // Wiring report, fast "is the source even hooked up?" check.
  console.log("Source wiring in scripts/prerender.ts:");
  const wiring: Array<[string, boolean]> = [
    ["live_articles → /live/*", reg.importsLiveSlugs],
    ["VERTICAL_REGISTRY → /market-map/*", reg.importsVerticals],
    ["CASE_STUDIES → /analysis/*", reg.importsCaseStudies],
    ["LAW_ESSAYS → /laws/*", reg.importsLawEssays],
    ["POSTS → /posts/*", reg.importsPosts],
    ["LAYERS → /framework/*", reg.importsLayers],
  ];
  for (const [label, ok] of wiring) {
    console.log(`  ${ok ? "✓" : "✗"} ${label}`);
  }
  console.log("");

  // Per-source slug diff. A slug is "registered" if either:
  //   - the prerender source explicitly mapped its registry (wiring above), OR
  //   - the literal route string appears in scripts/prerender.ts.
  let totalMissing = 0;
  for (const s of sources) {
    const wireOk = (() => {
      if (s.name.startsWith("live_articles")) return reg.importsLiveSlugs;
      if (s.name === "VERTICAL_REGISTRY") return reg.importsVerticals;
      if (s.name === "CASE_STUDIES") return reg.importsCaseStudies;
      if (s.name === "LAW_ESSAYS") return reg.importsLawEssays;
      if (s.name === "POSTS") return reg.importsPosts;
      if (s.name === "LAYERS") return reg.importsLayers;
      return false;
    })();

    const missing = wireOk
      ? [] // dynamic .map() covers every entry by construction
      : s.routes.filter((r) => !reg.staticRoutes.has(r));

    const status = missing.length === 0 ? "✓" : "✗";
    console.log(
      `${status} ${s.name.padEnd(24)} ${String(s.routes.length).padStart(4)} routes  ${
        wireOk ? "(wired dynamically)" : `${missing.length} missing static`
      }`,
    );
    if (missing.length > 0) {
      for (const r of missing.slice(0, 20)) console.log(`    - ${r}`);
      if (missing.length > 20) console.log(`    … and ${missing.length - 20} more`);
    }
    totalMissing += missing.length;
  }

  // Also flag any source whose dynamic mapping is missing entirely.
  const unwiredSources = wiring.filter(([, ok]) => !ok);
  if (unwiredSources.length > 0) {
    console.log("\n✗ Sources NOT wired into scripts/prerender.ts:");
    for (const [label] of unwiredSources) console.log(`    - ${label}`);
    totalMissing += unwiredSources.length;
  }

  console.log("");
  if (totalMissing === 0) {
    console.log("✅ Every source-of-truth route is registered for prerender.");
    process.exit(0);
  } else {
    console.log(
      `❌ ${totalMissing} route(s) or source(s) missing from prerender. Fix scripts/prerender.ts and re-run.`,
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
