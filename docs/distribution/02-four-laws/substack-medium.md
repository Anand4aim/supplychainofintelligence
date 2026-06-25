# Substack / Medium — Article 2

**Title**: The 4 Laws of the AI Supply Chain
**Canonical URL**: `https://supplychainofai.com/framework`
**Cover image URL**: `https://supplychainofai.com/og/distribution/02-four-laws-cover.jpg`
**Tags**: `artificial-intelligence`, `tech-strategy`, `generative-ai`, `product-strategy`, `investing`

---

*Originally published at [supplychainofai.com/framework](https://supplychainofai.com/framework). Republished here in personal capacity.*

![The 4 Laws of the AI Supply Chain](https://supplychainofai.com/og/distribution/02-four-laws-cover.jpg)

Article 1 of this series introduced the **Supply Chain of Intelligence™** — a 10-layer map of where value lives in the generative AI stack.

A map tells you *where* you are. It does not tell you *what's going to happen next*.

For that, the framework has four Laws. They are falsifiable structural claims, not slogans. If a single counter-example mechanism appeared, the Law would need an amendment. None has, for two years and counting.

## Law I — Intelligence Commoditizes Downward

> If your product depends only on generic model capability, the platform layer below you will eventually absorb it. **Wrappers don't survive. Wrappers become features.**

Every wave of AI startups runs the same play. A new model lands — GPT-3, GPT-4, Claude 3, Gemini, the next one — and within ninety days a thousand companies wrap a prompt around it, polish a UI, ship a Stripe page, and call themselves a product. For a year the metrics look like a generational software business. ARR doubles every quarter. Then the model layer underneath them ships the same feature for free, and the entire category compresses overnight.

The clearest case is Jasper. At its October 2022 peak it raised $125M at a $1.5B valuation as the canonical "GPT wrapper for marketers." Defensibility lived at L7 (the surface) and only at L7. Then ChatGPT launched. Free. Conversational. Same underlying GPT-3.5. By 2024 the company was reportedly trading at roughly $300M. An 80% mark-down. Not because the team got worse. Because the layer they owned got absorbed by the layer below it.

The pattern repeats across categories. Chegg sat at L7 (generic educational content) and lost 99% of its market cap when ChatGPT made the same Q&A free. Stack Overflow's traffic compressed when models absorbed the answers their community had volunteered for fifteen years. Every category whose entire moat lives at the surface is on the same clock.

**Law I predicts who gets absorbed.** It does not predict who survives.

The escape, when it exists, is to own a layer the platform structurally cannot. Proprietary data the model wasn't trained on (L1). A trust gate the platform cannot legally cross (L3). An execution depth that requires years of workflow embedding (L5–L6). A memory of the user that compounds over time (L8). One of these, owned with conviction, beats five rented at the surface.

## Law II — Value Accrues at Bottlenecks

> Durable value rarely sits in the model or the UI. It sits at the scarce layer — proprietary data, workflow control, verification, distribution, memory, compliance, or trust. **Find the bottleneck. Own it.**

The model is not the bottleneck. The model is the commodity. Three labs ship GPT-class models, two more are 18 months behind, open weights track the frontier within a year. The model layer is rapidly commoditizing because it is rapidly being *supplied*. Commodities are pass-throughs, not bottlenecks.

The bottleneck is whatever the model cannot do alone:

- **NVIDIA owns L0 silicon.** Every model trains and runs on their chips; no second source at scale.
- **Bloomberg owns L1b.** Forty years of structured financial data the models were not trained on.
- **Vanta owns L3.** The SOC 2 gate every B2B SaaS must pass to sell into enterprise.
- **Salesforce owns L4.** The system of record the workflow already runs through.

The pattern isn't "own AI." The pattern is "own the layer everyone else needs to cross." Once you own a bottleneck, you don't win on features. You win because the alternative is to rebuild your layer — which competitors can't do quickly and the model layer won't bother to do at all.

**Bottlenecks are layer-shaped, not feature-shaped.** This is the second mistake operators make. They think the bottleneck is a feature — a clever workflow, a unique UI pattern, a better integration. Features get copied. Layers get owned.

**Law II predicts where value is going.** It is the most actionable of the four: it tells you what to build.

## Law III — The Surface Captures Attention; the Chain Captures Power

> A beautiful UI may get users. But durable companies own a deeper layer of the chain — data, execution, memory, gates. **Surface without depth rarely compounds.**

Two products in the same category. Gamma generates presentations from a prompt. Replit's agent writes code from a prompt. Same surface pattern. Different fates.

- **Gamma** owns L7 and a thin L5 templating layer. The rest is rented.
- **Replit** owns L4 (hosting and distribution), L5 (the codegen agent), L6 (the orchestration between editor, runtime, and deployment), and L8 (the memory of every project the user has ever built).

Same prompt-to-output pattern. Different futures. The surface is identical. The chain is not.

**This is why feature parity is a lie.** Two products can look identical on the surface and have radically different futures, because what determines the future is not what the user sees. It's what sits underneath the user's view — which layers the product actually owns, which it rents, and how much friction would be required to leave. The user doesn't perceive the chain. The user perceives the surface. But the user's decision to stay, year over year, is governed by the chain.

**The practical test for every product decision**: which layer are you reinforcing?

| Decision | Layer it strengthens |
|---|---|
| New animation | L7 |
| New template | thin L5 |
| Integration that captures usage data competitors can't access | L1c + L8 |
| New compliance certification | L3 |
| System-of-record write-back | L4 |

These look equivalent on a roadmap. They are not equivalent in the market.

Surface to acquire. Chain to retain. Both, or neither.

## Law IV — Generation and Verification Must Be Separate

> Wherever output carries fiduciary, regulatory, safety, or reputational weight, the generator (L2/L5) and the verifier (L3) must be separate economic entities. **The model can't audit itself. The codegen can't certify itself. The drafter can't approve itself.**

This is not a technical constraint. It is an institutional one — and that's exactly why it's permanent.

Every mature industry has reached the same conclusion through expensive failure. Auditors must be independent of management, or the audit means nothing. Drug manufacturers cannot approve their own drugs, or the FDA has nothing to enforce. Code that controls a payment system is reviewed by people who didn't write it, or the breach is inevitable. The pattern is so foundational we forget it is a pattern. It's simply how trust works in any system where the cost of a single failure is unrecoverable.

**AI inherits this constraint the moment its output crosses a trust boundary.** When ChatGPT writes a poem, no separation is required — the cost of being wrong is zero. When an AI scribe transcribes a doctor's notes, the cost of being wrong is a malpractice suit, and the FDA cares. When an AI agent writes production code that handles credit card data, the cost of being wrong is a PCI violation, and the CISO cares. Every layer of output that touches money, health, safety, law, or regulation triggers the same institutional reflex: the buyer demands that the generator and the verifier be separate companies. **Not separate teams. Separate balance sheets.**

This is why Vanta will not be absorbed by AWS or OpenAI, even though both have every technical capability to ship a SOC 2 product. The technical capability is not the constraint. AWS auditing AWS is, by definition, not an audit. The same logic protects Snyk from Copilot, Ironclad from Harvey, and Big-4 audit firms from every ERP vendor that has tried to absorb their work for forty years.

**The Two-Vendor Rule (corollary):** enterprises will pay for two vendors when one vendor's mistake is unrecoverable. Cursor for code + Snyk for security review. Harvey for drafts + Ironclad for approval. Model for generation + separate eval vendor for measurement. The duplication tax is cheap compared to the single-point-of-failure tax.

There is a strategic implication operators usually miss. If you're building at L5 in a regulated industry — legal, medical, financial, security, accounting, infrastructure — the L3 above you is not your competition. It's your permanent counterweight. You will not absorb it; it will not absorb you. The smart move is to build the integration that makes you the preferred generator routed through the leading verifier.

**Law IV predicts where L3 is non-absorbable.** In every industry where the cost of a single AI failure is unrecoverable, the L3 verifier above the model is structurally permanent. Find those industries. Build the gate. The platform will route *through* you, not over you.

## The four Laws, on one card

| Law | Says | Predicts | Live example |
|---|---|---|---|
| **I** | Intelligence commoditizes downward | Who gets absorbed | Jasper $1.5B → ~$300M |
| **II** | Value accrues at bottlenecks | Where value is going | NVIDIA L0, Bloomberg L1b, Vanta L3 |
| **III** | Surface captures attention, chain captures power | Who survives the platform era | Gamma vs Replit |
| **IV** | Generation and verification must be separate | Where L3 is non-absorbable | Vanta over AWS; Snyk over Copilot |

Memorize the table. Use it the next time someone shows you a pitch deck.

## Read the rest of the series

- **Article 1 — The Supply Chain of Intelligence: a 10-layer map of the generative AI stack.**
- **Article 3 — Apollo and the SaaSpocalypse: a thin-stack survivor, decoded.** The Laws applied to a live case.

The full framework — 10 layers, 50 sublayers, 4 Laws, 3 Currents, Intelligence Cube, six archetypes — is published as an open standard at **[supplychainofai.com/framework](https://supplychainofai.com/framework)**.

CC BY 4.0 on GitHub. Cite it, fork it, build on it.

---

*Anand Arivukkarasu — Ex-Meta (Instagram) Product Leader & AI Product Architect. Previously VP/Head of Product at Ideas2IT, Refersion, GRIN; Lead PM at Vungle and Pinsight. Based in San Francisco. Written in personal capacity.*

*The Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of Anand Arivukkarasu. Framework licensed CC BY 4.0.*
