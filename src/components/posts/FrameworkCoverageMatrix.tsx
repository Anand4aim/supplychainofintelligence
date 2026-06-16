import { Check, Minus, Circle } from "lucide-react";

// Honest coverage matrix: which framework actually answers which strategic question
// an AI product leader, founder, or investor needs to answer in 2026.
//
// Scores are deliberately conservative for SCOI in places where the other
// frameworks genuinely win (e.g. JTBD on user outcomes). The point is to
// show coverage shape, not declare a champion in every cell.

type Score = "full" | "partial" | "none";

const QUESTIONS = [
  "Why does the user hire this product?",
  "Which layer of the AI stack do we actually own?",
  "What gets compressed by the next model release?",
  "Where does the moat compound over time?",
  "How does demand aggregate on the internet?",
  "How does the technology evolve from custom to commodity?",
  "What are the regulatory, safety & trust gates?",
  "What is the structural position vs. platforms (OpenAI, Anthropic)?",
];

const FRAMEWORKS = [
  { name: "Supply Chain of Intelligence™", short: "SCOI", lens: "Stack & Intelligence" },
  { name: "Jobs to be Done", short: "JTBD", lens: "User / Outcome" },
  { name: "Wardley Mapping", short: "Wardley", lens: "Evolution / Strategy" },
  { name: "Aggregation Theory", short: "Aggregation", lens: "Demand / Distribution" },
  { name: "AI TRiSM (Gartner)", short: "TRiSM", lens: "Risk / Governance" },
];

// Rows × cols matrix of scores. Order matches QUESTIONS × FRAMEWORKS.
const MATRIX: Score[][] = [
  // Why hire?
  ["partial", "full",    "none",    "partial", "none"   ],
  // Which layer do we own?
  ["full",    "none",    "partial", "none",    "none"   ],
  // What gets compressed?
  ["full",    "none",    "partial", "partial", "none"   ],
  // Where does the moat compound?
  ["full",    "partial", "partial", "full",    "none"   ],
  // Demand aggregation?
  ["partial", "none",    "none",    "full",    "none"   ],
  // Tech evolution custom→commodity?
  ["partial", "none",    "full",    "none",    "none"   ],
  // Regulatory / trust gates?
  ["full",    "none",    "none",    "none",    "full"   ],
  // Position vs. platforms?
  ["full",    "none",    "partial", "full",    "none"   ],
];

const cell = (s: Score) => {
  if (s === "full") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/15 border border-accent/50"
        title="Directly answers this question"
      >
        <Check size={14} className="text-accent" strokeWidth={3} />
      </span>
    );
  }
  if (s === "partial") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-foreground/5 border border-foreground/20"
        title="Touches it, but not the framework's primary job"
      >
        <Circle size={8} className="text-foreground/60" fill="currentColor" />
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full"
      title="Not in scope"
    >
      <Minus size={12} className="text-foreground/25" />
    </span>
  );
};

const FrameworkCoverageMatrix = () => {
  return (
    <div className="not-prose my-10 border border-foreground/15 rounded-md bg-card overflow-hidden">
      <div className="px-5 md:px-6 py-4 border-b border-foreground/10 bg-secondary/40">
        <p className="font-mono-marker text-[10px] uppercase tracking-[0.18em] text-accent mb-1">
          Coverage matrix · 8 questions × 5 frameworks
        </p>
        <p className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
          What each framework actually answers.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: "640px" }}>
          <thead>
            <tr className="border-b border-foreground/10">
              <th className="text-left px-4 py-3 font-mono-marker text-[10px] uppercase tracking-wider text-muted-foreground font-normal">
                Strategic question
              </th>
              {FRAMEWORKS.map((f) => (
                <th
                  key={f.short}
                  className="px-2 py-3 text-center font-mono-marker text-[10px] uppercase tracking-wider font-normal align-bottom"
                >
                  <div className="text-foreground font-semibold">{f.short}</div>
                  <div className="text-muted-foreground/80 normal-case font-normal italic mt-0.5">
                    {f.lens}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QUESTIONS.map((q, rowIdx) => (
              <tr
                key={q}
                className="border-b border-foreground/5 last:border-b-0 hover:bg-secondary/30"
              >
                <td className="px-4 py-3 text-foreground/90 leading-snug">{q}</td>
                {MATRIX[rowIdx].map((score, colIdx) => (
                  <td key={colIdx} className="px-2 py-3 text-center">
                    {cell(score)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 md:px-6 py-3 border-t border-foreground/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Check size={12} className="text-accent" strokeWidth={3} />
          Primary answer
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Circle size={6} className="text-foreground/60" fill="currentColor" />
          Touches it
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Minus size={10} className="text-foreground/40" />
          Out of scope
        </span>
        <span className="ml-auto italic">
          SCOI is the only framework purpose-built for the generative-AI stack.
        </span>
      </div>
    </div>
  );
};

export default FrameworkCoverageMatrix;
