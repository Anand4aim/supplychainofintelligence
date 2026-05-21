import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { SketchFilters } from "@/components/sketch/SketchElements";

import HeroBrandPoster from "@/components/posters/HeroBrandPoster";
import StackPosterFull from "@/components/StackPosterFull";
import StackPoster from "@/components/StackPoster";
import AboveBelowLinePoster from "@/components/posters/AboveBelowLinePoster";
import TenBenefitsPoster from "@/components/posters/TenBenefitsPoster";
import FourLawsPoster from "@/components/posters/FourLawsPoster";
import DefensibilityTrianglePoster from "@/components/posters/DefensibilityTrianglePoster";
import AgentDecoderPoster from "@/components/posters/AgentDecoderPoster";
import SixArchetypesPoster from "@/components/posters/SixArchetypesPoster";
import IntelligenceCubePoster from "@/components/posters/IntelligenceCubePoster";
import GoldMiningPoster from "@/components/posters/GoldMiningPoster";
import WhereDoYouLivePoster from "@/components/posters/WhereDoYouLivePoster";
import AITaxMapPoster from "@/components/posters/AITaxMapPoster";
import StackCompressionMapPoster from "@/components/posters/StackCompressionMapPoster";
import MigrationPathsPoster from "@/components/posters/MigrationPathsPoster";
import GravityFlowPoster from "@/components/posters/GravityFlowPoster";
import OpenVsClosedPoster from "@/components/posters/OpenVsClosedPoster";
import GoogleGeoMythPoster from "@/components/posters/GoogleGeoMythPoster";
import ProductLeaderLensPoster from "@/components/posters/ProductLeaderLensPoster";
import InvestorLensPoster from "@/components/posters/InvestorLensPoster";
import FrameworkSummaryPoster from "@/components/posters/FrameworkSummaryPoster";

interface PosterBlockProps {
  num: string;
  eyebrow: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}

const PosterBlock = ({ num, eyebrow, title, blurb, children, tone = "light" }: PosterBlockProps) => (
  <section
    className={
      tone === "dark"
        ? "bg-secondary/40 border-t border-border"
        : "bg-background border-t border-border"
    }
  >
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-16">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono-marker text-[11px] tracking-[0.22em] uppercase text-accent font-bold">
          {num}
        </span>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-sm md:text-base text-muted-foreground max-w-2xl mb-6 leading-relaxed">
        {blurb}
      </p>
      {children}
    </div>
  </section>
);

const Posters = () => (
  <SiteLayout>
    <Seo
      title="Posters — The Supply Chain of Intelligence™"
      description="Twenty shareable posters of the 10-layer generative AI stack — the framework, the laws, the archetypes, the dynamics. Watermarked PNG and PDF. Free, citation-ready."
      path="/posters"
    />
    <SketchFilters />

    {/* Page intro */}
    <section className="bg-background border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <Eyebrow className="mb-3">Shareable</Eyebrow>
        <h1 className="font-display text-3xl md:text-[40px] font-bold text-foreground leading-tight mb-3">
          Twenty posters of the framework.
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          The stack, the laws, the archetypes, the dynamics — every poster downloads as a watermarked PNG or PDF.
          Use them in decks, on LinkedIn, on your wall. Citation-ready, no signup.
        </p>
        <Link
          to="/framework"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          <ArrowLeft size={14} /> Back to the framework
        </Link>
      </div>
    </section>

    {/* ──────────── SECTION I — THE STACK ──────────── */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
        <p className="font-mono-marker text-[11px] tracking-[0.32em] uppercase text-accent font-bold mb-1">
          I — The Stack
        </p>
        <p className="font-display text-lg md:text-xl text-foreground/80 italic">
          Three ways to see all ten layers at once.
        </p>
      </div>
    </section>

    <PosterBlock
      num="01"
      eyebrow="Magazine Cover"
      title="The Hero Brand Poster"
      blurb="Dark, editorial, scroll-stopping. The single image to anchor a LinkedIn post or open a deck."
    >
      <HeroBrandPoster />
    </PosterBlock>

    <PosterBlock
      num="02"
      eyebrow="Reference Sheet"
      title="The 10 × 50 Grid"
      blurb="Every layer and every sublayer on one page. The pin-on-the-wall version. ★ marks structurally defensible sublayers."
      tone="dark"
    >
      <StackPosterFull />
    </PosterBlock>

    <PosterBlock
      num="03"
      eyebrow="One Square"
      title="The Stack, on a Square"
      blurb="Sized for LinkedIn, X, decks, Pinterest. Ten chips, the tagline, the attribution — nothing else."
    >
      <div className="max-w-[640px]">
        <StackPoster />
      </div>
    </PosterBlock>

    <PosterBlock
      num="04"
      eyebrow="Mental Model"
      title="Above / Below the Line"
      blurb="The single most teachable diagram in the framework. Below the line: inputs consumed. Above: intelligence compounded."
      tone="dark"
    >
      <AboveBelowLinePoster />
    </PosterBlock>

    {/* ──────────── SECTION II — THE ARGUMENTS ──────────── */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
        <p className="font-mono-marker text-[11px] tracking-[0.32em] uppercase text-accent font-bold mb-1">
          II — The Arguments
        </p>
        <p className="font-display text-lg md:text-xl text-foreground/80 italic">
          The posters that win the disagreement.
        </p>
      </div>
    </section>

    <PosterBlock
      num="05"
      eyebrow="Why It Matters"
      title="10 Benefits of the Framework"
      blurb="The answer to 'why should I care?' One artifact, ten precise reasons. Best for product leaders, founders, and skeptical investors."
    >
      <TenBenefitsPoster />
    </PosterBlock>

    <PosterBlock
      num="06"
      eyebrow="The Physics"
      title="The Four Structural Laws"
      blurb="Wrappers die. Bottlenecks win. Surface captures attention; chain captures power. Memory is the final moat."
      tone="dark"
    >
      <FourLawsPoster />
    </PosterBlock>

    <PosterBlock
      num="07"
      eyebrow="The Moat Shape"
      title="The Defensibility Triangle"
      blurb="L1b × L3 × L8. Own two corners and you're defensible. Own three and you're uncopyable. Everything else is rent."
    >
      <DefensibilityTrianglePoster />
    </PosterBlock>

    <PosterBlock
      num="08"
      eyebrow="Buzzword, Decoded"
      title="The Agent Decoder"
      blurb="'Agent' is not a layer. It's L5 + L7 (+L8) packaging. Use this whenever someone announces an agent — and ask which three layers."
      tone="dark"
    >
      <AgentDecoderPoster />
    </PosterBlock>

    {/* ──────────── SECTION III — THE MODELS ──────────── */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
        <p className="font-mono-marker text-[11px] tracking-[0.32em] uppercase text-accent font-bold mb-1">
          III — The Models
        </p>
        <p className="font-display text-lg md:text-xl text-foreground/80 italic">
          The frameworks-within-the-framework.
        </p>
      </div>
    </section>

    <PosterBlock
      num="09"
      eyebrow="Pattern Recognition"
      title="The 6 Archetypes"
      blurb="Every AI company collapses into one of six shapes: Fortress · Refinery · Railroad · Memory · Surface · Agent. Find yours."
    >
      <SixArchetypesPoster />
    </PosterBlock>

    <PosterBlock
      num="10"
      eyebrow="Three Dimensions"
      title="The Intelligence Cube™"
      blurb="Layer × Sublayer × Depth. Defensibility is volume, not feature count."
      tone="dark"
    >
      <IntelligenceCubePoster />
    </PosterBlock>

    <PosterBlock
      num="11"
      eyebrow="For Non-Technical Readers"
      title="The Gold Mining Analogy"
      blurb="The whole stack told as one extended metaphor — from the land itself to the polished jewelry. The poster to hand a board member."
    >
      <GoldMiningPoster />
    </PosterBlock>

    <PosterBlock
      num="12"
      eyebrow="Self-Diagnostic"
      title="Where Does Your Company Live?"
      blurb="A fill-in-the-blank stack chart. Print it, tick the layers you actually own, and answer three honest questions."
      tone="dark"
    >
      <WhereDoYouLivePoster />
    </PosterBlock>

    {/* ──────────── SECTION IV — THE DYNAMICS ──────────── */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
        <p className="font-mono-marker text-[11px] tracking-[0.32em] uppercase text-accent font-bold mb-1">
          IV — The Dynamics
        </p>
        <p className="font-display text-lg md:text-xl text-foreground/80 italic">
          Where the framework becomes an operating system.
        </p>
      </div>
    </section>

    <PosterBlock
      num="13"
      eyebrow="Where The Meter Runs"
      title="The AI Tax Map"
      blurb="Seven taxes every AI product pays — token, context, orchestration, inference margin, API dependency, model lock-in, distribution. Most founders only price for two."
    >
      <AITaxMapPoster />
    </PosterBlock>

    <PosterBlock
      num="14"
      eyebrow="Law I, Visualized"
      title="The Stack Compression Map"
      blurb="When the model layer ships your feature for free, who survives and who becomes a footnote. The visual proof of Law I."
      tone="dark"
    >
      <StackCompressionMapPoster />
    </PosterBlock>

    <PosterBlock
      num="15"
      eyebrow="Four Strategic Arcs"
      title="The Migration Paths"
      blurb="Companies that survive Law I migrate. Four archetypal arcs — Wrapper to Workflow, Surface to Memory, Tool to System, Data to Platform — cover almost every move worth making."
    >
      <MigrationPathsPoster />
    </PosterBlock>

    <PosterBlock
      num="16"
      eyebrow="How The Stack Moves"
      title="The Gravity Flow"
      blurb="Data flows down. Value flows up. Memory compounds recursively. The single rule that explains where margins go."
      tone="dark"
    >
      <GravityFlowPoster />
    </PosterBlock>

    <PosterBlock
      num="17"
      eyebrow="The Moat Quadrant"
      title="Open vs Closed Surfaces"
      blurb="Plot a surface by openness, gate density, and memory depth. The top-left is where AI cannot legally, technically, or commercially compete."
    >
      <OpenVsClosedPoster />
    </PosterBlock>

    <PosterBlock
      num="18"
      eyebrow="What Google Actually Said"
      title="GEO is Just SEO — The Five Myths"
      blurb="Google's Nov 2025 generative-AI search guide, decoded through the 10-layer stack. The AEO/GEO playbook being sold to founders is mostly noise — here's what actually moves the needle."
      tone="dark"
    >
      <GoogleGeoMythPoster />
    </PosterBlock>

    {/* ──────────── SECTION V — FOR YOUR AUDIENCE ──────────── */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
        <p className="font-mono-marker text-[11px] tracking-[0.32em] uppercase text-accent font-bold mb-1">
          V — For Your Audience
        </p>
        <p className="font-display text-lg md:text-xl text-foreground/80 italic">
          Role-specific posters to share alongside your own POV.
        </p>
      </div>
    </section>

    <PosterBlock
      num="19"
      eyebrow="For Product Leaders"
      title="The Product Leader's Lens"
      blurb="Five questions to ask of any AI feature on your roadmap — mapped to the layer each one stress-tests. The poster that ends 'just a wrapper' arguments in a standup."
    >
      <ProductLeaderLensPoster />
    </PosterBlock>

    <PosterBlock
      num="20"
      eyebrow="For Investors"
      title="The Investor's Lens — Rent or Own"
      blurb="A 10-layer diligence map. Which layers compound, which commoditize, and the five questions every AI deal memo should answer before the check clears."
      tone="dark"
    >
      <InvestorLensPoster />
    </PosterBlock>

    {/* Closer */}
    <section className="bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        <p className="font-sketch text-base md:text-lg italic text-muted-foreground mb-4">
          More posters as the framework grows. Suggest one →
        </p>
        <Link
          to="/framework"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          <ArrowLeft size={14} /> Back to the framework
        </Link>
      </div>
    </section>
  </SiteLayout>
);

export default Posters;
