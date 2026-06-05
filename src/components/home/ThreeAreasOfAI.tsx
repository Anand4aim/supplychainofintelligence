import Eyebrow from "@/components/Eyebrow";

/**
 * ThreeAreasOfAI — cold-open slide 1.
 *
 * Scope-setter for first-time readers. AI is transforming three things;
 * this site is about one of them (Core Product). Disarms the
 * "what about copilots / RPA / data?" objection in 10 seconds.
 *
 * Visual: three concentric rings, Core Product highlighted as the
 * innermost — the hardest, most defensible, least talked-about area.
 */

const AREAS = [
  {
    n: "01",
    title: "Internal Operations",
    line: "Copilots, RPA, productivity. Cost out.",
    sub: "Real ROI. Rarely a moat.",
  },
  {
    n: "02",
    title: "Distribution & GTM",
    line: "AI in marketing, sales, support. Reach up.",
    sub: "Easier wins. Easier to copy.",
  },
  {
    n: "03",
    title: "Core Product",
    line: "AI inside what you sell. The product itself becomes intelligent.",
    sub: "Hardest. Most defensible. This site is about this.",
    highlight: true,
  },
] as const;

const ThreeAreasOfAI = () => (
  <section
    aria-label="Three areas where AI transformation happens"
    className="bg-background border-y border-foreground/10"
  >
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <div className="max-w-3xl mb-10">
        <Eyebrow tone="accent" className="mb-3">Where AI Transformation Happens · 01</Eyebrow>
        <h2 className="font-display text-[26px] md:text-[36px] font-bold text-foreground leading-[1.15]">
          AI is transforming three things.{" "}
          <span className="text-accent">This framework is about one of them.</span>
        </h2>
        <p className="text-foreground/75 mt-3 text-[15px] md:text-[16px] leading-relaxed">
          Most AI roadmaps confuse the three. They are not the same problem,
          they do not have the same defensibility, and they should not be
          scored the same way.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {AREAS.map((a) => (
          <li
            key={a.n}
            className={`relative p-6 rounded-xl border transition-all ${
              a.highlight
                ? "border-accent bg-accent/5 md:scale-[1.02] shadow-[0_8px_30px_-12px_hsl(var(--accent)/0.35)]"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-mono-marker text-[11px] tracking-[0.18em] text-muted-foreground">
                {a.n}
              </span>
              {a.highlight && (
                <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
                  You are here
                </span>
              )}
            </div>
            <h3 className="font-display text-[19px] md:text-[21px] font-bold text-foreground leading-snug mb-2">
              {a.title}
            </h3>
            <p className="text-[14.5px] text-foreground/80 leading-relaxed mb-3">
              {a.line}
            </p>
            <p
              className={`font-sketch text-[14px] italic ${
                a.highlight ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {a.sub}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-[13.5px] md:text-[14px] text-muted-foreground leading-relaxed max-w-3xl">
        The Supply Chain of Intelligence™ is a framework for{" "}
        <span className="text-foreground font-semibold">area 03 — Core Product</span>.
        It does not score your internal copilots or your marketing automation.
        It scores whether the AI <em>inside what you sell</em> is defensible.
      </p>
    </div>
  </section>
);

export default ThreeAreasOfAI;
