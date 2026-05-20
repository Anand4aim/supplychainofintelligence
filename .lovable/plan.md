## The redundancy problem

The 10-layer grid is currently rendered as a full artifact in **8 places**. Worse, three full conceptual sections (Gold Mining Analogy with sublayers, Defensible Triangle, Four Laws) appear on BOTH Home and Framework. The site feels repetitive because it literally is.

## Target architecture

One job per page. No section appears on more than one page.

```
/               Home  →  magazine cover. Pitch + applied examples + proof + cube + audit.
/framework      Framework  →  the canonical reference. Full breakdown of every concept.
/framework/:id  Layer detail  →  deep dive per layer (unchanged).
/posters        Posters  →  hidden gallery. All shareable artifacts. Not in nav.
/stack          →  301 redirect to /framework.
```

## What lives where after refactor

**Home (`/`)** — magazine cover, what's new, why care, proof
- Hero with interactive 10-layer stack (right side) — **keep, this is the visual signature**
- Sales & Marketing Tech matrix (worked example, unique to Home)
- StartHereStrip · Defensibility Audit · ProofOfCorpus
- VoicesStrip · FrameworkApplied · Case Studies · Proof Rail
- Intelligence Cube preview (visual only, no concept explanation)
- Diagnostic CTA · Subscribe
- **REMOVED:** StackPosterFull, "Full 10-Layer Map" section, Gold Mining Analogy, Defensible Triangle (preview), Four Structural Laws block

**Framework (`/framework`)** — the canonical reference doc
- Hero (unchanged)
- JTBD vs SCoI table (Desirability without Defensibility)
- Gold Mining Analogy with sublayers (the reference rendering)
- Agent Decoder
- Defensible Triangle (full treatment)
- Intelligence Cube (full concept explanation)
- Four Structural Laws (full)
- Five Observations · Six Archetypes
- Footer link: "Shareable posters →" → `/posters` (subtle)
- **REMOVED:** in-page StackPoster section (moves to /posters)

**Posters (`/posters`)** — new hidden page
- StackPosterFull (10×5 table) — downloadable
- StackPoster (square) — downloadable
- Header + footer link back to /framework
- Not added to nav, not in sitemap as priority, but indexable so direct links work
- Meta: noindex actually skipped — we want it crawlable so people can find the poster

**Stack (`/stack`)** — deleted
- Route removed from App.tsx, Stack.tsx file deleted
- Add a redirect route → `/framework`
- Update any in-code links pointing to `/stack` → `/framework`

## Implementation steps

1. **Create `src/pages/Posters.tsx`** — header + StackPosterFull + StackPoster + back link.
2. **Edit `src/App.tsx`** — add `/posters` route; replace `/stack` route with `<Navigate to="/framework" replace />`; remove Stack import.
3. **Edit `src/pages/Index.tsx`** — delete StackPosterFull block (lines ~223–231), Gold Mining Analogy section (~492–593), Full 10-Layer Map section (~595–743), Four Structural Laws section (~745–811). Keep everything else. Remove unused imports (StackPosterFull, IconPickaxe, IconBrain, GOLD_KEY_INSIGHT, LAWS, LAW_ESSAY_BY_NUM, SketchArrow, SketchConnector if now unused).
4. **Edit `src/pages/Framework.tsx`** — remove the inline `<StackPoster />` section (~733–747), replace with a small subtle footer link "Shareable posters →" pointing to `/posters`. Remove unused StackPoster import.
5. **Delete `src/pages/Stack.tsx`**.
6. **Grep for stray links to `/stack`** in other components/pages and rewrite to `/framework`.
7. **Update `public/sitemap.xml`** — remove `/stack`, add `/posters` (low priority).
8. **Update memory** — add a Core rule: "Layers/sublayers are rendered as full artifacts only on /framework (reference) and /posters (shareable). Home shows the interactive hero stack + applied examples only. No third copy."

## Risk / what stays the same

- All layer data, layer colors, layer detail pages, Intelligence Cube, components — untouched.
- Home keeps its hero interactive stack — visitors still see the framework above the fold, just once instead of three times.
- No copy is rewritten. Sections are moved or deleted, not edited.
- SEO: /framework gets stronger (sole owner of the canonical concept), /stack 301s preserve any inbound links, /posters is a low-stakes add.

## What I'm explicitly NOT doing in this pass

- Not touching LayerDetail pages.
- Not changing any data files.
- Not rewriting Hero copy.
- Not redesigning anything visually — pure information architecture cleanup.
