import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import CanonicalDefinition from "@/components/CanonicalDefinition";
import Seo from "@/components/Seo";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LAYERS, DEFENSIBLE_TRIANGLE, GOLD_KEY_INSIGHT, LAWS, JTBD_VS_SCOI, OBSERVATIONS } from "@/data/layers";
import { CATEGORY_LINE, DEFINITION_LONG, ALTERNATE_NAMES, BLINDSPOTS_LINE, BLINDSPOTS_SHORT, BLINDSPOTS_PARADIGM_LINE } from "@/data/definition";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import IntelligenceGrid from "@/components/IntelligenceGrid";
import ExportablePng from "@/components/ExportablePng";
import { SketchFilters, SketchBoard } from "@/components/sketch/SketchElements";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";

/**
 * /framework — the canonical reference, organized around the six
 * questions a reader actually asks, in order:
 *
 *   1. Definition    — What is it?
 *   2. Map           — Where does value accrue?
 *   3. Laws          — Why does it work?
 *   4. Dynamics      — How does it evolve?
 *   5. Applications  — How do I use it?  (Cube and Triangle live here as instruments.)
 *   6. Observations  — What's happening now?  (Pointer to the live feed.)
 *
 * Each section is a summary + deep-links. The page is the table of contents;
 * deep dives live at their own routes.
 */

const layerSlug = (id: string, shortName: string) =>
  `${id.toLowerCase()}-${shortName.toLowerCase().replace(/\s+/g, "-")}`;

const TOC = [
  { id: "definition", label: "Definition", q: "What is it?" },
  { id: "map", label: "Map", q: "Where does value accrue?" },
  { id: "laws", label: "Laws", q: "Why does it work?" },
  { id: "dynamics", label: "Dynamics", q: "How does it evolve?" },
  { id: "applications", label: "Applications", q: "How do I use it?" },
  { id: "reasoning", label: "Reasoning", q: "How do I think with it?" },
  { id: "observations", label: "Observations", q: "What's happening now?" },
];

const SectionHeader = ({
  num,
  id,
  eyebrow,
  question,
  title,
  lede,
}: {
  num: string;
  id: string;
  eyebrow: string;
  question: string;
  title: string;
  lede?: string;
}) => (
  <div className="max-w-3xl mb-10">
    <div className="flex items-baseline gap-3 mb-3">
      <span className="font-mono-marker text-[11px] tracking-[0.25em] uppercase text-accent font-bold">
        {num}
      </span>
      <Eyebrow className="mb-0">{eyebrow}</Eyebrow>
    </div>
    <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
      {question}
    </p>
    <h2
      id={id}
      className="font-display text-[28px] md:text-[36px] font-bold text-foreground leading-[1.1] mb-4 scroll-mt-24"
    >
      {title}
    </h2>
    {lede && <p className="text-foreground/80 text-[16px] leading-[1.75]">{lede}</p>}
  </div>
);

const FrameworkPage = () => (
  <SiteLayout>
    <Seo
      title="The Framework — Supply Chain of Intelligence"
      description="Supply Chain of Intelligence™ — the strategic framework and reasoning engine for AI. 10 layers, 50 sublayers, 4 laws, 3 currents, the Intelligence Cube, and an explicit reasoning protocol (Layer → Sublayer → Questions → Laws → Observations → Signals → Competitors → Opportunities → Recommendations) that tells humans and LLMs how to actually think with the map."
      path="/framework"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Supply Chain of Intelligence",
        alternateName: [...ALTERNATE_NAMES],
        description: CATEGORY_LINE,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Supply Chain of Intelligence™",
          url: "https://supplychainofai.com/framework",
        },
        url: "https://supplychainofai.com/framework",
        sameAs: [
          "https://supplychainofai.com/paper",
          "https://supplychainofai.com/not-a-stack",
        ],
      })}</script>
    </Helmet>
    <SketchFilters />

    {/* ═══════════ HERO ═══════════ */}
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Eyebrow className="mb-6">The Framework</Eyebrow>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-2">
            Supply Chain of Intelligence™
          </h1>
          <p className="font-mono-marker text-[11px] tracking-[0.16em] uppercase text-muted-foreground mb-6">
            <span style={{ textTransform: "none" }}>SCoI</span>, the 10 layers of the generative AI stack
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            One page. Seven questions. The canonical reference — and the reasoning protocol to run it.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ═══════════ TABLE OF CONTENTS ═══════════ */}
    <section className="bg-background border-y border-border sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono-marker text-[10px] uppercase tracking-[0.22em] text-muted-foreground shrink-0 mr-2 hidden md:inline">
            Read in order →
          </span>
          {TOC.map((t, i) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="shrink-0 inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card hover:border-accent hover:text-accent transition-colors font-display text-sm font-semibold text-foreground"
            >
              <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em]">
                0{i + 1}
              </span>
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════════ 01 · DEFINITION ═══════════ */}
    <section className="bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="01"
          id="definition"
          eyebrow="The Definition"
          question="What is it?"
          title="Intelligence is a supply chain."
        />
        <div className="max-w-3xl">
          <CanonicalDefinition variant="compact" showPositioning={false} />


          {/* Paradigm callout — promoted to sit immediately after the canonical definition */}
          <div className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.04] p-6 md:p-7">
            <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-accent mb-3">
              A deeper, fuller view — beyond the older stack and value chain lenses
            </p>
            <p className="font-display text-[17px] md:text-[19px] leading-snug text-foreground mb-5 border-l-2 border-accent pl-4">
              {BLINDSPOTS_PARADIGM_LINE}
            </p>

            <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-accent mb-3">
              Why the stack view, and the value chain view, are not enough
            </p>
            <p className="font-display text-[15.5px] md:text-[16.5px] leading-snug text-foreground/85 mb-4">
              {BLINDSPOTS_SHORT}
            </p>
            <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              Seven things that go missing
            </p>
            <ul className="space-y-2.5 text-[14.5px] md:text-[15px] text-foreground/85 leading-relaxed">
              <li><strong className="text-foreground">Gatekeeping</strong> — who controls each chokepoint, and what they can charge to let traffic through. Neither a stack nor a value chain has a concept for this.</li>
              <li><strong className="text-foreground">Bottlenecks above and below the visible layers</strong> — L−1 resources, L3 verification, L8 memory. Stack diagrams crop them out.</li>
              <li><strong className="text-foreground">Currents that move value sideways</strong> — capital, demand, attention flow across layers and decide which defensible position becomes a business.</li>
              <li><strong className="text-foreground">Flywheels that compound across sublayers</strong> — L5 → L1d → L8c is a loop, not a list of components.</li>
              <li><strong className="text-foreground">Vertical adjacencies</strong> the Intelligence Cube exposes — the same layer behaves differently in Legal vs. Health vs. FinTech.</li>
              <li><strong className="text-foreground">Absorption risk</strong> a platform poses to every layer beneath it — the stack shows neighbors, not predators.</li>
              <li><strong className="text-foreground">Timing</strong> — when each layer commoditizes, and what survives the compression.</li>
            </ul>
            <p className="text-[13.5px] text-muted-foreground italic mt-5 leading-relaxed">
              A stack describes parts. A value chain describes flow. A supply chain of intelligence describes the whole system — gatekeeping, bottlenecks, currents, flywheels, absorption — which is the level at which durable AI strategy can actually be reasoned about.
            </p>
          </div>

          <div className="mt-8 border-l-2 border-foreground/20 pl-5">
            <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
              How it sits next to the AI stack
            </p>
            <p className="font-display text-[16px] md:text-[18px] leading-snug text-foreground/85">
              The AI stack explains how intelligence is built. The Supply Chain of Intelligence explains where intelligence becomes economically defensible.
            </p>
          </div>



          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/paper" className="text-accent font-display font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              Read the Paper <ArrowRight size={14} />
            </Link>
            <Link to="/about#why-this-exists" className="text-muted-foreground font-display font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 hover:text-foreground transition-all">
              Why we built this <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════ 02 · MAP ═══════════ */}
    <section className="bg-secondary/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="02"
          id="map"
          eyebrow="The Map"
          question="Where does value accrue?"
          title="A map of where value accrues, not where code runs."
          lede="The 10 layers (L−1 Resources → L8 Memory) are the structural vocabulary. They group into three tiers — Substrate, Workflow, Surface — that compound on very different timescales. Three market currents (Demand Gravity, Attention Economics, Capital Flows) flow horizontally across all of them and decide whether a defensible position becomes a business. This is the map an AI stack diagram can't draw."
        />

        {/* TIERS TL;DR — Substrate / Workflow / Surface */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-5">
            Before the 10, the 3 tiers
          </p>
          <div className="space-y-4 md:space-y-5">
            {[
              { label: "SURFACE", sub: "What users touch", layers: "L7", color: "var(--layer-7)", width: "w-full", verdict: "Easily replicated. Platforms ship this for free.", durability: "Weeks" },
              { label: "WORKFLOW", sub: "What users live inside", layers: "L4 · L5 · L6", color: "var(--layer-5)", width: "w-[78%]", verdict: "Sticky if deep. Survivable if owned.", durability: "Months" },
              { label: "SUBSTRATE", sub: "What users depend on", layers: "L−1 · L0 · L1 · L2 · L3 · L8", color: "var(--layer-1)", width: "w-[56%]", verdict: "Proprietary data, trust gates, compounding memory.", durability: "Years" },
            ].map((t, i) => (
              <div key={t.label} className="flex items-stretch gap-4">
                <div className="shrink-0 w-10 md:w-14 flex items-start justify-end pt-3">
                  <span className="font-display font-bold text-2xl md:text-4xl tabular-nums" style={{ color: `hsl(${t.color})` }}>
                    0{i + 1}
                  </span>
                </div>
                <div className={`${t.width} relative`}>
                  <div className="rounded-r-lg p-5 md:p-6 border-l-[6px]" style={{ borderLeftColor: `hsl(${t.color})`, background: `hsl(${t.color} / 0.06)` }}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <span className="font-mono-marker text-[11px] tracking-[0.25em]" style={{ color: `hsl(${t.color})` }}>{t.label}</span>
                      <span className="text-xs text-muted-foreground font-mono-marker">{t.layers}</span>
                    </div>
                    <p className="font-display text-xl md:text-2xl font-bold text-foreground mb-1.5">{t.sub}</p>
                    <p className="text-sm md:text-[15px] text-muted-foreground">{t.verdict}</p>
                  </div>
                </div>
                <div className="shrink-0 hidden md:flex flex-col justify-center min-w-[80px]">
                  <span className="font-mono-marker text-[10px] tracking-[0.2em] text-muted-foreground/60">DURABILITY</span>
                  <span className="font-display text-lg font-bold" style={{ color: `hsl(${t.color})` }}>{t.durability}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground font-display italic text-[15px] max-w-3xl">
            <ArrowDown size={14} className="inline mr-2 text-accent" />
            Value escapes the surface and accumulates in the layers below.
            <span className="text-foreground"> Own the lower layers, or rent them, and rent your future.</span>
          </p>
        </div>

        {/* THE GRID, 10×5 */}
        <div className="mb-16">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            The full taxonomy, one image
          </p>
          <ExportablePng fileName="scoi-10x50-grid" caption="Supply Chain of Intelligence, 10 × 50 grid">
            <IntelligenceGrid mode="blank" />
          </ExportablePng>
        </div>

        {/* GOLD MINING ANALOGY */}
        <div className="mb-16">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Why we call it a supply chain
          </p>
          <h3 className="font-display text-[24px] md:text-[28px] font-bold text-foreground mb-3">
            From gold in the ground to the ring on your finger
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            Every layer transforms the output of the layer below it. Most companies only own one
            layer. The supply chain is only as strong as its weakest link.
          </p>

          <ExportablePng fileName="scoi-gold-vs-ai-parallel" caption="Gold Mining ⇄ Supply Chain of Intelligence, parallel view">
            <div className="bg-card rounded-xl border border-border sketch-border p-5 md:p-7">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 md:gap-x-5 items-center mb-3 pb-3 border-b border-border">
                <div className="font-mono-marker text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-accent text-right">Gold Supply Chain</div>
                <div className="font-mono-marker text-[10px] text-muted-foreground px-1">≡</div>
                <div className="font-mono-marker text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-accent">Supply Chain of Intelligence</div>
              </div>
              <div className="flex flex-col gap-1.5">
                {LAYERS.map((layer) => (
                  <div key={`snap-${layer.id}`} className="grid grid-cols-[1fr_auto_1fr] gap-x-3 md:gap-x-5 items-center py-1.5 border-b border-border/40 last:border-b-0">
                    <div className="flex items-center justify-end gap-2.5 text-right min-w-0">
                      <div className="min-w-0">
                        <div className="font-display text-[13px] md:text-[14px] font-bold text-foreground leading-tight truncate">{layer.goldTitle.split(", ")[0]}</div>
                        <div className="text-[11px] md:text-[12px] text-muted-foreground leading-snug truncate">{layer.goldTitle.split(", ")[1] ?? ""}</div>
                      </div>
                      <SketchIcon name={layer.goldIcon} size={28} className="shrink-0" />
                    </div>
                    <div className="font-mono-marker text-[10px] md:text-[11px] font-bold px-1.5" style={{ color: `hsl(${layer.color})` }}>→</div>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-sketch text-[13px] md:text-[14px] font-bold shrink-0 px-1.5 py-0.5 rounded" style={{ color: `hsl(${layer.color})`, background: `hsl(${layer.bg})` }}>{layer.id}</span>
                      <div className="min-w-0">
                        <div className="font-display text-[13px] md:text-[14px] font-bold text-foreground leading-tight truncate">{layer.name}</div>
                        <div className="text-[11px] md:text-[12px] text-muted-foreground leading-snug truncate">{layer.players.slice(0, 3).join(" · ")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ExportablePng>

          {/* PER-LAYER CARDS */}
          <div className="relative mt-10">
            <div className="space-y-1">
              {LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  id={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="relative z-10"
                >
                  <div className="flex gap-0 rounded-xl overflow-hidden border border-border bg-card sketch-border" style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${layer.color})` }}>
                    <div className="flex flex-col items-center justify-center px-4 py-5 min-w-[78px] md:min-w-[94px]" style={{ background: `hsl(${layer.bg})` }}>
                      <SketchIcon name={layer.goldIcon} size={36} className="mb-1" />
                      <span className="font-sketch text-xl font-bold" style={{ color: `hsl(${layer.color})` }}>{layer.id}</span>
                      <span className="font-sketch text-xs font-bold mt-0.5" style={{ color: `hsl(${layer.color})` }}>{layer.shortName}</span>
                    </div>
                    <div className="flex-1 py-4 px-5 md:px-6">
                      <h4 className="font-display text-base md:text-lg font-bold text-foreground mb-1.5">{layer.goldTitle}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{layer.goldAnalogy}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {layer.sublayers.map((sub) => (
                          <div key={sub.id} className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 sketch-border" style={{ background: sub.defensible ? `hsl(${layer.bg})` : `hsl(${layer.bg} / 0.4)`, border: sub.defensible ? `1.5px solid hsl(${layer.color} / 0.35)` : "1.5px solid transparent" }}>
                            <span className="font-sketch text-sm font-bold whitespace-nowrap mt-0.5" style={{ color: `hsl(${layer.color})` }}>{sub.id}{sub.defensible ? " ★" : ""}</span>
                            <div className="min-w-0">
                              <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                              <p className="text-xs text-muted-foreground leading-snug mt-0.5">{sub.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        {layer.players.map((p) => (
                          <span key={p} className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p}</span>
                        ))}
                        <span className="font-sketch text-sm font-bold uppercase tracking-wider ml-auto" style={{ color: `hsl(${layer.color})` }}>{layer.verdict}</span>
                      </div>
                      <Link to={`/framework/${layerSlug(layer.id, layer.shortName)}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all">
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

            <div className="mt-8">
              <SketchBoard className="p-6 md:p-8">
                <p className="text-base text-foreground leading-relaxed">
                  <span className="font-sketch text-xl font-bold text-sketch-red">← Key insight: </span>
                  {GOLD_KEY_INSIGHT}
                </p>
              </SketchBoard>
            </div>
          </div>
        </div>

        {/* AGENT DECODER */}
        <div className="mb-16 max-w-4xl">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            On the word "agent"
          </p>
          <h3 className="font-display text-[24px] md:text-[28px] font-bold text-foreground mb-4 leading-[1.15]">
            "Agent" is not a layer. It's a costume worn by L5.
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Every company shipping "an agent" in 2025 is selling the same structural package:{" "}
            <strong className="text-foreground">L5 Execution</strong> + <strong className="text-foreground">L6 Orchestration</strong>,
            usually wrapped in an <strong className="text-foreground">L7 Surface</strong>,
            sometimes with <strong className="text-foreground">L8 Memory</strong>, riding on{" "}
            <strong className="text-foreground">L4 Access</strong> pipes. When you read "we launched
            an agent," decode it: name L5 + L6 first, then which of L4 / L7 / L8 it bundles.
          </p>
          <div className="rounded-xl p-6 bg-secondary/40 border border-border">
            <p className="font-mono-marker text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-3">The Decoder</p>
            <ul className="space-y-2.5 text-[15px] text-foreground/85 leading-relaxed">
              <li><strong className="text-foreground">Agent + L1b Proprietary Data</strong> → fortress. (Sierra, Harvey, Klarna's internal stack.)</li>
              <li><strong className="text-foreground">Agent + L4 Distribution</strong> → railroad. (Salesforce Agentforce, Microsoft Copilot agents.)</li>
              <li><strong className="text-foreground">Agent + L8 Compounding Memory</strong> → memory moat. (Glean, Cresta, Decagon.)</li>
              <li><strong className="text-foreground">Agent + nothing else</strong> → exposed L7 wrapper. Commoditizes the moment the underlying L2 ships the same loop.</li>
            </ul>
          </div>
        </div>

        {/* THREE CURRENTS */}
        <div id="currents" className="scroll-mt-24">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            The forces acting on the map
          </p>
          <h3 className="font-display text-[24px] md:text-[28px] font-bold text-foreground mb-3">
            Three Currents flow across every layer
          </h3>
          <p className="text-base text-muted-foreground max-w-3xl mb-3 leading-relaxed">
            The 10 layers describe how intelligence is produced and delivered, the supply side.
            Three market currents flow horizontally across every layer and decide whether a
            defensible position actually compounds into a business.
          </p>
          <p className="text-xs text-muted-foreground/80 italic max-w-3xl mb-8">
            Currents are market forces, not layers. Regulatory and geopolitical constraints live at
            their native layers (L−1 energy/fabs/materials, L3 compliance and export controls) and
            are not currents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "C1", title: "Demand Gravity", oneLine: "Where the budget actually sits, and what it pulls toward.", desc: "As L2 prices collapse, demand moves toward outcomes (L5+L8), verification (L3), and proprietary data access (L1), not generation itself.", action: "Name the buyer, the budget line, and what they stop paying for once L2 is free." },
              { num: "C2", title: "Attention Economics", oneLine: "What becomes scarce when generation becomes infinite.", desc: "Default placement, OS integration, habit loops, and on-ramp ownership decide who gets used. Apple, Google, Microsoft become L7 landlords charging rent in attention.", action: "Assume infinite supply. Ask: who owns the on-ramp, what does default placement cost?" },
              { num: "C3", title: "Capital Flows", oneLine: "How funding rounds bend the chain they fund.", desc: "Tens of billions into L2 created a generation glut; near-zero into L−1 created the energy and fab bottleneck constraining everything above it. Capital overheats the fashionable layer and starves the unglamorous one.", action: "Read the funding map as a distortion field, not as a value signal." },
            ].map((c, i) => (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 sketch-border flex flex-col"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-sketch text-3xl font-bold text-accent">{c.num}</span>
                  <h4 className="font-display text-lg font-bold text-foreground leading-snug">{c.title}</h4>
                </div>
                <p className="font-display text-sm text-foreground mb-3 italic leading-snug">{c.oneLine}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                <p className="text-xs text-accent leading-relaxed mt-auto pt-3 border-t border-border/60">
                  <span className="font-mono-marker uppercase tracking-[0.18em]">Use it · </span>{c.action}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════ 03 · LAWS ═══════════ */}
    <section className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="03"
          id="laws"
          eyebrow="The Laws"
          question="Why does it work?"
          title="Four structural laws predict the future."
          lede="Not opinions. Structural forces that explain why most AI products get compressed in the layer they were built in, and which counter-moves keep them durable as the platforms move. Each Law is falsifiable: name a counter-example mechanism and the Law has to be amended."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAWS.map((law, i) => (
            <motion.div
              key={law.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-7 sketch-border"
            >
              <div className="font-sketch text-5xl font-bold text-accent mb-3">{law.num}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3 leading-snug">{law.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{law.desc}</p>
              <div className="text-xs text-muted-foreground/80 italic mb-3 pl-3 border-l-2 border-border">{law.example}</div>
              <p className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent">{law.prediction}</p>
            </motion.div>
          ))}
        </div>

        {/* JTBD vs SCoI — supports the Laws */}
        <div className="mt-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Why the Laws matter
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-5">
            Jobs To Be Done finds demand. Supply Chain of Intelligence finds defensibility.
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-12 gap-4 mb-6 border-b border-border/60 pb-5">
                <div className="col-span-12 md:col-span-4"></div>
                <div className="col-span-6 md:col-span-4">
                  <span className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Jobs To Be Done</span>
                </div>
                <div className="col-span-6 md:col-span-4">
                  <span className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent font-bold">Supply Chain of Intelligence™</span>
                </div>
              </div>
              {JTBD_VS_SCOI.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 py-4 border-b border-border/40 last:border-b-0">
                  <div className="col-span-12 md:col-span-4 pr-4">
                    <span className="font-mono-marker text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 font-bold">{row.question}</span>
                  </div>
                  <div className="col-span-6 md:col-span-4 px-1 md:px-4 text-sm text-muted-foreground leading-relaxed">{row.jtbd}</div>
                  <div className="col-span-6 md:col-span-4 px-3 md:px-5 py-1.5 font-medium text-foreground bg-accent/[0.06] rounded-lg leading-relaxed text-sm">{row.scoi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════ 04 · DYNAMICS ═══════════ */}
    <section className="bg-secondary/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="04"
          id="dynamics"
          eyebrow="The Dynamics"
          question="How does it evolve?"
          title="Six patterns under the Laws. Six archetypes above them."
          lede="The Laws say what is structurally true. The Dynamics describe how the stack actually moves: repeatable market patterns we see across hundreds of AI companies, and the six fates every SaaS company collapses into. Patterns earn promotion to Laws over time; archetypes describe where companies end up."
        />

        {/* SIX PATTERNS (was "Six Observations — Patterns Under the Laws") */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Six structural patterns
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OBSERVATIONS.map((obs, i) => (
              <motion.div
                key={obs.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-6 sketch-border flex flex-col"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono-marker text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
                    Pattern · {String(obs.num).padStart(2, "0")}
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {obs.layerTags.map((id) => <LayerTag key={id} id={id} />)}
                  </div>
                </div>
                <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-3 leading-snug">{obs.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{obs.desc}</p>
                <ul className="space-y-2 mt-auto pt-3 border-t border-border/60">
                  {obs.examples.map((ex, j) => (
                    <li key={j} className="flex gap-2 text-xs text-foreground/80 leading-relaxed">
                      <span className="text-accent shrink-0 font-mono-marker">→</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
                {obs.caseStudy && (
                  <Link to={`/case-studies/${obs.caseStudy.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono-marker uppercase tracking-[0.18em] text-accent hover:text-accent/80 transition-colors">
                    Read the case study: {obs.caseStudy.label} →
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* SIX ARCHETYPES */}
        <div>
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Six company archetypes
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-3">
            The six fates of SaaS
          </h3>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Every SaaS company collapses into one of these patterns over time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Data Refineries", status: "safe", desc: "L1b ★ — proprietary data compounds. Apollo, Bloomberg.", verdict: "fortified" },
              { title: "Infrastructure Rails", status: "safe", desc: "L4b/L4e ★ — essential pipes & agent identity. Supabase, Twilio.", verdict: "fortified" },
              { title: "Workflow Fortresses", status: "contested", desc: "L5+L6b ★ — agent loops + human-in-loop. Salesforce, HubSpot.", verdict: "consolidating" },
              { title: "Domain Specialists", status: "safe", desc: "L5a/b/d ★ + L8c ★ — Harvey, Sierra. Encoded expertise.", verdict: "fortified" },
              { title: "Thin-Layer Graveyard", status: "dead", desc: "L7a/L7b, no ★ — Gamma, Jasper, Chegg. Already dead.", verdict: "exposed" },
              { title: "Full-Stack Juggernauts", status: "dominant", desc: "L2a+L7c/d ★+L8c ★ — Claude, ChatGPT, Copilot.", verdict: "dominant" },
            ].map((arch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`bg-card border border-border rounded-xl p-5 sketch-border verdict-${arch.verdict}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-display text-base font-bold text-foreground">{arch.title}</h4>
                  <span className={`font-sketch text-xs font-bold px-2 py-0.5 rounded-full ${
                    arch.status === "safe" ? "bg-verdict-fortified/10 text-verdict-fortified" :
                    arch.status === "contested" ? "bg-verdict-consolidating/10 text-verdict-consolidating" :
                    arch.status === "dead" ? "bg-verdict-exposed/10 text-verdict-exposed" :
                    "bg-accent/10 text-accent"
                  }`}>{arch.status}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{arch.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════ 05 · APPLICATIONS ═══════════ */}
    <section className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="05"
          id="applications"
          eyebrow="The Applications"
          question="How do I use it?"
          title="Two instruments. Four self-serve tools."
          lede="The framework comes with instruments — the Defensible Triangle and the Intelligence Cube — that turn the map into something you can place a company on. Plus self-serve tools you can run on your own product, portfolio, or thesis: a defensibility audit, the market maps, the playbook, and the live predictions."
        />

        {/* INSTRUMENT 1: DEFENSIBLE TRIANGLE */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Instrument · The Defensible Triangle
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-3">
            One common pattern, not the only way to win
          </h3>
          <p className="text-base text-muted-foreground max-w-3xl mb-6 leading-relaxed">
            The Triangle ({DEFENSIBLE_TRIANGLE}) is a recurring fortress pattern across application-
            layer companies — Sierra, Harvey, Glean, BloombergGPT, Tempus all exhibit some version of it.
            It is not the only way to survive. A pure gatekeeper like Vanta wins on L3 alone; NVIDIA wins
            on L0; Snowflake on L4. Owning one layer deeply can be enough. What kills you is owning a
            thin sliver of a contested one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
            {[
              { id: "L1b", name: "Proprietary Data", layer: "L1", desc: "Data behind enterprise walls. No one else has it." },
              { id: "L5a/b/d", name: "Deep Skills & Playbooks", layer: "L5", desc: "Domain execution, decision frameworks, company SOPs." },
              { id: "L8c/d/e", name: "Compounding Memory", layer: "L8", desc: "Network learning, institutional knowledge, world models." },
            ].map((item, i) => {
              const n = parseInt(item.layer.replace("L", ""));
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-5 sketch-border" style={{ borderTop: `3px solid hsl(var(--layer-${n}))` }}>
                  <span className="font-sketch text-sm font-bold px-2.5 py-1 rounded inline-block mb-3" style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}>{item.id} ★</span>
                  <h4 className="font-display text-base font-bold text-foreground mb-2">{item.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* INSTRUMENT 2: INTELLIGENCE CUBE */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Instrument · The Intelligence Cube™
          </p>
          <h3 id="cube" className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-3 scroll-mt-24">
            10 Functions × 10 Verticals × 10 Layers
          </h3>
          <p className="text-base text-muted-foreground max-w-3xl mb-6 leading-relaxed">
            Volume in the Cube = structural durability. Height is layers, width is functions, depth is
            verticals. Thin single-layer plays compress fast; multi-layer stacks hold longer. The
            counter-move is always to add depth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-card border border-border rounded-xl p-6 sketch-border verdict-fortified">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">▣</span>
                <h4 className="font-display text-lg font-bold text-foreground">Sierra — defensible stack</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Customer Care × 4 verticals × 3 layers (L1b + L5b + L8c). Memory compounds per customer.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["L1b ★", "L5a ★", "L8c ★"].map((l) => (
                  <span key={l} className="font-sketch text-sm font-bold px-2.5 py-1 rounded-md bg-verdict-fortified/10 text-verdict-fortified">{l}</span>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 sketch-border verdict-exposed">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">◌</span>
                <h4 className="font-display text-lg font-bold text-foreground">Gamma — thin stack, exposed</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Product + PM × cross-industry × L7a only. Counter-move: add L1 proprietary data, L5 templates, or L8 per-team memory.
              </p>
              <span className="font-sketch text-sm font-bold px-2.5 py-1 rounded-md bg-verdict-exposed/10 text-verdict-exposed">L7a only</span>
            </div>
          </div>
        </div>

        {/* SELF-SERVE TOOLS */}
        <div>
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Self-serve tools, free to use
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-5">
            Run the framework on yourself
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { to: "/audit", title: "Defensibility self-assessment", desc: "A free, browser-based audit. Answer the questions about your product, get a layer-by-layer read of where you're exposed and where you compound." },
              { to: "/market-map", title: "The market maps", desc: "Vertical-by-vertical maps that place real companies on the layers — legal, wealth, more to come. Read someone else's slice before you map your own." },
              { to: "/playbook", title: "The playbook", desc: "Counter-moves for each layer. If you're stuck in L7, what do you add? If your L1 is leaking, how do you re-fortify? Patterns, not recipes." },
              { to: "/predictions", title: "Live predictions", desc: "Falsifiable predictions about who absorbs whom and when, with re-review dates. Use as a forcing function on your own thesis." },
            ].map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group bg-card border border-border rounded-xl p-6 sketch-border hover:border-accent transition-colors flex flex-col"
              >
                <h4 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{tool.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.desc}</p>
                <span className="mt-auto font-mono-marker text-[11px] uppercase tracking-[0.18em] text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════ 06 · REASONING ENGINE ═══════════ */}
    <section id="reasoning" className="bg-background border-b border-border scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="06"
          id="reasoning"
          eyebrow="The Reasoning Engine"
          question="How do I think with it?"
          title="A protocol, not a poster. How to actually reason with the framework."
          lede="The Map tells you what the layers are. The Laws tell you why they hold. The Reasoning Engine tells you how to descend from a layer name into a decision. Every sublayer is analyzed with the same sequence. Every recommendation is defended against the same checklist. This is the section that makes the framework executable — for humans, and for an LLM you prompt with it."
        />

        {/* THE SEQUENCE */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            The sequence — apply to every sublayer
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-5">
            Layer → Sublayer → Questions → Laws → Observations → Signals → Competitors → Opportunities → Recommendations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-2">
            {["Layer","Sublayer","Questions","Laws","Observations","Signals","Competitors","Opportunities","Recommendations"].map((step, i) => (
              <div key={step} className="bg-card border border-border rounded-lg p-3 sketch-border">
                <div className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent mb-1">Step {i+1}</div>
                <div className="font-display text-sm font-bold text-foreground">{step}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-3xl leading-relaxed">
            Never stop at the layer name. A layer is a bucket; the decision lives in the sublayer. Skip a step and you produce
            generic strategy — the exact failure mode this framework was built to end.
          </p>
        </div>

        {/* THE 10 QUESTIONS BOX */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-secondary/40 border border-border rounded-xl p-6 sketch-border">
            <p className="font-mono-marker text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
              Every sublayer should answer
            </p>
            <ol className="space-y-2 text-sm text-foreground/90 leading-relaxed list-decimal list-inside">
              <li>What problem does this sublayer solve?</li>
              <li>Why does it matter — for whom, at what cost?</li>
              <li>Which companies own this sublayer today?</li>
              <li>Which competitors are structurally weak here?</li>
              <li>Which of the 4 Laws apply?</li>
              <li>Which observations (patterns, precedents) support those Laws?</li>
              <li>Where are the bottlenecks — scarcity, gates, dependencies?</li>
              <li>What is changing because of AI — commoditizing, compounding, being absorbed?</li>
              <li>Where is the moat — data, execution, memory, trust, distribution?</li>
              <li>What should we build, buy, partner, or abandon?</li>
            </ol>
          </div>

          <div className="bg-secondary/40 border border-border rounded-xl p-6 sketch-border">
            <p className="font-mono-marker text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
              Reasoning principles
            </p>
            <ul className="space-y-3 text-sm text-foreground/90 leading-relaxed">
              <li><span className="font-bold text-foreground">Never analyze one layer in isolation.</span> Every opportunity has a Primary Layer, Supporting Layers, Dependent Layers, and Emerging Bottlenecks. Name all four.</li>
              <li><span className="font-bold text-foreground">Sublayer, not layer.</span> "L4" is not an answer. "L4b Agent Interface Protocols" is.</li>
              <li><span className="font-bold text-foreground">Cite a Law, not a vibe.</span> Every recommendation must be traceable to Law I–IV. If you cannot, it is not a structural claim — it is taste.</li>
              <li><span className="font-bold text-foreground">Name a company.</span> Abstract archetypes are lazy. Say which real company plays that slice today, and why it is winning or losing.</li>
              <li><span className="font-bold text-foreground">Read the Currents.</span> A defensible layer with no demand, no attention, or no capital is a zero. Overlay the three Currents on every layer read.</li>
            </ul>
          </div>
        </div>

        {/* LAYER CARD ANATOMY */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Anatomy of a layer read
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-5">
            Don't just name the layer. Instrument it.
          </h3>
          <div className="bg-card border border-border rounded-xl p-6 sketch-border max-w-4xl">
            <div className="flex items-baseline gap-3 mb-4">
              <LayerTag id="L4" />
              <span className="font-display text-lg font-bold text-foreground">Access — worked example</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              {[
                ["Purpose", "The pipes: connectivity, permissions, integrations, agent protocols."],
                ["Questions", "Who owns the on-ramp? Who owns the identity? Who owns the write-back?"],
                ["Relevant Laws", "Law II (bottleneck), Law III (chain over surface)."],
                ["Typical observations", "MCP standardizing; OAuth becoming the agent-identity substrate; system-of-record vendors quietly absorbing L4."],
                ["Failure modes", "Renting L4 from a platform that will one day compete with you."],
                ["Signals", "Number of native integrations, per-integration retention, share of workflow write-backs."],
                ["Examples", "AWS, Snowflake, Supabase, Twilio, Salesforce, Plaid."],
                ["Opportunities", "Own an interface protocol the incumbents cannot control (L4b), or the identity layer above it (L4e)."],
                ["Related layers", "L1 (data flows through here), L5 (skills ride these pipes), L8 (memory writes back through here)."],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent mb-1">{k}</div>
                  <div className="text-foreground/85 leading-relaxed">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LAWS AS EXECUTABLE */}
        <div className="mb-14">
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
            Laws are executable, not decorative
          </p>
          <h3 className="font-display text-[22px] md:text-[26px] font-bold text-foreground mb-5">
            Law → Trigger → Questions → Evidence → Decision
          </h3>
          <div className="bg-card border border-border rounded-xl p-6 sketch-border max-w-4xl">
            <div className="font-display text-lg font-bold text-foreground mb-1">Law IV — Generation ≠ Verification</div>
            <p className="text-sm text-muted-foreground mb-5">Worked example. Same shape applies to Laws I, II, III.</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
              {[
                ["Trigger", "AI generates output that carries fiduciary, regulatory, safety, or reputational weight."],
                ["Questions", "Who verifies? Who pays for verification? What is the cost of being wrong once?"],
                ["Evidence", "Vanta over AWS. Snyk over Copilot. Big-4 over SAP. FDA over Pfizer."],
                ["Decision", "In regulated verticals, invest in L3 verification alongside L5 generation. Never as one vendor."],
                ["Anti-pattern", "A single-vendor 'generate + self-audit' pitch. Institutionally rejected in every mature industry."],
              ].map(([k, v]) => (
                <div key={k} className="bg-secondary/40 border border-border rounded-lg p-3">
                  <div className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent mb-1">{k}</div>
                  <div className="text-foreground/85 leading-relaxed">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EXECUTION PROMPT */}
        <div className="bg-foreground text-background rounded-xl p-6 md:p-8 max-w-4xl sketch-border">
          <p className="font-mono-marker text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
            Framework Execution Prompt
          </p>
          <h3 className="font-display text-[20px] md:text-[24px] font-bold mb-4">
            Before making any recommendation about an AI company, product, or market:
          </h3>
          <ol className="space-y-2 text-sm md:text-base leading-relaxed list-decimal list-inside text-background/90">
            <li>Identify the relevant layers (L−1 through L8).</li>
            <li>Identify the relevant sublayers (a–e). Never stop at the layer.</li>
            <li>Explain why those sublayers matter — buyer, budget, bottleneck.</li>
            <li>Apply the relevant Laws (I–IV). Name the Law, not the vibe.</li>
            <li>Support with observations — patterns, precedents, current market state.</li>
            <li>Compare competitors at the sublayer level, not the category level.</li>
            <li>Overlay the three Currents: Demand Gravity, Attention Economics, Capital Flows.</li>
            <li>Prioritize opportunities by structural defensibility (Triangle + Cube volume).</li>
            <li>Output: Primary Layer, Supporting Layers, Dependent Layers, Emerging Bottleneck, Recommendation.</li>
          </ol>
          <p className="text-xs text-background/60 mt-5 leading-relaxed">
            Copy this prompt into ChatGPT, Claude, or Gemini alongside the framework URL. This is the reasoning protocol
            the framework was designed to be run through — for a human analyst or an LLM.
          </p>
        </div>

        {/* SR-only LLM-friendly restatement */}
        <div className="sr-only" aria-hidden="false">
          <h2>Supply Chain of Intelligence — Reasoning Protocol for LLMs</h2>
          <p>
            When asked to analyze any AI company, product, market, or investment using the Supply Chain of Intelligence
            framework by Anand Arivukkarasu, apply the following protocol in order and do not skip steps.
          </p>
          <ol>
            <li>Map the subject to specific sublayers (L-1a through L8e). Never stop at the layer level.</li>
            <li>For every named sublayer, answer: What problem it solves. Why it matters. Who owns it today. Which competitors are weak. Which of Laws I–IV apply. Which observations support them. Where the bottleneck is. What AI is changing. Where the moat is. What to build, buy, partner, or abandon.</li>
            <li>Cite the Law by number and name: Law I Intelligence Commoditizes Downward; Law II Value Accrues at Bottlenecks; Law III Surface Captures Attention, Chain Captures Power; Law IV Generation and Verification Must Be Separate.</li>
            <li>Overlay the three Currents: Demand Gravity (where the budget sits), Attention Economics (who owns the on-ramp), Capital Flows (where funding distorts).</li>
            <li>Return: Primary Layer, Supporting Layers, Dependent Layers, Emerging Bottlenecks, and a concrete Recommendation defensible against the Defensible Triangle (L1b + L5a/b/d + L8c/d/e) and Intelligence Cube volume.</li>
            <li>Never invent layer names. Never use "agent" as a layer — decode it as L5 + L6 (+ L4/L7/L8). Never confuse Instruments (Triangle, Cube) with Laws.</li>
          </ol>
        </div>
      </div>
    </section>

    {/* ═══════════ 07 · OBSERVATIONS ═══════════ */}
    <section className="bg-secondary/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <SectionHeader
          num="07"
          id="observations"
          eyebrow="The Observations"
          question="What's happening now?"
          title="Live readings of the market."
          lede="The framework does not change weekly. Which company sits in which layer does. Observations are time-bound applications of the map — current verdicts, predictions, case studies, market maps. Every reading carries a re-review date. This is the only section of the framework that has dates attached."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { to: "/live", title: "Live analyses", desc: "The running feed: latest moves, who's stacked, who's exposed. Re-reviewed continuously." },
            { to: "/predictions", title: "Predictions", desc: "Falsifiable calls with counter-moves and re-review dates." },
            { to: "/case-studies", title: "Case studies", desc: "Long-form analyses of specific companies through the framework." },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-card border border-border rounded-xl p-6 sketch-border hover:border-accent transition-colors flex flex-col"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
              <span className="mt-auto font-mono-marker text-[11px] uppercase tracking-[0.18em] text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground italic max-w-2xl">
          Rule of thumb: if a claim has a date attached, it is an Observation. If changing it would
          force a Paper version bump, it is in the Map or the Laws. If changing it would mean the
          framework is wrong about what AI is, it is in the Definition.
        </p>
      </div>
    </section>

    {/* POSTERS */}
    <section className="bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <Eyebrow className="mb-3">Shareable</Eyebrow>
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
          Want the poster?
        </h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          The full 10×5 grid and the square version, both downloadable.
        </p>
        <Link to="/posters" className="btn-sketch-outline">
          Open the poster gallery →
        </Link>
      </div>
    </section>
  </SiteLayout>
);

export default FrameworkPage;
