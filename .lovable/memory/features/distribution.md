---
name: Distribution primitives
description: How to use ExportablePng (watermarked image export) and CopySnippet (LinkedIn-ready copy) across the site
type: feature
---
**Rule:** The site is a distribution engine. Every high-signal visual gets `<ExportablePng>`. Every key argument gets `<CopySnippet>`. Attribution is auto-injected — never write it manually.

**Components:**
- `src/components/ExportablePng.tsx` — wraps any visual block, ships a "PNG" download button (top-right, hover-revealed on desktop, always visible on mobile). Appends a watermark strip (10-layer color spectrum + caption + "Source: The Supply Chain of Intelligence™" + supplychainofai.com) before rasterizing via html-to-image.
- `src/components/CopySnippet.tsx` — copy button that appends canonical attribution (`Source: The Supply Chain of Intelligence™ — supplychainofai.com/[path]`) to any snippet. Two variants: `default` (button) and `quote` (inline tiny link).

**Where wired:**
- Index matrix (`src/pages/Index.tsx`) — wrapped in ExportablePng with caption "Sales & Marketing Tech — Layer Matrix"
- Case study detail (`src/pages/CaseStudyDetail.tsx`) — CopySnippet renders any study with `linkedin_snippet`
- `/start` — Apollo SaaSpocalypse-survivor block with CopySnippet
- Add to: Intelligence Cube, Cube 2D projection, SublayerImpactMap, layer detail diagrams, predictions, law essays (next loop)

**Data fields:**
- `CaseStudy.linkedin_snippet?: string` — 120-150 word LinkedIn-ready text. Do NOT include attribution; CopySnippet appends it.
- Future: add same field to `Prediction` and `LawEssay`.

**Why:** Spread the framework as vocabulary. Snippet (not full article) is the right unit — drives traffic back to canonical source instead of cannibalizing it.

**Apollo case study** (`slug: apollo-thin-stack-survivor`) is the canonical SaaSpocalypse-survivor explainer. Featured on `/start` as the 60-second framework demo. The narrative: L1b moat + L2 connector + receding L7 = thin-stack survival. Use this as the reference example when explaining the framework to anyone.

**ShareKit (per-article LinkedIn kit)** — `src/components/share/ShareKit.tsx` sits at the bottom of `/live/:slug` and `/posts/:slug`. Three artifacts from one argument:
1. `src/components/share/ShareHero.tsx` — branded hero image, 1200×627 (article cover) + 1:1 (feed), with the signature 10-layer impact bar strip and verdict pill. Rendered from framework data, never AI art.
2. Short feed post (stored `linkedin_post`, or derived).
3. "Detailed article (Pulse)" — long-form text from `src/lib/pulseText.ts`.

**Pulse rule:** LinkedIn's Article editor does NOT parse markdown on paste. Emit plain text only — bare heading lines, `•` bullets, curly-quote pull-quotes. Never `##`, `**`, `_`, `>`, or tables. Diagrams go in the PNG, never the text. Attribution + personal-capacity disclosure auto-appended by `pulseText.ts`.
