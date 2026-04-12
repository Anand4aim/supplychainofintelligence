import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Mic, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import IntelligenceCube from "@/components/IntelligenceCube";
import { LAYERS, GOLD_KEY_INSIGHT } from "@/data/layers";
import { SketchIcon, IconPickaxe, IconBrain } from "@/components/sketch/SketchIcons";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";
import {
  SketchFilters,
  SketchBoard,
  SketchArrow,
  SketchCircle,
  SketchUnderline,
  SketchBox,
  SketchLabel,
  SketchConnector,
} from "@/components/sketch/SketchElements";

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
      <SketchFilters />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-background overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-sketch text-base text-muted-foreground mb-4">
                A structural framework by Anand Arivukkarasu · Ex-Meta & Google Product Leader
              </p>
              <h1 className="font-display text-[28px] md:text-[36px] lg:text-[42px] font-bold text-foreground leading-[1.15] mb-5">
                AI is reorganizing software into a{" "}
                <SketchUnderline color="hsl(var(--accent))">
                  <span className="text-accent">new supply chain</span>
                </SketchUnderline>
                .{" "}
                Most companies only own one layer.
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-3">
                The Supply Chain of Intelligence™ maps the 9 layers and 32+ sublayers
                that determine who captures value, who becomes infrastructure, and who
                gets dissolved.
              </p>
              <p className="font-sketch text-base text-muted-foreground/60 mb-7">
                For product leaders, founders, and investors trying to understand where AI actually captures value.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/framework" className="btn-sketch">
                  Explore the Framework <ArrowRight size={15} />
                </Link>
                <Link to="/analysis" className="btn-sketch-outline">
                  See Case Studies
                </Link>
              </div>
            </motion.div>

            {/* Right: L0–L8 layer stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="font-sketch text-base text-muted-foreground mb-3">
                The 9-Layer Stack — Click to explore ↓
              </p>
              <div className="sketch-paper rounded-2xl p-4 space-y-1.5 relative">
                <div className="absolute inset-0 sketch-dots rounded-2xl pointer-events-none" />
                {LAYERS.map((layer, i) => {
                  const defCount = layer.sublayers.filter((s) => s.defensible).length;
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <Link
                        to={`/framework#${layer.id}`}
                        className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 group transition-all duration-200 hover:translate-x-1 sketch-border relative"
                        style={{
                          background: `hsl(${layer.bg})`,
                          borderLeft: `3px solid hsl(${layer.color})`,
                        }}
                      >
                        <SketchIcon name={layer.goldIcon} size={24} className="shrink-0" />
                        <span
                          className="font-sketch text-base font-bold min-w-[28px] shrink-0"
                          style={{ color: `hsl(${layer.color})` }}
                        >
                          {layer.id}
                        </span>
                        <span className="text-foreground/70 text-sm font-medium flex-1 group-hover:text-foreground transition-colors truncate">
                          {layer.name}
                        </span>
                        <div className="flex gap-0.5 items-center shrink-0">
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
                          <span className="font-sketch text-xs text-muted-foreground shrink-0">
                            {defCount}★
                          </span>
                        )}
                        <ArrowRight size={11} className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <p className="font-sketch text-xs text-muted-foreground/50 mt-2.5">
                ★ = defensible · Filled dots = defensible sublayers · {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)}+ mapped
              </p>
            </motion.div>
          </div>

          {/* Immediate proof — Jasper vs Grammarly vs ChatGPT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12"
          >
            <SketchBoard className="p-5 md:p-7">
              <p className="font-sketch text-base text-accent mb-4 relative">
                ✏️ Proof — One example, three fates
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
                {[
                  {
                    name: "Jasper", logo: "https://logo.clearbit.com/jasper.ai",
                    pos: "L7a only", fate: "Collapsed", color: "hsl(var(--verdict-exposed))",
                    note: "$1.5B → ~$300M · Thin wrapper, no moat", layers: [7],
                  },
                  {
                    name: "Grammarly", logo: "https://logo.clearbit.com/grammarly.com",
                    pos: "L4 + L5 + L7 + L8", fate: "Thriving", color: "hsl(var(--verdict-fortified))",
                    note: "Stable $13B · Memory compounds, deep integrations", layers: [4, 5, 7, 8],
                  },
                  {
                    name: "ChatGPT", logo: "https://logo.clearbit.com/openai.com",
                    pos: "L2 + L7", fate: "Dominant", color: "hsl(var(--verdict-dominant))",
                    note: "Owns the smelter. Surface is free because the model IS the moat", layers: [2, 7],
                  },
                ].map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <img
                      src={c.logo} alt={c.name}
                      className="w-7 h-7 rounded-lg object-contain bg-white p-0.5 mt-0.5 shrink-0 border border-border"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-foreground">{c.name}</span>
                        <span className="font-sketch text-base font-bold" style={{ color: c.color }}>{c.fate}</span>
                      </div>
                      <p className="font-sketch text-sm text-muted-foreground mt-0.5">{c.pos}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1 leading-relaxed">{c.note}</p>
                      <div className="flex gap-1 mt-1.5">
                        {c.layers.map((n) => (
                          <span key={n} className="font-sketch text-xs font-bold px-1.5 py-0.5 rounded-md"
                            style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}>
                            L{n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SketchBoard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ Y-AXIS vs Z-AXIS ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-sketch text-base text-accent mb-4">
              ✏️ The Missing Dimension
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground leading-tight mb-5">
              Why customer understanding is no longer enough
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-10">
              Great product leaders have mastered the vertical dimension — customer needs, JTBD,
              workflows, prioritization. But AI forces a second dimension:{" "}
              <strong className="text-foreground">structural depth</strong>. You can build something
              users love today and still lose if your value sits on a thin layer.
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <SketchBoard className="p-6 md:p-10 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Y-axis column */}
                <div>
                  <p className="font-sketch text-lg text-sketch-muted mb-3">Traditional PM Thinking</p>
                  <SketchBox color="hsl(25 12% 75%)" className="p-4 mb-3">
                    <div className="space-y-2.5">
                      {[
                        "What does the customer need?",
                        "What should we build next?",
                        "What features matter most?",
                        "How do we improve retention?",
                      ].map((q, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground text-sm mt-0.5">—</span>
                          <span className="font-sketch text-base text-foreground/70 leading-snug">{q}</span>
                        </div>
                      ))}
                    </div>
                  </SketchBox>
                  <p className="font-sketch text-sm text-muted-foreground italic mt-2">
                    Necessary — but no longer sufficient
                  </p>
                </div>

                {/* Z-axis column */}
                <div>
                  <p className="font-sketch text-lg font-bold text-sketch-red mb-3">
                    + Structural Depth Thinking ← NEW
                  </p>
                  <SketchBox color="hsl(var(--sketch-red))" fill="hsl(var(--sketch-red) / 0.03)" className="p-4 mb-3">
                    <div className="space-y-2.5">
                      {[
                        "Which layer do we actually own?",
                        "Which sublayer is defensible?",
                        "If the interface becomes free — what remains?",
                        "Do we own the Defensible Triangle?",
                      ].map((q, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-sketch-red text-sm mt-0.5">→</span>
                          <span className="font-sketch text-base text-foreground font-bold leading-snug">{q}</span>
                        </div>
                      ))}
                    </div>
                  </SketchBox>
                  <p className="font-sketch text-sm font-bold text-sketch-red mt-2">
                    This determines survival
                  </p>
                </div>
              </div>

              {/* Sketch diagram: Y vs Z axes */}
              <div className="mt-8 flex justify-center">
                <div className="relative w-[280px] h-[200px]">
                  <svg className="absolute inset-0" viewBox="0 0 280 200" style={{ filter: "url(#sketch-wobble)" }}>
                    <line x1="60" y1="180" x2="60" y2="20" stroke="hsl(25 6% 65%)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M54 28 L60 16 L66 28" fill="none" stroke="hsl(25 6% 65%)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="60" y1="180" x2="260" y2="180" stroke="hsl(0 65% 48%)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M252 174 L264 180 L252 186" fill="none" stroke="hsl(0 65% 48%)" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="120" y="40" width="110" height="90" rx="6" fill="hsl(0 65% 48% / 0.05)" stroke="hsl(0 65% 48%)" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                  <SketchLabel className="absolute left-0 top-0 text-sm" color="hsl(25 6% 55%)" rotate={-90}>
                    Customer Depth (Y)
                  </SketchLabel>
                  <SketchLabel className="absolute right-0 bottom-0 text-sm" color="hsl(0 65% 48%)">
                    Stack Depth (Z)
                  </SketchLabel>
                  <span className="absolute text-center" style={{ left: "120px", top: "70px" }}>
                    <SketchLabel color="hsl(0 65% 48%)" className="text-sm font-bold">winning zone</SketchLabel>
                  </span>
                  <span className="absolute" style={{ left: "70px", top: "145px" }}>
                    <SketchLabel color="hsl(25 6% 55%)" className="text-xs">thin layer risk</SketchLabel>
                  </span>
                </div>
              </div>
            </SketchBoard>
          </motion.div>

          {/* Quote */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <div className="verdict-dominant bg-accent/5 rounded-xl p-5 max-w-2xl">
              <p className="text-sm text-foreground leading-relaxed italic">
                "Great product leaders have mastered the Y-axis — customer depth. In the AI era,
                you also need the Z-axis — infrastructure depth — or you'll build something customers
                love today that gets commoditized tomorrow."
              </p>
              <p className="mt-2 font-sketch text-base text-muted-foreground">— Anand Arivukkarasu</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ GOLD MINING ANALOGY ═══════════ */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-sketch text-base text-accent mb-4">
              ✏️ Why We Call It a Supply Chain
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground leading-tight mb-4">
              From Gold in the Ground to the Ring on Your Finger
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-10">
              Each layer transforms the output of the layer below it. No layer works alone. Most
              companies only own one. The supply chain is only as strong as its weakest link.
            </p>
          </motion.div>

          {/* Side-by-side comparative flowchart */}
          <motion.div {...fadeIn}>
            <SketchBoard className="p-5 md:p-8">
              <p className="font-sketch text-base text-sketch-muted mb-6">
                Same supply chain. Different raw material. ↓
              </p>

              {/* Column headers */}
              <div className="grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] gap-0 mb-4">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full font-sketch text-base font-bold"
                    style={{ background: "hsl(var(--layer-6-bg))", color: "hsl(var(--layer-6))" }}>
                    <IconPickaxe size={22} className="inline-block mr-1 -mt-0.5" /> Gold Rush
                  </span>
                </div>
                <div />
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full font-sketch text-base font-bold"
                    style={{ background: "hsl(var(--layer-8-bg))", color: "hsl(var(--layer-8))" }}>
                    <IconBrain size={22} className="inline-block mr-1 -mt-0.5" /> AI Supply Chain
                  </span>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-0">
                {LAYERS.map((layer, i) => (
                  <div key={layer.id}>
                    <div className="grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] items-center gap-0">
                      <div className="text-right pr-2 md:pr-4 py-2">
                        <SketchIcon name={layer.goldIcon} size={28} />
                        <span className="block font-sketch text-sm font-bold mt-0.5" style={{ color: "hsl(var(--layer-6))" }}>
                          {layer.goldTitle?.replace(/^The\s+/i, "")}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <div
                          className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-sketch text-sm font-bold shadow-sm sketch-border"
                          style={{
                            background: `hsl(${layer.bg})`,
                            color: `hsl(${layer.color})`,
                            border: `1.5px solid hsl(${layer.color} / 0.4)`,
                          }}
                        >
                          {layer.id}
                        </div>
                      </div>

                      <div className="pl-2 md:pl-4 py-2">
                        <span
                          className="block font-sketch text-sm font-bold"
                          style={{ color: `hsl(${layer.color})` }}
                        >
                          {layer.name}
                        </span>
                        <span className="text-xs text-muted-foreground leading-snug block mt-0.5">
                          {layer.desc}
                        </span>
                      </div>
                    </div>

                    {i < LAYERS.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <svg width="16" height="18" viewBox="0 0 16 18" style={{ filter: "url(#sketch-wobble)" }}>
                          <line x1="8" y1="1" x2="8" y2="12" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
                          <path d="M4 10 L8 16 L12 10" fill="none" stroke="hsl(var(--sketch-red))" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-sketch text-base font-bold text-sketch-red mb-1">
                  ← Key insight
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {GOLD_KEY_INSIGHT}
                </p>
              </div>
            </SketchBoard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FULL 9-LAYER MAP ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="mb-10">
            <p className="font-sketch text-base text-accent mb-3">
              ✏️ The Full Map
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-3 leading-tight">
              9 Layers. {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)}+ Sublayers. The Defensible Positions Marked.
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              This is not a metaphor. It is a structural map. The ★ markers show where defensibility actually sits.
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
                className="rounded-xl overflow-hidden border border-border bg-card sketch-border"
                style={{ borderLeftWidth: "3px", borderLeftColor: `hsl(${layer.color})` }}
              >
                <div className="flex flex-col lg:flex-row">
                  <div
                    className="flex items-center gap-3 px-5 py-3 lg:min-w-[200px] lg:flex-col lg:justify-center lg:items-center lg:py-5"
                    style={{ background: `hsl(${layer.bg})` }}
                  >
                    <span className="text-xl">{layer.goldIcon}</span>
                    <div className="flex items-baseline gap-2 lg:flex-col lg:items-center lg:gap-0">
                      <span className="font-sketch text-xl font-bold" style={{ color: `hsl(${layer.color})` }}>
                        {layer.id}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">{layer.name}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {layer.sublayers.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-start gap-2 rounded-lg px-3 py-2 sketch-border"
                          style={{
                            background: sub.defensible ? `hsl(${layer.bg})` : `hsl(${layer.bg} / 0.4)`,
                            border: sub.defensible ? `1.5px solid hsl(${layer.color} / 0.3)` : "1.5px solid transparent",
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
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-border/50">
                      {layer.players.slice(0, 4).map((p) => (
                        <span key={p} className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p}</span>
                      ))}
                      <span className="font-sketch text-sm font-bold ml-auto" style={{ color: `hsl(${layer.color})` }}>
                        {layer.verdict}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Defensible Triangle */}
          <motion.div {...fadeIn} className="mt-10">
            <SketchBoard className="p-6 md:p-8">
              <p className="font-sketch text-xl font-bold text-sketch-red mb-5">
                The Defensible Triangle — where survival actually lives
              </p>

              <div className="flex flex-col items-center">
                <div className="relative w-[300px] h-[220px] mb-6">
                  <svg viewBox="0 0 300 220" className="w-full h-full" style={{ filter: "url(#sketch-wobble)" }}>
                    <path d="M150 30 L50 190 L250 190 Z" fill="hsl(0 65% 48% / 0.04)" stroke="hsl(25 12% 25%)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx="150" cy="30" r="18" fill="hsl(40 30% 97%)" stroke="hsl(var(--layer-1))" strokeWidth="2" />
                    <circle cx="50" cy="190" r="18" fill="hsl(40 30% 97%)" stroke="hsl(var(--layer-5))" strokeWidth="2" />
                    <circle cx="250" cy="190" r="18" fill="hsl(40 30% 97%)" stroke="hsl(var(--layer-8))" strokeWidth="2" />
                    <circle cx="150" cy="135" r="10" fill="hsl(0 65% 48% / 0.12)" stroke="hsl(0 65% 48%)" strokeWidth="1.5" />
                  </svg>
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-center">
                    <span className="font-sketch text-base font-bold block" style={{ color: "hsl(var(--layer-1))" }}>L1b ★</span>
                    <span className="text-xs text-muted-foreground block">Proprietary Data</span>
                  </span>
                  <span className="absolute bottom-0 left-0 text-center" style={{ transform: "translate(-10px, 8px)" }}>
                    <span className="font-sketch text-base font-bold block" style={{ color: "hsl(var(--layer-5))" }}>L5b/c/d ★</span>
                    <span className="text-xs text-muted-foreground block">Deep Skills</span>
                  </span>
                  <span className="absolute bottom-0 right-0 text-center" style={{ transform: "translate(10px, 8px)" }}>
                    <span className="font-sketch text-base font-bold block" style={{ color: "hsl(var(--layer-8))" }}>L8c/d ★</span>
                    <span className="text-xs text-muted-foreground block">Compounding Memory</span>
                  </span>
                  <span className="absolute" style={{ left: "135px", top: "122px" }}>
                    <span className="font-sketch text-sm font-bold text-sketch-red">FORTRESS</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {[
                    { id: "L1b", name: "Proprietary Data", note: "Data behind enterprise walls — your gold deposit", color: "hsl(var(--layer-1))" },
                    { id: "L5b/c/d", name: "Deep Skills & Playbooks", note: "Encoded expertise that generic AI can't replicate", color: "hsl(var(--layer-5))" },
                    { id: "L8c/d", name: "Compounding Memory", note: "System gets smarter every day — lock-in that compounds", color: "hsl(var(--layer-8))" },
                  ].map((item) => (
                    <SketchBox key={item.id} color={item.color} className="p-3.5">
                      <span className="font-sketch text-base font-bold block mb-1" style={{ color: item.color }}>
                        {item.id} ★
                      </span>
                      <span className="font-sketch text-base font-bold text-foreground block">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground block mt-1">{item.note}</span>
                    </SketchBox>
                  ))}
                </div>

                <p className="font-sketch text-sm text-muted-foreground italic mt-4 text-center">
                  Own all three → fortress · Own none → graveyard · Most companies own one
                </p>
              </div>
            </SketchBoard>
          </motion.div>

          <div className="mt-6 text-center">
            <Link to="/framework" className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:gap-3 transition-all">
              Deep-dive into every layer and sublayer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ THREE STRUCTURAL LAWS ═══════════ */}
      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="text-center mb-12">
            <p className="font-sketch text-base text-accent mb-4">
              ✏️ Three Structural Laws
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-3">
              The Laws That Predict the Future
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Not opinions. Structural forces that predict who wins, who dies, and where value migrates.
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <SketchBoard className="p-6 md:p-8">
              <div className="space-y-6">
                {[
                  {
                    num: "I",
                    title: "The Creator Cannot Be the Gatekeeper",
                    desc: "When one entity controls both intelligence and trust, credibility degrades.",
                    predicts: "WHAT can't be vertically integrated",
                  },
                  {
                    num: "II",
                    title: "Memory That Doesn't Learn Isn't Intelligence",
                    desc: "A system that remembers but doesn't improve is just a database with a chat UI.",
                    predicts: "WHO captures long-term value",
                  },
                  {
                    num: "III",
                    title: "Value Migrates to the Scarcest Layer",
                    desc: "When a layer commoditizes, value transfers to adjacent scarce layers.",
                    predicts: "WHERE value is going",
                  },
                ].map((law) => (
                  <div key={law.num} className="flex gap-4 items-start">
                    <div className="min-w-[50px] text-center">
                      <span className="font-sketch text-4xl font-bold leading-none text-sketch-red">
                        {law.num}
                      </span>
                    </div>
                    <div className="flex-1">
                      <SketchBox color="hsl(25 12% 75%)" className="p-4">
                        <span className="font-sketch text-xl font-bold text-foreground block mb-1.5">
                          {law.title}
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed block mb-2">
                          {law.desc}
                        </span>
                        <div className="flex items-center gap-2">
                          <SketchArrow direction="right" size={24} />
                          <span className="font-sketch text-sm font-bold text-sketch-red">
                            Predicts {law.predicts}
                          </span>
                        </div>
                      </SketchBox>
                    </div>
                  </div>
                ))}
              </div>
            </SketchBoard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CASE STUDIES ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sketch text-base text-accent mb-3">
                ✏️ The Framework in Action
              </p>
              <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground">
                Case Studies — Proof Through the Stack
              </h2>
            </div>
            <Link to="/analysis" className="hidden md:inline-flex items-center gap-1 text-sm text-accent font-semibold hover:gap-2 transition-all">
              All case studies <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/analysis" className="inline-flex items-center gap-2 text-sm text-accent font-semibold">
              All case studies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ THE INTELLIGENCE CUBE™ ═══════════ */}
      <section className="bg-background border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="text-center mb-10">
            <p className="font-sketch text-base text-accent mb-4">
              ✏️ The Intelligence Cube™
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-3">
              9 Functions × 9 Verticals × 9 Layers
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Volume = structural durability. Companies that occupy thin slivers get dissolved.
              Companies that fill the cube become fortresses.
            </p>
          </motion.div>
          <motion.div {...fadeIn}>
            <IntelligenceCube />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ DIAGNOSTIC CTA ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div {...fadeIn}>
            <p className="font-sketch text-base text-accent mb-4">
              ✏️ The Diagnostic
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-6">
              Where Do You Actually Sit in the Stack?
            </h2>
            <SketchBoard className="p-6 max-w-md mx-auto mb-8">
              <div className="text-left space-y-3">
                {[
                  "What layer do you think you own?",
                  "What sublayer is actually defensible?",
                  "What happens when L7 becomes free?",
                  "Are you rising by gravity — or climbing down too late?",
                  "Do you own any part of the Defensible Triangle?",
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-sketch text-accent font-bold text-base mt-0.5">{i + 1}.</span>
                    <p className="font-sketch text-base text-foreground/70 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </SketchBoard>
            <Link to="/speaking" className="btn-sketch">
              Book a Workshop — Map Your Position <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SUBSCRIBE ═══════════ */}
      <section id="newsletter" className="bg-background border-t border-border">
        <div className="max-w-xl mx-auto px-6 py-14 text-center">
          <BookOpen className="mx-auto mb-3 text-accent/70" size={26} />
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Weekly Structural Analysis
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            One company analyzed through the 9 layers. Every week. Free. No fluff.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Newsletter signup will be connected soon!"); }}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input type="email" placeholder="you@company.com" required
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm" />
            <button type="submit" className="btn-sketch whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ═══════════ SPEAKING CTA ═══════════ */}
      <section className="bg-secondary/40 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <Mic className="mx-auto mb-3 text-muted-foreground" size={24} />
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
            Bring This Framework to Your Team
          </h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
            Keynotes, executive briefings, and half-day workshops. Map your company's structural
            position across all 32+ sublayers.
          </p>
          <Link to="/speaking" className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:gap-3 transition-all">
            Speaking & Workshops <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;