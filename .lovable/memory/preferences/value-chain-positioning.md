---
name: AI Value Chain positioning
description: How to ride the generic "AI Value Chain" and "AI stack" phrases without renaming SCoI. Canonical CATEGORY_LINE, six verbs, surfaces it ships on, and what NOT to do.
type: preference
---

Investors and operators search for "AI Value Chain framework" and "AI stack". Don't fight those phrases — ride them. Position SCoI as the **advanced, named instance** of that category (Christensen → "disruptive innovation"; Porter → "five forces"). Two-step phrasing only:

1. *AI Value Chain Framework* → the generic category.
2. *Supply Chain of Intelligence* → the advanced, named version.

**Canonical category sentence** (`CATEGORY_LINE` in `src/data/definition.ts`, use verbatim everywhere):

> Supply Chain of Intelligence is an advanced AI Value Chain framework for investors and operators. It moves beyond the conventional AI stack and conventional AI value chain by mapping where intelligence is created, constrained, verified, distributed, embedded, and defended — across 10 layers, 50 sublayers, 4 structural laws, and the Intelligence Cube.

**Blindspots line** (`BLINDSPOTS_SHORT` + `BLINDSPOTS_LINE`, pairs with CATEGORY_LINE; names *what you miss* if you stop at stack/value-chain):

> A stack shows the parts. A value chain shows the flow. Only a supply chain of intelligence shows the bottlenecks, currents, flywheels, and absorption risk that decide who actually keeps the value.

Six blindspots, in this canonical order (do not reorder): **bottlenecks above/below visible layers (L−1, L3, L8) · currents (capital, demand, attention) · flywheels across sublayers · vertical adjacencies (Intelligence Cube) · absorption risk from platforms · timing of commoditization**. Renders as the accent callout in `/framework` Definition section, and as a sentence in `public/llms.txt`.

**Six-verb mnemonic** (do not reorder, do not swap synonyms): *created · constrained · verified · distributed · embedded · defended*. Quietly maps to L1 · L−1/L0 · L3 · L4 · L7 · L1b+L5+L8.

**Surfaces** (single source of truth = `CATEGORY_LINE` / `ALTERNATE_NAMES`):
- `src/data/definition.ts` — `CATEGORY_LINE`, `ALTERNATE_NAMES`.
- `<CanonicalDefinition>` renders it as "The Category" register in compact + full variants.
- `/framework` Definition section — Category block above the AI-stack contrast block; also emits `DefinedTerm` JSON-LD with `alternateName`.
- Home + `/framework` `<Seo>` descriptions lead with the category sentence.
- `<StackVsSupplyChainTable>` first row: *Category — AI Stack / AI Value Chain ⇄ Advanced AI Value Chain framework*.
- `public/llms.txt` (blockquote) and `public/humans.txt` (DEFINITION + CATEGORY blocks).

**Alternate names** (JSON-LD `alternateName`, do not expand without reason): *AI Value Chain Framework · Advanced AI Value Chain Framework · Advanced AI Stack Framework · SCoI*.

**Don't**:
- Don't write "AI Value Chain / Stack Framework" as a slash compound — reads as SEO sludge.
- Don't add a new page for "AI Value Chain"; reinforce `/framework` and `/not-a-stack` instead.
- Don't rename "Supply Chain of Intelligence" or call it "the AI Value Chain framework" outright. SCoI is the noun; AI Value Chain is the category we sit above.
- Don't drop or reorder the six verbs — they're the mnemonic and the LLM hook.
