import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LAYERS, DEFENSIBLE_TRIANGLE, GOLD_KEY_INSIGHT } from "@/data/layers";

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
            Follow the gold from the ground to the person wearing the ring — and you'll see every layer 
            of the intelligence stack. 9 layers. 32+ sub-layers. One structural map.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">Defensible Triangle:</span>
            <span className="text-xs text-indigo font-bold">{DEFENSIBLE_TRIANGLE}</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ═══════ THE GOLD MINING ANALOGY ═══════ */}
    <section className="bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">
            Why We Call It a Supply Chain
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            From Gold in the Ground to the Ring on Your Finger
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every layer transforms the output of the layer below it. Most companies only own one layer. 
            The supply chain is only as strong as its weakest link.
          </p>
        </div>

        {/* The gold journey — vertical visual */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[39px] md:left-[47px] top-0 bottom-0 w-px bg-border z-0" />

          <div className="space-y-1">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="relative z-10"
              >
                <div
                  className="flex gap-0 rounded-xl overflow-hidden border border-border bg-background"
                  style={{ borderLeftWidth: "5px", borderLeftColor: `hsl(${layer.color})` }}
                >
                  {/* Layer ID column */}
                  <div
                    className="flex flex-col items-center justify-center px-4 py-5 min-w-[78px] md:min-w-[94px]"
                    style={{ background: `hsl(${layer.bg} / 0.5)` }}
                  >
                    <span className="text-2xl mb-1">{layer.goldIcon}</span>
                    <span
                      className="font-display text-xl font-bold"
                      style={{ color: `hsl(${layer.color})` }}
                    >
                      {layer.id}
                    </span>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider mt-0.5"
                      style={{ color: `hsl(${layer.color})` }}
                    >
                      {layer.shortName}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-4 px-5 md:px-6">
                    {/* Gold analogy title + description */}
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-1.5">
                      {layer.goldTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {layer.goldAnalogy}
                    </p>

                    {/* ═══ SUBLAYERS — the real meat ═══ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {layer.sublayers.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-start gap-2.5 rounded-lg px-3 py-2.5"
                          style={{
                            background: sub.defensible
                              ? `hsl(${layer.bg} / 0.6)`
                              : `hsl(${layer.bg} / 0.2)`,
                            border: sub.defensible
                              ? `1.5px solid hsl(${layer.color} / 0.35)`
                              : "1.5px solid transparent",
                          }}
                        >
                          <span
                            className="text-xs font-bold whitespace-nowrap mt-0.5"
                            style={{ color: `hsl(${layer.color})` }}
                          >
                            {sub.id}{sub.defensible ? " ★" : ""}
                          </span>
                          <div className="min-w-0">
                            <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                            <p className="text-xs text-muted-foreground leading-snug mt-0.5">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Players + verdict */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/50">
                      {layer.players.map((p) => (
                        <span key={p} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-foreground">
                          {p}
                        </span>
                      ))}
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider ml-auto"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.verdict}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow between layers */}
                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown size={14} className="text-muted-foreground/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Key insight callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-navy rounded-xl p-6 md:p-8"
          >
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              <span className="text-yellow-400 font-bold">The key insight: </span>
              {GOLD_KEY_INSIGHT}
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ═══════ DEFENSIBLE TRIANGLE ═══════ */}
    <section className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">
            The Defensible Triangle
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Three Sub-Layers That Determine Survival
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                id: "L1b", name: "Proprietary Data", layer: "L1",
                desc: "Data behind enterprise walls. No one else has it. This is your gold deposit — the deeper the vein, the stronger the moat.",
              },
              {
                id: "L5b/c/d", name: "Deep Skills & Playbooks", layer: "L5",
                desc: "Domain execution, mindset frameworks, company SOPs. The encoded expertise that transforms generic intelligence into irreplaceable capability.",
              },
              {
                id: "L8c/d", name: "Compounding Memory", layer: "L8",
                desc: "Cross-customer patterns and institutional knowledge. The system gets smarter with every interaction. This is lock-in that compounds daily.",
              },
            ].map((item, i) => {
              const n = parseInt(item.layer.replace("L", ""));
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 text-left"
                  style={{ borderTop: `4px solid hsl(var(--layer-${n}))` }}
                >
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded inline-block mb-3"
                    style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}
                  >
                    {item.id} ★
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-8 max-w-xl mx-auto italic">
            If you own all three, you're a fortress. If you own none, you're in the graveyard. 
            Most companies own one — and that determines their timeline.
          </p>
        </motion.div>
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
                Customer Care × 4 verticals × 3 layers (L1b + L5b + L8c). Memory compounds.
                Volume = massive. Hard to displace. Owns the Defensible Triangle.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["L1b ★", "L5b ★", "L8c ★"].map((l) => (
                  <span key={l} className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💀</span>
                <h3 className="font-display text-xl font-bold text-white">Gamma ($2.1B) = DEAD</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Product + PM × cross-industry × L7a only. No proprietary data (L1b), no playbooks (L5d),
                no memory (L8c). Just a display case. Claude, Copilot, Gemini do this for free.
              </p>
              <div className="flex gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-500/20 text-red-400">
                  L7a only — no ★
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
        <p className="text-muted-foreground max-w-3xl mb-10">Every SaaS company fits one of these patterns. Each has a strategy, a structural position, and a fate.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Data Refineries", status: "safe", desc: "L1b ★ — Proprietary data compounds. Apollo, Bloomberg. More agents = more demand.", color: "var(--layer-1)" },
            { title: "Infrastructure Rails", status: "safe", desc: "L3/L4b ★ — Essential pipes. Supabase, Twilio. Deep integration switching costs.", color: "var(--layer-4)" },
            { title: "Workflow Fortresses", status: "contested", desc: "L5+L6b ★ — Salesforce, HubSpot. Agent loops + playbooks. Switching cost buys 3-5 years.", color: "var(--layer-5)" },
            { title: "Domain Specialists", status: "safe", desc: "L5b/c/d ★ + L8c ★ — Harvey, Sierra. Encoded expertise + compounding memory = fortress.", color: "var(--layer-5)" },
            { title: "Thin-Layer Graveyard", status: "dead", desc: "L6a/L7a — no ★ positions. Gamma, Jasper, Chegg. One prompt from free. Already dead.", color: "var(--layer-3)" },
            { title: "Full-Stack Juggernauts", status: "dominant", desc: "L2a+L7d/e ★+L8c ★ — Claude, ChatGPT, Copilot. Own the smelter AND the memory.", color: "var(--layer-8)" },
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
        <p className="text-white/60 mb-6">Book a workshop to map your company's structural position across all 32+ sub-layers.</p>
        <a href="/speaking" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition">
          Book a Workshop <ArrowRight size={18} />
        </a>
      </div>
    </section>
  </SiteLayout>
);

export default FrameworkPage;
