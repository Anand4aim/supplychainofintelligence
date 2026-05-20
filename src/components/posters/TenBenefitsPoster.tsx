import ExportablePng from "@/components/ExportablePng";

const BENEFITS = [
  { n: "01", t: "A Common Language", d: "Replaces vague words — 'agentic', 'wrapper', 'AI-native' — with layer-level precision." },
  { n: "02", t: "Predicts Who Gets Absorbed", d: "Law I: surface-only products become features inside the model layer below them." },
  { n: "03", t: "Names the Bottleneck", d: "Law II: durable value sits at the scarce layer — data, trust, distribution, memory." },
  { n: "04", t: "Decodes 'Agent'", d: "An agent is not a layer. It is L5 + L7 (+L8) packaging. Decode it; never quote it." },
  { n: "05", t: "Separates Surface From Chain", d: "Beautiful UIs capture attention. Deep chains capture power. The framework draws the line." },
  { n: "06", t: "Shows Where Intelligence Compounds", d: "L1 → L8 is gravity-fed downward, value-fed upward. Memory (L8) is the strongest moat." },
  { n: "07", t: "Maps Trust to a Layer", d: "L3 is not a feature — it is a structural gate that the model layer cannot legally cross." },
  { n: "08", t: "Forces an Honest Moat Conversation", d: "Founders, investors, PMs ask: 'which layers do we actually own?' No more hand-waving." },
  { n: "09", t: "Replaces Hype With Diagnosis", d: "Every announcement maps to a layer. Every threat maps to a law. Every category maps to an archetype." },
  { n: "10", t: "Shifts From Generation To Accumulation", d: "Most AI thinking optimizes for output. The framework optimizes for what persists." },
];

const TenBenefitsPoster = () => {
  return (
    <ExportablePng
      fileName="scoi-ten-benefits"
      caption="10 Benefits of the Framework"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto px-7 md:px-10 py-10 md:py-12"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-8 md:mb-10 border-b border-foreground/15 pb-5">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            Why The Framework Exists
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-2 font-bold">
            10 things you cannot say<br className="hidden md:block" /> without the Supply Chain of Intelligence™.
          </h2>
        </div>

        {/* 2 col grid of benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {BENEFITS.map((b) => (
            <div key={b.n} className="flex gap-3 md:gap-4">
              <div
                className="font-mono-marker text-[18px] md:text-[22px] font-bold leading-none pt-0.5 flex-shrink-0"
                style={{ color: "hsl(var(--accent))" }}
              >
                {b.n}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[15px] md:text-[17px] font-bold text-foreground leading-tight">
                  {b.t}
                </h3>
                <p className="text-[12px] md:text-[13px] text-muted-foreground mt-1 leading-snug">
                  {b.d}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Vague words let weak strategy hide. The framework forces it into the light.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default TenBenefitsPoster;
