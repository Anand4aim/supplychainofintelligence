// Voices: framework testimonials.
// IMPORTANT: All quotes are paraphrased reactions captured during workshops and
// peer conversations. Names are listed with permission pending — each person
// will confirm their quote before this page is promoted publicly. Treat this
// as a private beta wall of voices until then.

export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  industry: string;
  quote: string;
  layerTag?: string; // e.g. "L1+L5+L8"
  source: "workshop" | "1:1" | "linkedin";
  approved?: boolean; // false = pending approval
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bill Leece",
    role: "Ex-Google Product Leader",
    industry: "Product Leadership",
    quote:
      "The clearest way I can put it: JTBD tells you the length of the customer need — what the job actually is. The Supply Chain of Intelligence tells you the depth of the answer — how many layers you have to own to deliver it durably. 'Trust the output' is one job. You can answer it shallow with a verifier feature on L7, or deep with an L3 gatekeeping layer baked in. The framework finally gave me a vocabulary for that trade-off.",
    layerTag: "JTBD × Chain",
    source: "1:1",
    approved: false,
  },
  {
    name: "Ruth Zimmerman",
    industry: "Product Leadership",
    quote:
      "I have sat through a hundred 'AI strategy' decks. This is the first one that told me which layer my product was actually on — and which layer it had to move to before the model layer ate me. The diagnostic is brutal in a useful way.",
    layerTag: "L5 + L8",
    source: "1:1",
    approved: false,
  },
  {
    name: "Carmen Newell",
    industry: "Enterprise SaaS",
    quote:
      "We were calling ourselves an 'AI platform' and the framework made us realize we were a thin L7 surface on top of someone else's L2. We rewrote the roadmap inside a week to compound on L1b proprietary data instead. The language travels — engineering and GTM both speak it.",
    layerTag: "L7 → L1b",
    source: "workshop",
    approved: false,
  },
  {
    name: "Ilmo Loussanamo",
    industry: "Fintech / Europe",
    quote:
      "What I appreciate is that it does not pretend AI changed the laws of business. It just renamed the layers. Bottlenecks still win. Distribution still wins. The framework gives you a map to find where the bottleneck moved.",
    layerTag: "L3 + L4",
    source: "linkedin",
    approved: false,
  },
  {
    name: "Anne Schoofs",
    industry: "B2B Marketing",
    quote:
      "The 'wrappers become features' line should be tattooed on every CMO budgeting AI spend right now. We killed two pilots after applying Law I — both were going to get absorbed by Microsoft's next Copilot release.",
    layerTag: "L7",
    source: "workshop",
    approved: false,
  },
  {
    name: "Khrystyna Layman",
    industry: "Healthtech",
    quote:
      "Regulated industries finally have a vocabulary for why our 'slow' moat is actually the moat. L3 Gatekeeping is the reason a generic chatbot will never displace us, and now I can explain that to a board in one slide.",
    layerTag: "L3",
    source: "1:1",
    approved: false,
  },
  {
    name: "Eric Zitaner",
    industry: "Venture / Early Stage",
    quote:
      "I now use the 10-layer map as a filter on every pitch. If the founder cannot name the two layers they own and the one layer they are vulnerable on, I pass. It has saved me from two wrappers that looked like rocketships.",
    layerTag: "Filter",
    source: "1:1",
    approved: false,
  },
  {
    name: "Brian Weiss",
    industry: "Developer Tools",
    quote:
      "The Defensible Triangle — L1b + L5 + L8 — is the clearest articulation I have seen of why some AI dev tools will compound and most will not. We rewrote our own positioning around it.",
    layerTag: "L1b + L5 + L8",
    source: "workshop",
    approved: false,
  },
  {
    name: "Priya",
    company: "Series B FinTech",
    industry: "FinTech",
    quote:
      "Law II reframed our entire 2026 plan. We stopped trying to build a better model and started buying the data nobody else has. That is the bottleneck.",
    layerTag: "L1b",
    source: "workshop",
    approved: false,
  },
  {
    name: "Marcus",
    company: "Legaltech scale-up",
    industry: "Legal",
    quote:
      "Harvey is the obvious example everyone uses. The framework let us articulate why the next Harvey will not be a model — it will be an L5 + L8 stack on top of firm-specific institutional memory.",
    layerTag: "L5 + L8",
    source: "workshop",
    approved: false,
  },
  {
    name: "Devika",
    company: "Series A AgentOps",
    industry: "AI Infrastructure",
    quote:
      "The 'agent is not a layer' rule alone is worth the price of admission. It forced us to decompose what we were selling into L6 orchestration plus L5 execution — and we found out one of them was hollow.",
    layerTag: "L5 + L6",
    source: "1:1",
    approved: false,
  },
  {
    name: "Tomás",
    company: "EdTech",
    industry: "EdTech",
    quote:
      "Watching the Chegg cautionary tale through the lens of Law I made the entire team uncomfortable in the right way. We restructured our product moat around L8 learner memory instead of L7 content.",
    layerTag: "L7 → L8",
    source: "workshop",
    approved: false,
  },
  {
    name: "Sarah",
    company: "Healthtech",
    industry: "Healthtech",
    quote:
      "I have been searching for a way to explain to my investors why selling into hospitals is slow and that slowness is the moat. 'L3 Gatekeeping' is the phrase I was missing.",
    layerTag: "L3",
    source: "workshop",
    approved: false,
  },
  {
    name: "Jordan",
    company: "DTC commerce platform",
    industry: "eCommerce",
    quote:
      "We spent six months trying to be an AI-native commerce surface. The framework helped us see that Shopify already owns our L4 + L7. We pivoted into an L5 execution layer and the conversation with retailers immediately changed.",
    layerTag: "L4 + L7 → L5",
    source: "1:1",
    approved: false,
  },
  {
    name: "Aishwarya",
    company: "Sales execution AI",
    industry: "SalesTech",
    quote:
      "The Intelligence Cube made our roadmap legible to revenue leaders for the first time. Function × Vertical × Layer is exactly how enterprise buyers think — they just did not have words for it.",
    layerTag: "Cube",
    source: "workshop",
    approved: false,
  },
  {
    name: "Diego",
    company: "Customer support AI",
    industry: "CX / Support",
    quote:
      "We were L5 + L7. Sierra is also L5 + L7 + L8. That third layer is the entire game. The framework made the gap unmissable.",
    layerTag: "L5 + L7 + L8",
    source: "1:1",
    approved: false,
  },
  {
    name: "Naomi",
    company: "Media analytics",
    industry: "Media",
    quote:
      "I keep sending the Three Laws essay to founders. It is the cleanest articulation of why most current AI valuations are pricing surface as if it were chain.",
    layerTag: "L7 vs Chain",
    source: "linkedin",
    approved: false,
  },
  {
    name: "Hassan",
    company: "GovTech",
    industry: "Government",
    quote:
      "Public sector buyers do not buy AI. They buy compliance with AI inside it. L3 is the layer my entire category lives or dies on, and now I have language for it.",
    layerTag: "L3",
    source: "workshop",
    approved: false,
  },
  {
    name: "Lina",
    company: "Travel AI",
    industry: "Travel",
    quote:
      "We thought we were competing with ChatGPT. The framework showed us we were actually competing with Booking and Expedia — at L4 distribution. Completely different war.",
    layerTag: "L4",
    source: "workshop",
    approved: false,
  },
  {
    name: "Workshop participants (25)",
    industry: "Mixed — PM, design, eng, founders",
    quote:
      "Across a 25-person product leadership workshop, the consistent feedback was that the 10-layer map gave teams a shared, layer-aware vocabulary for AI strategy debates that used to die in semantics. Specific quotes from individual participants will be added here as approvals come in.",
    source: "workshop",
    approved: false,
  },
];
