#!/usr/bin/env -S bun run
// Generates spec/layers/*.md and spec/data/*.json from src/data/layers.ts.
// Single source of truth; keeps the open spec in lockstep with the live site.

import { LAYERS, LAWS, OBSERVATIONS, DEFENSIBLE_TRIANGLE } from "../src/data/layers";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..", "spec");
mkdirSync(join(ROOT, "layers"), { recursive: true });
mkdirSync(join(ROOT, "data"), { recursive: true });

// ── per-layer markdown ──────────────────────────────────────────────────────
const slug = (id: string) => `${id.replace("L-1", "L-1").replace("L", "L")}-${LAYERS.find(l=>l.id===id)!.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

for (const layer of LAYERS) {
  const filename = `${layer.id}-${layer.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
  const md = `# ${layer.id} — ${layer.name}

> ${layer.desc}

**Verdict:** ${layer.verdict}

${layer.detail}

## Gold-mining analogy

**${layer.goldTitle}**

${layer.goldAnalogy}

## Sublayers

${layer.sublayers.map(s => `### ${s.id} — ${s.name}${s.defensible ? " ★ defensible" : ""}\n\n${s.desc}\n`).join("\n")}

## Sample players today

${layer.players.map(p => `- ${p}`).join("\n")}

---

*Part of the [Supply Chain of Intelligence™](https://supplychainofai.com/framework). Licensed CC BY 4.0.*
`;
  writeFileSync(join(ROOT, "layers", filename), md);
  console.log("wrote", filename);
}

// ── machine-readable JSON ───────────────────────────────────────────────────
const layersJson = LAYERS.map(l => ({
  id: l.id,
  name: l.name,
  short_name: l.shortName,
  description: l.desc,
  detail: l.detail,
  verdict: l.verdict,
  sample_players: l.players,
  sublayers: l.sublayers.map(s => ({
    id: s.id,
    name: s.name,
    description: s.desc,
    defensible: !!s.defensible,
  })),
}));

writeFileSync(
  join(ROOT, "data", "layers.json"),
  JSON.stringify(
    {
      $schema: "https://supplychainofai.com/spec/schema/layers.v1.json",
      version: "1.0",
      framework: "Supply Chain of Intelligence",
      canonical_url: "https://supplychainofai.com/framework",
      license: "CC-BY-4.0",
      defensible_triangle: DEFENSIBLE_TRIANGLE,
      tiers: {
        substrate: ["L-1", "L0", "L1", "L2", "L3", "L8"],
        workflow: ["L4", "L5", "L6"],
        surface: ["L7"],
      },
      layers: layersJson,
    },
    null,
    2,
  ),
);

writeFileSync(
  join(ROOT, "data", "laws.json"),
  JSON.stringify(
    {
      $schema: "https://supplychainofai.com/spec/schema/laws.v1.json",
      version: "1.0",
      framework: "Supply Chain of Intelligence",
      canonical_url: "https://supplychainofai.com/framework",
      license: "CC-BY-4.0",
      laws: LAWS.map(l => ({
        num: l.num,
        title: l.title,
        short_title: l.shortTitle,
        description: l.desc,
        live_example: l.example,
        predicts: l.prediction,
      })),
      observations: OBSERVATIONS.map(o => ({
        num: o.num,
        title: o.title,
        short_title: o.shortTitle,
        description: o.desc,
        examples: o.examples,
        layer_tags: o.layerTags,
        case_study: o.caseStudy ?? null,
      })),
    },
    null,
    2,
  ),
);

console.log("wrote spec/data/layers.json and spec/data/laws.json");
