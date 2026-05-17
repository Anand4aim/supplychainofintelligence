// Approach B: True SSR prerender.
//
// Pipeline (run from package.json postbuild):
//   1. `vite build` already produced the client bundle in dist/.
//   2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` produced
//      a Node-compatible SSR bundle.
//   3. This script imports that SSR bundle, renders every public route
//      with renderToString + StaticRouter + HelmetProvider, then writes
//      a full HTML file per route to dist/<path>/index.html.
//
// LLM/search crawlers get real, fully-rendered HTML for every route.
// Real users get the SPA — main.tsx detects the prerender marker and
// remounts cleanly so we don't fight a hydration mismatch.

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { pathToFileURL } from "url";
import { CASE_STUDIES } from "../src/data/caseStudies";
import { LAYERS } from "../src/data/layers";
import { LAW_ESSAYS } from "../src/data/lawEssays";

const BASE = "https://supplychainofai.com";
const DIST = resolve("dist");
const SSR_ENTRY = resolve("dist-ssr/entry-server.js");

// Set up a full jsdom environment before importing the SSR bundle, because
// some application + UI deps (Supabase auth, Sonner toasts) read window /
// document at module load. None of these run during renderToString output,
// but Node needs real-enough shims for the imports to succeed.
const { JSDOM } = await import("jsdom");
const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
  url: BASE,
});
const g = globalThis as any;
g.window = dom.window;
g.document = dom.window.document;
Object.defineProperty(g, "navigator", { value: dom.window.navigator, configurable: true });
g.localStorage = dom.window.localStorage;
g.sessionStorage = dom.window.sessionStorage;
g.HTMLElement = dom.window.HTMLElement;
g.Element = dom.window.Element;
g.Node = dom.window.Node;
g.getComputedStyle = dom.window.getComputedStyle;

if (!existsSync(SSR_ENTRY)) {
  console.error(`prerender: SSR bundle missing at ${SSR_ENTRY}.`);
  console.error("Run: vite build --ssr src/entry-server.tsx --outDir dist-ssr");
  process.exit(1);
}

const template = readFileSync(resolve(DIST, "index.html"), "utf8");

// Routes to prerender — must match React Router definitions in src/App.tsx.
const routes: string[] = [
  "/",
  "/framework",
  ...LAYERS.map(
    (l) =>
      `/framework/${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`,
  ),
  "/analysis",
  ...CASE_STUDIES.map((c) => `/analysis/${c.slug}`),
  "/for-product-leaders",
  "/about",
  "/market-map",
  "/faq",
  ...LAW_ESSAYS.map((e) => `/laws/${e.slug}`),
];

interface RenderFn {
  (url: string): {
    html: string;
    head: { title: string; meta: string; link: string; script: string };
  };
}

const mod = (await import(pathToFileURL(SSR_ENTRY).href)) as { render: RenderFn };
const { render } = mod;

function buildHtml(route: string): string {
  const { html, head } = render(route);
  const url = `${BASE}${route === "/" ? "" : route}`;

  let out = template;

  // Strip any default <title>; Helmet output will replace it.
  if (head.title) {
    out = out.replace(/<title>[^<]*<\/title>/, head.title);
  }

  // Replace duplicated static meta tags that Helmet also emits, so we don't
  // ship two of each. Helmet's per-route tags win.
  const helmetMetaNames = Array.from(
    head.meta.matchAll(/(?:name|property)="([^"]+)"/g),
  ).map((m) => m[1]);
  for (const name of helmetMetaNames) {
    const re = new RegExp(
      `\\s*<meta (?:name|property)="${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}" content="[^"]*"\\s*/?>`,
      "g",
    );
    out = out.replace(re, "");
  }

  // Remove static canonical (Helmet emits its own per-route).
  out = out.replace(/\s*<link rel="canonical"[^>]*\/?>/g, "");

  // Inject Helmet output just before </head>.
  const headInjection = [head.meta, head.link, head.script]
    .filter(Boolean)
    .join("\n    ");
  out = out.replace(
    "</head>",
    `    <link rel="canonical" href="${url}" />\n    ${headInjection}\n  </head>`,
  );

  // Inject SSR'd body inside #root with a marker so main.tsx knows to remount.
  out = out.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><div data-prerendered="true">${html}</div></div>`,
  );

  return out;
}

let count = 0;
for (const route of routes) {
  const outPath =
    route === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, route.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  try {
    writeFileSync(outPath, buildHtml(route));
    count++;
  } catch (err) {
    console.error(`prerender: failed on ${route}`, err);
    process.exit(1);
  }
}

console.log(`prerender (SSR): wrote ${count} static HTML snapshots to dist/`);
