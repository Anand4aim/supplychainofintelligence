import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import StackVsSupplyChainTable from "@/components/StackVsSupplyChainTable";
import CursorThroughBothLenses from "@/components/CursorThroughBothLenses";
import { POSITIONING_LINE } from "@/data/definition";
import { ArrowRight } from "lucide-react";

/**
 * /not-a-stack — "Why the Supply Chain of Intelligence is not another AI stack."
 *
 * Not defensive. Analytical. Built to be the page we link to when a
 * reader pattern-matches "oh, another stack." Structure follows the
 * six beats from the review:
 *
 *   1. What the AI stack explains (and explains well).
 *   2. Where it stops being useful.
 *   3. The questions executives, investors, and PMs actually have.
 *   4. Why those questions need economics, not architecture.
 *   5. Introduce the Supply Chain of Intelligence.
 *   6. Cursor / Harvey / OpenAI / NVIDIA through both lenses.
 */

const Section = ({
  num,
  eyebrow,
  title,
  children,
}: {
  num: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="border-b border-border bg-background">
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono-marker text-[11px] tracking-[0.25em] uppercase text-accent font-bold">
          {num}
        </span>
        <Eyebrow className="mb-0">{eyebrow}</Eyebrow>
      </div>
      <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight mb-5">
        {title}
      </h2>
      <div className="prose-like text-foreground/85 text-[16px] leading-[1.8] space-y-4">
        {children}
      </div>
    </div>
  </section>
);

const COMPANIES: Array<{
  name: string;
  stack: string;
  scoi: string;
  layers: string;
}> = [
  {
    name: "Cursor",
    stack: "Application.",
    scoi: "L7 Surface + L6 Orchestration + L5 Execution + L8 Memory + L1 Outcome Data. Flywheel: accepted edits improve retrieval.",
    layers: "Owns 4 layers. Model is the only commodity.",
  },
  {
    name: "Harvey",
    stack: "Application.",
    scoi: "L5 Domain Skills (legal) + L1 Proprietary Data (firm corpora) + L3 Editorial gates (citation discipline) + L6 Orchestration of review.",
    layers: "Defensibility lives in L1 + L5; surface is replaceable.",
  },
  {
    name: "OpenAI",
    stack: "Model layer.",
    scoi: "L2 Foundation Models + L4 Access (API + agents) + L7 Surface (ChatGPT) + emerging L8 Memory + L3 Editorial gates.",
    layers: "5+ layers. Vertical integration is the strategy.",
  },
  {
    name: "NVIDIA",
    stack: "Infrastructure.",
    scoi: "L−1 Resources (HBM, packaging) + L0 Silicon + L0 Interconnect (NVLink) + L4 Access (CUDA) + L5 Execution (CUDA-X).",
    layers: "The bottleneck. Owns the chain from substrate to the developer.",
  },
];

const NotAStack = () => (
  <SiteLayout>
    <Seo
      title="Not Another AI Stack — Supply Chain of Intelligence"
      description="The AI stack explains how intelligence is built. The Supply Chain of Intelligence explains where intelligence becomes economically defensible. Architecture vs. economics, components vs. bottlenecks, static layers vs. dynamic system."
      path="/not-a-stack"
    />

    {/* HERO */}
    <section className="bg-background border-b border-border">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <Eyebrow tone="accent" className="mb-4">The Category Question</Eyebrow>
        <h1 className="font-display text-[34px] md:text-[48px] font-bold text-foreground leading-[1.08] mb-5">
          Why this isn't another AI stack.
        </h1>
        <p className="font-display text-[18px] md:text-[20px] text-foreground/85 leading-snug border-l-2 border-accent pl-4 mb-6">
          {POSITIONING_LINE}
        </p>
        <p className="text-foreground/80 text-[15px] md:text-[16px] leading-relaxed">
          Every framework that draws boxes for "infrastructure, models, applications" looks the same at a glance. This one answers a different question. If you've ever shrugged "isn't this just another AI stack diagram?" — this page is for you.
        </p>
      </div>
    </section>

    {/* 01 — What the stack explains */}
    <Section num="01" eyebrow="What the AI stack does well" title="The stack is a great architecture diagram.">
      <p>
        Andreessen Horowitz, Sequoia, Madrona, NFX — every credible AI stack diagram answers the same question, well:
      </p>
      <p className="font-display text-[18px] md:text-[20px] text-foreground border-l-2 border-accent pl-4 italic">
        How is AI <em>built</em>?
      </p>
      <p>
        Infrastructure underneath, foundation models in the middle, applications on top. It's a clean engineering taxonomy. It's how you'd onboard a new engineer. It's how you'd brief a board on what the components are.
      </p>
      <p className="text-foreground font-semibold">
        That is real, useful work. We're not arguing with it. We use it as one input.
      </p>
    </Section>

    {/* 02 — Where it stops */}
    <Section num="02" eyebrow="Where the stack stops being useful" title="It describes the parts. It doesn't predict the outcomes.">
      <p>
        The AI stack tells you that Jasper and Cursor are both "applications." It tells you Cohere and OpenAI are both "model layer." It tells you AWS and CoreWeave are both "infrastructure."
      </p>
      <p>
        And then you ask the only question a PM, founder, or investor actually has — <em>which one survives the next 18 months?</em> — and the stack has nothing to say. Because the stack is descriptive. It names what exists. It doesn't tell you where value accrues, where margin captures, or what a hyperscaler can absorb for free next quarter.
      </p>
    </Section>

    {/* 03 — The real questions */}
    <Section num="03" eyebrow="The questions that actually get asked" title="Five questions the stack can't answer.">
      <ul className="space-y-3 list-none pl-0">
        <li className="flex gap-3"><span className="font-mono-marker text-accent text-[12px] tracking-[0.2em] uppercase shrink-0 w-6">Q1</span><span>Is this product a moat, a workflow, or a wrapper a platform will absorb?</span></li>
        <li className="flex gap-3"><span className="font-mono-marker text-accent text-[12px] tracking-[0.2em] uppercase shrink-0 w-6">Q2</span><span>Which of my $10M ARR competitors are durable, and which are on a six-month clock?</span></li>
        <li className="flex gap-3"><span className="font-mono-marker text-accent text-[12px] tracking-[0.2em] uppercase shrink-0 w-6">Q3</span><span>If OpenAI ships this as a feature, does my product still have a reason to exist?</span></li>
        <li className="flex gap-3"><span className="font-mono-marker text-accent text-[12px] tracking-[0.2em] uppercase shrink-0 w-6">Q4</span><span>Where does the margin in this category end up — at the chip, the model, the workflow, or the surface?</span></li>
        <li className="flex gap-3"><span className="font-mono-marker text-accent text-[12px] tracking-[0.2em] uppercase shrink-0 w-6">Q5</span><span>What's my flywheel? Where does the next dollar of compounding value land?</span></li>
      </ul>
      <p className="pt-2">
        None of these are architecture questions. They are economic questions. Asking them of an architecture diagram is like asking a circuit schematic where the profit is.
      </p>
    </Section>

    {/* 04 — Why economics */}
    <Section num="04" eyebrow="Architecture vs. Economics" title="These are economic questions. They need an economic framework.">
      <p>
        The AI stack is built by and for engineers. The Supply Chain of Intelligence is built for the people who decide what gets funded, shipped, acquired, or shut down. The unit of analysis changes:
      </p>
      <ul className="space-y-2 pl-5 list-disc marker:text-accent">
        <li>From <strong>components</strong> to <strong>bottlenecks</strong>.</li>
        <li>From <strong>static layers</strong> to a <strong>dynamic system</strong> with commoditization pressure flowing downward.</li>
        <li>From <strong>describing what exists</strong> to <strong>predicting where value will land</strong>.</li>
        <li>From <strong>technology</strong> to <strong>strategy</strong>.</li>
      </ul>
      <p>
        That is why the framework has Laws, Dynamics, and an Intelligence Cube. None of those exist in an AI stack diagram, because none of those questions exist in an AI stack diagram.
      </p>

      <div className="not-prose pt-4">
        <StackVsSupplyChainTable path="/not-a-stack" />
      </div>
    </Section>

    {/* 05 — Introduce SCoI */}
    <Section num="05" eyebrow="The Supply Chain of Intelligence" title="10 layers, 50 sublayers, 4 Laws, and a Cube.">
      <p>
        The framework resolves the category reframe into a working map: <strong>10 layers</strong> from L−1 Resources to L8 Memory, <strong>50 sublayers</strong>, grouped into three <strong>tiers</strong> (Substrate, Workflow, Surface) that compound on very different timescales. Three market <strong>currents</strong> (Demand Gravity, Attention Economics, Capital Flows) flow horizontally and decide whether a defensible position becomes a business.
      </p>
      <p>
        Sitting on top: <strong>four structural Laws</strong> that explain why the system moves the way it does — Intelligence commoditizes downward, Value accrues at bottlenecks, The surface captures attention while the chain captures power, Generation and verification must be separate. And the <strong>Intelligence Cube</strong>: function × vertical × layer, for portfolio decisions instead of category labels.
      </p>
      <p className="pt-2 not-prose">
        <Link to="/framework" className="font-display font-semibold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
          Read the full framework <ArrowRight size={14} />
        </Link>
      </p>
    </Section>

    {/* 06 — Four companies through both lenses */}
    <section className="bg-secondary/30 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="max-w-3xl mb-8">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-mono-marker text-[11px] tracking-[0.25em] uppercase text-accent font-bold">06</span>
            <Eyebrow className="mb-0">Four companies, two lenses</Eyebrow>
          </div>
          <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight mb-3">
            Same companies. Different resolution.
          </h2>
          <p className="text-foreground/80 text-[15px] md:text-[16px] leading-relaxed">
            Notice how the stack collapses four very different companies into two or three categories. The framework gives you the layers, the verdict, and the mechanism.
          </p>
        </div>

        <div className="rounded-xl border border-foreground/10 bg-card overflow-hidden">
          <div className="grid grid-cols-[110px_1fr_2fr] md:grid-cols-[140px_1fr_2.5fr] bg-foreground/[0.03]">
            <div className="px-4 md:px-6 py-3 font-mono-marker text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Company</div>
            <div className="px-4 md:px-6 py-3 font-mono-marker text-[10px] tracking-[0.2em] uppercase text-muted-foreground border-l border-foreground/10">AI Stack</div>
            <div className="px-4 md:px-6 py-3 font-mono-marker text-[10px] tracking-[0.2em] uppercase text-accent border-l border-foreground/10">Supply Chain of Intelligence™</div>
          </div>
          {COMPANIES.map((c, i) => (
            <div
              key={c.name}
              className={`grid grid-cols-[110px_1fr_2fr] md:grid-cols-[140px_1fr_2.5fr] border-t border-foreground/10 ${
                i % 2 === 1 ? "bg-foreground/[0.015]" : ""
              }`}
            >
              <div className="px-4 md:px-6 py-4 font-display font-bold text-foreground self-center">{c.name}</div>
              <div className="px-4 md:px-6 py-4 border-l border-foreground/10 text-[14px] md:text-[15px] text-foreground/75 self-center">{c.stack}</div>
              <div className="px-4 md:px-6 py-4 border-l border-foreground/10 text-[14px] md:text-[15px] text-foreground/90 self-center leading-snug">
                <div>{c.scoi}</div>
                <div className="font-mono-marker text-[10px] tracking-[0.16em] uppercase text-accent mt-1.5">{c.layers}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-display italic text-[15px] md:text-[16px] text-foreground/80 mt-6 max-w-3xl">
          If after all this someone still calls the framework "another AI stack" — they're making a conscious choice, not a first-glance one. That's all we needed.
        </p>
      </div>
    </section>

    {/* Killer demo — Cursor through both lenses */}
    <CursorThroughBothLenses path="/not-a-stack" />

    {/* Outro */}
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20 text-center">
        <Eyebrow className="mb-3">Next</Eyebrow>
        <h2 className="font-display text-[26px] md:text-[32px] font-bold text-foreground leading-tight mb-4">
          Now read the map.
        </h2>
        <p className="text-foreground/80 text-[15px] md:text-[16px] leading-relaxed mb-6 max-w-2xl mx-auto">
          The 10 layers, the 50 sublayers, the 4 Laws, the Cube — and the worked case studies that show the framework in motion.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/framework" className="btn-sketch">
            Read the framework <ArrowRight size={14} />
          </Link>
          <Link to="/audit" className="btn-sketch-outline">
            Run the Defensibility Audit
          </Link>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default NotAStack;
