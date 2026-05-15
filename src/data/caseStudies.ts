import type { CaseStudy } from "@/components/CaseStudyCard";

// Using Clearbit Logo API for real company logos (free, public)
const logo = (domain: string) => `https://logo.clearbit.com/${domain}`;

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "jasper-vs-grammarly-copilot",
    companies: [
      { name: "Jasper", logo: logo("jasper.ai"), color: "#FF6B6B" },
      { name: "Grammarly", logo: logo("grammarly.com"), color: "#15C39A" },
      { name: "Copilot in Word", logo: logo("microsoft.com"), color: "#0078D4" },
    ],
    tag: "WORKED EXAMPLE · WRITING TOOLS",
    title: "Jasper, Grammarly, Copilot in Word: Same Category, Three Structural Fates",
    verdict: "L4 EATS L4",
    excerpt:
      "All three help you write. Jasper owned only the surface (L7) and dissolved when the model went free. Grammarly owned distribution (L4) into every browser and editor — until a bigger L4 owner, Microsoft, integrated the model directly into Word, Outlook, and Teams. Same layer. Bigger railroad. The market is repricing layer ownership, not ARR.",
    layers: ["L4", "L7"],
    date: "May 2026",
    readTime: "10 min",
    valuation: {
      label: "Jasper Valuation",
      before: "$1.5B (Oct 2022)",
      after: "~$300M",
      trend: "down",
      changeLabel: "-80%",
    },
    content: `Three writing products. Three structural positions. Three different fates — and none of them were predicted by ARR or product quality alone.

**Jasper — surface only (L7).** At its Oct 2022 peak Jasper raised $125M at a $1.5B valuation as the canonical "GPT wrapper for marketers." Defensibility lived entirely at the surface: prompt templates, brand voice presets, a polished UI. When ChatGPT shipped six weeks later, the model layer absorbed the value. By 2024 Jasper was reportedly trading hands at a fraction of that mark. **Law I in motion: intelligence commoditized downward.**

**Grammarly — distribution + orchestration (L4 + L6).** Already a $13B writing leader at its Nov 2021 peak, Grammarly was never a thin wrapper. It owned L4 (railroad) — extensions in Chrome, Word, Gmail, Slack, the OS keyboard — and L6 (orchestration) — tone detection, style enforcement, team voice. That depth carried it through the first wave: the surface might be a copilot, but the *distribution* was the moat.

**Copilot in Word — the L4 owner that ate L4.** Then Microsoft did the thing that breaks the framework's most important asymmetry. Microsoft already owned a *bigger* L4 — Word, Outlook, Teams, the entire 365 install base. They integrated GPT-class models *directly into the document surface* and bundled it with E3/E5. The same kind of moat (distribution into the editor) was now owned by an entity with vastly more of it. Grammarly's L4 didn't disappear — it just got out-scaled.

**Why this is the right triad to study.** Most decks compare Jasper to ChatGPT. That's a category mismatch — ChatGPT is a general assistant. The honest comparison is Jasper, Grammarly, and Microsoft Copilot in Word: all three are *literally* writing-assistance products embedded in the prose-creation moment. The three fates are then driven entirely by structural depth.

**The structural read:**
- Jasper (L7 only) — exposed; absorbed by L2 commoditization
- Grammarly (L4 + L6) — defended for years; now squeezed by a bigger L4 owner above it
- Copilot in Word (L0 + L2 + L4 + L7) — vertically integrated from compute to surface, bundled into existing distribution

**Law III — the surface captures attention; the chain captures power.** Same category does not equal same future. The market is repricing *layer ownership*, not feature quality. And when a bigger owner of your moat layer arrives, owning that layer is no longer enough — you need a layer they don't own. For Grammarly, that question now becomes: where is the L8 (memory of *your* writing voice across years and teams) that Microsoft can't easily replicate?

*Illustrative strategic patterns only — not investment recommendations. Public reporting; numbers approximate.*`,
  },
  {
    slug: "chegg-collapse",
    companies: [
      { name: "Chegg", logo: logo("chegg.com"), color: "#F5A623" },
      { name: "ChatGPT", logo: logo("openai.com"), color: "#10A37F" },
    ],
    tag: "CASUALTY REPORT",
    title: "Chegg: From $12B to 99% Collapse — The Fastest Value Destruction in EdTech",
    verdict: "STRUCTURAL INEVITABILITY",
    excerpt:
      "Chegg sat at L7b — generic educational content with no proprietary data, no memory loops, no compliance moat. When ChatGPT arrived, it didn't compete with Chegg — it made Chegg's entire layer free. The stock dropped 99%. Law III predicted it.",
    layers: ["L7"],
    date: "March 2026",
    readTime: "7 min",
    valuation: {
      label: "Market Cap",
      before: "$12B",
      after: "~$120M",
      trend: "down",
      changeLabel: "-99%",
    },
    content: `Chegg's collapse is the clearest case study of Law III: Value Migrates to the Scarcest Layer.

**Chegg's position:** L7b — generic educational content. Homework answers, textbook solutions, Q&A. No proprietary data (L1). No memory loops (L8). No compliance moat (L3). Just content that any LLM can generate.

**The timeline:**
- 2021: $12B market cap, dominant in homework help
- May 2023: CEO admits ChatGPT is hurting growth. Stock drops 48% in one day.
- 2024: Revenue down 50%+. Layoffs. Restructuring.
- 2025: Market cap under $200M. 99% destruction.

**What Chegg should have done:** Migrate value to L8 (Memory & Learning) — personalized tutoring that remembers each student's progress, weaknesses, and learning style. That's scarce. That's defensible.

**The law is clear:** If your layer isn't scarce, your value will migrate to whoever's layer is.`,
  },
  {
    slug: "gamma-thin-layer-graveyard",
    companies: [
      { name: "Gamma", logo: logo("gamma.app"), color: "#8B5CF6" },
      { name: "Copilot", logo: logo("microsoft.com"), color: "#0078D4" },
      { name: "Gemini", logo: logo("google.com"), color: "#4285F4" },
    ],
    tag: "ARCHETYPE ANALYSIS",
    title: "Gamma at $2.1B: The Thin-Layer Graveyard in Real Time",
    verdict: "GRAVEYARD CANDIDATE",
    excerpt:
      "Presentation generation sits at L7b — a thin slice of the stack. Claude, Copilot, and Gemini now do it for free. The Intelligence Cube™ predicted this before the market priced it in. When your entire product is one prompt away from being free, you're already dead.",
    layers: ["L7"],
    date: "March 2026",
    readTime: "8 min",
    valuation: {
      label: "Gamma Valuation",
      before: "$2.1B",
      after: "At risk",
      trend: "down",
      changeLabel: "Fragile",
    },
    content: `When Gamma raised at a $2.1B valuation, the market saw a hot AI startup. The Supply Chain of Intelligence™ saw a company occupying a single thin layer.

**The Cube Analysis:**
- Functions: Product + PM only (2/9)
- Verticals: Cross-industry (generic)
- Layers: L7 surface only (1/10)
- Volume: Minimal. Structurally fragile.

**What happened:** Claude added artifact generation. Copilot added presentation creation. Gemini added slide generation. All FREE with existing subscriptions.

**Law III in action:** Value migrated from the surface layer (L7) to the model layer (L2) and memory layer (L8). Gamma owned neither.`,
  },
  {
    slug: "stack-overflow-decline",
    companies: [
      { name: "Stack Overflow", logo: logo("stackoverflow.com"), color: "#F48024" },
      { name: "ChatGPT", logo: logo("openai.com"), color: "#10A37F" },
      { name: "GitHub Copilot", logo: logo("github.com"), color: "#24292E" },
    ],
    tag: "TRAFFIC COLLAPSE",
    title: "Stack Overflow: When Your Community Becomes Training Data",
    verdict: "L7b COMMODITY",
    excerpt:
      "Stack Overflow's traffic dropped 35%+ after ChatGPT launched. 15 years of community-built knowledge packaged as L7b content — consumed by models at L2. The community that built the data got none of the value. The model layer captured it all.",
    layers: ["L1", "L7"],
    date: "March 2026",
    readTime: "8 min",
    valuation: {
      label: "Traffic Impact",
      before: "100M+/mo",
      after: "~55M/mo",
      trend: "down",
      changeLabel: "-45%",
    },
    content: `Stack Overflow is a fascinating structural case: they had L1 data (community knowledge) but packaged it as L7b (generic content access).

**The irony:** Stack Overflow's data trained the very models that now replace it. Their 15+ years of developer Q&A became fuel for ChatGPT and Copilot.

**The structural mistake:** Stack Overflow treated its data as content (L7b) rather than proprietary fuel (L1b). They could have:
- Licensed data at premium rates (L1b monetization)
- Built developer memory (L8) — personalized to each dev's stack
- Created compliance layers (L3) — verified, auditable answers for enterprise

**Instead:** They sold ads on a content site. When the content became free via LLMs, the ads lost their audience.`,
  },
  {
    slug: "apollo-vs-zoominfo",
    companies: [
      { name: "Apollo.io", logo: logo("apollo.io"), color: "#4F46E5" },
      { name: "ZoomInfo", logo: logo("zoominfo.com"), color: "#00B084" },
    ],
    tag: "STRUCTURAL DIVERGENCE",
    title: "Apollo vs ZoomInfo: Same Layer, Opposite Strategies, Different Fates",
    verdict: "DATA REFINERY WINS",
    excerpt:
      "Both sit at L1 — proprietary data. But Apollo went API-first and headless. ZoomInfo charges premium for a UI wrapper. In an agent-first world, the UI tax is a liability. The data refinery wins.",
    layers: ["L1", "L7"],
    date: "March 2026",
    readTime: "7 min",
    valuation: {
      label: "ZoomInfo Market Cap",
      before: "$24B",
      after: "~$5B",
      trend: "down",
      changeLabel: "-79%",
    },
    content: `Apollo.io sits at L1b — proprietary data. 275 million contacts. Headless API + MCP connector. This is the structural definition of "safe."

**Why Law III protects Apollo:** When models (L2) commoditize, every agent needs data. When surfaces (L7) commoditize, every interface needs enrichment. The scarcer the data, the more valuable it becomes.

**Compare to ZoomInfo:** Same layer (L1), but ZoomInfo charges premium for a UI wrapper on increasingly commodity data. The UI tax is a liability when agents don't need UIs.

**The verdict:** Data refineries are the safest position in the stack. But only if you go headless.`,
  },
  {
    slug: "sierra-vs-salesforce",
    companies: [
      { name: "Sierra", logo: logo("sierra.ai"), color: "#6366F1" },
      { name: "Salesforce", logo: logo("salesforce.com"), color: "#00A1E0" },
    ],
    tag: "DEEP DIVE",
    title: "Sierra's Memory Moat: Why L8 Beats Salesforce's Agentforce",
    verdict: "MEMORY = MOAT",
    excerpt:
      "Sierra learns from every customer resolution. Salesforce Agentforce doesn't. This single architectural difference — compounding memory at L8 — determines who captures the next decade of enterprise CX value.",
    layers: ["L1", "L5", "L8"],
    date: "March 2026",
    readTime: "9 min",
    valuation: {
      label: "Sierra Valuation",
      before: "—",
      after: "$4.5B",
      trend: "up",
      changeLabel: "Rising",
    },
    content: `Sierra occupies the most structurally durable position in customer experience: L1 (customer data) + L5 (domain execution) + L8 (memory that compounds).

**The memory advantage:** Every customer interaction makes Sierra smarter. It remembers resolution patterns, customer preferences, and edge cases. This creates a compounding data moat that grows with usage.

**Compare to Salesforce:** Agentforce is impressive, but Salesforce's architecture doesn't compound. It stores data but doesn't learn from it.

**The Cube view:** Sierra is TALL — multiple layers, focused verticals, deep functions. This is the fortress pattern.`,
  },
  {
    slug: "stability-ai-open-model-trap",
    companies: [
      { name: "Stability AI", logo: logo("stability.ai"), color: "#A855F7" },
      { name: "Midjourney", logo: logo("midjourney.com"), color: "#0F0F0F" },
    ],
    tag: "MODEL LAYER TRAP",
    title: "Stability AI vs Midjourney: Why Open-Source L2 Couldn't Monetize",
    verdict: "OPEN L2 = NO MOAT",
    excerpt:
      "Stability AI open-sourced its model (L2) and couldn't build a business. Midjourney kept its model closed and built a $10B+ community. Same technology, opposite monetization strategies, dramatically different outcomes.",
    layers: ["L2", "L7"],
    date: "March 2026",
    readTime: "8 min",
    valuation: {
      label: "Stability AI",
      before: "$1B",
      after: "~$80M",
      trend: "down",
      changeLabel: "-92%",
    },
    content: `Stability AI raised at $1B by open-sourcing Stable Diffusion. The model was revolutionary. The business was not.

**The structural problem:** Open-sourcing L2 (model) means anyone can replicate your core value. Stability had no L1 (proprietary data), no L8 (memory), no L3 (governance). Just an open model.

**Midjourney's approach:** Kept the model closed. Built community (L7e surface). Created aesthetic memory (proto-L8). Result: $10B+ valuation, profitable from day one.

**The lesson:** L2 (models) are structurally fragile when open. The value migrates to whoever wraps them in scarce layers.`,
  },
  {
    slug: "five-eras-of-software",
    companies: [
      { name: "Salesforce", logo: logo("salesforce.com"), color: "#00A1E0" },
      { name: "Notion", logo: logo("notion.so"), color: "#000000" },
      { name: "ChatGPT", logo: logo("openai.com"), color: "#10A37F" },
    ],
    tag: "THE FIVE ERAS",
    title: "From Dashboard to Skill Hire: The Death of Per-Seat Software",
    verdict: "ERA 3 → ERA 5",
    excerpt:
      "We're in Era 3 — The Dialogue. Human directs, AI builds. By 2028, agents ARE the workers. Per-seat pricing dies because AI replaces seats. Your roadmap needs both the customer axis and the depth axis to survive.",
    layers: ["L5", "L7"],
    date: "March 2026",
    readTime: "10 min",
    content: `Software has evolved through five distinct eras, and most product leaders are still building for Era 2.

**Era 1 (1999–2015): The Dashboard** — Software shows data. Human decides.
**Era 2 (2015–2023): The Workflow** — Software guides. Human executes.
**Era 3 (2023–Now): The Dialogue** — Human directs. AI builds. ← WE ARE HERE
**Era 4 (2026–2028): The Workspace** — AI orchestrates. Human supervises.
**Era 5 (2028+): The Skill Hire** — Agent IS the worker. Human strategizes.

**Why per-seat dies:** AI replaces seats. Better AI = fewer humans = less revenue. Per-seat pricing is self-defeating in an agent world.`,
  },
  {
    slug: "harvey-vs-generic-legal",
    companies: [
      { name: "Harvey AI", logo: logo("harvey.ai"), color: "#1E3A5F" },
    ],
    tag: "FORTRESS PATTERN",
    title: "Harvey AI: The Vertical Fortress That Generic AI Can't Touch",
    verdict: "FORTRESS — SAFE",
    excerpt:
      "Harvey occupies L1 (legal data) + L3 (compliance/governance) + L5 (domain execution) + L8 (case memory). Four layers deep in a regulated vertical. Generic AI can't replicate L3. This is the fortress archetype.",
    layers: ["L1", "L3", "L5", "L8"],
    date: "March 2026",
    readTime: "7 min",
    valuation: {
      label: "Harvey Valuation",
      before: "—",
      after: "$1.5B",
      trend: "up",
      changeLabel: "Rising",
    },
    content: `Harvey AI is the textbook example of the Fortress archetype — multiple structural layers in a regulated vertical.

**The stack position:**
- L1: Proprietary legal training data from top law firms
- L3: Compliance, privilege, audit trails — legally required, can't be automated away
- L5: Deep legal execution — contract analysis, case research, regulatory interpretation
- L8: Case memory — learns from each firm's precedents and preferences

**Why generic AI can't compete:** ChatGPT can write a legal memo. But it can't guarantee privilege. It can't audit its reasoning. It can't learn from your firm's specific playbook. The compliance layer (L3) is the moat that no generic model can cross.`,
  },
];
