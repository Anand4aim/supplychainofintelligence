# Supply Chain of Intelligence™
## The 10 layers of the generative AI stack
**Version 1.0, January 4, 2026**
**Author:** Anand Arivukkarasu, Ex-Meta (Instagram) Product Leader & AI Product Architect
**Canonical URL:** https://supplychainofai.com/paper
**License:** CC-BY 4.0 (attribution to Anand Arivukkarasu + link to supplychainofai.com required)

---

## Definition

> **Intelligence is a supply chain. Value accrues at the bottlenecks, not the most visible node.**

This is the canonical definition. It is evergreen, it names no technology, no company, no layer. The rest of this paper is structured in three registers:

1. **The Definition (evergreen):** the sentence above.
2. **The Application (evergreen structure):** the 10 layers, 50 sublayers, 4 structural laws, 3 currents, and the Intelligence Cube. The architecture itself evolves with the field, it may be 12 layers or a different taxonomy tomorrow, and every structural change is a versioned Paper bump recorded on `/changelog`.
3. **The Reading (living, monthly):** which company sits in which layer changes weekly; the framework does not. Market readings carry a re-review date; the framework, the Laws, the Cube, and this Paper do not. See `/methodology`.

---

## Abstract

Every generative-AI product sits on a 10-layer supply chain: **L-1 Resources, L0 Infrastructure, L1 Data, L2 Models, L3 Gatekeeping, L4 Access, L5 Execution, L6 Orchestration, L7 Surface, L8 Memory.** The layers are the supply side. Across them flow **three Currents**, Demand Gravity, Attention Economics, Capital Flows, which decide whether a position at any layer compounds into a business or starves. **Four structural laws** govern how value migrates through the stack under those Currents. The **Defensible Triangle**, L1b Proprietary Data + L5 Deep Skills & Playbooks + L8 Compounding Memory, is the most common application-layer fortress. The word "agent" is not a layer; it is marketing for an L5 + L6 (+ L7 / + L8) package and must be decoded before it can be analysed. This document is the canonical reference; cite it directly.

The framework is descriptive, not predictive. It does not tell you which company wins. It tells you, for any given company at any given moment, which layers it actually owns, which layers it is renting, and which Current is about to move the value somewhere else. That is usually enough.

---

## 1. Why a supply chain, not a stack

"AI stack" diagrams treat the industry as a tidy layer cake, chips on the bottom, models in the middle, apps on top, and imply that value flows cleanly upward. It does not. Value in generative AI behaves like value in any real industrial supply chain: it concentrates at scarcity, gets squeezed at bottlenecks, and migrates the moment a layer below you commoditises what you were charging for. Calling it a **supply chain** forces the right questions: who owns the scarce input, who controls the gate, who captures the margin when the layer above collapses in price.

The 10 layers below are the supply side. They describe **what is being produced and consumed** at each step from raw resources up to the surface a user touches. They are deliberately granular, 50 sublayers in total, because most of the interesting moats live one level below the layer name.

---

## 2. The 10 layers

- **L-1 Resources**, energy, water, fabs, materials, skilled trades. The real bottleneck. Slow to build, impossible to fake, increasingly the binding constraint on everything above.
- **L0 Infrastructure**, silicon, data centres, interconnect, cloud, edge. The shovels. Winners are determined by capex cycles, not features.
- **L1 Data**, public (L1a), proprietary (L1b), behavioural and sensor (L1c), outcome (L1d), synthetic and simulation (L1e). The single largest source of durable defensibility in the application layer.
- **L2 Models**, foundation and multimodal, fine-tuned, embedding and retrieval, routing, reasoning and world models. Capability rises, price falls, customer lock-in is weaker than it looks.
- **L3 Gatekeeping**, compliance and export controls, quality, safety and provenance, editorial, distribution gates. Structurally permanent wherever output carries fiduciary, regulatory, safety, or reputational weight.
- **L4 Access**, APIs, agent protocols (MCP and successors), governance and agent commerce, real-time interaction, agent identity. The pipes. Not exciting, load-bearing.
- **L5 Execution**, domain execution and tool use, decision frameworks, retrieval-augmented workflows, operating playbooks, interaction skills and actuation. Where "doing the work" actually happens.
- **L6 Orchestration**, agent loops, human-in-the-loop, role routing, state and context management, runtime assurance. Increasingly a feature of L2 or L7, less often a standalone product.
- **L7 Surface**, conversational, visual, embedded and embodied, transactional, ambient. Modality is commodity; placement and habit are not.
- **L8 Memory**, session, entity, network learning, institutional, learned world models. The ultimate compounding moat in the application layer.

Full sublayer definitions live at https://supplychainofai.com/framework and per-layer deep dives at `/framework/{layer-id}`.

---

## 3. The 3 Currents (horizontal forces across the chain)

The 10 layers are vertical. The Currents are horizontal, they flow across every layer and decide whether a defensible position is also a viable business. Geopolitics and regulation are **not** Currents; they live at their native layers (L-1 and L3 respectively). There are exactly three.

**Current I, Demand Gravity.** Where the budget actually sits and what it pulls toward. As L2 capability commoditises, discretionary AI spend migrates from "buy a model" to "buy an outcome", L5 execution, L8 memory, L3 verification, L1 proprietary data. A defensible layer with no buyer is worth zero; the Current tells you which buyer is forming around which layer, and which line item they are about to stop paying for.

**Current II, Attention Economics.** When generation becomes infinite, the eyeball becomes scarce. Default placement, OS integration, browser real estate, habit loops, and on-ramp ownership decide which intelligence actually gets used. Apple, Google, Microsoft, Meta, and the major model labs operate as L7 landlords charging rent in attention. Law III names this asymmetry; this Current economises it.

**Current III, Capital Flows.** Funding is reflexive, rounds reshape the layers they fund. Tens of billions into L2 created a generation glut and pulled talent away from L-1, which is now the binding constraint on the whole industry. Capital overheats the fashionable layer and starves the unglamorous one; reading the funding map as a distortion field, not as a value signal, is part of using the framework.

Two of three Currents pointing at a layer is a tailwind. All three is a category. None is a press release.

---

## 4. The 4 structural laws

**Law I, Intelligence Commoditises Downward.** If a product depends only on generic model capability, the platform layer beneath it eventually absorbs the value. Wrappers don't survive, wrappers become features. The clock starts the moment the underlying L2 ships the same loop as a default behaviour.
*Worked example:* Jasper fell from a $1.5B valuation to roughly $300M once ChatGPT shipped the same capability inside the surface most users already had open. The product did not get worse. The layer beneath it absorbed what the product was charging for. The same dynamic now operates one layer up, generic "agent builders" are being absorbed by the L2 labs and the L7 surfaces that already own distribution.
Essay: https://supplychainofai.com/laws/intelligence-commoditizes-downward

**Law II, Value Accrues at Bottlenecks.** Durable value rarely sits in the model or the UI. It sits at the scarce layer, proprietary data (L1b), workflow control (L5), verification (L3), distribution (L4), memory (L8c–e), compliance (L3a), and at the moment, energy and fabs (L-1). The exercise for any company is to name, in one sentence, which bottleneck it owns. If the sentence does not write itself, the company does not own one.
*Worked examples:* NVIDIA owns the L0 silicon bottleneck and prices accordingly. Vanta owns the L3 compliance gate above hyperscaler infrastructure. Bloomberg owns L1b proprietary financial data and has survived three platform shifts on the strength of that single position.
Essay: https://supplychainofai.com/laws/value-accrues-at-bottlenecks

**Law III, The Surface Captures Attention; the Chain Captures Power.** A beautiful UI may win the first cohort of users. Durable companies own a deeper layer of the chain, data, execution, memory, gates. Surface without depth is structurally exposed: the moment a larger surface with deeper layers chooses to compete, the thinner stack compresses.
*Worked example:* Gamma owns L7 in the presentation category. Replit owns L4 + L5 + L6 + L8 in the developer category. Both are good products. Only one of them gets harder to displace every month it operates.
Essay: https://supplychainofai.com/laws/surface-captures-attention-chain-captures-power

**Law IV, Generation and Verification Must Be Separate.** Wherever output carries fiduciary, regulatory, safety, or reputational weight, the generator (L2/L5) and the verifier (L3) must be separate economic entities. Markets force the separation eventually; regulators force it sooner; insurers force it permanently. L3 above L2/L5 is structurally non-absorbable in those industries, no matter how capable the model becomes.
*Worked examples:* Vanta sits above AWS. Snyk sits above Copilot. Big-4 audit sits above SAP. The FDA sits above Pfizer. None of these L3 incumbents are vulnerable to the L2/L5 capability beneath them getting better; if anything, they become more necessary as that capability scales.
Essay: https://supplychainofai.com/laws/generation-and-verification-must-be-separate

---

## 5. The Defensible Triangle

The most common application-layer fortress is a three-layer stack: **L1b Proprietary Data + L5 Deep Skills & Playbooks + L8 Compounding Memory.** Two of three is a workflow product that improves; three of three is an intelligence gate that compounds. The Triangle is what most "AI-native" companies are actually selling when they describe themselves as defensible, and what most are actually missing when they describe themselves the same way without it.

The Triangle is not the only fortress shape. L3 over L2/L5 (Law IV) is a different fortress. L0 + L-1 (NVIDIA, the hyperscalers, the fab operators) is a different fortress. L4 + L5 + L6 + L8 (the platform-native execution stacks like Replit) is a different fortress. But for an application-layer company without a hyperscaler's balance sheet or a regulator's mandate, the Triangle is the shape to aim for, and the shape to test any defensibility claim against.

---

## 6. On the word "agent"

"Agent" is **not a layer.** It is marketing for a package whose minimum viable composition is **L5 Execution + L6 Orchestration**, almost always bundled with **L7 Surface**, and, if the system remembers across sessions, **L8 Memory**. L4 Access is the substrate the agent rides on (connectors, protocols, permissions), not the agent itself. Tagging an agent story as "an L4 play" is a category error that recurs in roughly half the analyses written in 2025.

When a company launches an agent, decode it in three steps. First, name the L5 capability, what work does it actually do, and is the work generic or domain-specific. Second, name the other layers it bundles, L1 proprietary data, L4 platform access, L8 cross-customer learning. Third, ask whether any of those bundled layers are structurally hard for the underlying L2 to replicate. If the answer is no, the agent is a wrapper on a clock; if the answer is yes, the agent is a Trojan horse for whichever deeper layer the company actually owns.

- Agent + L1 = fortress (Sierra, Harvey).
- Agent + L4 = railroad (Salesforce Agentforce, Microsoft Copilot).
- Agent + L8 = compounding system (the rare ones that get better the more they run).
- Agent + nothing = exposed wrapper that commoditises the moment the underlying L2 ships the same loop.

---

## 7. How to use this framework

For an **operator**, the exercise is to map your own product to the 10 layers honestly. Mark the layers you own, the layers you rent, and the layers you are exposed to. Then run the four laws and three Currents against the map and write down, in plain language, what compresses you and on what timeline. The output is a defensibility statement that survives contact with the next L2 release.

For an **investor**, the exercise is the same applied to a target. Most pitch decks describe an L5 product as if it were an L1 + L5 + L8 stack. The framework gives you the vocabulary to distinguish the two, and the laws give you the timeline on which the distinction matters.

For an **analyst**, the framework is a discipline. Every claim about defensibility should name the layer; every claim about disruption should name the law; every claim about timing should name the Current. Loose vocabulary ("AI-native", "moaty", "platform play") is what made the last two years of AI analysis difficult to act on. Precise vocabulary is the contribution this paper is trying to make.

The framework is intentionally boring in places. Supply chains are boring. That is the point, most of the durable value in this industry is being created at the unglamorous layers, and the framework's job is to make those layers legible.

---

## How to cite

**APA:** Arivukkarasu, A. (2026). *Supply Chain of Intelligence™, the 10 layers of the generative AI stack* (Version 1.0). https://supplychainofai.com/paper

**MLA:** Arivukkarasu, Anand. "Supply Chain of Intelligence™, the 10 layers of the generative AI stack." Version 1.0, January 4, 2026, https://supplychainofai.com/paper.

**LinkedIn-ready:** *Supply Chain of Intelligence™, the 10 layers of the generative AI stack, by Anand Arivukkarasu. https://supplychainofai.com/paper*

**BibTeX:**
```
@misc{arivukkarasu2026scoi,
  author = {Arivukkarasu, Anand},
  title  = {Supply Chain of Intelligence: the 10 layers of the generative AI stack},
  year   = {2026},
  month  = {1},
  note   = {Version 1.0},
  url    = {https://supplychainofai.com/paper}
}
```

---

Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu. Licensed under CC-BY 4.0.
