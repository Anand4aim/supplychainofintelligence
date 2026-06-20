import ExportablePng from "@/components/ExportablePng";

/**
 * Thematic poster for Product Leaders to share alongside their own POV posts.
 * Five diligence questions a PM/CPO should ask of any AI feature on the roadmap,
 * each mapped to the layer it stress-tests. Framework-first, not author-first.
 */

const QUESTIONS = [
  {
    n: "01",
    q: "If the model layer ships this for free next quarter, what's left?",
    why: "If the answer is 'nothing', you're building inside Law I.",
    tag: "L2 → L5/L7 compression",
  },
  {
    n: "02",
    q: "Where does the data come from that no competitor can get?",
    why: "No proprietary L1 → no defensible learning loop.",
    tag: "L1b · L1c · L1d",
  },
  {
    n: "03",
    q: "What does the system remember after the session ends?",
    why: "Stateless features churn. Memory compounds retention.",
    tag: "L8c · L8d · L8e",
  },
  {
    n: "04",
    q: "Who verifies the output when it's wrong?",
    why: "Generator and verifier must be separate. That's Law IV.",
    tag: "L3 over L2/L5",
  },
  {
    n: "05",
    q: "Is the surface the moat, or just the doorway?",
    why: "Beautiful UI gets users. Deep chain keeps them.",
    tag: "L7 alone ≠ defensible",
  },
];

const ProductLeaderLensPoster = () => {
  const CREAM = "#F4ECD8";
  const INK = "#0F172A";
  const ACCENT = "#B85042";
  const MUTED = "#6B7280";

  return (
    <ExportablePng
      fileName="scoi-product-leader-lens"
      caption="The Product Leader's Lens"
      exportBackground={CREAM}
    >
      <div
        className="w-full mx-auto px-8 md:px-12 py-10 md:py-14"
        style={{ background: CREAM, color: INK, fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-8 md:mb-10 border-b pb-5" style={{ borderColor: "rgba(15,23,42,0.15)" }}>
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase mb-2"
            style={{ color: ACCENT, letterSpacing: "0.28em" }}
          >
            For Product Leaders
          </p>
          <h2
            className="leading-[1.05] font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.6vw, 52px)",
              color: INK,
            }}
          >
            Five questions to ask of <em>any</em> AI feature on your roadmap.
          </h2>
          <p className="text-[12px] md:text-sm mt-3 max-w-2xl" style={{ color: MUTED }}>
            Before the demo. Before the spec. Before the OKR. If your team can't answer four of five,
            you're shipping a wrapper, not a product.
          </p>
        </div>

        {/* Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {QUESTIONS.map((item, i) => (
            <div
              key={item.n}
              className={`p-5 md:p-6 rounded-md ${i === 4 ? "md:col-span-2" : ""}`}
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(15,23,42,0.1)",
              }}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: ACCENT,
                    fontSize: "32px",
                  }}
                >
                  {item.n}
                </span>
                <span
                  className="text-[9px] md:text-[10px] font-bold uppercase"
                  style={{ color: MUTED, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {item.tag}
                </span>
              </div>
              <h3
                className="text-[15px] md:text-[18px] font-bold leading-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: INK }}
              >
                {item.q}
              </h3>
              <p className="text-[12px] md:text-[13px] italic leading-snug" style={{ color: MUTED }}>
                {item.why}
              </p>
            </div>
          ))}
        </div>

        {/* Pullquote */}
        <div
          className="mt-8 md:mt-10 p-5 md:p-6 text-center"
          style={{ background: INK, color: CREAM }}
        >
          <p
            className="text-[15px] md:text-[20px] leading-snug italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "A roadmap is a layer claim. Most AI roadmaps are claiming L7."
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 flex flex-wrap items-baseline justify-between gap-3" style={{ borderTop: "1px solid rgba(15,23,42,0.15)" }}>
          <p className="text-[11px] italic" style={{ color: MUTED, fontFamily: "'Playfair Display', serif" }}>
            Supply Chain of Intelligence™, the 10 layers of the generative AI stack.
          </p>
          <p
            className="text-[9px] md:text-[10px] font-bold uppercase"
            style={{ color: MUTED, letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SupplyChainOfAI.com
          </p>
        </div>
      </div>
    </ExportablePng>
  );
};

export default ProductLeaderLensPoster;
