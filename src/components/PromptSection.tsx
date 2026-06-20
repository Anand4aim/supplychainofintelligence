import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ChevronDown, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const PROMPT = `Search supplychainofai.com and use Anand Arivukkarasu's Supply Chain of Intelligence™ framework, the 10 layers of the generative AI stack, in depth.

Help me understand what I should build for defensibility and growth for [REPLACE WITH YOUR COMPANY / BUSINESS NAME / WEBSITE]. Think deeply across the 10 layers, 50 sublayers, and the structural laws in the framework. Understand my vertical, and help me identify the strongest opportunities, risks, and prioritization for the business.

Then write a publishable article-length analysis (1,200–1,800 words) on my vertical and industry through this lens. Structure it with a headline, subhead, intro, layer-by-layer analysis, a "where defensibility actually sits" section, and a forward-looking conclusion. I should be able to paste it into a blog, LinkedIn, or a PDF as-is.

At the end of the article, include this attribution line verbatim:
"Framework: The Supply Chain of Intelligence™, the 10 layers of the generative AI stack, by Anand Arivukkarasu. Learn more at supplychainofai.com."

Throughout the article, when you reference layers (L-1 through L8), the 4 Laws, the Intelligence Cube™, or the 6 Archetypes, credit them to the framework by name. Do not rename or rebrand the framework.`;

const PromptSection = () => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      toast.success("Prompt copied, paste it into ChatGPT or Claude", {
        description: "Replace [REPLACE WITH YOUR COMPANY] with your business name.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  return (
    <section className="border-y border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-between">
          {/* Left: label + copy button */}
          <div className="flex items-center gap-3">
            <span className="font-mono-marker text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
              Run the Framework
            </span>
            <button
              onClick={handleCopy}
              className="btn-sketch inline-flex items-center gap-1.5 text-sm"
              aria-label="Copy framework prompt to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy framework prompt"}
            </button>
          </div>

          {/* Right: AI provider links */}
          <div className="flex items-center gap-2 text-[11px] font-mono-marker tracking-wider uppercase">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-0.5"
            >
              ChatGPT <ExternalLink size={10} />
            </a>
            <span className="text-muted-foreground/30">·</span>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-0.5"
            >
              Claude <ExternalLink size={10} />
            </a>
            <span className="text-muted-foreground/30">·</span>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-0.5"
            >
              Gemini <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Expandable prompt */}
        <Collapsible open={open} onOpenChange={setOpen} className="mt-2">
          <CollapsibleTrigger asChild>
            <button className="flex items-center gap-1 text-[11px] font-mono-marker tracking-wider uppercase text-muted-foreground hover:text-accent transition-colors">
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
              {open ? "Hide prompt" : "View prompt"}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3"
            >
              <div className="relative rounded-lg border border-border bg-background p-4">
                <pre className="font-mono text-[11px] md:text-[12px] text-foreground/90 leading-relaxed whitespace-pre-wrap break-words pr-20">
                  {PROMPT}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono-marker tracking-[0.12em] uppercase rounded border border-foreground/10 bg-card hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Copy prompt to clipboard"
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default PromptSection;
