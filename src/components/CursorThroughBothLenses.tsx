import { Link } from "react-router-dom";
import Eyebrow from "@/components/Eyebrow";
import LayerTag from "@/components/LayerTag";
import CopySnippet from "@/components/CopySnippet";
import { ArrowRight } from "lucide-react";

/**
 * The killer demo. Cursor seen through the AI Stack lens vs. through
 * Supply Chain of Intelligence — same company, two very different
 * resolutions. Shipped on Home, /framework Map intro, and /not-a-stack.
 *
 * The point isn't "Cursor is good." The point is the framework gives
 * you 10× the surface area to reason about defensibility on the same
 * facts.
 */

const SCOI_POINTS: Array<{ id: string; label: string; note: string }> = [
  { id: "L7", label: "Surface",       note: "Owns the IDE — the daily writing surface." },
  { id: "L6", label: "Orchestration", note: "Agent loop, multi-file edits, human-in-loop." },
  { id: "L5", label: "Execution",     note: "Code-aware indexing & retrieval as a domain skill." },
  { id: "L8", label: "Memory",        note: "Project memory compounds per repo and per team." },
  { id: "L1", label: "Data",          note: "Outcome data — accepted edits — feeds the loop." },
];

const SCOI_VERDICTS = [
  "Flywheel: every accepted edit improves retrieval and the next suggestion.",
  "Platform risk: model is the only commodity in the stack.",
  "Defensibility: 4 owned layers reinforce each other.",
];

const SNIPPET = `Cursor through two lenses.

AI Stack: "Application." Done.

Supply Chain of Intelligence:
• L7 Surface — owns the IDE.
• L6 Orchestration — agent loop, multi-file edits.
• L5 Execution — code-aware retrieval.
• L8 Memory — project memory compounds per repo.
• L1 Data — accepted edits feed the loop.

Flywheel + 4 owned layers. The model is the only commodity in the stack.
That's the difference between a category and a map.`;

interface Props {
  className?: string;
  /** Path passed to CopySnippet for attribution. */
  path?: string;
}

const CursorThroughBothLenses = ({ className = "", path }: Props) => {
  return (
    <section className={`bg-background ${className}`} aria-label="Cursor through both lenses">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl mb-8">
          <Eyebrow tone="accent" className="mb-3">Same company. Two lenses.</Eyebrow>
          <h2 className="font-display text-[26px] md:text-[34px] font-bold text-foreground leading-tight mb-3">
            Where Cursor sits, through two frameworks.
          </h2>
          <p className="text-foreground/80 text-[15px] md:text-[16px] leading-relaxed">
            Same company, same facts. The AI stack gives you one word. The Supply Chain of Intelligence gives you a map — and an answer to the only question that matters: <em>is this defensible?</em>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-6">
          {/* AI Stack column — single word */}
          <div className="rounded-xl border border-foreground/10 bg-card p-6 md:p-7 flex flex-col">
            <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              Through the AI Stack
            </p>
            <div className="flex-1 flex flex-col items-start justify-center py-6">
              <p className="font-display text-[42px] md:text-[56px] font-bold text-foreground/85 leading-none mb-2">
                Application.
              </p>
              <p className="font-mono-marker text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                · Done ·
              </p>
            </div>
            <p className="text-[13px] text-muted-foreground italic border-t border-foreground/10 pt-4 mt-4">
              Categorization. No verdict. No mechanism. No flywheel.
            </p>
          </div>

          {/* SCoI column — 5 layers + verdicts */}
          <div className="rounded-xl border border-accent/40 bg-card p-6 md:p-7">
            <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-accent mb-4">
              Through the Supply Chain of Intelligence™
            </p>
            <ul className="space-y-2.5 mb-5">
              {SCOI_POINTS.map((p) => (
                <li key={p.id} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
                  <LayerTag id={p.id} />
                  <span className="text-[14px] md:text-[15px] text-foreground/85 leading-snug">
                    <span className="font-semibold text-foreground">{p.label}:</span> {p.note}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-foreground/10 pt-4 space-y-1.5">
              {SCOI_VERDICTS.map((v) => (
                <p key={v} className="text-[13px] md:text-[14px] text-foreground/85 leading-snug">
                  → {v}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="font-display italic text-[15px] text-foreground/80">
            One word vs. a map. That's the difference between a category and a strategy.
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <CopySnippet text={SNIPPET} path={path} label="Copy comparison" />
            <Link
              to="/not-a-stack"
              className="font-mono-marker text-[11px] tracking-[0.16em] uppercase text-accent inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Why this isn't another stack <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CursorThroughBothLenses;
