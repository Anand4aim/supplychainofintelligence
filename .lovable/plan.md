## Sales Tech AI Market Map — `/market-map/sales-tech`

Build a full 10×50 sublayer placement dataset for AI-native Sales Tech, at the same discipline as the Legal map. Same file structure, same components, same freshness/export/share-card wiring — only the data is new.

### Scope (locked from your answer)
SDR/AE/CRM-adjacent workflows only: prospecting, enrichment, outbound (email/calling/social), meeting intelligence, deal execution, CRM hygiene/RevOps automation, forecasting. **Excluded:** marketing automation, ABM ad platforms, CS/PLG, pricing, deal-desk suites — those go in a sibling GTM/marketing map later if we do one.

### Company universe (~50, grouped by natural cluster)
Each gets a full record: tier, stage, focus, SCoI position, funding line with source-date, "why," optional `flag:` for anything I can't triple-verify.

- **AI SDR / agentic outbound** — 11x, Artisan (Ava), Regie.ai, AiSDR, Piper (Qualified), Jazon (Lyzr), Bosh (Relevance)
- **Prospecting data + enrichment** — Clay, Apollo (AI additions), Ocean.io, Common Room, UserGems, Warmly
- **Dialer / parallel calling** — Nooks, Orum, Salesfinity, PhoneReady (Prospeo)
- **Meeting / call intelligence** — Gong, Chorus (ZoomInfo), Attention, Fathom, Fireflies, Otter (biz), Rilla (field)
- **Deal execution / revenue orchestration** — Rox, Unify, Default, Momentum, Pocus, Endgame, Amplemarket
- **CRM-adjacent / RevOps AI** — People.ai, Aviso, Clari (AI), Scratchpad, Salesloft (AI), Outreach (AI)
- **AI-native CRM challengers** — Attio (AI), Day.ai, Twenty (open source)
- **Deal desk / proposal AI** — DealHub AI, Tabs, PandaDoc AI
- **Cautionary / exits** — anything acquired/failed in the last 18 months (e.g. Chili Piper–Qualified overlap, ZoomInfo's Chorus integration story, Salesloft/Outreach commoditization)

Final list will drop anyone I can't verify with 2+ public sources. Better to ship 40 real than 55 half-real.

### The editorial thesis (draft, will sharpen as I research)
Sales Tech is the vertical where the L5→L1 bifurcation is happening *fastest*: Clay owns L1b/L1c (prospect data + intent), Gong owns L1d (call outcome data), and a wave of L5a agent platforms (11x, Artisan, Rox, Unify) are fighting to be the "execution OS." The compression risk is severe — Salesloft/Outreach/Apollo are absorbing agent features into the incumbent platform, and OpenAI/Anthropic ship each new capability directly into the L5a moat. The defensible whitespace is L1d (deal-outcome data beyond meeting transcripts), L8d (institutional selling memory per-account), and L3a (compliance for regulated-industry outbound: TCPA, GDPR, CAN-SPAM enforcement).

### Deliverables
1. `src/data/verticals/salesTech.ts` — mirrors `legal.ts` structure exactly (`SALES_TECH_MAP: VerticalMapData`).
2. Register it in `src/data/verticalsRegistry.ts` (`sales-tech`, status `live`).
3. Wire dataset into `MarketMapVertical.tsx` alongside `VERTICAL_DATASETS` (the current import from `./verticals/legal` will move to a barrel or extend the map).
4. Update sidebar count in `MarketMapVertical.tsx` from "24 verticals · 2 live" → "24 · 3 live" copy.
5. Sitemap + `crawl-content-check` picks up the new live URL automatically (it reads the registry).

### Honesty guardrails
- Every funding line cites the round/date/lead investor from a public press release or filing. Anything I can't verify gets a `flag:` field (same convention as Supio's $3B/$400M note).
- No fake company placements. If a sublayer is empty in Sales Tech, it gets a `gap:` annotation (whitespace / absorbed feature / horizontal-owned) — same as legal's L8a, L4a-d, etc.
- I'll flag Salesloft/Outreach/Apollo carefully — they're pre-AI incumbents bolting AI on, not AI-native. They belong on the map but I'll mark them differently (probably `tier: "Incumbent (AI-bolted)"`).
- "Cross-LLM critic" pass: after I generate `salesTech.ts`, I'll produce a `docs/research/sales-tech-critic-brief.md` — a structured prompt + the raw placement list you can paste into ChatGPT/Claude/Gemini for an adversarial "who's mispositioned, what's missing, what funding looks wrong" review. That's the honest version of "cross-model validation" — you (or I in a next turn) run it and I incorporate the corrections.

### What I will NOT do
- Not touch `Framework.tsx`, homepage, or any other page.
- Not add new components — reuse `SublayerGrid`, `MarketMapShareCard`, `ExportablePng` as-is.
- Not invent a new "AI SDR" sublayer — 11x etc. go at L5a + L6a, which is where they structurally live.
- Not include marketing-automation companies (Jasper, Copy.ai, HubSpot AI) even if borderline. They belong in the GTM/marketing map if you commission it later.

### Two-turn execution
- **This turn (if you approve):** research + ship `salesTech.ts`, registry entry, sidebar count update, critic brief. Roughly one large file + two small edits.
- **Next turn (optional):** you paste the critic brief into ChatGPT/Claude, send me back the diff, I apply corrections and add a `flag:` note wherever the second model flagged uncertainty.

### Technical notes
- File location: `src/data/verticals/salesTech.ts` (camelCase to match `legalDomains.ts` convention).
- Registry entry: `{ slug: "sales-tech", label: "Sales Tech", status: "live", blurb: "..." }`.
- `MarketMapVertical.tsx` currently imports `VERTICAL_DATASETS` from `./verticals/legal`. I'll either extend that export or introduce `src/data/verticals/index.ts` as a barrel — cleaner and future-proof for the remaining 22 verticals.
- Sidebar copy update is a two-line change in `VerticalSidebar`.
