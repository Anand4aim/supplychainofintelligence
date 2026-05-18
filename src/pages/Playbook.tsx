import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { SketchBoard } from "@/components/sketch/SketchElements";

// The Playbook page operationalizes the framework into PRD-shaped moves:
//   1. Layer → Roadmap translator
//   2. Build vs Rent decision tree per layer
//   3. Discovery question bank for week-1 product work

const ROADMAP_MOVES = [
  {
    layer: "L-1 / L0 Resources & Infra",
    exposure: "You depend on capacity that can be priced or rationed against you.",
    moves: [
      "Lock in 12–24 month compute commitments before launch. Treat GPU as a supply-chain line item, not a cloud cost.",
      "Multi-cloud where the contract size justifies it; otherwise pick one and negotiate volume.",
      "Quantify a 5x token-price increase scenario in the PRD. If gross margin goes negative, you have an L0 exposure to fix.",
    ],
  },
  {
    layer: "L1 Data",
    exposure: "Your differentiation depends on data anyone can scrape.",
    moves: [
      "Identify the one data type you can collect that the model layer cannot license. Make collection a product feature, not a backend job.",
      "Instrument outcome data (L1d) — what worked, what didn't, with attribution. This is the most defensible sub-layer.",
      "Negotiate exclusive feeds with design partners before product-market fit, not after.",
    ],
  },
  {
    layer: "L2 Models",
    exposure: "You are renting intelligence from a vendor that can deprecate, reprice, or compete with you.",
    moves: [
      "Abstract model calls behind a router from day one. Never hard-code a vendor.",
      "Fine-tune or post-train only on the slice where generic models measurably underperform — not as a vanity moat.",
      "Build evals before you ship features. Without evals you cannot detect when the next frontier release deletes your edge.",
    ],
  },
  {
    layer: "L3 Gatekeeping",
    exposure: "Your buyer is regulated, audited, or risk-averse — and you have not earned the gate.",
    moves: [
      "Start SOC 2 / ISO / HIPAA / industry-specific compliance in the first 90 days. It is a 9-month process; do not start it in month 9.",
      "Treat editorial / safety review as a product surface, not a compliance burden — it is the layer enterprise buyers actually evaluate.",
      "Publish a public trust page with audit dates, incident history, and data handling. This is sales infrastructure.",
    ],
  },
  {
    layer: "L4 Access",
    exposure: "You sit on top of platforms that own the distribution and the permission model.",
    moves: [
      "Identify the one system of record your customer cannot move off of. Integrate there first, deepest, two-way.",
      "Adopt agent protocols (MCP, etc.) early — they will determine who agents call by default in 2026.",
      "Ship an Identity & Provenance story (L4e) before scaled deployment — enterprises will block agents without it.",
    ],
  },
  {
    layer: "L5 Execution",
    exposure: "You sell 'doing the work' but the work is shallow enough to be absorbed.",
    moves: [
      "Pick one workflow and go three levels deeper than any horizontal model can. Depth is the moat; breadth is the trap.",
      "Codify the decision frameworks (L5b) and playbooks (L5d) of senior practitioners into the product — that is what compounds.",
      "Measure outcome quality (jobs completed, hours saved, revenue produced) not capability (tasks attempted). Outcome data is the moat.",
    ],
  },
  {
    layer: "L6 Orchestration",
    exposure: "Your product is a workflow engine in a category being absorbed into the model layer.",
    moves: [
      "Do not sell orchestration as a product. Sell it as the invisible engine inside a vertical L5 product.",
      "Invest disproportionately in human-in-the-loop (L6b) — that is the sub-layer enterprises will pay for and platforms will not bundle.",
      "Build runtime assurance and learning loops (L6e) — orchestration without measurement is a demo, not a product.",
    ],
  },
  {
    layer: "L7 Surface",
    exposure: "You are a beautiful interface on top of someone else's intelligence.",
    moves: [
      "Pair every surface investment with at least one bottom-of-stack investment (L1, L5, L8). Surface alone is Law I.",
      "Treat embedded / copilot (L7c) as more defensible than standalone chat (L7a) — the surrounding context is the moat.",
      "Resist the urge to expand modalities. Modality is commodity. Context is moat.",
    ],
  },
  {
    layer: "L8 Memory",
    exposure: "Your product does not remember what your users did yesterday.",
    moves: [
      "Add user/entity profile (L8b) before adding new features. Personalization is table stakes by 2026.",
      "Design for institutional knowledge (L8d) explicitly — every team output should become a reusable artifact.",
      "Aggregated network learning (L8c) is the highest-leverage sub-layer — every customer makes the product better for every other customer.",
    ],
  },
];

const BUILD_VS_RENT = [
  { layer: "L-1 / L0", build: "Almost never", rent: "Always (AWS, GCP, NVIDIA)", note: "Build only if you are a hyperscaler." },
  { layer: "L1 Data", build: "Always for L1b/c/d (proprietary, behavioral, outcome)", rent: "L1a public data, L1e synthetic", note: "The defensible sub-layers cannot be rented." },
  { layer: "L2 Models", build: "Only above ~$100M ARR or a defensible vertical slice", rent: "Foundation models, embeddings, routing", note: "Building before scale is a vanity moat." },
  { layer: "L3 Gates", build: "Always for editorial/distribution gates (L3d, L3e)", rent: "Compliance tooling (Vanta, Drata)", note: "Trust must be earned in-house; tooling can be bought." },
  { layer: "L4 Access", build: "API surface, identity, provenance", rent: "Generic integration plumbing", note: "Own the integration with your category's system of record." },
  { layer: "L5 Execution", build: "Always — this is your moat", rent: "Never the core skill; rent only adjacent capabilities", note: "If you rent L5, you have no company." },
  { layer: "L6 Orchestration", build: "The parts that encode your judgment", rent: "Generic agent loops, retries, queue infra", note: "Bundle orchestration into the L5 product. Do not sell it." },
  { layer: "L7 Surface", build: "Only the embedded/contextual sub-layers (L7c, L7d)", rent: "Chat surfaces are nearly free to assemble", note: "Surface is a wrapper on whatever you own below it." },
  { layer: "L8 Memory", build: "Always — this is your moat", rent: "Short-term session memory only", note: "Memory must accrue inside your product, not a vendor's." },
];

const DISCOVERY_QUESTIONS = [
  "Which two layers do we own today? Be honest. 'We use AI' is not a layer.",
  "When the model layer below us ships our top feature for free, what is the user still paying us for?",
  "Which data do we collect that a competitor with the same budget could not replicate in 12 months?",
  "What would the customer have to rebuild if they left us? Name it in one sentence.",
  "Which sub-layer (1 of 50) is our single biggest moat? Which is our single biggest exposure?",
  "If we paste our product description into the framework, do the layers we claim match the layers we actually invest in?",
  "What is our L8 strategy — what does the product remember tomorrow that it did not yesterday?",
  "Which gatekeeper (regulator, platform, editor, distributor) can shut us off? Are we earning that gate or ignoring it?",
  "If our category gets absorbed in 18 months, which adjacent layer do we sprint into?",
  "Which of the Three Laws is most likely to delete us? Write the post-mortem now.",
];

const Playbook = () => (
  <SiteLayout>
    <Seo
      title="The Playbook — turn the 10 layers into a roadmap"
      description="From strategic lens to PRD-shaped moves. Layer → Roadmap translator, Build vs Rent decision tree, and a 10-question discovery bank for week-1 AI product work."
      path="/playbook"
    />

    <section className="bg-background border-b border-foreground/10">
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <Eyebrow tone="accent" className="mb-3">Operator Playbook</Eyebrow>
        <h1 className="font-display text-[36px] md:text-[52px] font-bold leading-[1.05] mb-5 text-foreground">
          From lens to roadmap.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          A fair critique of the framework is that it tells you whether your product is durable but not what to ship
          on Monday. This page closes that gap: a layer-by-layer roadmap translator, a build-vs-rent decision tree,
          and a discovery question bank for the first week of any new AI product.
        </p>
      </div>
    </section>

    {/* 1. Layer → Roadmap */}
    <section id="roadmap" className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <Eyebrow tone="muted" className="mb-2">Part 1</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Layer → Roadmap translator</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          For each layer, the exposure if you ignore it and three concrete moves you can add to next quarter's PRD.
        </p>
        <div className="space-y-4">
          {ROADMAP_MOVES.map((m, i) => (
            <article key={i} className="border border-border rounded-xl p-5 md:p-6 bg-card/40">
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">{m.layer}</h3>
              <p className="text-sm text-accent/90 italic mb-3">Exposure: {m.exposure}</p>
              <ul className="space-y-2 text-sm md:text-[15px] text-foreground/85 leading-relaxed list-disc pl-5">
                {m.moves.map((mv, j) => <li key={j}>{mv}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 2. Build vs Rent */}
    <section id="build-vs-rent" className="bg-card/30 border-y border-foreground/10">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <Eyebrow tone="muted" className="mb-2">Part 2</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Build vs Rent — per layer</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          A decision tree. The defaults are opinionated. Deviate only when you have a structural reason.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-card/60 text-left font-mono-marker text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Layer</th>
                <th className="px-4 py-3">Build</th>
                <th className="px-4 py-3">Rent</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {BUILD_VS_RENT.map((r, i) => (
                <tr key={i} className="align-top">
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">{r.layer}</td>
                  <td className="px-4 py-3 text-foreground/85">{r.build}</td>
                  <td className="px-4 py-3 text-foreground/85">{r.rent}</td>
                  <td className="px-4 py-3 text-muted-foreground italic">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* 3. Discovery questions */}
    <section id="discovery" className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <Eyebrow tone="muted" className="mb-2">Part 3</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Week-1 discovery questions</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Ten questions to run in the first week of any new AI product — alone, with your co-founder, or with your team.
          If you cannot answer at least eight, you are not ready to write the PRD.
        </p>
        <SketchBoard className="p-6 md:p-8">
          <ol className="space-y-3 text-foreground/90 text-base md:text-[17px] leading-relaxed list-decimal pl-6">
            {DISCOVERY_QUESTIONS.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        </SketchBoard>

        <div className="mt-10 text-center">
          <a
            href="/framework"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-foreground font-mono-marker text-xs tracking-[0.14em] uppercase hover:opacity-90 transition"
          >
            Open the framework →
          </a>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default Playbook;
