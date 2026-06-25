---
name: Category reframe (vs. AI stack)
description: How to position SCoI against the AI stack — never defend layer count, always reframe the category. Includes canonical reframe sentence and the comparison axes.
type: preference
---

The single most common reader failure is pattern-matching SCoI as "another AI stack diagram" because it shows layers. Don't argue the framework is better; reframe the category.

**Canonical reframe sentence** (lives in `src/data/definition.ts` as `POSITIONING_LINE`, ships in `<CanonicalDefinition>`, hero, footer, OG, meta description, `/not-a-stack`):

> "The AI stack explains how intelligence is built. The Supply Chain of Intelligence explains where intelligence becomes economically defensible."

**Sub-positioning**: Call SCoI a **"strategic framework for AI"** (not "AI framework", not "structural framework for AI defensibility"). "Strategic" covers exec + investor + PM audiences; "economic" is sharper but narrower.

**The 7 comparison axes** (canonical, render order in `StackVsSupplyChainTable.tsx`):
| Axis | AI Stack | Supply Chain of Intelligence |
|---|---|---|
| Question | How is AI built? | Where does value accrue? |
| Lens | Architecture | Economics |
| Unit | Components | Bottlenecks |
| Behavior | Static layers | Dynamic system |
| Discipline | Technology | Strategy |
| Audience | Engineering | Investment & Product |
| Output | Describes | Predicts |

**Reusable surfaces**:
- `<StackVsSupplyChainTable />` — exportable PNG + CopySnippet. On Home + `/not-a-stack`.
- `<CursorThroughBothLenses />` — killer demo (one word vs. 5 layers + flywheel). On Home + `/not-a-stack`.
- `/not-a-stack` — the 6-section explainer page (`/vs-ai-stack` redirects there).

**Tone**: Not defensive. "The AI stack is one input to the Supply Chain of Intelligence — not its competitor."

**Don't**:
- Rename "layers" — they're the signature visual language and SEO moat.
- Rename "Market Map" → "Economic Map" / "Value Map" — Market Map is a map of *companies*; the value map is `/framework` Map section.
- Use combat tone ("attack", "destroy", "kill the stack"). Stratechery-register is contrast, not warfare.
