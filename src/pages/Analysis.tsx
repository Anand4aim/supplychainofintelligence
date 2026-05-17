import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";
import Eyebrow from "@/components/Eyebrow";

const FEATURED_SLUGS = [
  "jasper-vs-grammarly-copilot",
  "chegg-collapse",
  "gamma-thin-layer-graveyard",
];

const featured = CASE_STUDIES.filter((s) => FEATURED_SLUGS.includes(s.slug));
const remaining = CASE_STUDIES.filter((s) => !FEATURED_SLUGS.includes(s.slug));

const trackOf = (s: typeof CASE_STUDIES[number]) => s.track ?? "software";

const softwareCases = remaining.filter((s) => trackOf(s) === "software");
const verticalCases = remaining.filter((s) => trackOf(s) === "vertical");
const physicalCases = remaining.filter((s) => trackOf(s) === "physical");

const Track = ({
  eyebrow,
  title,
  blurb,
  cases,
  note,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  cases: typeof CASE_STUDIES;
  note?: string;
}) => {
  if (cases.length === 0) return null;
  return (
    <div className="mb-14 last:mb-0">
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm md:text-base max-w-3xl leading-relaxed mb-4">
        {blurb}
      </p>
      {note && (
        <p className="text-[11px] text-muted-foreground/80 italic border-l-2 border-border pl-3 mb-6 max-w-3xl">
          {note}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} />
        ))}
      </div>
    </div>
  );
};

const AnalysisPage = () => (
  <SiteLayout>
    <Seo
      title="AI Case Studies — Jasper, Chegg, Tempus, Deere, Waymo & More"
      description="Real companies analyzed through the 10-layer stack — software, regulated verticals, and physical-world AI. Where each company sits in the Supply Chain of Intelligence."
      path="/analysis"
    />
    {/* Hero */}
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Eyebrow className="mb-6">Structural Analysis</Eyebrow>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-6">
            Case Studies Through the Lens of the Layers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Real companies. Real valuations. Real shifts. Every case mapped to the 10 layers,
            the Intelligence Cube, and the Three Structural Laws — across software, regulated
            verticals, and the physical world.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: `${CASE_STUDIES.length}`, label: "Companies analyzed" },
              { value: "3", label: "Analysis tracks" },
              { value: "L-1 → L8", label: "Layers covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-sketch text-3xl md:text-4xl font-bold text-accent">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Featured */}
    <section className="bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Eyebrow className="mb-8">Featured Case Studies</Eyebrow>
        <div className="space-y-8">
          {featured.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} featured />
          ))}
        </div>
      </div>
    </section>

    {/* Tracks */}
    <section className="bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Eyebrow className="mb-3">The Three Tracks</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          One framework. Three velocities.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl leading-relaxed mb-12">
          The 10-layer stack applies the same way to a SaaS app, an oncology platform, and a
          tractor — but the layers that hold value, and the speed at which they compress, differ a
          lot. The tracks below sort cases by where the structural action actually sits.
        </p>

        <Track
          eyebrow="Track 01 · Software & SaaS"
          title="Fast cycles, model layer dominates the story"
          blurb="Classic L2–L7 dynamics — foundation models commoditize the surface, distribution becomes the moat, and L8 (memory + workflow) is the unbuilt layer everyone is racing toward. Cycles measured in quarters."
          cases={softwareCases}
        />

        <Track
          eyebrow="Track 02 · Vertical & Regulated"
          title="L8 sits above the model and slows commoditization"
          blurb="Healthcare, legal, finance. The model is necessary but not sufficient — clinical workflow, regulatory clearance, billing codes, and liability assignment form an L8 that takes years to build and is hard to replicate from above."
          cases={verticalCases}
          note="Structural reads through the 10-layer framework. The author is a product strategist applying the framework — not a domain expert in clinical medicine, law, or financial regulation."
        />

        <Track
          eyebrow="Track 03 · Physical & Industrial"
          title="L-1 is the layer no AI-only entrant can replicate"
          blurb="Agriculture, robotics, autonomy, energy, manufacturing. The model is the easy layer. The hard layers are L-1 (physical assets + edge silicon + fleet density) and L8 (operating workflow + financing). Cycles measured in years, not quarters."
          cases={physicalCases}
          note="Structural reads through the 10-layer framework. The author is a product strategist applying the framework — not a domain expert in robotics, autonomy, or industrial systems."
        />
      </div>
    </section>

    {/* Structural Scoreboard */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Eyebrow className="mb-6">The Structural Scoreboard</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          Where do they all sit?
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layers</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Track</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Structural read</th>
              </tr>
            </thead>
            <tbody>
              {CASE_STUDIES.map((s) => (
                <tr key={s.slug} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-4 text-foreground font-semibold">{s.companies.map((c) => c.name).join(" / ")}</td>
                  <td className="py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {s.layers.map((l) => {
                        const n = parseInt(l.replace("L", ""));
                        return (
                          <span
                            key={l}
                            className="font-sketch text-sm font-bold px-2 py-0.5 rounded-md"
                            style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}
                          >
                            {l}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-4 text-muted-foreground text-xs uppercase tracking-wider">
                    {trackOf(s) === "vertical" ? "Vertical" : trackOf(s) === "physical" ? "Physical" : "Software"}
                  </td>
                  <td className="py-4 text-muted-foreground text-sm">{s.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Newsletter CTA */}
    <section className="bg-background border-t border-border">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Get the weekly case study</h2>
        <p className="text-muted-foreground text-sm mb-6">
          One company, one structural read, one layer map. Every week.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Coming soon!"); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input type="email" placeholder="you@company.com" required
            aria-label="Email address for weekly case study newsletter"
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
          <button type="submit" className="btn-sketch">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </SiteLayout>
);

export default AnalysisPage;
