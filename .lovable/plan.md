## Goal

Package the existing site content into three platform-ready articles you can copy-paste, plus a public GitHub-ready spec folder. Same words, three surfaces. No new arguments — just distribution.

## The three articles (sequenced)

1. **Article 1 — "The Supply Chain of Intelligence: a 10-layer map of the generative AI stack"** (the framework intro). Source: `/framework` definition + Map + the 10-layer summary.
2. **Article 2 — "The 4 Laws of the AI Supply Chain"** (why wrappers die, where value accrues, Generation ≠ Verification, Surface vs Chain). Source: `src/data/lawEssays.ts` + `/framework` Laws section.
3. **Article 3 — "Apollo and the SaaSpocalypse: a thin-stack survivor, decoded"** (the case study). Source: `src/data/caseStudies.ts` apollo-thin-stack-survivor.

## What I'll deliver per article

For each of the three, three files, all under a new `docs/distribution/` folder so it's version-controlled and auto-syncs to GitHub:

```text
docs/distribution/
├── README.md                          ← index + "how to repost" instructions for you
├── 01-framework/
│   ├── linkedin-article.md            ← paste-into-LinkedIn copy; image URLs inline; CTA back to /framework
│   ├── substack-medium.md             ← same body, with "Originally published at supplychainofai.com/framework" header + canonical link note
│   └── images.md                      ← list of hosted image URLs + suggested alt text + caption
├── 02-four-laws/
│   └── (same three files)
└── 03-apollo-teardown/
    └── (same three files)
```

LinkedIn articles don't render Markdown — but pasting Markdown into LinkedIn's article editor preserves headings, bold, lists, and inline images. I'll keep formatting LinkedIn-safe (no tables, no footnotes, no code fences for prose).

## Hosted diagrams (Substack/Medium need URLs, LinkedIn needs file uploads)

I'll generate PNG exports of the key visuals and host them at stable URLs on the site so Substack/Medium can embed by URL and you can download the same PNGs for LinkedIn upload.

Diagrams per article:

| Article | Diagrams |
|---|---|
| 1. Framework | 10-layer stack (full color), Substrate/Workflow/Surface tier diagram, Defensible Triangle |
| 2. Four Laws | One poster per Law (4 images), built from existing `FourLawsPoster` styling |
| 3. Apollo | Layer-by-layer decode strip (L1b + L2 + L7), thin-stack-survivor diagram |

Two delivery modes, both shipped:

- **Hosted URLs**: PNGs written to `public/og/distribution/` so they live at `https://supplychainofai.com/og/distribution/<file>.png`. Substack/Medium embed by URL.
- **Downloadable copies**: Same PNGs duplicated to `/mnt/documents/distribution/` so you can drag-drop into LinkedIn's article editor.

Rendering: a small Playwright script (`scripts/export-distribution-pngs.ts`) navigates to the existing poster routes (`/posters`), screenshots each at 2x DPI, writes both copies. Reuses the visuals already on the site — no new design work, exact color system preserved.

## GitHub repo shape

You asked to work directly on GitHub. Since this Lovable project is already GitHub-synced (the codebase auto-pushes), I'll structure the framework as an open spec **inside this same repo** under a new top-level `/spec/` folder. It becomes a documentation surface visible on GitHub immediately, without spinning up a second repo:

```text
/spec/
├── README.md                  ← landing page: definition, 10 layers TL;DR, canonical link
├── LICENSE                    ← CC BY 4.0 (matches "give it away as a standard" intent)
├── CITATION.cff               ← so GitHub renders a "Cite this repository" button
├── layers/
│   ├── L-1-resources.md
│   ├── L0-infrastructure.md
│   ├── ... (one per layer, generated from src/data/layers.ts)
│   └── L8-memory.md
├── laws.md                    ← the 4 Laws verbatim
├── currents.md                ← the 3 Currents
├── intelligence-cube.md       ← Functions × Verticals × Layers
└── data/
    ├── layers.json            ← machine-readable, generated from src/data/layers.ts
    └── sublayers.json
```

If you later want a separate standalone `supply-chain-of-intelligence` repo on GitHub, you can fork `/spec/` out — but starting here means zero new infra and the spec stays in lockstep with the live site (single source of truth = `src/data/layers.ts`).

## Voice and tone

- Stratechery editorial + McKinsey authority (matches your existing tone memory).
- No harsh verdicts. Soft-framing per `mem://preferences/tone`.
- Personal-capacity safe: no "hire me / engagement / advisory" CTAs. CTAs are editorial — "read the full framework", "run the self-assessment", "follow on LinkedIn".
- Brand line on every piece: *"The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack."*
- Attribution footer auto-appended to every article: `Originally published at supplychainofai.com/<path>. © Anand Arivukkarasu, personal capacity.`

## Order of operations

1. Build the PNG export script + render all diagrams to `public/og/distribution/` and `/mnt/documents/distribution/`.
2. Write Article 1 (Framework) in all three formats. Show it to you for tone check before I generate 2 and 3.
3. On your green light, ship Articles 2 + 3 in parallel.
4. Build `/spec/` from `src/data/layers.ts` (auto-generated where possible, hand-edited landing README).
5. Final deliverable: a single chat summary linking each LinkedIn `.md`, each Substack `.md`, the hosted image URLs, and the GitHub `/spec/` folder URL.

## What I won't do

- Won't rewrite the arguments. Direct lift from `/framework`, `lawEssays.ts`, and `caseStudies.ts`, reformatted per platform.
- Won't create a separate GitHub repo (no auth to do that; the Lovable sync already pushes this repo). If you want a dedicated repo later, you fork `/spec/` out manually — 5 min job.
- Won't add forms, lead capture, or any transactional CTA. L-1A safe.

## Open question before I start

Two visual-spec choices that change rendering — pick now so I render once:

- LinkedIn cover image aspect ratio: **1200×627** (LinkedIn's documented optimum) or **1920×1080** (looks better on Substack/Medium hero)? I'd default to **1200×627** and crop-safe the design so it works on both.
- Diagram background: **navy (#0F172A, matches site)** or **white (better for LinkedIn light-mode feed thumbnails)**? I'd default to **navy** for brand consistency.

Reply "go" with any overrides and I'll start with the PNG render + Article 1.