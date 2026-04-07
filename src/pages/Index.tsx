import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, ArrowDown, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { LAYERS, GOLD_KEY_INSIGHT } from "@/data/layers";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/data/caseStudies";

const jasperStudy = CASE_STUDIES.find((s) => s.slug === "jasper-vs-chatgpt-grammarly")!;

const Index = () => {
  return (
    <SiteLayout>
      {/* ═══════ HERO: Show the machine, not just the slogan ═══════ */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo blur-[140px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-5">
              A structural framework by Anand Arivukkarasu
            </p>
            <h1 className="font-display text-3xl md:text-[44px] lg:text-5xl font-bold text-white leading-[1.15] mb-5">
              AI is reorganizing software into a new supply chain.{" "}
              <span className="text-indigo">Most companies only own one layer.</span>
            </h1>
            <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-2xl mb-4">
              The Supply Chain of Intelligence™ maps the 9 layers and 32+ sublayers that determine 
              who captures value, who becomes infrastructure, and who gets dissolved.
            </p>
            <p className="text-sm text-white/35 mb-8">
              For product leaders, founders, and investors trying to understand where AI actually captures value.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition"
              >
                Explore the Full Framework <ArrowRight size={16} />
              </Link>
              <Link
                to="/analysis"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/70 text-sm font-medium rounded-md hover:bg-white/5 transition"
              >
                See Case Studies
              </Link>
            </div>
          </motion.div>

          {/* Immediate proof: the gold analogy strip L0→L8 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-14"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-white/25 mb-4">
              The Gold Supply Chain — From Shovels to the Ring on Your Finger
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[140px]"
                  style={{
                    background: `hsl(${layer.bg} / 0.1)`,
                    borderLeft: `3px solid hsl(${layer.color})`,
                  }}
                >
                  <span className="text-base">{layer.goldIcon}</span>
                  <div className="min-w-0">
                    <span
                      className="text-[10px] font-bold block"
                      style={{ color: `hsl(${layer.color})` }}
                    >
                      {layer.id}
                    </span>
                    <span className="text-[10px] text-white/50 block truncate">{layer.shortName}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 2: Why This Is a Supply Chain ═══════ */}
      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              Why We Call It a Supply Chain
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight">
              From Gold in the Ground to the Ring on Your Finger
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Every layer transforms the output of the layer below it. Raw ore (L1) is useless without 
              refining (L2). Refined gold is useless without transport (L4). A skilled jeweler (L5) is 
              useless without a storefront (L7). And none of it compounds without record-keeping (L8).
            </p>

            <div className="border-l-4 border-indigo/40 bg-muted/50 rounded-r-lg p-5">
              <p className="text-sm text-foreground leading-relaxed italic">
                "{GOLD_KEY_INSIGHT}"
              </p>
              <p className="mt-2 text-xs text-muted-foreground font-medium">— The Supply Chain of Intelligence™</p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
              {LAYERS.slice(0, 9).map((layer) => (
                <div
                  key={layer.id}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 bg-card border border-border"
                >
                  <span className="text-lg">{layer.goldIcon}</span>
                  <div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: `hsl(${layer.color})` }}
                    >
                      {layer.id}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1.5">{layer.goldTitle.split("—")[0].split("&")[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 3: The Map at a Glance — FULL visible map ═══════ */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-3">
              The Map at a Glance
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              9 Layers. 32+ Sublayers. ★ = Defensible.
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              This is not a metaphor. It is a structural map. The filled markers (★) show where defensibility actually sits.
            </p>
          </div>

          <div className="space-y-1">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <div
                  className="rounded-lg overflow-hidden border border-border bg-background"
                  style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${layer.color})` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Layer ID */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 md:min-w-[180px] md:flex-col md:justify-center md:items-center md:py-4"
                      style={{ background: `hsl(${layer.bg} / 0.4)` }}
                    >
                      <span className="text-xl">{layer.goldIcon}</span>
                      <div className="flex items-baseline gap-2 md:flex-col md:items-center md:gap-0">
                        <span
                          className="font-display text-lg font-bold"
                          style={{ color: `hsl(${layer.color})` }}
                        >
                          {layer.id}
                        </span>
                        <span className="text-xs text-muted-foreground">{layer.name}</span>
                      </div>
                    </div>

                    {/* Sublayers grid */}
                    <div className="flex-1 p-3 md:p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {layer.sublayers.map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs"
                            style={{
                              background: sub.defensible
                                ? `hsl(${layer.bg} / 0.7)`
                                : `hsl(${layer.bg} / 0.2)`,
                              border: sub.defensible
                                ? `1px solid hsl(${layer.color} / 0.3)`
                                : "1px solid transparent",
                            }}
                          >
                            <span
                              className="font-bold whitespace-nowrap"
                              style={{ color: `hsl(${layer.color})` }}
                            >
                              {sub.id}{sub.defensible ? " ★" : ""}
                            </span>
                            <span className="text-foreground font-medium">{sub.name}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2 italic">{layer.verdict}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Defensible Triangle callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-navy rounded-xl p-6 md:p-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-indigo mb-3">
              The Defensible Triangle
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "L1b ★", name: "Proprietary Data", note: "Data behind enterprise walls", layer: 1 },
                { id: "L5b/c/d ★", name: "Deep Skills & Playbooks", note: "Encoded expertise", layer: 5 },
                { id: "L8c/d ★", name: "Compounding Memory", note: "Gets smarter every day", layer: 8 },
              ].map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded inline-block mb-2"
                    style={{
                      color: `hsl(var(--layer-${item.layer}))`,
                      background: `hsl(var(--layer-${item.layer}-bg) / 0.2)`,
                    }}
                  >
                    {item.id}
                  </span>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/40 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/35 mt-4 italic">
              Own all three → fortress. Own none → graveyard. Most companies own one.
            </p>
          </motion.div>

          <div className="mt-6 text-center">
            <Link
              to="/framework"
              className="inline-flex items-center gap-2 text-sm text-indigo font-medium hover:gap-3 transition-all"
            >
              Deep-dive into each layer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4: Proof — Before/After Case ═══════ */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-3">
            Proof: The Framework in Action
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Same Market. Three Structural Positions. Three Different Fates.
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Jasper, ChatGPT, and Grammarly all competed in "AI writing." The difference isn't product-market fit — it's stack position.
          </p>

          {/* Before/After comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                name: "Jasper",
                logo: "https://logo.clearbit.com/jasper.ai",
                position: "L7a only — thin wrapper",
                fate: "Collapsed",
                fateColor: "hsl(0 84% 60%)",
                detail: "$1.5B → ~$300M. No data, no memory, no moat. Just a prompt template on someone else's model.",
                layers: ["L7"],
              },
              {
                name: "Grammarly",
                logo: "https://logo.clearbit.com/grammarly.com",
                position: "L4 + L5 + L7 + emerging L8",
                fate: "Thriving",
                fateColor: "hsl(160 84% 39%)",
                detail: "Stable at $13B. Owns your writing patterns, team voice, deep integrations. Memory compounds.",
                layers: ["L4", "L5", "L7", "L8"],
              },
              {
                name: "ChatGPT",
                logo: "https://logo.clearbit.com/openai.com",
                position: "L2 + L7 — owns the smelter",
                fate: "Dominant",
                fateColor: "hsl(243 75% 59%)",
                detail: "Owns the model layer. Can give the surface away for free because the model IS the moat.",
                layers: ["L2", "L7"],
              },
            ].map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div>
                    <p className="font-body text-sm font-bold text-foreground">{company.name}</p>
                    <p className="text-[10px] font-bold uppercase" style={{ color: company.fateColor }}>
                      {company.fate}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">{company.position}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{company.detail}</p>
                <div className="flex gap-1.5">
                  {company.layers.map((l) => {
                    const n = parseInt(l.replace("L", ""));
                    return (
                      <span
                        key={l}
                        className="text-[9px] font-bold px-2 py-0.5 rounded"
                        style={{ color: `hsl(var(--layer-${n}))`, background: `hsl(var(--layer-${n}-bg))` }}
                      >
                        {l}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 text-sm text-indigo font-medium hover:gap-3 transition-all"
            >
              See all 9 case studies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5: Self-Diagnostic ═══════ */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-indigo mb-4">
              The Diagnostic
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5">
              Where Do You Sit in the Stack?
            </h2>
            <div className="text-left max-w-lg mx-auto space-y-4 mb-8">
              {[
                "What layer do you think you own?",
                "What sublayer is actually defensible?",
                "What happens if L7 becomes free?",
                "Are you rising by gravity — or trying to climb down too late?",
                "Do you own any part of the Defensible Triangle?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-indigo font-bold text-sm mt-0.5">{i + 1}.</span>
                  <p className="text-white/60 text-sm leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/speaking"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition"
              >
                Book a Workshop <ArrowRight size={16} />
              </Link>
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/70 text-sm font-medium rounded-md hover:bg-white/5 transition"
              >
                Study the Framework
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 6: Newsletter — earned, not leading ═══════ */}
      <section id="newsletter" className="bg-card border-t border-border">
        <div className="max-w-xl mx-auto px-6 py-14 text-center">
          <BookOpen className="mx-auto mb-3 text-indigo" size={28} />
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Weekly Structural Analysis
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            One company analyzed through the 9 layers. Every week. Free.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter signup will be connected soon! Thanks for your interest.");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              placeholder="you@company.com"
              required
              className="flex-1 px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo text-white text-sm font-semibold rounded-md hover:opacity-90 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
