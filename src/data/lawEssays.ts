// Long-form essays — one per Structural Law. Linked from the Three Laws section.
// Plain-text paragraphs; markdown-ish **bold** is rendered by the Law page.

export interface LawEssay {
  slug: string;
  num: "I" | "II" | "III" | "IV";
  title: string;
  shortTitle: string;
  oneLine: string;
  description: string; // meta description
  paragraphs: string[];
}

export const LAW_ESSAYS: LawEssay[] = [
  {
    slug: "intelligence-commoditizes-downward",
    num: "I",
    title: "Intelligence Commoditizes Downward",
    shortTitle: "Law I — Intelligence Commoditizes Downward",
    oneLine: "Wrappers don't survive. Wrappers become features.",
    description:
      "Law I of the Supply Chain of Intelligence: any AI product that depends only on generic model capability will be absorbed by the layer below it. The wrapper-to-feature pipeline, explained.",
    paragraphs: [
      "Every wave of AI startups runs the same play. A new model lands — GPT-3, GPT-4, Claude 3, Gemini, the next one — and within ninety days a thousand companies wrap a prompt around it, polish a UI, ship a Stripe page, and call themselves a product. For a year the metrics look like a generational software business. ARR doubles every quarter. Boards funnel money in. Then the model layer underneath them ships the same feature for free, and the entire category compresses overnight.",
      "**This is not a market accident. It is a structural force.** Law I of the Supply Chain of Intelligence states it plainly: if your product depends only on generic model capability, the platform layer below you will eventually absorb it. The model owners are not standing still. They have every incentive to move up the stack — because that is where the margin is — and every capability to do so, because they already own the substrate everyone else is renting.",
      "The clearest case study is Jasper. At its October 2022 peak Jasper raised $125M at a $1.5B valuation as the canonical 'GPT wrapper for marketers.' Defensibility lived at L7 — the surface — and only at L7: prompt templates, brand voice presets, a polished editor. Then ChatGPT launched. Free. Conversational. The same underlying GPT-3.5. Within six weeks the entire premise of Jasper was a feature inside a product the user had no reason to pay for. By 2024 the company was reportedly trading at roughly $300M. An 80% mark-down. Not because the team got worse. Because the layer they owned got absorbed by the layer below it.",
      "**Why does this keep happening?** Because the AI stack has a gravity. Value flows downward through it the way water flows downhill. Anything that can be done at L2 — inside the model itself — eventually will be done at L2, because the model owner controls the marginal cost. If GPT-5 can write marketing copy in 'Jasper voice' with the same quality, OpenAI will ship that capability, and they will ship it bundled into ChatGPT Plus at $20/month. The wrapper does not lose on feature parity. The wrapper loses on price floor. You cannot charge $59/month for something that costs the layer beneath you nothing to include.",
      "The pattern repeats across categories. Chegg sat at L7 — generic educational content — and lost 99% of its market cap when ChatGPT made the same Q&A free. Stack Overflow's traffic compressed when models absorbed the answers their community had volunteered for fifteen years. Presentation-generation startups like Gamma now sit one Microsoft demo away from being a free PowerPoint feature. Every category whose entire moat lives at the surface is on the same clock.",
      "**The first law tells you who gets absorbed. It does not tell you who survives.** That requires the next two laws. But Law I gives you the diagnostic: ask which layers your product owns that the model layer below it does not. If the honest answer is 'none — we own the prompt and the UI,' you are not a company. You are a feature waiting for its acquirer, and the acquirer will not bother to acquire you. They will simply ship the feature.",
      "The escape, when it exists, is to own a layer the platform structurally cannot. Proprietary data the model was not trained on (L1). A trust gate the platform cannot legally cross (L3). A distribution surface the platform does not own (L4). An execution depth that requires years of workflow embedding (L5–L6). A memory of the user that compounds over time and would be painful to migrate (L8). One of these, owned with conviction, beats five rented at the surface.",
      "If you are building today, the question is not 'is my product useful?' Useful products get absorbed every quarter. The question is: 'when the model layer below me ships my feature for free, what is the user still paying me for?' If you cannot name it in one sentence, you are inside Law I. You have time, but not as much as you think.",
    ],
  },
  {
    slug: "value-accrues-at-bottlenecks",
    num: "II",
    title: "Value Accrues at Bottlenecks",
    shortTitle: "Law II — Value Accrues at Bottlenecks",
    oneLine: "Find the scarce layer. Own it. Everything else is rent.",
    description:
      "Law II of the Supply Chain of Intelligence: durable value sits at the scarce layer of the stack — data, trust, distribution, memory, compliance. Find the bottleneck. Own it.",
    paragraphs: [
      "If Law I tells you who gets absorbed, Law II tells you where the money goes when they do. Durable value rarely sits in the model or the UI. It sits at whichever layer of the stack is structurally scarce — the layer that competitors cannot easily build, buy, or bypass. Find that layer. Own it. Everything above and below it pays you rent.",
      "**The model is not the bottleneck. The model is the commodity.** This is the part most operators get backwards. They look at the AI stack, see that GPT-class models cost hundreds of millions to train, and conclude that L2 — the model layer — must be where the money is. They are right that the layer is expensive. They are wrong that it is scarce. Three labs ship GPT-class models, two more are 18 months behind, and open-weight models track the frontier within a year. The model layer is rapidly commoditizing because it is rapidly being supplied. Commodities are not bottlenecks. Commodities are pass-throughs.",
      "The bottleneck is whatever the model cannot do alone. NVIDIA owns L0 silicon — every model trains on their chips, every inference runs on their chips, and there is no second source at scale. That is a bottleneck, and the market prices it as one. Bloomberg owns L1b — forty years of structured financial data the models were not trained on and cannot license cheaply. That is a bottleneck. Vanta owns L3 — the SOC 2 and ISO compliance gate that every B2B SaaS company has to pass to sell into enterprise. That is a bottleneck. Apollo and ZoomInfo own L1c — proprietary B2B contact graphs the public web does not contain. Bottleneck. Salesforce owns L4 — the system of record that the workflow already runs through. Bottleneck.",
      "**The pattern is not 'own AI.' The pattern is 'own the layer everyone else needs to cross.'** Once you own a bottleneck, you do not need to win on features. You win on the fact that the alternative is to rebuild your layer, which competitors cannot do quickly and the model layer will not bother to do at all. The model layer's incentive is to expand upward into surface and orchestration, not sideways into your trust gate or downward into your data well.",
      "How do you find your bottleneck? Ask three questions. First, what does my product require that competitors cannot replicate within twelve months? If the answer is 'a better prompt,' you do not have a bottleneck. If the answer is 'eight years of customer behavioral data tied to outcomes,' you might. Second, what does my product require that the model layer is not incentivized to supply? Foundation model labs will not build vertical compliance, regulated-industry trust, or enterprise system-of-record integration. That is space the model layer leaves alone. Third, what would my customer have to rebuild if they left me? If the answer is 'a Stripe integration,' you do not have a bottleneck. If the answer is 'a decade of accumulated context that makes the product work,' you do.",
      "**Bottlenecks are layer-shaped, not feature-shaped.** This is the second mistake operators make. They think the bottleneck is a feature — a clever workflow, a unique UI pattern, a better integration. Features get copied. Layers get owned. The bottleneck is structural: you own the data nobody else has, the trust nobody else can issue, the distribution nobody else controls, the memory nobody else accumulates. Features sit on top of bottlenecks. Bottlenecks sit underneath features. Confuse them and you build the wrong moat.",
      "The corollary is uncomfortable for surface companies: if every layer below you is a commodity, you do not have a bottleneck. You have a brand. Brand is real value — but it is not structural value. It does not protect you from a bigger brand showing up with the same model, at the same price, with more distribution. Surface companies that survive Law I almost always do it by sprinting downward into a bottleneck layer before the model owner sprints upward into theirs.",
      "Law II is the most actionable of the three. It tells you what to build, not what to fear. Identify the scarce layer in your category. Decide whether you can own it. If you can, own it relentlessly — every dollar of product investment should compound the bottleneck, not decorate the surface. If you cannot, do not build the company. The market is currently funding hundreds of products at surface layers where the bottleneck is already owned by an L4 platform or an L1b incumbent. Most of those funding rounds are buying time inside Law I, not escaping it.",
      "Find the bottleneck. Own it. Everything else is rent — and rent gets repriced.",
    ],
  },
  {
    slug: "surface-captures-attention-chain-captures-power",
    num: "III",
    title: "The Surface Captures Attention; the Chain Captures Power",
    shortTitle: "Law III — Surface Captures Attention, Chain Captures Power",
    oneLine: "Beautiful UIs get users. Deep chains keep them.",
    description:
      "Law III of the Supply Chain of Intelligence: a beautiful UI attracts users, but durable companies own deeper layers of the AI chain. Surface without depth is a graveyard.",
    paragraphs: [
      "The third law is the most counterintuitive of the three, because it appears to contradict everything modern product culture has taught for the last decade. A beautiful UI may get users. It will not, on its own, keep them. The surface captures attention — fast, measurable, satisfying to ship. The chain captures power — slow, invisible to most users, and the only thing that actually compounds over the next decade.",
      "Consider two products in the same category. Gamma generates presentations from a prompt. So does Replit's agent, in a different domain. Both look superficially similar: prompt in, structured artifact out, polished UI in the middle. Gamma owns L7 — the surface — and a thin L5 templating layer. The rest is rented. Replit owns L4 (the hosting and distribution), L5 (the agent that writes the code), L6 (the orchestration between editor, runtime, and deployment), and L8 (the memory of every project the user has ever built). Same prompt-to-output pattern. Different fates. The surface is identical. The chain is not.",
      "**This is why feature parity is a lie.** Two products can look identical on the surface and have radically different futures, because what determines the future is not what the user sees. It is what sits underneath the user's view: which layers the product actually owns, which it rents, and how much friction would be required to leave. The user does not perceive the chain. The user perceives the surface. But the user's decision to stay, year over year, is governed by the chain.",
      "There is a reason surface-only products dominate early product metrics. Surface is cheap to build, fast to iterate, easy to demo, and immediately legible to investors. Chain is expensive to build, slow to compound, invisible in screenshots, and hard to pitch. A founder choosing where to invest a Series A is constantly tempted to invest in the surface because the surface produces visible momentum. The chain produces durability that does not show up for two years.",
      "**The market eventually reprices this.** Jasper's $1.5B mark in 2022 was a market paying for the surface. Jasper's $300M reality in 2024 was the market correcting once it could see what the surface was actually sitting on (nothing). Chegg's $12B peak was the market paying for a surface that, in retrospect, owned no defensible chain. Stack Overflow's traffic collapse was a community-owned surface that had never converted its corpus into an owned chain. Every one of these stories is the market discovering, with a delay, that surface and chain had been priced as if they were the same thing. They are not.",
      "Notice the symmetric error on the other side. Plenty of companies own real chain depth and never invest in surface — the data is great, the integrations are deep, the workflow is embedded, but the product is ugly, slow, and confusing. These companies do not collapse. They stagnate. They become the kind of vendor every customer renews and nobody loves. That is also a real failure mode, just a slower one. Law III is not 'ignore the surface.' Law III is 'do not confuse the surface for the company.'",
      "**The practical test:** for every product decision, ask which layer you are reinforcing. A new animation reinforces L7. A new template reinforces a thin L5. A new integration that captures usage data into a structured form your competitors cannot access reinforces L1c and L8. A new compliance certification reinforces L3. A new system-of-record write-back reinforces L4. These are not equivalent investments. They look equivalent on a roadmap. They are not equivalent in the market.",
      "The companies that will be cited as winners ten years from now are not the ones with the most polished prompt UI in 2026. They are the ones who used the prompt UI to acquire attention and then quietly built the chain underneath it — proprietary data the model layer cannot reach, workflows the user cannot leave, memory that compounds with every session, gates the platform cannot legally cross. Surface to acquire. Chain to retain. Both, or neither.",
      "Law III, stated as a prediction: the surface captures attention this quarter; the chain captures power this decade. Anything you ship today that does not deepen at least one layer below the surface is, by definition, a quarter of attention you cannot compound. That is fine, in moderation. As a strategy, it is a graveyard.",
    ],
  },
];

export const LAW_ESSAY_BY_SLUG = Object.fromEntries(LAW_ESSAYS.map((e) => [e.slug, e]));
export const LAW_ESSAY_BY_NUM = Object.fromEntries(LAW_ESSAYS.map((e) => [e.num, e]));
