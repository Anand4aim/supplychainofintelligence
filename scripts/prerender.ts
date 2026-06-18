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
import { POSTS } from "../src/data/posts";
import { VERTICALS } from "../src/data/verticalsRegistry";

const BASE = "https://supplychainofai.com";
const DIST = resolve("dist");
const SSR_ENTRY = resolve("dist-ssr/entry-server.js");

// Set up just enough browser-shaped globals so the SSR bundle can be IMPORTED
// (Supabase reads localStorage; Sonner reads document at module load).
// IMPORTANT: do NOT set `window` — react-helmet-async checks
// `typeof window !== 'undefined' && window.document` to decide whether it's
// on the client. If true, it tries to mutate document.head via
// requestAnimationFrame, which crashes in Node. Keeping window undefined
// forces Helmet into server-mode and our helmetContext gets populated.
const { JSDOM } = await import("jsdom");
const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
  url: BASE,
});
const g = globalThis as any;
g.document = dom.window.document;
g.localStorage = dom.window.localStorage;
g.sessionStorage = dom.window.sessionStorage;
g.HTMLElement = dom.window.HTMLElement;
g.Element = dom.window.Element;
g.Node = dom.window.Node;

if (!existsSync(SSR_ENTRY)) {
  console.error(`prerender: SSR bundle missing at ${SSR_ENTRY}.`);
  console.error("Run: vite build --ssr src/entry-server.tsx --outDir dist-ssr");
  process.exit(1);
}

// Read the template. After the first prerender run, dist/index.html holds
// fully prerendered home content — that would poison every subsequent route.
// We cache a clean copy at dist/.prerender-template.html on the first build
// when vite's output still has an empty <div id="root"></div>, and prefer
// that cached copy on later runs.
const TEMPLATE_CACHE = resolve(DIST, ".prerender-template.html");
const rawDistIndex = readFileSync(resolve(DIST, "index.html"), "utf8");
const isCleanTemplate = /<div id="root">\s*<\/div>/.test(rawDistIndex);
let template: string;
if (isCleanTemplate) {
  writeFileSync(TEMPLATE_CACHE, rawDistIndex);
  template = rawDistIndex;
} else if (existsSync(TEMPLATE_CACHE)) {
  template = readFileSync(TEMPLATE_CACHE, "utf8");
} else {
  // No cached template AND dist/index.html is already polluted — fall back to
  // the project's source index.html. This still works because we replace the
  // <div id="root"></div> with our prerendered content.
  const srcIndex = readFileSync(resolve("index.html"), "utf8");
  template = srcIndex;
  writeFileSync(TEMPLATE_CACHE, srcIndex);
}

// Routes to prerender — must match React Router definitions in src/App.tsx.
const routes: string[] = [
  "/",
  "/paper",
  "/start",
  "/predictions",
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
  "/posts",
  ...POSTS.map((p) => `/posts/${p.slug}`),
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

  // Inject Helmet output just before </head>. Helmet already emits its own
  // canonical link, so don't add a second one (duplicate canonicals are
  // invalid SEO). If a route's Seo component forgot to set canonical,
  // fall back to one synthesized from the route's URL.
  const helmetHasCanonical = /rel="canonical"/.test(head.link);
  const canonicalFallback = helmetHasCanonical
    ? ""
    : `<link rel="canonical" href="${url}" />\n    `;
  const headInjection = [head.meta, head.link, head.script]
    .filter(Boolean)
    .join("\n    ");
  out = out.replace(
    "</head>",
    `    ${canonicalFallback}${headInjection}\n  </head>`,
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
