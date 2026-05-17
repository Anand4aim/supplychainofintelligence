import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, BookOpen, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import IntelligenceCube from "@/components/IntelligenceCube";
import { LAYERS, GOLD_KEY_INSIGHT, LAWS, AUDIT_QUESTIONS, AUDIT_BANDS, JTBD_VS_SCOI } from "@/data/layers";
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
import SixtySecondTour from "@/components/SixtySecondTour";

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const Index = () => {
  const featuredSlugs = [
    "jasper-vs-grammarly-copilot",
    "chegg-collapse",
    "sierra-vs-salesforce",
    "harvey-vs-generic-legal",
    "stack-overflow-decline",
    "gamma-thin-layer-graveyard",
  ];
  const featuredStudies = CASE_STUDIES.filter((s) => featuredSlugs.includes(s.slug));

  return (
    <SiteLayout>
      <Seo
        title="Supply Chain of Intelligence™ — Where AI Value Accrues"
        description="JTBD finds demand. The Supply Chain of Intelligence finds defensibility. A 10-layer framework by Anand Arivukkarasu for AI founders and investors."
        path="/"
      />
      <SketchFilters />
      <SixtySecondTour />

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
                A structural framework by Anand Arivukkarasu · Ex-Meta Product Leader
              </p>
              <h1 className="font-display text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.15] mb-5">
                <SketchUnderline color="hsl(var(--accent))">
                  <span className="text-accent">JTBD tells you what users want.</span>
                </SketchUnderline>{" "}
                <span className="text-foreground">The Supply Chain of Intelligence™ tells you where AI value is created, captured, and defended.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
                It helps founders, product leaders, and investors see whether an AI product owns a durable layer of intelligence — or merely sits on a surface larger platforms can absorb.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/framework" className="btn-sketch">
                  Read the Framework <ArrowRight size={15} />
                </Link>
                <Link to="/live" className="btn-sketch-outline">
                  This Week's Analysis →
                </Link>
                <Link to="/market-map" className="btn-sketch-outline">
                  Market Map by Layer
                </Link>
              </div>
            </motion.div>

            {/* Right: L-1–L8 layer stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="font-sketch text-base text-muted-foreground mb-3">
                The 10-Layer Stack — Click to explore ↓
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
              <p className="font-sketch text-xs text-muted-foreground mt-2.5">
                ★ = defensible · Filled dots = defensible sublayers · {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)}+ mapped
              </p>
            </motion.div>
          </div>

          {/* Worked example — Sales Tech layer matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12"
          >
            <SketchBoard className="p-5 md:p-8">
              <p className="font-mono-marker text-[11px] tracking-[0.2em] text-accent mb-2">
                WORKED EXAMPLE · SALES & MARKETING TECH
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1">
                Same category. Different layers. Different fates.
              </h3>
              <div className="h-px w-16 bg-accent/70 mb-6" />

              {/* Header row */}
              {(() => {
                const TABLE_LAYERS = LAYERS.map((l) => {
                  const num = l.id === "L-1" ? "neg1" : l.id.replace("L", "");
                  return { id: l.id, label: l.id, name: l.shortName, cssVar: `--layer-${num}` };
                });

                const rows = [
                  {
                    name: "Claude / Anthropic", sub: "L2 giant",
                    cells: { L2: 3, L3: 2, L4: 2, L5: 1, L6: 1 } as Record<string, number>,
                    verdict: "EXPANDING ↑", verdictClass: "text-emerald-600",
                  },
                  {
                    name: "NVIDIA", sub: "L0 monopolist",
                    cells: { "L-1": 1, L0: 3, L4: 1 } as Record<string, number>,
                    verdict: "DOMINANT", verdictClass: "text-emerald-600",
                  },
                  {
                    name: "Clay", sub: "$3B · data + workflow",
                    cells: { L1: 3, L5: 1, L6: 3, L8: 1 } as Record<string, number>,
                    verdict: "FORTIFIED", verdictClass: "text-emerald-600",
                  },
                  {
                    name: "Sierra", sub: "$15B · agent infra",
                    cells: { L4: 2, L5: 3, L6: 3, L8: 2 } as Record<string, number>,
                    verdict: "FORTIFIED", verdictClass: "text-emerald-600",
                  },
                  {
                    name: "Apollo", sub: "GTM platform",
                    cells: { L1: 2, L6: 3, L7: 1 } as Record<string, number>,
                    verdict: "THINNING ↓", verdictClass: "text-orange-600",
                  },
                  {
                    name: "Outreach", sub: "Sales Engagement",
                    cells: { L6: 3 } as Record<string, number>,
                    verdict: "COMPRESSES", verdictClass: "text-orange-600",
                  },
                ];

                const gridCols = `grid-cols-${LAYERS.length}`;

                return (
                  <>
                    <div className="grid grid-cols-[160px_1fr_100px] md:grid-cols-[180px_1fr_110px] gap-3 items-end mb-2">
                      <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground">COMPANY</span>
                      <div className="grid grid-cols-10 gap-1">
                        {TABLE_LAYERS.map(({ id, label, name, cssVar }) => (
                          <div key={id} className="flex flex-col items-center gap-1 min-w-0">
                            <span className="font-mono-marker text-[8px] md:text-[9px] tracking-[0.04em] text-muted-foreground/90 leading-tight text-center truncate w-full">
                              {name}
                            </span>
                            <div
                              className="w-full text-center font-mono-marker text-[9px] md:text-[10px] font-bold py-1.5 rounded-sm text-white"
                              style={{ background: `hsl(var(${cssVar}))` }}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <span />
                    </div>

                    {rows.map((row, i) => (
                      <div
                        key={row.name}
                        className={`grid grid-cols-[160px_1fr_100px] md:grid-cols-[180px_1fr_110px] gap-3 items-center py-3 ${
                          i % 2 === 0 ? "bg-foreground/[0.025]" : ""
                        } border-t border-foreground/10`}
                      >
                        <div>
                          <div className="font-display text-[15px] font-bold text-foreground leading-tight">{row.name}</div>
                          <div className="font-mono-marker text-[10px] text-muted-foreground/80 mt-0.5">{row.sub}</div>
                        </div>
                        <div className="grid grid-cols-10 gap-1">
                          {TABLE_LAYERS.map(({ id, cssVar }) => {
                            const intensity = row.cells[id] ?? 0;
                            return (
                              <div key={id} className="flex justify-center items-center gap-[2px] h-6">
                                {[1, 2, 3].map((d) => (
                                  <span
                                    key={d}
                                    className="rounded-full"
                                    style={{
                                      width: 5, height: 5,
                                      background: d <= intensity ? `hsl(var(${cssVar}))` : "transparent",
                                    }}
                                  />
                                ))}
                              </div>
                            );
                          })}
                        </div>
                        <span className={`font-mono-marker text-[10px] font-bold tracking-[0.12em] text-right ${row.verdictClass}`}>
                          {row.verdict}
                        </span>
                      </div>
                    ))}
                  </>
                );
              })()}

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-5 mt-5 pt-4 border-t border-foreground/10 font-mono-marker text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-[3px]">{[1, 2, 3].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-foreground/70" />)}</span> Core
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-[3px]"><span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /><span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /></span> Significant
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /> Emerging
                </span>
                <span>Empty = no presence</span>
              </div>

              <p className="font-display italic text-[13px] md:text-[14px] text-orange-700 text-center mt-4 leading-relaxed max-w-3xl mx-auto">
                Claude owns L2 and is reaching into L5/L6/L7 — gravity at work. Apollo thins to a data + connector play
                as Claude becomes the marketer's command center. Most of martech gets swallowed by the juggernaut.
              </p>
            </SketchBoard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ DESIRABILITY WITHOUT DEFENSIBILITY ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-sketch text-lg font-bold text-accent mb-4">
              — The New AI Product Trap
            </p>
            <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight mb-5">
              Desirability without Defensibility
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-4">
              In the old software world, a product could win by solving a user problem better.
              In the AI world, that is only half the question. The other half is structural:
              <strong className="text-foreground"> where does the intelligence come from, where does
              context accumulate, where does trust get verified, where does the workflow live, and
              where does value accrue?</strong>
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-10">
              A product can solve a real user job and still be structurally fragile. That is what
              kills most AI products — not lack of users, but a layer that a foundation model,
              cloud platform, or productivity suite can absorb in a quarter.
            </p>
          </motion.div>

          {/* JTBD vs SCoI contrast table */}
          <motion.div {...fadeIn}>
            <SketchBoard className="p-5 md:p-8 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1.6fr] gap-0 mb-2 pb-3 border-b-2 border-border/60">
                <div />
                <div className="font-sketch text-base font-bold text-muted-foreground px-3">
                  Jobs to Be Done
                </div>
                <div className="font-sketch text-base font-bold text-accent px-3">
                  Supply Chain of Intelligence™
                </div>
              </div>

              {JTBD_VS_SCOI.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1.6fr] gap-0 py-3 border-b border-border/40 last:border-b-0"
                >
                  <div className="font-sketch text-sm font-bold text-foreground px-3 py-1">
                    {row.question}
                  </div>
                  <div className="text-sm text-muted-foreground px-3 py-1 leading-relaxed">
                    {row.jtbd}
                  </div>
                  <div className="text-sm text-foreground px-3 py-1 leading-relaxed font-medium">
                    {row.scoi}
                  </div>
                </div>
              ))}

              <div className="mt-5 pt-4 border-t border-border/60 text-center">
                <p className="font-display text-base md:text-lg text-foreground leading-relaxed">
                  <strong className="text-muted-foreground">JTBD finds demand.</strong>{" "}
                  <strong className="text-accent">The Supply Chain of Intelligence finds defensibility.</strong>
                </p>
              </div>
            </SketchBoard>
          </motion.div>

          {/* Two-fate proof: Gamma surface vs Replit deep ownership */}
          <motion.div {...fadeIn}>
            <p className="font-sketch text-base text-sketch-muted mb-3 text-center">
              — Same prompt-to-output category. Different fate. ↓
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-xl p-5 border border-verdict-exposed/30 bg-verdict-exposed/5 sketch-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sketch text-base font-bold text-verdict-exposed">Gamma</span>
                  <span className="font-sketch text-xs px-2 py-0.5 rounded-full bg-verdict-exposed/15 text-verdict-exposed">L7 only</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-2">
                  Solves a real JTBD: "help me create a polished deck quickly." Beautiful surface.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  But most of the value comes from models and rendering anyone can reproduce.
                  Brand workflow, design system, and proprietary usage data are thin. The platform
                  layer below it can absorb the category.
                </p>
              </div>

              <div className="rounded-xl p-5 border border-verdict-fortified/30 bg-verdict-fortified/5 sketch-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sketch text-base font-bold text-verdict-fortified">Replit</span>
                  <span className="font-sketch text-xs px-2 py-0.5 rounded-full bg-verdict-fortified/15 text-verdict-fortified">L4 + L5 + L6 + L8</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-2">
                  Same prompt-to-output category. But owns the execution chain end-to-end.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Agent + code generation + hosting + auth + database + monitoring + integrations
                  + enterprise controls. Not a UI on top of a model — a system the platform can't
                  bundle in a sprint.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="verdict-dominant bg-accent/5 rounded-xl p-5 max-w-2xl mx-auto mt-10">
              <p className="text-sm text-foreground leading-relaxed italic">
                "JTBD answers <strong>why a user will hire your product</strong>. The Supply Chain
                of Intelligence answers <strong>why OpenAI, Google, Anthropic and other AI
                juggernauts won't erase it</strong>. You need both — if you do it well, you can
                ride the wave without getting crushed in it."
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
            <p className="font-sketch text-lg font-bold text-accent mb-4">
              — Why We Call It a Supply Chain
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

      {/* ═══════════ FULL 10-LAYER MAP ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="mb-10">
            <p className="font-sketch text-lg font-bold text-accent mb-3">
              — The Full Map
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-3 leading-tight">
              10 Layers. {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)} Sublayers. The Defensible Positions Marked.
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
                    <SketchIcon name={layer.goldIcon} size={32} />
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
              <p className="font-sketch text-xl font-bold text-sketch-red mb-2">
                The Defensible Triangle — one common path to survival
              </p>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                The most common fortress pattern for app-layer companies. Not the only way to win —
                a pure gatekeeper like <span className="font-semibold text-foreground">Vanta</span> survives on L3 alone,
                NVIDIA on L0, Snowflake on L4. Owning one layer <em>deeply</em> can be enough.
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
                    <span className="font-sketch text-base font-bold block" style={{ color: "hsl(var(--layer-5))" }}>L5a/b/d ★</span>
                    <span className="text-xs text-muted-foreground block">Deep Skills</span>
                  </span>
                  <span className="absolute bottom-0 right-0 text-center" style={{ transform: "translate(10px, 8px)" }}>
                    <span className="font-sketch text-base font-bold block" style={{ color: "hsl(var(--layer-8))" }}>L8c/d/e ★</span>
                    <span className="text-xs text-muted-foreground block">Compounding Memory</span>
                  </span>
                  <span className="absolute" style={{ left: "135px", top: "122px" }}>
                    <span className="font-sketch text-sm font-bold text-sketch-red">FORTRESS</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {[
                    { id: "L1b", name: "Proprietary Data", note: "Data behind enterprise walls — your gold deposit", color: "hsl(var(--layer-1))" },
                    { id: "L5a/b/d", name: "Deep Skills & Playbooks", note: "Encoded expertise that generic AI can't replicate", color: "hsl(var(--layer-5))" },
                    { id: "L8c/d/e", name: "Compounding Memory", note: "System gets smarter every day — lock-in that compounds", color: "hsl(var(--layer-8))" },
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
                  Own all three → fortress · Own one layer deeply (Vanta on L3, NVIDIA on L0) → still survives · Own a thin sliver of a contested layer → graveyard
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
            <p className="font-sketch text-lg font-bold text-accent mb-4">
              — Three Structural Laws
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
                {LAWS.map((law) => (
                  <div key={law.num} className="flex gap-4 items-start">
                    <div className="min-w-[50px] text-center">
                      <span className="font-sketch text-4xl font-bold leading-none text-sketch-red">
                        {law.num}
                      </span>
                    </div>
                    <div className="flex-1">
                      <SketchBox color="hsl(25 12% 75%)" className="p-4">
                        <span className="font-sketch text-xl font-bold text-foreground block mb-1.5 leading-snug">
                          {law.title}
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed block mb-2">
                          {law.desc}
                        </span>
                        <span className="text-xs text-foreground/70 italic block mb-2 pl-3 border-l-2 border-border">
                          {law.example}
                        </span>
                        <div className="flex items-center gap-2">
                          <SketchArrow direction="right" size={24} />
                          <span className="font-sketch text-sm font-bold text-sketch-red">
                            {law.prediction}
                          </span>
                        </div>
                      </SketchBox>
                    </div>
                  </div>
                ))}
              </div>
            </SketchBoard>
          </motion.div>

          {/* JTBD vs SCoI tagline */}
          <motion.div {...fadeIn} className="text-center mt-8">
            <p className="font-display text-base md:text-lg text-foreground leading-relaxed">
              <strong className="text-muted-foreground">JTBD finds demand.</strong>{" "}
              <strong className="text-accent">The Supply Chain of Intelligence finds defensibility.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ AI DEFENSIBILITY AUDIT ═══════════ */}
      <section id="defensibility-audit" className="bg-secondary/40 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="mb-10">
            <p className="font-sketch text-lg font-bold text-accent mb-4">
              — Use the Framework
            </p>
            <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight mb-3">
              The AI Defensibility Audit
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              Score each area 1–5 (1 = exposed, 5 = owned). Total it. The band tells you whether
              your product is a wrapper, a workflow, or a platform candidate. Built for product
              leaders preparing a strategy review and for investors auditing a SaaS portfolio.
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <SketchBoard className="p-5 md:p-7">
              {/* 8 questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7">
                {AUDIT_QUESTIONS.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 sketch-border"
                  >
                    <span className="font-sketch text-lg font-bold text-accent shrink-0 leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-foreground">{q.area}</span>
                        <span className="font-sketch text-xs px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground shrink-0">
                          {q.layer}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{q.question}</p>
                      {/* 1–5 dot scale */}
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className="w-4 h-4 rounded-full border border-border bg-background"
                            title={`${n}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bands */}
              <div className="pt-5 border-t border-border/60">
                <p className="font-sketch text-base font-bold text-sketch-red mb-3">
                  ← Score yourself out of 40
                </p>
                <div className="space-y-2">
                  {AUDIT_BANDS.map((b) => (
                    <div
                      key={b.range}
                      className="grid grid-cols-[60px_1fr] md:grid-cols-[70px_180px_1fr] gap-3 items-start py-2 border-b border-border/40 last:border-b-0"
                    >
                      <span
                        className="font-sketch text-base font-bold"
                        style={{ color: `hsl(${b.color})` }}
                      >
                        {b.range}
                      </span>
                      <span
                        className="font-display text-sm font-bold text-foreground"
                        style={{ color: `hsl(${b.color})` }}
                      >
                        {b.label}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground leading-relaxed col-span-2 md:col-span-1">
                        {b.verdict}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-sketch text-xs text-muted-foreground/60 mt-5 text-center">
                Use it as a one-page scorecard in your next strategy review or investment memo.
              </p>
            </SketchBoard>
          </motion.div>
        </div>
      </section>


      {/* ═══════════ CASE STUDIES ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sketch text-lg font-bold text-accent mb-3">
                — The Framework in Action
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
            <p className="font-sketch text-lg font-bold text-accent mb-4">
              — The Intelligence Cube™
            </p>
            <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-3">
              9 Functions × 9 Verticals × 10 Layers
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
            <p className="font-sketch text-lg font-bold text-accent mb-4">
              — The Diagnostic
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
            <Link to="/framework" className="btn-sketch">
              Explore the Framework <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SUBSCRIBE ═══════════ */}
      <section id="newsletter" className="bg-background border-t border-border">
        <div className="max-w-xl mx-auto px-6 py-14 text-center">
          <BookOpen className="mx-auto mb-3 text-accent/70" size={26} />
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            One worked example per week
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            One company. Scored on the 10 layers. Verdict in plain English. No filler, no upsell.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Newsletter signup will be connected soon!"); }}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input type="email" placeholder="you@company.com" required
              aria-label="Email address"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm" />
            <button type="submit" className="btn-sketch whitespace-nowrap">
              Get it monthly
            </button>
          </form>
        </div>
      </section>

    </SiteLayout>
  );
};

export default Index;