# The Supply Chain of Intelligence™

**The 10 layers of the generative AI stack.**

An open standard for analyzing where value is created, captured, and defended in AI products.

```
Intelligence is a supply chain.
Value accrues at the bottlenecks, not the most visible node.
```

The AI stack describes **how** AI is built.
The Supply Chain of Intelligence describes **where** AI value is created, captured, and defended — and which products a foundation model, hyperscaler, or productivity suite can absorb.

> *The framework does not change weekly. Which company sits in which layer does.*

[Canonical reference: **supplychainofai.com/framework**](https://supplychainofai.com/framework)

---

## TL;DR: the 10 layers

| # | Layer | What it is | Sample players |
|---|---|---|---|
| **L−1** | Resources | Energy, water, fabs, rare earths, skilled trades | NextEra, TSMC fabs, MP Materials |
| **L0** | Infrastructure | Chips, data centers, networking, cloud, edge | NVIDIA, AMD, CoreWeave, Equinix |
| **L1** | Data | Public, proprietary, behavioral, outcome, synthetic | Apollo.io, Bloomberg, ZoomInfo, Scale AI |
| **L2** | Models | Foundation, specialized, embedding, routing, reasoning | OpenAI, Anthropic, Google DeepMind, Meta AI |
| **L3** | Gatekeeping | Compliance, quality, safety, editorial, distribution | Vanta, Drata, OneTrust, Apple App Store |
| **L4** | Access | APIs, MCP, governance, real-time pipes, agent identity | AWS, Snowflake, Supabase, Twilio |
| **L5** | Execution | Domain skill, reasoning scaffolds, playbooks, actuation | Harvey, Sierra, Cursor, 11x |
| **L6** | Orchestration | Agent loops, HITL, routing, state, runtime assurance | LangChain, CrewAI, Zapier (at risk) |
| **L7** | Surface | Conversational, visual, embedded, transaction, ambient | ChatGPT, Gemini, Copilot, ElevenLabs |
| **L8** | Memory | Session, user, network, institutional, world-model | Sierra, Notion (partial), Rewind AI |

Each layer breaks further into 5 sublayers — **50 in total**. See `layers/` for per-layer detail.

## Three tiers

The 10 layers group into three tiers — the only grouping you need at a whiteboard:

- **Substrate** (L−1, L0, L1, L2, L3, L8) — what users *depend on*. Compounds in years.
- **Workflow** (L4, L5, L6) — what users *live inside*. Survives in months.
- **Surface** (L7) — what users *touch*. Commoditizes in weeks.

## The four structural Laws

| Law | One line |
|---|---|
| **I — Intelligence Commoditizes Downward** | Wrappers don't survive. Wrappers become features. |
| **II — Value Accrues at Bottlenecks** | Find the scarce layer. Own it. Everything else is rent. |
| **III — Surface Captures Attention; the Chain Captures Power** | Beautiful UIs get users. Deep chains keep them. |
| **IV — Generation and Verification Must Be Separate** | The model can't audit itself. The codegen can't certify itself. |

Full essays at [supplychainofai.com/framework](https://supplychainofai.com/framework) and `laws.md` in this repo.

## The Defensible Triangle

> **L1b + L5a/b/d + L8c/d/e** → proprietary data + deep execution + compounding memory.

The combination where durable AI moats live. Own at least two corners or the platform absorbs you.

## The Intelligence Cube™

Functions × Verticals × Layers. Volume = structural durability. Thin slivers die. See `intelligence-cube.md`.

## The three Currents

Horizontal market forces that flow across every layer:

- **Demand Gravity** — where the budget sits and what it pulls toward.
- **Attention Economics** — when generation is infinite, the eyeball becomes scarce.
- **Capital Flows** — funding is reflexive; rounds reshape the layers they fund.

Geopolitics is **not** a Current — it lives at its native layers (L−1, L3). See `currents.md`.

---

## Repo layout

```
spec/
├── README.md                       ← this file
├── LICENSE                         ← CC BY 4.0
├── CITATION.cff                    ← GitHub renders "Cite this repository"
├── laws.md                         ← the 4 Laws, full text
├── currents.md                     ← the 3 Currents
├── intelligence-cube.md            ← Functions × Verticals × Layers
├── layers/
│   ├── L-1-resources.md
│   ├── L0-infrastructure.md
│   ├── L1-data.md
│   ├── L2-models.md
│   ├── L3-gatekeeping.md
│   ├── L4-access.md
│   ├── L5-execution.md
│   ├── L6-orchestration.md
│   ├── L7-surface.md
│   └── L8-memory.md
└── data/
    ├── layers.json                 ← machine-readable layer + sublayer data
    └── laws.json                   ← machine-readable Laws
```

---

## "Agent" decoder (read this before you use the word)

**Agent is not a layer. It's marketing language for a package:**

- **L5** (Execution) — the actual skill / "doing the work" — REQUIRED.
- **L6** (Orchestration) — multi-step planning, tool-use, routing — REQUIRED for anything called "agentic".
- **L7** (Surface) — usually included (chat, inbox, copilot pane).
- **L8** (Memory) — included if it remembers across sessions.
- **L4** (Access) — the *pipes* the agent rides on (MCP, OAuth, connectors). **L4 is not the agent.** Tagging an agent story as L4-only is a factual error.

When a company pitches an "agent", decode it: name L5 + L6 first, then which of L4/L7/L8 it bundles.

---

## How to use this

**Cite it.**

> Arivukkarasu, A. (2026). *The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack.* https://supplychainofai.com/framework

**Build on it.** Fork this repo. Use `data/layers.json` to power your own analysis tools. Open issues with proposed structural amendments — Laws need a falsification mechanism, not an opinion.

**Apply it.** Run the [AI Defensibility Audit](https://supplychainofai.com/audit) against your own product. The audit scores you against the 8 layer-defensibility dimensions and returns a 0–100 verdict band.

---

## License

**CC BY 4.0.** Use it commercially. Use it privately. Modify it. Distribute it. Attribute the source.

The **Supply Chain of Intelligence™** and **The Intelligence Cube™** word marks are trademarks of Anand Arivukkarasu. The underlying framework, layer taxonomy, Laws, and Cube are free to use under the license above; the *names* identify the canonical source. You may write *"based on the Supply Chain of Intelligence framework by Anand Arivukkarasu"* without permission. Do not present forks under the trademarked names as your own framework.

## Author

**Anand Arivukkarasu** — Ex-Meta (Instagram) Product Leader & AI Product Architect. Previously VP/Head of Product at Ideas2IT, Refersion, GRIN; Lead PM at Vungle and Pinsight. Based in San Francisco. Angel investor and advisor.

Published in personal capacity. [LinkedIn](https://www.linkedin.com/in/anandarivu) · [supplychainofai.com](https://supplychainofai.com)
