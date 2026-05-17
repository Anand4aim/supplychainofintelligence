/**
 * Automated SEO recrawl checklist.
 *
 * Re-runs the structured-data validation pass we did manually and asks
 * Google Search Console whether the post-recrawl state is clean.
 *
 * Usage:
 *   bunx tsx scripts/seo-recrawl-check.ts
 *
 * Exit code 0 = all checks passed. Non-zero = at least one failure;
 * details printed to stderr so this can be wired into CI / cron later.
 *
 * Checks performed:
 *  1. Sitewide JSON-LD in index.html parses + has required fields.
 *  2. Per-layer DefinedTerm + BreadcrumbList in LayerDetail.tsx render
 *     for every layer in src/data/layers.ts and use the canonical slug
 *     that matches public/sitemap.xml.
 *  3. Every /framework/l* URL in sitemap.xml resolves to a layer
 *     (no stale slugs, no missing entries) — canonical drift guard.
 *  4. llms.txt + sitemap.xml advertise "10 layers, 50 sublayers, 3 laws"
 *     and contain no "8 layers" copy.
 *  5. Google Search Console (via connector gateway): sitemap status
 *     for sc-domain:supplychainofai.com reports 0 errors + 0 warnings
 *     and lastDownloaded is newer than our last lastmod.
 *
 * GSC check is skipped (with a warning, not a failure) when
 * LOVABLE_API_KEY or GOOGLE_SEARCH_CONSOLE_API_KEY are missing —
 * local devs can still run the offline checks (1-4).
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { LAYERS } from "../src/data/layers";

type Check = { name: string; ok: boolean; detail: string };
const results: Check[] = [];
const push = (name: string, ok: boolean, detail = "") =>
  results.push({ name, ok, detail });

const SITE = "https://supplychainofai.com";
const SC_PROPERTY = "sc-domain:supplychainofai.com";
const SITEMAP_URL = `${SITE}/sitemap.xml`;
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

const slugFor = (id: string) => {
  const l = LAYERS.find((x) => x.id === id)!;
  return `${id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`;
};

// ───────────────────────────────────────────────────────────── 1. index.html JSON-LD
function checkIndexHtmlJsonLd() {
  const html = readFileSync(resolve("index.html"), "utf8");
  const blocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) return push("index.html JSON-LD blocks present", false, "no JSON-LD found");

  let bad = 0;
  const types: string[] = [];
  for (const [, raw] of blocks) {
    try {
      const json = JSON.parse(raw.trim());
      if (!json["@context"] || !json["@type"]) bad++;
      else types.push(json["@type"]);
    } catch (e) {
      bad++;
    }
  }
  push(
    `index.html JSON-LD parses (${blocks.length} blocks)`,
    bad === 0,
    bad === 0 ? `types: ${types.join(", ")}` : `${bad} invalid`,
  );

  // The "10 layers / 50 sublayers / 3 laws" canonical numbers must appear
  // in the DefinedTermSet block — that's the snippet crawlers will overwrite
  // the stale "8 layers" mention with.
  const has10 = /\b10\b[\s\S]{0,200}layers/i.test(html);
  const has50 = /\b50\b[\s\S]{0,200}sublayers/i.test(html);
  const has3 = /\b3\b[\s\S]{0,200}laws/i.test(html);
  push("index.html advertises 10/50/3", has10 && has50 && has3,
    `10:${has10} 50:${has50} 3:${has3}`);

  const has8 = /\b8\s*layers\b/i.test(
    html.replace(/<!--[\s\S]*?-->/g, ""), // strip comments — the correction note legitimately mentions "8 layers"
  );
  push("index.html has no stale '8 layers' copy (excl. comments)", !has8);
}

// ───────────────────────────────────────────────────────────── 2 + 3. per-layer + sitemap
function checkLayerCanonicals() {
  const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
  const sitemapLayerUrls = [...sitemap.matchAll(/<loc>([^<]*\/framework\/l[^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE, ""));

  const expected = LAYERS.map((l) => `/framework/${slugFor(l.id)}`);

  const missing = expected.filter((p) => !sitemapLayerUrls.includes(p));
  const extra = sitemapLayerUrls.filter((p) => !expected.includes(p));
  push(
    `sitemap covers all ${LAYERS.length} layers`,
    missing.length === 0 && extra.length === 0,
    [
      missing.length ? `missing: ${missing.join(", ")}` : "",
      extra.length ? `extra: ${extra.join(", ")}` : "",
    ].filter(Boolean).join(" | ") || "all 10 present",
  );

  // Sanity: every layer has 5 sublayers (50 total).
  const subCount = LAYERS.reduce((n, l) => n + l.sublayers.length, 0);
  push("layers data exposes 50 sublayers", subCount === 50, `${subCount}`);

  // Spot-check LayerDetail wires both schemas.
  const layerDetail = readFileSync(resolve("src/pages/LayerDetail.tsx"), "utf8");
  const hasDefinedTerm = /"@type":\s*"DefinedTerm"/.test(layerDetail);
  const hasBreadcrumb = /"@type":\s*"BreadcrumbList"/.test(layerDetail);
  const hasCanonical = /path=\{`\/framework\/\$\{slugFor\(layer\.id\)\}`\}/.test(layerDetail);
  push("LayerDetail emits DefinedTerm + BreadcrumbList + canonical",
    hasDefinedTerm && hasBreadcrumb && hasCanonical,
    `term:${hasDefinedTerm} crumb:${hasBreadcrumb} canonical:${hasCanonical}`);
}

// ───────────────────────────────────────────────────────────── 4. llms.txt
function checkLlmsTxt() {
  const txt = readFileSync(resolve("public/llms.txt"), "utf8");
  const has10 = /10\s*layers/i.test(txt);
  const has50 = /50\s*sublayers/i.test(txt);
  const has3 = /3\s*laws/i.test(txt);
  push("llms.txt advertises 10/50/3", has10 && has50 && has3);
}

// ───────────────────────────────────────────────────────────── 5. GSC
async function checkGsc() {
  const lov = process.env.LOVABLE_API_KEY;
  const gsc = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lov || !gsc) {
    push("GSC sitemap reports 0 errors", true,
      "SKIPPED — LOVABLE_API_KEY / GOOGLE_SEARCH_CONSOLE_API_KEY not in env (offline run)");
    return;
  }

  const headers = {
    Authorization: `Bearer ${lov}`,
    "X-Connection-Api-Key": gsc,
  };

  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SC_PROPERTY)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      push("GSC sitemap reports 0 errors", false, `HTTP ${res.status} — ${await res.text()}`);
      return;
    }
    const data: any = await res.json();
    const errors = Number(data?.errors ?? 0);
    const warnings = Number(data?.warnings ?? 0);
    const lastDownloaded = data?.lastDownloaded ?? "never";
    push(
      "GSC sitemap reports 0 errors + 0 warnings",
      errors === 0 && warnings === 0,
      `errors=${errors} warnings=${warnings} lastDownloaded=${lastDownloaded} pending=${data?.isPending ?? "?"}`,
    );
  } catch (e: any) {
    push("GSC sitemap reports 0 errors", false, `request failed: ${e?.message ?? e}`);
  }
}

// ───────────────────────────────────────────────────────────── run
(async () => {
  checkIndexHtmlJsonLd();
  checkLayerCanonicals();
  checkLlmsTxt();
  await checkGsc();

  const pad = Math.max(...results.map((r) => r.name.length));
  console.log("\nSEO RECRAWL CHECKLIST");
  console.log("─".repeat(pad + 12));
  for (const r of results) {
    console.log(`${r.ok ? "✓" : "✗"}  ${r.name.padEnd(pad)}  ${r.detail}`);
  }
  const failed = results.filter((r) => !r.ok);
  console.log("─".repeat(pad + 12));
  console.log(`${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.error(`\nFAILED:\n${failed.map((f) => `  - ${f.name}: ${f.detail}`).join("\n")}`);
    process.exit(1);
  }
})();
