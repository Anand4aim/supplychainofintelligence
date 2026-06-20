import {
  DEFINITION_ONE_LINER,
  APPLICATION_LINE,
  READING_LINE,
} from "@/data/definition";

interface Props {
  /** "full" shows all three registers; "compact" shows definition + application; "oneliner" shows only the definition. */
  variant?: "full" | "compact" | "oneliner";
  /** Editorial cream surface vs. plain. Defaults to plain so it inherits page surface. */
  surface?: "plain" | "cream";
  className?: string;
}

/**
 * The canonical Definition block. Single source of truth for how the
 * Supply Chain of Intelligence™ is defined, used on Home, Paper,
 * Framework, Methodology, About. Never inline these strings; import
 * from src/data/definition.ts or use this component.
 */
const CanonicalDefinition = ({
  variant = "full",
  surface = "plain",
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
