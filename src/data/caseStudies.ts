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
    layer_scores: [
      { layer: "L2", owned: false, intensity: 3, note: "The L2 commoditization (ChatGPT free) is what triggered the cascade — Jasper's surface lost its model scarcity overnight.", sublayers: [{ name: "Foundation models", impact: 3, who: "OpenAI, Anthropic, Google" }] },
      { layer: "L4", owned: false, intensity: 3, note: "Grammarly built L4 (browser/editor extensions) — defensible until Microsoft brought a bigger L4 (Office, Teams, 365 install base) to the same fight.", sublayers: [{ name: "Browser extension", impact: 3, who: "Grammarly" }, { name: "Editor integration", impact: 3, who: "Microsoft 365" }] },
      { layer: "L6", owned: false, intensity: 2, note: "Tone, style, voice orchestration — Grammarly's deeper layer, but increasingly replicable inside any L4 owner's stack.", sublayers: [{ name: "Tone & style", impact: 2, who: "Grammarly, Copilot" }] },
      { layer: "L7", owned: false, intensity: 3, note: "Jasper lived here alone — prompt templates and brand voice presets. Absorbed when the model itself became conversational.", sublayers: [{ name: "Prompt templates", impact: 3, who: "Jasper" }, { name: "Writing surface", impact: 3, who: "All three" }] },
      { layer: "L8", owned: false, intensity: 1, note: "The unclaimed layer. Whoever owns the memory of *your* writing voice across years and teams wins the next decade. No one owns it yet.", sublayers: [{ name: "Voice memory", impact: 1, who: "Up for grabs" }] },
    ],
    cube_position: {
      functions: ["Mktg", "Product", "PM/Proj", "Sales"],
      verticals: ["Horizontal", "SaaS"],
      layers: ["L2", "L4", "L6", "L7"],
    },
    timeline: [
      { date: "Nov 2021", label: "Grammarly hits $13B valuation at peak — owns browser + editor extensions.", tone: "up" },
      { date: "Oct 2022", label: "Jasper raises $125M at $1.5B — pure L7 prompt-template moat.", tone: "up" },
      { date: "Nov 2022", label: "ChatGPT launches. Free, conversational, GPT-3.5. Jasper's L7 moat begins evaporating in weeks.", tone: "down" },
      { date: "Mar 2023", label: "Microsoft announces Copilot in Word, Outlook, Teams — bundled into 365.", tone: "down" },
      { date: "2024", label: "Jasper reportedly trading at ~$300M — 80% mark-down.", tone: "down" },
      { date: "2025–26", label: "Grammarly squeezed: same moat layer, but Microsoft owns more of it. Pivots toward team-voice memory (L8).", tone: "neutral" },
    ],
    who_wins: [
      { name: "Microsoft", reason: "Already owned the bigger L4. Added L2 inside it. Bundled at no marginal price." },
      { name: "OpenAI / Anthropic / Google", reason: "L2 is now the price-setting layer — every L7 wrapper pays them rent." },
      { name: "Any future L8 owner", reason: "The memory of your voice, across every doc you've ever written, is the only layer still unclaimed in writing." },
    ],
    who_loses: [
      { name: "Jasper", reason: "L7-only is the new GPT-wrapper graveyard. 80% mark-down is the structural verdict." },
      { name: "Pure-play AI writing startups", reason: "Same fate as Jasper unless they own L1 (voice data) or L8 (cross-doc memory)." },
      { name: "Grammarly (partially)", reason: "Still defensible in the browser, but squeezed inside Office. Needs an L8 sprint." },
    ],
    counter_thesis: `The counter is that Grammarly has built genuine L8 over a decade — billions of corrections per user, tone profiles, team style enforcement. Microsoft has the bigger L4 but no equivalent depth on *individual voice memory* across non-Microsoft surfaces (Slack, Gmail, browser, mobile keyboards). If Grammarly converts its corrections corpus into a true cross-surface voice memory product — and if enterprises actually pay for "the AI that knows how your VP of Marketing writes" — then L8 + multi-L4 distribution beats single-L4 dominance. The honest read: that's a 30% probability bet, not a base case.`,
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
    layer_scores: [
      { layer: "L1", owned: false, intensity: 1, note: "Chegg had a corpus but never treated it as proprietary fuel — it was generic content scraped by any LLM in training.", sublayers: [{ name: "Q&A corpus", impact: 1, who: "Chegg (now in every model's training set)" }] },
      { layer: "L2", owned: false, intensity: 3, note: "ChatGPT collapsed L7b pricing to zero. Chegg's content layer became free to reproduce.", sublayers: [{ name: "General-purpose LLMs", impact: 3, who: "OpenAI, Anthropic, Google" }] },
      { layer: "L3", owned: false, intensity: 0, note: "No compliance moat — homework help is unregulated, so no L3 friction protected the incumbent." },
      { layer: "L7", owned: true, intensity: 3, note: "Chegg's entire stack lived here: a content-access surface. The most-fragile layer in any AI cycle.", sublayers: [{ name: "Homework answers", impact: 3, who: "Chegg → ChatGPT" }, { name: "Textbook solutions", impact: 3, who: "Chegg → ChatGPT" }] },
      { layer: "L8", owned: false, intensity: 0, note: "The unbuilt layer that could have saved them: per-student memory, learning-style adaptation, weakness tracking." },
    ],
    cube_position: {
      functions: ["CustCare", "Product"],
      verticals: ["EdTech"],
      layers: ["L7"],
    },
    timeline: [
      { date: "Feb 2021", label: "Chegg hits all-time high — $113/share, ~$12B market cap. Pandemic education boom.", tone: "up" },
      { date: "Nov 2022", label: "ChatGPT launches. Free homework answers, infinite scale, no subscription.", tone: "down" },
      { date: "May 2023", label: "CEO admits ChatGPT impact on growth call. Stock drops 48% in a single day.", tone: "down" },
      { date: "2024", label: "Revenue down 50%+. Layoffs. Chegg announces its own AI product — too late, no proprietary edge.", tone: "down" },
      { date: "2025", label: "Market cap under $200M. ~99% destruction from peak.", tone: "down" },
    ],
    who_wins: [
      { name: "OpenAI", reason: "Absorbed the entire homework-help category as a side effect of being a general assistant." },
      { name: "Khan Academy (Khanmigo)", reason: "Built L8 (per-student memory + Socratic tutoring) on top of GPT — the layer Chegg never built." },
      { name: "Duolingo", reason: "Owned L8 (spaced-repetition memory of every learner) before AI hit. The moat held." },
    ],
    who_loses: [
      { name: "Chegg", reason: "Pure L7b with no L1, L3, or L8 underneath. Structural inevitability." },
      { name: "Course Hero, Quizlet (legacy mode)", reason: "Same L7b position. Same vulnerability. Both scrambling to bolt on L8." },
      { name: "Every ed-content reseller", reason: "If your business is 'access to answers,' the answers are now free." },
    ],
    counter_thesis: `Bull case: Chegg pivots into tutoring services + per-student L8 memory + verified-human-expert L3, and re-emerges as a smaller but durable $1–2B business. The pieces exist — 8M+ subscribers, brand recognition with students, a corpus of decade-old questions. But the cultural and capital constraints (public-company quarterly pressure, debt, demoralized team) make this unlikely. More probable outcome: take-private, asset stripped, brand absorbed by a tutoring marketplace. The 99% drop is the market pricing that path correctly.`,
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
      "Presentation generation lives at L7b — a single thin slice of the stack. Claude, Copilot, and Gemini now do it for free inside surfaces 100× larger than Gamma's. The Intelligence Cube™ predicted this before the market priced it in: when your entire product is one prompt away from being free inside an L4 you don't own, the valuation is a liability, not a moat.",
    layers: ["L2", "L4", "L7"],
    date: "March 2026",
    readTime: "9 min",
    valuation: {
      label: "Gamma Valuation",
      before: "$2.1B (2024)",
      after: "Structurally exposed",
      trend: "down",
      changeLabel: "Fragile",
    },
    content: `Gamma is genuinely well-built. The product is elegant, the demos are crisp, the team is strong. None of that resolves the structural question: *what does Gamma own that Microsoft, Google, and Anthropic don't?*

**The stack position.** Gamma sits at L7b — the slide-generation surface. There is no L1 (no proprietary corpus of decks the user couldn't get elsewhere). There is no L4 (no distribution into Office, Google Workspace, Notion, or the browser). There is no L8 (no compounding memory of *your* brand voice, your team's decks, your prior narratives). One layer, one slice, on rented L2.

**What the L4 owners did.** Microsoft shipped Copilot in PowerPoint — bundled into 365, no extra SKU, no behavior change. Google shipped Gemini in Slides — same play. Anthropic shipped Artifacts — which generates a usable deck inside the same chat where you wrote the brief. Three different L4s, each integrating L7b natively. Gamma now competes by asking users to *change tools* for a feature that exists where they already work.

**Law I — intelligence commoditized downward.** L2 capability for "turn this outline into 12 slides" is now interchangeable across frontier models. The model is no longer the moat — and Gamma never owned one anyway.

**Law III — value migrates to the scarcest layer.** In presentations the scarce thing is *not* layout intelligence. It is the brand-voice memory, the deck-history archive, the per-team narrative templates that compound over years. None of that is Gamma's today.

**What would save Gamma.** Three options, in order of plausibility: (1) become an L1 play — build the proprietary deck corpus from every customer, so the system gets dramatically smarter at *your* brand than any general model could; (2) get acquired by an L4 owner who needs a presentation surface (Notion, Canva, Figma all plausible); (3) collapse the price and pivot to a true vertical (sales decks, board decks, investor updates) where L5+L8 can compound.

**The valuation math.** $2.1B requires either a multi-billion-revenue path or a strategic acquisition price. The first is structurally hard at L7-only. The second is realistic — but the acquirer dictates terms.

*Illustrative — not investment advice. Public reporting; figures approximate.*`,
    layer_scores: [
      { layer: "L2", owned: false, intensity: 3, note: "Rented from frontier labs. Same model every competitor calls. Now embedded inside Office and Workspace for free.", sublayers: [{ name: "Foundation models", impact: 3, who: "OpenAI, Anthropic, Google" }] },
      { layer: "L4", owned: false, intensity: 3, note: "The decisive missing layer. Microsoft owns PowerPoint, Google owns Slides, Canva owns the design surface. Gamma must acquire each user.", sublayers: [{ name: "PowerPoint", impact: 3, who: "Microsoft" }, { name: "Slides", impact: 3, who: "Google" }, { name: "Canva/Figma", impact: 2, who: "Adjacent owners" }] },
      { layer: "L7", owned: true, intensity: 3, note: "Gamma's entire product. Polished, elegant — and the most replicable layer in the stack.", sublayers: [{ name: "Slide generation surface", impact: 3, who: "Gamma + every L4 owner" }] },
      { layer: "L8", owned: false, intensity: 1, note: "Faint per-user theme memory, but no real cross-deck or cross-team compounding loop. The layer that could have been the moat.", sublayers: [{ name: "Brand-voice memory", impact: 1, who: "Up for grabs" }] },
    ],
    cube_position: {
      functions: ["Mktg", "Product", "Sales"],
      verticals: ["Horizontal"],
      layers: ["L7"],
    },
    timeline: [
      { date: "2022", label: "Gamma launches — fast, beautiful AI-first deck builder. Genuine product-market fit with founders and marketers.", tone: "up" },
      { date: "2024", label: "Reported $2.1B valuation. Headline-grabbing growth.", tone: "up" },
      { date: "Mar 2024", label: "Microsoft Copilot ships in PowerPoint with deck-from-prompt — bundled into 365.", tone: "down" },
      { date: "Late 2024", label: "Anthropic Artifacts and Google Gemini in Slides ship comparable generation natively inside their L4s.", tone: "down" },
      { date: "2025–26", label: "Competitive pressure compounds: Gamma must justify a separate tool for a feature now native to Office, Workspace, and chat. Growth efficiency degrades.", tone: "down" },
    ],
    who_wins: [
      { name: "Microsoft (PowerPoint + Copilot)", reason: "Owns the L4 every enterprise already pays for. Marginal cost of adding L7 generation: zero." },
      { name: "Google (Slides + Gemini)", reason: "Same play in the Workspace install base." },
      { name: "Canva", reason: "Owns the L4 of non-enterprise design. Different distribution, same dynamic — already shipping AI deck generation native." },
    ],
    who_loses: [
      { name: "Gamma", reason: "L7-only, no L1, no L4, no L8. Classic thin-layer position — and the L4 owners just shipped its product as a feature." },
      { name: "Tome, Beautiful.AI, every standalone AI deck tool", reason: "Same archetype, same fate. The category is becoming a feature of every L4." },
      { name: "Late-stage investors at the $2B+ mark", reason: "The structural read says the next round is either flat, down, or a strategic acquisition — not a fresh markup." },
    ],
    counter_thesis: `Bull case: Gamma's design taste and product velocity are real. If they (a) build a true L1 by ingesting every user's prior decks, brand assets, and approved narratives, (b) compound L8 so the tool genuinely knows *your* voice better than any generalist could, and (c) move upmarket into vertical wedges (PE deal teams, investor relations, board decks) where the L5 workflow is non-trivial — they can carve out a real $500M-$1B revenue business. That doesn't justify $2.1B easily, but it doesn't have to end in zero. The honest read: 30% probability path, requires a sharp strategic pivot in the next 18 months.`,
    for_you: {
      product_leader: "Audit every 'AI tool for X' in your stack. If the product owns only L7, plan to retire it the quarter your L4 vendor (Microsoft, Google, Adobe, Salesforce) ships the same feature native.",
      investor: "Single-layer L7 plays at $2B+ are structurally short unless an L1 or L8 thesis is plausible within 18 months. Underwrite the next-round mark, not last round's headline.",
      operator: "If your AI-tool budget is fragmenting into 8 single-feature SaaS subscriptions, the consolidation play is the L4 owner's bundle — not the standalone tool.",
    },
    pull_quote: "When your entire product is one prompt away from being free inside an L4 you don't own, the valuation is a liability, not a moat.",
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
  {
    slug: "mckinsey-openai-lilli",
    companies: [
      { name: "McKinsey", logo: logo("mckinsey.com"), color: "#003A70" },
      { name: "OpenAI", logo: logo("openai.com"), color: "#10A37F" },
    ],
    tag: "CONSULTING × MODEL LAYER",
    title: "McKinsey + OpenAI (Lilli): When the Consulting Firm Owns the Memory, Not the Model",
    verdict: "L1 + L8 OVER L2",
    excerpt:
      "McKinsey didn't build a model. It built Lilli — an internal assistant trained on 100,000+ McKinsey documents, 70 years of proprietary studies, and the firm's named expert network. OpenAI provides L2. McKinsey owns L1 (the IP) and L8 (the firm's institutional memory). The consultant doesn't get disrupted by the model — the consultant rents the model and keeps the moat.",
    layers: ["L1", "L2", "L6", "L8"],
    date: "May 2026",
    readTime: "9 min",
    valuation: {
      label: "Lilli Adoption",
      before: "0 (Jun 2023)",
      after: "70%+ of firm weekly",
      trend: "up",
      changeLabel: "Compounding",
    },
    content: `The most misread AI story in professional services. Everyone asked "will ChatGPT kill McKinsey?" The structural answer was always no — and Lilli is the proof.

**The setup.** In mid-2023 McKinsey shipped Lilli, an internal generative AI assistant built on OpenAI's models but grounded in *McKinsey's own corpus*: 100,000+ proprietary documents, 70 years of consulting studies, frameworks, interview notes, expert profiles. Within a year, the majority of the firm uses it weekly.

**The structural read:**
- L2 (model): rented from OpenAI. Commoditizing fast. McKinsey pays nothing to defend it.
- L1 (proprietary data): 70 years of client work, expert memos, sector benchmarks. *Cannot be reproduced by any model.* This is the moat.
- L6 (orchestration): retrieval over the corpus, citation, expert routing. McKinsey-built.
- L8 (institutional memory): every engagement adds to Lilli. Compounding. Every consultant's output becomes future fuel.

**Law I — intelligence commoditizes downward.** OpenAI's model is now interchangeable with Anthropic's or Google's at this task. McKinsey can swap the L2 underneath Lilli in a weekend. The L1 and L8 above it are untouched.

**Law III — value migrates to the scarcest layer.** The scarce thing is not the ability to write a strategy memo. It's the 70 years of *which strategies worked for which clients in which sector cycles*. That data only exists inside McKinsey.

**The inverted lesson for everyone else.** Most enterprises panicked about "AI eating consulting." The opposite happened: consulting firms became some of the *largest* OpenAI/Anthropic customers, because they had the L1 and L8 to make the model valuable. The model layer is a tool. The data and memory layers are the business.

**What this means for your firm.** If your competitive position is "we know things and we remember things," AI is an amplifier, not a threat — *provided* you own L1 and L8. If your position is "we can write good documents," the model just ate your job.

*Public reporting; figures approximate.*`,
    layer_scores: [
      { layer: "L1", owned: true, intensity: 3, note: "70 years of proprietary studies, expert memos, sector benchmarks. The moat that no model can reproduce.", sublayers: [{ name: "Client engagement archive", impact: 3, who: "McKinsey" }, { name: "Expert profiles & frameworks", impact: 3, who: "McKinsey" }] },
      { layer: "L2", owned: false, intensity: 2, note: "Rented from OpenAI. Swappable in a weekend. McKinsey pays nothing to defend it.", sublayers: [{ name: "Foundation model", impact: 2, who: "OpenAI (swappable)" }] },
      { layer: "L3", owned: true, intensity: 2, note: "Client confidentiality, audit trails, citation back to source memos — table stakes for a consulting firm and a real barrier for AI-native competitors.", sublayers: [{ name: "Confidentiality + audit", impact: 2, who: "McKinsey-built" }] },
      { layer: "L6", owned: true, intensity: 3, note: "Retrieval over the proprietary corpus, citation, expert routing — McKinsey-built orchestration on top of a rented model.", sublayers: [{ name: "Corpus retrieval & routing", impact: 3, who: "McKinsey" }] },
      { layer: "L8", owned: true, intensity: 3, note: "Every engagement adds to Lilli. Compounding institutional memory — the second moat layer.", sublayers: [{ name: "Institutional memory", impact: 3, who: "McKinsey" }, { name: "Per-engagement feedback", impact: 2, who: "McKinsey" }] },
    ],
    cube_position: {
      functions: ["Strategy", "PM/Proj", "Product", "Sales"],
      verticals: ["Horizontal", "FinTech", "Health"],
      layers: ["L1", "L2", "L3", "L6", "L8"],
    },
    timeline: [
      { date: "Mid-2023", label: "Lilli launches internally — built on OpenAI, grounded in McKinsey's corpus.", tone: "up" },
      { date: "Late 2023", label: "Adoption ramps. Partners start citing Lilli output in client decks.", tone: "up" },
      { date: "Mid-2024", label: "70%+ of the firm uses Lilli weekly. Becomes standard tooling.", tone: "up" },
      { date: "2025", label: "Consulting firms emerge as some of the largest enterprise LLM customers — opposite of the predicted disruption.", tone: "up" },
      { date: "2026", label: "The model layer keeps commoditizing. McKinsey's L1+L8 advantage compounds. Pure-play AI strategy startups struggle to find buyers.", tone: "up" },
    ],
    who_wins: [
      { name: "McKinsey, BCG, Bain", reason: "L1 (decades of proprietary client work) and L8 (compounding institutional memory) — the two layers AI can't reproduce." },
      { name: "OpenAI / Anthropic", reason: "Consulting firms became some of their largest enterprise customers, not their competitors." },
      { name: "Any firm with deep proprietary archives", reason: "Law firms, accounting firms, hospitals, banks — the L1+L8 pattern generalizes." },
    ],
    who_loses: [
      { name: "Pure-play AI strategy startups", reason: "No L1, no L8, no client trust. The model is the cheapest layer to own — the others are the business." },
      { name: "Junior consulting headcount (slower growth)", reason: "Drafting work compresses. The pyramid narrows. Entry-level path changes shape." },
      { name: "The 'AI will kill consulting' thesis", reason: "Falsified in real time. The opposite happened — consulting became one of the biggest beneficiaries." },
    ],
    counter_thesis: `The counter is that Lilli's moat is overstated because the *actual* output of consulting (the synthesized 60-page deck, the executive narrative, the client-relationship judgment) was always the value — not the underlying corpus. If frontier models continue to improve at long-form reasoning and synthesis, a well-prompted GPT-6 with public data may produce a McKinsey-grade strategy doc for a tenth the cost. McKinsey's corpus is large, but most of it is dated or sector-specific in ways that a generalist model can fluently approximate. The honest read: L1 protects them for 3–5 years; the open question is whether L8 (the compounding loop) can build a durable advantage before model capability closes the gap on the synthesis layer itself.`,
  },
  {
    slug: "bloomberg-gpt-vertical-fortress",
    companies: [
      { name: "Bloomberg", logo: logo("bloomberg.com"), color: "#000000" },
    ],
    tag: "VERTICAL FORTRESS",
    title: "BloombergGPT: Why a 50B-Parameter Model Beats GPT-4 in Finance",
    verdict: "L1 + L2 + L3 STACKED",
    excerpt:
      "Bloomberg trained its own 50B-parameter model on 40 years of proprietary financial data. Smaller than GPT-4. Better at finance tasks. The reason isn't the model — it's that Bloomberg owns the terminal (L4), the data (L1), the compliance posture (L3), and now the model (L2). Four layers in one regulated vertical.",
    layers: ["L1", "L2", "L3", "L4"],
    date: "April 2026",
    readTime: "8 min",
    content: `BloombergGPT is the cleanest example of vertical L1+L2 integration in the market.

**The structural play:**
- L1: 40 years of curated financial data — filings, news, pricing, transcripts. Proprietary, license-controlled.
- L2: A 50B-parameter model trained on that corpus + general web. Smaller and cheaper than GPT-4, but tuned to finance.
- L3: SEC-grade compliance, audit trails, source citation — table stakes for the buy-side.
- L4: The Bloomberg Terminal — $24K/year, 350,000+ seats, the distribution monopoly no one can replicate.

**Why generic models can't catch up.** GPT-5 may be better at general reasoning. It cannot access Bloomberg's tick data, its analyst transcripts, or its terminal install base. The model layer is necessary but not sufficient. Bloomberg owns the *other three* layers a finance customer actually pays for.

**The Cube projection:** TALL (4 layers), NARROW (finance only), DEEP (every buy-side function). This is the textbook vertical fortress.

*The lesson: in regulated verticals, the model is the cheapest layer to own. The data, the rails, and the compliance are the moat.*`,
  },
  {
    slug: "klarna-customer-service",
    companies: [
      { name: "Klarna", logo: logo("klarna.com"), color: "#FFA8CD" },
      { name: "OpenAI", logo: logo("openai.com"), color: "#10A37F" },
    ],
    tag: "L5 + L8 IN PRODUCTION",
    title: "Klarna: 700 Agents Replaced, $40M Saved — The First Honest Number on Agent Economics",
    verdict: "L5 EXECUTION + L8 MEMORY",
    excerpt:
      "Klarna's AI assistant handled 2.3M conversations in its first month — the workload of 700 human agents — with equal customer satisfaction and faster resolution. The headline is the cost. The structural story is that Klarna owned the customer data (L1), the workflow (L5), and the resolution memory (L8). The model was a commodity input.",
    layers: ["L1", "L5", "L8"],
    date: "April 2026",
    readTime: "8 min",
    valuation: {
      label: "Annual Profit Impact",
      before: "$0",
      after: "$40M",
      trend: "up",
      changeLabel: "Year 1",
    },
    content: `When Klarna disclosed that its AI assistant did the work of 700 full-time agents and added ~$40M in projected annual profit, the market read it as "OpenAI is amazing." The structural read is different.

**What Klarna actually owned:**
- L1: Every customer's transaction history, return pattern, dispute record.
- L5: The decision tree of refund/dispute/escalate — built over a decade of being a payments company.
- L8: Every resolution feeds back into the system. Month 2 is smarter than month 1.

**What OpenAI provided:** L2. Rentable. Swappable. Cheap relative to the labor it replaces.

**Law III in production.** The model is the *least* defensible part of the stack. The moat is that Klarna already had the data, the workflows, and the regulated payment context. A pure-play "AI customer service" startup with no L1 cannot reproduce this.

**The era shift.** This is Era 4 (The Workspace) arriving early in one function. AI orchestrates, a small human team supervises. Per-seat economics in support are over. Every CX SaaS priced per agent is structurally short.

*Public reporting; numbers as disclosed by Klarna.*`,
  },
  {
    slug: "devin-cognition-l7-agent",
    companies: [
      { name: "Cognition (Devin)", logo: logo("cognition.ai"), color: "#000000" },
      { name: "Cursor", logo: logo("cursor.com"), color: "#000000" },
    ],
    tag: "AGENT SURFACE RISK",
    title: "Devin at $2B: The Autonomous Coder With No Layer Beneath It",
    verdict: "L7 AGENT — EXPOSED",
    excerpt:
      "Cognition raised at $2B for Devin, the 'autonomous software engineer.' Impressive demo. Structural problem: Devin sits at L7 (agent surface) on top of someone else's L2 (Anthropic/OpenAI), with no L1, no L8, no L4. Meanwhile Cursor owns the IDE — the L4 of where code is actually written.",
    layers: ["L2", "L7"],
    date: "April 2026",
    readTime: "7 min",
    valuation: {
      label: "Cognition Valuation",
      before: "—",
      after: "$2B",
      trend: "down",
      changeLabel: "Fragile",
    },
    content: `Devin's launch was the most viral AI demo of 2024. The structural question Cognition has to answer in 2026: *what do you own that Anthropic, OpenAI, and Cursor don't?*

**The stack position:**
- L2: Rented from frontier labs. Same model anyone else can call.
- L7: A polished autonomous agent UI. Replicable.
- Missing L1: no proprietary code corpus. (GitHub belongs to Microsoft.)
- Missing L4: no IDE distribution. (Cursor and VS Code own it.)
- Missing L8: no per-developer memory loop that compounds.

**The asymmetric threat — Cursor.** Cursor sits at L4 (the IDE — where the developer already lives) and L6 (agent orchestration inside that IDE). When the agent lives where the work happens, the standalone-agent surface becomes a feature, not a product.

**Law III again.** A pure agent surface with no underlying layer is the new "GPT wrapper." Better polish. Same structural fate.

**What would save Devin.** Acquire or build L1 (a proprietary corpus of fixed bugs, refactor patterns), or get acquired by an L4 owner. Standalone, the math is hard.

*Illustrative — not investment advice.*`,
  },
  {
    slug: "perplexity-vs-google-distribution",
    companies: [
      { name: "Perplexity", logo: logo("perplexity.ai"), color: "#20B2AA" },
      { name: "Google", logo: logo("google.com"), color: "#4285F4" },
    ],
    tag: "L4 DISTRIBUTION WAR",
    title: "Perplexity vs Google: The Answer Engine vs The Default",
    verdict: "L4 EATS L7",
    excerpt:
      "Perplexity built a better answer experience. Google owns Chrome, Android, Safari's default, and the URL bar of the internet. Perplexity raised at $9B. Google shipped AI Overviews to 1.5B users in a quarter. The lesson: when the L4 owner ships your L7, you don't win by being better.",
    layers: ["L4", "L7"],
    date: "April 2026",
    readTime: "8 min",
    content: `Perplexity is technically excellent. Strategically it is fighting the hardest fight in tech: dislodging a default.

**The asymmetry:**
- Perplexity: L7 (a search surface) + partial L4 (a browser, ~1% share). Must acquire each user.
- Google: L4 (Chrome ~65%, Android default, Safari deal, the URL bar) + L7 (Search) + L2 (Gemini) + L1 (the index). Every user is already there.

**What Google did.** Shipped AI Overviews directly into the existing search results page. No download, no behavior change. 1.5B+ monthly users got a Perplexity-like experience inside the surface they were already using.

**Law III with a twist.** Yes, value migrated from the blue links (L7) to the AI answer (L6/L7). But the *L4 owner captured the migration* because the answer appeared inside their distribution. Perplexity caught the wave. Google rode it.

**Perplexity's only winning move.** Become an L4 themselves — Comet browser, partnerships, OEM deals. They know this; the question is whether default-changing friction can be overcome before runway. History says rarely.

*Public reporting; metrics approximate.*`,
  },
  {
    slug: "cursor-ide-consolidation",
    companies: [
      { name: "Cursor", logo: logo("cursor.com"), color: "#000000" },
      { name: "GitHub Copilot", logo: logo("github.com"), color: "#24292E" },
    ],
    tag: "L4 + L6 STACK",
    title: "Cursor at $9B: The IDE That Quietly Became the Most Important L4 in AI",
    verdict: "L4 + L6 + L8 RISING",
    excerpt:
      "Cursor isn't a model. It isn't an agent. It's the editor — the place developers spend 8 hours a day. By owning L4 (IDE distribution) and layering L6 (agent orchestration) and L8 (per-codebase memory) on top, Cursor has become structurally more defensible than the agents that run inside it.",
    layers: ["L4", "L6", "L8"],
    date: "April 2026",
    readTime: "8 min",
    valuation: {
      label: "Cursor Valuation",
      before: "—",
      after: "~$9B",
      trend: "up",
      changeLabel: "Compounding",
    },
    content: `Cursor's rise is the inverse of Devin's. Both build for developers. One owns the surface where work happens. The other doesn't.

**Cursor's structural position:**
- L4: The IDE itself. Forked from VS Code, but Cursor owns the relationship with the developer.
- L6: Multi-step orchestration — Composer, agents, multi-file edits.
- L8: Per-codebase memory and indexing — the more you use Cursor on your repo, the better it gets at your repo.

**Why this beats Copilot.** GitHub Copilot lives inside VS Code/JetBrains as a plugin. Cursor *is* the editor. When the L4 owner integrates orchestration and memory natively, plugins become features. Microsoft will respond (they own GitHub), but Cursor's velocity has bought it a real position.

**Why this beats Devin.** Devin runs in a browser tab no developer keeps open. Cursor runs in the window every developer keeps open all day. Distribution decides.

**The watch.** Cursor's risk is the same one Grammarly faces: a bigger L4 owner (Microsoft via GitHub + VS Code) deciding to integrate the same capabilities natively into the free editor. The race is whether Cursor compounds L8 fast enough to make that switch painful.

*Public reporting; numbers approximate.*`,
  },
  {
    slug: "anthropic-claude-enterprise-l3",
    companies: [
      { name: "Anthropic", logo: logo("anthropic.com"), color: "#D97757" },
    ],
    tag: "L3 TRUST PLAY",
    title: "Anthropic's Enterprise Wedge: Selling L3 When Everyone Else Sells L2",
    verdict: "L2 + L3 DIFFERENTIATED",
    excerpt:
      "OpenAI sells the smartest model. Anthropic sells the most *governable* one. Constitutional AI, transparency, conservative refusals, SOC 2, FedRAMP, BAAs — Claude's enterprise pitch is L3 (compliance and trust) bundled with competitive L2. In regulated buyers' procurement, L3 is the decisive layer.",
    layers: ["L2", "L3"],
    date: "April 2026",
    readTime: "7 min",
    content: `In a market where every frontier lab's L2 is roughly comparable on any given month, Anthropic has made a structural bet: differentiate on L3.

**The L3 stack:**
- Constitutional AI training methodology (a publishable, auditable approach to alignment)
- Conservative refusal posture — costs them some consumer share, wins them regulated enterprise
- SOC 2 Type II, ISO 27001, HIPAA BAA, FedRAMP in progress
- AWS Bedrock + Google Cloud integration — buyer's existing compliance perimeter

**Why this works structurally.** Enterprise procurement in banking, healthcare, and government does not buy the smartest model. It buys the model that *passes review*. L3 is where the contract is signed.

**Law II — every layer that handles intelligence is regulated by default.** Anthropic priced this in early and built the brand around it. OpenAI is now catching up (GovCloud, Enterprise tier) but lost the first-mover position in trust-led buyers.

**The bigger pattern.** L2 alone is becoming a price-war layer. L2 + L3 is a *contract-signing* layer. The premium is on governance, not raw capability.

*Public reporting.*`,
  },
  {
    slug: "adobe-firefly-licensed-data",
    companies: [
      { name: "Adobe", logo: logo("adobe.com"), color: "#FF0000" },
    ],
    tag: "L1 + L4 STACK",
    title: "Adobe Firefly: The Only Image Model an Enterprise Can Legally Use",
    verdict: "L1 + L4 DEFENSIBLE",
    excerpt:
      "Midjourney is more aesthetic. Stable Diffusion is more open. Firefly wins enterprise because Adobe trained on licensed stock — and indemnifies customers against IP lawsuits. L1 (licensed data) + L3 (legal indemnity) + L4 (Creative Cloud distribution) is the only stack that survives an enterprise legal review.",
    layers: ["L1", "L3", "L4"],
    date: "April 2026",
    readTime: "7 min",
    content: `The image-generation race looks like a model-quality race. For enterprise it is not — it is a *legal exposure* race, and Adobe is the only player who built for that.

**Adobe's structural stack:**
- L1: Adobe Stock — fully licensed, rights-cleared training data.
- L3: Customer indemnification against IP claims. Adobe pays if you get sued.
- L4: Creative Cloud — embedded in Photoshop, Illustrator, Express, where designers already work.
- L2: A model that is *good enough*, not best-in-class.

**Why "good enough" wins here.** A Fortune 500 marketing team cannot ship a campaign generated by a model trained on scraped art. Legal kills it. Firefly clears legal. Midjourney does not.

**Law II — regulation is a layer, not an afterthought.** The IP liability is a real layer of the supply chain. Whoever owns it owns the enterprise.

**The pattern beyond Adobe.** Getty Images is running the same play in stock. Shutterstock licensed its corpus to OpenAI. The "clean data" subset of L1 is becoming its own scarce asset.

*Public reporting.*`,
  },
  {
    slug: "character-ai-memory-orphan",
    companies: [
      { name: "Character.AI", logo: logo("character.ai"), color: "#3B82F6" },
      { name: "Google", logo: logo("google.com"), color: "#4285F4" },
    ],
    tag: "L8 WITHOUT L2",
    title: "Character.AI: The L8 Memory Moat That Couldn't Stand Without L2",
    verdict: "ACQUIHIRED — STRUCTURAL CAUSE",
    excerpt:
      "Character.AI had real L8 — billions of personalized conversations, deep user attachment, the largest companion-AI user base. What it didn't have: an L2 it could afford. Compute costs ate the unit economics, and Google licensed the team and tech for ~$2.7B. A clean lesson in why L8 alone, without owned L2 or a profitable L4, is a vulnerable position.",
    layers: ["L2", "L7", "L8"],
    date: "April 2026",
    readTime: "8 min",
    valuation: {
      label: "Google Deal",
      before: "$5B (last round)",
      after: "~$2.7B (license)",
      trend: "down",
      changeLabel: "Acquihire",
    },
    content: `Character.AI is the most interesting structural failure of the cycle: a real L8 moat, undone by inability to control L2 cost.

**What Character.AI built.**
- L8: Billions of conversations, persistent character memory, parasocial attachment data. Genuinely scarce.
- L7: A category-defining companion surface. Massive Gen Z DAU.
- Missing: an L2 they could run cheaply at scale. Every conversation cost real GPU money.

**Why L8 alone wasn't enough.** Without owned L2, every interaction was a cost center. Without an L4 (distribution into someone else's surface) or premium L3 (regulated B2B), monetization couldn't catch unit cost. The moat existed; the business model didn't.

**The Google outcome.** Google licensed the model and re-hired the founders. The L8 *data* — the actual memory of users' relationships with characters — largely orphaned. Users moved on.

**The lesson for L8-led plays.** Memory is the most durable layer in theory. In practice it requires either (a) owned cheap L2, (b) an L4 that subsidizes it, or (c) L3-regulated B2B pricing. Pick one before you scale.

*Public reporting; figures approximate.*`,
  },
  {
    slug: "glean-enterprise-search-fortress",
    companies: [
      { name: "Glean", logo: logo("glean.com"), color: "#9333EA" },
    ],
    tag: "L1 + L6 ENTERPRISE STACK",
    title: "Glean at $7.2B: The Enterprise Memory Layer Microsoft Was Supposed to Own",
    verdict: "L1 + L6 + L8 FORTRESS",
    excerpt:
      "Glean indexes every document, message, ticket, and meeting inside a company — then makes it queryable by AI. That index is L1 (proprietary to each customer), the orchestration is L6, and the cross-app memory is L8. Microsoft 'should' own this with Copilot. They don't, and Glean's $7.2B valuation says the market noticed.",
    layers: ["L1", "L6", "L8"],
    date: "April 2026",
    readTime: "8 min",
    valuation: {
      label: "Glean Valuation",
      before: "$2.2B (2024)",
      after: "$7.2B (2025)",
      trend: "up",
      changeLabel: "+227%",
    },
    content: `Enterprise search has been a graveyard for two decades. Glean is winning because it stopped selling search and started selling the enterprise's *L8 memory layer*.

**The structural stack:**
- L1: Per-customer, per-tenant index of every connected app — Slack, Gmail, Notion, Jira, Salesforce, Drive, Confluence, GitHub. Proprietary to each customer; not reproducible by a vendor.
- L6: Permission-aware orchestration that respects every source system's ACLs. Hard. Defensible.
- L8: A live memory of how this specific organization works — who knows what, what was decided when, what's the latest version.

**Why Microsoft Copilot hasn't crushed this.** Copilot is excellent inside the Microsoft 365 perimeter. Most enterprises live in 50+ apps, most of which are not Microsoft. Glean's neutrality across SaaS is itself a moat.

**Law III — value migrates to the scarcest layer.** A general LLM is cheap. The org's *answer* to "what did we decide about X last quarter" lives in nine systems, behind seven permission models, and nowhere else. Whoever assembles that into a single L8 wins the enterprise assistant market.

**The Cube projection:** TALL (3 layers), WIDE (cross-vertical), DEEP (every knowledge-worker function). Fortress archetype, software flavor.

*Public reporting; valuations as disclosed.*`,
  },
];
