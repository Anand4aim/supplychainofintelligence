## Goal

Turn the site into a **distribution engine**. Every key visual gets a watermarked PNG export. Every key argument gets a "copy as LinkedIn snippet" button. The Apollo case study becomes the 60-second explainer that makes the whole framework click.

## Three workstreams

### 1. Watermark + image export system

**New primitive:** `<ExportablePng>` wrapper component that:
- Wraps any visual block (the matrix on Index, the Intelligence Cube, the cube projection, layer diagrams)
- Renders a small "Download PNG" button (top-right, ghost style, only visible on hover on desktop, always on mobile)
- Uses `html-to-image` to rasterize the wrapped DOM to PNG
- Appends a watermark strip at the bottom before download: `Source: The Supply Chain of Intelligence™ (supplychainofai.com)` in mono font on a thin band matching the layer color spectrum

**Static images** (OG cards, public/*.png, hero images): regenerate or post-process to bake the same watermark into the bottom-right corner at ~50% opacity.

**Where it gets wired up:**
- Matrix table on `/` (Index)
- Intelligence Cube component (every page that renders it)
- Cube 2D projection on case studies / live articles
- Sublayer Impact Map
- Layer detail page diagrams
- OG images (static regen)

### 2. Copy-as-snippet system

**New primitive:** `<CopySnippet>` button component
- Accepts a `text` prop (the pre-formatted ~120-150 word LinkedIn-ready snippet)
- On click → `navigator.clipboard.writeText(text + attribution footer)` → toast "Copied — ready to paste on LinkedIn"
- Attribution always: `\n\nSource: The Supply Chain of Intelligence™ (supplychainofai.com/[path])`
- Variant: `<CopyQuote>` for short pull-quotes (tweet-sized)

**Type additions:**
- Add `linkedin_snippet?: string` to `CaseStudy`, `Prediction`, `LawEssay` types
- Backfill snippets for: all existing case studies, all predictions, all 3 laws

**Where it gets wired up:**
- Case study detail pages (next to share button)
- Prediction cards (per prediction)
- Law essay pages
- Layer detail pages (copy the layer definition)
- Core principle blocks on `/start`

### 3. Apollo case study — the canonical SaaSpocalypse-survivor story

Why Apollo wins as the explainer: it's a **counter-intuitive win**, not just another death. Jasper-died, Chegg-eaten, etc. are all "look at the corpse" stories. Apollo is "look at the survivor who *gave up features* to win." That's the framework doing real work.

**Narrative arc (Anand's framing, layer-mapped):**
- **Started:** Apollo had L1b moat (300M contact profiles, B2B data)
- **Mid-2010s mistake:** Built up the SaaS stack — L5 (email sequences, dialer, workflows), L7 (full UI app), L8 (the "Apollo platform")
- **The SaaSpocalypse threat:** As ChatGPT/Claude become L2 command centers, marketers don't want to log into 10 apps. The L7/L8 surface evaporates.
- **The pivot:** Killed nothing visible, but bet on **becoming the L1 connector to L2**. When you ask Claude "find 50 marketing leaders at Series B startups," Apollo's MCP connector serves the answer. Free distribution. They ride on top of Claude instead of competing with it.
- **Verdict:** L1 + L2-connector hybrid. The thin-stack survivor. Demonstrates Law of Layer Compression in real time.

**Implementation:**
- Full case study entry in `src/data/caseStudies.ts` with `layer_scores`, `cube_position`, `timeline`, `who_wins`/`who_loses`, `linkedin_snippet`, `pull_quote`, sources
- Feature prominently on `/start` as the 60-second explainer (replace or supplement current hero example)
- Cross-link from Law of Layer Compression essay and from L1 + L2 layer pages
- Add to LinkedIn snippet backfill so it's the first thing people copy

## Execution order (this loop)

1. Install `html-to-image` (small dep, ~12kb gzipped)
2. Build `<ExportablePng>` and `<CopySnippet>` primitives
3. Add `linkedin_snippet` field to types; write the Apollo case study with full snippet
4. Wire `<ExportablePng>` into the matrix on Index (highest-leverage visual)
5. Wire `<CopySnippet>` into case study detail + prediction cards
6. Feature Apollo on `/start`
7. Update memory with the "Apollo is the canonical explainer" rule + watermark/snippet conventions

## Out of scope this loop

- Regenerating all static OG/hero PNGs with baked watermarks (separate batch job — flag for follow-up)
- Backfilling LinkedIn snippets for *every* prediction and law (will do the top 3-5 each; flag rest)
- A "copy entire article" button (rejected by analysis — snippet is the right format)

## Technical notes

- `html-to-image` (not `dom-to-image`) — better React/SVG/CSS-var support, actively maintained
- Watermark strip rendered as a real DOM node appended to the clone before rasterization (cleaner than canvas post-processing, respects layer colors)
- Toast via existing `sonner` setup
- All new components use semantic tokens only; no hardcoded colors
