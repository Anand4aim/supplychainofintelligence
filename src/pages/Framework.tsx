import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LAYERS, DEFENSIBLE_TRIANGLE, GOLD_KEY_INSIGHT, LAWS, JTBD_VS_SCOI, OBSERVATIONS } from "@/data/layers";
import { SketchIcon } from "@/components/sketch/SketchIcons";
import IntelligenceGrid from "@/components/IntelligenceGrid";
import ExportablePng from "@/components/ExportablePng";
import {
  SketchFilters,
  SketchBoard,
  SketchArrow,
  SketchBox,
  SketchLabel,
} from "@/components/sketch/SketchElements";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";


const layerSlug = (id: string, shortName: string) =>
  `${id.toLowerCase()}-${shortName.toLowerCase().replace(/\s+/g, "-")}`;

const FrameworkPage = () => (
  <SiteLayout>
    <Seo
      title="The Framework — 10 Layers of the AI Stack"
      description="10 layers, 50 sublayers, 4 structural laws, the Defensible Triangle, and the 3 Currents (demand, attention, capital). Where AI value is created, captured, and defended."
      path="/framework"
    />
    <SketchFilters />

    {/* Hero */}
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Eyebrow className="mb-6">The Framework</Eyebrow>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-1">
            The Supply Chain of Intelligence™
          </h1>
          <p className="font-mono-marker text-[11px] tracking-[0.16em] uppercase text-muted-foreground mb-6">
            SCoI — the 10 layers of the generative AI stack
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            <strong className="text-foreground">JTBD tells you what users want.</strong>{" "}
            The Supply Chain of Intelligence tells you{" "}
            <strong className="text-foreground">where value accrues</strong> — and which AI
            companies a foundation model, hyperscaler, or productivity suite can erase next quarter.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Follow the gold from the ground to the person wearing the ring and you'll see every layer
            of the intelligence stack. 10 layers. 50 sublayers. 4 structural laws. One map.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border sketch-border">
            <span className="font-sketch text-base text-muted-foreground">Defensible Triangle:</span>
            <span className="font-sketch text-base text-accent font-bold">{DEFENSIBLE_TRIANGLE}</span>
          </div>
          <div className="mt-5">
            <Link to="/about#why-this-exists" className="text-accent hover:underline font-sketch font-bold text-sm inline-flex items-center gap-1">
              Why we built this →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ═══════════ THREE-TIER TL;DR (compressed mental model before the 10) ═══════════ */}
    <section className="bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <Eyebrow className="mb-3">Before the 10 layers — the 3 tiers</Eyebrow>
        <h2 className="font-display text-2xl md:text-[34px] font-bold text-foreground leading-tight mb-3">
          Every AI product lives on one of three tiers.{" "}
          <span className="text-muted-foreground">Only one of them compounds.</span>
        </h2>
        <p className="text-foreground/80 text-[16px] leading-[1.75] max-w-3xl mb-10">
          The full taxonomy below is 10 layers. The mental model before that is three:
          what users <em>touch</em>, what they <em>live inside</em>, and what they <em>depend on</em>.
          Surfaces commoditize in weeks. Workflows survive in months. Substrate compounds in years.
        </p>

        <div className="space-y-4 md:space-y-5">
          {[
            { label: "SURFACE", sub: "What users touch", layers: "L7", color: "var(--layer-7)", width: "w-full", verdict: "Easily replicated. Platforms ship this for free.", durability: "Weeks" },
            { label: "WORKFLOW", sub: "What users live inside", layers: "L5 · L6", color: "var(--layer-5)", width: "w-[78%]", verdict: "Sticky if deep. Survivable if owned.", durability: "Months" },
            { label: "SUBSTRATE", sub: "What users depend on", layers: "L1 · L3 · L8", color: "var(--layer-1)", width: "w-[56%]", verdict: "Proprietary data, trust gates, compounding memory.", durability: "Years" },
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

        <p className="mt-8 text-muted-foreground font-display italic text-[15px] md:text-base max-w-3xl">
          <ArrowDown size={14} className="inline mr-2 text-accent" />
          Value escapes the surface and accumulates in the layers below.{" "}
          <span className="text-foreground">Own the lower layers, or rent them — and rent your future.</span>
        </p>
      </div>
    </section>

    {/* ═══════════ DESIRABILITY WITHOUT DEFENSIBILITY (moved from home) ═══════════ */}
    <section className="bg-secondary/40 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 space-y-14">
        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}>
          <Eyebrow className="mb-4">The New AI Product Trap</Eyebrow>
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
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            A product can solve a real user job and still be structurally fragile. That is what
            kills most AI products — not lack of users, but a layer that a foundation model,
            cloud platform, or productivity suite can absorb in a quarter.
          </p>
        </motion.div>

        {/* Magazine-style comparison table */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}>
          <div className="bg-card rounded-2xl shadow-2xl shadow-foreground/5 border border-border overflow-hidden">
            <div className="p-6 md:p-12">
              <div className="grid grid-cols-12 gap-4 mb-8 border-b border-border/60 pb-6 md:pb-8">
                <div className="col-span-12 md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                    Desirability{" "}
                    <span className="italic font-normal text-muted-foreground/70">vs.</span>{" "}
                    Defensibility
                  </h3>
                </div>
                <div className="col-span-6 md:col-span-4 flex flex-col justify-end">
                  <span className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5 font-bold">
                    The Incumbent Tool
                  </span>
                  <span className="font-display text-lg md:text-xl text-foreground">
                    Jobs To Be Done
                  </span>
                </div>
                <div className="col-span-6 md:col-span-4 flex flex-col justify-end">
                  <span className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent mb-1.5 font-bold">
                    The Structural Tool
                  </span>
                  <span className="font-display text-lg md:text-xl text-foreground">
                    Supply Chain of Intelligence™
                  </span>
                </div>
              </div>

              <div>
                {JTBD_VS_SCOI.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-2 py-5 border-b border-border/40 last:border-b-0 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="col-span-12 md:col-span-4 pr-4">
                      <span className="font-mono-marker text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80 font-bold">
                        {row.question}
                      </span>
                    </div>
                    <div className="col-span-6 md:col-span-4 px-1 md:px-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                      {row.jtbd}
                    </div>
                    <div className="col-span-6 md:col-span-4 px-3 md:px-5 py-1.5 font-medium text-foreground bg-accent/[0.06] rounded-lg leading-relaxed text-sm md:text-[15px]">
                      {row.scoi}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-border/60 text-center">
                <p className="font-display text-lg md:text-2xl text-foreground italic leading-snug">
                  JTBD finds demand.{" "}
                  <span className="text-accent underline decoration-accent/30 underline-offset-[6px] decoration-[3px] not-italic font-bold">
                    The Supply Chain finds defensibility.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-fate proof: Gamma vs Replit */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono-marker text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold whitespace-nowrap">
              Same JTBD category → Different fate
            </span>
            <div className="h-px w-full bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Gamma — Exposed */}
            <div
              className="relative rounded-2xl border p-7 md:p-8 shadow-sm hover:shadow-xl transition-all"
              style={{
                background: "hsl(var(--layer-7-bg) / 0.4)",
                borderColor: "hsl(var(--layer-7) / 0.25)",
              }}
            >
              <div className="flex justify-between items-start mb-5 gap-3">
                <div className="space-y-2">
                  <h4 className="font-display text-2xl text-foreground">Gamma</h4>
                  <LayerTag id="L7" />
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full border whitespace-nowrap"
                  style={{
                    background: "hsl(var(--verdict-exposed) / 0.08)",
                    borderColor: "hsl(var(--verdict-exposed) / 0.25)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "hsl(var(--verdict-exposed))" }}
                  />
                  <span
                    className="font-mono-marker text-[9px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: "hsl(var(--verdict-exposed))" }}
                  >
                    Exposed
                  </span>
                </div>
              </div>
              <p className="text-foreground font-medium leading-relaxed mb-3 text-[15px]">
                "Help me create a polished deck quickly." Beautiful surface.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                But most of the value comes from models and rendering anyone can reproduce.
                Brand workflow, design system, and proprietary usage data are thin. The
                platform layer below can absorb the category.
              </p>
            </div>

            {/* Replit — Fortified */}
            <div
              className="relative rounded-2xl border p-7 md:p-8 shadow-sm hover:shadow-xl transition-all"
              style={{
                background: "hsl(var(--layer-5-bg) / 0.4)",
                borderColor: "hsl(var(--layer-5) / 0.25)",
              }}
            >
              <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
                <div className="space-y-2">
                  <h4 className="font-display text-2xl text-foreground">Replit</h4>
                  <div className="flex gap-1.5 flex-wrap">
                    <LayerTag id="L4" />
                    <LayerTag id="L5" />
                    <LayerTag id="L6" />
                    <LayerTag id="L8" />
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full border whitespace-nowrap"
                  style={{
                    background: "hsl(var(--verdict-fortified) / 0.08)",
                    borderColor: "hsl(var(--verdict-fortified) / 0.3)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--verdict-fortified))" }}
                  />
                  <span
                    className="font-mono-marker text-[9px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: "hsl(var(--verdict-fortified))" }}
                  >
                    Fortified
                  </span>
                </div>
              </div>
              <p className="text-foreground font-medium leading-relaxed mb-3 text-[15px]">
                Owns the execution chain end-to-end. A proprietary stack.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Agent + code generation + hosting + auth + database + monitoring +
                integrations + enterprise controls. Not a UI on top of a model — a system the
                platform can't bundle in a sprint.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing pull quote */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}>
          <div className="relative max-w-3xl mx-auto pt-2">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-accent" />
            <div className="pl-8 md:pl-10">
              <blockquote className="font-display text-xl md:text-2xl text-foreground leading-snug italic">
                "JTBD answers{" "}
                <span className="not-italic font-bold text-foreground">
                  why a user will hire your product
                </span>
                . The Supply Chain of Intelligence answers{" "}
                <span className="not-italic font-bold text-accent">
                  why OpenAI, Google, Anthropic and other AI juggernauts won't erase it
                </span>
                . You need both — if you do it well, you can ride the wave without getting
                crushed in it."
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-px w-6 bg-border" />
                <cite className="font-mono-marker text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-bold not-italic">
                  Anand Arivukkarasu
                </cite>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* THE GRID — 10×5 framework, the canonical reference map */}
    <section className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <Eyebrow className="mb-1">The Framework · One Image</Eyebrow>
              <p className="font-sketch text-sm text-muted-foreground italic">
                10 layers × 50 sublayers. Screenshot it. Map your own company in it — blank version is free to use.
              </p>
            </div>
          </div>
          <ExportablePng fileName="scoi-10x50-grid" caption="The Supply Chain of Intelligence — 10 × 50 grid">
            <IntelligenceGrid mode="blank" />
          </ExportablePng>
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
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            Every layer transforms the output of the layer below it. Most companies only own one layer.
            The supply chain is only as strong as its weakest link.
          </p>
          <details className="max-w-2xl mx-auto text-left mt-4 group">
            <summary className="cursor-pointer font-mono-marker text-[10px] uppercase tracking-[0.14em] text-accent inline-flex items-center gap-1.5 hover:underline">
              Why one ladder, when L−1→L2 and L3→L8 are different kinds of layer? ↓
            </summary>
            <div className="mt-3 text-sm text-muted-foreground leading-relaxed space-y-2 pl-4 border-l-2 border-accent/30">
              <p>
                Honest answer: they are different kinds of layer. <strong className="text-foreground">L−1 through L2</strong>{" "}
                (Resources → Infrastructure → Data → Models) is an economic / physical stack —
                value flows up through transformation. <strong className="text-foreground">L3 through L8</strong>{" "}
                (Gatekeeping → Access → Execution → Orchestration → Surface → Memory) is a
                product-architecture stack — value flows through control of the user moment.
              </p>
              <p>
                We treat them as one chain on purpose. The whole strategic claim of the
                framework is that <em>value, attention, and pricing power move continuously
                across both</em> — NVIDIA's L0 dominance prices Anthropic's L2, which prices
                Glean's L8 product, which is squeezed by Microsoft's L4 distribution. Splitting
                them into two diagrams hides the cascade.
              </p>
              <p>
                If you're placing your own company, you'll feel a seam between L2 and L3. That's
                real. The seam is where most acquisitions happen — model labs buying app companies,
                hyperscalers buying inference layers. The single ladder makes that seam visible
                instead of erasing it.
              </p>
            </div>
          </details>
        </div>

        {/* PARALLEL SNAPSHOT — Gold flow vs AI Layer, side by side */}
        <ExportablePng
          fileName="scoi-gold-vs-ai-parallel"
          caption="Gold Mining ⇄ Supply Chain of Intelligence — parallel view"
        >
          <div className="bg-card rounded-xl border border-border sketch-border p-5 md:p-7 mb-10">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 md:gap-x-5 items-center mb-3 pb-3 border-b border-border">
              <div className="font-mono-marker text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-accent text-right">
                Gold Supply Chain
              </div>
              <div className="font-mono-marker text-[10px] text-muted-foreground px-1">≡</div>
              <div className="font-mono-marker text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-accent">
                Supply Chain of Intelligence
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {LAYERS.map((layer) => (
                <div
                  key={`snap-${layer.id}`}
                  className="grid grid-cols-[1fr_auto_1fr] gap-x-3 md:gap-x-5 items-center py-1.5 border-b border-border/40 last:border-b-0"
                >
                  {/* GOLD side */}
                  <div className="flex items-center justify-end gap-2.5 text-right min-w-0">
                    <div className="min-w-0">
                      <div className="font-display text-[13px] md:text-[14px] font-bold text-foreground leading-tight truncate">
                        {layer.goldTitle.split(" — ")[0]}
                      </div>
                      <div className="text-[11px] md:text-[12px] text-muted-foreground leading-snug truncate">
                        {layer.goldTitle.split(" — ")[1] ?? ""}
                      </div>
                    </div>
                    <SketchIcon name={layer.goldIcon} size={28} className="shrink-0" />
                  </div>

                  {/* connector */}
                  <div
                    className="font-mono-marker text-[10px] md:text-[11px] font-bold px-1.5"
                    style={{ color: `hsl(${layer.color})` }}
                  >
                    →
                  </div>

                  {/* AI side */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="font-sketch text-[13px] md:text-[14px] font-bold shrink-0 px-1.5 py-0.5 rounded"
                      style={{ color: `hsl(${layer.color})`, background: `hsl(${layer.bg})` }}
                    >
                      {layer.id}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-[13px] md:text-[14px] font-bold text-foreground leading-tight truncate">
                        {layer.name}
                      </div>
                      <div className="text-[11px] md:text-[12px] text-muted-foreground leading-snug truncate">
                        {layer.players.slice(0, 3).join(" · ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic text-center mt-4 pt-3 border-t border-border">
              Read across any row — that's the same job, told twice. Read top-to-bottom — that's how value flows.
            </p>
          </div>
        </ExportablePng>

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
            The Triangle (L1b + L5a/b/d + L8c/d/e) is a <em>recurring</em> fortress pattern we
            see across application-layer companies — Sierra, Harvey, Glean, BloombergGPT, Tempus
            all exhibit some version of it. It is not the only way to survive. A pure
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
          <Eyebrow className="mb-4">The Intelligence Cube</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-foreground mb-6">
            10 Functions × 10 Verticals × 10 Layers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            Volume in the Cube = structural durability. Height is layers, width is functions, depth is verticals.
            Thin single-layer plays compress fast; multi-layer stacks hold longer. The counter-move is always to add depth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 sketch-border verdict-fortified">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">▣</span>
                <h3 className="font-display text-xl font-bold text-foreground">Sierra — Defensible stack</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Customer Care × 4 verticals × 3 layers (L1b + L5b + L8c). Memory compounds per customer.
                Multi-layer footprint = harder to displace.
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
                <span className="text-2xl">◌</span>
                <h3 className="font-display text-xl font-bold text-foreground">Gamma ($2.1B) — Thin stack, exposed</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Product + PM × cross-industry × L7a only — surface-resident today. The counter-move is real:
                add proprietary deck-data (L1), template playbooks (L5), or per-team memory (L8) to deepen the stack.
              </p>
              <div className="flex gap-2">
                <span className="font-sketch text-sm font-bold px-2.5 py-1 rounded-md bg-verdict-exposed/10 text-verdict-exposed">
                  L7a only — counter-move available
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Structural Laws */}
    <section id="laws" className="bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Eyebrow className="mb-4">Four Structural Laws</Eyebrow>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-3">The Laws That Predict the Future</h2>
        <p className="text-base text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Not opinions. Structural forces that explain why most AI products get compressed in the layer they were
          built in — and which counter-moves keep them durable as the platforms move.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

    {/* Three Currents — horizontal forces across the chain */}
    <section id="currents" className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Eyebrow className="mb-4">Three Currents</Eyebrow>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-3">
          The Forces That Flow Across the Chain
        </h2>
        <p className="text-base text-muted-foreground max-w-3xl mb-3 leading-relaxed">
          The 10 layers describe how intelligence is <em>produced and delivered</em> — the supply side.
          Three market currents flow <em>horizontally across</em> every layer and decide whether a defensible
          position actually compounds into a business. Ignore them and a perfect stack still dies.
        </p>
        <p className="text-xs text-muted-foreground/80 italic max-w-3xl mb-10">
          These are market cross-currents. Regulatory and geopolitical constraints are handled at their native
          layers (L-1 energy/fabs/materials, L3 compliance and export controls) and are not currents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "C1",
              title: "Demand Gravity",
              oneLine: "Where the budget actually sits — and what it pulls toward.",
              desc: "A defensible layer position only compounds if a buyer with budget and urgency exists on the other side. CFO, CIO, line-of-business, and CEO discretionary pools each have different velocity, willingness-to-pay, and tolerance for risk. As L2 prices collapse, demand elasticity moves the money toward outcomes (L5+L8), verification (L3), and proprietary data access (L1) — not toward generation itself.",
              affects: "Pulls hardest on L5, L7, L8. Drains away from L2 over time.",
              action: "Before defending a layer, name the buyer, the budget line, and what they will stop paying for once L2 is free.",
            },
            {
              num: "C2",
              title: "Attention Economics",
              oneLine: "What becomes scarce when generation becomes infinite.",
              desc: "When L2 makes content, code, and answers near-free, the scarce resource flips from supply to the eyeball. Default placement, OS integration, habit loops, and on-ramp ownership decide who gets used. Apple, Google, and Microsoft become L7 landlords charging rent in attention. Law III names this; this Current economizes it: distribution CAC, retention, and frequency of use are now first-order moats, not vanity metrics.",
              affects: "Distorts L7 (Surface) and L8 (Outcome) most. Reshapes go-to-market at every layer.",
              action: "Assume infinite supply. Then ask: who owns the on-ramp, and what does default placement cost?",
            },
            {
              num: "C3",
              title: "Capital Flows",
              oneLine: "How funding rounds bend the chain they fund.",
              desc: "The chain does not evolve in a vacuum. Capital concentration distorts natural layer economics — tens of billions into L2 in 2023–24 created a generation glut and a price collapse; near-zero into L-1 created the energy and fab bottleneck now constraining everything above it. Funding is reflexive: rounds reshape the very layers being invested in, often overshooting supply and underfunding the scarce inputs.",
              affects: "Overheats whichever layer is in fashion (L2 then L5 then L-1). Starves the unglamorous bottleneck.",
              action: "Read the funding map as a distortion field, not as a signal of where value will accrue.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-7 sketch-border flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-sketch text-3xl font-bold text-accent">{c.num}</span>
                <h3 className="font-display text-lg font-bold text-foreground leading-snug">{c.title}</h3>
              </div>
              <p className="font-display text-sm md:text-base text-foreground mb-3 leading-snug italic">
                {c.oneLine}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
              <div className="mt-auto pt-3 border-t border-border/60 space-y-2">
                <p className="text-xs text-muted-foreground/90 leading-relaxed">
                  <span className="font-mono-marker uppercase tracking-[0.18em] text-foreground/70">Where it bites · </span>
                  {c.affects}
                </p>
                <p className="text-xs text-accent leading-relaxed">
                  <span className="font-mono-marker uppercase tracking-[0.18em]">Use it · </span>
                  {c.action}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground italic max-w-3xl">
          The Laws predict structural fate. The Currents decide market timing and capital reality.
          A durable company reads both.
        </p>
      </div>
    </section>



    {/* Observations — patterns under the Laws */}
    <section id="observations" className="bg-secondary/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Eyebrow className="mb-4">Six Observations</Eyebrow>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-3">
          Patterns Under the Laws
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Repeatable market patterns we see across hundreds of AI companies — not yet promoted to
          Laws, but durable enough to bet on. Each is a working hypothesis with two examples.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OBSERVATIONS.map((obs, i) => (
            <motion.div
              key={obs.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-7 sketch-border flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono-marker text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
                  Obs · {String(obs.num).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {obs.layerTags.map((id) => (
                    <LayerTag key={id} id={id} />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3 leading-snug">
                {obs.title}
              </h3>
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
                <Link
                  to={`/case-studies/${obs.caseStudy.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono-marker uppercase tracking-[0.18em] text-accent hover:text-accent/80 transition-colors"
                >
                  Read the case study: {obs.caseStudy.label} →
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground italic max-w-2xl">
          Observations earn their promotion to Laws over time. If you have a counter-example or a
          stronger pattern, that is the kind of feedback that strengthens the framework.
        </p>
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

    {/* Shareable posters — link out to /posters */}
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