import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertTriangle, Target } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import { SketchBoard, SketchUnderline } from "@/components/sketch/SketchElements";
import VoicesStrip from "@/components/VoicesStrip";

/**
 * /for-investors — packaging page for PE partners, growth investors, and boards.
 *
 * The homepage sells the framework. This page sells the *use*: due diligence,
 * portfolio audits, board-level AI roadmap reviews. Same IP, investor lens.
 *
 * "Board" is already used by /predictions (the prediction board), so this page
 * uses "For PE & Investors" as the route + nav label.
 */

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const USE_CASES = [
  {
    icon: Target,
    kicker: "Pre-investment",
    title: "AI Defensibility Due Diligence",
    body:
      "Before you wire the check, score the target across all 10 layers. Find out whether you're funding a moat (L1 data + L5 workflow + L8 memory) or a wrapper that a platform release note will erase.",
    layers: ["L1", "L5", "L8"],
  },
  {
    icon: CheckCircle2,
    kicker: "Portfolio audit",
    title: "AI Roadmap Review (per company)",
    body:
      "One-page scorecard per portfolio company. Audit / 40, layer-by-layer verdict, and a 90-day deepening plan. Surfaces which assets are compounding and which are about to be commoditized.",
    layers: ["L2", "L6", "L7"],
  },
  {
    icon: AlertTriangle,
    kicker: "Board education",
    title: "AI Strategy Sessions for Boards",
    body:
      "Two-hour board-level workshop. The 10 layers, the three structural laws, and where each portfolio bet sits on the map. Translates AI hype into the language of moats, margins, and capex.",
    layers: ["L0", "L3", "L4"],
  },
];

const VERDICTS = [
  { tier: "Fortress", color: "verdict-fortified", desc: "L1 + L5 + L8 — owns data, workflow, and memory. Compounds." },
  { tier: "Workflow", color: "verdict-consolidating", desc: "L5/L6 — earns its keep but vulnerable if the platform layer above swallows the surface." },
  { tier: "Wrapper", color: "verdict-exposed", desc: "L7-only on someone else's L2. One platform release note from extinction." },
];

const ForInvestors = () => (
  <SiteLayout>
    <Seo
      title="For PE & Investors — AI Defensibility Diligence | Supply Chain of Intelligence"
      description="A defensibility map for AI investments. Pre-deal diligence, portfolio audits, and board-level AI strategy sessions across all 10 layers of the generative AI stack — not logistics."
      path="/for-investors"
    />

    {/* HERO */}
    <section className="bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Eyebrow tone="accent" className="mb-4">For PE, Growth Investors &amp; Boards</Eyebrow>
          <h1 className="font-display text-[34px] md:text-[48px] font-bold text-foreground leading-[1.1] mb-5">
            A <SketchUnderline color="hsl(var(--accent))"><span className="text-accent">defensibility map</span></SketchUnderline> for your AI portfolio.
          </h1>
          <p className="text-lg text-foreground/85 leading-relaxed max-w-3xl mb-6">
            Most AI diligence still leans on TAM, growth rate, and a vibes-based read of the founder.
            That's how you end up funding a wrapper. The Supply Chain of Intelligence™ scores every AI
            product across 10 layers — compute, data, models, workflows, surfaces, memory — and tells
            you, in one page, whether value is accruing to your company or leaking to the platform above it.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hello@supplychainofai.com?subject=AI%20Defensibility%20Diligence" className="btn-sketch">
              Request a diligence engagement <ArrowRight size={15} />
            </a>
            <Link to="/start" className="btn-sketch-outline">
              Run the audit yourself →
            </Link>
            <Link to="/framework" className="btn-sketch-outline">
              Read the framework
            </Link>
          </div>
          <p className="text-[12px] text-muted-foreground mt-5">
            By <Link to="/about" className="underline-offset-2 hover:underline">Anand Arivukkarasu</Link> — Ex-Meta (Instagram) Product Leader, AI Product Architect, angel investor &amp; advisor.
          </p>
        </motion.div>
      </div>
    </section>

    {/* WHY THIS MATTERS */}
    <section className="bg-secondary/40 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.div {...fadeIn} className="mb-10">
          <Eyebrow className="mb-3">The diligence gap</Eyebrow>
          <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight mb-4">
            JTBD finds demand. It doesn't prove defensibility.
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
            A product can be desirable and still be erased — by the foundation model below it, the
            distribution layer above it, or the workflow giant beside it. Without a layer map, you
            cannot tell which is which.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VERDICTS.map((v) => (
            <div key={v.tier} className="rounded-xl border border-border bg-card p-5">
              <span
                className="font-mono-marker text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded inline-block mb-3 border"
                style={{
                  color: `hsl(var(--${v.color}))`,
                  borderColor: `hsl(var(--${v.color}) / 0.3)`,
                  background: `hsl(var(--${v.color}) / 0.05)`,
                }}
              >
                {v.tier}
              </span>
              <p className="text-sm text-foreground/85 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* USE CASES */}
    <section className="bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.div {...fadeIn} className="mb-10">
          <Eyebrow className="mb-3">Engagements</Eyebrow>
          <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight">
            Three ways investors use the framework.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {USE_CASES.map((u) => {
            const Icon = u.icon;
            return (
              <motion.div key={u.title} {...fadeIn}>
                <SketchBoard className="p-6 h-full flex flex-col">
                  <Icon className="text-accent mb-4" size={26} />
                  <Eyebrow className="mb-2">{u.kicker}</Eyebrow>
                  <h3 className="font-display text-lg font-bold text-foreground leading-tight mb-3">
                    {u.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {u.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {u.layers.map((l) => (
                      <LayerTag key={l} id={l} />
                    ))}
                  </div>
                </SketchBoard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* WHAT YOU GET */}
    <section className="bg-secondary/40 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.div {...fadeIn} className="mb-8">
          <Eyebrow className="mb-3">Deliverables</Eyebrow>
          <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight">
            What you walk away with.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Layer-by-layer scorecard", "All 10 layers · 50 sublayers · score / 40 with verdict band."],
            ["Defensibility verdict", "Fortress / Workflow / Wrapper — with the structural reason cited."],
            ["Platform compression risk", "Which layers above and below are about to absorb this product."],
            ["90-day deepening plan", "The two or three layer moves that meaningfully change the verdict."],
            ["Comparable mapping", "How the target sits next to 3–5 worked case studies from the corpus."],
            ["Board-ready one-pager", "Designed to drop into an IC memo or board pack as-is."],
          ].map(([title, body]) => (
            <div key={title} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
              <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-display font-bold text-foreground text-[15px] mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <VoicesStrip />

    {/* CTA */}
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 text-center">
        <motion.div {...fadeIn}>
          <Eyebrow tone="accent" className="mb-4 justify-center inline-flex">Start a conversation</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-foreground leading-tight mb-5">
            Bring the map to your next deal or board meeting.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-2xl mx-auto">
            Diligence engagements, portfolio audits, and board sessions are scoped per firm.
            Reach out with the company or thesis you want pressure-tested.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@supplychainofai.com?subject=AI%20Defensibility%20Engagement" className="btn-sketch">
              Email Anand <ArrowRight size={15} />
            </a>
            <Link to="/start" className="btn-sketch-outline">
              Run the self-serve audit →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </SiteLayout>
);

export default ForInvestors;
