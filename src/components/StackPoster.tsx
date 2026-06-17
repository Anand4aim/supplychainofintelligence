import { LAYERS, layerColor } from "@/data/layers";
import ExportablePng from "@/components/ExportablePng";

/**
 * StackPoster — 1:1 square hero artifact showing all 10 layers as chips
 * with the canonical tagline. Designed to be downloaded and posted to
 * LinkedIn / X as the cold-scroll hook. Reads from src/data/layers.ts
 * so it can never drift from the framework.
 */
const StackPoster = () => {
  // Reverse so L8 (Memory) is at the top, L-1 (Resources) at the bottom —
  // matches the "stack" mental model on /stack and /framework.
  const ordered = [...LAYERS].reverse();

  return (
    <ExportablePng
      fileName="scoi-stack-poster"
      caption="The 10-Layer Stack"
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="relative aspect-square w-full max-w-[640px] mx-auto p-6 md:p-8 flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        {/* Header */}
        <div className="mb-4 md:mb-5">
          <p className="font-mono-marker text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            The Supply Chain of Intelligence™ <span style={{ textTransform: 'none' }}>(SCoI)</span>
          </p>
          <h2 className="font-display text-xl md:text-2xl leading-tight text-foreground mt-1">
            The 10 layers of the generative AI stack.
          </h2>
        </div>

        {/* Layer chips stack */}
        <div className="flex-1 flex flex-col gap-[6px] md:gap-2 min-h-0">
          {ordered.map((layer) => {
            const c = layerColor(layer.id);
            return (
              <div
                key={layer.id}
                className="flex items-center gap-3 rounded-md px-3 py-2 md:px-3.5 md:py-2.5 flex-1 min-h-0"
                style={{
                  background: `${c.replace(")", " / 0.10)")}`,
                  borderLeft: `4px solid ${c}`,
                }}
              >
                <span
                  className="font-mono-marker text-[11px] md:text-[13px] font-bold tracking-wider w-9 md:w-10 flex-shrink-0"
                  style={{ color: c }}
                >
                  {layer.id}
                </span>
                <span className="font-display text-sm md:text-base text-foreground truncate">
                  {layer.name}
                </span>
                <span className="ml-auto font-sketch text-[10px] md:text-xs text-muted-foreground truncate hidden sm:inline">
                  {layer.shortName !== layer.name ? layer.shortName : ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-5 pt-3 border-t border-foreground/10 flex items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            Not logistics. The generative AI stack.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default StackPoster;
