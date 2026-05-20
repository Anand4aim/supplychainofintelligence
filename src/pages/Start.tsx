import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Compass, LineChart, Rocket, Download } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import CopySnippet from "@/components/CopySnippet";

/**
 * /start — The atomic on-ramp.
 *
 * One sentence. One diagram. One example. One question. Three doors.
 * The viral object — the single page anyone should be able to read in five
 * minutes and forward to a colleague. Routes deeper into the framework for
 * each persona (founder / product leader / investor).
 *
 * Design discipline: minimal text, generous negative space, navy palette,
 * Playfair display headlines, large numbers as visual anchors. Nothing on
 * this page introduces new vocabulary — every concept on it is the bare
 * minimum needed to understand the rest of the site.
 */

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

// ───────── The three tiers ─────────
// Deliberately collapsed from the full 10-layer stack. Surface / Workflow /
// Substrate is the minimum mental model someone needs to follow the rest of
// the framework. The full taxonomy lives at /framework.
const TIERS = [
  {
    label: "SURFACE",
    sub: "What users touch",
    layers: "L7",
    color: "var(--layer-7)",
    width: "w-full",
    verdict: "Easily replicated. Platforms ship this for free.",
    durability: "Weeks",
  },
  {
    label: "WORKFLOW",
    sub: "What users live inside",
    layers: "L5 · L6",
    color: "var(--layer-5)",
    width: "w-[78%]",
    verdict: "Sticky if deep. Survivable if owned.",
    durability: "Months",
  },
  {
    label: "SUBSTRATE",
    sub: "What users depend on",
    layers: "L1 · L3 · L8",
    color: "var(--layer-1)",
    width: "w-[56%]",
    verdict: "Proprietary data, trust gates, compounding memory.",
    durability: "Years",
  },
];

const DOORS = [
  {
    icon: Rocket,
    audience: "Founders",
    question: "Are you building a fortress, or a fuse?",
    body: "Map your product to layers. Find the one you can credibly own, before a platform ships your category.",
    to: "/framework",
    cta: "Read the framework",
  },
  {
    icon: Compass,
    audience: "Product leaders",
    question: "Where will your roadmap live in three years?",
    body: "Audit each initiative against the 8 questions. Anything that scores below 24 is a feature, not a moat.",
    to: "/for-product-leaders",
    cta: "Apply it to your roadmap",
  },
  {
    icon: LineChart,
    audience: "Investors",
    question: "Which layers is the company actually defending?",
    body: "Score every company in your portfolio. The spread between cover-story and structural reality is the alpha.",
    to: "/analysis",
    cta: "Read worked verdicts",
  },
];

const Start = () => {
  return (
    <SiteLayout>
      <Seo
        title="Start here — the 5-minute version of the Supply Chain of Intelligence"
        description="One sentence, one diagram, one example. Why most AI products die — and the three layers that decide which ones survive. By Anand Arivukkarasu."
        path="/start"
      />

      {/* ═════════ 1 · THE ONE SENTENCE ═════════ */}
      <section className="relative bg-background overflow-hidden">
        {/* Subtle indigo glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--accent) / 0.10), transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <Eyebrow tone="muted" dash={false} className="mb-8 inline-block">
              The 5-minute version
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-foreground leading-[1.08] text-[34px] sm:text-[44px] md:text-[58px] lg:text-[68px] tracking-tight mb-8"
          >
            JTBD explains <span className="text-muted-foreground/70">demand.</span>
            <br />
            The Supply Chain of Intelligence
            <span className="text-accent">™</span>{" "}
            explains <span className="text-accent">survival.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          >
            If your AI product sits on a layer someone else owns, you don't have a moat.
            You have a countdown.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="font-mono-marker text-[10px] tracking-[0.25em]">
              FOUR MINUTES BELOW
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═════════ 2 · THE ONE DIAGRAM ═════════ */}
      <section className="relative bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div {...fade} className="mb-14 md:mb-16">
            <Eyebrow className="mb-3">The whole framework, compressed</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-2xl">
              Every AI product lives on one of three tiers.
              <span className="text-muted-foreground"> Only one of them compounds.</span>
            </h2>
          </motion.div>

          {/* The diagram — three nested bars, each narrower & deeper */}
          <motion.div {...fade} className="relative">
            <div className="space-y-4 md:space-y-5">
              {TIERS.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex items-stretch gap-4"
                >
                  {/* Tier number */}
                  <div className="shrink-0 w-10 md:w-14 flex items-start justify-end pt-3">
                    <span
                      className="font-display font-bold text-2xl md:text-4xl tabular-nums"
                      style={{ color: `hsl(${t.color})` }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Tier bar */}
                  <div className={`${t.width} relative`}>
                    <div
                      className="rounded-r-lg p-5 md:p-6 border-l-[6px] relative overflow-hidden"
                      style={{
                        borderLeftColor: `hsl(${t.color})`,
                        background: `hsl(${t.color} / 0.06)`,
                      }}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                        <span
                          className="font-mono-marker text-[11px] tracking-[0.25em]"
                          style={{ color: `hsl(${t.color})` }}
                        >
                          {t.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono-marker">
                          {t.layers}
                        </span>
                      </div>
                      <p className="font-display text-xl md:text-2xl font-bold text-foreground mb-1.5">
                        {t.sub}
                      </p>
                      <p className="text-sm md:text-[15px] text-muted-foreground">
                        {t.verdict}
                      </p>
                    </div>
                  </div>

                  {/* Durability label */}
                  <div className="shrink-0 hidden md:flex flex-col justify-center min-w-[80px]">
                    <span className="font-mono-marker text-[10px] tracking-[0.2em] text-muted-foreground/60">
                      DURABILITY
                    </span>
                    <span
                      className="font-display text-lg font-bold"
                      style={{ color: `hsl(${t.color})` }}
                    >
                      {t.durability}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Arrow annotation — value flows down */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 pl-14 md:pl-[72px] flex items-center gap-3 text-muted-foreground"
            >
              <ArrowDown size={16} className="shrink-0 text-accent" />
              <p className="text-sm md:text-base italic font-display">
                Value escapes the surface and accumulates in the layers below.
                <span className="text-foreground"> Own the lower layers, or rent them — and rent your future.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═════════ 3 · THE ONE EXAMPLE ═════════ */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div {...fade} className="mb-12 md:mb-14">
            <Eyebrow className="mb-3">Same year. Same model access. Different fates.</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-2xl">
              Two AI companies. One survived structurally.
              <span className="text-muted-foreground"> The other got absorbed.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Jasper — exposed */}
            <motion.div
              {...fade}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "hsl(var(--verdict-exposed))" }}
              />
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Jasper
                </h3>
                <span
                  className="font-mono-marker text-[10px] tracking-[0.2em] px-2 py-1 rounded"
                  style={{
                    color: "hsl(var(--verdict-exposed))",
                    background: "hsl(var(--verdict-exposed) / 0.10)",
                  }}
                >
                  EXPOSED
                </span>
              </div>
              <div className="space-y-3 text-[15px] leading-relaxed">
                <div className="flex gap-3">
                  <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em] w-16 pt-1 shrink-0">
                    OWNED
                  </span>
                  <span className="text-foreground">
                    <span className="font-bold">L7 only.</span> Marketing copy surface on top of someone else's model.
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em] w-16 pt-1 shrink-0">
                    EVENT
                  </span>
                  <span className="text-foreground">
                    ChatGPT shipped. The surface became free overnight.
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em] w-16 pt-1 shrink-0">
                    OUTCOME
                  </span>
                  <span className="text-foreground">
                    Revenue collapse. <span className="font-bold">~80% valuation mark-down.</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Sierra — fortified */}
            <motion.div
              {...fade}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "hsl(var(--verdict-fortified))" }}
              />
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Sierra
                </h3>
                <span
                  className="font-mono-marker text-[10px] tracking-[0.2em] px-2 py-1 rounded"
                  style={{
                    color: "hsl(var(--verdict-fortified))",
                    background: "hsl(var(--verdict-fortified) / 0.10)",
                  }}
                >
                  FORTRESS
                </span>
              </div>
              <div className="space-y-3 text-[15px] leading-relaxed">
                <div className="flex gap-3">
                  <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em] w-16 pt-1 shrink-0">
                    OWNED
                  </span>
                  <span className="text-foreground">
                    <span className="font-bold">L1 + L5 + L8.</span> Tenant data, deep playbooks, compounding per-customer memory.
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em] w-16 pt-1 shrink-0">
                    EVENT
                  </span>
                  <span className="text-foreground">
                    Frontier models keep shipping. Sierra absorbs them as substrate.
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono-marker text-[10px] text-muted-foreground tracking-[0.15em] w-16 pt-1 shrink-0">
                    OUTCOME
                  </span>
                  <span className="text-foreground">
                    Each tenant gets <span className="font-bold">harder to replace every quarter.</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            {...fade}
            className="mt-10 text-center text-muted-foreground font-display italic text-lg md:text-xl max-w-2xl mx-auto"
          >
            Both companies use the best models money can rent.
            <span className="text-foreground"> Only one of them owns the layers underneath.</span>
          </motion.p>
        </div>
      </section>

      {/* ═════════ 3.5 · APOLLO — THE SAASPOCALYPSE SURVIVOR ═════════ */}
      {/*
        The 60-second explainer. Most SaaSpocalypse coverage is corpses.
        Apollo is the live survivor — and the survival pattern is the
        single most useful thing to internalize about the framework.
      */}
      <section className="relative bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div {...fade} className="mb-10 md:mb-12">
            <Eyebrow className="mb-3">The 60-second explainer · Survivor pattern</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-3xl">
              Apollo gave up its SaaS app to win the AI era.
              <span className="text-muted-foreground"> The framework tells you why that's brilliant.</span>
            </h2>
          </motion.div>

          <motion.div
            {...fade}
            className="rounded-2xl border border-border bg-card p-6 md:p-10 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "hsl(var(--verdict-fortified))" }}
            />

            <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start mb-8">
              <div>
                <p className="font-mono-marker text-[11px] tracking-[0.2em] text-accent mb-2">
                  THE PATTERN
                </p>
                <p className="text-[17px] md:text-[18px] text-foreground/90 leading-[1.7]">
                  For a decade Apollo built the full GTM SaaS stack — 300M+ contact profiles{" "}
                  <span className="font-mono-marker text-[12px] tracking-wide text-muted-foreground">(L1b)</span>,
                  sequencer{" "}
                  <span className="font-mono-marker text-[12px] tracking-wide text-muted-foreground">(L5)</span>,
                  dialer, full app{" "}
                  <span className="font-mono-marker text-[12px] tracking-wide text-muted-foreground">(L7)</span>,
                  platform pitch{" "}
                  <span className="font-mono-marker text-[12px] tracking-wide text-muted-foreground">(L8)</span>.
                  Then it noticed what every horizontal SaaS will eventually notice:{" "}
                  <span className="text-foreground font-semibold">when Claude and ChatGPT become the command center, marketers don't want to log into ten apps.</span>{" "}
                  The L7/L8 surface evaporates.
                </p>
                <p className="text-[17px] md:text-[18px] text-foreground/90 leading-[1.7] mt-4">
                  Apollo's response was structurally radical: keep the L1b data moat. Become the default MCP connector
                  into Claude. Let the surface quietly recede. Now when a marketer asks Claude{" "}
                  <em className="text-foreground">"find me 50 RevOps leaders at Series B SaaS,"</em> Apollo serves the
                  answer — free distribution from inside the command center.
                </p>
              </div>

              <div className="md:w-[200px] shrink-0 flex md:flex-col gap-3">
                {[
                  { layer: "L1b", label: "Data moat", color: "var(--layer-1)" },
                  { layer: "L2", label: "Connector", color: "var(--layer-2)" },
                  { layer: "L7", label: "Receding", color: "var(--layer-7)", muted: true },
                ].map((t) => (
                  <div
                    key={t.layer}
                    className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
                    style={{ background: `hsl(${t.color} / ${t.muted ? 0.03 : 0.08})` }}
                  >
                    <span
                      className="font-display text-xl font-bold"
                      style={{ color: `hsl(${t.color})`, opacity: t.muted ? 0.5 : 1 }}
                    >
                      {t.layer}
                    </span>
                    <span
                      className="font-mono-marker text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: t.muted ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))" }}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6 flex flex-wrap items-baseline justify-between gap-3 mb-2">
              <p className="font-display italic text-foreground text-lg md:text-xl max-w-xl leading-snug">
                "When the layer above you commoditizes, get thinner, not thicker.
                <span className="text-muted-foreground"> Ride the layer that's eating you."</span>
              </p>
              <CopySnippet
                text={
                  "Apollo just ran the cleanest SaaSpocalypse survival playbook I've seen.\n\nFor a decade they stacked the whole GTM SaaS: 300M+ contact profiles (L1b), sequencer (L5), dialer, full app surface (L7), workflow platform (L8). Standard horizontal SaaS — login, dashboards, the works.\n\nThen they noticed what every horizontal SaaS will eventually notice: when Claude and ChatGPT become the command center, marketers don't want to log into 10 apps. The L7/L8 surface evaporates.\n\nApollo's response was structurally radical. Keep the L1b data moat. Become the default MCP connector into Claude. Let the surface quietly recede. Now when a marketer asks Claude \"find me 50 RevOps leaders at Series B SaaS,\" Apollo serves the answer — free distribution from inside the command center.\n\nThe lesson isn't \"build agents.\" It's: when the layer above you commoditizes, get thinner, not thicker. Ride the layer that's eating you.\n\nThat's Law of Layer Compression in real time."
                }
                path="/analysis/apollo-thin-stack-survivor"
                label="Copy this argument"
              />
            </div>

            <Link
              to="/analysis/apollo-thin-stack-survivor"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
            >
              Read the full case study <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-foreground text-background overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 80px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-36 text-center">
          <motion.div {...fade}>
            <p className="font-mono-marker text-[11px] tracking-[0.3em] text-background/50 mb-6">
              SO — THE ONLY QUESTION THAT MATTERS
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
              Which layer
              <br />
              <span className="text-accent">do you own?</span>
            </h2>
            <p className="text-background/60 text-lg md:text-xl max-w-xl mx-auto">
              If the answer is "L7 only" — start running. If the answer involves a number
              below 7 — start defending it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═════════ 5 · THREE DOORS ═════════ */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div {...fade} className="mb-14 text-center">
            <Eyebrow className="mb-3 inline-block">Pick your path</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Three ways in.
              <span className="text-muted-foreground"> Same framework, different use.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {DOORS.map((d, i) => (
              <motion.div
                key={d.audience}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={d.to}
                  className="group block h-full rounded-2xl border border-border bg-card p-7 md:p-8 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.25)]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="rounded-lg p-2.5 bg-accent/10 text-accent">
                      <d.icon size={20} />
                    </span>
                    <span className="font-mono-marker text-[10px] tracking-[0.25em] text-muted-foreground">
                      FOR {d.audience.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-[22px] font-bold text-foreground leading-snug mb-3">
                    {d.question}
                  </h3>
                  <p className="text-[14.5px] text-muted-foreground leading-relaxed mb-6">
                    {d.body}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-accent font-mono-marker text-[11px] tracking-[0.15em] group-hover:gap-2.5 transition-all">
                    {d.cta}
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Download — same instrument, different shell */}
          <motion.div
            {...fade}
            className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/30 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-5"
          >
            <div className="shrink-0 rounded-xl bg-accent/10 text-accent p-3.5">
              <Download size={22} />
            </div>
            <div className="flex-1">
              <p className="font-mono-marker text-[10px] tracking-[0.25em] text-muted-foreground mb-1">
                THE WORKBOOK · 13 PAGES · CC BY 4.0
              </p>
              <p className="font-display text-lg md:text-xl font-bold text-foreground leading-snug">
                The AI Defensibility Audit — score your product in 30 minutes.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                The 8 questions, the rubric, three worked examples, and a license to remix it.
              </p>
            </div>
            <a
              href="/ai-defensibility-audit.pdf"
              download
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 font-mono-marker text-[11px] tracking-[0.15em] hover:bg-accent transition-colors"
            >
              Download PDF <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═════════ 6 · NOW GO DEEPER ═════════ */}
      <section className="bg-secondary/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div {...fade}>
            <p className="font-mono-marker text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
              FIVE MINUTES UP
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              The whole framework is one click away.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              10 layers · 50 sublayers · 4 structural laws · 22 worked verdicts · the Intelligence Cube.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 font-mono-marker text-[11px] tracking-[0.15em] hover:bg-accent transition-colors"
              >
                The full framework <ArrowRight size={13} />
              </Link>
              <Link
                to="/analysis"
                className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 text-foreground px-5 py-3 font-mono-marker text-[11px] tracking-[0.15em] hover:border-accent hover:text-accent transition-colors"
              >
                19 worked verdicts <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Start;
