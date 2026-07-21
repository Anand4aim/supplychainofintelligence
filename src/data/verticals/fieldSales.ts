// Field Sales AI, private opportunity map (Practis-context vertical).
// Hidden — not registered in VERTICAL_REGISTRY, not linked in nav, not in sitemap,
// rendered under /labs/field-sales with noindex. This is a working artifact,
// not a public publication.
//
// Scope: in-person / at-the-door / on-site selling — home services, franchise
// operators, medical device reps, industrial field reps, insurance in-home.
// Deliberately EXCLUDES:
//   • Learning delivery / compliance LMS (Cornerstone, Docebo, Litmos) — that
//     is learning infrastructure, not field-sales AI. Own sibling map.
//   • B2B inside sales / SDR / dialer / CRM — covered in /market-map/sales-tech.
//
// Headline finding: field sales is the structural inverse of the B2B sales
// tech map. There, L5a is dangerously crowded and capital has moved to L1.
// Here, L5a is still *filling* (Practis, Yoodli, Hyperbound, Second Nature)
// while L1c is already the best-capitalised position because Rilla and Siro
// own the field-recording corpus. The bifurcation hasn't happened yet.
//
// Every empty cell should get one adversarial search before this map goes
// anywhere public. Emptiness claims are the easiest thing to falsify.

import type {
  VerticalMapData,
  VerticalCompany,
  CompanyStage,
  SublayerPlacement,
} from "./legal";

const C = (
  key: string,
  name: string,
  tier: string,
  stage: CompanyStage,
  focus: string,
  scoi: string,
  fund: string,
  why: string,
  flag?: string,
): [string, VerticalCompany] => [key, { key, name, tier, stage, focus, scoi, fund, why, flag }];

const COMPANIES = Object.fromEntries([
  // ── L5a Roleplay / readiness (the "filling" layer) ───────────────────────
  C("practis", "Practis", "AI roleplay · field readiness", "early",
    "Voice-first AI roleplay for in-person selling; scenario library, rubric grading, manager review.",
    "Primary L5a Domain Execution & Tool Use · Secondary L5e Interaction Skills · L7c Embedded Copilot",
    "Seed-stage per public disclosures.",
    "Purpose-built for door-and-driveway selling rather than SDR calls. Depth on the specific muscle (objections, discovery, closing at the door).",
    "Funding not disclosed publicly; treat as pre-Series A."),
  C("yoodli", "Yoodli", "AI communication coach", "growth",
    "AI speech coach / roleplay; general-purpose but with sales scenarios.",
    "Primary L5a · Secondary L5e",
    "$13.7M Series A (Sep 2023, Madrona) + follow-on rounds; ~$26M+ total (public sources).",
    "Horizontal communication surface with a sales beachhead. Vertical depth is thinner than a pure field-sales tool.",
    "Round sizes vary by source; verify before quoting."),
  C("hyperbound", "Hyperbound", "AI buyer simulation", "early",
    "Simulated buyer personas for sales roleplay; SDR + AE scenarios.",
    "Primary L5a · Secondary L1e Synthetic Data",
    "$3.1M seed (2024, Y Combinator + angels).",
    "Persona synthesis is a real L1e wedge; product surface is still B2B-tilted."),
  C("secondnature", "Second Nature AI", "AI sales roleplay (incumbent)", "growth",
    "Roleplay coaching with 'Jenny' AI trainer; enterprise-tilted.",
    "Primary L5a · Secondary L8b User Profiles",
    "~$27.5M total (Series A $12.5M, 2022; earlier seed).",
    "Earliest mover, feature parity fading. Included as the incumbent benchmark."),
  C("quantified", "Quantified.ai", "Behavioural AI roleplay", "growth",
    "Video roleplay + behavioural scoring (voice, expression, content).",
    "Primary L5a · Secondary L2b Specialised Models",
    "$15M+ total per public disclosures.",
    "Rare model-layer wedge (behavioural scoring). Non-obvious L2b bet.",
    "Funding aggregated across rounds; verify per-round detail."),
  C("retorio", "Retorio", "Behavioural AI training", "growth",
    "Behavioural intelligence platform, sales + service roleplay + assessment.",
    "Primary L5a · Secondary L2b · L8b",
    "Series A (2022, Bertelsmann); totals not fully public.",
    "European entrant, behavioural-science framing. Overlaps Quantified on the model layer."),
  C("awarathon", "Awarathon", "Video roleplay + assessment", "early",
    "Video-based sales training for pharma / MR / field-force.",
    "Primary L5a",
    "Growth-stage per company disclosures.",
    "Strong in pharma field-force (India + APAC). Vertical distribution wedge, not a model wedge.",
    "Funding thin; treat cautiously."),
  C("mindtickle", "Mindtickle", "Sales-readiness incumbent (AI-bolted)", "growth",
    "Sales enablement / readiness platform; AI roleplay added 2023-24.",
    "Primary L5a (AI-bolted) · L5d Operating Playbooks · L8b User Profiles",
    "$100M Series E (Aug 2021, SoftBank) at $1.2B; ~$281M total.",
    "Pre-AI incumbent with the distribution and the LMS-shaped moat. Its L5a is defensive, not native."),
  C("allego", "Allego", "Sales enablement incumbent (AI-bolted)", "growth",
    "Enablement suite; conversation intelligence + coaching add-ons.",
    "Primary L5a (AI-bolted) · L5d · L8b",
    "PE-backed (Bregal Sagemount); totals ~$100M+ per public sources.",
    "Same shape as Mindtickle; content library is the real asset, AI is bolted on."),

  // ── L1c Field-recording corpus (the best-capitalised position) ──────────
  C("rilla", "Rilla", "Field conversation intelligence", "growth",
    "Records + analyses in-person sales conversations (home services, contractors).",
    "Primary L1c Behavioural & Sensor Data · Secondary L1d Outcome Data · L5c RAG Workflows",
    "$150M Series B (Mar 2025, Sequoia + Iconiq) at ~$1.5B+ reported valuation; ~$180M total.",
    "Owns the field-recording corpus that everyone downstream needs. The L1c fortress of this vertical.",
    "Valuation reported by TechCrunch/The Information; treat as reported not filed."),
  C("siro", "Siro", "Field conversation intelligence", "growth",
    "Mobile-first recorder for reps on doors / at customer sites.",
    "Primary L1c · Secondary L1d",
    "$50M Series B (Nov 2024, ICONIQ + Battery); ~$70M total.",
    "The clearest Rilla challenger. Category is de-facto a duopoly at the corpus layer."),

  // ── Non-vendor gatekeepers / acquisition targets (kept honest) ──────────
  C("sandler", "Sandler Training", "Non-vendor · methodology holder", "growth",
    "Decades of field-sales methodology in binders, video, live delivery. Not a SaaS.",
    "L1b Proprietary Data (undigitised) · L5d Operating Playbooks (analogue)",
    "Private; PE-owned (multiple recaps).",
    "Sitting on the largest undigitised field-sales playbook corpus in existence. Acquisition target for anyone who wants L1b + L5d overnight.",
    "Non-vendor. Included to mark the acquisition surface, not as an active AI player."),
  C("franchisors", "Franchisor academies", "Non-vendor · distribution gate", "growth",
    "Franchisors (home services, restaurants, fitness, home improvement) mandate readiness standards across hundreds of operators.",
    "L3e Distribution Gates · L1b Proprietary Data (per-brand corpus)",
    "Private; part of the master-franchise economics.",
    "No AI vendor on this map has the power to mandate a standard across twenty operators at once. Franchisors and PE sponsors do. Distribution is the real gate here.",
    "Non-vendor. Placed at L3e to name who actually owns that cell."),
  C("pesponsors", "PE roll-up sponsors", "Non-vendor · distribution gate", "growth",
    "Home services / HVAC / plumbing / roofing roll-ups (Wrench Group, Apex, Redwood Services, etc.).",
    "L3e Distribution Gates · L1d Outcome Data (across-portfolio)",
    "Private; portfolio-scale capital.",
    "Same distribution power as franchisors, and they own the outcome data across acquired operators. Second natural buyer.",
    "Non-vendor. Placed at L3e."),

  // ── HR/hiring adjacent (deliberately flagged, not counted as field-sales) ─
  C("fountain", "Fountain", "Adjacent · hourly hiring", "growth",
    "High-volume hourly hiring (used by field-services employers).",
    "Adjacent to L-1 / hiring pipeline · NOT a field-sales AI",
    "$185M Series C (Mar 2022, B Capital) at $1.1B.",
    "Called out as the corrective footnote: 'hiring stage is thinly tooled' is wrong. Fountain runs ~1.2M hires a year. Kept off the placement grid to avoid muddling the map.",
    "Off-grid on purpose. Cited only to prevent a wrong-emptiness claim."),
  C("paradox", "Paradox (Workday)", "Adjacent · hiring AI", "growth",
    "Conversational hiring AI; acquired/allied with Workday.",
    "Adjacent to L-1 · NOT a field-sales AI",
    "Multiple rounds; Workday integration announced.",
    "Same reason as Fountain — cited to prevent false emptiness at hiring/onboarding.",
    "Off-grid on purpose."),
]);

// Two-letter helper so I keep the intent legible when I revisit this map.
const P = (id: string, primary: string[] = []): SublayerPlacement => ({ id, primary });
const S = (id: string, secondary: string[] = []): SublayerPlacement => ({ id, secondary });
const WS = (id: string, primary: string[] = [], secondary: string[] = []): SublayerPlacement =>
  ({ id, primary, secondary, whitespace: true });
const WSNote = (id: string, note: string): SublayerPlacement =>
  ({ id, whitespace: true, gap: { kind: "ws", note } });
const GAP = (id: string, kind: "ws" | "feat" | "horiz", note: string): SublayerPlacement =>
  ({ id, gap: { kind, note } });

const placements: SublayerPlacement[] = [
  // L8 Memory — every cell empty, and that is the point.
  GAP("L8a", "horiz", "Framework / infra feature"),
  { id: "L8b", secondary: ["mindtickle", "allego", "secondnature"] },
  WSNote("L8c",
    "⌁ Aggregated network learning — EMPTY for a commercial reason, not a technical one. Needs three comparable clients with data rights secured at contract."),
  WSNote("L8d",
    "⌁ Institutional knowledge — EMPTY. Same commercial gate as L8c. Client-record capture is a discipline problem, which is why money hasn't solved it."),
  WSNote("L8e",
    "⌁ Learned world model of 'what wins at a door' — EMPTY. Two-plus years of one client is the honest scale of what any single vendor has today."),

  // L7 Surface
  GAP("L7a", "horiz", "Commoditised by ChatGPT / Google / Apple"),
  GAP("L7b", "horiz", "Horizontal creative tools"),
  { id: "L7c", secondary: ["practis", "yoodli", "hyperbound"] },
  GAP("L7d", "horiz", "Transaction surface owned by field-service ops software (ServiceTitan, Housecall Pro)"),
  WSNote("L7e",
    "⌁ Ambient in-ear coaching at the door — emerging. Rilla-adjacent hardware play, no clear owner yet."),

  // L6 Orchestration — mostly feature-level inside L5a products.
  GAP("L6a", "feat", "Roleplay loop lives inside L5a product"),
  GAP("L6b", "feat", "In-app planner"),
  GAP("L6c", "horiz", "Horizontal multi-agent frameworks"),
  GAP("L6d", "feat", "Feature inside L5a"),
  GAP("L6e", "feat", "Feature inside L5a"),

  // L5 Execution — the filling layer.
  { id: "L5a",
    primary: ["practis", "yoodli", "hyperbound", "secondnature", "quantified", "retorio", "awarathon"],
    secondary: ["mindtickle", "allego"] },
  GAP("L5b", "feat", "Rubrics live inside L5a products"),
  GAP("L5c", "feat", "In-product RAG over scenario library"),
  WSNote("L5d",
    "⌁ Operating playbooks — NOT a product yet. Sandler and franchisor academies hold decades of it in binders. Acquisition surface sitting in plain sight."),
  { id: "L5e", secondary: ["practis", "yoodli", "quantified", "retorio"] },

  // L4 Access
  GAP("L4a", "horiz", "Horizontal integration infra"),
  GAP("L4b", "horiz", "Cross-industry protocol (MCP, emerging)"),
  GAP("L4c", "feat", "Platform feature"),
  GAP("L4d", "horiz", "Horizontal infra"),
  GAP("L4e", "ws", "⌁ Rep identity / attestation for at-the-door recording consent — open"),

  // L3 Gates — the highest-leverage empties.
  WSNote("L3a",
    "⌁ Compliance & consent — TCPA, two-party-consent recording, state door-to-door law. OPEN. Regulation makes the recording sublayer un-commoditisable — the strongest structural argument for a certification play."),
  WSNote("L3b",
    "⌁ Quality gates — no independent grader of AI-graded readiness. Every vendor grades its own homework today."),
  GAP("L3c", "horiz", "Horizontal provenance / C2PA"),
  WSNote("L3d",
    "⌁ EDITORIAL GATES — EMPTY, and the highest-leverage cell on the page. Nobody has defined what 'ready to sell at a door' means. No certificate travels between employers, franchisors, insurers."),
  { id: "L3e", primary: ["franchisors", "pesponsors"],
    gap: { kind: "ws", note: "⌁ DISTRIBUTION GATES held by non-vendors. Franchisors and PE sponsors can mandate a standard across twenty operators at once. No software company on this map can." } },

  // L2 Models
  GAP("L2a", "horiz", "Foundation labs (OpenAI / Anthropic / Google)"),
  { id: "L2b", secondary: ["quantified", "retorio"] },
  GAP("L2c", "horiz", "Horizontal infra"),
  GAP("L2d", "horiz", "Horizontal / infra"),
  GAP("L2e", "horiz", "Foundation labs"),

  // L1 Data — the fortress.
  GAP("L1a", "horiz", "Public data not scarce here"),
  WS("L1b", [], []),
  // We keep L1b as whitespace with a manual note via the primary annotation on companies.
  // Add the acquisition-target callout:
  // (rendered separately via `whitespace: true` and thesis card)
  { id: "L1c", primary: ["rilla", "siro"] },
  { id: "L1d", primary: ["rilla", "siro"],
    gap: { kind: "ws", note: "⌁ Outcome data (won / lost / closed at the door) is captured but rarely linked to the recording. That link is the L8c/L8d prerequisite." } },
  WSNote("L1e",
    "⌁ Synthetic personas (Hyperbound is the wedge). Under-built as a distinct layer."),
];

// Fix L1b — mark it as the undigitised-corpus whitespace, occupied by non-vendors.
const l1bIdx = placements.findIndex((p) => p.id === "L1b");
placements[l1bIdx] = {
  id: "L1b",
  primary: ["sandler", "franchisors"],
  whitespace: true,
  gap: {
    kind: "ws",
    note: "⌁ Undigitised playbook corpus — held by Sandler and franchisor academies in binders. Acquisition target, not a startup opportunity.",
  },
};

export const FIELD_SALES_MAP: VerticalMapData = {
  slug: "field-sales",
  label: "Field Sales",
  asOf: "Private opportunity map · working draft · Jul 2026",
  thesis:
    "Field sales is the structural inverse of the B2B Sales Tech map. In B2B, L5a is dangerously crowded and capital has already moved down to L1. Here, L5a is still filling — Practis, Yoodli, Hyperbound, Second Nature — while L1c is already the best-capitalised cell because Rilla and Siro own the field-recording corpus. The bifurcation hasn't happened yet. The most valuable empties are non-obvious: L3d Editorial Gates (nobody has defined what 'ready to sell at a door' means), L8c/L8d (empty for a commercial reason — needs three comparable clients with data rights secured at contract), L1b (Sandler and franchisor academies hold the corpus in binders — an acquisition surface, not a startup opportunity), and L3e Distribution Gates (held by franchisors and PE sponsors, not by any software company on the map).",
  whitespace: [
    { title: "L3d Editorial Gates — empty, highest-leverage cell on the page.",
      body: "Nobody has defined what 'ready to sell at a door' means, so every vendor grades its own homework and no certificate travels between employers, franchisors, or insurers. Whoever writes the rubric owns the market's yardstick." },
    { title: "L8c / L8d — empty for a commercial reason, not a technical one.",
      body: "The yardstick needs three comparable clients with data rights secured at contract. That's a discipline problem, which is why money hasn't solved it. Practis has ~2 years of one client — the honest scale of the gap, and the strongest argument for deliberate client selection starting with the next contract." },
    { title: "L1b — the undigitised playbook corpus.",
      body: "In the B2B map, L5d Operating Playbooks are 'under-built as a product.' In field sales they aren't a product at all. Sandler and the franchisor academies hold decades of it in binders. Acquisition target sitting in plain sight." },
    { title: "L3e Distribution Gates — held by non-vendors.",
      body: "Franchisors and PE roll-up sponsors can mandate a standard across twenty operators at once. No software company on this map has that power. Sell to the gatekeeper, don't try to become one." },
  ],
  scorecard: [
    { sublayer: "L1c Field-recording corpus", occupants: "Rilla, Siro", state: "scarce" },
    { sublayer: "L1b Undigitised playbook corpus", occupants: "Sandler, franchisor academies (non-vendor)", state: "open" },
    { sublayer: "L1d Outcome data (linked to recording)", occupants: "Rilla, Siro partial; link mostly missing", state: "open" },
    { sublayer: "L3a Compliance & consent (TCPA, 2-party)", occupants: "Nobody in-vertical", state: "open" },
    { sublayer: "L3d Editorial Gates (readiness rubric)", occupants: "Empty", state: "open" },
    { sublayer: "L3e Distribution Gates", occupants: "Franchisors, PE sponsors (non-vendor)", state: "open" },
    { sublayer: "L5a Domain Execution (roleplay)", occupants: "Practis, Yoodli, Hyperbound, Second Nature, Quantified, Retorio, Awarathon, Mindtickle, Allego", state: "mid" },
    { sublayer: "L5d Operating Playbooks", occupants: "None as product; Sandler holds analogue", state: "open" },
    { sublayer: "L8c Aggregated Network Learning", occupants: "Empty", state: "open" },
    { sublayer: "L8d Institutional Knowledge", occupants: "Empty", state: "open" },
    { sublayer: "L8e Learned World Models", occupants: "Empty", state: "open" },
  ],
  companies: COMPANIES,
  placements,
  genericLayers: [
    { id: "L0", note: "Vertical-agnostic — shared GPUs / silicon / data centres / cloud. Not field-sales-specific." },
    { id: "L-1", note: "Vertical-agnostic — energy, materials, fabrication. Not field-sales-specific." },
  ],
  notes:
    "PRIVATE working map. Excludes learning-delivery / compliance LMS (Cornerstone, Docebo, Litmos) — that is learning infrastructure, not field-sales AI, and belongs on its own sibling map. Excludes B2B inside sales (see /market-map/sales-tech). Non-vendors (Sandler, franchisors, PE sponsors) are placed on the grid because that's where the power sits — mark them clearly, don't pretend they're startups. Every 🟩 empty deserves one adversarial search — 'who is doing X in home services' — before this map goes public. One wrong green cell discredits the rest.",
};
