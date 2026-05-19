# Sharpen for the first-time PE / board reader

The critique is right: framework depth is there, hero density is the bottleneck. A PE partner should be able to read three lines and know what this is, who it's for, and what it does. Same site, sharper top.

## What changes

### 1. New hero positioning (above the fold)

Replace the current dense hero with a three-line lockup written for someone who has never heard of the framework:

- **Eyebrow** — `Strategic Framework · AI Defensibility`
- **H1** — `A defensibility map for AI companies.`
- **Sub** — `Is your product a moat, a workflow, or a wrapper a platform will absorb? The Supply Chain of Intelligence™ scores every AI product across 10 layers — from compute and data to workflows, surfaces, and memory — and tells you where value actually accrues.`
- **Primary CTA** — `Score your company (out of 40) →` deep-links to the Defensibility Audit
- **Secondary CTA** — `Read the framework`

The canonical tagline ("The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack") stays as a smaller line under the H1 for SEO and brand consistency. It does not replace the new H1.

### 2. New "Start Here" 5-beat strip (directly under hero)

A single horizontal band, 5 numbered cards, one sentence each. This is the spine the friend asked for:

```text
01 PROBLEM   AI products are getting erased by platforms.
02 INSIGHT   JTBD finds demand. It does not prove defensibility.
03 MAP       AI value moves through 10 layers.
04 TEST      Score your company out of 40.
05 OUTCOME   Deepen, defend, reposition, or exit.
```

Each card links to the page that proves it (Framework, About JTBD section, Framework, Defensibility Audit, Playbook). This becomes the lobby — every other homepage section lives below it and is optional reading.

### 3. Demote / re-order existing homepage sections

Current order is depth-first. New order is reader-first:

1. Hero (new)
2. Start Here 5-beat strip (new)
3. Defensibility Audit teaser (promoted up — this is the CTA the hero promised)
4. Chess board of intelligence (the visual proof)
5. Three Laws
6. Voices strip (testimonials — stays)
7. Intelligence Cube + deeper material (kept, but below the fold for skimmers)

No content is deleted. Order and emphasis change.

### 4. Meta and SEO

Update `<Seo>` title and description on `/` to lead with the defensibility framing while preserving the disambiguation phrase:

- Title: `Supply Chain of Intelligence — A Defensibility Map for AI Companies`
- Description: `Score any AI product across 10 layers — compute, data, models, workflows, surfaces, memory — to see whether it's a moat or a wrapper. The generative AI stack, not logistics.`

OG image text + JSON-LD `description` mirror the same line.

## What we do NOT change

- Brand name, trademark, canonical tagline, layer color system, framework content
- Any deeper page (`/framework`, `/playbook`, `/voices`, `/about`)
- The Voices strip we just shipped
- Navigation

## Files touched

- `src/pages/Index.tsx` — new hero block, new Start Here strip, section reorder
- `src/components/Seo.tsx` usage on Index — updated title/description
- Possibly one new component `src/components/StartHereStrip.tsx` for the 5-beat band

## Out of scope for this pass

- PE/VC workshop landing page, fractional CPO positioning page, board-education packaging — these are the next move once the homepage holds first-time readers. Worth a dedicated `/for/pe-and-boards` page in a follow-up.

## Open question before I build

The friend's recommended positioning sentence is excellent but long (~50 words). I'd compress it into the hero sub (above). Confirm you're OK with the compressed version, or tell me to use the full sentence verbatim and I'll let the hero breathe taller.
