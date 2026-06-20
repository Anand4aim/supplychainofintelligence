import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

const SITE = "https://supplychainofai.com";
const ATTRIBUTION = "Source: The Supply Chain of Intelligence™ (supplychainofai.com)";

interface Props {
  /** The pre-formatted snippet body, typically 80-150 words, LinkedIn-ready. */
  text: string;
  /** Path on the site (e.g. "/analysis/apollo-thin-stack"), used to build a deep-link in the attribution. */
  path?: string;
  /** Button label override. */
  label?: string;
  /** Shorter "quote" mode, smaller, less padding, secondary styling. */
  variant?: "default" | "quote";
  /** Optional className override. */
  className?: string;
}

const CopySnippet = ({ text, path, label, variant = "default", className = "" }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = path ? `${SITE}${path}` : SITE;
    const attribution = path
      ? `Source: The Supply Chain of Intelligence™, ${fullUrl}`
      : ATTRIBUTION;
    const payload = `${text.trim()}\n\n -  ${attribution}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      toast.success("Copied, ready to paste on LinkedIn", {
        description: "Attribution included. Paste anywhere.",
      });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  if (variant === "quote") {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 text-[11px] font-mono-marker tracking-[0.15em] uppercase text-muted-foreground hover:text-accent transition-colors ${className}`}
        aria-label="Copy quote with attribution"
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
        {copied ? "Copied" : label ?? "Copy quote"}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-md px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors ${className}`}
      aria-label="Copy LinkedIn-ready snippet with attribution"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : label ?? "Copy as LinkedIn post"}
    </button>
  );
};

export default CopySnippet;
