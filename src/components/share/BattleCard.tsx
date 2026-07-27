import { LAYER_SHORT_LABEL, layerColor } from "@/data/layers";
import ExportablePng from "@/components/ExportablePng";

const LAYER_ORDER = ["L-1", "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];

export interface BattleSide {
  name: string;
  reason: string;
}

export interface BattleCardProps {
  title: string;
  date?: string;
  /** layer id -> 0..4 impact. Highest scoring layers are read as "the move". */
  intensities?: Record<string, number>;
  /** Optional per-layer notes; the top layer note becomes the move caption. */
  notes?: Record<string, string>;
  /** Who gains ground. */
  wins?: BattleSide[];
  /** Who is under pressure. */
  loses?: BattleSide[];
  /** One-line counter-move summary (e.g. the counter-thesis). */
  counter?: string | null;
  shape?: "wide" | "square";
  fileName: string;
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/**
 * BattleCard, the "who moves where" share image.
 *
 * Reads the same layer scoring the article uses and renders it as a
 * territory map: the layers being taken, who gains, who is under pressure,
 * and the expected counter-move.
 */
const BattleCard = ({
  title,
  date,
  intensities = {},
  notes = {},
  wins = [],
  loses = [],
  counter,
  shape = "wide",
  fileName,
}: BattleCardProps) => {
  const square = shape === "square";
  const contested = LAYER_ORDER.filter((l) => (intensities[l] ?? 0) >= 2);
  const topLayers = [...contested]
    .sort((a, b) => (intensities[b] ?? 0) - (intensities[a] ?? 0))
    .slice(0, 3);
  const moveNote = topLayers.map((l) => notes[l]).find(Boolean);

  const Column = ({
    label,
    color,
    rows,
    empty,
  }: {
    label: string;
    color: string;
    rows: BattleSide[];
    empty: string;
  }) => (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div
        className="font-mono-marker text-[8px] md:text-[10px] tracking-[0.18em] uppercase px-2 py-1 text-white mb-2 self-start shrink-0 whitespace-nowrap"
        style={{ background: color }}
      >
        {label}
      </div>
      {rows.length === 0 ? (
        <p className="font-sketch text-[11px] md:text-[13px] text-muted-foreground italic">{empty}</p>
      ) : (
        <ul className="space-y-1.5 md:space-y-2 overflow-hidden">
          {rows.slice(0, 2).map((r, i) => (
            <li key={i} className="leading-[1.25]">
              <span className="font-display font-bold text-foreground text-[12px] md:text-[15px]">
                {r.name}
              </span>
              <span className="font-body text-foreground/70 text-[10px] md:text-[12.5px]">
                {" "}
                — {clip(r.reason, square ? 60 : 74)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <ExportablePng fileName={fileName} caption="Battle card" exportBackground="hsl(40 30% 97%)">
      <div
        className={`relative w-full mx-auto flex flex-col ${
          square ? "aspect-square max-w-[600px] p-6 md:p-8" : "aspect-[1200/800] max-w-[820px] p-6 md:p-9"
        }`}
        style={{
          background: "linear-gradient(150deg, hsl(40 30% 97%) 0%, hsl(38 26% 93%) 100%)",
          border: "1.5px solid hsl(25 12% 82%)",
        }}
      >
        {/* Header */}
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono-marker text-[9px] md:text-[11px] tracking-[0.22em] uppercase text-accent">
            Supply Chain of Intelligence™ · Battle Card
          </p>
          {date && (
            <p className="font-mono-marker text-[8px] md:text-[10px] tracking-[0.14em] uppercase text-muted-foreground shrink-0">
              {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          )}
        </div>

        <h2
          className={`font-display font-bold text-foreground leading-[1.08] mt-2 md:mt-3 ${
            square ? "text-[20px] md:text-[26px]" : "text-[19px] md:text-[27px]"
          }`}
        >
          {clip(title, square ? 84 : 92)}
        </h2>

        {/* Territory strip: which layers the move takes */}
        <div className="mt-2.5 md:mt-3 shrink-0">
          <div className="flex items-end gap-[3px] md:gap-1.5" aria-hidden>
            {LAYER_ORDER.map((l) => {
              const v = intensities[l] ?? 0;
              const taken = v >= 2;
              return (
                <div key={l} className="flex-1 flex flex-col items-center gap-[3px]">
                  <div
                    className="w-full"
                    style={{
                      height: square ? 20 : 16,
                      background: layerColor(l),
                      opacity: taken ? 1 : 0.14,
                    }}
                  />
                  <span
                    className="font-mono-marker text-[7px] md:text-[9px] tracking-wide leading-none"
                    style={{ color: taken ? layerColor(l) : "hsl(25 8% 62%)", fontWeight: taken ? 700 : 400 }}
                  >
                    {l}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="font-sketch text-[10px] md:text-[12px] text-muted-foreground mt-1.5">
            Territory taken:{" "}
            <span className="text-foreground font-semibold">
              {topLayers.length ? topLayers.map((l) => `${l} ${LAYER_SHORT_LABEL[l] ?? ""}`).join(" · ") : "—"}
            </span>
            {moveNote && <span className="hidden md:inline"> — {clip(moveNote, 84)}</span>}
          </p>
        </div>

        {/* Two columns: who gains, who is exposed */}
        <div
          className={`mt-3 flex ${square ? "flex-col gap-3" : "gap-6 md:gap-8"} flex-1 min-h-0 overflow-hidden`}
        >
          <Column
            label="Gains ground"
            color="hsl(var(--verdict-fortified))"
            rows={wins}
            empty="No clear beneficiary yet."
          />
          <Column
            label="Under pressure"
            color="hsl(var(--verdict-exposed))"
            rows={loses}
            empty="No incumbent clearly exposed."
          />
        </div>


        {/* Counter-move footer */}
        <div className="mt-2 shrink-0 pt-2.5 md:pt-3 border-t border-foreground/10 flex items-end justify-between gap-4">
          <p
            className={`font-body text-foreground/80 leading-snug ${square ? "text-[10.5px]" : "text-[11px] md:text-[13px]"}`}
            style={{ borderLeft: "3px solid hsl(0 65% 48%)", paddingLeft: 10 }}
          >
            <span className="font-mono-marker text-[8px] md:text-[9.5px] tracking-[0.16em] uppercase text-muted-foreground block mb-0.5">
              Expected counter-move
            </span>
            {counter ? clip(counter, square ? 120 : 150) : "Defend the layer below: proprietary outcome data and the verification boundary."}
          </p>
          <p className="font-mono-marker text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60 shrink-0 text-right">
            Anand Arivukkarasu
            <br />
            supplychainofai.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default BattleCard;
