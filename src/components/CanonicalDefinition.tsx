import {
  POSITIONING_LINE,
  DEFINITION_ONE_LINER,
  APPLICATION_LINE,
  READING_LINE,
} from "@/data/definition";

interface Props {
  /** "full" shows positioning + all three registers; "compact" shows positioning + definition + application; "oneliner" shows positioning + definition. */
  variant?: "full" | "compact" | "oneliner";
  /** Editorial cream surface vs. plain. Defaults to plain so it inherits page surface. */
  surface?: "plain" | "cream";
  /** When false, hides the category-reframe positioning line (e.g. on pages that render it elsewhere). */
  showPositioning?: boolean;
  className?: string;
}

/**
 * The canonical Definition block. Single source of truth for how the
 * Supply Chain of Intelligence™ is defined, used on Home, Paper,
 * Framework, Methodology, About. Never inline these strings; import
 * from src/data/definition.ts or use this component.
 *
 * The block leads with POSITIONING_LINE — the category reframe vs. the
 * AI stack — because pattern-matching "another AI stack" is the
 * single most common reader failure.
 */
const CanonicalDefinition = ({
  variant = "full",
  surface = "plain",
  showPositioning = true,
  className = "",
}: Props) => {
  const wrap =
    surface === "cream"
      ? "rounded-xl border border-foreground/10 bg-[hsl(45_38%_96%)] p-6 md:p-8"
      : "rounded-xl border border-foreground/10 p-6 md:p-8";

  return (
    <aside
      className={`${wrap} ${className}`}
      aria-label="Canonical definition of Supply Chain of Intelligence"
    >
      {showPositioning && (
        <>
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-accent mb-3">
            The Category
          </p>
          <p className="font-display text-[17px] md:text-[19px] leading-snug text-foreground/90 mb-6 border-l-2 border-accent pl-4">
            {POSITIONING_LINE}
          </p>
        </>
      )}

      <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-accent mb-3">
        The Definition
      </p>
      <p className="font-display text-xl md:text-2xl leading-snug text-foreground mb-0">
        {DEFINITION_ONE_LINER}
      </p>

      {variant !== "oneliner" && (
        <>
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-6 mb-2">
            The Application
          </p>
          <p className="text-[15px] text-foreground/85 leading-relaxed mb-0">
            {APPLICATION_LINE}
          </p>
        </>
      )}

      {variant === "full" && (
        <>
          <p className="font-mono-marker text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-6 mb-2">
            The Reading
          </p>
          <p className="text-[15px] text-foreground/85 leading-relaxed mb-0">
            {READING_LINE}
          </p>
        </>
      )}
    </aside>
  );
};

export default CanonicalDefinition;
