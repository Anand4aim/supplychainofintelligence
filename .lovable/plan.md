## Goal

Take supplychainofai.com from **7.5 → 9+** by closing the four gaps the review flagged: conversion infrastructure, proof surface, per-page SEO differentiation, and structured data for LLM citation. All work stays inside Lovable (no Next.js rebuild).

## Scope — what I'll ship

### 1. SEO & LLM citation (the fastest win)
- **Unique `<title>` + `<meta description>` per route** via `react-helmet-async` (install + wrap `<App>` in `<HelmetProvider>`).
- **Per-page JSON-LD**: `Article` on `/analysis/*`, `FAQPage` on `/`, `BreadcrumbList` sitewide, `Person` + `Organization` enriched in `index.html`.
- **Per-layer URLs**: `/framework/l0-infrastructure`, `/framework/l1-data`, … `/framework/l8-memory` — 10 new indexable atoms generated from `src/data/layers.ts`.
- **Sitemap regenerated** to include per-layer + per-case-study routes, with `<lastmod>`.
- **Differentiated titles** as the review suggested ("Framework: The 10 Layers and 50 Sublayers of AI Value", etc.).

### 2. Case-study library (proof gap: 1 → 5)
- Migrate the current Jasper/Grammarly/Claude analysis into a data-driven model in `src/data/caseStudies.ts`.
- Add **4 new worked case studies** covering all three durability classes:
  - **DEAD**: Chegg (L7 surface eaten by L2)
  - **CONTESTED**: Notion (L7+L8 fortress vs Claude/ChatGPT command center)
  - **SAFE**: Harvey (L1+L5 legal-domain fortress)
  - **DOMINANT**: NVIDIA (single-layer L0 monopoly)
- Each gets its own `/analysis/:slug` route + Article JSON-LD + own `<title>`/`<description>`.
- `/analysis` becomes a real library index (cards grid by durability class), not a single post.

### 3. The Defensibility Audit — interactive tool
- New route `/audit` with the eight 1–5 questions from the framework (model dependency, data ownership, workflow depth, trust gate, distribution, memory, switching cost, platform exposure).
- Live scoring → archetype classification (Thin Wrapper → Useful Tool → Workflow Product → Defensible AI System → Intelligence Gate).
- Result page shows: total score, per-axis radar/bar, archetype verdict, layer-by-layer interpretation, share image.
- **No backend in this pass** — runs client-side, results encoded in URL so they're shareable. (Email-PDF capture can be added later when Lovable Cloud is wired in; not blocking the 9+ score.)
- Promoted as the **single primary CTA** sitewide.

### 4. Conversion ladder
- New `/about` page: Anand bio, headshot placeholder, what he shipped at Meta, why he built the framework, LinkedIn link.
- New `/work-with-me` page: three offers — Portfolio Audit (for VC/PE), Defensibility Workshop (for SaaS exec teams), Advisory (retainer). Each with scope, deliverable, "book a call" CTA (mailto for now).
- **Single primary CTA per page**, demoted everything else:
  - `/` → "Run the Audit"
  - `/framework` → "See how real companies score" (→ /analysis)
  - `/analysis` → "Audit your own product"
  - `/for-product-leaders` → "Audit your roadmap"
- Header gets a persistent "Run the Audit" button (replaces the flat Subscribe).

### 5. Author surface + social proof
- **Author block** (avatar + 2-line bio + LinkedIn) above the fold of `/framework`, `/analysis`, `/for-product-leaders`.
- **Credibility strip** on `/`: "Ex-Meta" + companies/sectors the framework has been applied to (placeholder logos area; user fills in real names later).

### 6. Newsletter promise
- Replace "Subscribe" CTA with explicit promise: *"One worked-example breakdown per month, scored on the 10 layers. No filler."*
- Keep the form a simple mailto/placeholder (Cloud not wired yet); the promise is the SEO+conversion fix, not the plumbing.

### 7. Visuals
- Static SVG **Intelligence Cube™** illustration (9 × 9 × 10 grid) on `/` and `/framework`.
- Per-layer hero card on each `/framework/l*` page using the existing layer color tokens.

## What I'm NOT doing in this pass

- No Lovable Cloud / email backend wiring for the audit (results are client-side + shareable URL). Can wire later if you want email-gated PDFs.
- No real analytics install (Plausible/Fathom) — that's a 5-min add later.
- No WCAG full audit (will pass focus + contrast on new components, but no exhaustive sweep).
- No copy rewrites of existing framework content — only adds, demotions, and metadata changes.

## Technical notes

- **Routing**: extend `src/App.tsx` with `/audit`, `/about`, `/work-with-me`, `/analysis/:slug`, `/framework/:layerId`.
- **Per-route head**: install `react-helmet-async`, wrap once in `src/main.tsx`, drop a small `<Seo>` wrapper into each page (the existing `src/components/Seo.tsx` already exists — I'll upgrade it to use Helmet instead of mutating `document.head` directly).
- **Case studies + audit questions**: data-driven in `src/data/caseStudies.ts` and a new `src/data/auditQuestions.ts` so adding more later is trivial.
- **Sitemap**: convert `public/sitemap.xml` to a generator script (`scripts/generate-sitemap.ts` run on `predev`/`prebuild`) so it stays in sync with case studies + per-layer routes.
- **Canonical**: remove static `<link rel="canonical">` from `index.html` and let Helmet own it per-route (avoids duplicate canonicals).

## Estimated impact on the review scorecard

| Dimension | Before | After | Why |
|---|---|---|---|
| Content & Messaging | 8.5 | **9.5** | 5 case studies, author block, newsletter promise |
| SEO & Discoverability | 7.0 | **9.0** | Unique titles, JSON-LD, 10 per-layer URLs, sitemap with lastmod |
| UX & Design | 7.0 | **9.0** | Audit tool, single CTA per page, About + Work-with-me, Cube viz |
| Technical | 7.5 | **9.0** | Helmet, structured data, generator-based sitemap |
| **Composite** | **7.5** | **9.1** | |

## Order of execution

1. Helmet + Seo upgrade + per-page titles/JSON-LD (foundation everything else uses)
2. Sitemap generator + per-layer routes
3. Case studies data model + 4 new case studies + `/analysis/:slug`
4. Defensibility Audit tool + result page
5. About + Work-with-me + nav CTA consolidation
6. Author block + Cube SVG + newsletter promise

Ship as one batch. You'll see all of it land at once in preview.

---

Ready to build. Approve and I'll execute end-to-end.