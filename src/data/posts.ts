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
  heroPoster?: "hero" | "above-below" | "agent-decoder" | "compression" | "framework-compare-hero";
};

export const POSTS: Post[] = [
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
