import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { AUDIT_QUESTIONS, AUDIT_BANDS } from "@/data/layers";
import { ArrowRight, RotateCcw, Share2 } from "lucide-react";

// The audit scores 1 (worst) – 5 (best) per question.
// Q1 ("Could a better GPT replace your core value?") and Q8 (platform bundle)
// invert: a higher answer = higher risk, so we flip them.
const INVERT = new Set([0, 7]);

// Map an audit question's layer string (e.g. "L2", "L1b", "L5 / L6") to its
// signature 10-layer color token. Uses the first layer mentioned.
const layerVarFor = (layerStr: string) => {
  const m = layerStr.match(/L(-?\d+)/);
  if (!m) return "var(--layer-0)";
  const n = parseInt(m[1], 10);
  return n < 0 ? "var(--layer-neg1)" : `var(--layer-${n})`;
};

const SCALE = [
  { v: 1, label: "Strongly no" },
  { v: 2, label: "No" },
  { v: 3, label: "Somewhat" },
  { v: 4, label: "Yes" },
  { v: 5, label: "Strongly yes" },
];

const bandFor = (total: number) => {
  if (total <= 16) return AUDIT_BANDS[0];
  if (total <= 24) return AUDIT_BANDS[1];
  if (total <= 30) return AUDIT_BANDS[2];
  if (total <= 36) return AUDIT_BANDS[3];
  return AUDIT_BANDS[4];
};

const AuditPage = () => {
  const [scores, setScores] = useState<(number | null)[]>(
    () => AUDIT_QUESTIONS.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(
    () =>
      scores.reduce<number>((acc, raw, i) => {
        if (raw === null) return acc;
        const v = INVERT.has(i) ? 6 - raw : raw;
        return acc + v;
      }, 0),
    [scores]
  );

  const answered = scores.filter((s) => s !== null).length;
  const allAnswered = answered === AUDIT_QUESTIONS.length;
  const band = submitted ? bandFor(total) : null;

  const setAnswer = (qi: number, v: number) => {
    setScores((prev) => prev.map((p, i) => (i === qi ? v : p)));
  };

  const reset = () => {
    setScores(AUDIT_QUESTIONS.map(() => null));
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const share = async () => {
    const url = `${window.location.origin}/audit`;
    try {
      await navigator.share({
        title: "AI Defensibility Audit",
        text: `I scored ${total}/40 on the AI Defensibility Audit — ${band?.label}. Run yours:`,
        url,
      });
    } catch {
      await navigator.clipboard.writeText(`${url}\n\nScore: ${total}/40 — ${band?.label}`);
      alert("Result copied to clipboard");
    }
  };

  return (
    <SiteLayout>
      <Seo
        title="AI Defensibility Audit — Score Your Product in 5 Minutes"
        description="Eight questions. Five archetypes. Find out whether your AI product is a Thin Wrapper, a Workflow Product, or an Intelligence Gate — and which layer is rented vs owned."
        path="/audit"
      />

      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-10 text-center">
          <p className="font-sketch text-lg font-bold text-accent mb-4">— The Tool</p>
          <h1 className="font-display text-3xl md:text-[42px] font-bold text-foreground leading-[1.1] mb-4">
            The AI Defensibility Audit
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Eight questions. Five archetypes. The same scorecard the case studies use.
          </p>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-secondary/30 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="space-y-6">
            {AUDIT_QUESTIONS.map((q, qi) => (
              <motion.div
                key={qi}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: qi * 0.04 }}
                className="bg-card border border-border rounded-2xl p-6 sketch-border relative overflow-hidden"
                style={{ borderLeft: `4px solid hsl(${layerVarFor(q.layer)})` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className="font-sketch text-base font-bold shrink-0 px-2 py-1 rounded-md"
                    style={{
                      color: `hsl(${layerVarFor(q.layer)})`,
                      background: `hsl(${layerVarFor(q.layer).replace(")", "-bg)")})`,
                    }}
                  >
                    {String(qi + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display font-bold text-foreground text-base md:text-lg leading-snug">
                      {q.question}
                    </p>
                    <p className="font-sketch text-xs text-muted-foreground mt-1">
                      {q.area} · maps to <span style={{ color: `hsl(${layerVarFor(q.layer)})` }} className="font-bold">{q.layer}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {SCALE.map((s) => {
                    const selected = scores[qi] === s.v;
                    return (
                      <button
                        key={s.v}
                        type="button"
                        onClick={() => setAnswer(qi, s.v)}
                        className={`py-2 px-1 rounded-lg border text-xs font-sketch font-bold transition-all ${
                          selected
                            ? "bg-accent text-accent-foreground border-accent shadow-sm scale-[1.02]"
                            : "bg-background text-foreground/70 border-border hover:border-accent/50 hover:text-foreground"
                        }`}
                      >
                        <span className="block text-base">{s.v}</span>
                        <span className="block text-[10px] opacity-80 mt-0.5">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit */}
          <div className="mt-10 sticky bottom-4 z-10">
            <div className="bg-background border border-border rounded-2xl p-5 sketch-border shadow-lg flex items-center justify-between gap-4">
              <div>
                <p className="font-sketch text-sm text-muted-foreground">
                  Answered <span className="text-foreground font-bold">{answered}</span> /{" "}
                  {AUDIT_QUESTIONS.length}
                </p>
                <div className="w-full max-w-[200px] h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${(answered / AUDIT_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
              <button
                type="button"
                disabled={!allAnswered}
                onClick={() => {
                  setSubmitted(true);
                  setTimeout(
                    () => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }),
                    50
                  );
                }}
                className="btn-sketch disabled:opacity-40 disabled:cursor-not-allowed"
              >
                See verdict <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Result */}
      {submitted && band && (
        <section id="result" className="bg-background border-t border-border">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-2 border-accent/40 rounded-3xl p-8 md:p-10 sketch-border"
              style={{ background: `linear-gradient(135deg, hsl(${band.color} / 0.05), transparent)` }}
            >
              <p className="font-sketch text-sm text-muted-foreground mb-2">Your verdict</p>
              <div className="flex flex-wrap items-baseline gap-4 mb-4">
                <p className="font-display text-5xl md:text-6xl font-bold text-foreground">
                  {total}
                  <span className="text-muted-foreground text-2xl">/40</span>
                </p>
                <p
                  className="font-display text-2xl md:text-3xl font-bold"
                  style={{ color: `hsl(${band.color})` }}
                >
                  {band.label}
                </p>
              </div>
              <p className="text-foreground/85 text-lg leading-relaxed mb-6">{band.verdict}</p>

              {/* Per-axis breakdown */}
              <div className="mt-8 space-y-3">
                <p className="font-sketch text-sm font-bold text-muted-foreground mb-3">
                  Where the strength (and risk) sits
                </p>
                {AUDIT_QUESTIONS.map((q, i) => {
                  const raw = scores[i] ?? 0;
                  const eff = INVERT.has(i) ? 6 - raw : raw;
                  const pct = (eff / 5) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-baseline justify-between text-sm mb-1">
                        <span className="text-foreground font-semibold">{q.area}</span>
                        <span className="font-sketch text-xs text-muted-foreground">
                          {q.layer} · {eff}/5
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05 }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              eff >= 4
                                ? "hsl(var(--verdict-fortified))"
                                : eff >= 3
                                ? "hsl(var(--accent))"
                                : "hsl(var(--verdict-exposed))",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-3">
                <button type="button" onClick={share} className="btn-sketch inline-flex items-center gap-2">
                  <Share2 size={14} /> Share verdict
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="btn-sketch-outline inline-flex items-center gap-2"
                >
                  <RotateCcw size={14} /> Retake
                </button>
                <Link to="/work-with-me" className="btn-sketch-outline inline-flex items-center gap-2">
                  Get a deep audit <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Band reference */}
            <div className="mt-10">
              <p className="font-sketch text-sm font-bold text-muted-foreground mb-3">All five archetypes</p>
              <div className="space-y-2">
                {AUDIT_BANDS.map((b) => {
                  const active = b.label === band.label;
                  return (
                    <div
                      key={b.label}
                      className={`p-4 rounded-xl border flex items-baseline gap-4 ${
                        active ? "border-accent bg-accent/5" : "border-border bg-card"
                      }`}
                    >
                      <span className="font-sketch text-sm font-bold w-16 shrink-0 text-muted-foreground">
                        {b.range}
                      </span>
                      <div>
                        <p className="font-display font-bold text-foreground">{b.label}</p>
                        <p className="text-sm text-muted-foreground">{b.verdict}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
};

export default AuditPage;
