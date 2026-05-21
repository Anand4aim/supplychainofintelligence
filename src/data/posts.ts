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
  heroPoster?: "hero" | "above-below" | "agent-decoder" | "compression";
};

export const POSTS: Post[] = [
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

      "## The companies that didn't get crushed",

      "I kept watching companies respond very differently to the rise of foundation models. Some got crushed almost instantly. Others adapted surprisingly well.",
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

      "**One. Most \"AI companies\" live on one layer — L7, the surface.** That's the chat box, the autocomplete, the copilot panel, the polished prompt template. It's also the layer with the lowest moat and the highest churn. It's why Jasper, Chegg, and a dozen well-funded copilots got eaten in eighteen months. The platforms shipped the same surface for free, and the surface had nothing underneath it to hold customers in place.",

      "**Two. The defensible layers are below the waterline.** L1 (proprietary data nobody else can license), L3 (trust gates — the regulatory, compliance, and editorial checkpoints buyers will not bypass), and L8 (memory that compounds with every user interaction). These layers don't demo well. They don't show up in keynotes. They win quietly, over years, while the surface layer churns every six months.",

      ">> Surfaces commoditize in weeks. Workflows survive in months. Substrate compounds in years.",

      "**Three. \"Agent\" is not a layer. It's marketing.** Every agent pitch decodes into L5 (workflow execution) plus L7 (surface), sometimes plus L8 (memory). The decoding usually reveals whether there is a moat or just a wrapper. If the only thing the agent owns is the prompt and the UI, the platform will ship the same agent for free next quarter. If the agent owns the workflow graph, the trust gate, and the memory that fits the user's instincts — that's a different company.",

      "## Why this matters right now",

      "We are in the part of the cycle where capital, talent, and attention are still flowing to the surface. Two thousand prompt-wrapper startups are still being funded as if the surface is the moat. It is not. The next eighteen months will resolve this the hard way — through compression, absorption, and a wave of acquihires that read like obituaries.",

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
