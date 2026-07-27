## The strategy

Two different jobs, so **two different artifacts** — not one.

1. **Feed post** (short, ~150-250 words, hook + 3 beats + link). Already exists as `linkedin_post`. Its job is to stop the scroll and send traffic to the site.
2. **Pulse / LinkedIn Article** (long-form, 900-1,500 words). Its job is to rank and be read *inside* LinkedIn. Different rhythm, different formatting rules, and it must survive LinkedIn's editor: **no tables, no color, no components** — only H2/H3, bold, bullets, numbered lists, and blockquotes.

So: keep them separate, side by side under one "Share this" block. Same argument, two surfaces.

The **hero image** is the third artifact and it carries all the structure that Pulse strips out. Anything table-shaped (layer scores, sublayer impact, who wins/loses) becomes the image, not the text. That's the trade: image does the diagram, text does the argument.

## What gets built

**A. Per-article hero poster (auto-generated, on-brand)**

A new `LiveArticleHero` React poster wrapped in the existing `ExportablePng`, rendered at LinkedIn's 1200×627 ratio, populated from data already on every article:

```text
┌──────────────────────────────────────────┐
│ SCoI · LIVE ANALYSIS      Nov 2026       │
│                                          │
│ Headline (display, 2-3 lines)            │
│ Subheadline (sketch, 1 line)             │
│                                          │
│ L-1 L0 L1 L2 L3 L4 L5 L6 L7 L8           │
│  ▁  ▃  █  ▅  █  ▂  ▆  ▃  █  ▄  ← impact  │
│                                          │
│ VERDICT: CONTESTED   supplychainofai.com │
└──────────────────────────────────────────┘
```

The layer-intensity bar strip is the signature — it makes every share instantly recognizable as SCoI without anyone reading a word. Verdict pill uses the existing verdict tone colors. One-click PNG download via the existing export button. No AI-generated art: it's rendered from the framework so it can never drift and never looks generic.

A second variant, **1:1 square**, for the feed post (LinkedIn crops 1200×627 badly in-feed on mobile). Both downloadable.

**B. "Detailed article" block — Pulse-ready**

New collapsible section at the bottom of each live article, above the CTA:

- Tab 1 — **Short post** (existing `linkedin_post`, copy button)
- Tab 2 — **Full article for LinkedIn Pulse** (new)

The Pulse text is assembled client-side from fields the article already has, so it works retroactively across every existing article with zero DB migration and zero re-generation cost:

```text
[Headline]
[Subheadline as italic standfirst]

## What happened
news_summary

> pull-quote: the sharpest line from structural_take

## Why it matters now
why_now

## The structural read
structural_take

## Where it lands on the stack
- L3 Gates — owned, high impact — note
- L7 Surface — contested — note
  (prose bullets, never a table)

## Who gains, who's exposed
who_wins / who_loses as two bullet lists

## The counter-case
counter_thesis

## What to watch
numbered list from what_to_watch

> new_law_candidate as a closing pull-quote

[Author line + canonical link + personal-capacity line]
```

Copy button puts it on the clipboard as plain text with markdown-ish structure LinkedIn's editor preserves on paste (headings, bullets, blockquotes survive; nothing else does). Attribution and canonical URL auto-appended — never hand-written.

**C. Reuse, not duplication**

- Same block is dropped into `/posts/:slug` so essays and opinion pieces get the same treatment.
- All copy goes through the existing `CopySnippet` attribution logic.
- Hero poster registered so `/posters` can show one live example.

## Technical notes

- New: `src/components/live/LiveArticleHero.tsx` (16:9 + 1:1 variants), `src/lib/pulseText.ts` (pure serializer, unit-testable), `src/components/ShareKit.tsx` (tabbed copy/download block).
- Wired into `src/pages/LiveArticleDetail.tsx` and `src/pages/PostDetail.tsx`.
- No database changes, no edge-function changes, no new generation cost — everything derives from `analysis` fields already stored.
- Tone rules and personal-capacity disclosure applied to generated Pulse text automatically.

## Open question before I build

Should the Pulse version be **derived** (as above — free, retroactive, consistent) or **LLM-written per article** (better prose, costs a generation pass, needs a new DB column and a backfill)? My recommendation: ship derived now, and if the prose feels mechanical on two or three real articles, add an optional LLM polish pass on top later.
