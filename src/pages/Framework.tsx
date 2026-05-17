import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LAYERS, DEFENSIBLE_TRIANGLE, GOLD_KEY_INSIGHT, LAWS } from "@/data/layers";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import {
  SketchFilters,
  SketchBoard,
  SketchArrow,
  SketchBox,
  SketchLabel,
} from "@/components/sketch/SketchElements";
import Eyebrow from "@/components/Eyebrow";

const layerSlug = (id: string, shortName: string) =>
  `${id.toLowerCase()}-${shortName.toLowerCase().replace(/\s+/g, "-")}`;

const FrameworkPage = () => (
  <SiteLayout>
    <Seo
      title="The Framework — 10 Layers of the Supply Chain of Intelligence"
      description="The full breakdown: 10 layers, 50 sublayers, 3 structural laws, and the Defensible Triangle. Where AI value is created, captured, and defended."
      path="/framework"
    />
    <SketchFilters />

    {/* Hero */}
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Eyebrow className="mb-6">The Framework</Eyebrow>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-6">
            The Supply Chain of Intelligence™
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            <strong className="text-foreground">JTBD tells you what users want.</strong>{" "}
            The Supply Chain of Intelligence tells you{" "}
            <strong className="text-foreground">where value accrues</strong> — and which AI
            companies a foundation model, hyperscaler, or productivity suite can erase next quarter.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Follow the gold from the ground to the person wearing the ring and you'll see every layer
            of the intelligence stack. 10 layers. 50 sublayers. 3 structural laws. One map.
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
          <Eyebrow className="mb-4">
  Why We Call It a Supply Chain
</Eyebrow>
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
                    <Link
                      to={`/framework/${layerSlug(layer.id, layer.shortName)}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all"
                    >
                      Deep dive on {layer.id} <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>

                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown size={14} className="text-muted-foreground" />
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

    {/* AGENT DECODER */}
    <section className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Eyebrow className="mb-4">On the Word "Agent"</Eyebrow>
          <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground mb-5 leading-[1.15]">
            "Agent" is not a layer. It's a costume worn by L5.
          </h2>
          <p className="text-base md:text-[17px] text-muted-foreground leading-relaxed mb-6">
            Every company shipping "an agent" in 2025 is selling the same structural package:{" "}
            <strong className="text-foreground">L5 Execution</strong> wrapped in an{" "}
            <strong className="text-foreground">L7 Surface</strong>, sometimes with a thin layer of{" "}
            <strong className="text-foreground">L8 Memory</strong>. That's it. The word "agent" is
            marketing for an L5-heavy stack. The structural question is never{" "}
            <em>"is it an agent?"</em> — it's <em>"what else does it own?"</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
            {[
              { id: "L5", short: "Execution", role: "The core. The action-taking loop.", n: 5 },
              { id: "L7", short: "Surface", role: "The chat / inbox / IDE wrapper users see.", n: 7 },
              { id: "L8", short: "Memory", role: "State across turns. Often missing.", n: 8 },
            ].map((p) => (
              <div
                key={p.id}
                className="rounded-xl p-5 sketch-border border bg-card"
                style={{ borderTop: `3px solid hsl(var(--layer-${p.n}))` }}
              >
                <span
                  className="font-sketch text-sm font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{
                    color: `hsl(var(--layer-${p.n}))`,
                    background: `hsl(var(--layer-${p.n}-bg))`,
                  }}
                >
                  {p.id} {p.short}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.role}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-6 bg-secondary/40 border border-border">
            <p className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent mb-3">— The Decoder</p>
            <ul className="space-y-2.5 text-[15px] text-foreground/85 leading-relaxed">
              <li>
                <strong className="text-foreground">Agent + L1 Proprietary Data</strong> → fortress.
                (Sierra, Harvey, Klarna's internal stack.)
              </li>
              <li>
                <strong className="text-foreground">Agent + L4 Distribution</strong> → railroad.
                (Salesforce Agentforce, Microsoft Copilot agents.)
              </li>
              <li>
                <strong className="text-foreground">Agent + L8 Compounding Memory</strong> → memory
                moat. (Glean, Cresta, Decagon.)
              </li>
              <li>
                <strong className="text-foreground">Agent + nothing else</strong> → exposed L7
                wrapper. Commoditizes the moment the underlying L2 ships the same loop.
                (Most "AI SDR" startups, Devin-as-pitched.)
              </li>
            </ul>
          </div>

          <p className="font-sketch text-base text-muted-foreground mt-6 italic max-w-2xl">
            When you read "we launched an agent," translate it: <strong>they shipped L5 + L7.</strong>{" "}
            Then ask which other layers they own. The answer is the structural verdict.
          </p>
        </motion.div>
      </div>
    </section>

    {/* DEFENSIBLE TRIANGLE */}
    <section className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <Eyebrow className="mb-4">One Path to Survival: The Defensible Triangle</Eyebrow>
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
            Own all three → fortress. Own none of these <em>and</em> no deep single-layer moat
            (like Vanta on L3 or NVIDIA on L0) → graveyard. The Triangle is one route to
            survival; deep ownership of any single layer is another.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Intelligence Cube */}
    <section id="cube" className="bg-secondary/30 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Eyebrow className="mb-4">The Intelligence Cube™</Eyebrow>
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
        <Eyebrow className="mb-4">Three Structural Laws</Eyebrow>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-3">The Laws That Predict the Future</h2>
        <p className="text-base text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Not opinions. Structural forces that explain why most AI products die in the layer they were
          built in — and which ones survive the platforms coming for them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LAWS.map((law, i) => (
            <motion.div
              key={law.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-7 sketch-border"
            >
              <div className="font-sketch text-5xl font-bold text-accent mb-3">{law.num}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3 leading-snug">{law.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{law.desc}</p>
              <div className="text-xs text-muted-foreground/80 italic mb-3 pl-3 border-l-2 border-border">
                {law.example}
              </div>
              <p className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent">{law.prediction}</p>
            </motion.div>
          ))}
        </div>

        {/* JTBD vs SCoI line */}
        <div className="mt-10 p-5 rounded-xl bg-accent/5 border border-accent/20 text-center">
          <p className="font-display text-base md:text-lg text-foreground leading-relaxed">
            <strong>JTBD finds demand.</strong> The Supply Chain of Intelligence{" "}
            <strong>finds defensibility.</strong>
          </p>
        </div>
      </div>
    </section>

    {/* Six Archetypes */}
    <section className="bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Eyebrow className="mb-4">Company Archetypes</Eyebrow>
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