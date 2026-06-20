import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";

/**
 * "Start Here" 5-beat lobby strip.
 *
 * Sits directly below the hero on the homepage. Written for a first-time
 * reader (PE partner, board member, founder) who needs to know in 15 seconds
 * what this site is, who it's for, and what action it asks of them.
 *
 * The five beats, problem, insight, map, test, outcome, are the spine
 * of the framework's narrative. Each card deep-links to the page that
 * proves it. Order is fixed; do not reshuffle without rewriting copy.
 */

type Beat = {
  n: string;
  kicker: string;
  line: string;
  to: string;
  cta: string;
};

const BEATS: Beat[] = [
  {
    n: "01",
    kicker: "Problem",
    line: "AI products are getting erased by platforms.",
    to: "/framework",
    cta: "See the compression",
  },
  {
    n: "02",
    kicker: "Insight",
    line: "JTBD finds demand. It does not prove defensibility.",
    to: "/about#jtbd",
    cta: "Read the lens",
  },
  {
    n: "03",
    kicker: "Map",
    line: "AI value moves through 10 layers, compute to memory.",
    to: "/framework",
    cta: "Walk the stack",
  },
  {
    n: "04",
    kicker: "Test",
    line: "Score your company out of 40.",
    to: "/framework",
    cta: "Run the audit",
  },
  {
    n: "05",
    kicker: "Outcome",
    line: "Deepen, defend, reposition, or exit.",
    to: "/playbook",
    cta: "See the playbook",
  },
];

const StartHereStrip = () => (
  <section
    aria-label="Start Here, the framework in five beats"
    className="bg-background border-y border-foreground/10"
  >
    <div className="max-w-6xl mx-auto px-6 py-14 md:py-18">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <Eyebrow tone="accent" className="mb-3">Start Here · 60-second read</Eyebrow>
          <h2 className="font-display text-2xl md:text-[32px] font-bold text-foreground leading-tight max-w-2xl">
            The framework in five beats.
          </h2>
        </div>
        <p className="text-muted-foreground text-[14px] md:text-[15px] leading-relaxed max-w-md">
          For founders, product leaders, PE partners, and board members deciding
          whether an AI product is a moat or a wrapper.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
        {BEATS.map((b) => (
          <li key={b.n} className="h-full">
            <Link
              to={b.to}
              className="group h-full flex flex-col p-5 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono-marker text-[11px] tracking-[0.18em] text-muted-foreground">
                  {b.n}
                </span>
                <span className="font-mono-marker text-[10px] tracking-[0.18em] uppercase text-accent">
                  {b.kicker}
                </span>
              </div>
              <p className="font-display text-[15px] md:text-[16px] font-semibold text-foreground leading-snug mb-4 flex-1">
                {b.line}
              </p>
              <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground group-hover:text-accent transition-colors">
                {b.cta} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default StartHereStrip;
