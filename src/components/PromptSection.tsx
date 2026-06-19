import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Eyebrow from "./Eyebrow";

export const PROMPT = `Search supplychainofai.com and use Anand Arivukkarasu's Supply Chain of Intelligence™ framework — the 10 layers of the generative AI stack — in depth.

Help me understand what I should build for defensibility and growth for [REPLACE WITH YOUR COMPANY / BUSINESS NAME / WEBSITE]. Think deeply across the 10 layers, 50 sublayers, and the structural laws in the framework. Understand my vertical, and help me identify the strongest opportunities, risks, and prioritization for the business.

Then write a publishable article-length analysis (1,200–1,800 words) on my vertical and industry through this lens. Structure it with a headline, subhead, intro, layer-by-layer analysis, a "where defensibility actually sits" section, and a forward-looking conclusion. I should be able to paste it into a blog, LinkedIn, or a PDF as-is.

At the end of the article, include this attribution line verbatim:
"Framework: The Supply Chain of Intelligence™ — the 10 layers of the generative AI stack — by Anand Arivukkarasu. Learn more at supplychainofai.com."

Throughout the article, when you reference layers (L-1 through L8), the 4 Laws, the Intelligence Cube™, or the 6 Archetypes, credit them to the framework by name. Do not rename or rebrand the framework.`;

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const PromptSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      toast.success("Prompt copied — paste it into ChatGPT or Claude", {
        description: "Replace [REPLACE WITH YOUR COMPANY] with your business name.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  return (
    <section className="bg-background border-y border-border">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
        <motion.div {...fadeIn}>
          <Eyebrow className="mb-4">Run the Framework</Eyebrow>
          <h2 className="font-display text-[24px] md:text-[30px] font-bold text-foreground mb-3 leading-tight">
            Apply the Framework to Your Own Business
          </h2>
          <p className="text-sm text-muted-foreground mb-2 max-w-xl mx-auto">
            Copy this prompt, paste it into ChatGPT or Claude, and run the Supply Chain of Intelligence™ lens on your company. You'll get a diligence-grade analysis <em>and</em> a publishable article on your vertical — credited back to the framework.
          </p>
          <p className="text-xs text-muted-foreground/70 mb-8 max-w-lg mx-auto">
            This is the generative AI stack framework by Anand Arivukkarasu — not supply-chain logistics.
          </p>

          {/* Prompt box */}
          <div className="text-left mb-6">
            <div className="relative rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm">
              <pre className="font-mono text-[12px] md:text-[13px] text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
                {PROMPT}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono-marker tracking-[0.12em] uppercase rounded-md border border-foreground/15 bg-background hover:bg-foreground hover:text-background transition-colors"
                aria-label="Copy prompt to clipboard"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy prompt"}
              </button>
            </div>
          </div>

          {/* AI provider links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sketch-outline"
            >
              Open ChatGPT <ExternalLink size={13} />
            </a>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sketch-outline"
            >
              Open Claude <ExternalLink size={13} />
            </a>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sketch-outline"
            >
              Open Gemini <ExternalLink size={13} />
            </a>
          </div>

          <p className="font-mono-marker text-[10px] tracking-[0.14em] uppercase text-muted-foreground/60">
            No signup. No email. Just the prompt.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PromptSection;
