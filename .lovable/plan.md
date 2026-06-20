## The strategy in one line

Make SupplyChainOfAI.com the **undeniable citation target** for the 10-layer framework by shipping (1) a canonical paper everyone links to, (2) a teardown engine that forces application, and (3) a staggered seeding loop with a few high-authority voices, while you out-publish everyone using your own term.

You already have the trademark, the framework, the posters, the sketch register, and ~30 case studies. The gap is **citation infrastructure** and **distribution choreography**, not more framework content.

---

## Five workstreams (ranked by leverage)

### 1. The Canonical Paper, `/paper` (or `/the-supply-chain-of-intelligence`)

One URL. One PDF. One thing every link in the world points to. Stratechery has "Aggregation Theory." Christensen has "JTBD." You need yours.

Build:
- A new long-form route `/paper`, the definitive ~6–8K word essay. All 10 layers, the 4 Laws, the Cube, the 3 Currents, the Agent decoder, the Defensible Triangle. Numbered sections so people can deep-link (`/paper#law-1`, `/paper#l3-gates`).
- A **versioned PDF** at `/paper.pdf` (e.g. `v1.0, Nov 2026`). PDFs get cited in decks, papers, LinkedIn carousels because they're stable artifacts. Build via the existing `scripts/build-stack-pdf.py`.
- **`ScholarlyArticle` JSON-LD** with author, datePublished, version, license (CC-BY 4.0 with attribution to Anand Arivukkarasu, *requires* a link back). CC-BY is the citation cheat code.
- **"How to cite this paper"** block at the bottom with APA, MLA, BibTeX, and a one-line LinkedIn-ready quote. Copy buttons on each (re-use `CopySnippet`).
- A short DOI-style permalink convention: `SCoI/L3` → `/paper#l3-gates`, printed on every poster footer so people quoting the poster end up on `/paper`.

This is the spine. Every other workstream points here.

### 2. The Teardown Engine, application is what makes frameworks spread

You have `/analysis` with case studies. Re-frame it as the **Teardown Engine** and industrialize it.

- **Weekly teardown cadence.** Every Tuesday: one company (Cursor, Harvey, Glean, Perplexity, the hottest deal that week) decoded through the layers. 600–900 words. Same template. Same sketch hero. Same "Where they live: L1b + L2 + L7" verdict box.
- A reusable `<TeardownTemplate>` so each one is ~30 min to write, not a day. Slots: company, layers occupied, defensible triangle score, what they're really selling (agent → decode), prediction + counter-move.
- **Open-source the template.** Publish `/teardown-kit`, the markdown skeleton + the sketch hero recipe + the LinkedIn caption pattern. People who want to copy your style end up linking to you to credit the format. JTBD spread exactly this way (Bob Moesta's worksheet).
- Hot-deal hijack: when a16z/Sequoia announces a round, you publish the SCoI decode within 24h. Speed = citations.

### 3. The Citation Surface, make linking the path of least resistance

Most people don't link because it's friction. Remove the friction.

- **`<CiteThis>` component** on every framework page, law essay, layer page, and teardown. One click → copies a pre-formatted citation (LinkedIn, X, blog HTML, BibTeX) with the canonical URL baked in. Extend the existing `CopySnippet`.
- **Embeddable widgets.** A tiny `/embed/layer/L3` iframe (~200×120) showing the L3 chip + one-line definition + "via SupplyChainOfAI.com™" footer. Anyone can drop it into a Substack post. Each embed = a backlink.
- **"As cited by"** strip on `/paper` and home, logos/quotes from the highest-authority mentions you get. Social proof loops: the more visible the citations, the more people want to be on the wall.
- **Author bio kit** at `/press`, Anand's bio, headshot, the trademark notice, the canonical tagline, suggested link text ("the 10-layer Supply Chain of Intelligence™"). Journalists and analysts copy-paste; control what they paste.

### 4. The Seeding Choreography, a few authoritative voices, staggered

You're right: 1 known investor post > 50 randos, and identical posts in a week smells like a campaign. Choreograph this like a release window.

Make a private spreadsheet (off-site) of ~15 target voices: 3 investors, 3 founders, 3 analysts/journalists, 3 academics/researchers, 3 product-leader peers. Pitch each a **different angle**:

| Angle | Who you ask | What they post |
|---|---|---|
| Apply it | A founder | "I mapped our company through the 10 layers, here's where we actually live" |
| Critique it | A skeptic analyst | "Where I'd push back on Anand's framework, and where I think it's right" |
| Extend it | A researcher | "Adding a 9th layer? Why I'd argue [X] deserves its own row" |
| Use it as a lens | An investor | "Three deals I passed on this quarter, decoded through SCoI" |
| Teach it | A product leader | "What I teach my PMs about the 10 layers" |

Stagger over 3–6 months. Each post adds something genuinely new. All link to `/paper`. Movement, not campaign.

You don't need to build software for this, but the **site** needs to make their angle frictionless: the Citation Surface (#3), the Teardown Kit (#2), and a `/contributors` page that credits each angle with their byline and a backlink (reciprocity is real).

### 5. Your own high-frequency output, be the most prolific user of your own term

Right now you have ~6–8 opinion posts. The owner of a framework should publish faster than anyone else who uses it.

- **Cadence target:** 1 teardown/week + 1 opinion post / 2 weeks + 1 layer-deep-dive / month. ~6 pieces/month.
- **Name-attached every time.** Title pattern: *"[Company/Topic]: An SCoI Teardown"* or *"The [L#] [Layer] Problem with [Topic]"*. Trademark + acronym in every title. Crawlers learn the association.
- **`/now` page**, a single-screen "what I'm publishing this month" with the next 4 pieces queued. Signals momentum to anyone who lands cold.
- **RSS + LinkedIn cross-post.** You already have `rss-feed`. Auto-cross-post via a simple n8n/Zapier (off-platform) using the RSS. Every LinkedIn post links back to canonical SCoI.com URL.

---

## SEO mechanics layered on top

Google's Nov 2025 doctrine (already in mem://preferences/seo-doctrine) says authority comes from unique first-hand content, not GEO tricks. The above IS the SEO play. Mechanics to add:

- **`ScholarlyArticle` + `DefinedTerm` JSON-LD** on `/paper` and on each `/framework/L#` page. `DefinedTerm` is how Google understands "this site defines this term." Pairs with the trademark.
- **`citation` schema property** on every teardown, pointing back to `/paper`. Internal citation graph = topical authority signal.
- **Anchor-text discipline.** Internal links to the paper always use the same anchor: "The Supply Chain of Intelligence™" or "the 10-layer framework". Consistency teaches Google the entity.
- **Sitemap + IndexNow on every publish.** Wire the existing `scripts/indexnow-submit.ts` into the post-publish flow so new teardowns get crawled within hours.
- **`llms.txt` already exists**, add `/paper.md` (markdown version of the paper) so Claude/Perplexity/ChatGPT cite the canonical text verbatim. This is huge for AI search: LLMs cite whoever gives them clean, attributable markdown.

---

## What I'd build first (this PR-sized)

1. `/paper` route + the long-form canonical essay (stitched from existing framework content + new connective tissue).
2. The "How to cite" block + `<CiteThis>` component.
3. `ScholarlyArticle` + `DefinedTerm` JSON-LD.
4. `/paper.md` for LLM citation, linked from `llms.txt`.
5. Teardown template + 1 example teardown (Cursor or Harvey) to prove the cadence.

Workstreams 4 (seeding) and the weekly teardown cadence are operational, not code, but the site primitives above make them possible.

---

## Personal-capacity guardrail

Everything above stays editorial/analytical. No "hire me", no "request a teardown", no lead capture. The CTAs are *"cite the paper"*, *"copy the snippet"*, *"download the PDF"*, *"read the next teardown"*. Fully L-1A compliant.

---

## My recommendation

Approve this and I'll start with **steps 1–4 above** in this order:
1. Scaffold `/paper` route with the canonical essay structure (we can fill prose iteratively).
2. Build `<CiteThis>` and drop it into the paper, framework, laws, and teardowns.
3. Add `ScholarlyArticle` + `DefinedTerm` JSON-LD and a `/paper.md` mirror.
4. Ship one Cursor or Harvey teardown using a new `<TeardownTemplate>` to prove the format.

That gives you the citation spine + one applied teardown in one push. Then we choreograph #4 and turn on cadence for #5.

Want me to start with the `/paper` scaffold?