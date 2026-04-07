import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, Layers, Box, Scale, BookOpen, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { LAYERS } from "@/data/layers";

const STATS = [
  { value: "$1T+", label: "SaaS market cap erased Feb 2026" },
  { value: "<10%", label: "Enterprises with agents in production" },
  { value: "70%", label: "Will abandon seat-based pricing by 2028" },
  { value: "9", label: "Structural layers that determine survival" },
];

const Index = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full blur-[100px]" style={{ background: "hsl(var(--layer-7))" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Message */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">
                  A Framework by Anand Arivukkarasu
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                  You've mastered the customer.{" "}
                  <span className="text-indigo">Now master the stack</span> — or watch your product dissolve.
                </h1>
                <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-8">
                  SaaS doesn't die — it dissolves into 9 structural layers (L0–L8). The Supply Chain of Intelligence™
                  maps where AI companies live, compete, and die. Three laws predict who survives.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/framework"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition"
                  >
                    Explore the Framework <ArrowRight size={18} />
                  </Link>
                  <a
                    href="#newsletter"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-md hover:bg-white/5 transition"
                  >
                    Subscribe to Analysis
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Layer Stack with sublayer hints */}
            <div className="hidden lg:block">
              <div className="space-y-1.5">
                {LAYERS.map((layer, i) => {
                  const defensibleCount = layer.sublayers.filter((s) => s.defensible).length;
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 backdrop-blur-sm"
                      style={{
                        background: `hsl(${layer.bg} / 0.12)`,
                        borderLeft: `4px solid hsl(${layer.color})`,
                      }}
                    >
                      <span
                        className="font-display text-base font-bold min-w-[28px]"
                        style={{ color: `hsl(${layer.color})` }}
                      >
                        {layer.id}
                      </span>
                      <span className="text-white font-medium text-sm flex-1">{layer.name}</span>
                      {/* Sublayer dots */}
                      <div className="flex gap-1 items-center">
                        {layer.sublayers.map((sub) => (
                          <div
                            key={sub.id}
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: sub.defensible
                                ? `hsl(${layer.color})`
                                : `hsl(${layer.color} / 0.25)`,
                            }}
                            title={`${sub.id} ${sub.name}${sub.defensible ? " ★" : ""}`}
                          />
                        ))}
                      </div>
                      {defensibleCount > 0 && (
                        <span className="text-[9px] font-bold text-white/30 min-w-[20px] text-right">
                          {defensibleCount}★
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-[10px] text-white/30 mt-3 text-center">
                32+ sub-layers · Filled dots = defensible positions (★)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-black text-indigo mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Thesis */}
      <section className="bg-card">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">The Core Thesis</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              SaaS Doesn't Die — It Dissolves & Evolves
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              The interface layer commoditizes. The intelligence layer gets automated. What remains is
              encoded expertise, proprietary data, and orchestration. Product leaders have mastered the
              vertical — understanding customer needs through JTBD. But in the AI era, you also need the
              depth axis: where in the intelligence stack are you playing?
            </p>
            <div className="border-l-4 border-indigo bg-secondary/50 rounded-r-lg p-6 text-left max-w-2xl mx-auto">
              <p className="font-display text-lg italic text-foreground leading-relaxed">
                "Great product leaders have mastered the Y-axis — customer depth. In the AI era, you also need
                the Z-axis — infrastructure depth — or you'll build something customers love today that gets
                commoditized tomorrow."
              </p>
              <p className="mt-3 text-sm text-muted-foreground font-medium">— Anand Arivukkarasu</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">The Intellectual Toolkit</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Three Instruments. One Framework.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers size={28} />,
                title: "The 9-Layer Stack",
                desc: "Every AI company maps to one or more structural layers (L0–L8), each with 3–5 sub-layers. Where you sit determines whether you survive — not your features, not your funding.",
                link: "/framework",
              },
              {
                icon: <Box size={28} />,
                title: "The Intelligence Cube™",
                desc: "8 Functions × 8 Verticals × 9 Layers. Volume in the cube equals structural durability. Thin slivers die. Tall fortresses survive.",
                link: "/framework#cube",
              },
              {
                icon: <Scale size={28} />,
                title: "Three Structural Laws",
                desc: "Not opinions. Structural forces that predict who wins, who dies, and where value migrates. They already predicted Chegg, Gamma, and more.",
                link: "/framework#laws",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={item.link} className="block group">
                  <div className="bg-card border border-border rounded-xl p-8 h-full hover:border-indigo/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center text-indigo mb-5">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm text-indigo font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Layer Stack */}
      <section className="lg:hidden bg-navy">
        <div className="max-w-xl mx-auto px-6 py-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">The 9 Layers (L0–L8)</p>
          <div className="space-y-2">
            {LAYERS.map((layer) => (
              <div
                key={layer.id}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{
                  background: `hsl(${layer.bg} / 0.12)`,
                  borderLeft: `4px solid hsl(${layer.color})`,
                }}
              >
                <span className="font-display text-base font-bold" style={{ color: `hsl(${layer.color})` }}>
                  {layer.id}
                </span>
                <span className="text-white text-sm font-medium flex-1">{layer.name}</span>
                <span className="text-[10px] text-white/30">{layer.sublayers.length} sub</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Analysis Preview */}
      <section className="bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-3">Latest Analysis</p>
              <h2 className="font-display text-3xl font-bold text-foreground">Through the Lens of the Stack</h2>
            </div>
            <Link to="/analysis" className="hidden md:inline-flex items-center gap-1 text-sm text-indigo font-medium hover:gap-2 transition-all">
              All articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "ARCHETYPE ANALYSIS",
                title: "Gamma at $2.1B: A Thin-Layer Graveyard Case Study",
                excerpt: "Presentation generation sits at L7a — a thin slice of the stack. Claude, Copilot, and Gemini now do it for free. Here's why Cube volume predicted this.",
                layers: ["L7"],
              },
              {
                tag: "THE GREAT UNWINDING",
                title: "Jasper vs ChatGPT vs Grammarly: Three Structural Fates",
                excerpt: "Same market. Three different structural positions. One dead, one surviving, one thriving. The difference isn't PMF — it's stack position.",
                layers: ["L6", "L7", "L8"],
              },
              {
                tag: "CASUALTY REPORT",
                title: "Chegg: $12B to 99% Collapse — Law III in Real Time",
                excerpt: "Generic content at L6a was the most commoditizable layer in the stack. ChatGPT didn't kill Chegg — structural inevitability did.",
                layers: ["L6"],
              },
            ].map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/analysis" className="block group">
                  <div className="bg-background border border-border rounded-xl p-6 h-full hover:border-indigo/30 hover:shadow-md transition-all">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-[2px] text-indigo mb-3">{article.tag}</p>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-indigo transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex gap-2">
                      {article.layers.map((l) => {
                        const layerNum = parseInt(l.replace("L", ""));
                        return (
                          <span
                            key={l}
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{
                              color: `hsl(var(--layer-${layerNum}))`,
                              background: `hsl(var(--layer-${layerNum}-bg))`,
                            }}
                          >
                            {l}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker CTA */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Mic className="mx-auto mb-6 text-indigo" size={36} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              "Where Do YOU Sit in the Stack?"
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
              Keynotes, workshops, and executive deep-dives. Map your company's structural position
              in the Intelligence Cube™ before the market forces it.
            </p>
            <Link
              to="/speaking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Speaking & Workshops <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="bg-card border-t border-border">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <BookOpen className="mx-auto mb-4 text-indigo" size={32} />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Weekly Structural Analysis
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Every week, one company analyzed through the lens of the 9 layers. Free. Unsubscribe anytime.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter signup will be connected soon! Thanks for your interest.");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@company.com"
              required
              className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Join 0 product leaders. No spam, ever.</p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
