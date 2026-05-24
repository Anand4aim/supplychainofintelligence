---
name: Editorial tone
description: Site-wide voice rules — counter-move framing, soft directional language, never harsh verdicts
type: preference
---
**Rule:** This is a counter-move site, not a prediction site. Anand may reach out to these companies to help. Every verdict must land soft and directional — never affirmative-crushing. Use lighter, factual, analytical, structural language everywhere — case studies, live articles, framework, posters, home page, market map.

**Avoid (hard ban):**
- "DEAD", "DOOMED", "EXPOSED" ALL-CAPS verdicts shown to readers (the DB enum can keep DEAD internally, but display via `verdictLabel()` in `src/data/verdictLabels.ts` → "AT RISK")
- "Fortress", "untouchable", "can't be touched", "killer", "crushed", "eaten", "destroyed", "swallowed", "obliterated"
- "graveyard candidate", "wrappers die", "thin slivers die", "X dies in eighteen months"
- "extinction", "footnote", "obituaries", "display case"
- 💀 skull emojis, ✕ "Eaten" labels on posters
- Definitive future predictions ("X will lose", "Y wins")

**Prefer:**
- "Compresses", "gets compressed", "absorbed", "consolidates"
- "Defensible stack" / "Thin stack" / "At risk" / "Leading" / "Contested"
- "Counter-move available" — always name the deeper layer (L1, L5, or L8) the company could add
- "Structurally durable" vs "compression candidate (counter-move available)"
- Hedged framing ("contested", "under pressure", "shifts where value sits")
- Dated observations ("As of May 2026…")

**Display label map** (in `src/data/verdictLabels.ts` — single source of truth):
- DOMINANT → LEADING
- SAFE → DEFENSIBLE
- CONTESTED → CONTESTED
- DEAD / EXPOSED / DOOMED → AT RISK

**Archetype labels** (in `src/data/marketMap.ts` `ARCHETYPE_LABEL`):
- fortress → "Defensible stack"
- graveyard → "Thin stack"

**Why:** Anand may engage these companies to help them deepen their stack. Harsh verdicts burn the relationship and age badly when news shifts. Soft, directional framing keeps the analysis useful and the door open.
