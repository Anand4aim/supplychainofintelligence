import { motion } from "framer-motion";

import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { LAYERS } from "@/data/layers";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";
import ExportablePng from "@/components/ExportablePng";
import FrameworkSummaryPoster from "@/components/posters/FrameworkSummaryPoster";
import ProofOfCorpus from "@/components/ProofOfCorpus";

import {
  SketchFilters,
  SketchBoard,
  SketchUnderline,
} from "@/components/sketch/SketchElements";

import Eyebrow from "@/components/Eyebrow";
import VoicesStrip from "@/components/VoicesStrip";
import GoldMiningAnchor from "@/components/home/GoldMiningAnchor";
import ThreeLayerProof from "@/components/home/ThreeLayerProof";
import ContrastRow from "@/components/home/ContrastRow";
import ThreeAreasOfAI from "@/components/home/ThreeAreasOfAI";
import TwoLensesOnCoreProduct from "@/components/home/TwoLensesOnCoreProduct";

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
        title="Supply Chain of Intelligence — Defensibility Map for AI"
        description="Score any AI product across 10 layers — compute, data, models, workflows, surfaces, memory — to see whether it's a moat or a wrapper. The generative AI stack, not logistics."
        path="/"
      />

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
              <Eyebrow tone="accent" dash={false} className="mb-4">
                Strategic Framework · AI Defensibility
              </Eyebrow>
              <h1 className="font-display text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.1] mb-5 text-foreground">
                A <SketchUnderline color="hsl(var(--accent))"><span className="text-accent">defensibility map</span></SketchUnderline> for AI companies.
              </h1>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed max-w-xl mb-4">
                Is your product a moat, a workflow, or a wrapper a platform will absorb? The Supply Chain of Intelligence™ scores every AI product across <strong className="text-foreground">10 layers and 50 sublayers</strong> — from compute and data to workflows, surfaces, and memory — and tells you where value actually accrues.
              </p>
              <p className="font-mono-marker text-[11px] tracking-[0.16em] uppercase text-muted-foreground mb-6">
                The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/framework" className="btn-sketch">
                  Read the framework <ArrowRight size={15} />
                </Link>
                <Link to="/live" className="btn-sketch-outline">
                  This week's analysis
                </Link>
              </div>
              <p className="text-[12px] text-muted-foreground mt-4">
                Prepared by <Link to="/about" className="underline-offset-2 hover:underline">Anand Arivukkarasu</Link>, Ex-Meta (Instagram) Product Leader, as a free resource for product leaders.
              </p>
            </motion.div>


            {/* Right: L-1–L8 layer stack — editorial chip + sublayer cells */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="mb-3">
                <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-accent">
                  The Supply Chain of Intelligence™ <span style={{ textTransform: 'none' }}>(SCoI)</span>
                </p>
              </div>
              <div
                className="rounded-2xl p-3 md:p-4 space-y-[6px] relative border border-foreground/10"
                style={{
                  background:
                    "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
                }}
              >
                {[...LAYERS].reverse().map((layer, i) => {
                  const c = `hsl(${layer.color})`;
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      className="grid grid-cols-[96px_1fr] gap-[6px] items-stretch"
                    >
                      {/* Layer chip — colored, links to layer */}
                      <Link
                        to={`/framework#${layer.id}`}
                        className="rounded-md px-2.5 py-2 flex flex-col justify-center transition-transform hover:-translate-y-[1px]"
                        style={{ background: c }}
                        title={`${layer.id} — ${layer.name}`}
                      >
                        <div className="font-mono-marker text-white text-[11px] font-bold tracking-wider leading-none">
                          {layer.id === "L-1" ? "L−1" : layer.id}
                        </div>
                        <div className="font-display text-white text-[12px] leading-tight mt-0.5 truncate">
                          {layer.shortName}
                        </div>
                      </Link>

                      {/* 5 evenly-sized sublayer cells (matches /posters grid) */}
                      <div className="grid grid-cols-5 gap-[5px]">
                        {layer.sublayers.slice(0, 5).map((s, idx) => {
                          const inner = layer.id === "L-1" ? "neg1" : layer.id.replace("L", "");
                          const bgAlpha = 0.34 - idx * 0.05; // 0.34 → 0.14
                          const bg = `hsl(var(--layer-${inner}) / ${bgAlpha})`;
                          return (
                            <Link
                              key={s.id}
                              to={`/framework#${layer.id}`}
                              className="rounded-md px-2 py-1.5 flex flex-col justify-center min-w-0 transition-transform hover:-translate-y-[1px]"
                              style={{ background: bg }}
                              title={`${s.id} ${s.name}${s.defensible ? " ★" : ""}`}
                            >
                              <div className="font-mono-marker text-[9px] tracking-wider font-bold leading-none flex items-center gap-1 text-foreground/70">
                                <span>{s.id}</span>
                                {s.defensible && <span style={{ color: c }}>★</span>}
                              </div>
                              <div className="font-display text-foreground text-[11.5px] leading-tight mt-1 line-clamp-2">
                                {s.name}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-2.5 flex items-baseline justify-between gap-3 flex-wrap">
                <p className="font-sketch text-xs text-muted-foreground italic">
                  ★ = structurally defensible · {LAYERS.reduce((a, l) => a + l.sublayers.length, 0)} sublayers mapped
                </p>
                <Link
                  to="/framework"
                  className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent hover:underline"
                >
                  See the full 10×5 grid →
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════ PLAIN-TEXT MIRRORS — AI assistant fallbacks ═══════════ */}
      <section className="border-b border-border/40 bg-background">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-mono-marker text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
            Plain-text mirrors
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href="/paper.md" className="font-mono-marker text-[10px] tracking-wider text-accent hover:underline">paper.md</a>
            <span className="text-muted-foreground/40">·</span>
            <a href="/llms.txt" className="font-mono-marker text-[10px] tracking-wider text-accent hover:underline">llms.txt</a>
            <span className="text-muted-foreground/40">·</span>
            <a href="/sitemap.xml" className="font-mono-marker text-[10px] tracking-wider text-accent hover:underline">sitemap.xml</a>
            <span className="text-muted-foreground/40">·</span>
            <a href="/robots.txt" className="font-mono-marker text-[10px] tracking-wider text-accent hover:underline">robots.txt</a>
          </div>
        </div>
      </section>

      {/* ═══════════ COLD OPEN — Three Areas of AI Transformation ═══════════ */}
      <ThreeAreasOfAI />

      {/* ═══════════ COLD OPEN — Two Lenses on Core Product ═══════════ */}
      <TwoLensesOnCoreProduct />

      {/* ═══════════ GOLD MINING ANCHOR — Tier-1 one-liner ═══════════ */}
      <GoldMiningAnchor />

      {/* ═══════════ THREE-LAYER PROOF — Bloomberg / Harvey / Sierra ═══════════ */}
      <ThreeLayerProof />

      {/* ═══════════ CONTRAST ROW — Jasper vs Cursor ═══════════ */}
      <ContrastRow />

      {/* ═══════════ FRAMEWORK SUMMARY POSTER + WORKED EXAMPLE ═══════════ */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-14 md:pb-16">







          {/* Framework summary poster — the "what is this?" image people screenshot and share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12"
          >
            <div className="mb-4 flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <Eyebrow className="mb-1">The Framework · One Image</Eyebrow>
                <p className="font-sketch text-sm text-muted-foreground italic">
                  Screenshot this. Paste it anywhere. Cite it where it helps.
                </p>
              </div>
            </div>
            <FrameworkSummaryPoster />
          </motion.div>





          {/* Worked example — Sales Tech layer matrix (now below the summary poster) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12"
          >
            <ExportablePng
              fileName="scoi-sales-marketing-layer-matrix"
              caption="Sales & Marketing Tech — Layer Matrix"
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
                  // Render L-1 with a true Unicode minus so it reads correctly.
                  const label = l.id === "L-1" ? "L\u22121" : l.id;
                  return { id: l.id, label, name: l.shortName, cssVar: `--layer-${num}` };
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
                    name: "Apollo", sub: "GTM data + L2 connector",
                    cells: { L1: 3, L2: 2, L4: 2 } as Record<string, number>,
                    verdict: "L1+L2 SURVIVOR", verdictClass: "text-emerald-600",
                  },
                  {
                    name: "Outreach", sub: "Sales Engagement",
                    cells: { L6: 3 } as Record<string, number>,
                    verdict: "COMPRESSES", verdictClass: "text-orange-600",
                  },
                ];

                const gridCols = `grid-cols-${LAYERS.length}`;

                return (
                  <div className="-mx-5 md:mx-0 overflow-x-auto md:overflow-visible scrollbar-thin scrollbar-thumb-border">
                    <div className="md:hidden px-5 pb-2 font-mono-marker text-[9px] tracking-[0.18em] text-muted-foreground/70 flex items-center gap-1.5">
                      <span>SWIPE</span>
                      <span aria-hidden>→</span>
                    </div>
                    <div className="min-w-[760px] md:min-w-0 pr-5 md:px-0">
                    <div className="grid grid-cols-[150px_1fr_104px] md:grid-cols-[180px_1fr_110px] gap-3 items-end mb-2 sticky top-0 z-30 bg-background md:static md:bg-transparent pt-2 pb-2 -mt-2 shadow-[0_1px_0_0_hsl(var(--border))] md:shadow-none">
                      <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground sticky left-0 z-40 bg-background md:bg-transparent md:static pl-5 md:pl-0 pr-3 md:pr-0 shadow-[1px_0_0_0_hsl(var(--border))] md:shadow-none self-end pb-1">COMPANY</span>
                      <div className="grid grid-cols-10 gap-1">
                        {TABLE_LAYERS.map(({ id, label, name, cssVar }) => (
                          <div key={id} className="flex flex-col items-center gap-1 min-w-0">
                            <span className="font-mono-marker text-[9px] md:text-[9px] tracking-[0.02em] text-muted-foreground/90 leading-[1.1] text-center w-full break-words hyphens-auto">
                              {name}
                            </span>
                            <div
                              className="w-full text-center font-mono-marker text-[10px] md:text-[10px] font-bold py-1.5 rounded-sm text-white"
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
                        className={`grid grid-cols-[150px_1fr_104px] md:grid-cols-[180px_1fr_110px] gap-3 items-center py-3 ${
                          i % 2 === 0 ? "bg-foreground/[0.025]" : ""
                        } border-t border-foreground/10`}
                      >
                        <div className={`sticky left-0 z-10 md:static md:bg-transparent pl-5 md:pl-0 pr-3 md:pr-0 -my-3 py-3 shadow-[1px_0_0_0_hsl(var(--border))] md:shadow-none ${
                          i % 2 === 0 ? "bg-[hsl(var(--background))]" : "bg-background"
                        }`}>
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
                                      width: 6, height: 6,
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
                    </div>
                  </div>
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
                Claude owns L2 and is reaching into L5/L6/L7 — gravity at work. Apollo thins toward a data + connector role
                as Claude becomes the marketer's command center. Much of martech gets compressed unless it deepens into L1 or L8.
              </p>
            </SketchBoard>
            </ExportablePng>
          </motion.div>
        </div>
      </section>

      {/* StartHereStrip removed in v3 — Three-Layer Proof now serves the lobby role */}

      {/* ═══════════ AI DEFENSIBILITY AUDIT — hidden from public view ═══════════ */}


      {/* ═══════════ PROOF OF CORPUS ═══════════ */}
      <ProofOfCorpus />


      {/* Gold Mining Analogy moved to /framework — canonical reference */}


      {/* Full 10-Layer Map + Defensible Triangle moved to /framework — canonical reference */}


      {/* Four Structural Laws moved to /framework — canonical reference */}


      {/* ═══════════ VOICES ON THE FRAMEWORK ═══════════ */}
      <VoicesStrip />

      {/* AI DEFENSIBILITY AUDIT — removed from public view */}

      {/* Crux moved up — right after the Framework summary poster */}


      {/* ═══════════ CASE STUDIES ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <motion.div {...fadeIn} className="flex items-end justify-between mb-10">
            <div>
              <Eyebrow className="mb-3">
  The Framework in Action
</Eyebrow>
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

      {/* ═══════════ PROOF RAIL — ALL 19 WORKED EXAMPLES ═══════════ */}
      <section id="proof-rail" className="bg-background border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
          <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
            <div>
              <Eyebrow className="mb-2">The Corpus</Eyebrow>
              <h2 className="font-display text-[22px] md:text-[28px] font-bold text-foreground leading-tight">
                All {CASE_STUDIES.length} worked examples, in one rail
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                Every analysis applies the same 10-layer lens to a real company or category — same framework, different verdicts. Scroll to scan; click any to read.
              </p>
            </div>
            <Link to="/analysis" className="shrink-0 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:gap-2 transition-all">
              Open the analysis index <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="relative -mx-6 px-6">
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-border">
                {CASE_STUDIES.map((study) => (
                  <Link
                    key={study.slug}
                    to={`/analysis/${study.slug}`}
                    className="snap-start shrink-0 w-[280px] md:w-[300px] p-4 rounded-xl border border-border bg-card hover:border-accent/60 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {study.companies.slice(0, 3).map((c) => (
                        <img
                          key={c.name}
                          src={c.logo}
                          alt={c.name}
                          className="w-7 h-7 rounded-full bg-white object-contain border border-border"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ))}
                      <span className="font-mono-marker text-[9px] tracking-[0.14em] text-muted-foreground ml-auto truncate max-w-[110px]">
                        {study.layers.join(" · ")}
                      </span>
                    </div>
                    <p className="font-mono-marker text-[9px] tracking-[0.16em] text-accent mb-1.5">
                      {study.tag}
                    </p>
                    <h3 className="font-display text-[14px] font-bold text-foreground leading-snug line-clamp-3 group-hover:text-accent transition-colors min-h-[3.5em]">
                      {study.title}
                    </h3>
                    <p className="mt-3 pt-3 border-t border-border/60 font-mono-marker text-[10px] text-muted-foreground">
                      Verdict: <span className="text-foreground/80">{study.verdict}</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Intelligence Cube moved to /framework — canonical reference (Rule B) */}

      {/* ═══════════ DIAGNOSTIC CTA ═══════════ */}
      <section className="bg-secondary/40">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div {...fadeIn}>
            <Eyebrow className="mb-4">
  The Diagnostic
</Eyebrow>
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