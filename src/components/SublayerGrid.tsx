import { useState, useMemo } from "react";
import { LAYERS, SUBLAYER_LABEL, layerColor, layerVar } from "@/data/layers";
import { LEGAL_DOMAINS } from "@/data/verticals/legalDomains";

const LogoMark = ({ companyKey, name }: { companyKey: string; name: string }) => {
  const domain = LEGAL_DOMAINS[companyKey];
  const [failed, setFailed] = useState(!domain);
  const initial = name.charAt(0).toUpperCase();
  if (failed || !domain) {
    return (
      <span
        data-export-logo-fallback
        aria-hidden
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border border-foreground/20 bg-card text-[11px] font-display font-bold leading-none text-foreground shadow-sm"
      >
        {initial}
      </span>
    );
  }
  return (
    <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-foreground/20 bg-card shadow-sm">
      <span
        data-export-logo-fallback
        aria-hidden
        className="hidden h-5 w-5 items-center justify-center text-[11px] font-display font-bold leading-none text-foreground"
      >
        {initial}
      </span>
      <img
        data-export-logo-img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt=""
        aria-hidden
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-4 w-4 shrink-0 object-contain"
      />
    </span>
  );
};
import type { VerticalMapData, CompanyStage, VerticalCompany } from "@/data/verticals/legal";

const STAGE_LABEL: Record<CompanyStage | "all", string> = {
  all: "All",
  early: "Seed / Series A",
  growth: "Series B+ / Growth",
  exit: "Acquired / Exited",
};

const STAGE_COLOR: Record<CompanyStage, string> = {
  early: "hsl(var(--layer-5))",
  growth: "hsl(var(--layer-2))",
  exit: "hsl(var(--layer-8))",
};

const STATE_LABEL: Record<string, { text: string; cls: string }> = {
  scarce: { text: "Scarce → bought", cls: "bg-[hsl(var(--layer-1)/0.12)] text-[hsl(var(--layer-1))]" },
  open: { text: "Open & fundable", cls: "bg-[hsl(var(--layer-5)/0.12)] text-[hsl(var(--layer-5))]" },
  mid: { text: "Squeezed middle", cls: "bg-[hsl(var(--layer-6)/0.15)] text-[hsl(var(--layer-6))]" },
  contested: { text: "Most crowded", cls: "bg-[hsl(var(--layer-7)/0.12)] text-[hsl(var(--layer-7))]" },
};

const GAP_STYLE: Record<string, { bg: string; tag: string; label: string }> = {
  ws: { bg: "bg-[hsl(var(--layer-5)/0.08)] ring-1 ring-inset ring-[hsl(var(--layer-5)/0.35)]", tag: "text-[hsl(var(--layer-5))]", label: "Open" },
  feat: { bg: "bg-foreground/[0.03]", tag: "text-muted-foreground", label: "Feature" },
  horiz: { bg: "bg-foreground/[0.05]", tag: "text-muted-foreground/80", label: "Horizontal" },
};

const Chip = ({
  co,
  secondary,
  onClick,
  logoFirst,
}: {
  co: VerticalCompany;
  secondary?: boolean;
  onClick: () => void;
  logoFirst?: boolean;
}) => {
  if (logoFirst) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={`${co.name} — ${STAGE_LABEL[co.stage]}`}
        className={`relative inline-flex items-center justify-center rounded-md border transition-colors ${
          secondary
            ? "border-foreground/15 bg-background/60 opacity-80"
            : "border-foreground/25 bg-background hover:border-accent"
        }`}
        style={{
          width: 34,
          height: 34,
          borderBottom: `3px solid ${STAGE_COLOR[co.stage]}`,
        }}
      >
        <LogoMark companyKey={co.key} name={co.name} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-1.5 py-1 text-[10px] leading-tight rounded border transition-colors text-left ${
        secondary
          ? "border-foreground/15 bg-background/60 text-foreground/65 hover:text-foreground hover:border-foreground/30"
          : "border-foreground/25 bg-background text-foreground hover:border-accent"
      }`}
      style={{ borderLeftWidth: 3, borderLeftColor: STAGE_COLOR[co.stage] }}
      title={`${co.name} — ${STAGE_LABEL[co.stage]}`}
    >
      <LogoMark companyKey={co.key} name={co.name} />
      <span className="font-mono-marker tracking-wide truncate max-w-[92px]">{co.name}</span>
    </button>
  );
};

const Cell = ({
  sublayerId,
  layerId,
  data,
  onPick,
  logoFirst,
}: {
  sublayerId: string;
  layerId: string;
  data: VerticalMapData;
  onPick: (co: VerticalCompany) => void;
  logoFirst?: boolean;
}) => {
  const placement = data.placements.find((p) => p.id === sublayerId);
  const primary = placement?.primary ?? [];
  const secondary = placement?.secondary ?? [];
  const hot = primary.length + secondary.length > 0;
  const gap = !hot ? placement?.gap : undefined;
  const gapStyle = gap ? GAP_STYLE[gap.kind] : undefined;
  const isWhitespace = hot && placement?.whitespace;

  return (
    <div
      className={`border border-foreground/10 rounded-sm p-1.5 flex flex-col ${
        logoFirst ? "" : "min-h-[72px]"
      } ${hot ? "bg-background" : gapStyle?.bg ?? "bg-background/40"} ${
        isWhitespace ? "ring-1 ring-inset ring-[hsl(var(--layer-5)/0.5)]" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-1 mb-1">
        <span className="font-mono-marker text-[8.5px] tracking-wider text-muted-foreground/80">
          {sublayerId.toUpperCase()}
        </span>
        {isWhitespace && (
          <span className="font-mono-marker text-[8px] tracking-wider text-[hsl(var(--layer-5))]">
            ⌁ OPEN
          </span>
        )}
      </div>
      <div
        className={`leading-tight text-foreground/85 font-semibold mb-1.5 ${
          logoFirst ? "text-[9px]" : "text-[10px]"
        }`}
      >
        {SUBLAYER_LABEL[sublayerId] ?? sublayerId}
      </div>
      {hot ? (
        <div className={`flex flex-wrap mt-auto ${logoFirst ? "gap-1.5" : "gap-1"}`}>
          {primary.map((k) => {
            const co = data.companies[k];
            if (!co) return null;
            return <Chip key={`p-${k}`} co={co} onClick={() => onPick(co)} logoFirst={logoFirst} />;
          })}
          {secondary.map((k) => {
            const co = data.companies[k];
            if (!co) return null;
            return (
              <Chip key={`s-${k}`} co={co} secondary onClick={() => onPick(co)} logoFirst={logoFirst} />
            );
          })}
        </div>
      ) : gap ? (
        <div className={`leading-snug mt-auto ${gapStyle?.tag} ${logoFirst ? "text-[9px]" : "text-[9.5px]"}`}>
          {gap.note}
        </div>
      ) : null}
      <div
        className="h-[2px] -mx-1.5 -mb-1.5 mt-1.5 rounded-b-sm opacity-60"
        style={{ background: layerColor(layerId) }}
      />
    </div>
  );
};

interface Props {
  data: VerticalMapData;
  /** Compact mode: render only the 10×5 grid (no thesis/filter/legend/scorecard/whitespace/notes/modal). Used inside the shareable export card. */
  compact?: boolean;
  /** Optional list of layer IDs to omit (e.g. ["L-1","L0"] for share card). */
  hideLayers?: string[];
  /** Logo-first: render chips as logo-only square tiles (no company name). Used in export. */
  logoFirst?: boolean;
}

const SublayerGrid = ({ data, compact = false, hideLayers, logoFirst = false }: Props) => {
  const [stage, setStage] = useState<CompanyStage | "all">("all");
  const [picked, setPicked] = useState<VerticalCompany | null>(null);

  // Stage filter — hide companies whose stage doesn't match (kept simple: dim chips)
  const filtered = useMemo(() => {
    if (stage === "all") return data;
    const allow = (k: string) => data.companies[k]?.stage === stage;
    return {
      ...data,
      placements: data.placements.map((p) => ({
        ...p,
        primary: p.primary?.filter(allow),
        secondary: p.secondary?.filter(allow),
      })),
    };
  }, [data, stage]);

  const hidden = new Set(hideLayers ?? []);
  const orderedLayers = [...LAYERS].reverse().filter((l) => !hidden.has(l.id)); // L8 → L-1
  const generics = new Set(data.genericLayers.map((g) => g.id));

  return (
    <div className="space-y-4">
      {!compact && (
        <>

      <div
        className="rounded-md border-l-4 px-4 py-3 bg-card"
        style={{ borderLeftColor: "hsl(var(--brand-gold))" }}
      >
        <span className="font-mono-marker text-[10px] tracking-[0.15em] uppercase text-muted-foreground mr-2">
          Thesis
        </span>
        <span className="text-[13px] text-foreground leading-relaxed">{data.thesis}</span>
      </div>

      {/* Stage filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground mr-1">
          Filter by stage:
        </span>
        {(["all", "early", "growth", "exit"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s)}
            className={`px-2.5 py-1 text-[11px] font-mono-marker tracking-wide rounded border transition-colors ${
              stage === s
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/20 hover:border-foreground/50"
            }`}
          >
            {STAGE_LABEL[s]}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-muted-foreground">
        <span><b className="text-foreground">Solid</b> = primary layer · <b className="text-foreground">faded</b> = secondary</span>
        <span><span className="inline-block w-2 h-2 rounded-sm bg-[hsl(var(--layer-5)/0.4)] ring-1 ring-[hsl(var(--layer-5)/0.6)] mr-1" />Open whitespace</span>
        <span><span className="inline-block w-2 h-2 rounded-sm bg-foreground/[0.05] mr-1" />Feature (absorbed)</span>
        <span><span className="inline-block w-2 h-2 rounded-sm bg-foreground/[0.08] mr-1" />Horizontal (owned outside vertical)</span>
      </div>
        </>
      )}

      {/* 10×5 grid */}

      <div className={compact ? "" : "overflow-x-auto"}>
        <div className={compact ? "w-full" : "min-w-[820px]"}>
          {/* Header row */}
          <div className="grid grid-cols-[110px_repeat(5,1fr)] gap-1.5 mb-1.5">
            <div />
            {["A", "B", "C", "D", "E"].map((c) => (
              <div key={c} className="text-center font-mono-marker text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                · {c} ·
              </div>
            ))}
          </div>

          {orderedLayers.map((layer) => {
            const isGeneric = generics.has(layer.id);
            const genericNote = data.genericLayers.find((g) => g.id === layer.id)?.note;

            return (
              <div
                key={layer.id}
                className="grid grid-cols-[110px_repeat(5,1fr)] gap-1.5 mb-1.5 items-stretch"
              >
                <div
                  className="rounded-sm px-2 py-1.5 flex flex-col justify-center"
                  style={{
                    background: `hsl(${layerVar(layer.id)} / 0.12)`,
                    borderLeft: `3px solid ${layerColor(layer.id)}`,
                  }}
                >
                  <div
                    className="font-mono-marker text-[10px] tracking-wider"
                    style={{ color: layerColor(layer.id) }}
                  >
                    {layer.id}
                  </div>
                  <div className="font-display text-[13px] font-bold leading-tight text-foreground">
                    {layer.shortName}
                  </div>
                </div>

                {isGeneric ? (
                  <div
                    className="col-span-5 rounded-sm px-3 py-2 text-[11px] text-muted-foreground italic flex items-center"
                    style={{ background: `hsl(${layerVar(layer.id)} / 0.05)` }}
                  >
                    {genericNote}
                  </div>
                ) : (
                  layer.sublayers.map((sl) => (
                    <Cell
                      key={sl.id}
                      sublayerId={sl.id}
                      layerId={layer.id}
                      data={filtered}
                      onPick={setPicked}
                      logoFirst={logoFirst}
                    />
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!compact && (
        <>
      {/* Scorecard */}

      <div className="mt-6">
        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          Layer scorecard — contested vs. open
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="border-b border-foreground/20 text-left">
                <th className="py-1.5 pr-3 font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground">Sublayer</th>
                <th className="py-1.5 pr-3 font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground">AI-first occupants</th>
                <th className="py-1.5 font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground">State</th>
              </tr>
            </thead>
            <tbody>
              {data.scorecard.map((row) => (
                <tr key={row.sublayer} className="border-b border-foreground/10">
                  <td className="py-1.5 pr-3 font-semibold text-foreground whitespace-nowrap">{row.sublayer}</td>
                  <td className="py-1.5 pr-3 text-foreground/80">{row.occupants}</td>
                  <td className="py-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-marker tracking-wide ${STATE_LABEL[row.state].cls}`}>
                      {STATE_LABEL[row.state].text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Whitespace bets */}
      <div className="mt-6">
        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          Where the next winner comes from
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.whitespace.map((ws, i) => (
            <div
              key={i}
              className="rounded-sm border border-foreground/10 bg-[hsl(var(--layer-5)/0.05)] p-3"
            >
              <div className="font-display text-[13px] font-bold text-foreground mb-1">
                {i + 1} · {ws.title}
              </div>
              <div className="text-[12px] text-muted-foreground leading-snug">{ws.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground leading-snug pt-2 border-t border-foreground/10">
        {data.notes}
      </div>

      {/* Company detail panel */}
      {picked && (
        <div
          className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-end md:items-center md:justify-end p-0 md:p-6"
          onClick={() => setPicked(null)}
        >
          <div
            className="bg-background border border-foreground/15 rounded-t-md md:rounded-md w-full md:max-w-md max-h-[85vh] overflow-y-auto p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-mono-marker text-[10px] tracking-wider uppercase text-muted-foreground">
                  {picked.tier}
                </div>
                <h4 className="font-display text-2xl font-bold text-foreground">{picked.name}</h4>
                <span
                  className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono-marker tracking-wide text-background"
                  style={{ background: STAGE_COLOR[picked.stage] }}
                >
                  {STAGE_LABEL[picked.stage]}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-[13px] text-foreground/85 mt-3">{picked.focus}</p>
            <div className="mt-3">
              <div className="font-mono-marker text-[9px] tracking-wider uppercase text-muted-foreground mb-1">SCOI position</div>
              <div className="text-[12px] text-foreground">{picked.scoi}</div>
            </div>
            <div className="mt-3">
              <div className="font-mono-marker text-[9px] tracking-wider uppercase text-muted-foreground mb-1">Funding / valuation</div>
              <div className="text-[12px] text-foreground">{picked.fund}</div>
            </div>
            <div className="mt-3">
              <div className="font-mono-marker text-[9px] tracking-wider uppercase text-muted-foreground mb-1">Why this position is distinct</div>
              <div className="text-[12px] text-foreground/85">{picked.why}</div>
            </div>
            {picked.flag && (
              <div className="mt-3 text-[11px] text-[hsl(var(--layer-8))] italic">
                ⚑ {picked.flag}
              </div>
            )}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default SublayerGrid;
