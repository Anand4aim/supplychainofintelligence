import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Mic, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { LAYERS, GOLD_KEY_INSIGHT } from "@/data/layers";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const Index = () => {
  const featuredSlugs = [
    "jasper-vs-chatgpt-grammarly",
    "chegg-collapse",
    "sierra-vs-salesforce",
    "harvey-vs-generic-legal",
    "stack-overflow-decline",
    "gamma-thin-layer-graveyard",
  ];
  const featuredStudies = CASE_STUDIES.filter((s) => featuredSlugs.includes(s.slug));

  return (
    <SiteLayout>
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
          Thesis + Visible L0–L8 Stack + Immediate Proof
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo blur-[160px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-16">
          {/* Headline block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[680px] mb-14"
          >
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-white/30 mb-5">
              A structural framework by Anand Arivukkarasu · Ex-Meta Product Leader
            </p>
            <h1 className="font-display text-[32px] md:text-[42px] lg:text-[48px] font-bold text-white leading-[1.12] mb-5">
              AI is reorganizing software into a new supply chain.{" "}
              <span className="text-indigo">Most companies only own one layer.</span>
            </h1>
            <p className="text-[15px] md:text-base text-white/50 leading-[1.7] max-w-xl mb-3">
              The Supply Chain of Intelligence™ maps the 9 layers and 32+ sublayers
              that determine who captures value, who becomes infrastructure, and who
              gets dissolved.
            </p>
            <p className="text-xs text-white/25 mb-7">
              For product leaders, founders, and investors trying to understand where AI actually captures value.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition"
              >
                Explore the Framework <ArrowRight size={15} />
              </Link>
              <Link
                to="/analysis"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/12 text-white/60 text-sm font-medium rounded-md hover:bg-white/5 transition"
              >
                See Case Studies
              </Link>
            </div>
          </motion.div>

          {/* The visible L0–L8 stack — vertical, interactive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-[9px] font-bold uppercase tracking-[2.5px] text-white/20 mb-3">
              The 9-Layer Stack — Click any layer to explore
            </p>
            <div className="space-y-1">
              {LAYERS.map((layer, i) => {
                const defCount = layer.sublayers.filter((s) => s.defensible).length;
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                  >
                    <Link
                      to={`/framework#${layer.id}`}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 group transition-all duration-200 hover:translate-x-1"
                      style={{
                        background: `hsl(${layer.bg} / 0.1)`,
                        borderLeft: `4px solid hsl(${layer.color})`,
                      }}
                    >
                      <span className="text-base shrink-0">{layer.goldIcon}</span>
                      <span
                        className="font-display text-sm font-bold min-w-[28px] shrink-0"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.id}
                      </span>
                      <span className="text-white/70 text-sm font-medium flex-1 group-hover:text-white transition-colors">
                        {layer.name}
                      </span>
                      {/* Sublayer dots */}
                      <div className="flex gap-1 items-center shrink-0">
                        {layer.sublayers.map((sub) => (
                          <div
                            key={sub.id}
                            className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125"
                            style={{
                              background: sub.defensible
                                ? `hsl(${layer.color})`
                                : `hsl(${layer.color} / 0.25)`,
                            }}
                            title={`${sub.id} ${sub.name}${sub.defensible ? " ★" : ""}`}
                          />
                        ))}
                      </div>
                      {defCount > 0 && (
                        <span className="text-[9px] font-bold text-white/20 min-w-[20px] text-right shrink-0">
                          {defCount}★
                        </span>
                      )}
                      <ArrowRight size={12} className="text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-[9px] text-white/15 mt-3">
              ★ = defensible positions · {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)}+ sub-layers mapped · Filled dots = defensible
            </p>
          </motion.div>

          {/* Immediate proof block — Jasper vs Grammarly vs ChatGPT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 md:p-7"
          >
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-indigo/70 mb-4">
              Proof — One example, three fates
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Jasper", logo: "https://logo.clearbit.com/jasper.ai",
                  pos: "L7a only", fate: "Collapsed", color: "hsl(0 84% 60%)",
                  note: "$1.5B → ~$300M · Thin wrapper, no moat",
                  layers: [7],
                },
                {
                  name: "Grammarly", logo: "https://logo.clearbit.com/grammarly.com",
                  pos: "L4 + L5 + L7 + L8", fate: "Thriving", color: "hsl(160 84% 39%)",
                  note: "Stable $13B · Memory compounds, deep integrations",
                  layers: [4, 5, 7, 8],
                },
                {
                  name: "ChatGPT", logo: "https://logo.clearbit.com/openai.com",
                  pos: "L2 + L7", fate: "Dominant", color: "hsl(243 75% 59%)",
                  note: "Owns the smelter. Surface is free because the model IS the moat",
                  layers: [2, 7],
                },
              ].map((c) => (
                <div key={c.name} className="flex items-start gap-3">
                  <img
                    src={c.logo} alt={c.name}
                    className="w-7 h-7 rounded-md object-contain bg-white p-0.5 mt-0.5 shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-white">{c.name}</span>
                      <span className="text-[10px] font-bold uppercase" style={{ color: c.color }}>
                        {c.fate}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/35 mt-0.5">{c.pos}</p>
                    <p className="text-[10px] text-white/25 mt-1 leading-relaxed">{c.note}</p>
                    <div className="flex gap-1 mt-1.5">
                      {c.layers.map((n) => (
                        <span
                          key={n}
                          className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                          style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg) / 0.15)` }}
                        >
                          L{n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — WHY CUSTOMER UNDERSTANDING ISN'T ENOUGH
      ══════════════════════════════════════════════════════ */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              The Missing Dimension
            </p>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-foreground leading-tight mb-5">
              Why customer understanding is no longer enough
            </h2>
            <p className="text-[15px] text-muted-foreground leading-[1.75] max-w-3xl mb-10">
              Great product leaders have mastered the vertical dimension — customer needs, JTBD,
              workflows, prioritization. But AI forces a second dimension:{" "}
              <strong className="text-foreground">structural depth</strong>. You can build something
              users love today and still lose if your value sits on a thin layer.
            </p>
          </motion.div>

          {/* 2-column comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-7"
            >
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-5">
                Traditional PM Thinking
              </p>
              <ul className="space-y-3.5">
                {[
                  "What does the customer need?",
                  "What should we build next?",
                  "What features matter most?",
                  "How do we improve retention?",
                  "What's our product-market fit?",
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-muted-foreground/60 mt-6 italic">
                Necessary — but no longer sufficient.
              </p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-card border-2 border-indigo/20 rounded-xl p-7"
            >
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-indigo mb-5">
                Structural Depth Thinking
              </p>
              <ul className="space-y-3.5">
                {[
                  "Which layer of the intelligence stack do we actually own?",
                  "Which sublayer is defensible?",
                  "If the interface becomes free, what remains?",
                  "Are we building on a layer that will still matter in 3 years?",
                  "Do we own any part of the Defensible Triangle?",
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo mt-2 shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-indigo/70 mt-6 italic font-medium">
                This determines whether your product survives.
              </p>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="mt-10">
            <div className="border-l-4 border-indigo/30 bg-muted/40 rounded-r-lg p-5 max-w-2xl">
              <p className="text-sm text-foreground leading-[1.75] italic">
                "Great product leaders have mastered the Y-axis — customer depth. In the AI era,
                you also need the Z-axis — infrastructure depth — or you'll build something customers
                love today that gets commoditized tomorrow."
              </p>
              <p className="mt-2 text-xs text-muted-foreground font-medium">— Anand Arivukkarasu</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — THE GOLD MINING ANALOGY
          Signature visual — the supply chain from shovels to ring
      ══════════════════════════════════════════════════════ */}
      <section className="bg-navy">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              Why We Call It a Supply Chain
            </p>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-white leading-tight mb-4">
              From Gold in the Ground to the Ring on Your Finger
            </h2>
            <p className="text-sm text-white/40 leading-[1.75] max-w-3xl mb-12">
              Each layer transforms the output of the layer below it. No layer works alone. Most
              companies only own one. The supply chain is only as strong as its weakest link.
            </p>
          </motion.div>

          {/* The gold journey — continuous vertical visual */}
          <div className="relative">
            <div className="absolute left-5 md:left-7 top-4 bottom-4 w-px bg-white/[0.06]" />

            <div className="space-y-1">
              {LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="relative"
                >
                  <div
                    className="flex gap-0 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]"
                    style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${layer.color})` }}
                  >
                    {/* Layer icon + ID */}
                    <div
                      className="flex flex-col items-center justify-center px-4 py-4 min-w-[70px] md:min-w-[90px]"
                      style={{ background: `hsl(${layer.bg} / 0.08)` }}
                    >
                      <span className="text-xl mb-1">{layer.goldIcon}</span>
                      <span
                        className="font-display text-base font-bold"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.id}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-3.5 px-4 md:px-5">
                      <h3
                        className="font-display text-sm md:text-[15px] font-bold mb-1"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.goldTitle}
                      </h3>
                      <p className="text-xs text-white/35 leading-relaxed mb-2.5 max-w-xl">
                        {layer.desc}
                      </p>
                      {/* Sublayer chips */}
                      <div className="flex flex-wrap gap-1">
                        {layer.sublayers.map((sub) => (
                          <span
                            key={sub.id}
                            className="text-[9px] font-semibold px-2 py-0.5 rounded"
                            style={{
                              color: sub.defensible ? `hsl(${layer.color})` : `hsl(${layer.color} / 0.5)`,
                              background: sub.defensible
                                ? `hsl(${layer.bg} / 0.25)`
                                : `hsl(${layer.bg} / 0.08)`,
                              border: sub.defensible ? `1px solid hsl(${layer.color} / 0.2)` : "1px solid transparent",
                            }}
                          >
                            {sub.id}{sub.defensible ? " ★" : ""} {sub.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {i < LAYERS.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown size={11} className="text-white/10" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key insight */}
          <motion.div {...fadeIn} className="mt-10 bg-white/[0.04] border border-white/[0.07] rounded-xl p-6">
            <p className="text-sm text-white/60 leading-[1.75]">
              <span className="text-yellow-400/80 font-bold">Key insight: </span>
              {GOLD_KEY_INSIGHT}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — THE FULL 9-LAYER MAP
          All sublayers visible, defensible markers prominent
      ══════════════════════════════════════════════════════ */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="mb-10">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-3">
              The Full Map
            </p>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-foreground mb-3 leading-tight">
              9 Layers. {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)}+ Sublayers. The Defensible Positions Marked.
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              This is not a metaphor. It is a structural map. The ★ markers show where defensibility actually sits.
              The sublayer dimension is where the real power lives.
            </p>
          </motion.div>

          <div className="space-y-2">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="rounded-xl overflow-hidden border border-border bg-card"
                style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${layer.color})` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Layer label */}
                  <div
                    className="flex items-center gap-3 px-5 py-3 lg:min-w-[200px] lg:flex-col lg:justify-center lg:items-center lg:py-5"
                    style={{ background: `hsl(${layer.bg} / 0.35)` }}
                  >
                    <span className="text-xl">{layer.goldIcon}</span>
                    <div className="flex items-baseline gap-2 lg:flex-col lg:items-center lg:gap-0">
                      <span
                        className="font-display text-lg font-bold"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.id}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{layer.name}</span>
                    </div>
                  </div>

                  {/* Sublayers */}
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {layer.sublayers.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-start gap-2 rounded-lg px-3 py-2"
                          style={{
                            background: sub.defensible
                              ? `hsl(${layer.bg} / 0.55)`
                              : `hsl(${layer.bg} / 0.15)`,
                            border: sub.defensible
                              ? `1px solid hsl(${layer.color} / 0.25)`
                              : "1px solid transparent",
                          }}
                        >
                          <span
                            className="text-[11px] font-bold whitespace-nowrap mt-0.5"
                            style={{ color: `hsl(${layer.color})` }}
                          >
                            {sub.id}{sub.defensible ? " ★" : ""}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-foreground">{sub.name}</span>
                            <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Verdict + players */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-border/50">
                      {layer.players.slice(0, 4).map((p) => (
                        <span key={p} className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {p}
                        </span>
                      ))}
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider ml-auto"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.verdict}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Defensible Triangle */}
          <motion.div {...fadeIn} className="mt-10 bg-card border border-border rounded-xl p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-indigo mb-5">
              The Defensible Triangle — Where Survival Lives
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: "L1b ★", name: "Proprietary Data", layer: 1,
                  note: "Data behind enterprise walls. Your gold deposit. The deeper the vein, the stronger the moat.",
                },
                {
                  id: "L5b/c/d ★", name: "Deep Skills & Playbooks", layer: 5,
                  note: "Domain execution, reasoning patterns, company SOPs. Transforms generic intelligence into irreplaceable capability.",
                },
                {
                  id: "L8c/d ★", name: "Compounding Memory", layer: 8,
                  note: "Cross-customer patterns + institutional knowledge. The system gets smarter every day. Lock-in that compounds.",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg p-5"
                  style={{
                    background: `hsl(var(--layer-${item.layer}-bg) / 0.5)`,
                    borderTop: `3px solid hsl(var(--layer-${item.layer}))`,
                  }}
                >
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-2.5"
                    style={{
                      color: `hsl(var(--layer-${item.layer}))`,
                      background: `hsl(var(--layer-${item.layer}-bg))`,
                    }}
                  >
                    {item.id}
                  </span>
                  <h4 className="font-display text-base font-bold text-foreground mb-1.5">{item.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/70 mt-5 italic text-center">
              Own all three → fortress. Own none → graveyard. Most companies own one — and that determines their timeline.
            </p>
          </motion.div>

          <div className="mt-6 text-center">
            <Link
              to="/framework"
              className="inline-flex items-center gap-2 text-sm text-indigo font-medium hover:gap-3 transition-all"
            >
              Deep-dive into every layer and sublayer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — THE THREE STRUCTURAL LAWS
          Canonical, engraved, inevitable
      ══════════════════════════════════════════════════════ */}
      <section className="bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="text-center mb-12">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              Three Structural Laws
            </p>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-foreground mb-3">
              The Laws That Predict the Future
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Not opinions. Structural forces that predict who wins, who dies, and where value migrates.
            </p>
          </motion.div>

          <div className="space-y-5">
            {[
              {
                num: "I",
                title: "The Creator Cannot Be the Gatekeeper",
                desc: "When one entity controls both intelligence (L2) and trust (L3), credibility degrades. Tells you WHAT can't be vertically integrated.",
              },
              {
                num: "II",
                title: "Memory That Doesn't Learn Isn't Intelligence",
                desc: "L8 must feed back into L5. A system that remembers but doesn't improve is just a database with a chat UI. Tells you WHO captures long-term value.",
              },
              {
                num: "III",
                title: "Value Migrates to the Scarcest Layer",
                desc: "When a layer commoditizes, value transfers to adjacent scarce layers. Models commoditize → data wins. Surfaces commoditize → memory wins. Tells you WHERE value is going.",
              },
            ].map((law, i) => (
              <motion.div
                key={law.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 items-start bg-background border border-border rounded-xl p-6 md:p-7"
              >
                <span className="font-display text-4xl md:text-5xl font-black text-indigo/80 leading-none shrink-0 mt-1">
                  {law.num}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{law.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{law.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — CASE STUDIES PREVIEW
          6 visual cards as proof engine
      ══════════════════════════════════════════════════════ */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-3">
                The Framework in Action
              </p>
              <h2 className="font-display text-[26px] md:text-[32px] font-bold text-foreground">
                Case Studies — Proof Through the Stack
              </h2>
            </div>
            <Link
              to="/analysis"
              className="hidden md:inline-flex items-center gap-1 text-sm text-indigo font-medium hover:gap-2 transition-all"
            >
              All case studies <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 text-sm text-indigo font-medium"
            >
              All case studies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — DIAGNOSTIC CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div {...fadeIn}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              The Diagnostic
            </p>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-white mb-6">
              Where Do You Actually Sit in the Stack?
            </h2>
            <div className="text-left max-w-md mx-auto space-y-3 mb-8">
              {[
                "What layer do you think you own?",
                "What sublayer is actually defensible?",
                "What happens when L7 becomes free?",
                "Are you rising by gravity — or climbing down too late?",
                "Do you own any part of the Defensible Triangle?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-indigo/70 font-bold text-xs mt-0.5">{i + 1}.</span>
                  <p className="text-white/45 text-sm leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <Link
              to="/speaking"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition"
            >
              Book a Workshop — Map Your Position <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — ANALYSIS + SUBSCRIBE
      ══════════════════════════════════════════════════════ */}
      <section id="newsletter" className="bg-card border-t border-border">
        <div className="max-w-xl mx-auto px-6 py-14 text-center">
          <BookOpen className="mx-auto mb-3 text-indigo/70" size={26} />
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Weekly Structural Analysis
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            One company analyzed through the 9 layers. Every week. Free. No fluff.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter signup will be connected soon! Thanks for your interest.");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              placeholder="you@company.com"
              required
              className="flex-1 px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — SPEAKING CTA (earned position)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-background border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <Mic className="mx-auto mb-3 text-muted-foreground" size={24} />
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
            Bring This Framework to Your Team
          </h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
            Keynotes, executive briefings, and half-day workshops. Map your company's structural
            position across all 32+ sublayers.
          </p>
          <Link
            to="/speaking"
            className="inline-flex items-center gap-2 text-sm text-indigo font-medium hover:gap-3 transition-all"
          >
            Speaking & Workshops <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
