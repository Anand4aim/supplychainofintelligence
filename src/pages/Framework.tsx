import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";
import { LAYERS, DEFENSIBLE_TRIANGLE } from "@/data/layers";

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
    desc: "L8 must feed back into L5. A system that remembers but doesn't improve is just a database with a chat UI. Sierra learns from every resolution. Salesforce doesn't.",
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
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Every AI company maps to one or more of 9 structural layers (L0–L8), with 32+ sub-layers.
            Where you sit determines whether you survive — not your features, not your funding, not your UI.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">Defensible Triangle:</span>
            <span className="text-xs text-indigo font-bold">{DEFENSIBLE_TRIANGLE}</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* The 9 Layers with Sublayers */}
    <section className="bg-card">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">9 Layers · 32+ Sub-Layers</p>
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">Where Does Your Company Sit?</h2>
        <p className="text-sm text-muted-foreground mb-10">★ = defensible, invest here</p>

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
                <span className="text-xs text-muted-foreground hidden sm:block">{layer.sublayers.length} sub-layers</span>
                <ArrowRight size={16} className="text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-5 pt-2 border-t border-border">
                <p className="text-sm text-foreground leading-relaxed mb-5 ml-[56px]">{layer.detail}</p>

                {/* Sublayers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 ml-[56px]">
                  {layer.sublayers.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-start gap-3 rounded-lg px-4 py-3 border"
                      style={{
                        borderColor: sub.defensible ? `hsl(${layer.color} / 0.4)` : undefined,
                        background: sub.defensible ? `hsl(${layer.bg} / 0.5)` : undefined,
                      }}
                    >
                      <div className="flex items-center gap-1.5 min-w-[52px]">
                        <span className="text-xs font-bold" style={{ color: `hsl(${layer.color})` }}>
                          {sub.id}
                        </span>
                        {sub.defensible && <span className="text-xs" style={{ color: `hsl(${layer.color})` }}>★</span>}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{sub.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Players + Verdict */}
                <div className="ml-[56px] flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {layer.players.map((p) => (
                      <span key={p} className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-foreground">
                        {p}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider ml-auto" style={{ color: `hsl(${layer.color})` }}>
                    {layer.verdict}
                  </span>
                </div>
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
            8 Functions × 8 Verticals × 9 Layers
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mb-10">
            Volume in the Cube = Structural Durability. Height is layers, width is functions, depth is verticals.
            Thin slivers die. Tall fortresses survive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏰</span>
                <h3 className="font-display text-xl font-bold text-white">Sierra = FORTRESS</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Customer Care × 4 verticals × 3 layers (L1 + L5 + L8). Memory compounds.
                Volume = massive. Hard to displace. Structurally durable.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["L1", "L5", "L8"].map((l) => {
                  const n = parseInt(l.replace("L", ""));
                  return (
                    <span key={l} className="text-xs font-bold px-2.5 py-1 rounded" style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg) / 0.2)` }}>
                      {l}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💀</span>
                <h3 className="font-display text-xl font-bold text-white">Gamma ($2.1B) = DEAD</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Product + PM × cross-industry × L7a surface only. No data, no doctrine, no memory.
                Just a wrapper. Claude, Copilot, Gemini do this for free. → $0.
              </p>
              <div className="flex gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded" style={{ color: "hsl(var(--layer-7))", background: "hsl(var(--layer-7-bg) / 0.2)" }}>
                  L7a only
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
            { title: "Domain Specialists", status: "safe", desc: "L5 deep — Harvey, Sierra. Encoded expertise + memory loops = structural moat.", color: "var(--layer-5)" },
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
