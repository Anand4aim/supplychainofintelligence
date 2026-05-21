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
