import { LAYER_SHORT_LABEL, layerColor } from "@/data/layers";
import { verdictLabel } from "@/data/verdictLabels";
import ExportablePng from "@/components/ExportablePng";

const LAYER_ORDER = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

export interface ShareHeroProps {
  /** Small uppercase kicker, e.g. "Live Analysis" or "Essay". */
  eyebrow: string;
  title: string;
  subtitle?: string | null;
  /** ISO date string. */
  date?: string;
  /** Optional verdict token, rendered as a pill. */
  verdict?: string | null;
  /** layer id -> 0..4 impact. Drives the signature bar strip. */
  intensities?: Record<string, number>;
  /** Aspect: LinkedIn link/article ratio, or square for the feed. */
  shape?: "wide" | "square";
  fileName: string;
}

const verdictBg = (v: string) => {
  switch (v.toUpperCase()) {
    case "DEAD":
    case "EXPOSED":
    case "DOOMED":
      return "hsl(var(--verdict-exposed))";
    case "CONTESTED":
      return "hsl(var(--verdict-consolidating))";
    case "SAFE":
      return "hsl(var(--verdict-fortified))";
    case "DOMINANT":
      return "hsl(var(--verdict-dominant))";
    default:
      return "hsl(25 15% 20%)";
  }
};

/**
 * ShareHero, the per-article LinkedIn image.
 *
 * Rendered from framework data (never AI art) so every share is instantly
 * recognizable as SCoI: headline + the 10-layer impact bar strip + verdict.
 */
const ShareHero = ({
  eyebrow,
  title,
  subtitle,
  date,
  verdict,
  intensities = {},
  shape = "wide",
  fileName,
}: ShareHeroProps) => {
  const square = shape === "square";
  const maxI = Math.max(1, ...LAYER_ORDER.map((l) => intensities[l] ?? 0));
  const hasBars = LAYER_ORDER.some((l) => (intensities[l] ?? 0) > 0);

  return (
    <ExportablePng
      fileName={fileName}
      caption={eyebrow}
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className={`relative w-full mx-auto flex flex-col ${
          square ? "aspect-square max-w-[600px] p-7 md:p-9" : "aspect-[1200/627] max-w-[820px] p-7 md:p-10"
        }`}
        style={{
          background: "linear-gradient(150deg, hsl(40 30% 97%) 0%, hsl(38 26% 93%) 100%)",
          border: "1.5px solid hsl(25 12% 82%)",
        }}
      >
        {/* Header */}
        <div className="flex items-baseline justify-between gap-4 mb-auto">
          <p className="font-mono-marker text-[9px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            Supply Chain of Intelligence™ · {eyebrow}
          </p>
          {date && (
            <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-muted-foreground shrink-0">
              {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          )}
        </div>

        {/* Headline block */}
        <div className={square ? "py-5" : "py-4"}>
          <h2
            className={`font-display font-bold text-foreground leading-[1.1] ${
              square ? "text-[26px] md:text-[34px]" : "text-[24px] md:text-[36px]"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`font-sketch text-foreground/75 leading-snug mt-3 pl-3 ${
                square ? "text-[15px] md:text-[18px]" : "text-[14px] md:text-[17px]"
              }`}
              style={{ fontWeight: 500, borderLeft: "3px solid hsl(0 65% 48%)" }}
            >
              {subtitle.length > 180 ? `${subtitle.slice(0, 177)}…` : subtitle}
            </p>
          )}
        </div>

        {/* Signature: 10-layer impact strip */}
        <div className="mt-auto">
          {hasBars && (
            <div className="flex items-end gap-[3px] md:gap-1.5 mb-3" aria-hidden>
              {LAYER_ORDER.map((l) => {
                const v = intensities[l] ?? 0;
                const h = 14 + (v / maxI) * (square ? 66 : 54);
                return (
                  <div key={l} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-[2px]"
                      style={{
                        height: `${h}px`,
                        background: layerColor(l),
                        opacity: v > 0 ? 1 : 0.18,
                      }}
                    />
                    <span
                      className="font-mono-marker text-[7px] md:text-[9px] tracking-wide"
                      style={{ color: v > 0 ? layerColor(l) : "hsl(25 8% 62%)" }}
                    >
                      {l}
                    </span>
                    <span className="font-sketch text-[7px] md:text-[9px] text-muted-foreground leading-none truncate w-full text-center hidden md:block">
                      {LAYER_SHORT_LABEL[l] ?? ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-foreground/10">
            {verdict ? (
              <span
                className="font-mono-marker text-[9px] md:text-[11px] tracking-[0.16em] uppercase px-2.5 py-1 text-white"
                style={{ background: verdictBg(verdict) }}
              >
                {verdictLabel(verdict)}
              </span>
            ) : (
              <span className="font-sketch text-[11px] md:text-[13px] text-muted-foreground italic">
                Not logistics. The generative AI stack.
              </span>
            )}
            <p className="font-mono-marker text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
              Anand Arivukkarasu · supplychainofai.com
            </p>
          </div>
        </div>
      </div>
    </ExportablePng>
  );
};

export default ShareHero;
