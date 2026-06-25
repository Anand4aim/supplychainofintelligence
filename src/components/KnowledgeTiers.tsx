import { Link } from "react-router-dom";
import Eyebrow from "@/components/Eyebrow";

/**
 * Knowledge Tiers — explains how the framework is layered for readers
 * who want to go from the one-line definition all the way down to
 * monthly market readings. Lives on /framework, below Observations.
 *
 * Tier 0 — Definition (universal, evergreen)
 * Tier 1 — The Map (layers + sublayers)
 * Tier 2 — The Laws + The Cube (structural rules + vertical/function improvisation)
 * Tier 3 — The Dynamics (flywheels — how value compounds)
 * Tier 4 — Observations & Readings (time-bound, re-reviewed)
 */

type Row = {
  tier: string;
  name: string;
  what: string;
  examples: string;
  cadence: string;
  audience: string;
  href?: string;
};

const ROWS: Row[] = [
  {
    tier: "Tier 0",
    name: "The Definition",
    what: "The idea itself. Names no technology, company, or layer. Cannot go stale.",
    examples: "“Intelligence is a supply chain. Value accrues at the bottlenecks, not the most visible node.”",
    cadence: "Evergreen",
    audience: "Everyone",
    href: "/paper",
  },
  {
    tier: "Tier 1",
    name: "The Map",
    what: "The structural vocabulary. 10 layers (L‑1 → L8) and 50 sublayers — what exists in the stack and what to call it.",
    examples: "L1 Data, L1b Proprietary Data, L5a Domain Execution, L8d Institutional Knowledge.",
    cadence: "Evergreen structure; versioned Paper bump on change",
    audience: "Every reader",
    href: "/framework",
  },
  {
    tier: "Tier 2",
    name: "The Laws + The Cube",
    what: "How the map behaves. Four structural Laws explain why value moves; the Intelligence Cube explains how Functions × Verticals × Layers improvise into real products.",
    examples: "Law I commoditization, Law IV generator/verifier split; Cube slice (Sales × Legal × L5a+L8d).",
    cadence: "Evergreen; reviewed when a Law is challenged",
    audience: "Operators, PMs, investors",
    href: "/framework#laws",
  },
  {
    tier: "Tier 3",
    name: "The Dynamics",
    what: "How value compounds. Flywheels at sublayer resolution — outcome‑data loops, habituation loops, trust ratchets, capital/physics loops, and the Cube flywheel.",
    examples: "L5a → L1d → L8c → L5b (Outcome‑Data loop). L7a → L8b → L7e (Habituation).",
    cadence: "Evergreen claims; falsifiable, cross‑LLM critiqued",
    audience: "Researchers, deep readers",
    href: "/framework",
  },
  {
    tier: "Tier 4",
    name: "Observations & Readings",
    what: "Time‑bound applications. Which company sits in which layer, current verdicts, predictions, market maps. Re‑reviewed monthly.",
    examples: "“Apollo is a thin‑stack survivor (L1b + L2 MCP).” Market maps. Predictions with counter‑moves.",
    cadence: "Living, monthly cadence; every reading carries a re‑review date",
    audience: "Anyone reading the market right now",
    href: "/live",
  },
];

const KnowledgeTiers = () => {
  return (
    <section
      id="tiers"
      className="bg-background border-t border-border"
      aria-labelledby="tiers-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl mb-10">
          <Eyebrow className="mb-3">For readers going deeper</Eyebrow>
          <h2
            id="tiers-heading"
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            The five tiers of the framework
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            The framework is not one flat document. It is layered so the top
            stays simple while the deeper tiers carry the research. Read top‑down
            for the map, bottom‑up if you want the live readings first. The
            Definition is universal; the Map and Laws are evergreen; the
            Dynamics are research; the Observations are dated.
          </p>
        </div>

        {/* Desktop / tablet table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-foreground/10">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left">
              <tr className="border-b border-foreground/10">
                <th className="px-4 py-3 font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground w-[88px]">Tier</th>
                <th className="px-4 py-3 font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground w-[160px]">Name</th>
                <th className="px-4 py-3 font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground">What it is</th>
                <th className="px-4 py-3 font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground w-[220px]">Cadence</th>
                <th className="px-4 py-3 font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground w-[160px]">Primary reader</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.tier} className="border-b border-foreground/10 last:border-0 align-top">
                  <td className="px-4 py-4 font-mono-marker text-[11px] tracking-[0.14em] uppercase text-accent">{r.tier}</td>
                  <td className="px-4 py-4">
                    <div className="font-display text-base font-semibold text-foreground leading-tight">
                      {r.href ? (
                        <Link to={r.href} className="hover:text-accent transition-colors">
                          {r.name}
                        </Link>
                      ) : (
                        r.name
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-foreground/85 leading-relaxed">
                    <p className="mb-2">{r.what}</p>
                    <p className="text-[12.5px] text-muted-foreground italic">{r.examples}</p>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-foreground/80 leading-relaxed">{r.cadence}</td>
                  <td className="px-4 py-4 text-[13px] text-foreground/80 leading-relaxed">{r.audience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden space-y-4">
          {ROWS.map((r) => (
            <div
              key={r.tier}
              className="rounded-xl border border-foreground/10 p-5 bg-background"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
                  {r.tier}
                </span>
                <span className="font-display text-base font-semibold text-foreground">
                  {r.href ? (
                    <Link to={r.href} className="hover:text-accent transition-colors">
                      {r.name}
                    </Link>
                  ) : (
                    r.name
                  )}
                </span>
              </div>
              <p className="text-[14px] text-foreground/85 leading-relaxed mb-2">{r.what}</p>
              <p className="text-[12.5px] text-muted-foreground italic mb-3">{r.examples}</p>
              <dl className="grid grid-cols-[88px,1fr] gap-y-1 text-[12.5px]">
                <dt className="text-muted-foreground">Cadence</dt>
                <dd className="text-foreground/80">{r.cadence}</dd>
                <dt className="text-muted-foreground">Reader</dt>
                <dd className="text-foreground/80">{r.audience}</dd>
              </dl>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-muted-foreground mt-8 max-w-3xl leading-relaxed">
          Rule of thumb: if a claim has a date attached, it is Tier 4. If it can
          be falsified by naming a counter‑example mechanism, it is Tier 3. If
          changing it would force a Paper version bump, it is Tier 1 or 2. If
          changing it would mean the framework is wrong about what AI <em>is</em>,
          it is Tier 0.
        </p>
      </div>
    </section>
  );
};

export default KnowledgeTiers;
