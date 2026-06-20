import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const STORAGE_KEY = "scoi-tour-dismissed-v1";

const SLIDES = [
  {
    chip: "STEP 1 · THE PROBLEM",
    title: "JTBD tells you what users want. It doesn't tell you who wins.",
    body: "Jasper, Grammarly, and Copilot in Word all do the *same* job-to-be-done. One is at ~$300M, one is squeezed, one is bundled into 365. JTBD predicts demand. It does not predict defensibility.",
    accent: "hsl(var(--accent))",
  },
  {
    chip: "STEP 2 · THE FRAMEWORK",
    title: "10 layers of intelligence. Every AI company sits on some subset.",
    body: "From L-1 (energy + policy) → L0 (compute) → L2 (models) → L4 (distribution) → L7 (surface) → L8 (memory). Each layer has its own scarcity, its own moat, and its own structural fate. Where a company sits decides their next 5 years.",
    accent: "hsl(var(--layer-4))",
  },
  {
    chip: "STEP 3 · THE FOUR LAWS",
    title: "Intelligence commoditizes down. Regulation rises with capability. Value migrates to the scarcest layer.",
    body: "Apply the four laws to any AI move (Microsoft buys X, OpenAI ships Y, a startup raises $Zb) and you can read, usually within a quarter, whether the move is structurally durable or a compression candidate that still has a counter-move available. That's what every article on this site does.",
    accent: "hsl(var(--layer-8))",
  },
];

const SixtySecondTour = () => {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true); // assume dismissed during SSR/first paint
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = window.localStorage.getItem(STORAGE_KEY);
    setDismissed(v === "1");
  }, []);

  const dismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
    setDismissed(true);
  };

  const handleOpen = () => {
    setStep(0);
    setOpen(true);
  };

  const last = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  return (
    <>
      {!dismissed && (
        <div className="border-b border-foreground/10 bg-gradient-to-r from-accent/5 via-background to-accent/5">
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Sparkles size={14} className="text-accent shrink-0" />
            <p className="text-[13px] text-foreground/85 truncate">
              <span className="font-display font-semibold text-foreground">First time?</span>{" "}
              Take the 60-second tour of the framework before you read an article.
            </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleOpen}
                className="font-mono-marker text-[11px] tracking-[0.12em] uppercase text-accent hover:text-accent/80 transition-colors px-2.5 py-1 rounded-md hover:bg-accent/10"
              >
                Take the tour →
              </button>
              <button
                onClick={dismiss}
                aria-label="Dismiss tour banner"
                className="text-foreground/40 hover:text-foreground/80 transition-colors p-1 rounded-md"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-foreground/15">
          {/* layer-color spectrum top bar */}
          <div className="h-[3px] w-full flex" aria-hidden="true">
            {["neg1", "0", "1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
              <div key={n} className="flex-1" style={{ background: `hsl(var(--layer-${n}))` }} />
            ))}
          </div>

          <div className="p-7 md:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p
                  className="font-mono-marker text-[10px] tracking-[0.22em] uppercase mb-3"
                  style={{ color: slide.accent }}
                >
                  {slide.chip}
                </p>
                <h2 className="font-display text-[22px] md:text-[26px] font-bold leading-[1.2] text-foreground mb-4">
                  {slide.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-foreground/75">
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* progress dots */}
            <div className="flex items-center gap-1.5 mt-7 mb-5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === step ? 24 : 8,
                    background: i === step ? slide.accent : "hsl(var(--foreground) / 0.15)",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="font-mono-marker text-[11px] tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft size={12} /> Back
              </button>

              {last ? (
                <div className="flex gap-2">
                  <Link
                    to="/framework"
                    onClick={() => { dismiss(); setOpen(false); }}
                    className="btn-sketch-outline !py-2 !px-3.5 !text-[12px]"
                  >
                    Read the framework
                  </Link>
                  <Link
                    to="/live"
                    onClick={() => { dismiss(); setOpen(false); }}
                    className="btn-sketch !py-2 !px-3.5 !text-[12px]"
                  >
                    Show me an article <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setStep((s) => Math.min(SLIDES.length - 1, s + 1))}
                  className="btn-sketch !py-2 !px-3.5 !text-[12px]"
                >
                  Next <ArrowRight size={12} />
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SixtySecondTour;
