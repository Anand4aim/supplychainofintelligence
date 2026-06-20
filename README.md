# SupplyChainOfIntelligence.com

> **The Supply Chain of Intelligence™**, the 10 layers of the generative AI stack.  
> Canonical site: [https://supplychainofai.com](https://supplychainofai.com)

---

## What this is

A React + Vite application that hosts the canonical framework, papers, teardowns, and case studies for **The Supply Chain of Intelligence™**, a 10-layer model for understanding how value moves through the generative-AI stack.

Key pages:
- **Home**, Magazine-cover hero, interactive stack, sales matrix, audit tool, proof of corpus, Intelligence Cube preview
- **/paper**, The canonical 6–8K word essay (PDF + web). Cite this URL.
- **/framework**, Full framework reference: 10 layers, 50 sublayers, 4 Laws, 3 Currents, 6 Archetypes, Defensible Triangle, Intelligence Cube
- **/framework/:layer**, Deep-dive per layer
- **/analysis**, Case-study teardowns decoded through the framework
- **/live**, Live articles and generated teardowns
- **/market-map**, Market-map vertical views
- **/posters**, Hidden poster gallery (not in main nav)

---

## Tech stack

- **Frontend:** React 18, TypeScript 5, Vite 5, Tailwind CSS v3, shadcn/ui
- **Backend:** Lovable Cloud (Supabase), Edge Functions, PostgreSQL, Auth
- **Prerender:** SSR + static HTML generation for crawlability (`scripts/prerender.ts`)
- **Testing:** Vitest + Playwright

---

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build + prerender |
| `npm run check:crawl` | Crawl all prerendered routes and flag failures |
| `npm run check:registration` | Compare DB route sources with prerender registrations |
| `npm run test` | Vitest unit tests |
| `npm run lint` | ESLint |

---

## Folder overview

```text
src/
  components/       , Reusable UI components (LayerTag, CiteThis, CopySnippet, etc.)
  pages/            , Route-level page components
  data/             , Static data: layers, case studies, posts, verticals, etc.
  data/verticals/   , Per-vertical registry files
  integrations/     , Supabase client + types
  hooks/            , React hooks
  lib/              , Utilities
  test/             , Vitest setup + example tests

scripts/            , Build & validation scripts (prerender, checks, diff, etc.)

public/             , Static assets (paper.md, favicon, robots.txt, sitemap, etc.)

docs/               , Strategy docs & articles (see below)
```

---

## Project conventions

- **Layer references** use the `<LayerTag>` component or `LAYER_LABEL` / `LAYER_SHORT_LABEL` imports from `src/data/layers.ts`. Never hardcode layer names.
- **"Agent" is not a layer**, it is a marketing term for an L5+L7(+L8) package. Use it only when quoting companies.
- **Three Currents** (Demand Gravity, Attention Economics, Capital Flows) are horizontal forces, not layers.
- **SEO disambiguation:** Always pair "supply chain" with "generative AI stack" so crawlers do not classify the site as logistics.

---

## Author

**Anand Arivukkarasu**, Ex-Meta (Instagram) Product Leader & AI Product Architect.  
VP/Head of Product roles at Ideas2IT, Refersion, GRIN; earlier Lead PM at Vungle and Pinsight Media.  
Angel investor and advisor. Based in San Francisco.

- LinkedIn: [linkedin.com/in/anandarivu](https://linkedin.com/in/anandarivu)
- Domain: [SupplyChainOfAI.com](https://supplychainofai.com)

Published in a **personal capacity** (L-1A visa compliance). Primary employment held separately.

---

## License

Framework content is licensed **CC-BY 4.0**, free to use with attribution to Anand Arivukkarasu and a link back to [supplychainofai.com](https://supplychainofai.com).  
Code in this repository follows the same spirit; see individual files for specifics.

---

## Contributing

This is a personal editorial project. If you spot an error or want to suggest a teardown subject, open an issue or reach out on LinkedIn.
