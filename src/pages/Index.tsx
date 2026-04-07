import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Mic, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import IntelligenceCube from "@/components/IntelligenceCube";
import { LAYERS, GOLD_KEY_INSIGHT } from "@/data/layers";
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

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO (editorial shell, no sketch)
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo blur-[160px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-white/30 mb-5">
                A structural framework by Anand Arivukkarasu · Ex-Meta Product Leader
              </p>
              <h1 className="font-display text-[30px] md:text-[38px] lg:text-[44px] font-bold text-white leading-[1.12] mb-5">
                AI is reorganizing software into a new supply chain.{" "}
                <span className="text-indigo">Most companies only own one layer.</span>
              </h1>
              <p className="text-[15px] text-white/50 leading-[1.7] max-w-xl mb-3">
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

            {/* Right: L0–L8 vertical interactive stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[2.5px] text-white/20 mb-3">
                The 9-Layer Stack — Click to explore
              </p>
              <div className="space-y-1">
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
                        className="flex items-center gap-2.5 rounded-lg px-3.5 py-2 group transition-all duration-200 hover:translate-x-1"
                        style={{
                          background: `hsl(${layer.bg} / 0.1)`,
                          borderLeft: `4px solid hsl(${layer.color})`,
                        }}
                      >
                        <span className="text-base shrink-0">{layer.goldIcon}</span>
                        <span
                          className="font-display text-[13px] font-bold min-w-[26px] shrink-0"
                          style={{ color: `hsl(${layer.color})` }}
                        >
                          {layer.id}
                        </span>
                        <span className="text-white/60 text-[13px] font-medium flex-1 group-hover:text-white transition-colors truncate">
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
                          <span className="text-[8px] font-bold text-white/20 shrink-0">
                            {defCount}★
                          </span>
                        )}
                        <ArrowRight size={11} className="text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-[8px] text-white/15 mt-2.5">
                ★ = defensible · Filled dots = defensible sublayers · {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)}+ mapped
              </p>
            </motion.div>
          </div>

          {/* Immediate proof — Jasper vs Grammarly vs ChatGPT */}
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
                  note: "$1.5B → ~$300M · Thin wrapper, no moat", layers: [7],
                },
                {
                  name: "Grammarly", logo: "https://logo.clearbit.com/grammarly.com",
                  pos: "L4 + L5 + L7 + L8", fate: "Thriving", color: "hsl(160 84% 39%)",
                  note: "Stable $13B · Memory compounds, deep integrations", layers: [4, 5, 7, 8],
                },
                {
                  name: "ChatGPT", logo: "https://logo.clearbit.com/openai.com",
                  pos: "L2 + L7", fate: "Dominant", color: "hsl(243 75% 59%)",
                  note: "Owns the smelter. Surface is free because the model IS the moat", layers: [2, 7],
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
                      <span className="text-[10px] font-bold uppercase" style={{ color: c.color }}>{c.fate}</span>
                    </div>
                    <p className="text-[11px] text-white/35 mt-0.5">{c.pos}</p>
                    <p className="text-[10px] text-white/25 mt-1 leading-relaxed">{c.note}</p>
                    <div className="flex gap-1 mt-1.5">
                      {c.layers.map((n) => (
                        <span key={n} className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                          style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg) / 0.15)` }}>
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
          SECTION 2 — Y-AXIS vs Z-AXIS (editorial + SKETCH MODULE)
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

          {/* ──── SKETCH MODULE: Y-axis vs Z-axis ──── */}
          <motion.div {...fadeIn}>
            <SketchBoard className="p-6 md:p-10 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Y-axis column */}
                <div>
                  <p className="text-sm font-semibold text-[#555] mb-3" style={{ fontFamily: "'Caveat', cursive" }}>Traditional PM Thinking</p>
                  <SketchBox color="#ccc" className="p-4 mb-3">
                    <div className="space-y-2.5">
                      {[
                        "What does the customer need?",
                        "What should we build next?",
                        "What features matter most?",
                        "How do we improve retention?",
                      ].map((q, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#999] text-sm mt-0.5">—</span>
                          <span className="text-[#444] text-sm leading-snug" style={{ fontFamily: "'Caveat', cursive" }}>{q}</span>
                        </div>
                      ))}
                    </div>
                  </SketchBox>
                  <p className="text-xs text-[#999] italic mt-2">
                    Necessary — but no longer sufficient
                  </p>
                </div>

                {/* Z-axis column */}
                <div>
                  <p className="text-sm font-bold text-[#DC2626] mb-3" style={{ fontFamily: "'Caveat', cursive" }}>
                    + Structural Depth Thinking ← NEW
                  </p>
                  <SketchBox color="#DC2626" fill="rgba(220,38,38,0.03)" className="p-4 mb-3">
                    <div className="space-y-2.5">
                      {[
                        "Which layer do we actually own?",
                        "Which sublayer is defensible?",
                        "If the interface becomes free — what remains?",
                        "Do we own the Defensible Triangle?",
                      ].map((q, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#DC2626] text-sm mt-0.5">→</span>
                          <span className="text-[#333] text-sm leading-snug font-medium" style={{ fontFamily: "'Caveat', cursive" }}>{q}</span>
                        </div>
                      ))}
                    </div>
                  </SketchBox>
                  <p className="text-xs font-bold text-[#DC2626] mt-2">
                    This determines survival
                  </p>
                </div>
              </div>

              {/* Sketch diagram: Y vs Z axes */}
              <div className="mt-8 flex justify-center">
                <div className="relative w-[280px] h-[200px]">
                  {/* Y axis */}
                  <svg className="absolute inset-0" viewBox="0 0 280 200" style={{ filter: "url(#sketch-wobble)" }}>
                    {/* Y-axis line */}
                    <line x1="60" y1="180" x2="60" y2="20" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                    <path d="M54 28 L60 16 L66 28" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                    {/* Z-axis line */}
                    <line x1="60" y1="180" x2="260" y2="180" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    <path d="M252 174 L264 180 L252 186" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    {/* Diagonal "winning zone" */}
                    <rect x="120" y="40" width="110" height="90" rx="6" fill="rgba(220,38,38,0.06)" stroke="#DC2626" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                  <SketchLabel className="absolute left-0 top-0 text-[12px]" color="#555" rotate={-90}>
                    Customer Depth (Y)
                  </SketchLabel>
                  <SketchLabel className="absolute right-0 bottom-0 text-[12px]" color="#DC2626">
                    Stack Depth (Z)
                  </SketchLabel>
                  <span className="absolute text-center" style={{ left: "120px", top: "70px" }}>
                    <SketchLabel color="#DC2626" className="text-[11px] font-bold">winning zone</SketchLabel>
                  </span>
                  <span className="absolute" style={{ left: "70px", top: "145px" }}>
                    <SketchLabel color="#999" className="text-[10px]">thin layer risk</SketchLabel>
                  </span>
                </div>
              </div>
            </SketchBoard>
          </motion.div>

          {/* Quote (editorial shell, not sketch) */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
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
          SECTION 3 — GOLD MINING ANALOGY (editorial header + SKETCH MODULE)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              Why We Call It a Supply Chain
            </p>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-foreground leading-tight mb-4">
              From Gold in the Ground to the Ring on Your Finger
            </h2>
            <p className="text-sm text-muted-foreground leading-[1.75] max-w-3xl mb-10">
              Each layer transforms the output of the layer below it. No layer works alone. Most
              companies only own one. The supply chain is only as strong as its weakest link.
            </p>
          </motion.div>

          {/* ──── SKETCH MODULE: Gold supply chain journey ──── */}
          <motion.div {...fadeIn}>
            <SketchBoard className="p-5 md:p-8">
              <SketchLabel color="#888" className="text-[13px] mb-5 block">
                The Intelligence Supply Chain — each layer transforms the one below ↓
              </SketchLabel>

              <div className="space-y-0">
                {LAYERS.map((layer, i) => (
                  <div key={layer.id}>
                    <div className="flex items-start gap-3 md:gap-4 py-2.5 px-2">
                      {/* Icon + ID */}
                      <div className="flex flex-col items-center min-w-[50px] md:min-w-[60px]">
                        <span className="text-xl">{layer.goldIcon}</span>
                        <span
                          className="text-[13px] font-bold mt-0.5"
                          style={{ fontFamily: "'Caveat', cursive", color: `hsl(${layer.color})` }}
                        >
                          {layer.id}
                        </span>
                      </div>

                      {/* Name + analogy */}
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-[14px] font-bold block"
                          style={{ fontFamily: "'Caveat', cursive", color: "#333" }}
                        >
                          {layer.goldTitle}
                        </span>
                        <span className="text-[11px] text-[#888] leading-snug block mt-0.5">
                          {layer.desc}
                        </span>
                      </div>

                      {/* Sublayer dots */}
                      <div className="flex gap-1 items-center shrink-0 mt-1">
                        {layer.sublayers.map((sub) => (
                          <div
                            key={sub.id}
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: sub.defensible ? `hsl(${layer.color})` : `hsl(${layer.color} / 0.2)`,
                              border: sub.defensible ? "1.5px solid #333" : "1px solid #ddd",
                            }}
                            title={`${sub.id} ${sub.name}${sub.defensible ? " ★" : ""}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sketch arrow between layers */}
                    {i < LAYERS.length - 1 && (
                      <div className="flex items-center gap-2 pl-6 md:pl-8 py-0.5">
                        <svg width="16" height="20" viewBox="0 0 16 20" style={{ filter: "url(#sketch-wobble)" }}>
                          <line x1="8" y1="2" x2="8" y2="14" stroke="#bbb" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
                          <path d="M4 12 L8 18 L12 12" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <SketchLabel color="#bbb" className="text-[9px]">transforms into</SketchLabel>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key insight in sketch style */}
              <div className="mt-6 pt-4 border-t border-[#e0ddd8]">
                <SketchLabel color="#DC2626" className="text-[13px] font-bold block mb-1">
                  ← Key insight
                </SketchLabel>
                <p className="text-[12px] text-[#666] leading-relaxed" style={{ fontFamily: "'Caveat', cursive" }}>
                  {GOLD_KEY_INSIGHT}
                </p>
              </div>
            </SketchBoard>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — FULL 9-LAYER MAP (editorial, clean)
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
                  <div
                    className="flex items-center gap-3 px-5 py-3 lg:min-w-[200px] lg:flex-col lg:justify-center lg:items-center lg:py-5"
                    style={{ background: `hsl(${layer.bg} / 0.35)` }}
                  >
                    <span className="text-xl">{layer.goldIcon}</span>
                    <div className="flex items-baseline gap-2 lg:flex-col lg:items-center lg:gap-0">
                      <span className="font-display text-lg font-bold" style={{ color: `hsl(${layer.color})` }}>
                        {layer.id}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{layer.name}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {layer.sublayers.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-start gap-2 rounded-lg px-3 py-2"
                          style={{
                            background: sub.defensible ? `hsl(${layer.bg} / 0.55)` : `hsl(${layer.bg} / 0.15)`,
                            border: sub.defensible ? `1px solid hsl(${layer.color} / 0.25)` : "1px solid transparent",
                          }}
                        >
                          <span className="text-[11px] font-bold whitespace-nowrap mt-0.5" style={{ color: `hsl(${layer.color})` }}>
                            {sub.id}{sub.defensible ? " ★" : ""}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-foreground">{sub.name}</span>
                            <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-border/50">
                      {layer.players.slice(0, 4).map((p) => (
                        <span key={p} className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{p}</span>
                      ))}
                      <span className="text-[9px] font-bold uppercase tracking-wider ml-auto" style={{ color: `hsl(${layer.color})` }}>
                        {layer.verdict}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ──── SKETCH MODULE: Defensible Triangle ──── */}
          <motion.div {...fadeIn} className="mt-10">
            <SketchBoard className="p-6 md:p-8">
              <SketchLabel color="#DC2626" className="text-[14px] font-bold block mb-5">
                The Defensible Triangle — where survival actually lives
              </SketchLabel>

              <div className="flex flex-col items-center">
                {/* Triangle diagram */}
                <div className="relative w-[300px] h-[220px] mb-6">
                  <svg viewBox="0 0 300 220" className="w-full h-full" style={{ filter: "url(#sketch-wobble)" }}>
                    {/* Triangle lines */}
                    <path d="M150 30 L50 190 L250 190 Z" fill="rgba(220,38,38,0.04)" stroke="#333" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                    {/* Nodes */}
                    <circle cx="150" cy="30" r="18" fill="#fff" stroke="#3B82F6" strokeWidth="2.5" />
                    <circle cx="50" cy="190" r="18" fill="#fff" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="250" cy="190" r="18" fill="#fff" stroke="#6366F1" strokeWidth="2.5" />
                    {/* Center */}
                    <circle cx="150" cy="135" r="10" fill="rgba(220,38,38,0.15)" stroke="#DC2626" strokeWidth="1.5" />
                  </svg>
                  {/* Labels */}
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-center">
                    <SketchLabel color="#3B82F6" className="text-[12px] font-bold block">L1b ★</SketchLabel>
                    <SketchLabel color="#555" className="text-[10px] block">Proprietary Data</SketchLabel>
                  </span>
                  <span className="absolute bottom-0 left-0 text-center" style={{ transform: "translate(-10px, 8px)" }}>
                    <SketchLabel color="#10B981" className="text-[12px] font-bold block">L5b/c/d ★</SketchLabel>
                    <SketchLabel color="#555" className="text-[10px] block">Deep Skills</SketchLabel>
                  </span>
                  <span className="absolute bottom-0 right-0 text-center" style={{ transform: "translate(10px, 8px)" }}>
                    <SketchLabel color="#6366F1" className="text-[12px] font-bold block">L8c/d ★</SketchLabel>
                    <SketchLabel color="#555" className="text-[10px] block">Compounding Memory</SketchLabel>
                  </span>
                  <span className="absolute" style={{ left: "135px", top: "122px" }}>
                    <SketchLabel color="#DC2626" className="text-[10px] font-bold">FORTRESS</SketchLabel>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {[
                    { id: "L1b", name: "Proprietary Data", note: "Data behind enterprise walls — your gold deposit", color: "#3B82F6" },
                    { id: "L5b/c/d", name: "Deep Skills & Playbooks", note: "Encoded expertise that generic AI can't replicate", color: "#10B981" },
                    { id: "L8c/d", name: "Compounding Memory", note: "System gets smarter every day — lock-in that compounds", color: "#6366F1" },
                  ].map((item) => (
                    <SketchBox key={item.id} color={item.color} className="p-3.5">
                      <SketchLabel color={item.color} className="text-[12px] font-bold block mb-1">
                        {item.id} ★
                      </SketchLabel>
                      <span className="text-[13px] font-bold text-[#333] block" style={{ fontFamily: "'Caveat', cursive" }}>
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#888] block mt-1">{item.note}</span>
                    </SketchBox>
                  ))}
                </div>

                <SketchLabel color="#888" className="text-[11px] italic block mt-4 text-center">
                  Own all three → fortress · Own none → graveyard · Most companies own one
                </SketchLabel>
              </div>
            </SketchBoard>
          </motion.div>

          <div className="mt-6 text-center">
            <Link to="/framework" className="inline-flex items-center gap-2 text-sm text-indigo font-medium hover:gap-3 transition-all">
              Deep-dive into every layer and sublayer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — THREE STRUCTURAL LAWS (editorial + SKETCH MODULE)
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

          {/* ──── SKETCH MODULE: The three laws ──── */}
          <motion.div {...fadeIn}>
            <SketchBoard className="p-6 md:p-8">
              <div className="space-y-6">
                {[
                  {
                    num: "I",
                    title: "The Creator Cannot Be the Gatekeeper",
                    sketch: "L2 ←✗→ L3",
                    desc: "When one entity controls both intelligence and trust, credibility degrades.",
                    predicts: "WHAT can't be vertically integrated",
                  },
                  {
                    num: "II",
                    title: "Memory That Doesn't Learn Isn't Intelligence",
                    sketch: "L8 ──→ L5",
                    desc: "A system that remembers but doesn't improve is just a database with a chat UI.",
                    predicts: "WHO captures long-term value",
                  },
                  {
                    num: "III",
                    title: "Value Migrates to the Scarcest Layer",
                    sketch: "commodity → scarce",
                    desc: "When a layer commoditizes, value transfers to adjacent scarce layers.",
                    predicts: "WHERE value is going",
                  },
                ].map((law, i) => (
                  <div key={law.num} className="flex gap-4 items-start">
                    {/* Number */}
                    <div className="min-w-[50px] text-center">
                      <span
                        className="text-[36px] font-bold leading-none"
                        style={{ fontFamily: "'Caveat', cursive", color: "#DC2626" }}
                      >
                        {law.num}
                      </span>
                    </div>

                    <div className="flex-1">
                      <SketchBox color="#333" className="p-4">
                        <span
                          className="text-[16px] font-bold text-[#222] block mb-1.5"
                          style={{ fontFamily: "'Caveat', cursive" }}
                        >
                          {law.title}
                        </span>
                        <span className="text-[12px] text-[#777] leading-relaxed block mb-2">
                          {law.desc}
                        </span>
                        <div className="flex items-center gap-2">
                          <SketchArrow direction="right" size={24} />
                          <SketchLabel color="#DC2626" className="text-[11px] font-bold">
                            Predicts {law.predicts}
                          </SketchLabel>
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

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — CASE STUDIES (editorial shell)
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
            <Link to="/analysis" className="hidden md:inline-flex items-center gap-1 text-sm text-indigo font-medium hover:gap-2 transition-all">
              All case studies <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/analysis" className="inline-flex items-center gap-2 text-sm text-indigo font-medium">
              All case studies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — DIAGNOSTIC CTA (editorial shell)
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
          SECTION 8 — SUBSCRIBE (editorial shell)
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
            onSubmit={(e) => { e.preventDefault(); alert("Newsletter signup will be connected soon!"); }}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input type="email" placeholder="you@company.com" required
              className="flex-1 px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50 text-sm" />
            <button type="submit" className="px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — SPEAKING CTA (editorial shell)
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
          <Link to="/speaking" className="inline-flex items-center gap-2 text-sm text-indigo font-medium hover:gap-3 transition-all">
            Speaking & Workshops <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
