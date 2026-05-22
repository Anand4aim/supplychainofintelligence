import { LAYERS, layerColor } from "@/data/layers";
import { Link } from "react-router-dom";

/**
 * IntelligenceGrid — the canonical 10×5 grid of the Supply Chain of Intelligence.
 * Two modes:
 *   - "blank":  pure framework template. Anyone can screenshot, print, mark up.
 *   - "audit":  per-sublayer depth dots (0–5) overlaid for a specific company.
 *               Cells stay desaturated so the dots — not the colors — carry the signal.
 *
 * Strategic note: this is the single most shareable artifact on the site. Whether
 * blank or filled, it must read in 3 seconds at 1024px and survive a screenshot.
 */
export type SublayerDepth = Record<string, number>; // sublayer id -> 0..5

interface Props {
  mode?: "blank" | "audit";
  /** Required when mode === "audit". Sublayer id ("L1b") -> 0..5 dot count. */
  sublayerDepth?: SublayerDepth;
  /** Optional title shown above the grid (e.g. company name in audit). */
  title?: string;
  subtitle?: string;
  /** When true, cells link to their sublayer detail anchor. Off inside ExportablePng. */
  interactive?: boolean;
  /** Footer caption. Defaults vary by mode. */
  caption?: string;
  className?: string;
}

const inner = (id: string) => (id === "L-1" ? "neg1" : id.replace("L", ""));

const DepthDots = ({ count, color }: { count: number; color: string }) => {
  // Five always-rendered slots so layout never shifts. Filled = score.
  return (
    <div className="flex items-center gap-[3px] mt-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-colors"
          style={{
            background: i <= count ? color : "hsl(var(--foreground) / 0.12)",
          }}
          aria-hidden
        />
      ))}
    </div>
  );
};

const IntelligenceGrid = ({
  mode = "blank",
  sublayerDepth = {},
  title,
  subtitle,
  interactive = false,
  caption,
  className = "",
}: Props) => {
  const ordered = [...LAYERS].reverse(); // L8 on top → L-1 on bottom

  const defaultCaption =
    mode === "audit"
      ? "Self-mapped from user-provided inputs + public footprint. Not verified. Not an endorsement."
      : "Print it. Mark it up. Map your own — or any company you cover.";

  return (
    <div
      className={`w-full mx-auto p-5 md:p-6 ${className}`}
      style={{
        background:
          "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-foreground/15 pb-3 flex-wrap">
        <div className="min-w-0">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            {mode === "audit" ? "Where they play — and where they don't" : "The Supply Chain of Intelligence™"}
          </p>
          <h3 className="font-display text-xl md:text-2xl leading-tight text-foreground mt-1">
            {title ?? "The 10 layers × 50 sublayers of the generative AI stack."}
          </h3>
          {subtitle && (
            <p className="font-sketch text-xs md:text-sm italic text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="hidden md:block text-right shrink-0">
          <p className="font-mono-marker text-[9px] tracking-[0.18em] uppercase text-foreground/60">
            {mode === "audit" ? "0–5 dots = depth in that sublayer" : "Blank template · SCoAI"}
          </p>
          <p className="font-sketch text-[11px] italic text-muted-foreground mt-0.5">
            Not logistics. The AI stack.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-[5px]">
        {ordered.map((layer) => {
          const c = layerColor(layer.id);
          return (
            <div
              key={layer.id}
              className="grid grid-cols-[96px_1fr] md:grid-cols-[130px_1fr] gap-[5px] items-stretch"
            >
              {/* Layer chip — keeps its full saturated color. The chip is the legend. */}
              <div
                className="rounded-md px-2.5 py-2 flex flex-col justify-center"
                style={{ background: c }}
              >
                <div className="font-mono-marker text-white text-[11px] md:text-[12px] font-bold tracking-wider leading-none">
                  {layer.id === "L-1" ? "L−1" : layer.id}
                </div>
                <div className="font-display text-white text-[12px] md:text-[13px] leading-tight mt-0.5">
                  {layer.shortName}
                </div>
              </div>

              {/* 5 sublayer cells — very low tint so dots dominate */}
              <div className="grid grid-cols-5 gap-[5px]">
                {layer.sublayers.slice(0, 5).map((s) => {
                  const tintAlpha = mode === "audit" ? 0.06 : 0.10;
                  const bg = `hsl(var(--layer-${inner(layer.id)}) / ${tintAlpha})`;
                  const borderCol = `hsl(var(--layer-${inner(layer.id)}) / 0.22)`;
                  const depth = sublayerDepth[s.id] ?? 0;

                  const cellInner = (
                    <>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono-marker text-[9px] md:text-[10px] tracking-wider font-bold text-foreground/70">
                          {s.id}
                        </span>
                        {s.defensible && <span className="text-accent text-[9px]">★</span>}
                      </div>
                      <div className="font-display text-foreground text-[10.5px] md:text-[11.5px] leading-[1.15] mt-0.5 line-clamp-2">
                        {s.name}
                      </div>
                      {mode === "audit" && <DepthDots count={depth} color={c} />}
                    </>
                  );

                  const className =
                    "rounded-md px-2 py-1.5 flex flex-col justify-between min-w-0 border";

                  return interactive ? (
                    <Link
                      key={s.id}
                      to={`/framework#${layer.id}`}
                      className={`${className} hover:bg-foreground/[0.03] transition-colors`}
                      style={{ background: bg, borderColor: borderCol, minHeight: 58 }}
                      title={`${s.id} ${s.name}${mode === "audit" ? ` — depth ${depth}/5` : ""}`}
                    >
                      {cellInner}
                    </Link>
                  ) : (
                    <div
                      key={s.id}
                      className={className}
                      style={{ background: bg, borderColor: borderCol, minHeight: 58 }}
                      title={`${s.id} ${s.name}${mode === "audit" ? ` — depth ${depth}/5` : ""}`}
                    >
                      {cellInner}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
          {caption ?? defaultCaption}
        </p>
        <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
          SupplyChainOfAI.com
        </p>
      </div>
    </div>
  );
};

export default IntelligenceGrid;
