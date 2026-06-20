import ExportablePng from "@/components/ExportablePng";

/**
 * Thematic poster for investors to share alongside their own diligence POV posts.
 * The "rent vs. own" lens across the 10 layers, what compounds, what commoditizes,
 * and the five questions every AI deal memo should answer.
 */

const ROWS = [
  { id: "L8", name: "Memory", verdict: "Compounds", side: "own", note: "The final moat" },
  { id: "L7", name: "Surface", verdict: "Commoditizes", side: "rent", note: "Doorway, not moat" },
  { id: "L6", name: "Orchestration", verdict: "Becomes a feature", side: "rent", note: "Absorbed by L2" },
  { id: "L5", name: "Execution", verdict: "Durable if deep", side: "own", note: "Domain > generic" },
  { id: "L4", name: "Access", verdict: "Load-bearing", side: "own", note: "Pipes the agents ride" },
  { id: "L3", name: "Gates", verdict: "Structurally permanent", side: "own", note: "Law IV protects it" },
  { id: "L2", name: "Models", verdict: "Winner-take-most", side: "rent", note: "Commodity risk" },
  { id: "L1", name: "Data", verdict: "Defensible if proprietary", side: "own", note: "L1b/c/d compound" },
  { id: "L0", name: "Infrastructure", verdict: "Shovel sellers win", side: "own", note: "NVIDIA, fabs, DCs" },
  { id: "L-1", name: "Resources", verdict: "Slow, scarce, real", side: "own", note: "Power & water" },
];

const QUESTIONS = [
  "Which two layers does this company actually own?",
  "What does the L2 roadmap make free in 18 months?",
  "Where does proprietary data come from, structurally?",
  "What compounds the longer customers stay?",
  "If a 'gate' exists above it, who owns the gate?",
];

const InvestorLensPoster = () => {
  const INK = "#0F172A";
  const PAPER = "#F1E9D8";
  const GOLD = "#C9A84C";
  const RED = "#B85042";
  const MUTED = "#94A3B8";

  return (
    <ExportablePng
      fileName="scoi-investor-lens"
      caption="The Investor's Lens"
      exportBackground={INK}
    >
      <div
        className="w-full mx-auto px-8 md:px-12 py-10 md:py-14"
        style={{ background: INK, color: PAPER, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase mb-2"
            style={{ color: GOLD, letterSpacing: "0.28em" }}
          >
            For Investors
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.6vw, 52px)",
              color: PAPER,
            }}
          >
            Rent or own? <span style={{ color: GOLD }}>A 10-layer diligence map.</span>
          </h2>
          <p className="text-[12px] md:text-sm mt-3 max-w-2xl" style={{ color: "#CBD5E1" }}>
            Every AI cap-table claim collapses to one question, which layers does this company
            structurally <em>own</em>, and which is it merely renting from the layer below?
          </p>
        </div>

        {/* Layer table */}
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-3 md:gap-x-5 gap-y-1.5 md:gap-y-2 mb-8">
          <div className="text-[9px] md:text-[10px] font-bold uppercase pb-2" style={{ color: GOLD, letterSpacing: "0.18em" }}>Layer</div>
          <div className="text-[9px] md:text-[10px] font-bold uppercase pb-2" style={{ color: GOLD, letterSpacing: "0.18em" }}>Structural Verdict</div>
          <div className="text-[9px] md:text-[10px] font-bold uppercase pb-2 text-center" style={{ color: GOLD, letterSpacing: "0.18em" }}>R / O</div>
          <div className="text-[9px] md:text-[10px] font-bold uppercase pb-2" style={{ color: GOLD, letterSpacing: "0.18em" }}>Why</div>

          {ROWS.map((r) => {
            const isOwn = r.side === "own";
            return (
              <div key={r.id} className="contents">
                <div
                  className="font-bold py-1.5"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: PAPER,
                    fontSize: "13px",
                  }}
                >
                  {r.id} <span style={{ color: MUTED, fontWeight: 400 }}>· {r.name}</span>
                </div>
                <div
                  className="text-[12px] md:text-[13px] py-1.5"
                  style={{ color: "#E2E8F0", fontFamily: "'Playfair Display', serif" }}
                >
                  {r.verdict}
                </div>
                <div className="py-1.5 text-center">
                  <span
                    className="inline-block px-2 py-0.5 text-[10px] font-bold rounded"
                    style={{
                      background: isOwn ? GOLD : "rgba(184,80,66,0.18)",
                      color: isOwn ? INK : RED,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {isOwn ? "OWN" : "RENT"}
                  </span>
                </div>
                <div className="text-[11px] md:text-[12px] py-1.5 italic" style={{ color: MUTED }}>
                  {r.note}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5 questions */}
        <div className="p-5 md:p-6 rounded-md" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[10px] md:text-[11px] font-bold uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.22em" }}>
            Five questions for the next deal memo
          </p>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {QUESTIONS.map((q, i) => (
              <li
                key={i}
                className="text-[12px] md:text-[14px] leading-snug flex gap-2"
                style={{ color: "#E2E8F0", fontFamily: "'Playfair Display', serif" }}
              >
                <span style={{ color: GOLD, fontWeight: 700 }}>{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 flex flex-wrap items-baseline justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-[11px] italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            The Supply Chain of Intelligence™, the 10 layers of the generative AI stack.
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase"
            style={{ color: MUTED, letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default InvestorLensPoster;
