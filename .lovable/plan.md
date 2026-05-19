# Article Audit Pipeline — cross-LLM, sublayer-deep, iterative

## Goal
Walk every published `live_articles` row slowly and thoroughly. For each one, two independent LLMs (Gemini 3 Pro + GPT-5) score the article against the framework at **sublayer (L#x) depth**, flag flaws, and propose fixes. Results land in a new `article_audits` table you can browse, sort, and act on.

## What you get
1. A new **`/admin/audit`** page listing every article with:
   - Composite score (0–100), severity bucket (critical / needs-fix / ok)
   - Current layer tags vs proposed layer tags (added / removed)
   - Sublayer mapping: which of the 50 sublayers should actually be tagged
   - Flaws list (mis-mapped layer, missing L3/Gates, wrong verdict, weak proof, etc.)
   - Cross-LLM agreement score (where the two models disagree = where you should look)
   - Suggested headline/subheadline rewrites
   - Suggested fix actions (one-click "apply layer tag fix" buttons)
2. A **background runner** that audits one article at a time, ~1–2 minutes apart, so it can grind for hours without rate-limit issues. Visible progress bar.
3. A **re-audit** button per article after you edit.

## Architecture

### 1. New table `article_audits`
- `article_id` (fk to live_articles)
- `model` (e.g. `google/gemini-3.1-pro-preview`, `openai/gpt-5.2`)
- `run_id` (groups one full sweep)
- `score` 0–100
- `severity` enum: `critical` | `needs_fix` | `minor` | `ok`
- `current_layers` jsonb, `proposed_layers` jsonb
- `current_sublayers` jsonb, `proposed_sublayers` jsonb (e.g. `["L2a","L3b","L5c"]`)
- `flaws` jsonb (array of `{type, severity, layer, reason, evidence_quote}`)
- `fixes` jsonb (array of `{kind, before, after, rationale}`)
- `suggested_headline`, `suggested_subheadline`
- `verdict_check` ("agree" | "disagree" | `{should_be, why}`)
- `evidence_quotes` jsonb (quotes from the article the LLM grounded its critique on)
- `cross_llm_diff` jsonb (computed after both models run)
- `created_at`

RLS: public read for transparency, no insert/update from client.

### 2. Edge function `audit-article`
Takes `{ article_id, run_id }`. For each of two models:
1. Loads the full framework context (layers, sublayers, 4 laws, agent convention, archetypes) — same one `generate-live-article` uses.
2. Passes article headline + sub + summary + analysis + linkedin_post + current cube_position.
3. Uses **structured output** (zod schema) to force the LLM to emit the schema above — no free-text drift.
4. Includes a self-critique step: "Before answering, list the 3 framework rules you'll check against. Then quote the article passages that prove each finding."
5. Writes one row per model.
After both models write, a small post-step computes `cross_llm_diff` and final composite severity.

### 3. Edge function `audit-runner`
- Picks next un-audited `(article, run_id)` from the queue.
- Calls `audit-article`.
- Waits 60–90s, picks next. Designed to be invoked by `pg_cron` every 2 minutes OR triggered from the admin UI with a "run for N hours" button that polls.
- Idempotent: safe to re-run.

### 4. Admin page `/admin/audit` (passcode-gated, reuses `REMASTER_ADMIN_PASSCODE`)
- Top bar: Start new sweep / Pause / Resume / Last run progress (X of 28 done)
- Article list sorted by composite severity desc, then by cross-LLM disagreement desc
- Per-article expand panel showing both LLM verdicts side-by-side, evidence quotes, and "Apply proposed layer tags" button (writes back to `live_articles.analysis.cube_position`)
- Filter chips: critical only / sublayer-level issues / verdict disputes / "agent" mis-maps

### 5. Strict sublayer scoring
The audit prompt forces the LLM to walk **all 50 sublayers** and answer yes/no for each: "does the article's substance touch this sublayer?" — output is the precise sublayer ID list. This is where most defensibility-grade insight lives, and it's where you said you want the depth.

### 6. Cross-LLM agreement
For each article, after both runs land, we compute:
- Jaccard overlap of proposed layer sets and proposed sublayer sets
- Verdict agreement
- Score delta
Articles where the two models disagree the most bubble to the top — those are the ones that need a human eye.

## Files to create
- migration: `article_audits` table + RLS
- `supabase/functions/audit-article/index.ts` — does one (article, model) audit
- `supabase/functions/audit-runner/index.ts` — picks next, invokes audit-article, sleeps
- `supabase/functions/_shared/audit-schema.ts` — zod schema for structured output
- `src/pages/AuditAdmin.tsx` — the cockpit
- `src/components/audit/AuditArticleCard.tsx`
- route added in `src/App.tsx`: `/admin/audit`

## Files to update
- `supabase/functions/_shared/framework-context.ts` — add the explicit "agent ≠ L4" guardrail and Law IV section so both auditors and the generator see it.
- `supabase/functions/generate-live-article/index.ts` — same guardrails on future article generation so we stop creating new bugs while we're fixing old ones.

## Models
- Primary critic: `google/gemini-3.1-pro-preview` (deep reasoning, large context)
- Cross-critic: `openai/gpt-5.2` (different reasoning bias)
Both behind the Lovable AI Gateway — no extra keys needed.

## Cadence
Default: 1 article every 90 seconds × 2 models = ~85 minutes for the current 28-article corpus. You can let it run, walk away, come back to a sorted hit-list. Re-runs are cheap and idempotent.

## Out of scope (this round)
- Auto-applying rewrites to article prose (only layer-tag fixes are one-click; prose rewrites stay manual until you trust the auditor)
- New article generation logic — only the guardrail update, not a full rewrite

## Confirm before I build
- (a) Build the full pipeline above ✓
- (b) Build just the audit edge function + a simple results page first, add the runner/cron after you see one result, or
- (c) Skip the admin UI for now — output everything as a downloadable markdown report per run

Reply with **a**, **b**, or **c** (or edits) and I'll start.
