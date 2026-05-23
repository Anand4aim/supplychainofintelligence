import { Link } from "react-router-dom";

/**
 * Personal-capacity disclosure. Used in the footer (line) and on
 * /about + /disclaimer (block). Single source of truth so the wording
 * stays consistent everywhere.
 */
interface Props {
  variant?: "line" | "block";
  className?: string;
}

const PersonalCapacityNotice = ({ variant = "line", className = "" }: Props) => {
  if (variant === "block") {
    return (
      <div className={`rounded-lg border border-border bg-secondary/40 p-5 text-[14px] leading-relaxed text-foreground/80 ${className}`}>
        <p className="font-mono-marker text-[10px] uppercase tracking-[0.16em] text-accent mb-2">
          A personal intellectual project · a give-back to the community
        </p>
        <p>
          This site is published by <strong className="text-foreground">Anand Arivukkarasu</strong> in a
          personal capacity, on personal time. It reflects personal views only and is{" "}
          <strong className="text-foreground">not affiliated with, endorsed by, or representative of any
          current or former employer</strong>. No products, consulting, advisory, diligence, or paid
          engagements of any kind are offered or accepted through this site. Every page — the framework,
          the audit, the predictions, the live feed, the posters — is free, public, and produced as
          writing and thought leadership to give back to the product community.
        </p>
        <p className="mt-2 text-[13px] text-muted-foreground">
          See the full{" "}
          <Link to="/disclaimer" className="text-accent hover:underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <p className={`text-[11px] leading-relaxed text-foreground/55 ${className}`}>
      Personal project · a give-back to the product community. Published in a personal capacity by Anand Arivukkarasu, on personal time.
      Not affiliated with any employer. No services, consulting, or paid engagements are offered
      through this site.{" "}
      <Link to="/disclaimer" className="hover:text-foreground underline-offset-2 hover:underline">
        Full disclaimer →
      </Link>
    </p>
  );
};

export default PersonalCapacityNotice;
