import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, Clock } from "lucide-react";

const ARTICLES = [
  {
    slug: "gamma-thin-layer-graveyard",
    tag: "ARCHETYPE ANALYSIS",
    title: "Gamma at $2.1B: A Thin-Layer Graveyard Case Study",
    excerpt: "Presentation generation sits at L6a+L7a — a thin slice of the stack. Claude, Copilot, and Gemini now do it for free. The Intelligence Cube™ predicted this before the market did.",
    layers: ["L6", "L7"],
    date: "March 2026",
    readTime: "8 min",
    content: `When Gamma raised at a $2.1B valuation, the market saw a hot AI startup. The Supply Chain of Intelligence™ saw a company occupying a single thin layer — L7 (Expression & Surfaces) — with no structural depth.

**The Cube Analysis:**
- Functions: Product + PM only (2/8)
- Verticals: Cross-industry (generic)
- Layers: L7 surface only (1/8)
- Volume: Minimal. Structurally fragile.

**What happened:** Claude, Copilot, and Gemini all added presentation generation as a FREE feature. When your entire product is one prompt away from being free, you are already dead.

**Law III in action:** Value migrated from the surface layer (L7) to the model layer (L2) and memory layer (L8). Gamma owned neither.

**The lesson:** If your Cube volume is a thin sliver, you're in the graveyard. The market just hasn't buried you yet.`,
  },
  {
    slug: "apollo-structurally-safe",
    tag: "STRUCTURAL LAW III",
    title: "Where Does Apollo.io Sit? And Why It's Structurally Safe",
    excerpt: "Proprietary data (L1b) is the scarcest layer. Apollo went headless, API-first. When models and surfaces commoditize around it, the data layer gets stronger, not weaker.",
    layers: ["L1"],
    date: "March 2026",
    readTime: "7 min",
    content: `Apollo.io sits at L1b — proprietary data. 275 million contacts. Headless API + MCP connector. This is the structural definition of "safe."

**Why Law III protects Apollo:**
When models (L2) commoditize, every agent needs data. When surfaces (L7) commoditize, every interface needs enrichment. The scarcer the data, the more valuable it becomes.

**The key move:** Apollo went API-first. They're not selling a dashboard — they're selling fuel. More agents = more demand for fuel.

**Compare to ZoomInfo:** Same layer (L1), but ZoomInfo charges premium for a UI wrapper on increasingly commodity data. The UI tax is a liability when agents don't need UIs.

**The verdict:** Data refineries are the safest position in the stack. But only if you go headless.`,
  },
  {
    slug: "five-eras-of-software",
    tag: "THE FIVE ERAS",
    title: "From Dashboard to Skill Hire: The Evolution of Software",
    excerpt: "We're in Era 3 — The Dialogue. By 2028, agents ARE the workers. Your roadmap needs both the customer axis and the depth axis to survive the transition.",
    layers: ["L5", "L6", "L7"],
    date: "March 2026",
    readTime: "10 min",
    content: `Software has evolved through five distinct eras, and most product leaders are still building for Era 2.

**Era 1 (1999–2015): The Dashboard** — Software shows data. Human decides.
**Era 2 (2015–2023): The Workflow** — Software guides. Human executes.
**Era 3 (2023–Now): The Dialogue** — Human directs. AI builds. ← WE ARE HERE
**Era 4 (2026–2028): The Workspace** — AI orchestrates. Human supervises.
**Era 5 (2028+): The Skill Hire** — Agent IS the worker. Human strategizes.

**The product leader's dilemma:** You've mastered the Y-axis (customer depth via JTBD). But in the AI era, you also need the Z-axis — infrastructure depth. The Supply Chain of Intelligence™ gives you that Z-axis.

**Why this matters for roadmaps:** A traditional PM says "what does the customer need?" A structural PM also asks "can we own this layer in 2 years?" Both axes are now required.`,
  },
  {
    slug: "chegg-collapse-law-iii",
    tag: "CASUALTY REPORT",
    title: "Chegg: $12B to 99% Collapse — Law III in Real Time",
    excerpt: "Generic content at L6a was the most commoditizable layer in the stack. ChatGPT didn't kill Chegg — structural inevitability did. The law predicted it.",
    layers: ["L6", "L8"],
    date: "March 2026",
    readTime: "6 min",
    content: `Chegg's collapse from $12B to near-zero isn't a surprise if you understand Law III: Value Migrates to the Scarcest Layer.

**Chegg's position:** L6a — generic educational content. No proprietary data (L1). No memory loops (L8). No compliance moat (L3). Just content that any LLM can generate.

**The structural problem:** When ChatGPT arrived, it didn't just compete with Chegg — it made Chegg's entire layer free. Generic content is the opposite of scarce.

**What Chegg should have done:** Migrate value to L8 (Memory & Learning) — personalized tutoring that remembers each student's progress, weaknesses, and learning style. That's scarce. That's defensible.

**The law is clear:** If your layer isn't scarce, your value will migrate to whoever's layer is.`,
  },
  {
    slug: "sierra-memory-moat",
    tag: "DEEP DIVE",
    title: "Sierra's Memory Moat: Why L8 Is the Ultimate Lock-In",
    excerpt: "Sierra learns from every customer resolution. Salesforce doesn't. This single architectural difference determines who captures the next decade of enterprise value.",
    layers: ["L1", "L6", "L8"],
    date: "March 2026",
    readTime: "9 min",
    content: `Sierra occupies the most structurally durable position in customer experience: L1 (customer data) + L6 (domain skills) + L8 (memory that compounds).

**The memory advantage:** Every customer interaction makes Sierra smarter. It remembers resolution patterns, customer preferences, and edge cases. This creates a compounding data moat that grows with usage.

**Compare to Salesforce:** Agentforce is impressive, but Salesforce's architecture doesn't compound. It stores data but doesn't learn from it. Law II states: "Memory that doesn't learn isn't intelligence."

**The Cube view:** Sierra is TALL — multiple layers, focused verticals, deep functions. This is the fortress pattern. Gamma is THIN — single layer, broad but shallow. One survives. One doesn't.

**For product leaders:** Ask yourself — does your system get smarter with every interaction? If not, you're building a database with a chat UI.`,
  },
  {
    slug: "ai-platform-tax",
    tag: "PRICING EVOLUTION",
    title: "The AI Platform Tax: The Next $100B Revenue Model",
    excerpt: "Per-seat pricing is dead. AI replaces seats. The future is per-outcome, per-consumption, or the platform tax — whoever owns the agent surface extracts a commission.",
    layers: ["L7"],
    date: "March 2026",
    readTime: "7 min",
    content: `The precedent is clear: Apple's App Store takes 30% of every sale. Google Ads takes a cut of every click. These are L7 surface taxes.

**The AI version:** AI agents become the primary surface for work. They recommend tools, trigger workflows, execute tasks. Whoever owns the agent surface (L7e) extracts a tax on every outcome.

**Why per-seat dies:** AI replaces seats. Better AI = fewer humans = less revenue. This is self-defeating. The companies that charge per-seat in an agent world are pricing themselves into irrelevance.

**The three models that survive:**
1. Per-outcome (Sierra) — charge for resolutions, not seats
2. Per-consumption (tokens) — charge for usage, not access  
3. Platform tax (L7e commission) — take a cut of every agent-mediated transaction

**Microsoft's play:** M365 E7 at $99/seat uses Anthropic + OpenAI models. The governance layer is the product. They're betting enterprise inertia wins.

**The prediction:** This is the next $100B revenue model. The question is who captures it.`,
  },
];

const AnalysisPage = () => (
  <SiteLayout>
    <section className="bg-navy">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">Analysis</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
            Through the Lens of the Stack
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Every company analyzed through the 8 layers, the Intelligence Cube™, and the Three Structural Laws. 
            Not opinions — structural analysis.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="bg-card">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-border pb-8 last:border-0"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="font-body text-[10px] font-semibold uppercase tracking-[2px] text-indigo">{article.tag}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} /> {article.readTime}
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 hover:text-indigo transition-colors cursor-pointer">
                {article.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {article.layers.map((l) => {
                    const n = parseInt(l.replace("L", ""));
                    return (
                      <span
                        key={l}
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}
                      >
                        {l}
                      </span>
                    );
                  })}
                </div>
                <span className="text-xs text-indigo font-medium flex items-center gap-1 ml-auto cursor-pointer hover:gap-2 transition-all">
                  Read analysis <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter CTA */}
    <section className="bg-background border-t border-border">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Get the weekly analysis</h2>
        <p className="text-muted-foreground text-sm mb-6">
          One company, one framework, one structural verdict. Every week.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Coming soon!"); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@company.com"
            required
            className="flex-1 px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50"
          />
          <button type="submit" className="px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </SiteLayout>
);

export default AnalysisPage;
