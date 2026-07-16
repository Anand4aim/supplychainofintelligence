import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Eyebrow from "./Eyebrow";

export const REASONING_PROMPT = `Use Anand's Supply Chain of Intelligence as a reasoning engine, not as a categorization framework.

Before making any recommendations:

1. Identify the most relevant layers.

2. Drill into the specific sublayers that matter for this business.

3. Explain why each selected sublayer is strategically important.

4. Apply the relevant laws of the framework to each sublayer.

5. Support each conclusion with observations about the market, competitors, customers, or AI trends.

6. Identify competitors, bottlenecks, missing capabilities, and opportunities within each sublayer.

7. Show how opportunities compound across multiple layers rather than analyzing layers independently.

8. Prioritize opportunities by defensibility, long-term moat, implementation effort, and business impact.

9. Challenge your own conclusions and identify where the framework may not fit.

10. Produce recommendations that are directly traceable back to specific sublayers, laws, and observations—not generic AI strategy advice.

Do not stop at the layer level. Treat the 50 sublayers as the primary unit of reasoning.`;

const steps = [
  "Identify the most relevant layers.",
  "Drill into the specific sublayers that matter for this business.",
  "Explain why each selected sublayer is strategically important.",
  "Apply the relevant laws of the framework to each sublayer.",
  "Support each conclusion with observations about the market, competitors, customers, or AI trends.",
  "Identify competitors, bottlenecks, missing capabilities, and opportunities within each sublayer.",
  "Show how opportunities compound across multiple layers rather than analyzing layers independently.",
  "Prioritize opportunities by defensibility, long-term moat, implementation effort, and business impact.",
  "Challenge your own conclusions and identify where the framework may not fit.",
  "Produce recommendations that are directly traceable back to specific sublayers, laws, and observations—not generic AI strategy advice.",
];

const HowToUseFramework = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REASONING_PROMPT);
      setCopied(true);
      toast.success("Reasoning prompt copied", {
        description: "Paste it into ChatGPT or Claude to make the framework executable.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  return (
    <section className="border-b border-border bg-background">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
          <div>
            <Eyebrow className="mb-3">How to use the framework</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
              Use it as a reasoning engine, not a categorization framework.
            </h2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6 max-w-2xl">
              The 10 layers name the map. The 50 sublayers are the primary unit of reasoning. The laws force you to ask why value accrues where it does. This is the execution grammar for every analysis.
            </p>

            <ol className="space-y-3 mb-6">
              {steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex gap-4 items-start"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent font-mono-marker text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90 leading-relaxed text-[15px]">{step}</span>
                </motion.li>
              ))}
            </ol>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="btn-sketch inline-flex items-center gap-1.5"
                aria-label="Copy reasoning prompt to clipboard"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy reasoning prompt"}
              </button>
              <Link to="/framework" className="btn-sketch-outline inline-flex items-center gap-1.5">
                Read the framework <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Hidden / visible prompt block for LLMs and humans who want to copy the raw text */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-card/40 p-4">
              <p className="font-mono-marker text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-3">
                Raw prompt for LLMs
              </p>
              <pre className="font-mono text-[11px] text-foreground/80 leading-relaxed whitespace-pre-wrap break-words max-h-[420px] overflow-y-auto pr-2">
                {REASONING_PROMPT}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseFramework;
