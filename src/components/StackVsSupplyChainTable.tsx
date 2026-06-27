import ExportablePng from "@/components/ExportablePng";
import CopySnippet from "@/components/CopySnippet";
import Eyebrow from "@/components/Eyebrow";

/**
 * The category-reframe table. The single most-shared visual on the site.
 *
 * Don't attack the AI stack — reframe it. Each row contrasts an axis
 * where the two frameworks answer different questions. Renders inside
 * <ExportablePng> so anyone can download the PNG and paste it on
 * LinkedIn, plus a <CopySnippet> that ships the same comparison as
 * pre-formatted, attributed text.
 */

const ROWS: Array<{ axis: string; stack: string; scoi: string }> = [
  { axis: "Category",     stack: "AI Stack / AI Value Chain", scoi: "Industry-defining, macroeconomic AI Value Chain framework" },
  { axis: "Question",     stack: "How is AI built?",   scoi: "Where does value accrue?" },
  { axis: "Lens",         stack: "Architecture",       scoi: "Economics" },
  { axis: "Unit",         stack: "Components",         scoi: "Bottlenecks" },
  { axis: "Behavior",     stack: "Static layers",      scoi: "Dynamic system" },
  { axis: "Discipline",   stack: "Technology",         scoi: "Strategy" },
  { axis: "Audience",     stack: "Engineering",        scoi: "Investment & Product" },
  { axis: "Output",       stack: "Describes",          scoi: "Predicts" },
];

const SNIPPET = `The AI stack explains how intelligence is built. The Supply Chain of Intelligence explains where intelligence becomes economically defensible.

AI Stack → Architecture, components, static layers, describes.
Supply Chain of Intelligence → Economics, bottlenecks, dynamic system, predicts.

They answer different questions. The stack is one input to the supply chain — not its competitor.`;

interface Props {
  /** Optional path passed to CopySnippet for attribution. */
  path?: string;
  className?: string;
}

const StackVsSupplyChainTable = ({ path, className = "" }: Props) => {
  return (
    <div className={className}>
      <ExportablePng
        fileName="ai-stack-vs-supply-chain-of-intelligence"
        caption="AI Stack ⇄ Supply Chain of Intelligence — different questions, different answers"
      >
        <div className="rounded-xl border border-foreground/10 bg-card overflow-hidden">
          {/* Eyebrow + reframe sentence */}
          <div className="px-6 md:px-8 pt-7 md:pt-8 pb-5">
            <Eyebrow tone="accent" className="mb-3">Category reframe</Eyebrow>
            <h3 className="font-display text-[22px] md:text-[30px] font-bold text-foreground leading-[1.15] mb-3">
              Not another AI stack. A different question entirely.
            </h3>
            <p className="font-display text-[15px] md:text-[16px] text-foreground/85 leading-relaxed max-w-2xl border-l-2 border-accent pl-3">
              The AI stack explains <em>how intelligence is built</em>. The Supply Chain of Intelligence explains <em>where intelligence becomes economically defensible</em>.
            </p>
          </div>

          {/* Header */}
          <div className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] border-t border-foreground/10 bg-foreground/[0.03]">
            <div className="px-4 md:px-6 py-3 font-mono-marker text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Axis
            </div>
            <div className="px-4 md:px-6 py-3 font-mono-marker text-[10px] tracking-[0.2em] uppercase text-muted-foreground border-l border-foreground/10">
              AI Stack
            </div>
            <div className="px-4 md:px-6 py-3 font-mono-marker text-[10px] tracking-[0.2em] uppercase text-accent border-l border-foreground/10">
              Supply Chain of Intelligence™
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.axis}
              className={`grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] border-t border-foreground/10 ${
                i % 2 === 1 ? "bg-foreground/[0.015]" : ""
              }`}
            >
              <div className="px-4 md:px-6 py-3.5 font-mono-marker text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-muted-foreground self-center">
                {row.axis}
              </div>
              <div className="px-4 md:px-6 py-3.5 border-l border-foreground/10 text-[14px] md:text-[15px] text-foreground/75 self-center">
                {row.stack}
              </div>
              <div className="px-4 md:px-6 py-3.5 border-l border-foreground/10 text-[14px] md:text-[15px] font-semibold text-foreground self-center">
                {row.scoi}
              </div>
            </div>
          ))}

          {/* Footer line */}
          <div className="px-6 md:px-8 py-5 border-t border-foreground/10 bg-foreground/[0.02]">
            <p className="font-display italic text-[14px] md:text-[15px] text-foreground/80 leading-relaxed">
              The AI stack is one input to the Supply Chain of Intelligence — not its competitor.
            </p>
          </div>
        </div>
      </ExportablePng>

      <div className="mt-3 flex items-center justify-end">
        <CopySnippet text={SNIPPET} path={path} label="Copy reframe" />
      </div>
    </div>
  );
};

export default StackVsSupplyChainTable;
