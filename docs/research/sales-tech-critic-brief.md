# Sales Tech Map — Adversarial Critic Brief

Purpose: paste this into ChatGPT (GPT-5), Claude Opus 4, or Gemini 3 Pro as
a second-model check on the `/market-map/sales-tech` dataset. Their answers
come back as a diff that gets applied in the next turn, with `flag:` notes
added wherever the second model raised uncertainty we couldn't resolve.

---

## Prompt to paste

You are an adversarial reviewer of an AI-native Sales Tech market map. The
map places ~40 companies across the "Supply Chain of Intelligence" — a
10-layer × 50-sublayer economic model of the generative AI stack.

The framework is at https://supplychainofai.com/framework. Layer glossary
in one line each:

- L-1 Resources · L0 Infra · L1 Data · L2 Models · L3 Gates · L4 Access ·
  L5 Execution · L6 Orchestration · L7 Surface · L8 Memory.

Key sublayers relevant here:

- **L1b Proprietary Data** — owned data corpus (e.g. B2B contact DB).
- **L1c Behavioral / Signal Data** — behavioral, intent, product-usage signals.
- **L1d Outcome Data** — recorded outcomes (call → deal, win/loss patterns).
- **L2b Specialized Models** — domain-tuned foundation models.
- **L3a Compliance & Export Controls** — regulation-as-code (TCPA, GDPR).
- **L5a Domain Execution & Tool Use** — the "agent that does the work" layer.
- **L5b Reasoning Scaffolds** — planning, forecasting, structured reasoning.
- **L6a Agent Loops** · **L6c Multi-Agent Coordination**.
- **L7c Embedded Copilot** — copilot living inside another surface (Word, Salesforce).
- **L7d Transaction Surface** — the surface where a purchase / deal completes.
- **L8d Institutional Knowledge** — org-specific queryable memory of past work.
- **L8e Learned World Models** — model of how the domain actually behaves.

## Your job — 5 attacks

Attack the map along exactly these five axes. Be blunt.

1. **Missing companies.** What AI-native Sales Tech company with ≥$5M
   raised (or clear category importance) is *not* on the list and *should*
   be? Cap your suggestions at 8. For each: name, category, primary
   sublayer placement, funding line with source.

2. **Wrong placements.** Which of the placed companies is on the wrong
   sublayer? For each disagreement: company, current placement,
   your proposed placement, one-sentence reason.

3. **Funding lies.** Every `fund:` line below. Which numbers, dates,
   lead investors, or valuations are wrong or unverifiable? Cite the
   correct figure and source.

4. **Editorial thesis attacks.** The thesis claims (a) L5→L1
   bifurcation, (b) Clay owns the composition layer, (c) Gong's L1d
   corpus is the deepest moat, (d) L3a (Regal, regulated outbound) is
   the least commoditizable position, (e) L5a AI SDRs are structurally
   exposed. Which of these five is weakest? What would flip it?

5. **Blindspots.** The map deliberately excludes marketing
   automation, ABM ad platforms, CS/PLG, pricing, deal desk. Given
   that scope, what structural pattern is the map still missing? One
   pattern, not a list.

Output format: five sections, one per attack, with the specific
callouts requested. No preamble, no praise.

---

## Raw data — placements

(Paste the CONTENTS of `src/data/verticals/salesTech.ts` below this line
before sending to the reviewer model.)

```
<paste salesTech.ts here>
```
