import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";

import { SketchBoard } from "@/components/sketch/SketchElements";

type EdgeCase = {
  pair: string;
  question: string;
  ruling: string;
  examples: { name: string; verdict: string }[];
};

const CASES: EdgeCase[] = [
  {
    pair: "L5 vs L6 — Execution vs Orchestration",
    question:
      "When a product does multi-step work, is that one deep skill (L5) or routing across skills (L6)?",
    ruling:
      "L5 is the skill itself — the model + scaffold + playbook that produces one specific outcome (a contract draft, a sales email, a code change). L6 is the routing logic that decides which L5 skill runs, in what order, with what context, and when to hand off to a human. If you removed every other skill and the product still worked, you are at L5. If the product is the choreography of multiple skills, you are at L6.",
    examples: [
      {
        name: "Cursor",
        verdict:
          "Primarily L5 (code-execution depth) with light L6. The skill itself — apply a diff, run a test, fix the failure — is the product. Orchestration is shallow.",
      },
      {
        name: "Devin (Cognition)",
        verdict:
          "Primarily L6 (long-horizon agent loop) on top of borrowed L5 (code skills). The pitch is the orchestration; the underlying coding skill is closer to the frontier model itself.",
      },
      {
        name: "Harvey",
        verdict:
          "L5-heavy (legal-domain execution depth) with L6 only where workflow demands it. The moat is the depth of the legal skill, not the agent loop.",
      },
      {
        name: "Sierra",
        verdict:
          "Balanced L5 + L6 + L8. Customer-care skills (L5), orchestration across them (L6), and persistent customer memory (L8) together.",
      },
    ],
  },
  {
    pair: "L6 vs L7 — Orchestration vs Surface",
    question:
      "When a product exposes an agent loop to the user, is the loop the product (L6) or the surface around it (L7)?",
    ruling:
      "L7 is what the user sees and interacts with — chat, canvas, embedded copilot. L6 is what runs underneath: planning, tool selection, state management, retries. A product is L7 if a competitor could swap out the orchestration engine and the user experience would be identical. It is L6 if changing the orchestration changes what is possible. Most 'agent' products today are L7 + thin L6.",
    examples: [
      {
        name: "ChatGPT",
        verdict:
          "L7-dominant. The chat surface is the product. The L6 underneath (tool calls, memory, search) is increasingly real but still secondary to the interface.",
      },
      {
        name: "Replit Agent",
        verdict:
          "L7 + L6 + L4 + L8. The IDE is the surface (L7), the build/deploy agent loop is the orchestration (L6), the runtime is L4, and project memory is L8. Hard to copy because the stack is integrated.",
      },
      {
        name: "Generic 'GPT wrapper' chat app",
        verdict:
          "Pure L7. The orchestration is one API call. Law I applies — the model owner ships the same surface for free.",
      },
    ],
  },
  {
    pair: "L1 vs L8 — Data vs Memory",
    question:
      "When a product gets smarter the longer a customer uses it, is that proprietary data (L1) or compounding memory (L8)?",
    ruling:
      "L1 is data that exists independently of the user — it was collected, licensed, or generated and now sits in a store. L8 is data that only exists because the user kept showing up — preferences, context, prior decisions, organizational knowledge that accreted inside the product. L1 can be sold. L8 cannot be migrated. If a competitor with the same L1 corpus could rebuild your product in a quarter, your moat is actually at L8.",
    examples: [
      {
        name: "Bloomberg Terminal",
        verdict:
          "L1b-dominant with L8 layered on top. The financial corpus is the moat. User-specific watchlists and shortcuts are L8 — meaningful, but not the primary defense.",
      },
      {
        name: "Notion AI",
        verdict:
          "L8-dominant. The proprietary data is the user's own workspace. Switching cost is the institutional knowledge that compounded inside Notion, not the model.",
      },
      {
        name: "Sierra",
        verdict:
          "L8-dominant. Each customer's deployment learns their support history, edge cases, and escalation patterns. That memory cannot be re-bought.",
      },
      {
        name: "Apollo.io",
        verdict:
          "L1c-dominant. The behavioral contact graph is the product. L8 is minimal.",
      },
    ],
  },
  {
    pair: "L4 vs L6 — Access vs Orchestration",
    question:
      "When a product connects systems and triggers actions, is it access infrastructure (L4) or workflow orchestration (L6)?",
    ruling:
      "L4 is the plumbing — APIs, auth, permissions, the pipes intelligence flows through. L6 is the decision-making about which pipe to use, when, and in what sequence. Zapier was historically L4 (connectors). Modern AI workflow tools are L6 (the model decides the sequence). The reason this matters: L4 commoditizes when standards converge (MCP, agent protocols). L6 is contested but harder to standardize because it requires judgment.",
    examples: [
      {
        name: "Zapier (classic)",
        verdict:
          "L4-dominant. Value lived in the connector library. Now under pressure as the L6 layer absorbs routing logic.",
      },
      {
        name: "LangChain / CrewAI",
        verdict:
          "L6-dominant. The framework is the orchestration model. Becoming a feature, not a product — they are libraries inside someone else's L6.",
      },
      {
        name: "Salesforce Agentforce",
        verdict:
          "L4 + L6 stack. Owns the integration plumbing (existing Salesforce object graph) and is moving up into orchestration.",
      },
    ],
  },
];

const EdgeCases = () => (
  <SiteLayout>
    <Seo
      title="Edge Cases — resolving fuzzy layer boundaries"
      description="L5 vs L6 vs L7. L1 vs L8. L4 vs L6. Worked examples that resolve the most common ambiguities in the Supply Chain of Intelligence™ framework."
      path="/edge-cases"
    />

    <section className="bg-background border-b border-foreground/10">
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <Eyebrow tone="accent" className="mb-3">Layer Disambiguation</Eyebrow>
        <h1 className="font-display text-[36px] md:text-[52px] font-bold leading-[1.05] mb-5 text-foreground">
          Edge cases that resolve the fuzz.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          A fair critique of the 10-layer framework is that some boundaries can feel fuzzy in practice — especially
          L5/L6/L7 and L1/L8. This page is the worked-example resolution: ruling, examples, and verdict per pair.
        </p>
      </div>
    </section>

    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
        {CASES.map((c, i) => (
          <article key={i} className="border border-border rounded-xl p-6 md:p-8 bg-card/40">
            <p className="font-mono-marker text-[10px] tracking-[0.2em] text-accent uppercase mb-2">
              EDGE CASE {i + 1}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{c.pair}</h2>
            <p className="text-foreground/80 italic mb-5">{c.question}</p>

            <SketchBoard className="p-4 md:p-5 mb-6">
              <p className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground mb-1">RULING</p>
              <p className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">{c.ruling}</p>
            </SketchBoard>

            <p className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground mb-2">EXAMPLES</p>
            <div className="space-y-3">
              {c.examples.map((ex, j) => (
                <div key={j} className="border-l-2 border-accent/40 pl-4">
                  <div className="font-display font-semibold text-foreground">{ex.name}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{ex.verdict}</div>
                </div>
              ))}
            </div>
          </article>
        ))}

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground mb-3">Have an edge case the framework gets wrong?</p>
          <a
            href="/challenge"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-foreground font-mono-marker text-xs tracking-[0.14em] uppercase hover:opacity-90 transition"
          >
            Submit a counter-case →
          </a>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default EdgeCases;
