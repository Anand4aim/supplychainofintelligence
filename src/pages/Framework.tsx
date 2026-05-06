import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LAYERS, DEFENSIBLE_TRIANGLE, GOLD_KEY_INSIGHT } from "@/data/layers";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import {
  SketchFilters,
  SketchBoard,
  SketchArrow,
  SketchBox,
  SketchLabel,
} from "@/components/sketch/SketchElements";

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
    <SketchFilters />

    {/* Hero */}
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-sketch text-lg font-bold text-accent mb-6">— The Framework</p>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-6">
            The Supply Chain of Intelligence™
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Follow the gold from the ground to the person wearing the ring — and you'll see every layer 
            of the intelligence stack. 10 layers. 50 sublayers. One structural map.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border sketch-border">
            <span className="font-sketch text-base text-muted-foreground">Defensible Triangle:</span>
            <span className="font-sketch text-base text-accent font-bold">{DEFENSIBLE_TRIANGLE}</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* THE GOLD MINING ANALOGY */}
    <section className="bg-secondary/30 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="font-sketch text-lg font-bold text-accent mb-4">
            — Why We Call It a Supply Chain
          </p>
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-foreground mb-4">
            From Gold in the Ground to the Ring on Your Finger
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every layer transforms the output of the layer below it. Most companies only own one layer. 
            The supply chain is only as strong as its weakest link.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[39px] md:left-[47px] top-0 bottom-0 w-px bg-border z-0" />

          <div className="space-y-1">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.id}
                id={layer.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="relative z-10"
              >
                <div
                  className="flex gap-0 rounded-xl overflow-hidden border border-border bg-card sketch-border"
                  style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${layer.color})` }}
                >
                  <div
                    className="flex flex-col items-center justify-center px-4 py-5 min-w-[78px] md:min-w-[94px]"
                    style={{ background: `hsl(${layer.bg})` }}
                  >
                    <SketchIcon name={layer.goldIcon} size={36} className="mb-1" />
                    <span className="font-sketch text-xl font-bold" style={{ color: `hsl(${layer.color})` }}>
                      {layer.id}
                    </span>
                    <span className="font-sketch text-xs font-bold mt-0.5" style={{ color: `hsl(${layer.color})` }}>
                      {layer.shortName}
                    </span>
                  </div>

                  <div className="flex-1 py-4 px-5 md:px-6">
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-1.5">
                      {layer.goldTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {layer.goldAnalogy}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {layer.sublayers.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 sketch-border"
                          style={{
                            background: sub.defensible ? `hsl(${layer.bg})` : `hsl(${layer.bg} / 0.4)`,
                            border: sub.defensible ? `1.5px solid hsl(${layer.color} / 0.35)` : "1.5px solid transparent",
                          }}
                        >
                          <span className="font-sketch text-sm font-bold whitespace-nowrap mt-0.5" style={{ color: `hsl(${layer.color})` }}>
                            {sub.id}{sub.defensible ? " ★" : ""}
                          </span>
                          <div className="min-w-0">
                            <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                            <p className="text-xs text-muted-foreground leading-snug mt-0.5">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/50">
                      {layer.players.map((p) => (
                        <span key={p} className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {p}
                        </span>
                      ))}
                      <span className="font-sketch text-sm font-bold uppercase tracking-wider ml-auto" style={{ color: `hsl(${layer.color})` }}>
                        {layer.verdict}
                      </span>
                    </div>
                  </div>
                </div>

                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown size={14} className="text-muted-foreground/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <SketchBoard className="p-6 md:p-8">
              <p className="text-base text-foreground leading-relaxed">
                <span className="font-sketch text-xl font-bold text-sketch-red">← Key insight: </span>
                {GOLD_KEY_INSIGHT}
              </p>
            </SketchBoard>
          </motion.div>
        </div>
      </div>
    </section>

    {/* DEFENSIBLE TRIANGLE */}
    <section className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <p className="font-sketch text-lg font-bold text-accent mb-4">— One Path to Survival: The Defensible Triangle</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            One Common Pattern — Not the Only Way to Win
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            The Triangle (L1b + L5a/b/d + L8c/d/e) is the most common fortress pattern for
            application-layer companies. But it isn't the only way to survive. A pure
            gatekeeper like <span className="font-semibold text-foreground">Vanta</span> wins
            on L3 alone. A shovel-seller like <span className="font-semibold text-foreground">NVIDIA</span> wins
            on L0. A pipes-owner like <span className="font-semibold text-foreground">Snowflake</span> wins
            on L4. Owning one layer <em>deeply</em> can be enough — what kills you is owning a
            thin sliver of a contested one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { id: "L1b", name: "Proprietary Data", layer: "L1", desc: "Data behind enterprise walls. No one else has it. This is your gold deposit — the deeper the vein, the stronger the moat." },
              { id: "L5a/b/d", name: "Deep Skills & Playbooks", layer: "L5", desc: "Domain execution, decision frameworks, company SOPs. The encoded expertise that transforms generic intelligence into irreplaceable capability." },
              { id: "L8c/d/e", name: "Compounding Memory", layer: "L8", desc: "Network learning, institutional knowledge, world models. The system gets smarter with every interaction. This is lock-in that compounds daily." },
            ].map((item, i) => {
              const n = parseInt(item.layer.replace("L", ""));
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-6 text-left sketch-border" style={{ borderTop: `3px solid hsl(var(--layer-${n}))` }}>
                  <span className="font-sketch text-sm font-bold px-2.5 py-1 rounded inline-block mb-3" style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}>
                    {item.id} ★
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="font-sketch text-base text-muted-foreground mt-8 max-w-xl mx-auto italic">
            If you own all three, you're a fortress. If you own none, you're in the graveyard. 
            Most companies own one — and that determines their timeline.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Intelligence Cube */}
    <section id="cube" className="bg-secondary/30 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="font-sketch text-lg font-bold text-accent mb-4">— The Intelligence Cube™</p>
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-foreground mb-6">
            9 Functions × 9 Verticals × 10 Layers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            Volume in the Cube = Structural Durability. Height is layers, width is functions, depth is verticals.
            Thin slivers die. Tall fortresses survive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 sketch-border verdict-fortified">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏰</span>
                <h3 className="font-display text-xl font-bold text-foreground">Sierra = FORTRESS</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Customer Care × 4 verticals × 3 layers (L1b + L5b + L8c). Memory compounds.
                Volume = massive. Hard to displace.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["L1b ★", "L5a ★", "L8c ★"].map((l) => (
                  <span key={l} className="font-sketch text-sm font-bold px-2.5 py-1 rounded-md bg-verdict-fortified/10 text-verdict-fortified">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 sketch-border verdict-exposed">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💀</span>
                <h3 className="font-display text-xl font-bold text-foreground">Gamma ($2.1B) = DEAD</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Product + PM × cross-industry × L7a only. No proprietary data, no playbooks,
                no memory. Just a display case.
              </p>
              <div className="flex gap-2">
                <span className="font-sketch text-sm font-bold px-2.5 py-1 rounded-md bg-verdict-exposed/10 text-verdict-exposed">
                  L7a only — no ★
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Three Laws */}
    <section id="laws" className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-sketch text-lg font-bold text-accent mb-4">— Three Structural Laws</p>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-10">The Laws That Predict the Future</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LAWS.map((law, i) => (
            <motion.div
              key={law.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 sketch-border"
            >
              <div className="font-sketch text-5xl font-bold text-accent mb-4">{law.num}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{law.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{law.desc}</p>
              <p className="font-sketch text-sm font-bold text-accent">{law.prediction}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Six Archetypes */}
    <section className="bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-sketch text-lg font-bold text-accent mb-4">— Company Archetypes</p>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-4">The Six Fates of SaaS</h2>
        <p className="text-muted-foreground max-w-3xl mb-10">Every SaaS company fits one of these patterns.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Data Refineries", status: "safe", desc: "L1b ★ — Proprietary data compounds. Apollo, Bloomberg.", color: "var(--layer-1)", verdict: "fortified" },
            { title: "Infrastructure Rails", status: "safe", desc: "L4b/L4e ★ — Essential pipes & agent identity. Supabase, Twilio.", color: "var(--layer-4)", verdict: "fortified" },
            { title: "Workflow Fortresses", status: "contested", desc: "L5+L6b ★ — Salesforce, HubSpot. Agent loops + human-in-loop.", color: "var(--layer-5)", verdict: "consolidating" },
            { title: "Domain Specialists", status: "safe", desc: "L5a/b/d ★ + L8c ★ — Harvey, Sierra. Encoded expertise.", color: "var(--layer-5)", verdict: "fortified" },
            { title: "Thin-Layer Graveyard", status: "dead", desc: "L7a/L7b — no ★. Gamma, Jasper, Chegg. Already dead.", color: "var(--layer-3)", verdict: "exposed" },
            { title: "Full-Stack Juggernauts", status: "dominant", desc: "L2a+L7c/d ★+L8c ★ — Claude, ChatGPT, Copilot.", color: "var(--layer-8)", verdict: "dominant" },
          ].map((arch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-card border border-border rounded-xl p-6 sketch-border verdict-${arch.verdict}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-display text-base font-bold text-foreground">{arch.title}</h3>
                <span className={`font-sketch text-sm font-bold px-2 py-0.5 rounded-full ${
                  arch.status === "safe" ? "bg-verdict-fortified/10 text-verdict-fortified" :
                  arch.status === "contested" ? "bg-verdict-consolidating/10 text-verdict-consolidating" :
                  arch.status === "dead" ? "bg-verdict-exposed/10 text-verdict-exposed" :
                  "bg-accent/10 text-accent"
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
    <section className="bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          Go Deeper
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          Read real case studies analyzed through the framework, or bring it to your team.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/analysis" className="btn-sketch">
            Case Studies <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default FrameworkPage;