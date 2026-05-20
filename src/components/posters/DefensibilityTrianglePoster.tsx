import ExportablePng from "@/components/ExportablePng";
import { layerColor } from "@/data/layers";

/**
 * The defensibility triangle: L1b (data) × L3 (trust) × L8 (memory).
 * Own two = defensible. Own three = uncopyable.
 */
const DefensibilityTrianglePoster = () => {
  const c1 = layerColor("L1");
  const c3 = layerColor("L3");
  const c8 = layerColor("L8");

  return (
    <ExportablePng
      fileName="scoi-defensibility-triangle"
      caption="The Defensibility Triangle"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto aspect-square max-w-[720px] px-7 md:px-10 py-10 md:py-12 flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            Where Moats Live
          </p>
          <h2 className="font-display text-xl md:text-[28px] leading-[1.1] text-foreground mt-1 font-bold">
            The Defensibility Triangle.
          </h2>
          <p className="text-[12px] md:text-sm text-muted-foreground mt-1">
            Own two corners = defensible. Own three = uncopyable.
          </p>
        </div>

        {/* Triangle SVG */}
        <div className="flex-1 flex items-center justify-center relative">
          <svg viewBox="0 0 600 520" className="w-full h-full max-h-[420px]">
            {/* Triangle stroke */}
            <polygon
              points="300,40 560,480 40,480"
              fill="hsl(40 25% 99%)"
              stroke="hsl(var(--foreground) / 0.2)"
              strokeWidth="1.5"
              strokeDasharray="6 5"
            />
            {/* Center label */}
            <text
              x="300"
              y="320"
              textAnchor="middle"
              className="font-sketch"
              fontSize="20"
              fill="hsl(var(--muted-foreground))"
              fontStyle="italic"
            >
              uncopyable
            </text>
            <text
              x="300"
              y="345"
              textAnchor="middle"
              fontSize="13"
              fill="hsl(var(--muted-foreground))"
              letterSpacing="0.18em"
            >
              ALL THREE
            </text>

            {/* Top vertex — L1b */}
            <circle cx="300" cy="40" r="56" fill={c1} />
            <text x="300" y="36" textAnchor="middle" fontSize="22" fontWeight="700" fill="white" fontFamily="'JetBrains Mono', monospace">
              L1b
            </text>
            <text x="300" y="58" textAnchor="middle" fontSize="11" fill="white" opacity="0.95">
              PROPRIETARY DATA
            </text>

            {/* Bottom-right — L3 */}
            <circle cx="560" cy="480" r="56" fill={c3} />
            <text x="560" y="476" textAnchor="middle" fontSize="22" fontWeight="700" fill="white" fontFamily="'JetBrains Mono', monospace">
              L3
            </text>
            <text x="560" y="498" textAnchor="middle" fontSize="11" fill="white" opacity="0.95">
              TRUST GATES
            </text>

            {/* Bottom-left — L8 */}
            <circle cx="40" cy="480" r="56" fill={c8} />
            <text x="40" y="476" textAnchor="middle" fontSize="22" fontWeight="700" fill="white" fontFamily="'JetBrains Mono', monospace">
              L8
            </text>
            <text x="40" y="498" textAnchor="middle" fontSize="11" fill="white" opacity="0.95">
              MEMORY
            </text>

            {/* Edge labels */}
            <text x="160" y="260" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground) / 0.7)" transform="rotate(-60 160 260)" letterSpacing="0.12em">
              DATA × MEMORY
            </text>
            <text x="440" y="260" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground) / 0.7)" transform="rotate(60 440 260)" letterSpacing="0.12em">
              DATA × TRUST
            </text>
            <text x="300" y="500" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground) / 0.7)" letterSpacing="0.12em">
              TRUST × MEMORY
            </text>
          </svg>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-3 border-t border-foreground/15 flex items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            The model layer can replicate the surface. It cannot replicate your data, your trust, or your memory.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60 whitespace-nowrap">
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default DefensibilityTrianglePoster;
