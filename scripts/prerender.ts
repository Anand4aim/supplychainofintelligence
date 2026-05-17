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

// Polyfill browser globals that module-level code (e.g. Supabase client) touches
// during import. These never get called during renderToString.
const memStore = new Map<string, string>();
const fakeStorage = {
  getItem: (k: string) => memStore.get(k) ?? null,
  setItem: (k: string, v: string) => void memStore.set(k, String(v)),
  removeItem: (k: string) => void memStore.delete(k),
  clear: () => memStore.clear(),
  key: (i: number) => Array.from(memStore.keys())[i] ?? null,
  get length() {
    return memStore.size;
  },
};
// @ts-expect-error - patching node globals for SSR import compatibility
globalThis.localStorage = fakeStorage;
// @ts-expect-error
globalThis.sessionStorage = fakeStorage;
// @ts-expect-error
globalThis.window = globalThis.window ?? { location: { href: BASE }, addEventListener() {}, removeEventListener() {} };
const fakeNode: any = { appendChild() {}, removeChild() {}, insertBefore() {}, setAttribute() {}, style: {}, sheet: { insertRule() {} } };
// @ts-expect-error
globalThis.document = globalThis.document ?? {
  cookie: "",
  head: fakeNode,
  body: fakeNode,
  documentElement: fakeNode,
  createElement: () => ({ ...fakeNode }),
  createTextNode: () => ({}),
  getElementsByTagName: () => [fakeNode],
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener() {},
  removeEventListener() {},
};

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
