# LinkedIn Article — Article 1

**Title**: The Supply Chain of Intelligence: a 10-layer map of the generative AI stack

**Subtitle**: Why the AI stack tells you how intelligence is built — and the supply chain tells you where it becomes defensible.

**Cover image**: `/mnt/documents/distribution/01-framework-cover.jpg`

**Hashtags (paste at bottom)**: `#ArtificialIntelligence` `#ProductStrategy` `#GenerativeAI` `#TechStrategy` `#AIStack`

---

Every founder, investor, and product leader I talk to is fluent in the AI stack — chips at the bottom, models in the middle, applications on top. It's a useful diagram. It's not a strategy.

The AI stack describes **how** AI is built.
It does not describe **where** AI value is created, captured, or defended.
And it does not tell you which products a foundation model, a hyperscaler, or a productivity suite can quietly absorb in their next release.

So I built one that does. I call it the **Supply Chain of Intelligence™**.

The one-line definition is the only sentence you need to memorize:

> **Intelligence is a supply chain. Value accrues at the bottlenecks, not the most visible node.**

That sentence runs the rest of this piece.

[IMAGE: insert `01-framework-cover.jpg` here — the 10-layer color stack]

---

## The 10 layers, in one pass

The supply chain has 10 layers, numbered L−1 through L8. The numbering is deliberate: power, water, and fabs sit *below* the silicon layer, so they get the negative index. Memory sits *outside* the inference path but compounds across it, so it gets the highest.

| # | Layer | What it is | Who plays it today |
|---|---|---|---|
| **L−1** | Resources | Energy, water, fabs, rare earths, skilled trades | NextEra, TSMC fabs, MP Materials, Vistra |
| **L0** | Infrastructure | Chips, data centers, networking, cloud, edge | NVIDIA, AMD, CoreWeave, Equinix |
| **L1** | Data | Public, proprietary, behavioral, outcome, synthetic | Apollo.io, Bloomberg, ZoomInfo, Scale AI |
| **L2** | Models | Foundation, specialized, embedding, routing, reasoning | OpenAI, Anthropic, Google DeepMind, Meta AI |
| **L3** | Gatekeeping | Compliance, quality, safety, editorial, distribution | Vanta, Drata, OneTrust, Apple App Store |
| **L4** | Access | APIs, MCP, governance, real-time pipes, agent identity | AWS, Snowflake, Supabase, Twilio |
| **L5** | Execution | Domain skill, reasoning scaffolds, playbooks, actuation | Harvey, Sierra, Cursor, 11x |
| **L6** | Orchestration | Agent loops, HITL, routing, state, runtime assurance | LangChain, CrewAI, Zapier (at risk) |
| **L7** | Surface | Conversational, visual, embedded, transaction, ambient | ChatGPT, Gemini, Copilot, ElevenLabs |
| **L8** | Memory | Session, user, network, institutional, world-model | Sierra, Notion (partial), Rewind AI |

Each layer further breaks into 5 sublayers (50 in total). The full map lives at supplychainofai.com/framework — I'm keeping this post at headline resolution.

---

## Three tiers, not ten silos

Ten layers is useful for analysis. It's a lot for a meeting. So the 10 layers collapse into 3 tiers — the only grouping you ever need at a whiteboard:

- **Substrate** (L−1, L0, L1, L2, L3, L8) — what users *depend on*. Compounds in years. Proprietary data, trust gates, compounding memory.
- **Workflow** (L4, L5, L6) — what users *live inside*. Survives in months. Sticky if deep, owned, and integrated.
- **Surface** (L7) — what users *touch*. Commoditizes in weeks. Platforms ship this for free.

If you understand nothing else about this framework, understand the asymmetry between those three numbers — *years, months, weeks*. That's the half-life of every layer's defensibility. Every founder who has confused Surface time-to-die with Substrate time-to-die has built a wrapper and called it a company.

---

## Why this matters: where value actually accrues

Three observations the framework forces on you the moment you look at the map.

**1. The model is not the bottleneck. The model is the commodity.**
The L2 layer is expensive, but it is being rapidly *supplied* — three labs at the frontier, two more 18 months behind, open weights tracking within a year. Expensive ≠ scarce. The market prices commodities like commodities, even when they cost half a billion dollars to train.

**2. Value lives at the layer competitors cannot easily build, buy, or bypass.**
NVIDIA owns L0 because there is no second source at scale. Bloomberg owns L1b because nobody is going to reconstruct 40 years of structured financial data. Vanta owns L3 because the CISO cannot accept AWS auditing AWS. These are bottlenecks. Bottlenecks are where the money goes when the model layer commoditizes.

**3. "Agent" is not a layer. It's a package.**
This is the single most common analyst error in 2026. When a company pitches an "agent", decode it: L5 (the skill), L6 (the orchestration), usually L7 (the surface), often L8 (the memory). L4 is the *pipes* the agent rides on — MCP, OAuth, connectors. L4 is not the agent. If your map says "agents capture L4," you've been reading marketing copy.

[IMAGE: optional — screenshot of the Defensible Triangle from supplychainofai.com/framework]

---

## The Defensible Triangle

If you have to remember a *combination* of layers — not just a single one — remember this:

> **L1b + L5a/b/d + L8c/d/e** → proprietary data + deep execution + compounding memory.

This is the Defensible Triangle. It is where durable AI moats live. Almost every long-term winner of the next decade will own at least two of these three corners.

Why? Because that's the combination the platform layer is structurally *not incentivized to absorb*. OpenAI will absorb L7. Anthropic will absorb L7. They will not absorb your customer's eight years of behavioral data, your operating playbook, or your aggregated network learning — those aren't features they can ship. They're moats that require time and a specific customer relationship to compound.

---

## The honest test

Run your own product through one question.

> **When the model layer below me ships my feature for free, what is the user still paying me for?**

If you cannot name it in one sentence, you are inside the wrapper-to-feature pipeline. You have time, but not as much as you think.

If you can name it — *the proprietary data, the trust gate, the workflow embedding, the compounding memory* — congratulations. You're not building a wrapper. You're building a layer.

---

## What's coming next in this series

This is article 1 of 3.
- **Article 2 — The 4 Laws of the AI Supply Chain** (why wrappers die, where value accrues, why surface fails alone, why generation and verification must stay separate).
- **Article 3 — Apollo and the SaaSpocalypse: a thin-stack survivor decoded.** The canonical worked example.

The full framework — all 10 layers, 50 sublayers, 4 Laws, 3 Currents, Intelligence Cube, six archetypes — is published as an open standard at **supplychainofai.com/framework**.

The framework is also published as an open spec on GitHub, licensed CC BY 4.0. Cite it, fork it, build on it.

If this is useful, **follow me on LinkedIn** for the next two pieces in the series.

---

*Anand Arivukkarasu — Ex-Meta (Instagram) Product Leader & AI Product Architect. Previously VP/Head of Product at Ideas2IT, Refersion, GRIN; Lead PM at Vungle and Pinsight. San Francisco. Written in personal capacity.*

*The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu. Framework licensed CC BY 4.0.*

*Originally published at [supplychainofai.com/framework](https://supplychainofai.com/framework).*
