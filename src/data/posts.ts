// Posted — long-form essays already posted to LinkedIn / X / external channels.
// Lives in the footer (not top nav). Each post is a full essay archived on the
// site as the canonical version, so cross-posts can link back here.

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string; // ISO date
  channel: string; // where it was originally posted
  channelUrl?: string;
  readingMinutes: number;
  /** The post body. Each paragraph is a string; supports a small set of
   *  inline markers handled in PostDetail: **bold**, _italic_, and lines
   *  starting with "## " render as H2. Use "---" for a section break.
   *  Use ">>" prefix to render a callout/pullquote block. */
  body: string[];
  /** Optional image references shown above the fold. */
  heroPoster?: "hero" | "above-below" | "agent-decoder" | "compression" | "framework-compare-hero" | "software-for-one";
};

export const POSTS: Post[] = [
  {
    slug: "why-workflows-and-distribution-are-not-new-layers",
    title: "Why Workflows and Distribution Are Not New Layers in SCoI.",
    subtitle:
      "Every few weeks someone proposes an L9 Workflows or an L10 Distribution sitting above Memory. The Supply Chain of Intelligence™ (SCoI) already absorbs both — and the reason it doesn't add them is the same reason the framework works at all.",
    excerpt:
      "The 10-layer stack stops at Memory on purpose. Workflows are not a layer above L8 — they're L6 Orchestration plus L5d Operating Playbooks doing their job. Distribution is not a layer above L7 — it's a horizontal force already split across L3e, L7, and two of the Three Currents. Adding either as a new floor breaks the stack logic. Here's the decode.",
    publishedAt: "2026-06-17",
    channel: "LinkedIn",
    channelUrl: "https://www.linkedin.com/in/anandarivu",
    readingMinutes: 7,
    body: [
      ">> “Shouldn't there be an L9 for workflows? And an L10 for distribution?”",
      "It's the single most common framework question I get, and it's a good one. Both concepts are real. Both matter. Both already exist inside the Supply Chain of Intelligence™ (SCoI) — just not as new floors stacked on top of Memory. This post is the explicit decode, because the answer is more interesting than “no.”",
      "The short version: **SCoI is not a linear path from raw resources to a product surface.** It's a vertical stack of intelligence layers crossed by horizontal forces. Workflows and Distribution are real, but they don't live on the vertical axis. Treating them as L9 and L10 collapses the framework's most important property — the boundary between intelligence and business.",

      "## What the 10 layers actually are",

      "Before answering where Workflows and Distribution go, it's worth restating what the stack _is_, because the question usually assumes the stack is a value chain. It isn't.",
      "**SCoI traces intelligence from raw resources to compounding memory.** L-1 Geopolitics. L0 Infrastructure. L1 Data. L2 Models. L3 Gatekeeping. L4 Access. L5 Execution. L6 Orchestration. L7 Surface. L8 Memory. That's the spine. Each layer is a distinct kind of intelligence work — not a distinct business activity. The stack ends at Memory because Memory is the highest-order form of intelligence the system can produce on its own. Anything above Memory is no longer intelligence work. It's commercial work _on top of_ intelligence.",
      ">> The stack ends at Memory by design. Everything below is infrastructure. Everything above is business strategy. The boundary is the framework's main load-bearing wall.",
      "Once you see the boundary, the question changes shape. Workflows and Distribution are not absent from SCoI. They are deliberately placed _where they actually act_ — and that turns out not to be a new floor on top.",

      "## Workflows: already L6 Orchestration + L5d Operating Playbooks",

      "“Workflows” as people typically mean it — multi-app processes, automation pipelines, multi-step agent behavior across tools — is a textbook description of what **L6 Orchestration** does. Specifically:",
      "**L6a Agent Loops** — the actual run-loop that takes a goal, plans steps, calls tools, observes results, and decides what's next. That _is_ a workflow engine. It's just generalized.",
      "**L6c Role Routing & Task Decomposition** — splitting a job across specialized callers (a planner, a coder, a verifier, a summarizer). That's the multi-step part of a workflow.",
      "**L6d Context Management** — carrying state across tools, sessions, and handoffs. That's the “pipeline” part — what makes step 7 know what happened in step 2.",
      "Pair that with **L5d Operating Playbooks** at the Execution layer — the codified, repeatable patterns of _how this kind of work gets done in this domain_ — and you have exactly what classical workflow products (Zapier, n8n, Make, Workato, even Power Automate) ship, plus the agentic version on top.",
      "Calling this a new L9 would be like adding a layer above Models called “inference” — it's not a new layer, it's the work the existing layer was defined to do. If anything, the move is the opposite: when workflows feel under-weighted, **promote a sublayer**, don't invent a floor. The vocabulary already exists.",

      "## Distribution: a horizontal force, not a vertical layer",

      "Distribution is the harder one, because the temptation to make it L10 is real. Every product person has felt it. “Without distribution none of this matters, therefore distribution must be a layer.” The first half is true. The second half doesn't follow.",
      "Distribution in SCoI is _already_ split across the framework, in four different places, and each placement is doing specific work:",
      "**L3e Distribution Gates** — app stores, model marketplaces, browser defaults, OS-level agent slots, enterprise procurement gates. The _gatekeeping_ of distribution. This is where Apple, Google, Microsoft, AWS Marketplace, and Salesforce AppExchange actually live in the framework. It's a sublayer of Gatekeeping for a reason: distribution at this level is _permission_, not channel.",
      "**L7 Surface** — the product surface itself is the distribution endpoint for the user. A great L7 _is_ a distribution advantage. ChatGPT's surface is its distribution. Cursor's surface is its distribution. Distribution and Surface aren't separable at the product level.",
      "**Current I — Demand Gravity** — the horizontal force pulling users toward whichever surface is sticky enough to become the default. Demand Gravity _is_ distribution viewed from the user side. It cuts across every layer; it doesn't sit on top of any of them.",
      "**Current II — Attention Economics** — the horizontal force determining what content, what surface, what agent gets reach. Attention Economics _is_ distribution viewed from the channel side. Also horizontal. Also cross-cutting.",
      "Four placements, each with a job. None of them require a 10th-floor “Distribution” layer to be coherent. The framework already pays distribution the respect it deserves — by refusing to flatten it into a single vertical slot.",
      ">> Distribution isn't missing from SCoI. It's everywhere in SCoI — which is exactly why it can't be a single layer.",

      "## Why “not linear” is the whole point",

      "The instinct to add L9 and L10 comes from a hidden assumption: that SCoI is a linear value chain, like a manufacturing line, where raw material enters on the left and a packaged product leaves on the right. If that were true, then yes — Workflows and Distribution would be the natural next stations after Memory.",
      "But SCoI was never linear. The structure is a **vertical stack crossed by horizontal forces**, with **four structural laws** governing how value moves and **three currents** sweeping across all layers at once. The shape on the page is a stack because intelligence has a substrate-to-surface direction — you can't have L5 Execution without L2 Models, you can't have L2 Models without L1 Data, and so on. But the _business_ around the stack is not stacked. It threads through it.",
      "That's why **Geopolitics is L-1 _and_ shows up again at L3**. Why **Capital Flows is Current III**, not a layer. Why **agents** aren't a layer at all — they're a packaging of L5+L7(+L8). The framework's whole point is that real-world phenomena rarely sit on exactly one floor. The discipline is in placing each phenomenon where it _acts_, not where it _feels visible_.",
      "Workflows feel like a layer because we shipped workflow products for twenty years. Distribution feels like a layer because GTM teams own a P&L. Neither feeling is wrong — but neither is structural. Inside SCoI, both are already accounted for, in the places they actually exert force.",

      "## What this means in practice",

      "**If you're an operator:** when a vendor pitches you a “workflow layer” or a “distribution layer,” decode it. A workflow product is L6 Orchestration plus L5d Playbooks — judge it on L6a loop quality, L6c routing, L6d context, and L5d domain depth. A distribution play is L3e gatekeeping, L7 surface, or one of the Currents — judge it on which one, because the moats are completely different.",
      "**If you're a builder:** don't ship a “workflow layer” company. Ship an L6 Orchestration company with a clear L5d playbook, or a vertical L5 Execution company that uses L6 well. Don't ship a “distribution layer” company. Ship an L7 Surface, an L3e Gate, or a Demand Gravity / Attention Economics play — and be honest about which one.",
      "**If you're an investor:** any deck that proposes a new top-of-stack layer above L8 Memory is usually re-naming L6 or L7 to look more defensible. The defensibility test is **Law II (Value Accrues at Bottlenecks)** — does this thing aggregate flow that nothing else can route around? Workflows don't, on their own. Distribution does, but only at L3e and the Currents, not as a generic “layer.”",

      "## The 10-layer count is doing work",

      "Last point, the meta one. The 10-layer number is now part of the framework's identity — “the 10 layers of the generative AI stack.” Diluting it by adding L9 and L10 every time a new product category gets hot would turn SCoI from a structural framework into a feature list. The reason the framework is useful is precisely that it _refuses_ to grow a new layer for every trend.",
      "Memory is the ceiling. Geopolitics is the floor. Between them, ten layers of intelligence work. Around them, three currents and four laws. That's the whole map. Workflows and Distribution don't get new floors — they get correctly placed inside the map that already exists.",
      "Not linear. Not flat. Stacked plus crossed. That's the design.",

      "---",

      "The full framework — 10 layers, 50 sublayers, 4 structural laws, 3 currents, 6 archetypes — is free at **supplychainofai.com**. No signup, no paywall.",
      "— Anand Arivukkarasu",
    ],
  },
  {
    slug: "software-for-one-still-rides-shared-rails",
    title: "The Next Wave of Software Will Be Built for One. It Will Still Ride Shared Rails.",
    subtitle:
      "Personal agents are the new surface. Stripe, Cloudflare, and the L2 providers are still the substrate. The Supply Chain of Intelligence™ (SCoI) explains why both halves of that sentence have to be true at once.",
    excerpt:
      "Every personal agent — one user, one context, one memory — still terminates at someone else's payment rail, someone else's edge, someone else's model. That's not a contradiction. It's Law II: value accrues at bottlenecks, and the bottlenecks for a million single-user agents are exactly the layers that aggregate across all of them.",
    publishedAt: "2026-06-17",
    channel: "LinkedIn",
    channelUrl: "https://www.linkedin.com/in/anandarivu",
    readingMinutes: 6,
    heroPoster: "above-below",
    body: [
      ">> “The next wave of software won't be built for millions of users. It'll be built for one.”",
      "It's a good line, and the directional read is right. The cost of producing a working piece of software is collapsing toward zero. A personal agent that knows your calendar, your inbox, your contracts, your spend, and your taste is now buildable for an audience of one. That was a fantasy in 2022. It's a weekend project in 2026.",
      "But the line is only half the story. The half that gets repeated on LinkedIn is the romantic half — software for one, agents per person, the end of the SaaS seat. The half that gets skipped is the structural half: **every one of those single-user agents still terminates at someone else's rails.** Stripe takes the payment. Cloudflare serves the edge. An L2 provider answers the prompt. A compliance vendor signs off on the audit trail.",
      "Both sentences are true at the same time. The framework is the only thing that makes them stop sounding like a contradiction.",
 
      "## What “software for one” actually is, in framework terms",
 
      "“An agent built for one user” is a packaging story. Decoded into the Supply Chain of Intelligence™ (SCoI), it's a specific stack:",
      "**L7 Surface** — personal, often ambient or async. Not a SaaS dashboard. A chat thread, a voice loop, an inbox listener, a home-screen tile. **L7a** and **L7e** carry most of these.",
      "**L8 Memory** — the part that makes “for one” meaningful. **L8a** session memory, **L8b** entity profile (you), and over time **L8d** institutional knowledge of your life. Without L8, the agent is just a prompt with your name in it.",
      "**L5 Execution** — the actual work: book the thing, draft the reply, reconcile the spend, prep the meeting. **L5a** tool use, **L5d** an operating playbook for _your_ patterns. This is where the agent earns its keep.",
      "**L6 Orchestration** — the loop that ties it together. **L6a** agent loops, **L6d** context management across your tools.",
      "**L1b Proprietary Data** — but proprietary _to you_. Your email, your files, your transactions. The smallest possible corpus, the most personal possible moat.",
      "That's the whole “software for one” package: a tight L5+L6+L7+L8 bundle sitting on a personal L1b. It's real, and it's new, and the SCoI framework already has names for every piece of it. No new layer is required.",
 
      "## What it cannot build itself — and why that's permanent",
 
      "Here is the part the romantic version skips. A personal agent does not — cannot — vertically integrate the stack underneath it. The layers below L5 are shared rails by construction.",
      "**L0 Infrastructure.** Your agent runs on someone's GPUs and someone's edge. Cloudflare, AWS, CoreWeave, Vercel, Fly. You are not buying a data center for one user.",
      "**L2 Models.** Your agent calls a frontier model, an open-source model, or a routed mix. You are not training a foundation model for one user either. Even fine-tunes ride on a shared base.",
      "**L3 Gatekeeping.** When the agent moves money, signs a contract, files a return, or touches health data, someone has to verify. Vanta-style audit. KYC providers. Notary equivalents. **Law IV (Generation and Verification Must Be Separate)** says this gate is non-absorbable — your single-user agent does not get to mark its own homework.",
      "**L4 Access.** The pipes. Stripe for payments and **L4c agent commerce**. Plaid for bank rails. Twilio for messaging. OAuth providers for identity. MCP-style connectors for tool access. The agent rides L4 — it does not become L4.",
      ">> A personal agent is a vertical stack at L5–L8. The layers below it are horizontal by physics, not by choice.",
      "This is **Law II — Value Accrues at Bottlenecks**, viewed from the other side. The bottlenecks for a billion single-user agents are exactly the layers that aggregate _across_ those agents. Stripe doesn't care that your agent is bespoke. It cares that it's one of fifty million bespoke agents all needing to charge a card. That's the entire business.",
 
      "## The two defensibility trades, side by side",
 
      "Once you can hold both halves in your head, the strategic picture clarifies. There are two distinct defensibility games being played at the same time, and they don't compete — they need each other.",
      "**Top of the stack (L5–L8) wins by going narrower.** One user, one workflow, one corpus, one memory. The moat is depth of context, not breadth of users. **L1b proprietary data** for an audience of one is still **L1b**. **L8 memory** that compounds across one person's life is still a compounding moat — arguably the most defensible kind, because no platform can rip it out without breaking the user's continuity.",
      "**Bottom of the stack (L0, L2, L3, L4) wins by going wider.** One payment rail for every agent. One edge network for every agent. One compliance gate for every agent. The moat is aggregation across millions of personal stacks that each look nothing like the others. The personalization above is what _drives demand_ for the standardization below.",
      "This is the same shape we've seen before — App Store + payments + CDN under a million indie apps; Shopify + Stripe + Klaviyo under a million indie brands. Personal agents are the next iteration of the same pattern, with **L8 Memory** added to the moat list. The romance is on top; the rent is on the bottom.",
 
      "[[poster:above-below]]",
 
      "## What this means if you're building",
 
      "**If you're building the agent (L5–L8):** stop trying to also be the rail. Pick the deepest possible **L1b** corpus you can ethically reach for that one user, build **L8** memory that survives model swaps, and treat L0/L2/L3/L4 as a menu. **Law I (Intelligence Commoditizes Downward)** is your friend here — the cheaper the substrate gets, the more surplus there is to capture at the personal layer.",
      "**If you're building the rail (L0/L3/L4):** the unit you're serving is no longer the company. It's the agent. Pricing, SDKs, identity, audit, error handling — all of it has to assume a non-human caller acting on behalf of a single human principal. The winners at L4c (agent commerce) will be the providers who figure this out first. Stripe is already iterating on it in public. Watch that line of work.",
      "**If you're investing:** be suspicious of any pitch that claims to own both halves. A personal-agent company that also wants to be the payment rail is fighting Stripe with a thousand-user TAM. A rail provider that also wants to ship the personal agent is fighting the long tail of indie builders. The framework predicts both of those collapse back to their natural layer. Pick a side.",
 
      "## The bigger pattern",
 
      "“Software for one” is not the end of platforms. It's the moment platforms finally get to charge for what they were always going to charge for — the boring, load-bearing layers nobody wants to rebuild. The romance moves up to L7 and L8. The economics stay at L0, L3, and L4.",
      "If anything, the personal-agent era makes the shared rails _more_ valuable, not less. A million bespoke agents need a million more API calls, a million more payment intents, a million more audit logs, a million more edge requests. The substrate eats well in this scenario. It just doesn't get the headline.",
      "Hold both halves at once. That's the whole trick.",
 
      "---",
 
      "The full framework — 10 layers, 50 sublayers, 4 structural laws — is free at **supplychainofai.com**. No signup, no paywall.",
      "— Anand Arivukkarasu",
    ],
  },
  {
    slug: "model-routing-is-an-l2d-story",
    title: "Model Routing Is an L2d Story — and a Law I Receipt.",
    subtitle:
      "When applied-AI leaders talk about routing between models, they're not describing a new layer. They're describing intelligence commoditizing downward in real time — and naming who captures the surplus.",
    excerpt:
      "Cost optimization, capability maximization, risk mitigation. Three reasons everyone is suddenly talking about model routing. All three resolve to one sublayer (L2d) and one law (Intelligence Commoditizes Downward). Here's the decode, and why the value doesn't actually accrue to the router.",
    publishedAt: "2026-06-17",
    channel: "LinkedIn",
    channelUrl: "https://www.linkedin.com/in/anandarivu",
    readingMinutes: 6,
    heroPoster: "compression",
    body: [
      "A line I keep hearing in operator and investor conversations right now:",
      ">> “Over the coming weeks and months you're going to hear a lot more about model routing. This is one of the biggest plays for the applied AI layer.”",
      "The framing is right. The layer attribution is usually wrong. Most people are calling routing a new category. Structurally, it isn't. It's a single sublayer of L2 — **L2d Model Routing & Composition** — getting pulled into the spotlight because the layer above it (L5 Execution) finally has a reason to use it at scale.",
      "Worth decoding properly, because the difference between “routing is a category” and “routing is a sublayer that benefits L5” changes who you'd back, who you'd build, and which roadmap items you'd cut.",

      "## The three reasons, mapped to the framework",

      "The argument for routing usually shows up as three bullets. Each one lands cleanly on the stack.",
      "**1. Cost optimization.** Frontier intelligence for planning and review, cheaper or open-source models for the bulk of the workload. This is pure **L2d Model Routing & Composition** — the sublayer was literally defined for this. It's also the most visible signal of **Law I (Intelligence Commoditizes Downward)** in action: once you can swap a frontier call for an OSS call mid-workflow without quality loss, the frontier model has been commoditized for that step. Not someday. That step, that workload, today.",
      "**2. Capability maximization.** Different models are better at tool use, coding, or domain knowledge. Route accordingly. Still **L2d** as the capability — but the _decision_ of which model to call for which step is made at runtime by **L6a Agent Loops** and **L6c Role Routing & Task Decomposition**. This is the L2↔L6 seam, and it's why standalone “router” startups keep getting absorbed into orchestration frameworks. The capability lives at L2d; the caller lives at L6.",
      "**3. Risk mitigation.** If a government restricts a model or a provider has a Fable-style incident, you want to swap providers without rebuilding the workflow. That's **L3a Compliance & Export Controls** treating routing as a compliance primitive, not just a cost lever. Once routing is load-bearing for compliance, it stops being optional infrastructure — and L3's grip on the stack tightens by one more notch (consistent with **Law IV — Generation and Verification Must Be Separate**).",
      "Three reasons, three layers touched: **L2d** (the capability), **L6a/L6c** (the runtime that uses it), **L3a** (the compliance reason it becomes mandatory). One framework, no new vocabulary required.",

      "## Who actually captures the value",

      "Here's where the popular framing gets the conclusion right for the wrong reason.",
      "The claim is that routing shifts value to “the applied AI layer.” Correct. In framework language: **L5 Execution** captures the surplus. But not because L5 owns routing. Because L5 finally gets to treat L2 as a swappable commodity — which is the textbook definition of **Law I**.",
      ">> When a layer becomes commoditized downward, the layer above it captures the surplus. Routing is the mechanism. L5 is the beneficiary.",
      "This is the same pattern that played out with databases under SaaS, with compute under SaaS, and with CDNs under media companies. The layer that commoditizes doesn't capture the value it releases — the layer above does. Routing is L2 telling on itself.",
      "Which means the interesting question isn't “who builds the best router.” It's “which L5 companies are positioned to harvest the L2 surplus when routing is free.” Two answers stand out:",
      "**L5 companies with L1b Proprietary Data.** If your moat is data the model can't get elsewhere, the choice of model becomes irrelevant — you win on inputs, not on inference. Harvey, Bloomberg-style verticals, anything with regulated corpus access.",
      "**L5 companies with L8 Memory that compounds.** If the system remembers the user, the workflow, and the institution across sessions, swapping the underlying L2 is a config change. The moat is in L8, not in which model answered the last call. This is **Law III (Surface Captures Attention; Chain Captures Power)** read forward.",

      "## Where routing as a _product_ gets compressed",

      "Standalone routing products are in a familiar spot. The capability is real. The defensibility isn't.",
      "L2 providers will ship routing themselves (OpenAI's model picker, Anthropic's tier selection, Bedrock-style multi-model endpoints) — that's L2d absorbing the function back into L2. Orchestration frameworks (LangChain, CrewAI, the agent stacks) will ship routing as a built-in primitive — that's L6 absorbing it upward. Both directions of compression. Same logic as every other middleware story in the last two cycles.",
      "The companies that survive at L2d will be the ones that turn routing into something neither L2 nor L6 can easily replicate: cross-provider evals tied to **L3b Quality Gates**, enterprise audit trails tied to **L3a**, or workload-specific routing policies tied to a vertical's compliance regime. In other words — L2d only survives by anchoring into L3. Pure routing is a feature.",

      "## What to do with this",

      "If you're a **product leader at an L5 company**: routing is good news for you. It means the cost and capability ceiling above you is about to drop. Spend the surplus on L1b (proprietary data) and L8 (memory). Do not spend it on building your own router — that's the layer commoditizing.",
      "If you're an **investor**: when you see a pitch deck for a routing company, ask one question — what L3 surface are they anchored to? No answer means they're a feature waiting to be absorbed. A real answer (audit, compliance, eval governance) means they may have a wedge.",
      "If you're a **founder building at L2d**: the capability is necessary. Necessary capabilities without anchors get absorbed. Pick your anchor early.",

      "[[poster:four-laws]]",

      "## The bigger pattern",

      "Model routing isn't the story. It's a symptom. The story is that L2 is becoming the layer everyone routes _through_ rather than the layer everyone builds _on top of_. That's what commoditization looks like from the inside — and it's exactly what the framework predicts.",
      "Watch for the same pattern at L7 over the next twelve months. Surface routing — picking between ChatGPT, Gemini, Copilot, and Claude for the same task — will follow the same arc. Same law. Different layer.",

      "---",

      "The full framework — 10 layers, 50 sublayers, 4 structural laws — is free at **supplychainofai.com**. No signup, no paywall.",
      "— Anand Arivukkarasu",
    ],
  },
  {
    slug: "five-ai-frameworks-every-product-leader-should-know",
    title: "Five AI Frameworks Every Product Leader & Investor Should Know in 2026.",
    subtitle:
      "An honest, side-by-side look at the five frameworks I see actually used in AI strategy rooms — and which question each one was built to answer.",
    excerpt:
      "JTBD, Wardley Mapping, Aggregation Theory, AI TRiSM, and the Supply Chain of Intelligence™. Five frameworks, five different lenses — user, evolution, distribution, risk, and the stack itself. Here's where each one wins, where each one breaks, and how to use them together.",
    publishedAt: "2026-06-16",
    channel: "LinkedIn",
    channelUrl: "https://www.linkedin.com/in/anandarivu",
    readingMinutes: 9,
    heroPoster: "framework-compare-hero",
    body: [
      "Every few weeks somebody asks me the same question. _“If I only had time to learn a handful of frameworks for AI strategy, which ones would you actually use?”_",
      "I've been keeping a short list. After eighteen months of board meetings, product reviews, and diligence calls, five frameworks keep showing up in the room. The other forty get cited in decks and then quietly ignored.",
      "Here's the honest version. No framework is the winner of every question — each one was built for a different aperture. The mistake is treating any of them as universal. The discipline is knowing which lens to pick up when.",

      "## The five, and the lens each one uses",

      "**1. Jobs to be Done (JTBD).** Christensen and Ulwick, 1990s. The _user / outcome_ lens. The question it answers best: **why does the customer hire this product?** JTBD is unmatched for early discovery, positioning, and pricing — it forces you to describe the user's progress, not your feature list. It is silent on technology, distribution, and defensibility.",
      "**2. Wardley Mapping.** Simon Wardley, 2005. The _evolution / strategy_ lens. The question it answers best: **as this technology evolves from custom to commodity, where should we play and where should we partner?** Wardley is the right map when components are migrating across the genesis → custom → product → commodity axis (which is exactly what model layers are doing right now). It is heavy machinery and most teams use a sketchy version.",
      "**3. Aggregation Theory.** Ben Thompson, 2015. The _demand / distribution_ lens. The question it answers best: **on the internet, who owns the user relationship and aggregates demand?** It explained Google, Facebook, Netflix, and Uber better than anything else. In the AI era, it explains why ChatGPT and Perplexity are dangerous to vertical apps — distribution is collapsing again, and aggregation is the structural reason.",
      "**4. AI TRiSM (Trust, Risk & Security Management).** Gartner, 2023. The _risk / governance_ lens. The question it answers best: **what are the trust, safety, compliance, and explainability gates we have to clear?** It is the framework regulated buyers (healthcare, finance, government) actually live inside. It is also the framework most product teams discover too late, after a procurement review kills the deal.",
      "**5. The Supply Chain of Intelligence™ (SCOI).** What I've been building over the last year. The _stack & intelligence_ lens. The question it answers best: **which layer of the AI stack do we actually own, and what will compress us when the platforms ship the same feature for free?** 10 layers, 50 sublayers, 4 structural laws. Built specifically for the generative-AI era — the others were not.",

      "[[poster:framework-coverage]]",

      "## Where each one genuinely wins",

      "Let me say the part most framework posts skip: **the other four frameworks are not weaker than mine. They were built for different questions.**",
      "If you ask JTBD which AI layer you own, it will shrug — that was never its job. If you ask SCOI why a single customer hires your product, it will gesture at L7 and L8 but it won't replace a real outcome interview. They live at different altitudes.",
      ">> Frameworks don't compete. Lenses do. Use the lens that fits the question on the table.",
      "**JTBD wins** when you are pre-PMF, repricing, or repositioning. Nothing else surfaces the actual progress the user is trying to make.",
      "**Wardley wins** when you are deciding build-vs-buy on a fast-evolving component. In 2026, that is almost everything underneath your product — fine-tuning, vector stores, agent orchestration, eval harnesses. Map them. Most of them are evolving toward commodity faster than your roadmap assumes.",
      "**Aggregation Theory wins** when you are explaining to your board why ChatGPT is a strategic threat even though it doesn't directly compete with you. Demand aggregation is the mechanism. Distribution is the wound.",
      "**AI TRiSM wins** when you are selling into regulated buyers, or when the auditor is in the room. Everything else is irrelevant if you can't pass the trust gate.",
      "**SCOI wins** when the strategic question is structural: which layer do we own, which layer is rented, which layer compresses next, which layer compounds? That's the question I kept seeing go unanswered, which is why I built it.",

      "## Where each one breaks",

      "**JTBD breaks** the moment the platform layer shifts under you. Knowing _why_ a user hires your assistant doesn't help if OpenAI ships the same assistant for free next quarter. JTBD has no theory of the supplier stack.",
      "**Wardley breaks** at scale and in mixed audiences. It is a beautiful tool for strategists. It is a hard sell in a 40-slide board deck. And most teams draw their map once and never update it.",
      "**Aggregation Theory breaks** when the moat is _inside_ the workflow rather than at the demand layer. It explains B2C and ad-funded businesses beautifully. It struggles with deep B2B systems where buyer and user are different and distribution is enterprise sales, not a search box.",
      "**AI TRiSM breaks** at strategy. It tells you how to not get fired by the CISO. It does not tell you which layer of the stack to own or where the moat compounds. It's a hygiene framework, not a growth framework.",
      "**SCOI breaks** at the individual user interview. It is a stack-level instrument. If you need to understand _one_ customer's job-to-be-done, pick up JTBD instead. SCOI tells you which layers compound; JTBD tells you what to build inside those layers.",

      "## The real value: stacking the lenses",

      "The teams I see making the best AI strategy calls don't pick one framework. They stack them in a specific order:",
      "_First,_ **JTBD** — to make sure you are building something a real user actually hires. Without this, everything else is theater.",
      "_Then,_ **SCOI** — to locate that product on the stack. Which of the 10 layers are you actually competing on? L7 only? L5+L7+L8? Be honest about which layers are yours and which are rented from the platform.",
      "_Then,_ **Wardley** — for the components inside your chosen layers. Are they evolving toward commodity? Should you build them, buy them, or wait?",
      "_Then,_ **Aggregation Theory** — to assess distribution risk. Is a horizontal aggregator (ChatGPT, Gemini, Perplexity) about to intermediate your customer relationship?",
      "_Then,_ **AI TRiSM** — to clear the trust gate before procurement kills the deal.",
      "Five lenses, one decision. That's how strategy actually gets made in serious AI companies in 2026.",

      "[[poster:four-laws]]",

      "## Why SCOI exists at all",

      "Honest disclosure: I would not have built SCOI if any of the other four answered the question I kept getting asked.",
      "The question was always some version of: _“We have a product. The platform layer is moving fast. Which parts of what we built will still matter in two years, and which parts will be absorbed?”_",
      "JTBD couldn't answer it. Wardley got close but stayed at the component level. Aggregation explained the demand-side threat but not the supply-side compression. TRiSM was orthogonal. So I started mapping the stack itself — 10 layers from data and compute up through interfaces and memory, 50 sublayers underneath, and the four structural laws that explain which layers compound and which get compressed.",
      ">> Intelligence commoditizes downward. Value accrues at bottlenecks. Surface captures attention; chain captures power. Memory is the final moat.",
      "Those laws are the part that didn't exist before. They're SCOI's contribution to the conversation. Everything else — the 10 layers, the sublayers, the archetypes — is scaffolding that lets you apply the laws to a specific company.",

      "## What to do with this post",

      "If you are a product leader, screenshot the coverage matrix above and use it as a checklist in your next roadmap review. Which questions has your team actually answered? Which ones are you guessing at?",
      "If you are an investor, use the same matrix as a diligence framework. Most pitches answer JTBD beautifully and ignore the other four lenses entirely. That's a tell.",
      "If you are a founder, pick the framework that addresses the question you are currently failing at — not the one that flatters the work you've already done.",

      "---",

      "The full Supply Chain of Intelligence™ framework — 10 layers, 50 sublayers, 4 structural laws, the Intelligence Cube, case studies, and downloadable posters — is free at **supplychainofai.com**. No signup. No paywall. Take what is useful.",
      "If you use a framework I missed and think it deserves to be on this list, tell me on LinkedIn. I'll add it to the next version.",
      "— Anand Arivukkarasu",
    ],
  },
  {
    slug: "why-every-ai-product-leader-needs-a-map",
    title: "Why Every AI Product Leader Needs a Map of the AI Stack.",
    subtitle:
      "“Just a wrapper” became the lazy verdict of the last two years. The companies that survived weren't the ones with better demos — they owned a deeper layer of the chain.",
    excerpt:
      "Over the last year I kept hearing the same phrase in every AI conversation: \"just a wrapper.\" Sometimes it was right. Often it was lazy. The market had vocabulary for product-market fit, but not for structural position in the AI era. So I built one.",
    publishedAt: "2026-05-21",
    channel: "LinkedIn",
    channelUrl: "https://www.linkedin.com/in/anandarivu",
    readingMinutes: 8,
    heroPoster: "hero",
    body: [
      "Over the last year, I kept hearing the same phrase in AI conversations:",
      ">> “Just a wrapper.”",
      "Sometimes it came from investors. Sometimes from operators. Sometimes from founders themselves.",
      "A startup would demo something impressive. People would get excited for a few minutes. Then someone would eventually say: _“Yeah… but OpenAI or Anthropic will probably ship this.”_ Conversation over.",
      "And honestly, sometimes that assessment was correct. Some products really were thin surfaces sitting directly on top of foundation models with very little defensibility underneath.",
      "But what bothered me was that the conversation itself felt shallow. Because occasionally I would look deeper at one of those companies and realize — they actually did have an edge. Not always an obvious one. Sometimes they did not even understand it themselves yet.",
      "Some had workflow gravity. Some had access advantages. Some had embedded distribution. Some had proprietary behavioral data. Some had orchestration hidden underneath the UI. Some had memory accumulating quietly beneath the surface.",
      "The market had vocabulary for **product-market fit**. But it did not yet have good vocabulary for **structural position in the AI era**.",

      "## Why a supply chain, of all things",

      "At some point, I stopped thinking about AI as “just software” and started thinking about it more like a supply chain. Oddly enough, the mental model that clarified it for me was gold.",
      "Before somebody wears a gold ring, there is an entire chain underneath it: mining, refining, transport, verification, crafting, distribution, retail, and eventually memory about the customer itself. The visible experience is only the final layer.",
      "That idea stayed in my head for months and eventually became part of why I called this framework **The Supply Chain of Intelligence™**. I'll write separately about the full analogy — it ended up being one of the clearest ways to explain how AI value actually moves through the stack.",

      "## The companies that compressed — and the ones that adapted",

      "I kept watching companies respond very differently to the rise of foundation models. Some compressed almost overnight. Others adapted surprisingly well.",
      "**Apollo** was one example that made me think deeply. At one point, Apollo had a broad set of workflow features: prospecting, messaging, outbound, CRM-like behaviors. But instead of trying to fight the model companies head-on, they increasingly leaned into becoming a trusted data and access layer for the AI ecosystem itself.",
      "The Claude partnership direction was especially interesting. Rather than forcing users into a giant standalone interface, Apollo became useful as structured business intelligence directly inside the AI workflow. They were not trying to out-model the model companies. They were positioning themselves where the models still needed them — where trust, permissions, freshness, enterprise relationships, and proprietary business data still mattered. That was not weakness. That was **structural positioning**.",
      "Then I looked at companies like **Sierra**. Everyone called them “agent companies.” But underneath the branding, they were clearly building orchestration, workflow control, enterprise integrations, runtime systems, access layers. The value was not just the conversational surface. The value was increasingly underneath it.",
      "Years earlier, **Jasper** exploded because the AI surface layer suddenly became valuable. Then ChatGPT arrived and compressed huge parts of that layer almost overnight. At the same time, **Grammarly** survived far better than many people expected. Why? Because Grammarly was never only a writing prompt wrapper. It already had integrations, embedded workflows, cross-surface presence, habitual usage, plugins, accumulated behavioral context, and distribution embedded deeply into the writing ecosystem itself.",

      "## Most AI discussions are at the wrong layer",

      "The more I observed these patterns, the more I realized something important: **most AI discussions were happening at the wrong layer of the stack.**",
      "People were talking about prompts, models, copilots, agents, interfaces. But the real strategic questions were deeper:",
      "_Which layer do you actually own? Which layer can compress you? Which layer compounds over time? Which layer is rented from somebody else? Which layer survives when the foundation model companies move upward?_",
      "That eventually became the foundation for what I now call **The Supply Chain of Intelligence™** — a framework that maps where AI value is created, captured, compressed, defended, and accumulated across the stack. **10 layers. 50 sublayers. 4 structural laws.**",

      "[[poster:four-laws]]",

      "## The four structural laws",

      "**Law I — Intelligence Commoditizes Downward.** Wrappers become features. Anything that exists only at the surface layer eventually gets compressed by the model layer beneath it. But that does not mean applications disappear — it means **structurally thin applications** disappear.",
      "**Law II — Value Accrues at Bottlenecks.** Durable value forms where scarcity exists, not where hype exists. Increasingly, the strongest moats sit around proprietary data, workflow ownership, trust, access, orchestration, compliance, and memory.",
      "**Law III — Surface Captures Attention; Chain Captures Power.** The AI industry massively over-focuses on visible intelligence — interfaces, generation quality, conversation UX, demos. The strongest companies often own deeper layers underneath: integrations, workflow systems, operational embedding, runtime orchestration, accumulated memory, behavioral context. The visible layer gets attention. The deeper chain retains leverage.",
      "**Law IV — Memory Is the Final Moat.** Most AI systems optimize for generation. But over time, defensibility increasingly comes from accumulation — what the system remembers about the user, the workflow, the organization, and the operating context. That changes how AI product leaders should think entirely.",
      ">> Not “what AI feature should we add next?” — but “what compounds if this system gets used continuously for five years?”",
      "That question changes roadmaps.",

      "## Decoding the vague words",

      "The framework also helped me realize how vague a lot of AI language had become. _AI-native. Agentic. Copilot. Assistant. Wrapper._ Those words often hide more than they explain.",

      "[[poster:agent-decoder]]",

      "Take the word **“agent.”** Most people talk about agents as if they are a category. Structurally, they are usually packaging across multiple layers: execution, orchestration, surface, and sometimes memory.",
      "Without execution, it is often just a chatbot. Without orchestration, it is a workflow script. Without memory, it is frequently a demo instead of a system. The framework forces a more structural conversation.",

      "## Same patterns across every vertical",

      "One of the most useful parts of building this has been applying it across industries: healthcare, finance, enterprise SaaS, legal, education, developer tools, infrastructure, vertical AI. Different verticals. Same structural patterns.",
      "The framework consistently exposes compression risk, dependency layers, hidden bottlenecks, moat locations, migration paths, and structural weaknesses. More importantly, it creates a **common language** — because vague language creates weak strategy.",
      "If teams only say “AI-native” or “agentic” without understanding the underlying layers, they miss the harder strategic questions: _Which layers do we actually own? Which layers are rented? What happens if the model layer ships this for free? Which parts compound? Which parts decay?_",

      "---",

      "That is why I built **The Supply Chain of Intelligence™.** Not as another AI buzzword framework — but as an attempt to create better structural language for how AI businesses actually evolve.",
      "My hope is that over time it becomes useful the same way JTBD became useful: not as something people admire, but as a language founders, PMs, and investors naturally think in.",
      "Because the next generation of AI winners probably will not be determined only by who generates intelligence best. It will be determined by **who structurally owns the deepest parts of the chain**.",
      "The full framework — 10 layers, 50 sublayers, the four laws, the case studies, the live market map, and the downloadable posters — is free at **supplychainofai.com**. No signup. Take what is useful. Cite it where it helps.",
      "— Anand Arivukkarasu",
    ],
  },
  {
    slug: "every-ai-conversation-is-at-the-wrong-layer",
    title: "Every AI conversation is happening at the wrong layer.",
    subtitle:
      "Why boards talk about models, founders pitch agents, and the part that actually compounds is two layers below — unowned and invisible on the roadmap.",
    excerpt:
      "Most AI companies live on one layer — the surface. That's the layer with the lowest moat and the highest churn. The defensible layers are below the waterline. Here's a map.",
    publishedAt: "2026-05-21",
    channel: "LinkedIn",
    channelUrl: "https://www.linkedin.com/in/anandarivu",
    readingMinutes: 6,
    heroPoster: "hero",
    body: [
      "Every AI strategy conversation I've sat in for the last eighteen months has been happening at the wrong layer of the stack.",

      "Boards ask about models. Founders pitch agents. Analysts count tokens. Meanwhile the actual value — the part that compounds, the part competitors can't copy, the part that survives the next model release — is sitting two layers below, unowned, undefended, and usually invisible on the roadmap.",

      "I spent the last year mapping why. The answer turned into a framework I'm calling **The Supply Chain of Intelligence™** — ten layers, fifty sublayers, and four structural laws that explain where AI value is created, where it gets captured, and where it gets erased.",

      "Here is the short version. The long version, with case studies and posters, is at supplychainofai.com.",

      "## Three things become obvious once you see the stack",

      "**One. Most \"AI companies\" live on one layer — L7, the surface.** That's the chat box, the autocomplete, the copilot panel, the polished prompt template. It's also the layer with the lowest moat and the highest churn. It's why Jasper, Chegg, and a dozen well-funded copilots got compressed inside eighteen months. The platforms shipped the same surface for free, and the surface had nothing underneath it to hold customers in place.",

      "**Two. The defensible layers are below the waterline.** L1 (proprietary data nobody else can license), L3 (trust gates — the regulatory, compliance, and editorial checkpoints buyers will not bypass), and L8 (memory that compounds with every user interaction). These layers don't demo well. They don't show up in keynotes. They win quietly, over years, while the surface layer churns every six months.",

      ">> Surfaces commoditize in weeks. Workflows survive in months. Substrate compounds in years.",

      "**Three. \"Agent\" is not a layer. It's marketing.** Every agent pitch decodes into L5 (workflow execution) plus L7 (surface), sometimes plus L8 (memory). The decoding usually reveals whether there is a moat or just a wrapper. If the only thing the agent owns is the prompt and the UI, the platform will ship the same agent for free next quarter. If the agent owns the workflow graph, the trust gate, and the memory that fits the user's instincts — that's a different company.",

      "## Why this matters right now",

      "We are in the part of the cycle where capital, talent, and attention are still flowing to the surface. Two thousand prompt-wrapper startups are still being funded as if the surface is the moat. It is not. The next eighteen months will resolve this structurally — through compression, absorption, and a long tail of acquihires for teams that ran out of runway before they could deepen the stack.",

      "If you are a product leader, the question isn't \"which model are we using.\" The question is: which layer do we actually own, and is anything underneath it ours?",

      "If you are a founder, the question isn't \"are we an agent company.\" The question is: when the platform ships the same agent for free, what is left of us?",

      "If you are an investor, the question isn't \"how good is the demo.\" The question is: how many layers does this thesis touch, and which of those layers compounds?",

      "## The four laws",

      "The framework rests on four structural laws — the physics, not the opinions:",

      "**Law I — Surface compresses.** Any value that lives only at L7 will be replicated by the platform underneath it within one to two model cycles.",

      "**Law II — Bottleneck wins.** The layer that is structurally scarce — proprietary data, regulated trust, user-shaped memory — captures disproportionate margin regardless of which model is fashionable that quarter.",

      "**Law III — Memory compounds.** L8 is the only layer where the system gets stronger the more it is used. Every other layer decays toward parity.",

      "**Law IV — Decode the agent.** Anything marketed as \"an agent\" must be decoded into the layers it actually touches before defensibility can be assessed. Agents are not a layer; they are a package.",

      "## What to do with this",

      "Three things, in order.",

      "First, find your own product on the stack. Be honest. Most products live higher than their teams believe. If you are at L7 only, you are renting your business from the platform.",

      "Second, ask which layer below you is structurally available. Sometimes it is L1 — a proprietary corpus nobody else can assemble. Sometimes it is L3 — a regulated relationship competitors cannot replicate. Sometimes it is L8 — a memory of the user that you have been collecting for years without naming it.",

      "Third, redirect the next two roadmap cycles toward owning that lower layer. Not features. Layers. Features get shipped by platforms. Layers do not.",

      "---",

      "The full framework — ten layers, fifty sublayers, the four laws, the case studies, the live market map, and the downloadable posters — is free at **supplychainofai.com**. No signup. Take what is useful. Cite it where it helps.",

      "Tell me which layer your product actually lives on. I'll tell you what eats it.",

      "— Anand",
    ],
  },
];

export const getPostBySlug = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug);
