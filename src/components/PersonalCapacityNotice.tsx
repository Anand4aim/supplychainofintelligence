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
          A personal project · a give-back to the community
        </p>
        <p>
          I built this on evenings and weekends because the frameworks I lean on — JTBD, Wardley Maps, Christensen — were all given away freely by their authors. This is my contribution back. Everything here is <strong className="text-foreground">free, open, and meant to be used, cited, argued with, and improved</strong>.
        </p>
        <p className="mt-2">
          I have a day job (see the <Link to="/about" className="text-accent hover:underline">About</Link> page) — this site is entirely separate from that. These are my own views, not my employer's. I don't offer consulting, advisory, or any paid engagements through this site.
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
      Built by Anand Arivukkarasu as a personal project and give-back to the product community.
      Free to use, cite, and build on. My own views, not my employer's. No paid services offered here.{" "}
      <Link to="/disclaimer" className="hover:text-foreground underline-offset-2 hover:underline">
        Full disclaimer →
      </Link>
    </p>
  );
};

export default PersonalCapacityNotice;
