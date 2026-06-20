import ExportablePng from "@/components/ExportablePng";

interface Surface {
  name: string;
  openness: number; // 0 = closed (proprietary) → 100 = open (commodity)
  gates: number;    // 0 = no gates → 100 = high trust gates (regulated)
  memory: number;   // bubble radius driver (0-100)
  color: string;
}

const SURFACES: Surface[] = [
  { name: "Email",       openness: 95, gates: 5,  memory: 15, color: "hsl(207 44% 49%)" },
  { name: "ChatGPT",     openness: 75, gates: 15, memory: 45, color: "hsl(221 44% 41%)" },
  { name: "Slack",       openness: 45, gates: 35, memory: 70, color: "hsl(146 50% 36%)" },
  { name: "QuickBooks",  openness: 20, gates: 75, memory: 80, color: "hsl(25 75% 47%)" },
  { name: "Salesforce",  openness: 30, gates: 65, memory: 85, color: "hsl(177 70% 41%)" },
  { name: "Bloomberg",   openness: 10, gates: 90, memory: 90, color: "hsl(273 51% 48%)" },
  { name: "Epic",        openness: 5,  gates: 95, memory: 95, color: "hsl(336 56% 44%)" },
];

const OpenVsClosedPoster = () => {
  // SVG coords: 0,0 top-left. X = openness (left=closed=0, right=open=100).
  // Y = gates (top=high=100, bottom=low=0). Invert openness so closed→left.
  const W = 560;
  const H = 440;
  const PAD = 56;

  const x = (op: number) => PAD + (op / 100) * (W - 2 * PAD);
  const y = (g: number) => H - PAD - (g / 100) * (H - 2 * PAD);
  const r = (m: number) => 10 + (m / 100) * 22;

  return (
    <ExportablePng
      fileName="scoi-open-vs-closed-surfaces"
      caption="Open vs Closed Surfaces"
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
        <div className="mb-6 border-b border-foreground/15 pb-4">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            The Moat Quadrant
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-1 font-bold">
            Open vs Closed Surfaces.
          </h2>
          <p className="text-[12px] md:text-sm text-muted-foreground mt-2">
            Plot a surface by openness, gate density, and memory depth. The top-left is where AI cannot easily reach.
          </p>
        </div>

        {/* Chart */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
              {/* Background quadrant tint */}
              <rect
                x={PAD}
                y={PAD}
                width={(W - 2 * PAD) / 2}
                height={(H - 2 * PAD) / 2}
                fill="hsl(var(--accent) / 0.08)"
              />
              <text
                x={PAD + 12}
                y={PAD + 22}
                fontSize="10"
                fill="hsl(var(--accent))"
                letterSpacing="0.18em"
                fontWeight="700"
              >
                MOAT ZONE
              </text>

              {/* Axes */}
              <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="hsl(var(--foreground) / 0.3)" strokeWidth="1" />
              <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="hsl(var(--foreground) / 0.3)" strokeWidth="1" />

              {/* Axis labels */}
              <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" letterSpacing="0.18em">
                ← CLOSED · OPENNESS · OPEN →
              </text>
              <text
                x={18}
                y={H / 2}
                textAnchor="middle"
                fontSize="11"
                fill="hsl(var(--muted-foreground))"
                letterSpacing="0.18em"
                transform={`rotate(-90 18 ${H / 2})`}
              >
                ← LOW · GATE DENSITY · HIGH →
              </text>

              {/* Bubbles */}
              {SURFACES.map((s) => (
                <g key={s.name}>
                  <circle
                    cx={x(s.openness)}
                    cy={y(s.gates)}
                    r={r(s.memory)}
                    fill={s.color}
                    opacity="0.78"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x(s.openness)}
                    y={y(s.gates) + r(s.memory) + 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="hsl(var(--foreground))"
                  >
                    {s.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="md:w-[200px] flex flex-col gap-3">
            <div
              className="p-3 rounded-md"
              style={{ background: "hsl(40 25% 99%)", border: "1px solid hsl(var(--foreground) / 0.1)" }}
            >
              <p className="font-mono-marker text-[10px] tracking-[0.18em] uppercase font-bold text-accent mb-1.5">
                Read The Map
              </p>
              <ul className="text-[11px] text-foreground/80 leading-snug space-y-1.5">
                <li>● <b>X</b>, how open the data/API is</li>
                <li>● <b>Y</b>, how many trust gates protect it</li>
                <li>● <b>Size</b>, depth of accumulated memory</li>
              </ul>
            </div>
            <div
              className="p-3 rounded-md"
              style={{ background: "hsl(var(--accent) / 0.08)", border: "1px solid hsl(var(--accent) / 0.3)" }}
            >
              <p className="font-display text-[13px] font-bold text-foreground leading-tight">
                The top-left big bubbles are where AI cannot legally, technically, or commercially compete.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Open is cheap. Closed is durable. Gated + closed + memory-rich is uncopyable.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default OpenVsClosedPoster;
