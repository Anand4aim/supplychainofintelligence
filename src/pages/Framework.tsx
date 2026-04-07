import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";

const LAYERS = [
  {
    id: "L1", name: "Data & Knowledge", color: "var(--layer-1)", bg: "var(--layer-1-bg)",
    desc: "The foundation. What data do you have that nobody else can get?",
    detail: "Apollo, Bloomberg, proprietary datasets — the raw fuel. More agents = more demand for data. This layer gets stronger, not weaker.",
    players: ["Apollo.io", "Bloomberg", "ZoomInfo", "Clay"],
    verdict: "Structurally safe. API-first wins.",
  },
  {
    id: "L2", name: "Model & Reasoning", color: "var(--layer-2)", bg: "var(--layer-2-bg)",
    desc: "The reasoning engine. Rent early, build custom at scale if your data warrants it.",
    detail: "OpenAI, Anthropic, ElevenLabs — THE intelligence layer. Models are commoditizing fast. The frontier race is temporary; the distribution race is permanent.",
    players: ["OpenAI", "Anthropic", "Google DeepMind", "ElevenLabs"],
    verdict: "Winner-take-most. Commodity risk high.",
  },
  {
    id: "L3", name: "Trust & Governance", color: "var(--layer-3)", bg: "var(--layer-3-bg)",
    desc: "The compliance gate. Can the enterprise trust your system?",
    detail: "Permissions, compliance, audit trails — can't be automated. Regulators won't accept 'the agent did it.' SOC2, HIPAA, SOX require human accountability.",
    players: ["Vanta", "Drata", "OneTrust"],
    verdict: "Essential. More agents = more access control needed.",
  },
  {
    id: "L4", name: "Infrastructure", color: "var(--layer-4)", bg: "var(--layer-4-bg)",
    desc: "The integration layer. What systems can your agent reach?",
    detail: "AWS, Snowflake, Supabase, Twilio — the plumbing. Delivery networks, payment rails, data centers. These get MORE critical as agents proliferate.",
    players: ["AWS", "Snowflake", "Supabase", "Twilio", "Cal.com"],
    verdict: "Load-bearing walls. Invest accordingly.",
  },
  {
    id: "L5", name: "Orchestration", color: "var(--layer-5)", bg: "var(--layer-5-bg)",
    desc: "The workflow engine. How do you compose skills into multi-step processes?",
    detail: "LangChain, CrewAI — the nervous system. Automation becomes a feature inside workspaces, not a standalone product. Zapier/Make at risk.",
    players: ["LangChain", "CrewAI", "Zapier (at risk)", "Make (at risk)"],
    verdict: "Contested. Becoming a feature, not a product.",
  },
  {
    id: "L6", name: "Domain Skills", color: "var(--layer-6)", bg: "var(--layer-6-bg)",
    desc: "What domain expertise is encoded as agent behavior?",
    detail: "Harvey (legal), Sierra (CX), 11x (sales) — encoded expertise. The companies that encode deep domain knowledge into agent behavior build structural moats.",
    players: ["Harvey", "Sierra", "11x", "Cursor"],
    verdict: "Durable if deep. Thin wrappers die.",
  },
  {
    id: "L7", name: "Expression & Surfaces", color: "var(--layer-7)", bg: "var(--layer-7-bg)",
    desc: "How and where does the user meet the intelligence?",
    detail: "ChatGPT, Gemini, voice, embedded UIs — commoditizing fast. If your entire product is one prompt away from being a free feature, you are already dead.",
    players: ["ChatGPT", "Gemini", "Copilot", "Gamma (dying)"],
    verdict: "Danger zone. Commoditizing rapidly.",
  },
  {
    id: "L8", name: "Memory & Learning", color: "var(--layer-8)", bg: "var(--layer-8-bg)",
    desc: "What does the system remember and compound over time?",
    detail: "Personal context, feedback loops — the ultimate lock-in. Sierra learns from every resolution. Salesforce doesn't. Memory = lock-in = pricing power.",
    players: ["Sierra", "Notion (partial)", "Rewind AI"],
    verdict: "The ultimate moat. Memory that compounds wins.",
  },
];

const LAWS = [
  {
    num: "I",
    title: "The Creator Cannot Be the Gatekeeper",
    desc: "When one entity controls both intelligence (L2) and trust (L3), credibility degrades. Google is both AI and advertiser — Gemini's recommendations will always be suspect.",
    prediction: "Tells you WHAT can't be vertically integrated.",
  },
  {
    num: "II",
    title: "Memory That Doesn't Learn Isn't Intelligence",
    desc: "L8 must feed back into L6. A system that remembers but doesn't improve is just a database with a chat UI. Sierra learns from every resolution. Salesforce doesn't.",
    prediction: "Tells you WHO captures long-term value.",
  },
  {
    num: "III",
    title: "Value Migrates to the Scarcest Layer",
    desc: "When a layer commoditizes, value transfers to adjacent scarce layers. Models commoditize → data wins. Surfaces commoditize → memory wins.",
    prediction: "Tells you WHERE value is going.",
  },
];

const FrameworkPage = () => (
  <SiteLayout>
    {/* Hero */}
    <section className="bg-navy">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">The Framework</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
            The Supply Chain of Intelligence™
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Every AI company maps to one or more of 8 structural layers. Where you sit determines whether you survive — 
            not your features, not your funding, not your UI.
          </p>
        </motion.div>
      </div>
    </section>

    {/* The 8 Layers */}
    <section className="bg-card">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">The 8 Layers</p>
        <h2 className="font-display text-3xl font-bold text-foreground mb-10">Where Does Your Company Sit?</h2>

        <div className="space-y-4">
          {LAYERS.map((layer, i) => (
            <motion.details
              key={layer.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-border overflow-hidden"
            >
              <summary
                className="flex items-center gap-4 cursor-pointer p-5 hover:bg-secondary/50 transition"
                style={{ borderLeft: `5px solid hsl(${layer.color})` }}
              >
                <span className="font-display text-2xl font-bold min-w-[40px]" style={{ color: `hsl(${layer.color})` }}>
                  {layer.id}
                </span>
                <div className="flex-1">
                  <span className="font-body text-base font-semibold text-foreground">{layer.name}</span>
                  <span className="block text-sm text-muted-foreground mt-0.5">{layer.desc}</span>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-5 pt-2 ml-[60px] border-t border-border">
                <p className="text-sm text-foreground leading-relaxed mb-4">{layer.detail}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {layer.players.map((p) => (
                    <span key={p} className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-foreground">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: `hsl(${layer.color})` }}>
                  {layer.verdict}
                </p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>

    {/* Intelligence Cube */}
    <section id="cube" className="bg-navy">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">The Intelligence Cube™</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            8 Functions × 8 Verticals × 8 Layers
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mb-10">
            Volume in the Cube = Structural Durability. Height is layers, width is functions, depth is verticals. 
            Thin slivers die. Tall fortresses survive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sierra - Fortress */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏰</span>
                <h3 className="font-display text-xl font-bold text-white">Sierra = FORTRESS</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Customer Care × 4 verticals × 3 layers (L1 + L6 + L8). Memory compounds. 
                Volume = massive. Hard to displace. Structurally durable.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["L1", "L6", "L8"].map((l) => {
                  const n = parseInt(l.replace("L", ""));
                  return (
                    <span key={l} className="text-xs font-bold px-2.5 py-1 rounded" style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg) / 0.2)` }}>
                      {l}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Gamma - Thin */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💀</span>
                <h3 className="font-display text-xl font-bold text-white">Gamma ($2.1B) = DEAD</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Product + PM × cross-industry × L7 surface only. No data, no doctrine, no memory. 
                Just a wrapper. Claude, Copilot, Gemini do this for free. → $0.
              </p>
              <div className="flex gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded" style={{ color: "hsl(var(--layer-7))", background: "hsl(var(--layer-7-bg) / 0.2)" }}>
                  L7 only
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Three Laws */}
    <section id="laws" className="bg-card">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">Three Structural Laws</p>
        <h2 className="font-display text-3xl font-bold text-foreground mb-10">The Laws That Predict the Future</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LAWS.map((law, i) => (
            <motion.div
              key={law.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-xl p-8"
            >
              <div className="font-display text-5xl font-black text-indigo mb-4">{law.num}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{law.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{law.desc}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo">{law.prediction}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Six Archetypes */}
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">Company Archetypes</p>
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Six Fates of SaaS</h2>
        <p className="text-muted-foreground max-w-3xl mb-10">Every SaaS company alive today fits one of these patterns. Each has a strategy, a structural position, and a fate.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Data Refineries", status: "safe", desc: "L1 — Proprietary data compounds. Apollo, Bloomberg. More agents = more demand.", color: "var(--layer-1)" },
            { title: "Infrastructure Rails", status: "safe", desc: "L3/L4 — Essential pipes. Supabase, Cal.com, Twilio. Agent backends.", color: "var(--layer-4)" },
            { title: "Workflow Fortresses", status: "contested", desc: "L5+L6 — Salesforce, HubSpot. Too embedded to replace. Switching cost buys 3-5 years.", color: "var(--layer-5)" },
            { title: "Domain Specialists", status: "safe", desc: "L6 deep — Harvey, Sierra. Encoded expertise + memory loops = structural moat.", color: "var(--layer-6)" },
            { title: "Thin-Layer Graveyard", status: "dead", desc: "L6a/L7a — Gamma, Jasper, Chegg. One prompt from free. Already dead.", color: "var(--layer-3)" },
            { title: "Full-Stack Juggernauts", status: "dominant", desc: "L2+L7+L8 — Claude, ChatGPT, Gemini, Copilot. The last interfaces.", color: "var(--layer-8)" },
          ].map((arch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-6"
              style={{ borderLeft: `4px solid hsl(${arch.color})` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-display text-base font-bold text-foreground">{arch.title}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  arch.status === "safe" ? "bg-green-100 text-green-700" :
                  arch.status === "contested" ? "bg-yellow-100 text-yellow-700" :
                  arch.status === "dead" ? "bg-red-100 text-red-700" :
                  "bg-indigo/10 text-indigo"
                }`}>
                  {arch.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{arch.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-navy text-center">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          Do you know where YOU sit in the stack?
        </h2>
        <p className="text-white/60 mb-6">Book a workshop to map your company's structural position.</p>
        <a href="/speaking" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition">
          Book a Workshop <ArrowRight size={18} />
        </a>
      </div>
    </section>
  </SiteLayout>
);

export default FrameworkPage;
