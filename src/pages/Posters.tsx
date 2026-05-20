import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import StackPosterFull from "@/components/StackPosterFull";
import StackPoster from "@/components/StackPoster";
import Eyebrow from "@/components/Eyebrow";
import { SketchFilters } from "@/components/sketch/SketchElements";

const Posters = () => (
  <SiteLayout>
    <Seo
      title="Posters — The Supply Chain of Intelligence™"
      description="Shareable posters of the 10-layer generative AI stack. Print, pin, or post. Free, citation-ready."
      path="/posters"
    />
    <SketchFilters />

    <section className="bg-background border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <Eyebrow className="mb-3">Shareable</Eyebrow>
        <h1 className="font-display text-3xl md:text-[40px] font-bold text-foreground leading-tight mb-3">
          Posters of the Stack
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          The full 10×5 grid and the one-square version. Download, print, pin, post.
          Citation-ready, no signup.
        </p>
        <Link
          to="/framework"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          <ArrowLeft size={14} /> Back to the framework
        </Link>
      </div>
    </section>

    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <Eyebrow className="mb-3">10 Layers × 5 Sublayers</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          The full reference poster
        </h2>
        <StackPosterFull />
      </div>
    </section>

    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <Eyebrow className="mb-3">Square</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          The stack, on one square
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mb-6">
          For LinkedIn, X, decks, and Pinterest. The 10 layers, the tagline, the attribution — nothing else.
        </p>
        <StackPoster />
      </div>
    </section>
  </SiteLayout>
);

export default Posters;
