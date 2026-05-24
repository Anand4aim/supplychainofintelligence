import { layerVar } from "@/data/layers";

/**
 * LogoTile — hand-built monogram tile (Option A from plan v3 §5).
 *
 * Renders a company as a Playfair monogram + Inter wordmark, with a 4px
 * top stripe in the layer's color. Used everywhere we'd reach for a real
 * logo: Three-Layer Proof on Home, Triangle vertices on /framework,
 * Archetypes row, Contrast row.
 *
 * Why monograms (not real SVG logos):
 *   - No trademark gray area for a published thought-leadership site
 *   - No external runtime dependency / dead-link risk on logo CDNs
 *   - The layer-color stripe IS the framework, visible — Sierra (L8) and
 *     Harvey (L5) look like different objects because they live on
 *     different layers. A real logo flattens that.
 */

interface LogoTileProps {
  name: string;
  layer?: string; // e.g. "L1", "L5", "L8" — drives the stripe color
  caption?: string; // optional one-liner under the wordmark
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE = {
  sm: { tile: "p-3", mono: "text-[36px]", word: "text-[10px]", cap: "text-[10px] mt-2" },
  md: { tile: "p-4", mono: "text-[48px]", word: "text-[11px]", cap: "text-[11px] mt-2.5" },
  lg: { tile: "p-5", mono: "text-[64px]", word: "text-[12px]", cap: "text-[12px] mt-3" },
};

const LogoTile = ({ name, layer, caption, size = "md", className = "" }: LogoTileProps) => {
  const s = SIZE[size];
  const stripe = layer ? `hsl(${layerVar(layer)})` : "hsl(var(--border))";
  const monogram = name.charAt(0).toUpperCase();

  return (
    <div
      className={`relative rounded-lg border border-border bg-card overflow-hidden ${s.tile} ${className}`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: stripe }}
        aria-hidden
      />
      {layer && (
        <span
          className="absolute top-2 right-2.5 font-mono-marker text-[9px] tracking-[0.14em] font-bold"
          style={{ color: stripe }}
        >
          {layer}
        </span>
      )}
      <div className="flex flex-col items-center text-center pt-2">
        <span
          aria-hidden
          className={`font-display font-bold leading-none text-foreground ${s.mono}`}
        >
          {monogram}
        </span>
        <span
          className={`font-mono-marker tracking-[0.14em] uppercase font-semibold text-foreground/85 mt-2 ${s.word}`}
        >
          {name}
        </span>
        {caption && (
          <span className={`text-muted-foreground leading-snug ${s.cap}`}>
            {caption}
          </span>
        )}
      </div>
    </div>
  );
};

export default LogoTile;
