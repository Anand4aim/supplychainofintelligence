# Glossary & Layer Decoder

## Goal

A single, citation-ready tool that takes any fuzzy term the industry actually uses ("wrapper", "agent", "copilot", "RAG app", "MCP server", "moat", "vertical AI", "voice AI", "memory") and returns:

1. The **closest L# / L#x notation** (one or many)
2. A **clarity-grade definition** (1–2 sentences, no hype)
3. A **citation-ready blurb** (one sentence with author + framework attribution, copy-paste into a memo or tweet)
4. **Links** to the relevant layer detail pages and 1–2 canonical examples
5. **What people get wrong** (the common mis-mapping, e.g. "agent ≠ L4")

This is the missing **dictionary** for the framework — the same thing JTBD did with "job/hire/fire". Without it the vocabulary won't standardize.

## Strategy

### Where it lives
- **Primary surface**: a dedicated page at `/glossary` with full A–Z index + search.
- **Footer slot**: a new "Glossary" link in the footer (Navigate column) — always reachable.
- **Inline trigger** (Phase 2, not in this pass): a small `<GlossaryLink term="agent">agent</GlossaryLink>` that opens a popover. Out of scope for this turn.

### Data model
Single source of truth: `src/data/glossary.ts`.

```ts
GlossaryTerm = {
  id: string;                 // "agent"
  term: string;               // "Agent"
  aliases: string[];          // ["agentic", "AI agent", "autonomous agent"]
  category: "marketing" | "technical" | "industry" | "framework";
  shortDef: string;           // ≤ 140 chars, plain English
  longDef: string;            // 2–4 sentences, structural
  layerMapping: string[];     // canonical IDs like ["L5", "L6", "L7"] (uses src/data/layers.ts)
  primaryLayer: string;       // most-load-bearing layer, e.g. "L5"
  commonMistake?: string;     // "Often mis-tagged as L4 (Access). L4 is the pipes the agent rides, not the agent itself."
  examples: string[];         // ["Sierra", "Harvey", "11x"]
  citation: string;           // pre-baked: "Per Anand Arivukkarasu's Supply Chain of Intelligence™, an 'agent' is an L5+L6(+L7±L8) package, not a layer."
  seeAlso?: string[];         // other term ids
}
```

Seed list (~40 terms, expandable):
- **Marketing**: wrapper, agent, copilot, assistant, AI-native, vertical AI, horizontal AI, AI-first, AI moat
- **Technical**: RAG, MCP, fine-tuning, embedding, context window, tool use, eval, guardrail, system prompt, agent loop, multi-agent
- **Industry shorthand**: foundation model, frontier model, inference, training, hyperscaler, GPU cloud, SOC2/compliance gate
- **Framework natives**: Layer, Sublayer, Intelligence Cube, Defensible Triangle, Law I–IV, SCoI Score
- **Surface words**: chatbot, voice AI, embedded AI, ambient AI, browser agent

### UX
- **Search-first hero**: big input that filters live as you type. Matches across `term`, `aliases`, `shortDef`. Debounced, client-side (data is small).
- **Result cards**: each shows term → `<LayerTag>` chips for the layer mapping → 1-line definition → "Decode" button to expand.
- **Expanded card**: long def, common-mistake callout, examples, copy-citation button (uses existing `<CopySnippet>` primitive for auto-attribution), see-also chips, link to primary layer's framework page.
- **Empty state** ("not found"): prompts user to suggest a term via the `/challenge` form.
- **Filter chips**: All / Marketing / Technical / Framework — quick category filters.

### Footer integration
Add a "Glossary" link in the **Navigate** column of `SiteFooter.tsx` between "Framework" and "Playbook" (it's a framework-adjacent reference, not a piece of analysis).

### SEO
- Title: "AI Stack Glossary — Wrapper, Agent, Copilot, RAG, MCP decoded into the 10-layer Supply Chain of Intelligence™"
- Description: "What does 'wrapper' actually mean? 'Agent'? 'Copilot'? Precise definitions of every term in the generative AI stack, mapped to L-1 through L8."
- Each glossary entry rendered as `DefinedTerm` JSON-LD inside a `DefinedTermSet`, so Google can lift definitions into knowledge panels.
- Add `/glossary` to `public/sitemap.xml`.

### Routing
Add `<Route path="/glossary" element={<Glossary />} />` to `src/App.tsx`.

## Files

**New**
- `src/data/glossary.ts` — ~40 terms, typed, citation-ready
- `src/pages/Glossary.tsx` — search + filter + cards + JSON-LD
- `src/components/GlossaryCard.tsx` — single entry with expand/collapse + copy-citation

**Edited**
- `src/App.tsx` — add `/glossary` route
- `src/components/SiteFooter.tsx` — add "Glossary" link in Navigate column
- `public/sitemap.xml` — add `/glossary` URL

**Out of scope this pass** (note for future)
- Inline `<GlossaryLink>` popover on article pages
- Edge function to auto-suggest layer mapping for arbitrary input via Lovable AI
- Glossary export PDF (mirror the canonical-vocabulary PDF, but term-indexed)

## Acceptance

- `/glossary` loads, typing "wrapper" instantly surfaces the wrapper card with L7 chip and an L2 absorption warning.
- Typing "agent" returns the agent card mapped to L5+L6(+L7+L8), with the "L4 is the pipes, not the agent" mis-mapping callout.
- Copy-citation produces a one-liner with author attribution and the ™ mark.
- Footer "Glossary" link routes to `/glossary`.
- JSON-LD `DefinedTermSet` validates.
