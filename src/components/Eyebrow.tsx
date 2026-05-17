import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  /** Tone controls the color. Defaults to "accent". */
  tone?: "accent" | "muted" | "foreground";
  /** Size controls the type scale. Defaults to "md". */
  size?: "sm" | "md";
  /** Render with the leading em-dash convention. Defaults to true. */
  dash?: boolean;
  /** Render as a different element (e.g. "span" inside headings). Defaults to "p". */
  as?: "p" | "span" | "div";
  className?: string;
}

/**
 * Canonical page / section eyebrow.
 *
 * Single source of truth for the small uppercase mono label that appears above
 * page heroes and section headers. Always uses font-mono-marker, uppercase, and
 * the standard tracking. Never style the eyebrow text inline — use this.
 */
const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  tone = "accent",
  size = "md",
  dash = true,
  as: Tag = "p",
  className,
}) => {
  const toneClass =
    tone === "muted"
      ? "text-muted-foreground"
      : tone === "foreground"
      ? "text-foreground/70"
      : "text-accent";

  const sizeClass =
    size === "sm"
      ? "text-[11px] md:text-[12px]"
      : "text-[12px] md:text-[13px]";

  return (
    <Tag
      className={cn(
        "font-mono-marker font-bold uppercase tracking-[0.18em]",
        sizeClass,
        toneClass,
        className
      )}
    >
      {dash && <span aria-hidden="true">— </span>}
      {children}
    </Tag>
  );
};

export default Eyebrow;
