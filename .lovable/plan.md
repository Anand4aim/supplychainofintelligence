## The strategic problem

Today every verdict, chip, and case study stops at the **layer** ("L1 + L5"). That's the same vocabulary every analyst, blog post, and pitch deck already uses. It signals category, not insight.

The framework's actual edge is the **50 sublayers** — saying "Harvey is **L1b proprietary data + L5b vertical agents**" is a different claim than "Harvey is L1+L5." The first is auditable. The second is a slogan.

This is also a defensive moat for the site itself: anyone can copy "10 layers," but the only way to copy 50 sublayers-with-verdicts is to actually do the work.

## Notation decision (please confirm)

Our existing sublayer IDs in `src/data/layers.ts` are **letter-suffixed**: `L1a, L1b, L1c, L1d, L1e` (5 per layer). You wrote "L1.2 / L2.4" which suggests numeric. Two options:

- **Keep letters** (`L1b`, `L5a`) — already shipped, already in `DefinedTerm` JSON-LD, already on every layer detail page. Zero migration. Recommended.
- **Switch to numeric** (`L1.2`, `L5.1`) — cleaner-looking but breaks every existing URL anchor, every JSON-LD `termCode`, llms.txt, and the structured-data already indexed by GSC.

I recommend **keeping letters**. If you want a numeric *display* later we can render `L1b` as `L1.2` in the UI without changing IDs.

## The architecture

```text
src/data/layers.ts         ← single source of truth (50 sublayers, already exists)
src/data/sublayerIndex.ts  ← NEW: typed registry + helpers
   SUBLAYER_BY_ID["L1b"]  → { id, name, layerId, defensible, color, label }
   formatSublayers(["L1b","L5a"]) → "L1b Proprietary Data + L5b Vertical Agents"

CaseStudy type:
   layers:    LayerId[]        ← keep (for back-compat, filters, market map)
   sublayers: SublayerId[]     ← NEW canonical field, drives every chip
   verdict:   string           ← rewritten to cite sublayers, not layers
   layer_scores[].sublayers[]  ← already exists, but free-text. Add canonical `id`.

<LayerTag> component  → extend to <SublayerTag id="L1b" />
                        same color as parent layer, smaller chip
```

## What changes on screen

1. **Verdict chips** (ProofOfCorpus, CaseStudyCard, Analysis grid, hero):
   - Before: `Fortress · L1b + L5 + L8`  (mixed, accidental)
   - After:  `Fortress · L1b + L5b + L8a` (always sublayer-precise)

2. **Case study pages** — verdict line, "Who wins", and `layer_scores` annotations all reference canonical sublayer IDs with hover/click → sublayer definition.

3. **Homepage ProofOfCorpus** — the 6 featured cards each show a sublayer-level verdict, not layer-level.

4. **Market Map** — archetypes get sublayer signatures (e.g., Fortress = "L1b + L3 + L5b + L8a-c").

5. **Framework page (`/framework`)** — list view already shows sublayers; add anchor links so verdict chips elsewhere deep-link to the right sublayer block (e.g., `/framework/l1-data#l1b`).

## SEO upside

Each sublayer becomes a citable atom:
- `DefinedTerm` JSON-LD already emits per-sublayer entries on layer pages — sublayer chips with stable anchors make them linkable from anywhere.
- llms.txt gets a "Sublayer index" section so LLMs can answer "what is L1b?" with our wording.
- New long-tail queries: "proprietary data moat AI L1b", "vertical agent layer L5b", etc.

## Phased rollout (so we don't break the site mid-flight)

**Phase 1 — Foundation (no visible change yet)**
- Build `src/data/sublayerIndex.ts` with typed IDs and helpers.
- Add `<SublayerTag>` component.
- Add optional `sublayers?: SublayerId[]` to `CaseStudy` type (back-compat).

**Phase 2 — Flagship pass (5 case studies + homepage)**
- Rewrite verdicts + chips for: Jasper, Harvey, Sierra, Devin, Glean, Bloomberg (the homepage features).
- Update ProofOfCorpus to render sublayer chips.
- Ship and look at it together before going wider.

**Phase 3 — Full corpus**
- Walk the remaining ~22 case studies, adding canonical `sublayers` arrays + rewriting verdict + `layer_scores.sublayers.id`.
- Update Market Map archetypes.
- Update llms.txt sublayer section + sitemap anchors.

**Phase 4 — Editorial enforcement**
- Add a lint script (`scripts/sublayer-lint.ts`) that fails CI if any case study cites a layer in `verdict` without a corresponding entry in `sublayers[]`. Keeps future you honest.

## Open questions before I start

1. **Notation:** confirm letters (`L1b`) vs numeric display (`L1.2`).
2. **Scope of Phase 2:** the 6 homepage-featured studies, or a different starter set?
3. **Verdict voice:** should chips read `L1b Proprietary Data` (descriptive) or just `L1b` (terse, hover for name)? Recommend descriptive on cards, terse inside dense tables.

Reply with answers to 1–3 and I'll execute Phase 1+2 in one pass.
