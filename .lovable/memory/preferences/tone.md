---
name: Editorial tone
description: Site-wide voice rules for case studies, live articles, and analysis copy
type: preference
---
**Rule:** Use lighter, factual, analytical language across all case studies, live articles, and analysis copy. Avoid strong verdict language and absolute claims.

**Avoid:**
- "Fortress", "untouchable", "can't be touched", "dead", "eaten", "destroyed", "killer", "crushed"
- "SAFE", "EXPOSED", "DOOMED" style ALL-CAPS verdicts
- Definitive future predictions ("X will lose", "Y wins")
- Hype framing ("massive", "explosive", "game-changing")

**Prefer:**
- Layer-based descriptions ("L1 + L5 + L8 stack", "compresses L5 over time")
- Hedged framing ("contested", "under pressure", "shifts where value sits", "worth watching")
- Dated observations with sources ("As of May 2026…")
- Neutral verdicts that describe structure, not outcome

**How to apply:** When writing or editing any case study (`src/data/caseStudies.ts`), live article, or analysis blurb, prefer structural/factual descriptions over predictive verdicts. Keep `verdict` fields descriptive (e.g. "L1 + L3 + L5 + L8") rather than judgmental.

**Why:** User feedback — strong opinions create cross-article inconsistencies when news shifts. Factual layer-mapping ages better.
