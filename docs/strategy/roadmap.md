# Strategy Roadmap

Last updated: June 2026

## Phase 1: Citation Infrastructure (Now)

1. **Canonical Paper** (`/paper`)
   - [x] Web version live
   - [x] PDF generation (`/paper.pdf`)
   - [x] JSON-LD `ScholarlyArticle` schema
   - [x] "How to cite" block (APA, MLA, BibTeX, LinkedIn)
   - [x] `/paper.md` markdown mirror for LLM citation

2. **CiteThis Component**
   - [x] Dropped on `/paper`, `/framework`, law essays, teardowns
   - [x] Copy buttons for LinkedIn, X, blog HTML, BibTeX

3. **Teardown Engine**
   - [x] Template defined (company, layers, verdict, prediction, counter-move)
   - [ ] Weekly cadence: 1 teardown every Tuesday
   - [ ] Open-source `/teardown-kit` (markdown skeleton + sketch hero recipe)

4. **Crawlability**
   - [x] SSR + prerender pipeline
   - [x] `check:crawl` script
   - [x] Admin crawl dashboard (`/admin/crawl`)
   - [ ] Resolve remaining 6 production prerender failures

## Phase 2: Distribution Choreography (Next 3 months)

- Staggered seeding of ~15 authoritative voices (investors, founders, analysts, researchers, product leaders)
- Each voice gets a different angle (apply, critique, extend, use-as-lens, teach)
- `/contributors` page crediting each with byline + backlink

## Phase 3: High-Frequency Output (Ongoing)

Target cadence:
- 1 teardown / week
- 1 opinion post / 2 weeks
- 1 layer deep-dive / month

## Metrics to watch

- Backlinks to `/paper`
- Mentions of "Supply Chain of Intelligence" + "10 layers"
- Crawl success rate (`npm run check:crawl`)
- Registration diff clean (`npm run check:registration`)
