// Postbuild: writes static HTML snapshots for each public route into dist/<path>/index.html.
// Crawlers (incl. LLM fetchers that don't execute JS) get real HTML with full content;
// real users get the SPA — React mounts into #root and replaces the prerendered body.

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { CASE_STUDIES } from "../src/data/caseStudies";
import { LAYERS, LAWS, AUDIT_QUESTIONS, GOLD_KEY_INSIGHT } from "../src/data/layers";
import { LAW_ESSAYS } from "../src/data/lawEssays";

const BASE = "https://supplychainofai.com";
const DIST = resolve("dist");
const template = readFileSync(resolve(DIST, "index.html"), "utf8");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Strip markdown-ish tokens for crawler-readable plain text inside HTML.
const plain = (md: string) =>
  md
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\r/g, "");

const paragraphs = (md: string) =>
  plain(md)
    .split(/\n\n+/)
    .map((p) => `<p>${esc(p.trim())}</p>`)
    .join("\n");

interface Route {
  path: string;
  title: string;
  description: string;
  body: string;
}

const routes: Route[] = [];

// Home
routes.push({
  path: "/",
  title: "The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack",
  description:
    "The Supply Chain of Intelligence™ — a 10-layer defensibility framework for the generative AI software stack. For SaaS product leaders, AI founders, and venture investors. (AI strategy, not physical logistics.)",
  body: `
    <h1>The Supply Chain of Intelligence™</h1>
    <p><strong>The 10 layers of the generative AI stack.</strong> A defensibility framework by Anand Arivukkarasu mapping where value is created, captured, and defended across modern AI software — from energy and silicon up through models, gates, agents, surfaces, and memory. This is a framework about generative-AI software architecture and SaaS strategy — not physical supply chains, freight, or logistics.</p>
    <h2>The 10 Layers</h2>
    <ol>
      ${LAYERS.map(
        (l) =>
          `<li><strong>${esc(l.id)} ${esc(l.name)}</strong> — ${esc(l.desc)}</li>`,
      ).join("\n      ")}
    </ol>
    <h2>The Three Structural Laws</h2>
    ${LAWS.map(
      (law) =>
        `<section><h3>Law ${esc(law.num)} — ${esc(law.title)}</h3><p>${esc(law.desc)}</p><p><em>${esc(law.example)}</em></p><p><strong>${esc(law.prediction)}</strong></p></section>`,
    ).join("\n    ")}
    <h2>Key Insight</h2>
    <p>${esc(GOLD_KEY_INSIGHT)}</p>
    <h2>Worked examples (${CASE_STUDIES.length})</h2>
    <ul>
      ${CASE_STUDIES.map(
        (c) =>
          `<li><a href="${BASE}/analysis/${c.slug}"><strong>${esc(c.title)}</strong></a> — ${esc(c.excerpt)}</li>`,
      ).join("\n      ")}
    </ul>
    <p><a href="${BASE}/framework">Explore the framework →</a> · <a href="${BASE}/analysis">All analyses →</a> · <a href="${BASE}/for-product-leaders">For product leaders →</a></p>
  `,
});

// Framework overview
routes.push({
  path: "/framework",
  title: "The Framework — 10 Layers, 50 Sublayers | Supply Chain of Intelligence™",
  description:
    "The full 10-layer, 50-sublayer map of the generative AI software stack. Each layer's role, defensible sublayers, representative players, and the structural verdict.",
  body: `
    <h1>The Framework — 10 Layers, 50 Sublayers</h1>
    <p>The Supply Chain of Intelligence™ decomposes the generative AI software stack into ten layers (L-1 through L8) and fifty sublayers. Each layer transforms the output of the layer below it; defensibility comes from owning layers and sublayers that competitors structurally cannot.</p>
    ${LAYERS.map(
      (l) => `
      <section>
        <h2><a href="${BASE}/framework/${l.id.toLowerCase().replace("-", "-")}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}">${esc(l.id)} — ${esc(l.name)}</a></h2>
        <p><strong>${esc(l.desc)}</strong></p>
        <p>${esc(l.detail)}</p>
        <p><em>Verdict:</em> ${esc(l.verdict)}</p>
        <p><em>Representative players:</em> ${l.players.map(esc).join(", ")}</p>
        <h3>Sublayers</h3>
        <ul>
          ${l.sublayers
            .map(
              (s) =>
                `<li><strong>${esc(s.id)} ${esc(s.name)}${s.defensible ? " ★" : ""}</strong> — ${esc(s.desc)}</li>`,
            )
            .join("\n          ")}
        </ul>
      </section>`,
    ).join("\n    ")}
  `,
});

// Per-layer pages — slug pattern must match React route. Inspect a couple to be safe:
// /framework/l-1-resources, /framework/l0-infra, etc. Slug is `${id.toLowerCase()}-${shortName.toLowerCase().replace(/\s+/g,'-')}`.
for (const l of LAYERS) {
  const slug = `${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`;
  routes.push({
    path: `/framework/${slug}`,
    title: `${l.id} — ${l.name} | The Supply Chain of Intelligence™`,
    description: `${l.desc} ${l.detail}`.slice(0, 300),
    body: `
      <h1>${esc(l.id)} — ${esc(l.name)}</h1>
      <p><strong>${esc(l.desc)}</strong></p>
      <p>${esc(l.detail)}</p>
      <h2>${esc(l.goldTitle)}</h2>
      <p>${esc(l.goldAnalogy)}</p>
      <h2>Structural Verdict</h2>
      <p>${esc(l.verdict)}</p>
      <h2>Representative Players</h2>
      <ul>${l.players.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <h2>Sublayers (${l.sublayers.length})</h2>
      <ul>
        ${l.sublayers
          .map(
            (s) =>
              `<li><strong>${esc(s.id)} ${esc(s.name)}${s.defensible ? " ★ defensible" : ""}</strong> — ${esc(s.desc)}</li>`,
          )
          .join("\n        ")}
      </ul>
      <p><a href="${BASE}/framework">← Back to the full framework</a></p>
    `,
  });
}

// Analysis index
routes.push({
  path: "/analysis",
  title: `Worked Examples — ${CASE_STUDIES.length} Case Studies | Supply Chain of Intelligence™`,
  description: `${CASE_STUDIES.length} structural case studies applying the 10-layer framework to real companies — Jasper, Chegg, Harvey, Sierra, Cursor, Glean, Klarna, Devin, Perplexity, and more.`,
  body: `
    <h1>Worked Examples — ${CASE_STUDIES.length} Case Studies</h1>
    <p>Each analysis applies the Supply Chain of Intelligence™ framework to a real company or category — identifying which layers are owned, where the structural moat lives, and what the framework predicts about durability.</p>
    <ul>
      ${CASE_STUDIES.map(
        (c) => `
        <li>
          <h2><a href="${BASE}/analysis/${c.slug}">${esc(c.title)}</a></h2>
          <p><em>${esc(c.tag)} — ${esc(c.date)}</em></p>
          <p><strong>Verdict: ${esc(c.verdict)}</strong></p>
          <p>${esc(c.excerpt)}</p>
        </li>`,
      ).join("\n      ")}
    </ul>
  `,
});

// Per-case-study pages
for (const c of CASE_STUDIES) {
  routes.push({
    path: `/analysis/${c.slug}`,
    title: `${c.title} | Supply Chain of Intelligence™`,
    description: c.excerpt.slice(0, 300),
    body: `
      <article>
        <p><em>${esc(c.tag)} — ${esc(c.date)} · ${esc(c.readTime)}</em></p>
        <h1>${esc(c.title)}</h1>
        <p><strong>Verdict: ${esc(c.verdict)}</strong> · Layers: ${c.layers.map(esc).join(", ")}</p>
        <p><strong>${esc(c.excerpt)}</strong></p>
        ${paragraphs(c.content)}
        ${
          c.counter_thesis
            ? `<h2>Counter-Thesis</h2>${paragraphs(c.counter_thesis)}`
            : ""
        }
        ${
          c.who_wins?.length
            ? `<h2>Who Wins</h2><ul>${c.who_wins.map((w) => `<li><strong>${esc(w.name)}</strong> — ${esc(w.reason)}</li>`).join("")}</ul>`
            : ""
        }
        ${
          c.who_loses?.length
            ? `<h2>Who Loses</h2><ul>${c.who_loses.map((w) => `<li><strong>${esc(w.name)}</strong> — ${esc(w.reason)}</li>`).join("")}</ul>`
            : ""
        }
        <p><a href="${BASE}/analysis">← All worked examples</a></p>
      </article>
    `,
  });
}

// For product leaders (audit)
routes.push({
  path: "/for-product-leaders",
  title: "For Product Leaders — The AI Defensibility Audit | Supply Chain of Intelligence™",
  description:
    "An 8-question structural audit for SaaS product leaders. Score your product across model dependency, data ownership, workflow depth, trust, distribution, memory, switching cost, and platform exposure.",
  body: `
    <h1>For Product Leaders — The AI Defensibility Audit</h1>
    <p>A structural diagnostic for SaaS product leaders. Score each question 1–5 to map where your product sits on the Supply Chain of Intelligence and whether your moats are durable against platform absorption.</p>
    <h2>The 8 Questions</h2>
    <ol>
      ${AUDIT_QUESTIONS.map(
        (q) =>
          `<li><strong>${esc(q.area)} (${esc(q.layer)})</strong> — ${esc(q.question)}</li>`,
      ).join("\n      ")}
    </ol>
    <p>Total your score out of 40. Bands run from <em>Thin Wrapper</em> (8–16) to <em>Intelligence Gate</em> (37–40).</p>
  `,
});

// About
routes.push({
  path: "/about",
  title: "About — Anand Arivukkarasu | Supply Chain of Intelligence™",
  description:
    "Anand Arivukkarasu — Ex-Meta (Instagram) Product Leader and AI Product Architect. Creator of The Supply Chain of Intelligence™ and The Intelligence Cube. Based in San Francisco.",
  body: `
    <h1>About — Anand Arivukkarasu</h1>
    <p>Anand Arivukkarasu is the creator of The Supply Chain of Intelligence™ and The Intelligence Cube — a structural framework for AI value, moats, and SaaS strategy.</p>
    <p>Ex-Meta (Instagram) Product Leader and AI Product Architect. Previously VP/Head of Product at Ideas2IT, Refersion, and GRIN; Lead PM at Vungle and Pinsight Media. Angel investor and advisor based in San Francisco.</p>
    <p><a href="https://www.linkedin.com/in/anandarivu">LinkedIn: linkedin.com/in/anandarivu</a></p>
  `,
});

// Market map
routes.push({
  path: "/market-map",
  title: "AI Market Map — Companies Plotted on the 10 Layers | Supply Chain of Intelligence™",
  description:
    "A live market map of AI companies plotted on the 10-layer Supply Chain of Intelligence™. See where each player sits and which layers they own.",
  body: `
    <h1>AI Market Map</h1>
    <p>Companies across the generative AI stack plotted on the 10-layer Supply Chain of Intelligence™ — by layer ownership, archetype, and structural depth. Use this map to see who actually owns which layer, and which "agent" companies are really L5+L7 packages on someone else's L2.</p>
    <p>Interactive map loads in-browser. The map covers archetypes including L0 Picks-and-Shovels, L2 Model Owners, L3 Trust Gates, L4 Distribution Owners, L5 Execution Engines, L6 Orchestration Layers, L7 Surfaces, and L8 Memory Systems.</p>
  `,
});

// FAQ
routes.push({
  path: "/faq",
  title: "FAQ — The Supply Chain of Intelligence™",
  description:
    "Frequently asked questions about the Supply Chain of Intelligence™ framework — what it is, how it differs from JTBD and Wardley Maps, and how to use it.",
  body: `
    <h1>Frequently Asked Questions</h1>
    <h2>What is the Supply Chain of Intelligence™?</h2>
    <p>A 10-layer, 50-sublayer structural framework for the generative AI software stack. It maps where value is created, captured, and defended — from L-1 Resources through L8 Memory.</p>
    <h2>How is it different from Jobs-to-Be-Done?</h2>
    <p>JTBD finds demand — why users will hire your product. SCoI finds defensibility — why a platform won't fire your product next quarter. They are complementary, not competing.</p>
    <h2>Is this about physical supply chains or logistics?</h2>
    <p>No. The Supply Chain of Intelligence™ is a framework about generative AI software architecture and SaaS strategy. It is not about freight, warehousing, manufacturing, or physical logistics.</p>
    <h2>What does the ™ mean?</h2>
    <p>The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu. Attribution required for reuse.</p>
  `,
});

// Structural Law essays
for (const e of LAW_ESSAYS) {
  routes.push({
    path: `/laws/${e.slug}`,
    title: `${e.shortTitle} | Supply Chain of Intelligence™`,
    description: e.description,
    body: `
      <article>
        <p><em>Structural Law · Essay ${esc(e.num)} of III</em></p>
        <h1>Law ${esc(e.num)} — ${esc(e.title)}</h1>
        <p><strong>${esc(e.oneLine)}</strong></p>
        <p>By Anand Arivukkarasu — Creator of The Supply Chain of Intelligence™.</p>
        ${e.paragraphs.map((p) => `<p>${esc(plain(p))}</p>`).join("\n        ")}
        <p><a href="${BASE}/framework">← Back to the full framework</a> · <a href="${BASE}/">Home</a></p>
      </article>
    `,
  });
}
function render(route: Route): string {
  let html = template;
  const url = `${BASE}${route.path === "/" ? "" : route.path}`;
  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`);
  // Replace meta description (first match)
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${esc(route.description)}" />`,
  );
  // Replace og:title / og:description / og:url
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${esc(route.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${esc(route.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
  );
  // Inject canonical
  if (!/rel="canonical"/.test(html)) {
    html = html.replace(
      "<link rel=\"icon\"",
      `<link rel="canonical" href="${url}" />\n    <link rel="icon"`,
    );
  }
  // Inject prerendered body inside <div id="root">. React mounts and replaces it for live users.
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><div data-prerendered="true" style="max-width:760px;margin:0 auto;padding:40px 24px;font-family:Inter,system-ui,sans-serif;color:#0F172A;line-height:1.6;">${route.body}</div></div>`,
  );
  return html;
}

let count = 0;
for (const route of routes) {
  const outPath =
    route.path === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, route.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, render(route));
  count++;
}

console.log(`prerender: wrote ${count} static HTML snapshots to dist/`);
