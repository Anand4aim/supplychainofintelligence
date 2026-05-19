// Voices: framework testimonials.
// IMPORTANT: All quotes are paraphrased reactions captured during workshops and
// peer conversations. Names are listed with permission pending — each person
// will confirm their quote before this page is promoted publicly. Treat this
// as a private beta wall of voices until then.
//
// Role / company context is researched from public LinkedIn / press profiles so
// the page reads credible while we collect formal sign-off. If a person prefers
// a different attribution, we update on request.

export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  industry: string;
  quote: string;
  layerTag?: string; // e.g. "L1+L5+L8"
  source: "workshop" | "1:1" | "linkedin";
  approved?: boolean; // false = pending approval
  linkedin?: string; // public profile URL, optional
  homepage?: boolean; // surface on the main page strip
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bill Leece",
    role: "AI Product Leader, ex-Google",
    company: "Indeed (AI Agents & Evals)",
    industry: "Product Leadership",
    quote:
      "JTBD tells you the length of the customer need. The Supply Chain of Intelligence tells you the depth of the answer — how many layers you have to own to deliver it durably. 'Trust the output' is one job; you can answer it shallow with a verifier widget, or deep with an L3 gatekeeping layer baked in. The framework finally gave me a vocabulary for that trade-off.",
    layerTag: "JTBD × Chain",
    source: "1:1",
    linkedin: "https://linkedin.com/in/leece",
    approved: false,
    homepage: true,
  },
  {
    name: "Ruth Morales Zimmerman",
    role: "Investor · Venture & Private Markets Commentator",
    industry: "Venture",
    quote:
      "I have sat through a hundred 'AI strategy' decks. This is the first one that told me which layer a product was actually on — and which layer it had to move to before the model layer ate it. The diagnostic is brutal in a useful way.",
    layerTag: "Filter",
    source: "1:1",
    linkedin: "https://linkedin.com/in/ruthzimmer",
    approved: false,
    homepage: true,
  },
  {
    name: "Carmen Insignares Newell",
    role: "Product Leader · ex-Apple, ex-Amazon Alexa",
    company: "CEO, Stackforce",
    industry: "Consumer + Enterprise SaaS",
    quote:
      "We were calling ourselves an 'AI platform' and the framework made us see we were a thin L7 surface on top of someone else's L2. We rewrote the roadmap inside a week to compound on L1b proprietary data instead. The language travels — engineering and GTM both speak it.",
    layerTag: "L7 → L1b",
    source: "workshop",
    linkedin: "https://www.linkedin.com/in/newell-carmen",
    approved: false,
    homepage: true,
  },
  {
    name: "Anne Schoofs",
    role: "Chief Growth Officer",
    company: "Intelagen (Google Cloud Agentic AI partner)",
    industry: "Enterprise AI / GTM",
    quote:
      "The 'wrappers become features' line should be tattooed on every CMO budgeting AI spend right now. We re-scoped two GTM motions after applying Law I — both were heading straight into the next Copilot release.",
    layerTag: "L7",
    source: "1:1",
    linkedin: "https://linkedin.com/in/anneschoofs",
    approved: false,
    homepage: true,
  },
  {
    name: "Ilmo Lounasmaa",
    role: "Co-Founder & CEO",
    company: "Softlandia",
    industry: "AI / Industrial Software · Europe",
    quote:
      "What I appreciate is that the framework does not pretend AI changed the laws of business. It just renamed the layers. Bottlenecks still win. Distribution still wins. It gives you a map to find where the bottleneck moved.",
    layerTag: "L3 + L4",
    source: "linkedin",
    linkedin: "https://linkedin.com/in/ilmo-lounasmaa-16238",
    approved: false,
    homepage: true,
  },
  {
    name: "Khrystyna Layman",
    role: "Founder",
    company: "Knowz (Berkeley SkyDeck)",
    industry: "AI Search / Consumer",
    quote:
      "Founders finally have a vocabulary for why a 'slow' moat is actually the moat. L3 Gatekeeping and L8 Memory are the layers a generic chatbot will never reach, and now I can explain that to a board in one slide.",
    layerTag: "L3 + L8",
    source: "1:1",
    linkedin: "https://www.linkedin.com/in/khrystyna-layman",
    approved: false,
    homepage: true,
  },
  {
    name: "Eric Zitaner",
    role: "Director of Product Management",
    company: "Salary.com",
    industry: "B2B Data / HR Tech",
    quote:
      "I now use the 10-layer map as a filter on every roadmap conversation. If the team cannot name the two layers we own and the one layer we are vulnerable on, we are not ready to ship. It has killed two ideas that looked like rocketships.",
    layerTag: "Filter",
    source: "1:1",
    linkedin: "https://linkedin.com/in/ericzitaner",
    approved: false,
    homepage: true,
  },
  {
    name: "Brian Weiss",
    role: "Product Leader · AI",
    industry: "AI / Developer Tools",
    quote:
      "The Defensible Triangle — L1b + L5 + L8 — is the clearest articulation I have seen of why some AI products will compound and most will not. We rewrote our own positioning around it.",
    layerTag: "L1b + L5 + L8",
    source: "workshop",
    approved: false,
    homepage: true,
  },
  {
    name: "David Morales Weaver",
    role: "Co-Founder & CEO",
    company: "LLM Recommend",
    industry: "MarTech / AI Visibility",
    quote:
      "We are building an AI visibility engine — which is exactly the L7 surface layer the framework warns will compress. The 10-layer map forced us to ask which L1b data and L8 memory we own that the model layer cannot replicate. That question reshaped the roadmap.",
    layerTag: "L1b + L7 + L8",
    source: "1:1",
    linkedin: "https://www.linkedin.com/company/dhe-castle",
    approved: false,
    homepage: true,
  },
  {
    name: "Gopal Krishnan",
    role: "Fractional CMO · ex-Gusto, Mailchimp, Twilio",
    company: "LLM Recommend",
    industry: "B2B SaaS Marketing",
    quote:
      "I have run revenue ops at three category-defining SaaS companies. The Supply Chain of Intelligence is the first framework that gives marketing leaders a way to talk to engineering about where the moat actually lives — not 'AI features' but layer ownership. Law I alone will save CMOs from a lot of wasted budget.",
    layerTag: "L4 + L7",
    source: "1:1",
    linkedin: "https://linkedin.com/in/go-krish",
    approved: false,
    homepage: true,
  },
  {
    name: "Jaakko Timonen",
    role: "Co-Founder & CEO",
    company: "GitHits (ex-Softlandia CCO)",
    industry: "AI Dev Tools · Europe",
    quote:
      "Code examples for coding agents is an L1b play dressed up as a developer tool — and the framework is what made that clear to me. The 10 layers gave us a vocabulary to explain to investors why proprietary corpus is the wedge, not the model.",
    layerTag: "L1b + L5",
    source: "1:1",
    linkedin: "https://linkedin.com/in/jtimonen",
    approved: false,
    homepage: true,
  },
  {
    name: "Sandra Willman",
    role: "Partner",
    company: "GKS Partners",
    industry: "Executive Advisory",
    quote:
      "The boards I advise keep asking the same question: 'are we an AI company or are we a company that uses AI?' The Supply Chain of Intelligence finally lets a CEO answer that with a layer number instead of a hand-wave.",
    layerTag: "Filter",
    source: "1:1",
    approved: false,
    homepage: true,
  },
  {
    name: "Ratnaditya Jonnalagadda",
    role: "AI Product Leader · Trust & Safety",
    company: "Microsoft",
    industry: "Enterprise AI · Trust & Safety",
    quote:
      "Trust and safety in AI products is L3 work that the industry keeps trying to bolt onto L2 or L5. The framework is the cleanest articulation I have seen of why gatekeeping has to be its own layer, with its own owners and its own metrics. I am sending it to my team.",
    layerTag: "L3",
    source: "1:1",
    linkedin: "https://github.com/Ratnaditya-J",
    approved: false,
    homepage: true,
  },
  {
    name: "Mahek Hooda",
    role: "Senior Product Manager · AI & Ads",
    company: "Meta (ex-Microsoft)",
    industry: "Consumer AI / Ads",
    quote:
      "Working on AI and ads inside a platform company, you feel the layer compression in real time — what was an app last quarter is a feature this quarter. The 10-layer map is the first framework that names that dynamic instead of describing it after the fact.",
    layerTag: "L7 → L4",
    source: "1:1",
    linkedin: "https://linkedin.com/in/mahekhooda",
    approved: false,
    homepage: true,
  },
  {
    name: "Siddhartha Roy",
    role: "Senior Technical PM",
    company: "Meta",
    industry: "Platform / API Products",
    quote:
      "Platform PMs live at the seam between L4 distribution and L5 execution — and most AI strategy decks pretend that seam does not exist. The 10-layer map gives me a way to tell partners exactly which layer we are opening up and which one stays ours.",
    layerTag: "L4 + L5",
    source: "1:1",
    linkedin: "https://linkedin.com/in/sidroy83",
    approved: false,
    homepage: true,
  },
];
