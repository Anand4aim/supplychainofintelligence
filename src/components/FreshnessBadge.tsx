import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

/**
 * Editorial freshness badge for LIVING surfaces (Market Maps, Vertical Maps,
 * Teardowns, Predictions, Verdicts). Evergreen surfaces (10 layers, 50
 * sublayers, 4 Laws, Intelligence Cube, archetypes, the Paper) MUST NOT
 * carry this badge — dating them weakens the framework.
 *
 * Two-register cadence contract: see /methodology.
 *
 * `asOf` — human-readable month string (e.g. "As of Jun 2026", "Jun 2026").
 *           Normalised to "As of <month>" when prefix missing.
 * `tone` — "fresh" (<35 days) renders accent; "stale" renders amber warning.
 *           Caller decides; default fresh.
 */
interface Props {
  asOf: string;
  tone?: "fresh" | "stale";
  className?: string;
  hideLink?: boolean;
}

const FreshnessBadge = ({ asOf, tone = "fresh", className = "", hideLink = false }: Props) => {
  const label = /^as of/i.test(asOf.trim()) ? asOf.trim() : `As of ${asOf.trim()}`;
  const isStale = tone === "stale";
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 border text-[10px] font-mono-marker tracking-wider uppercase ${
        isStale
          ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
          : "border-foreground/15 bg-background text-muted-foreground"
      } ${className}`}
      title="This is a living reading of the market — re-reviewed monthly."
    >
      <Clock size={11} className={isStale ? "text-amber-600 dark:text-amber-400" : "text-accent"} />
      <span>{label}</span>
      <span className="text-foreground/30">·</span>
      <span>Re-reviewed monthly</span>
      {!hideLink && (
        <>
          <span className="text-foreground/30">·</span>
          <Link to="/methodology" className="text-accent hover:underline normal-case tracking-normal">
            methodology
          </Link>
        </>
      )}
    </div>
  );
};

export default FreshnessBadge;
