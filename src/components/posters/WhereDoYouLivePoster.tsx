import ExportablePng from "@/components/ExportablePng";
import { LAYERS, layerColor } from "@/data/layers";

/**
 * Fill-in-the-blank diagnostic. Visitor self-locates their company
 * on the stack. Highly shareable as a "do this for your startup".
 */
const WhereDoYouLivePoster = () => {
  const ordered = [...LAYERS].reverse();

  return (
    <ExportablePng
      fileName="scoi-where-do-you-live"
      caption="The Self-Diagnostic"
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
            Print · Pin · Answer
          </p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.1] text-foreground mt-1 font-bold">
            Where does your company actually live?
          </h2>
          <p className="text-[12px] md:text-sm text-muted-foreground mt-2">
            Mark the layers you <em>own</em>. Not what you touch. Not what you integrate. What you <em>own</em>.
          </p>
        </div>

        {/* Stack with checkbox column */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10">
          {/* Stack */}
          <div className="flex flex-col gap-1.5">
            {ordered.map((l) => {
              const c = layerColor(l.id);
              return (
                <div
                  key={l.id}
                  className="grid grid-cols-[110px_1fr_36px] gap-3 items-center rounded-md p-2.5"
                  style={{
                    background: "hsl(40 25% 99%)",
                    borderLeft: `4px solid ${c}`,
                    border: "1px solid hsl(var(--foreground) / 0.08)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono-marker text-[11px] md:text-[13px] font-bold tracking-wider"
                      style={{ color: c }}
                    >
                      {l.id}
                    </span>
                    <span className="font-display text-[12px] md:text-[14px] text-foreground font-bold">
                      {l.shortName}
                    </span>
                  </div>
                  <p className="text-[11px] md:text-[12px] text-muted-foreground leading-snug truncate">
                    {l.desc}
                  </p>
                  <div
                    className="w-6 h-6 md:w-7 md:h-7 rounded border-2 justify-self-end"
                    style={{ borderColor: "hsl(var(--foreground) / 0.35)" }}
                  />
                </div>
              );
            })}
          </div>

          {/* Questions panel */}
          <div className="md:w-[260px] flex flex-col gap-4">
            {[
              { q: "Q1", t: "Which layers do you own?", h: "Tick boxes →" },
              { q: "Q2", t: "Which is your bottleneck?", h: "The scarce one — Law II." },
              { q: "Q3", t: "What happens if L2 ships it free?", h: "If nothing — you're inside Law I." },
            ].map((c) => (
              <div
                key={c.q}
                className="p-3 md:p-4 rounded-md"
                style={{ background: "hsl(var(--accent) / 0.08)", border: "1px solid hsl(var(--accent) / 0.3)" }}
              >
                <p className="font-mono-marker text-[10px] tracking-[0.2em] uppercase font-bold text-accent">
                  {c.q}
                </p>
                <p className="font-display text-[13px] md:text-[15px] font-bold text-foreground leading-tight mt-1">
                  {c.t}
                </p>
                <p className="text-[11px] text-muted-foreground italic mt-1">{c.h}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-foreground/15 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sketch text-[11px] md:text-xs text-muted-foreground italic">
            If the boxes you tick are only L7 — the model layer below you owns your roadmap.
          </p>
          <p className="font-mono-marker text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-foreground/60">
            Anand Arivukkarasu · SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default WhereDoYouLivePoster;
