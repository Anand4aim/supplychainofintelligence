import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";
import { ArrowRight } from "lucide-react";

const FEATURED_SLUGS = [
  "jasper-vs-grammarly-copilot",
  "chegg-collapse",
  "gamma-thin-layer-graveyard",
];

const featured = CASE_STUDIES.filter((s) => FEATURED_SLUGS.includes(s.slug));
const remaining = CASE_STUDIES.filter((s) => !FEATURED_SLUGS.includes(s.slug));

const AnalysisPage = () => (
  <SiteLayout>
    <Seo
      title="AI Case Studies — Jasper, Chegg, Sierra, Harvey & More"
      description="Real companies analyzed through the 10-layer stack. $50B+ in market cap explained by where each AI product sits in the Supply Chain of Intelligence."
      path="/analysis"
    />
    {/* Hero */}
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono-marker text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-accent mb-6">
            — Structural Analysis
          </p>
          <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-6">
            Case Studies Through the Lens of the Stack
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Real companies. Real valuations. Real collapses. Every case analyzed through the 10 layers,
            the Intelligence Cube™, and the Three Structural Laws.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: "$50B+", label: "Market cap destroyed" },
              { value: "9", label: "Companies analyzed" },
              { value: "99%", label: "Worst single collapse" },
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
        <p className="font-mono-marker text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-accent mb-8">
          — Featured Case Studies
        </p>
        <div className="space-y-8">
          {featured.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} featured />
          ))}
        </div>
      </div>
    </section>

    {/* Remaining */}
    <section className="bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-mono-marker text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-accent mb-8">
          — More Analysis
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remaining.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Structural Scoreboard */}
    <section className="bg-secondary/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-mono-marker text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-accent mb-6">
          — The Structural Scoreboard
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          Where Do They All Sit?
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layers</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cube Volume</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verdict</th>
                <th className="pb-3 font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">Valuation Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Chegg", layers: ["L6"], volume: "Thin sliver", verdict: "Dead", verdictColor: "hsl(var(--verdict-exposed))", impact: "$12B → $120M (−99%)" },
                { name: "Jasper", layers: ["L7"], volume: "Thin sliver", verdict: "Collapsed", verdictColor: "hsl(var(--verdict-exposed))", impact: "$1.5B → ~$300M (−80%)" },
                { name: "Gamma", layers: ["L7"], volume: "Thin sliver", verdict: "At risk", verdictColor: "hsl(var(--verdict-consolidating))", impact: "$2.1B → Fragile" },
                { name: "Stability AI", layers: ["L2"], volume: "Open + thin", verdict: "Collapsed", verdictColor: "hsl(var(--verdict-exposed))", impact: "$1B → ~$80M (−92%)" },
                { name: "Stack Overflow", layers: ["L1", "L6"], volume: "Narrow", verdict: "Declining", verdictColor: "hsl(var(--verdict-consolidating))", impact: "Traffic −45%" },
                { name: "ZoomInfo", layers: ["L1", "L7"], volume: "UI-heavy", verdict: "Pressured", verdictColor: "hsl(var(--verdict-consolidating))", impact: "$24B → $5B (−79%)" },
                { name: "Grammarly", layers: ["L1", "L6", "L8"], volume: "Deep", verdict: "Durable", verdictColor: "hsl(var(--verdict-fortified))", impact: "Stable at $13B" },
                { name: "Apollo.io", layers: ["L1"], volume: "Data refinery", verdict: "Safe", verdictColor: "hsl(var(--verdict-fortified))", impact: "Growing" },
                { name: "Sierra", layers: ["L1", "L6", "L8"], volume: "Fortress", verdict: "Strong", verdictColor: "hsl(var(--verdict-fortified))", impact: "$4.5B ↑" },
                { name: "Harvey AI", layers: ["L1", "L3", "L6", "L8"], volume: "Fortress", verdict: "Strong", verdictColor: "hsl(var(--verdict-fortified))", impact: "$1.5B ↑" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-4 text-foreground font-semibold">{row.name}</td>
                  <td className="py-4">
                    <div className="flex gap-1.5">
                      {row.layers.map((l) => {
                        const n = parseInt(l.replace("L", ""));
                        return (
                          <span key={l} className="font-sketch text-sm font-bold px-2 py-0.5 rounded-md" style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}>
                            {l}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-4 text-muted-foreground text-sm">{row.volume}</td>
                  <td className="py-4">
                    <span className="font-sketch text-sm font-bold" style={{ color: row.verdictColor }}>
                      {row.verdict}
                    </span>
                  </td>
                  <td className="py-4 text-muted-foreground text-sm">{row.impact}</td>
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
          One company, one structural analysis, one verdict. Every week.
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