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
          Mind mapping, shared freely
        </p>
        <p>
          JTBD, Wardley Maps, and Christensen's work were given away by their authors.
          This framework is mine, in the same spirit, <strong className="text-foreground">free to use, cite, argue with, and improve</strong>.
        </p>
        <p className="mt-2 text-[13px] text-muted-foreground">
          More on the{" "}
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
      Personal thinking by Anand Arivukkarasu, shared freely. Views are my own.{" "}
      <Link to="/disclaimer" className="hover:text-foreground underline-offset-2 hover:underline">
        Disclaimer →
      </Link>
    </p>
  );
};


export default PersonalCapacityNotice;
