import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";
import { ArrowRight } from "lucide-react";

const FEATURED_SLUGS = [
  "jasper-vs-chatgpt-grammarly",
  "chegg-collapse",
  "gamma-thin-layer-graveyard",
];

const featured = CASE_STUDIES.filter((s) => FEATURED_SLUGS.includes(s.slug));
const remaining = CASE_STUDIES.filter((s) => !FEATURED_SLUGS.includes(s.slug));

const AnalysisPage = () => (
  <SiteLayout>
    {/* Hero */}
    <section className="bg-navy">
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">
            Structural Analysis
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
            Case Studies Through the Lens of the Stack
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            Real companies. Real valuations. Real collapses. Every case analyzed through the 8 layers,
            the Intelligence Cube™, and the Three Structural Laws.
          </p>

          {/* Impact stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: "$50B+", label: "Market cap destroyed" },
              { value: "9", label: "Companies analyzed" },
              { value: "99%", label: "Worst single collapse" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-black text-indigo">{stat.value}</p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Featured case studies — full width cards */}
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-8">
          Featured Case Studies
        </p>
        <div className="space-y-8">
          {featured.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} featured />
          ))}
        </div>
      </div>
    </section>

    {/* Remaining case studies — grid */}
    <section className="bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-8">
          More Analysis
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remaining.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Structural Scoreboard */}
    <section className="bg-navy">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">
          The Structural Scoreboard
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-10">
          Where Do They All Sit?
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-white/40">Company</th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-white/40">Layers</th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-white/40">Cube Volume</th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-white/40">Verdict</th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-white/40">Valuation Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Chegg", layers: ["L6"], volume: "Thin sliver", verdict: "Dead", verdictColor: "hsl(0 84% 60%)", impact: "$12B → $120M (−99%)" },
                { name: "Jasper", layers: ["L7"], volume: "Thin sliver", verdict: "Collapsed", verdictColor: "hsl(0 84% 60%)", impact: "$1.5B → ~$300M (−80%)" },
                { name: "Gamma", layers: ["L7"], volume: "Thin sliver", verdict: "At risk", verdictColor: "hsl(48 96% 53%)", impact: "$2.1B → Fragile" },
                { name: "Stability AI", layers: ["L2"], volume: "Open + thin", verdict: "Collapsed", verdictColor: "hsl(0 84% 60%)", impact: "$1B → ~$80M (−92%)" },
                { name: "Stack Overflow", layers: ["L1", "L6"], volume: "Narrow", verdict: "Declining", verdictColor: "hsl(48 96% 53%)", impact: "Traffic −45%" },
                { name: "ZoomInfo", layers: ["L1", "L7"], volume: "UI-heavy", verdict: "Pressured", verdictColor: "hsl(48 96% 53%)", impact: "$24B → $5B (−79%)" },
                { name: "Grammarly", layers: ["L1", "L6", "L8"], volume: "Deep", verdict: "Durable", verdictColor: "hsl(160 84% 39%)", impact: "Stable at $13B" },
                { name: "Apollo.io", layers: ["L1"], volume: "Data refinery", verdict: "Safe", verdictColor: "hsl(160 84% 39%)", impact: "Growing" },
                { name: "Sierra", layers: ["L1", "L6", "L8"], volume: "Fortress", verdict: "Strong", verdictColor: "hsl(160 84% 39%)", impact: "$4.5B ↑" },
                { name: "Harvey AI", layers: ["L1", "L3", "L6", "L8"], volume: "Fortress", verdict: "Strong", verdictColor: "hsl(160 84% 39%)", impact: "$1.5B ↑" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 text-white font-semibold">{row.name}</td>
                  <td className="py-4">
                    <div className="flex gap-1.5">
                      {row.layers.map((l) => {
                        const n = parseInt(l.replace("L", ""));
                        return (
                          <span
                            key={l}
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg) / 0.2)` }}
                          >
                            {l}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-4 text-white/60 text-xs">{row.volume}</td>
                  <td className="py-4">
                    <span className="text-xs font-bold uppercase" style={{ color: row.verdictColor }}>
                      {row.verdict}
                    </span>
                  </td>
                  <td className="py-4 text-white/60 text-xs">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Newsletter CTA */}
    <section className="bg-card border-t border-border">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Get the weekly case study</h2>
        <p className="text-muted-foreground text-sm mb-6">
          One company, one structural analysis, one verdict. Every week.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Coming soon!"); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@company.com"
            required
            className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50"
          />
          <button type="submit" className="px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </SiteLayout>
);

export default AnalysisPage;
