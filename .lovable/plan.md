
# Strategy: Make the Framework Feel Concrete, Not Theoretical

No code changes in this pass. This is the diagnosis, the cross-LLM critique, and the rebuild blueprint for Home and /framework. You decide what ships.

---

## 1. Three-LLM critique (independent reads)

I pretended to be three different models reading the pages cold. Their criticisms converge on the same three problems — which is the signal that they're real, not stylistic.

### ChatGPT — "Structural editor"
> "You're teaching the vocabulary and the thesis at the same time. A first-time reader meets the string `L1b + L5a/b/d + L8c/d/e` in the Triangle before they've internalised what L1 even *is*. That is a textbook teaching itself in chapter 1. Open with a company they already know, decompose it into three layers, *then* introduce the labels. Right now the Framework page is a glossary masquerading as a narrative."

**What ChatGPT would cut first:** the codes `L1b/L5a/L8c` in the first appearance of the Triangle. Replace with company names, reveal the codes on the second mention.

### Claude — "Reader empathy"
> "Count the sub-frameworks on /framework: 3 Tiers (Surface/Workflow/Substrate), The Trap (Desirability vs Defensibility), Gamma vs Replit, the 10×5 Grid, Gold Mining Analogy, Agent Decoder, Defensible Triangle, Intelligence Cube, 4 Laws, 5 Observations, 6 Archetypes, Posters. That is **twelve frameworks inside the framework**. Each one is good in isolation. Together they overwhelm. The reader cannot tell which is the thesis and which is a footnote. The Triangle alone could carry the page — everything else should collapse behind it as evidence."

**What Claude would cut first:** 5 Observations (overlap with Laws), 3 Tiers (says the same thing as the Triangle in different shape), Gold Mining (charming, but a 4th metaphor competing with chain / cube / chess).

### Gemini — "Redundancy auditor"
> "Home renders: 10-layer interactive stack + Framework Summary Poster + Crux blank grid + Sales Tech matrix + Audit + Corpus + Cube preview + Voices + Newsletter. /framework renders: hero + 3 Tiers + Desirability table + Gamma/Replit + 10×5 Grid + Gold Mining (10 long cards) + Agent Decoder + Triangle + Cube + 4 Laws + 5 Observations + 6 Archetypes + Posters + CTA. The two pages re-explain the same thesis with different visual containers. A first-time visitor can't tell which page is the canonical one. **The site is two front doors competing for the same job.**"

**What Gemini would cut first:** the 10×5 blank grid appears on both pages, "Framework · One Image" appears as an eyebrow on both pages, Triangle is previewed on Home and rendered on /framework, Cube is previewed on Home and rendered on /framework. Pick one page per concept.

---

## 2. Why people say "I couldn't get clarity quickly"

Their feedback is correct and it has three root causes, in order of severity:

### Root cause #1 — Codes-before-anchors (the L1b problem)
The Triangle currently reads: *"L1b + L5a/b/d + L8c/d/e = fortress."*
That sentence is true. It is also unreadable until you've memorised the taxonomy. A new reader sees alphabet soup and bounces.

**What it should read:** *"Bloomberg owns the data nobody else can buy. Harvey owns the legal workflow. Sierra remembers every customer. **Three layers. One moat.** That is the Defensible Triangle."*
Then on the second mention, in smaller type: *"In the taxonomy: L1b Proprietary Data + L5a/b/d Execution + L8c/d/e Memory."*

The codes are a reference grammar, not an opening line.

### Root cause #2 — Too many models, no spine
The Framework page has no clear spine. The reader hits 12 frameworks back-to-back and can't tell what's load-bearing.

The Triangle is the spine. Everything else is either:
- **Evidence** for the Triangle (Gamma vs Replit, Archetypes, Case Studies)
- **Mechanism** behind the Triangle (the 4 Laws — *why* the Triangle works)
- **Extension** of the Triangle (the Cube — Triangle × Functions × Verticals)
- **Decoration** (Gold Mining metaphor, 3 Tiers, 5 Observations)

Decoration must go or be demoted to footnotes. The reader should be able to recite the structure as: **Triangle → Laws → Cube → Archetypes**. Four things, in that order.

### Root cause #3 — Home and /framework compete instead of compound
Right now Home tries to *be* the framework (interactive stack, summary poster, crux grid, sales matrix). /framework tries to *re-explain* the framework. The reader doesn't know which page to trust.

The fix is brutal page ownership:
- **Home = the "aha" in 30 seconds, with logos.** Three company cards. One contrast. One CTA. Stop.
- **/framework = the reference manual.** Triangle → Laws → Cube → Archetypes. Deep, but linear.
- **The 10×5 grid lives in exactly one place** — on /framework, as the reference map after the Triangle has earned the right to label it.

---

## 3. The Redundancy Ledger

Everything that currently exists twice (or three times). One column is the source of truth, the other is the duplicate to remove.

```text
CONCEPT                       HOME                        /FRAMEWORK                   DECISION
────────────────────────────────────────────────────────────────────────────────────────────────────────────
10×5 grid (blank)             Crux section (line 238)     The Grid section (line 332)  Keep on /framework. Cut from Home.
Framework Summary Poster      line 220                    —                            Keep on Home (it's the share asset).
"Framework · One Image"       eyebrow on Home + on /fw    same eyebrow                 Rename /fw eyebrow → "Reference Map".
Sales Tech layer matrix       Worked example (line 280)   —                            Keep on Home — but move BELOW the proof row.
Triangle                      not on Home (good)          Defensible Triangle (584)    Keep on /fw. Add logo-led preview to Home.
Cube                          previewed somewhere         Intelligence Cube (629)      Keep on /fw. Drop the Home preview.
4 Laws                        not rendered                Laws section (681)           Keep on /fw only.
5 Observations                not rendered                Observations section (722)   FOLD each obs into the matching Law as evidence.
6 Archetypes                  not rendered                Archetypes section (777)     Collapse to a logo grid (2 logos per archetype).
3 Tiers (Surface/Workflow…)   not rendered                section (65)                 CUT. Triangle says it better with logos.
Desirability vs Defensibility not rendered                section (117)                Keep, but compress 12-row table → 4 rows.
Gamma vs Replit               not rendered                section (211)                Keep — this is gold. Promote it.
Gold Mining (10 long cards)   not rendered                section (359)                CUT main render. Keep one-line analogy + link to glossary.
Agent Decoder                 not rendered                section (507)                Keep. It's the most-asked question in the inbox.
Posters link                  footer                      section (819)                Keep on /fw only.
```

**Net effect:** /framework drops from ~12 sub-sections to ~6. Home drops from ~10 sub-sections to ~6. Reading time on /framework drops from ~14 min to ~7 min without losing a single idea.

---

## 4. The rebuild — page by page

### 4A. Home — "the 30-second aha"

```text
1. Hero                           (keep — tagline is the SEO + brand anchor)
2. THREE-LAYER PROOF (new)        ← the new spine of Home
   ┌──────────────────────────────────────────────────────────────┐
   │  Headline: "Three layers. One moat. This is the framework."  │
   │                                                              │
   │  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
   │  │ BLOOMBERG │  │  HARVEY  │  │  SIERRA  │                   │
   │  │   logo    │  │   logo   │  │   logo   │                   │
   │  │           │  │          │  │          │                   │
   │  │ L1 DATA   │  │ L5 EXEC  │  │ L8 MEM   │                   │
   │  │           │  │          │  │          │                   │
   │  │ "owns the │  │ "owns    │  │ "remem-  │                   │
   │  │  corpus   │  │  legal   │  │  bers    │                   │
   │  │  nobody   │  │  work-   │  │  every   │                   │
   │  │  can buy" │  │  flow"   │  │  cust."  │                   │
   │  └──────────┘  └──────────┘  └──────────┘                   │
   │                                                              │
   │  Sub: "In the taxonomy: L1b + L5a/b/d + L8c/d/e."           │
   └──────────────────────────────────────────────────────────────┘

3. CONTRAST ROW (new, replaces Sales Matrix prominence)
   ┌──────────────────────────┐  ┌──────────────────────────┐
   │  JASPER  (L7 only)       │  │  CURSOR  (L4+L5+L6+L8)   │
   │  $1.5B → $300M           │  │  $9B+, still compounding │
   │  "wrapper, absorbed"     │  │  "owned the workflow"    │
   └──────────────────────────┘  └──────────────────────────┘
   Caption: "Same JTBD. Different layers. Different fate."

4. Framework Summary Poster      (keep — share asset)
5. Sales Tech matrix             (keep but move here — worked example)
6. Audit CTA                     (keep)
7. Proof of Corpus               (keep)
8. Voices Strip                  (keep)
9. Newsletter                    (keep)

CUT FROM HOME:
- "The Crux · One Image" section (the blank 10×5 grid) — lives on /framework now
- "Start Here · 5-beat strip" — promise it makes is now redundant with proof row above
- Cube preview — drop, /framework owns the Cube
```

### 4B. /framework — "the reference manual" (Triangle as spine)

```text
1. Hero                                      (keep, shorten by 40%)
   "JTBD finds demand. The Supply Chain finds defensibility."
   No more "gold from the ground" line — that metaphor is being cut below.

2. THE TRIANGLE (promoted to position #2, was #8)
   Same 3-card layout as Home, but with the full explanation:
   - Each vertex shows 3 company logos, not 1
       L1 DATA       → Bloomberg · Apollo · Tempus
       L5 EXECUTION  → Harvey · Sierra · Cursor
       L8 MEMORY     → Sierra · Glean · Clay
   - Below the vertices: "Own all three → fortress.
     Own one deeply (NVIDIA on L0, Vanta on L3) → also survivable.
     Own a thin sliver of a contested layer → graveyard."
   - Codes (L1b, L5a/b/d, L8c/d/e) shown in small type beneath each vertex,
     never in the headline.

3. DESIRABILITY vs DEFENSIBILITY (kept, compressed to 4 rows)
   Keep Gamma vs Replit two-fate proof — it earns its keep.

4. THE 10×5 GRID                              (the reference map)
   Now the reader has the Triangle as a mental anchor, so the grid
   reads as "the full taxonomy behind the three vertices you just saw."
   Eyebrow renames "The Framework · One Image" → "Reference Map".

5. AGENT DECODER                              (keep — high-traffic question)
   Repositioned as "applying the Triangle to the 'agent' marketing wave."

6. THE 4 LAWS                                 (keep, each law gets 1 observation
                                                folded in as its evidence row)
   Law I — Intelligence Commoditizes Downward
     Evidence: [former Obs that maps to Law I]
     Example logo row: Jasper, Chegg, Stack Overflow
   Law II — Value Accrues at Bottlenecks
     Evidence: [former Obs]
     Logo row: NVIDIA, Bloomberg, Vanta
   …etc.

7. THE INTELLIGENCE CUBE                      (keep, single render)
   Framed as "the Triangle, extended into functions × verticals."

8. ARCHETYPES (collapsed)
   Was: 6 long cards.
   Now: 6 compact rows with 2-3 logos each.
     Data Refineries         → Bloomberg · Apollo · Tempus
     Infra Rails             → NVIDIA · Supabase · Twilio
     Workflow Fortresses     → Salesforce · HubSpot
     Domain Specialists      → Harvey · Sierra · Cursor
     Thin-Layer Graveyard    → Jasper · Gamma · Chegg
     Full-Stack Juggernauts  → ChatGPT · Claude · Copilot

9. Posters link                               (keep)
10. CTA → Case Studies                        (keep)

CUT FROM /framework:
- "Before the 10 layers — the 3 tiers" section (Surface / Workflow / Substrate)
  → Triangle says it better, with real companies.
- "Gold Mining Analogy" full render (10 long cards)
  → Replace with a single paragraph: "Think of it like a gold supply chain —
     ore in the ground (L-1), refining (L2), assay (L3), retail (L7), wedding
     ring on a finger (L8). Glossary entry for the full analogy."
- "Five Observations" as its own section
  → Each Observation folded into the relevant Law as the evidence row.
```

---

## 5. The logo question (your "show with logos clearly")

Three options, ranked by editorial fit:

### Option A — Hand-built monogram tiles (recommended)
A small `<LogoTile name="Bloomberg" layer="L1" />` component renders:
- The first letter (B) in Playfair Display, large
- The full name underneath in Inter caps
- A 4px stripe in the layer's color along the top
- No external dependency, no trademark gray area, on-brand with the rest of the site

Looks like this:
```text
┌─────────────────┐
│ ████████ L1     │  ← layer-color stripe
│                 │
│       B         │  ← Playfair, 56px
│                 │
│   BLOOMBERG     │  ← Inter caps, 11px
└─────────────────┘
```

### Option B — Real SVG logos via Clearbit / Brandfetch
Pros: visual punch, instant recognition.
Cons: external runtime dependency, possible trademark questions for a published thought-leadership site, breaks on logo redesigns, can't be styled to fit the layer color system.

### Option C — Text wordmarks in brand-ish fonts
Cheapest. Looks like text. Doesn't feel like a "logo board."

**My pick: Option A.** It gives the visual punch of a logo board *and* lets every tile carry the layer-color stripe so the framework's signature design language stays consistent. Sierra's tile and Harvey's tile literally look different colors because they live on different layers — that *is* the framework, visible.

---

## 6. What I need from you to start building

Four decisions. Once these are locked I can ship in a single pass.

1. **Approve the redundancy ledger (Section 3)?** Any item you want to defend instead of cut?
2. **Approve the Home rebuild (Section 4A)?** Specifically — OK to cut StartHereStrip + Crux blank grid + Cube preview?
3. **Approve the /framework rebuild (Section 4B)?** Specifically — OK to cut 3 Tiers, cut Gold Mining full render, fold 5 Observations into 4 Laws?
4. **Logo style — Option A (monogram tiles), B (real logos), or C (text)?**

---

## 7. What I will NOT change without explicit ask

- The 10 layers themselves, their colors, their definitions, or `src/data/layers.ts`
- The Triangle's *meaning* (still L1 + L5 + L8)
- The 4 Laws' titles and content
- The Intelligence Cube
- Any case-study or live-article copy
- SEO meta, JSON-LD, sitemap, robots
- The `/framework/:layer` deep-dive pages
- Audit logic and output schema
- Memory rules (page-ownership rule in `mem://index.md` will need a tiny update once we move the 10×5 grid to /framework only — flagged for after approval)

---

**Bottom line:** the framework isn't theoretical. The *presentation* is. Anchor every abstract code (L1b, L5a, L8c) to a logo the reader has heard of, make the Triangle the single spine, and let the rest of the page be evidence for it. Cut from 12 sub-frameworks to 4. That's the work.
