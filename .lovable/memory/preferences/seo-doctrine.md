---
name: SEO doctrine
description: Site-wide SEO rules grounded in Google's Nov 2025 generative-AI search guide. Prevents drift toward GEO/AEO snake-oil.
type: preference
---

Google's official position (Nov 2025 "Optimizing your website for generative AI features"): generative AI search is grounded in core Search ranking. Optimizing for it IS SEO. Follow these rules across the site:

**Do**
- Prioritize unique, first-hand, non-commodity content (L1b). Author POV beats keyword fitting.
- Keep technical hygiene tight: crawlable, indexable, fast, semantic HTML, working canonicals, sitemap in sync.
- Keep per-route titles/descriptions/canonicals via react-helmet-async (already set up via `Seo.tsx`).
- Keep Article + BreadcrumbList JSON-LD on case studies / law essays, they help eligibility, not generative ranking.
- Keep llms.txt, useful for Claude/Perplexity/ChatGPT crawlers, even though Google explicitly says it isn't a Google signal.

**Don't**
- Don't chunk content into tiny pages for AI parsing. There's no ideal page length. Write for humans.
- Don't rewrite copy in "AI-friendly" phrasing or stuff long-tail variations. Models understand intent.
- Don't farm inauthentic mentions, scaled comparison pages, or fake citations. Spam systems catch it.
- Don't pile on schema.org markup as a ranking lever. Use it only where it earns rich results.
- Don't market the site as "AEO/GEO optimized", Google's stance is that this framing is noise.
- Don't add new "AI-only" files, meta tags, or markup invented by GEO vendors.

**Why:** Google explicitly debunked these in their official guide. The site's authority comes from being the canonical 10-layer framework with first-hand expert content, that IS the AI-search moat. Adding GEO snake-oil would undercut the framework's own argument (Law I: surface tricks die; bottlenecks win).
