import { useState } from "react";
import { Check, Quote } from "lucide-react";
import { toast } from "sonner";

const SITE = "https://supplychainofai.com";
const AUTHOR = "Anand Arivukkarasu";

interface Props {
  /** Page title being cited (e.g. "Law I, Intelligence Commoditizes Downward"). */
  title: string;
  /** Path on the site (e.g. "/paper", "/laws/intelligence-commoditizes-downward"). */
  path: string;
  /** ISO publish/update date. Defaults to today. */
  date?: string;
  /** Optional anchor/section id (e.g. "law-1") appended as #anchor. */
  anchor?: string;
  /** Compact inline variant (smaller chip). */
  compact?: boolean;
  className?: string;
}

const FRAMEWORK_NAME = "Supply Chain of Intelligence™";

const formats = (title: string, path: string, date: string, url: string) => {
  const year = new Date(date).getFullYear();
  const monthDay = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return {
    APA: `Arivukkarasu, A. (${year}). ${title}. ${FRAMEWORK_NAME}. ${url}`,
    MLA: `Arivukkarasu, Anand. "${title}." ${FRAMEWORK_NAME}, ${monthDay}, ${url}.`,
    LinkedIn: `${title}, from ${FRAMEWORK_NAME} by ${AUTHOR}.\n\nRead the full piece: ${url}`,
    HTML: `<a href="${url}">${title}</a>, from ${FRAMEWORK_NAME} by ${AUTHOR}.`,
    BibTeX: `@misc{arivukkarasu${year}scoi,\n  author = {Arivukkarasu, Anand},\n  title  = {${title}},\n  year   = {${year}},\n  note   = {${FRAMEWORK_NAME}},\n  url    = {${url}}\n}`,
  };
};

const CiteThis = ({ title, path, date, anchor, compact = false, className = "" }: Props) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const today = date ?? new Date().toISOString().slice(0, 10);
  const url = `${SITE}${path}${anchor ? `#${anchor}` : ""}`;
  const all = formats(title, path, today, url);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success(`Copied ${key} citation`);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  return (
    <div className={`inline-block ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={
          compact
            ? "inline-flex items-center gap-1.5 text-[11px] font-mono-marker uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
            : "inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
        }
        aria-expanded={open}
        aria-label="Show citation formats"
      >
        <Quote size={compact ? 11 : 14} />
        {open ? "Hide citations" : "Cite this"}
      </button>

      {open && (
        <div className="mt-3 bg-card border border-border rounded-lg p-4 md:p-5 max-w-xl shadow-sm">
          <p className="text-xs font-mono-marker uppercase tracking-[0.14em] text-muted-foreground mb-3">
            How to cite, pick a format
          </p>
          <div className="space-y-3">
            {Object.entries(all).map(([key, value]) => (
              <div key={key} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono-marker uppercase tracking-[0.14em] text-foreground/60">
                    {key}
                  </span>
                  <button
                    onClick={() => copy(key, value)}
                    className="text-[11px] font-semibold text-accent hover:underline inline-flex items-center gap-1"
                  >
                    {copied === key ? <Check size={11} /> : null}
                    {copied === key ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="text-[12.5px] leading-snug text-foreground/85 bg-muted/40 rounded p-2 whitespace-pre-wrap font-mono">
                  {value}
                </pre>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4">
            Licensed CC-BY 4.0. Attribution to {AUTHOR} and a link to{" "}
            <a href={SITE} className="underline">
              supplychainofai.com
            </a>{" "}
            required.
          </p>
        </div>
      )}
    </div>
  );
};

export default CiteThis;
