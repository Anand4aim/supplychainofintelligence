"""
Build the Supply Chain of Intelligence document set.

  public/papers/scoi-theory-brief.pdf        ~4pp   academic theory brief
  public/papers/scoi-working-paper.pdf       ~15pp  working paper
  public/papers/scoi-practitioner-guide.pdf  ~50pp  practitioner guide

Framework data is loaded from framework.json (exported from src/data/layers.ts),
so the taxonomy can never drift from the site.

Run: python3 scripts/papers/build_papers.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import build, cover_page  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "public", "papers")
DATA = json.load(open(os.path.join(HERE, "framework.json")))
LAYERS, LAWS, OBS = DATA["LAYERS"], DATA["LAWS"], DATA["OBSERVATIONS"]
AUDITQ, BANDS = DATA["AUDIT_QUESTIONS"], DATA["AUDIT_BANDS"]

VERSION = "Version 2.0"
DATE = "July 2026"
AUTHOR = "Anand Arivukkarasu"
BYLINE = ("Anand Arivukkarasu &mdash; Kellogg MBA; former product leader, Meta (Instagram); "
          "VP / Head of Product roles at Ideas2IT, Refersion, GRIN. San Francisco. "
          "Written in a personal capacity.")
LICENSE = ("Licensed CC-BY 4.0. Supply Chain of Intelligence&trade; and The Intelligence Cube&trade; "
           "are trademarks of Anand Arivukkarasu.")
CANON = "Canonical source: supplychainofai.com/framework &nbsp;&middot;&nbsp; supplychainofai.com/papers"

PROP = ("<b>Proposition IV (the Verification Boundary).</b> Wherever the output of an automated "
        "system carries fiduciary, regulatory, safety, or reputational weight, generation and "
        "verification separate into distinct economic entities &mdash; and that separation is "
        "stable under improvements in the generator's capability.")

CITE_BLOCK = [
    ("h2", "How to cite"),
    ("small", "Arivukkarasu, A. (2026). <i>Supply Chain of Intelligence: where competitive advantage "
              "accumulates in AI markets</i> (Version 2.0). https://supplychainofai.com/papers"),
    ("small", "BibTeX: @misc{arivukkarasu2026scoi, author = {Arivukkarasu, Anand}, title = {Supply "
              "Chain of Intelligence}, year = {2026}, note = {Version 2.0}, "
              "url = {https://supplychainofai.com/papers}}"),
    ("small", LICENSE),
]

REFERENCES = [
    "Akerlof, G. A. (1970). The market for &ldquo;lemons&rdquo;: quality uncertainty and the market mechanism. "
    "<i>Quarterly Journal of Economics</i>, 84(3), 488&ndash;500.",
    "Adner, R. (2017). Ecosystem as structure: an actionable construct for strategy. "
    "<i>Journal of Management</i>, 43(1), 39&ndash;58.",
    "Arrow, K. J. (1962). Economic welfare and the allocation of resources for invention. In "
    "<i>The Rate and Direction of Inventive Activity</i>. Princeton University Press.",
    "Baldwin, C. Y., &amp; Clark, K. B. (2000). <i>Design Rules: The Power of Modularity</i>. MIT Press.",
    "Barney, J. (1991). Firm resources and sustained competitive advantage. "
    "<i>Journal of Management</i>, 17(1), 99&ndash;120.",
    "Christensen, C. M. (1997). <i>The Innovator&rsquo;s Dilemma</i>. Harvard Business School Press.",
    "Coase, R. H. (1937). The nature of the firm. <i>Economica</i>, 4(16), 386&ndash;405.",
    "Holmstr&ouml;m, B. (1979). Moral hazard and observability. <i>Bell Journal of Economics</i>, 10(1), 74&ndash;91.",
    "Jacobides, M. G., Cennamo, C., &amp; Gawer, A. (2018). Towards a theory of ecosystems. "
    "<i>Strategic Management Journal</i>, 39(8), 2255&ndash;2276.",
    "Porter, M. E. (1985). <i>Competitive Advantage: Creating and Sustaining Superior Performance</i>. Free Press.",
    "Power, M. (1997). <i>The Audit Society: Rituals of Verification</i>. Oxford University Press.",
    "Rochet, J.-C., &amp; Tirole, J. (2003). Platform competition in two-sided markets. "
    "<i>Journal of the European Economic Association</i>, 1(4), 990&ndash;1029.",
    "Shapiro, C., &amp; Varian, H. R. (1998). <i>Information Rules</i>. Harvard Business School Press.",
    "Spence, M. (1973). Job market signaling. <i>Quarterly Journal of Economics</i>, 87(3), 355&ndash;374.",
    "Teece, D. J. (1986). Profiting from technological innovation. <i>Research Policy</i>, 15(6), 285&ndash;305.",
    "Williamson, O. E. (1985). <i>The Economic Institutions of Capitalism</i>. Free Press.",
]

# ── Authored operator notes, one per layer (practitioner guide) ────────
NOTES = {
    "L-1": dict(
        own="Effectively unownable by software companies. Read it as a constraint, not a market.",
        moves=["Price your compute assuming a 2&ndash;5 year interconnect queue, not a spot GPU market.",
               "Treat power-adjacent geography (Texas, Nordics, Gulf) as a real input to product latency and cost.",
               "If your roadmap assumes inference gets 10x cheaper on schedule, write down which L-1 constraint has to break for that to be true."],
        questions=["Does any part of my unit economics assume compute prices fall faster than grid capacity grows?",
                   "Who upstream of my vendor is physically constrained, and what is their lead time?",
                   "If a single fab or a single utility region slipped 18 months, which of my plans die?"],
        failure="Building a margin model on the assumption that the physical world scales like software."),
    "L0": dict(
        own="Rent. Almost no application company should own silicon or facilities.",
        moves=["Negotiate for portability (multi-cloud weights, open inference formats) rather than for price.",
               "Instrument cost per successful outcome, not cost per token; the second number lies as models change.",
               "Keep one credible fallback provider warm at all times. It is your only pricing leverage."],
        questions=["What percentage of my COGS is a single vendor's list price?",
                   "How many days would a full provider migration take today?",
                   "Does my product degrade gracefully if inference cost triples for a quarter?"],
        failure="Confusing a favourable startup credit programme with a durable cost structure."),
    "L1": dict(
        own="Own L1b, L1c, L1d. This is the most reliably defensible position available to an application company.",
        moves=["Design the product so that ordinary usage produces outcome data (L1d) nobody else observes.",
               "Write data rights into the contract on day one; retrofitting consent is close to impossible.",
               "Separate the corpus from the model. Corpora survive model generations; fine-tunes do not."],
        questions=["What do I know about my customers' work that a frontier lab structurally cannot observe?",
                   "If a competitor copied my UI exactly tomorrow, what would still take them three years to accumulate?",
                   "Am I capturing what happened after the model acted, or only what the model produced?"],
        failure="Calling a scraped public dataset &ldquo;proprietary&rdquo; because it is stored in your database."),
    "L2": dict(
        own="Rent early. Fine-tune only where a measurable domain gap survives the next frontier release.",
        moves=["Abstract the model behind an internal interface; assume you will swap it twice a year.",
               "Route by task economics (L2d): cheap model for volume, frontier model for the 5% that carries risk.",
               "Keep an evaluation set that is about your customers, not about benchmarks."],
        questions=["If the frontier model improves 30% next quarter, does my product get better or get redundant?",
                   "What do I do that survives the model owner shipping the same loop for free?",
                   "Is my fine-tune a moat, or a maintenance liability?"],
        failure="Treating a system prompt as intellectual property."),
    "L3": dict(
        own="Own it if trust is your product. Otherwise integrate with the incumbent verifier rather than competing with it.",
        moves=["Map the certifications your buyer must hold, then decide whether you help them hold it or hold it for them.",
               "If you generate, do not also claim to verify your own output; buyers discount self-attestation to zero.",
               "Build the evidence trail (who approved what, when, on what basis) as a first-class product object."],
        questions=["Whose signature is on the line when my output is wrong?",
                   "Would my buyer's auditor accept my own logs as evidence?",
                   "Is there a regulator, insurer, or board committee that already requires a second party here?"],
        failure="Assuming a capable model removes the need for an independent verifier. It never has, in any industry."),
    "L4": dict(
        own="Own your integration surface. Rent the protocols.",
        moves=["Write back into the system of record; read-only integrations are trivially replaced.",
               "Adopt open agent protocols early but keep the permission and audit model proprietary.",
               "Treat agent identity (L4e) as a product feature the moment an agent acts on a customer's behalf."],
        questions=["If my integration disappeared overnight, what would break in my customer's workflow?",
                   "Do I own the credentials and the audit trail, or does my customer's IT department?",
                   "Is any integration of mine a thin wrapper on a public API that the platform could publish itself?"],
        failure="Counting logos on an integrations page as if they were switching costs."),
    "L5": dict(
        own="Own it, deeply and narrowly. Generic execution is absorbed; encoded domain judgement is not.",
        moves=["Encode the decisions experts make, not just the tasks they perform.",
               "Ship playbooks (L5d) that customers configure and then depend on; configuration becomes lock-in.",
               "Measure work completed to an accepted standard, not outputs generated."],
        questions=["Could a competent generalist with a frontier model reproduce 80% of my value in a weekend?",
                   "What judgement in my domain is expensive to be wrong about, and do I encode it?",
                   "Do my customers hire fewer people because of me, or just produce more drafts?"],
        failure="Depth theatre: many features, none of them load-bearing in a real workflow."),
    "L6": dict(
        own="Own the loop only where reliability is the product. Otherwise expect L2 and L7 to absorb it.",
        moves=["Invest in runtime assurance and recovery (L6e) rather than in more elaborate planning.",
               "Make human-in-the-loop (L6b) a designed product surface, not a fallback error path.",
               "Track task completion rate over long horizons; it is the only orchestration metric buyers repeat."],
        questions=["Is my orchestration a differentiator or a feature the model layer will ship next release?",
                   "What happens on step seven of a ten-step task when step three was subtly wrong?",
                   "Who is accountable when the loop fails, and does the product make that person's job easier?"],
        failure="Building a general-purpose agent framework in a market that pays for one reliable workflow."),
    "L7": dict(
        own="Own placement and habit; do not expect to own modality.",
        moves=["Chase the moment of consumption, not the elegance of the interface.",
               "Embed where the work already happens (L7c) instead of asking for a new destination.",
               "If you own a transaction surface (L7d), instrument it; that is where the surplus lands."],
        questions=["Am I a destination the user must remember, or a surface already in front of them?",
                   "What is my default placement worth, and what would it cost a competitor to buy it?",
                   "If the interface were commoditized tomorrow, what would remain?"],
        failure="Winning a design award in a category the platform ships for free six months later."),
    "L8": dict(
        own="Own it. Memory is the only asset that gets more valuable while you sleep.",
        moves=["Distinguish memory of events (defensible) from claims about truth (which inherit a regulator).",
               "Make institutional memory (L8d) exportable in principle and painful in practice &mdash; trust, then gravity.",
               "Aggregate learning across customers (L8c) only with contractual clarity; this is the fastest way to lose an enterprise account."],
        questions=["Does my product measurably improve for a customer in month twelve versus month one?",
                   "What would a departing customer lose that they could not reconstruct?",
                   "Am I storing history, or compounding it?"],
        failure="Persisting a chat transcript and calling it memory."),
}

TIERS = [
    ("Substrate", "L-1, L0, L1, L2, L3, L8", "What users depend on. Compounds in years.",
     "Proprietary data, trust gates, compounding memory. Slow to build, slow to lose."),
    ("Workflow", "L4, L5, L6", "What users live inside. Survives in months.",
     "Sticky if deep, owned, and integrated. Absorbed if generic."),
    ("Surface", "L7", "What users touch. Commoditizes in weeks.",
     "Platforms ship this for free. Placement and habit are the only durable parts."),
]

CURRENTS = [
    ("Current I &mdash; Demand Gravity", "Where the budget actually sits, and what it pulls toward.",
     "As L2 prices collapse, discretionary spend migrates from buying generation to buying outcomes "
     "(L5 + L8), verification (L3), and access to proprietary data (L1). A defensible layer with no "
     "buyer is worth zero.",
     "Name the buyer, the budget line, and the line item they stop paying for once L2 is free."),
    ("Current II &mdash; Attention Economics", "What becomes scarce when generation becomes infinite.",
     "Default placement, OS integration, habit loops and on-ramp ownership decide which intelligence "
     "is actually used. The large surfaces operate as landlords charging rent in attention. Law III "
     "names the asymmetry; this Current prices it.",
     "Assume infinite supply. Ask who owns the on-ramp and what default placement costs."),
    ("Current III &mdash; Capital Flows", "How funding rounds bend the layers they fund.",
     "Capital is reflexive. Tens of billions into L2 produced a generation glut; near-zero into L-1 "
     "produced the physical bottleneck now constraining everything above it. Capital overheats the "
     "fashionable layer and starves the unglamorous one.",
     "Read the funding map as a distortion field, not as a value signal."),
]

ARCHETYPES = [
    ("Data Refineries", "Safe", "L1b proprietary data compounds faster than competitors can accumulate it.", "Apollo, Bloomberg"),
    ("Infrastructure Rails", "Safe", "L4b / L4e &mdash; essential pipes and agent identity, boring and load-bearing.", "Supabase, Twilio"),
    ("Workflow Fortresses", "Contested", "L5 + L6b &mdash; the system of record plus human-in-the-loop control.", "Salesforce, HubSpot"),
    ("Domain Specialists", "Safe", "L5a/b/d plus L8c &mdash; encoded expertise that improves with use.", "Harvey, Sierra"),
    ("Thin-Layer Surfaces", "Exposed", "L7a / L7b with no deeper layer owned. Absorbed on the platform's schedule.", "Jasper (2023), most 2024 wrappers"),
    ("Full-Stack Juggernauts", "Dominant", "L2a plus L7c/d plus L8c &mdash; generation, surface and memory in one entity.", "ChatGPT, Copilot, Gemini"),
]


# ══════════════════════════════════════════════════════════════════════
# 1. FOUR-PAGE ACADEMIC THEORY BRIEF
# ══════════════════════════════════════════════════════════════════════
def theory_brief():
    cover = cover_page(
        "The Verification Boundary",
        "Why generation and verification separate into distinct firms as artificial "
        "intelligence commoditizes",
        "Academic theory brief \u00b7 " + VERSION,
        [BYLINE, CANON, LICENSE],
        abstract=(
            "This brief contains one primary theoretical claim and a small number of supporting "
            "constructs. The claim is that in any market where automated output carries fiduciary, "
            "regulatory, safety, or reputational weight, the generator and the verifier of that "
            "output separate into distinct economic entities, and the separation is stable under "
            "improvements in generator capability. The claim implies a predictable boundary on "
            "platform expansion: firms that supply generation can integrate forward into adjacent "
            "workflow and interface layers, but cannot credibly integrate into the verification "
            "function performed above themselves. The brief states the proposition, positions it "
            "against appropriability, ecosystem, modularity, and information-asymmetry literatures, "
            "specifies boundary conditions, and offers falsifiable predictions with explicit "
            "refutation criteria. The broader taxonomy from which the proposition is drawn &mdash; a "
            "ten-layer supply chain of intelligence &mdash; is deliberately relegated to appendices "
            "and companion documents."))

    b = []
    b += [("h1", "1. The proposition"),
          ("callout", ("Proposition IV &mdash; the Verification Boundary", PROP.split("</b> ")[1])),
          ("p", "Three terms need fixing before the claim can be evaluated."),
          ("bullets", [
              "<b>Generation</b> is the production of a candidate output: a draft, a diagnosis, a "
              "configuration, a line of code, a valuation, a filing.",
              "<b>Verification</b> is an assertion, addressed to a third party, that the output meets "
              "a standard. It is not quality control. Quality control is internal and self-interested; "
              "verification is external and is consumed by someone who did not commission the work.",
              "<b>Economically valuable trust</b> exists when a party outside the transaction &mdash; a "
              "regulator, an insurer, an auditor, a court, a board, a counterparty &mdash; conditions "
              "money or permission on the assertion being credible.",
          ]),
          ("p", "The proposition is therefore not a claim about technical capability. It concedes, in "
                "advance, that the generator may become strictly better than the verifier at detecting "
                "its own errors. The claim is that this improvement does not dissolve the separation, "
                "because the separation is not produced by a capability gap. It is produced by the "
                "structure of who is permitted to make a credible assertion about whom."),
          ("h2", "The forcing mechanism"),
          ("numbers", [
              "<b>Self-referential attestation carries no information.</b> Following Spence (1973), a "
              "signal is informative only when it is costlier to send falsely than truthfully. An "
              "attestation issued by the party that produced the output has near-zero differential "
              "cost, so a rational receiver discounts it toward zero regardless of its accuracy.",
              "<b>Liability must be assignable to a solvent, separable party.</b> Bundling generation "
              "and verification collapses two claims into one balance sheet, which destroys the "
              "insurability of the transaction. Insurers price separation explicitly.",
              "<b>Demand for verification is created by third parties, not by the buyer.</b> The buyer "
              "would often prefer the bundle: it is cheaper. Regulators, auditors and insurers prevent "
              "the bundle from forming. Institutional constraints of this kind harden over time rather "
              "than eroding (Power, 1997).",
              "<b>Buyers pay a duplication tax to avoid a single-point-of-failure tax.</b> Where one "
              "vendor's error is unrecoverable, procurement selects two vendors. This is observable "
              "and priced: it is the two-vendor rule.",
          ]),
          ("h1", "2. What is genuinely new"),
          ("p", "Existing theory explains a great deal of what happens in AI markets. It does not, in "
                "the author's reading, generate this boundary. The table states the relationship "
                "precisely rather than claiming a vacuum."),
          ("table", ([
              ["Prior work", "What it already explains", "What Proposition IV adds"],
              ["Teece (1986), appropriability and complementary assets",
               "Why innovators capture value only when they hold the complementary assets; why "
               "specialized assets shift bargaining power.",
               "Identifies verification as a complementary asset that <i>cannot be acquired by the "
               "innovator without destroying its value</i>. Standard appropriability logic predicts "
               "integration; here integration is self-defeating."],
              ["Porter (1985), positioning and value chains",
               "Where margin sits in a chain, and how firms defend a position.",
               "Supplies an endogenous rule for where a chain must break into separate firms, rather "
               "than treating firm boundaries as a managerial choice."],
              ["Baldwin &amp; Clark (2000), modularity",
               "How interfaces partition technical systems and where options accumulate.",
               "The boundary here is institutional, not technical. It persists even when the "
               "interface cost of integration is zero."],
              ["Jacobides et al. (2018); Adner (2017), ecosystems",
               "Complementarity, bottlenecks, and multilateral dependence in ecosystems.",
               "Predicts which ecosystem role is structurally non-absorbable by the hub, and gives "
               "the condition under which hub expansion stops."],
              ["Akerlof (1970); Spence (1973); Holmstr&ouml;m (1979)",
               "Adverse selection, signalling, and moral hazard under asymmetric information.",
               "Applies the signalling condition to a firm-boundary prediction in a market where the "
               "informed party's capability is rising rapidly, and shows why rising capability does "
               "not relax the constraint."],
              ["Coase (1937); Williamson (1985)",
               "Firm boundaries as a function of transaction and governance costs.",
               "Adds a credibility constraint that operates in the opposite direction to transaction "
               "cost: integrating reduces cost while destroying the asset's economic function."],
          ], [1.55, 2.4, 2.55])),
          ("pagebreak"),
          ("h1", "3. Boundary conditions"),
          ("p", "The proposition is intended to be narrow enough to be wrong. It applies where all "
                "three conditions hold."),
          ("bullets", [
              "<b>Consequence.</b> Errors in the output impose losses on a party other than the "
              "producer, and those losses are not fully recoverable by rework.",
              "<b>External conditioning.</b> Some third party conditions money, permission, or "
              "admissibility on the output being certified.",
              "<b>Observable standard.</b> A standard exists, or can be constructed, against which "
              "conformity can be asserted.",
          ]),
          ("p", "Where these do not hold &mdash; casual content generation, internal drafting, "
                "entertainment, exploratory analysis &mdash; the proposition makes no prediction, and "
                "bundled generation-plus-checking should be expected to dominate. This is why the "
                "consumer AI market shows no verification layer and the clinical, financial, legal, "
                "and safety-critical markets show a durable one."),
          ("h1", "4. Falsifiable predictions"),
          ("p", "Each prediction states an observable and the observation that would refute it. All "
                "are stated over a five-year horizon from publication."),
          ("table", ([
              ["#", "Prediction", "Refuted if"],
              ["P1", "No frontier model provider will issue binding third-party certification of its "
                     "own outputs that a regulated buyer accepts in place of an independent verifier.",
               "A model provider's self-issued attestation is accepted by an auditor, insurer, or "
               "regulator as a substitute for independent verification in a regulated workflow."],
              ["P2", "In regulated verticals, verification vendors will show lower revenue churn and "
                     "longer contract duration than generation vendors serving the same buyers.",
               "Verification vendors churn at or above generation vendors over a comparable cohort."],
              ["P3", "Improvements in generator accuracy will not reduce spend on independent "
                     "verification; verification spend will be flat or rising as generation improves.",
               "A sustained decline in verification spend that tracks generator accuracy improvements, "
               "controlling for total AI spend."],
              ["P4", "Platform expansion from generation will proceed into adjacent execution, "
                     "orchestration and interface functions, but will stop at verification performed "
                     "above the platform itself.",
               "A generation platform successfully absorbs the verification function above it and "
               "retains regulated-buyer acceptance for more than two audit cycles."],
              ["P5", "Where a verification requirement is newly imposed by regulation, an independent "
                     "verification vendor will emerge or be acquired-and-ring-fenced within two years, "
                     "rather than the function being absorbed by incumbent generators.",
               "Newly regulated domains routinely resolve into single-vendor generation-plus-"
               "verification without structural separation."],
          ], [0.4, 3.2, 2.9])),
          ("h2", "What would refute the proposition as a whole"),
          ("p", "A single, well-documented market in which all three boundary conditions hold and the "
                "generator's own attestation is durably accepted by the conditioning third party would "
                "force an amendment. Capability arguments alone would not: the proposition explicitly "
                "predicts that the generator becomes more accurate and the separation persists anyway."),
          ("h1", "5. Supporting constructs, deliberately deferred"),
          ("p", "The proposition sits inside a larger descriptive framework, the Supply Chain of "
                "Intelligence, which partitions generative AI markets into ten layers from physical "
                "resources to compounding memory, and states three further structural regularities "
                "about where value migrates. That taxonomy is an instrument for locating firms; it is "
                "not part of the theoretical claim, and evaluating the claim does not require "
                "accepting it. It is documented in the companion working paper (Appendix A) and in the "
                "practitioner guide, and is available in full at the canonical source."),
          ("h1", "References"),
          ]
    b += [("ref", r) for r in REFERENCES]
    b += [("space", 8)] + CITE_BLOCK
    return build(os.path.join(OUT, "scoi-theory-brief.pdf"), b,
                 "The Verification Boundary · Theory Brief", cover)


# ══════════════════════════════════════════════════════════════════════
# 2. FIFTEEN-PAGE WORKING PAPER
# ══════════════════════════════════════════════════════════════════════
def working_paper():
    cover = cover_page(
        "Supply Chain of Intelligence",
        "A framework for understanding where competitive advantage accumulates in AI markets",
        "Working paper \u00b7 " + VERSION + " \u00b7 " + DATE,
        [BYLINE, CANON, LICENSE],
        abstract=(
            "As generative capability commoditizes, the question of where durable advantage "
            "accumulates in artificial intelligence markets is unresolved by existing strategy "
            "theory, which was built for markets in which the scarce input was the technology "
            "itself. This paper develops a supply-chain treatment of generative AI: ten layers of "
            "production from physical resources to compounding memory, crossed by three market "
            "currents that determine whether a defensible position becomes a viable business. From "
            "that structure it derives four propositions, of which one is primary: wherever output "
            "carries fiduciary, regulatory, safety, or reputational weight, generation and "
            "verification separate into distinct economic entities, and that separation is stable "
            "under improvements in generator capability. The paper positions this claim against "
            "appropriability, ecosystem, modularity, and information-asymmetry literatures; presents "
            "six market vignettes consistent with it; states falsifiable predictions and refutation "
            "criteria; and discusses the alternative explanations that would make the claim "
            "redundant. The taxonomy is treated as an instrument for locating firms rather than as "
            "the contribution."))

    b = []
    b += [("h1", "Contents"),
          ("toc", "1. Introduction &mdash; the wrong question about AI advantage"),
          ("toc", "2. Related literature"),
          ("toc", "3. The framework: ten layers and three currents"),
          ("toc", "4. Four structural propositions"),
          ("toc", "5. Proposition IV in detail: the verification boundary"),
          ("toc", "6. Market vignettes"),
          ("toc", "7. Predictions and tests"),
          ("toc", "8. Alternative explanations"),
          ("toc", "9. Limitations"),
          ("toc", "10. Contribution and research agenda"),
          ("toc", "References &middot; Appendix A: the ten layers &middot; Appendix B: the propositions on one card"),
          ("pagebreak")]

    b += [("h1", "1. Introduction"),
          ("p", "The dominant question asked of artificial intelligence markets between 2023 and 2026 "
                "was which model would win. It was the wrong question, in the specific sense that its "
                "answer does not determine the distribution of profit. Model capability improved by "
                "roughly an order of magnitude over that period while the price of a unit of "
                "capability fell by more; the firms that captured durable margin were, with few "
                "exceptions, not the firms that produced the capability."),
          ("p", "This is not anomalous. It is the ordinary behaviour of an industrial supply chain. "
                "Value in a supply chain concentrates at scarcity, is squeezed at bottlenecks, and "
                "migrates the moment a layer below commoditizes what the layer above was charging for. "
                "The mistake embedded in the popular &ldquo;AI stack&rdquo; diagram is not that it is "
                "inaccurate about the technical dependency order &mdash; it is largely correct about "
                "that &mdash; but that it implies value flows cleanly upward with the dependency. It "
                "does not."),
          ("quote", "&ldquo;Intelligence is a supply chain. Value accrues at the bottlenecks, not at "
                    "the most visible node.&rdquo;"),
          ("p", "This paper takes that sentence seriously and asks what follows from it. Section 3 "
                "sets out the production structure: ten layers, crossed by three market currents. "
                "Section 4 states four structural propositions. Section 5 develops the primary claim, "
                "the verification boundary, which is the paper's candidate contribution to theory. The "
                "remainder positions, evidences, and attempts to falsify it."),
          ("p", "A note on register. The taxonomy in Section 3 is an instrument. It is useful for "
                "locating a firm precisely enough to argue about it, and it is used throughout as a "
                "shared coordinate system. It is not the theoretical claim, and a reader who rejects "
                "the partition entirely can still evaluate Section 5 on its own terms."),
          ("h1", "2. Related literature"),
          ("h2", "2.1 Appropriability and complementary assets"),
          ("p", "Teece (1986) established that innovators capture value from an innovation only when "
                "they control the complementary assets required to commercialise it, and that "
                "specialized complementary assets shift bargaining power decisively. Applied to "
                "generative AI, the literature's natural prediction is that model producers, holding "
                "the innovation, will integrate forward into whichever complementary assets are "
                "specialized, and will capture the resulting rents. Much of what has happened is "
                "consistent with that prediction: model providers have integrated into interfaces, "
                "agents, developer tooling, and consumer surfaces. Section 5 argues there is exactly "
                "one class of complementary asset for which the prediction inverts, because "
                "acquisition destroys the asset."),
          ("h2", "2.2 Positioning, resources, and the value chain"),
          ("p", "Porter (1985) supplies the vocabulary of chains and positions; Barney (1991) supplies "
                "the resource-based conditions for a resource to sustain advantage. Both are "
                "compatible with the framework here and neither is displaced by it. What neither "
                "supplies is an endogenous rule that predicts <i>where a chain must break into "
                "separate firms</i>. Firm boundaries in both traditions are treated as a strategic "
                "choice subject to cost and capability constraints."),
          ("h2", "2.3 Modularity and interfaces"),
          ("p", "Baldwin and Clark (2000) explain how interfaces partition systems and where option "
                "value accumulates at module boundaries. The verification boundary described here is "
                "not of this kind: it survives even when the technical cost of integrating across it "
                "falls to zero, because the constraint is institutional rather than architectural. "
                "Distinguishing institutional from architectural boundaries is, in the author's view, "
                "underdeveloped in the AI strategy literature."),
          ("h2", "2.4 Ecosystems and platform expansion"),
          ("p", "Jacobides, Cennamo and Gawer (2018) and Adner (2017) formalise complementarity and "
                "bottlenecks in ecosystems and give a language for hub roles. The open question in "
                "that literature, sharpened by the current wave, is where hub expansion stops. "
                "Proposition IV proposes a specific, testable answer for one class of role."),
          ("h2", "2.5 Information asymmetry, signalling, and audit"),
          ("p", "Akerlof (1970), Spence (1973) and Holmstr&ouml;m (1979) provide the mechanism that "
                "makes the verification boundary work: a signal informs only if it is differentially "
                "costly to send falsely. Power (1997) documents how societies institutionalise "
                "verification and, importantly, that such institutions ratchet rather than relax. The "
                "contribution here is to run this machinery forward into a firm-boundary prediction in "
                "a market where the informed party's capability is improving faster than in any "
                "previously studied setting."),
          ("h2", "2.6 What remains unexplained"),
          ("p", "Taken together, the literatures explain why capability alone does not confer "
                "advantage, why complementary assets matter, and why information asymmetry sustains "
                "intermediaries. They do not, jointly, predict that the most capable firm in a market "
                "will be structurally barred from performing a specific adjacent function <i>because "
                "of its capability rather than in spite of it</i>. That is the claim under test."),
          ("h1", "3. The framework: ten layers and three currents"),
          ("p", "The production structure is partitioned into ten layers. The partition is a "
                "descriptive instrument chosen for one property: each layer names a place where a firm "
                "can hold a position that another firm must pay to cross. Full definitions, including "
                "fifty sublayers, are in Appendix A."),
          ("table", ([["Layer", "What is produced or controlled", "Structural read"]] +
                     [[f"<b>{l['id']} {l['name']}</b>", l["desc"], l["verdict"]] for l in LAYERS],
                     [1.15, 3.05, 2.3])),
          ("p", "The layers group into three registers with sharply different half-lives. The "
                "distinction matters more than the individual layer names: it is the reason that two "
                "products which look identical to a user can have entirely different futures."),
          ("table", ([["Register", "Layers", "Half-life", "Behaviour"]] +
                     [[f"<b>{n}</b>", ls, hl, beh] for n, ls, hl, beh in TIERS],
                     [1.0, 1.35, 1.75, 2.4])),
          ("p", "The ten layers describe supply. They are crossed by three market currents that "
                "determine whether a position at any layer compounds into a business or starves. "
                "Geopolitics and regulation are not currents in this treatment: they act at their "
                "native layers (physical resources and gatekeeping respectively), and promoting them "
                "would double-count."),
          ]
    for title, one, desc, use in CURRENTS:
        b += [("h2", title), ("p", f"<i>{one}</i> {desc}"),
              ("small", f"<b>Operationalisation:</b> {use}")]
    b += [("p", "Two of three currents pointing at a layer is a tailwind. Three is a category. None "
                "is a press release.")]

    b += [("h1", "4. Four structural propositions")]
    for law in LAWS:
        b += [("h2", f"Proposition {law['num']} &mdash; {law['title']}"),
              ("p", law["desc"]),
              ("small", f"<b>{law['prediction']}</b> Illustration: {law['example']}")]
    b += [("p", "Propositions I to III are structural regularities: they organise observation and "
                "generate expectations, but each is close to a restatement of established results in "
                "commoditization, bottleneck, and platform-competition literatures. Proposition IV is "
                "the one the author submits as a genuine candidate for extension, and the remainder of "
                "the paper is devoted to it.")]

    b += [("h1", "5. Proposition IV in detail: the verification boundary"),
          ("callout", ("The claim", PROP.split("</b> ")[1])),
          ("h2", "5.1 Definitions"),
          ("bullets", [
              "<b>Generation</b>: production of a candidate output.",
              "<b>Verification</b>: an assertion to a third party that the output conforms to a "
              "standard. Distinct from internal quality control by its audience and its purpose.",
              "<b>Economically valuable trust</b>: a state in which a party outside the transaction "
              "conditions money, permission, or admissibility on the assertion being credible.",
          ]),
          ("h2", "5.2 Mechanism"),
          ("numbers", [
              "<b>Signalling.</b> Self-attestation is not differentially costly and therefore carries "
              "no information to a rational receiver (Spence, 1973). Accuracy is irrelevant to this "
              "argument, which is why capability improvements do not relax the constraint.",
              "<b>Liability separation.</b> Insurability requires that the party bearing the residual "
              "risk be separable and solvent. A bundled generator-verifier collapses two claims onto "
              "one balance sheet and raises the cost of insuring the transaction.",
              "<b>Third-party demand.</b> The buyer often prefers the bundle on price. Demand for "
              "separation originates with regulators, insurers, auditors, and boards, and those "
              "institutions ratchet (Power, 1997).",
              "<b>Procurement behaviour.</b> Where a single error is unrecoverable, buyers pay a "
              "duplication tax rather than accept single-point-of-failure risk. This is observable in "
              "security, audit, clinical, and financial procurement, and it predates AI.",
          ]),
          ("h2", "5.3 Why capability improvement does not dissolve the boundary"),
          ("p", "The intuitive objection is that a sufficiently capable model will detect its own "
                "errors better than any external verifier, at which point the external verifier is "
                "pure deadweight. The objection conflates two functions. Error detection is a "
                "capability; verification is an institutional position. A firm can be the best "
                "possible detector of its own errors and still be unable to produce a credible "
                "assertion about them, for the same reason that a company cannot audit its own "
                "accounts however good its controllers are. If anything, the boundary hardens with "
                "capability: as generated output becomes more plausible, the cost of an undetected "
                "error rises and the value of independent attestation rises with it."),
          ("h2", "5.4 Corollaries"),
          ("bullets", [
              "<b>The two-vendor rule.</b> Enterprises will pay for two vendors where one vendor's "
              "mistake is unrecoverable.",
              "<b>Bundling asymmetry.</b> Generation platforms expand into adjacent execution, "
              "orchestration and interface functions freely, and stop at verification performed above "
              "themselves. The stopping point is predictable in advance.",
              "<b>Regulatory half-life.</b> Verification positions written into regulation have a "
              "half-life measured in the regulatory cycle, not in the model cycle. Models turn over in "
              "months; certification regimes in years.",
              "<b>Memory is not truth.</b> A system may hold memory of events defensibly; the moment "
              "it asserts a claim about the world that a third party relies on, it inherits a verifier."
          ]),
          ("h1", "6. Market vignettes"),
          ("p", "These are illustrations, not tests. They are included because a proposition that "
                "cannot be pointed at is not useful, and because each names a case where the "
                "alternative outcome was plausible and did not occur."),
          ("table", ([
              ["Case", "Structure", "What it illustrates"],
              ["Compliance attestation above cloud infrastructure",
               "Independent verification vendors sit above hyperscalers whose engineering capability "
               "vastly exceeds theirs.",
               "The most capable party in the chain pays a less capable party for attestation. "
               "Capability does not determine who verifies."],
              ["Code security above code generation",
               "Security review is procured from a different vendor than code generation, even where "
               "the generating vendor ships review features.",
               "Procurement enforces the boundary before regulation does."],
              ["Statutory audit above enterprise systems",
               "Decades-old separation between the system that records transactions and the firm that "
               "attests to them.",
               "The pre-AI base rate. The separation was not produced by a capability gap and does "
               "not close as systems improve."],
              ["Drafting versus approval in legal work",
               "Generation of contract language and approval of contract risk resolve into different "
               "products and often different vendors.",
               "The drafter is structurally not permitted to be the approver."],
              ["Thin surface versus deep chain in the same category",
               "Two products with near-identical interfaces, one owning only the interface, the other "
               "owning access, execution, orchestration and memory.",
               "Proposition III: feature parity is not structural parity."],
              ["Wrapper absorption after a platform release",
               "A generation-only product priced at a subscription is absorbed when the layer beneath "
               "ships the same loop at zero marginal price.",
               "Proposition I, and the price-floor mechanism behind it."],
          ], [1.6, 2.45, 2.45])),
          ("h1", "7. Predictions and tests"),
          ("p", "The five predictions below are stated over a five-year horizon. Each is accompanied "
                "by the observation that would refute it. The companion theory paper (v4.1) is the "
                "canonical statement and carries an expanded set of six predictions with "
                "refutation criteria and coding rules."),
          ("numbers", [
              "No frontier model provider issues self-certification that a regulated buyer accepts in "
              "place of independent verification.",
              "In regulated verticals, verification vendors show lower churn and longer contract "
              "duration than generation vendors serving the same buyers.",
              "Verification spend does not fall as generator accuracy rises, controlling for total AI "
              "spend.",
              "Platform expansion from generation stops at verification performed above the platform.",
              "Newly regulated domains produce independent verification vendors within two years "
              "rather than absorption by incumbent generators.",
          ]),
          ("p", "Two of these &mdash; churn differential and verification spend &mdash; are testable "
                "with existing vendor-level data and are the most productive near-term empirical "
                "targets. The remaining three require case identification."),
          ("h1", "8. Alternative explanations"),
          ("p", "The proposition is redundant if any of the following fully accounts for the observed "
                "separation. Each is stated at its strongest."),
          ("bullets", [
              "<b>Regulatory capture.</b> Separation persists because incumbent verifiers lobby for "
              "it, not because of any structural necessity. This predicts the boundary appears only "
              "where an incumbent verification industry pre-exists, and should be absent in newly "
              "regulated domains. Prediction 5 discriminates between the two accounts.",
              "<b>Transitional capability gap.</b> Separation is a temporary artefact of models not "
              "yet being reliable enough. This predicts verification spend declines as accuracy "
              "improves. Prediction 3 discriminates.",
              "<b>Simple division of labour.</b> Separation reflects ordinary specialisation "
              "economics. This fails to explain why the specialisation is enforced rather than merely "
              "efficient, and why buyers refuse the bundle when it is cheaper.",
              "<b>Brand and switching cost.</b> Verification incumbents persist on inertia. This "
              "predicts erosion as challengers with better technology enter; the observed pattern is "
              "that challengers who generate are refused the verification role regardless of quality.",
          ]),
          ("h1", "9. Limitations"),
          ("bullets", [
              "The evidence presented is illustrative, not systematic. No dataset is constructed here; "
              "the vignettes are selected to include cases where the alternative outcome was plausible, "
              "but selection risk remains.",
              "The boundary conditions do the work of narrowing the claim, and they are stated "
              "qualitatively. Operationalising &ldquo;economically valuable trust&rdquo; for coding "
              "purposes is unresolved.",
              "The layer taxonomy is a descriptive convenience with no claim to uniqueness. Different "
              "partitions of the same market are possible and may be more useful for other questions.",
              "The framework is descriptive rather than predictive at the firm level: it identifies "
              "which layers a firm holds and which currents are moving, not which firm wins.",
              "The author is a practitioner, not an academic economist, and the paper is written "
              "in a personal capacity. Formalisation and empirical testing are invited rather than "
              "claimed.",
          ]),
          ("h1", "10. Contribution and research agenda"),
          ("p", "The intended contribution is narrow: a boundary condition on forward integration in "
                "markets where output requires attestation, derived from signalling rather than from "
                "capability, and stated so that it can be refuted. If it survives, it supplies "
                "something the appropriability and ecosystem literatures currently lack, which is a "
                "prediction of where the most capable firm in a market is structurally barred from "
                "expanding."),
          ("p", "Three empirical projects would advance it materially: a churn and contract-duration "
                "comparison between verification and generation vendors serving the same regulated "
                "buyers; a spend series testing whether verification budgets move inversely with "
                "generator accuracy; and a case series on newly regulated AI domains observing whether "
                "verification resolves into independent firms or is absorbed. The author would welcome "
                "collaboration on any of the three, and would treat a clean refutation as the most "
                "valuable possible outcome."),
          ("h1", "References")]
    b += [("ref", r) for r in REFERENCES]

    b += [("pagebreak"), ("h1", "Appendix A &mdash; the ten layers and fifty sublayers")]
    for l in LAYERS:
        b += [("h2", f"{l['id']} {l['name']}"), ("small", l["desc"]),
              ("table", ([["Sublayer", "Definition"]] +
                         [[f"<b>{s['id']}</b> {s['name']}" + (" &#9733;" if s.get("defensible") else ""),
                           s["desc"]] for s in l["sublayers"]], [1.85, 4.65]))]
    b += [("small", "&#9733; marks sublayers where durable defensibility is most often observed at the "
                    "application layer.")]

    b += [("pagebreak"), ("h1", "Appendix B &mdash; the four propositions on one card"),
          ("table", ([["", "Claim", "Predicts", "Illustration"]] +
                     [[f"<b>{l['num']}</b>", l["shortTitle"], l["prediction"].replace("Predicts ", ""),
                       l["example"]] for l in LAWS], [0.35, 2.0, 1.5, 2.65])),
          ("space", 10)]
    b += CITE_BLOCK
    return build(os.path.join(OUT, "scoi-working-paper.pdf"), b,
                 "Supply Chain of Intelligence · Working Paper", cover)


# ══════════════════════════════════════════════════════════════════════
# 3. PRACTITIONER GUIDE (~50pp)
# ══════════════════════════════════════════════════════════════════════
def practitioner_guide():
    cover = cover_page(
        "Supply Chain of Intelligence",
        "The practitioner guide: taxonomy, laws, instruments, and applications for operators "
        "and investors",
        "Practitioner guide \u00b7 " + VERSION + " \u00b7 " + DATE,
        [BYLINE, CANON, LICENSE],
        abstract=(
            "This is the operational companion to the theory. It contains the full ten-layer "
            "taxonomy with all fifty sublayers, the four structural laws with their mechanisms and "
            "escapes, the three market currents, six repeatable market patterns, six company "
            "archetypes, two instruments for placing a company on the map, a defensibility audit you "
            "can run in an afternoon, worked applications for product leaders and investors, and a "
            "glossary. It assumes no prior familiarity with the framework and makes no attempt to "
            "argue for it academically; the argument lives in the companion working paper."))

    b = []
    b += [("h1", "How to use this guide"),
          ("p", "Read Part I once. Use Parts II and III as reference. Run Part VI on your own product "
                "or portfolio before you read Part VII, so the case studies land against a position "
                "you have already taken."),
          ("table", ([
              ["If you are", "Start at", "Then"],
              ["A product leader deciding what to build next",
               "Part VI, the defensibility audit", "Part II for the layers you scored badly on, then Part VIII.1"],
              ["An investor writing a thesis or running diligence",
               "Part III, the four laws", "Part V archetypes, Part VI instruments, Part VIII.2"],
              ["A founder choosing where to start",
               "Part I, then Part IV currents", "Part II L1, L5, L8, then Part VII"],
              ["An operator designing an agent system",
               "Part VIII.3, the reference architecture", "Part II L4, L5, L6, L8"],
          ], [2.1, 2.0, 2.4])),
          ("h2", "Contents"),
          ("toc", "Part I &mdash; Foundations: the definition, why supply chain rather than stack, the three registers"),
          ("toc", "Part II &mdash; The map: ten layers, fifty sublayers, operator notes for each"),
          ("toc", "Part III &mdash; The four laws and how to use them"),
          ("toc", "Part IV &mdash; The three currents"),
          ("toc", "Part V &mdash; Dynamics: six patterns, six archetypes"),
          ("toc", "Part VI &mdash; Instruments: the Defensible Triangle, the Intelligence Cube, the audit"),
          ("toc", "Part VII &mdash; Worked readings"),
          ("toc", "Part VIII &mdash; Applications: roadmap, diligence, agent architecture, market maps"),
          ("toc", "Part IX &mdash; Glossary, and how to cite"),
          ("pagebreak")]

    # ---- Part I
    b += [("h1", "Part I &mdash; Foundations"),
          ("h2", "The definition"),
          ("quote", "Intelligence is a supply chain. Value accrues at the bottlenecks, not at the "
                    "most visible node."),
          ("p", "That sentence names no company, no technology and no layer, which is deliberate: it "
                "is intended to survive the next five model generations. Everything else in this guide "
                "is an application of it."),
          ("h2", "Why supply chain rather than stack"),
          ("p", "A stack diagram describes how intelligence is <i>built</i>: chips at the bottom, "
                "models in the middle, applications on top. It is a technical dependency order, and it "
                "is broadly correct as one. The problem is what it implies. A stack invites the "
                "inference that value flows upward with the dependency, that the top of the diagram "
                "is where the business is, and that the layers below are inputs to be procured."),
          ("p", "A supply chain forces different questions. Who owns the scarce input? Where is the "
                "bottleneck this quarter, and is it moving? What happens to my margin when the layer "
                "below me commoditizes the thing I charge for? Who controls the gate my output has to "
                "pass through before anyone will pay for it? Those questions have answers, and the "
                "answers change what you build."),
          ("table", ([
              ["", "The AI stack", "The Supply Chain of Intelligence"],
              ["Question it answers", "How is intelligence built?", "Where does value accumulate, and who captures it?"],
              ["Unit of analysis", "Technical component", "Position a competitor must pay to cross"],
              ["Direction of value", "Implied upward", "Toward scarcity, wherever it currently sits"],
              ["What it predicts", "Architecture", "Absorption, migration, and defensibility"],
              ["Who it is for", "Engineers", "Operators, investors, and strategists"],
          ], [1.4, 2.1, 3.0])),
          ("p", "This is not a claim that the stack view is wrong. It is a claim that it is answering "
                "a different question, and that using it to make strategy decisions is a category "
                "error that has been expensive for a great many companies."),
          ("h2", "The three registers"),
          ("p", "The ten layers group into three registers with very different half-lives. If you "
                "remember nothing else structural, remember this table: it explains why two products "
                "that look identical to a user can have entirely different futures."),
          ("table", ([["Register", "Layers", "Half-life", "What it means for you"]] +
                     [[f"<b>{n}</b>", ls, hl, beh] for n, ls, hl, beh in TIERS],
                     [1.0, 1.3, 1.6, 2.6])),
          ("callout", ("The one-sentence test",
                       "Name, in one sentence, the layer you own that a competitor would have to spend "
                       "years or regulatory approval to cross. If the sentence does not write itself, "
                       "you do not own one yet. That is a finding, not a failure &mdash; but it should "
                       "be the top of your roadmap.")),
          ("h2", "What this framework does not do"),
          ("bullets", [
              "It does not tell you which company wins. It tells you which layers a company owns, "
              "which it rents, and which current is about to move value elsewhere.",
              "It does not replace market sizing, pricing strategy, or execution quality. A perfectly "
              "positioned company with no distribution still fails.",
              "It is not a maturity model. Owning more layers is not automatically better; owning a "
              "thin sliver of many contested layers is the worst position on the map.",
              "It is not static. The layer boundaries themselves will change; when they do, that is a "
              "versioned change, published, not a quiet edit.",
          ]),
          ("pagebreak")]

    # ---- Part II: layers
    b += [("h1", "Part II &mdash; The map"),
          ("p", "Ten layers, fifty sublayers. Each layer is presented the same way: what it is, the "
                "analogy that makes it stick, the five sublayers with definitions, who plays there "
                "today, the structural verdict, and operator notes &mdash; own or rent, the moves that "
                "work, the questions to ask yourself, and the characteristic failure mode."),
          ("small", "&#9733; marks a sublayer where durable defensibility is most often observed. Company "
                    "names are illustrative of a position at a point in time, not endorsements or "
                    "predictions; occupancy changes far faster than structure does.")]
    for l in LAYERS:
        n = NOTES[l["id"]]
        b += [("pagebreak"),
              ("layer", (l["id"], f"{l['id']} &mdash; {l['name']}", l["desc"])),
              ("p", l["detail"]),
              ("h3", "The analogy"),
              ("p", f"<b>{l['goldTitle']}.</b> {l['goldAnalogy']}"),
              ("h3", "The five sublayers"),
              ("table", ([["Sublayer", "What it covers"]] +
                         [[f"<b>{s['id']}</b> {s['name']}" + (" &#9733;" if s.get("defensible") else ""),
                           s["desc"]] for s in l["sublayers"]], [1.85, 4.65])),
              ("table", ([["Who plays here today", "Structural verdict"],
                          [", ".join(l["players"]), l["verdict"]]], [3.1, 3.4])),
              ("h3", "Operator notes"),
              ("p", f"<b>Own or rent?</b> {n['own']}"),
              ("h3", "Moves that work"),
              ("bullets", n["moves"]),
              ("h3", "Questions to ask yourself"),
              ("numbers", n["questions"]),
              ("callout", ("Characteristic failure mode", n["failure"], "#b03065", "#f3e0e8"))]

    # ---- Part III laws
    b += [("pagebreak"), ("h1", "Part III &mdash; The four laws"),
          ("p", "Four structural claims. They are stated as laws because they are meant to be "
                "falsifiable: a single well-documented counter-example mechanism forces an amendment, "
                "and amendments are published rather than quietly absorbed.")]
    law_extra = {
        "I": dict(mech="Anything that can be done inside the model layer eventually will be, because "
                       "the model owner controls the marginal cost. The wrapper does not lose on "
                       "feature parity; it loses on price floor. You cannot charge a subscription for "
                       "something the layer beneath you includes at zero marginal cost.",
                  escape="Own a layer the platform structurally cannot: proprietary data, a trust "
                         "gate, distribution, workflow depth, or compounding memory.",
                  test=["Does my core loop require anything the model owner does not already have?",
                        "If the platform shipped my feature next month, what would my customers still "
                        "need me for?",
                        "Is my pricing defensible against zero?"]),
        "II": dict(mech="Scarcity, not cost, determines margin. The model layer is expensive and "
                        "abundantly supplied; those are different properties. Value settles wherever "
                        "supply cannot expand as fast as demand.",
                   escape="Name the bottleneck you own in one sentence. If you cannot, acquire or "
                          "build one before scaling spend.",
                   test=["What do I require that competitors cannot replicate within twelve months?",
                         "What do I require that the model layer is not incentivised to supply?",
                         "What would my customer have to rebuild if they left me?"]),
        "III": dict(mech="Surface wins the first cohort; chain wins the tenth. Interfaces are copied "
                         "in weeks, and the platform copies them for free. What determines the future "
                         "is which layers the product owns rather than rents.",
                    escape="For every roadmap item, name the layer it reinforces. Items that reinforce "
                           "only the surface are marketing, not strategy.",
                    test=["Which layer does this quarter's roadmap actually strengthen?",
                          "If a larger surface entered my category tomorrow, what do I have that they "
                          "would have to build rather than ship?",
                          "Am I accumulating anything while my users sleep?"]),
        "IV": dict(mech="Self-attestation carries no information to a third party, so verification "
                        "must be performed by a separate economic entity. This is institutional, not "
                        "technical, and institutional constraints harden rather than soften.",
                   escape="If you generate in a regulated domain, do not fight the verifier above you. "
                          "Become the preferred generator routed through it.",
                   test=["Whose signature is on the line when my output is wrong?",
                         "Would my buyer's auditor accept my own logs as evidence?",
                         "Is there a regulator, insurer, or board that already requires a second party?"]),
    }
    for law in LAWS:
        e = law_extra[law["num"]]
        b += [("h1", f"Law {law['num']} &mdash; {law['title']}"),
              ("quote", law["desc"]),
              ("small", f"<b>{law['prediction']}</b>"),
              ("h3", "Mechanism"), ("p", e["mech"]),
              ("h3", "Worked example"), ("p", law["example"]),
              ("h3", "The escape"), ("p", e["escape"]),
              ("h3", "Three questions"), ("numbers", e["test"])]
    b += [("h2", "The four laws on one card"),
          ("table", ([["", "Says", "Predicts", "Example"]] +
                     [[f"<b>{l['num']}</b>", l["shortTitle"], l["prediction"].replace("Predicts ", ""),
                       l["example"]] for l in LAWS], [0.35, 2.0, 1.45, 2.7]))]

    # ---- Part IV currents
    b += [("pagebreak"), ("h1", "Part IV &mdash; The three currents"),
          ("p", "The layers are supply-side. The currents are market forces flowing across every "
                "layer, and they decide whether a defensible position becomes a business. A company "
                "can be perfectly positioned on the map and still starve if no current is running "
                "through its layer.")]
    for title, one, desc, use in CURRENTS:
        b += [("h2", title), ("p", f"<b><i>{one}</i></b>"), ("p", desc),
              ("callout", ("How to use it", use))]
    b += [("h2", "Reading the currents together"),
          ("table", ([
              ["Signal", "Read"],
              ["One current pointing at your layer", "A tailwind. Necessary, not sufficient."],
              ["Two currents", "A real market forming. This is the moment to over-invest."],
              ["Three currents", "A category. Expect capital, incumbents, and platform attention within four quarters."],
              ["No current", "A well-defended position nobody is paying for. The most expensive failure mode there is."],
          ], [2.2, 4.3])),
          ("p", "Note what is deliberately absent. Geopolitics is not a current: it acts at physical "
                "resources and at gatekeeping, and promoting it to a horizontal force double-counts "
                "the same effect twice. Keeping the list at three is a discipline, not an oversight.")]

    # ---- Part V dynamics
    b += [("pagebreak"), ("h1", "Part V &mdash; Dynamics"),
          ("p", "The laws say what is structurally true. The dynamics describe how the market actually "
                "moves: repeatable patterns observed across hundreds of companies, and the six "
                "positions companies settle into. Patterns can earn promotion to laws over time; none "
                "of these has yet.")]
    for o in OBS:
        b += [("h2", f"Pattern {o['num']} &mdash; {o['title']}"),
              ("small", "Layers touched: " + ", ".join(o["layerTags"])),
              ("p", o["desc"]),
              ("bullets", o["examples"])]
    b += [("h1", "The six archetypes"),
          ("p", "Over a long enough horizon, most software companies settle into one of six positions. "
                "The archetype is not destiny, but moving between them requires acquiring a layer, not "
                "shipping a feature."),
          ("table", ([["Archetype", "Status", "Structure", "Illustrative"]] +
                     [[f"<b>{n}</b>", s, d, ex] for n, s, d, ex in ARCHETYPES],
                     [1.45, 0.85, 2.8, 1.4])),
          ("p", "The two useful questions are: which archetype am I today, and which one am I "
                "becoming? A workflow fortress drifting toward thin surface is the most common and "
                "least noticed trajectory in enterprise software, because the drift shows up as good "
                "quarterly news &mdash; more users, more sessions &mdash; while the underlying layer "
                "ownership erodes.")]

    # ---- Part VI instruments
    b += [("pagebreak"), ("h1", "Part VI &mdash; Instruments"),
          ("h2", "Instrument 1: the Defensible Triangle"),
          ("p", "The triangle is L1b proprietary data, plus L5a/b/d deep execution and playbooks, plus "
                "L8c/d/e compounding memory. It is the most common fortress pattern among "
                "application-layer companies, and it works because each vertex makes the others "
                "harder to copy: proprietary data makes execution better, execution generates outcome "
                "data, and memory turns both into something that improves with age."),
          ("table", ([
              ["Vertex", "What it is", "How you know you have it"],
              ["<b>L1b</b> Proprietary data", "Data behind a wall nobody else can reach.",
               "A competitor with your exact UI would still need years to accumulate it."],
              ["<b>L5a/b/d</b> Deep execution", "Domain judgement, decision frameworks, encoded SOPs.",
               "A generalist with a frontier model could not reproduce 80% of it in a weekend."],
              ["<b>L8c/d/e</b> Compounding memory", "Network learning, institutional knowledge, learned models.",
               "The product is measurably better for a customer at month twelve than at month one."],
          ], [1.5, 2.3, 2.7])),
          ("p", "The triangle is a pattern, not a requirement. A pure gatekeeper wins on L3 alone; a "
                "silicon vendor wins on L0 alone; a data platform wins on L4 alone. Owning one layer "
                "deeply is sufficient. What is never sufficient is owning a thin sliver of a contested "
                "layer."),
          ("h2", "Instrument 2: the Intelligence Cube"),
          ("p", "The cube places a company in three dimensions at once: corporate function on one "
                "axis, industry vertical on another, and layers on the third. Volume is the read. A "
                "company occupying a large contiguous volume &mdash; several layers deep, across a "
                "coherent function and vertical &mdash; is structurally durable. A thin sliver, one "
                "layer across one function, is not, no matter how good the product is."),
          ("table", ([
              ["Axis", "Values"],
              ["Function", "Engineering, Design, Product, Project management, Operations, Marketing, "
                           "Sales, Customer care, Strategy"],
              ["Vertical", "Financial services, Education, Legal, Health, Travel, Commerce, Media, "
                           "Government, Software, Horizontal"],
              ["Layer", "L-1 through L8, counting only layers the company actually owns rather than rents"],
          ], [1.1, 5.4])),
          ("p", "Two practical uses. First, whitespace: plot the occupied cells in a vertical and the "
                "empty ones are candidate positions, though an empty cell is more often a bad market "
                "than an oversight. Second, expansion sequencing: adding depth in one cell almost "
                "always beats adding a second thin cell, because depth compounds and breadth divides "
                "attention."),
          ("h2", "Instrument 3: the defensibility audit"),
          ("p", "Eight questions. Score each from 0 to 12 where 0 is a flat no and 12 is an "
                "unambiguous yes with evidence you could show a sceptical board member. Total out of "
                "96, normalised to 100. Be harsh; the audit is only useful if it can produce a bad "
                "score."),
          ("table", ([["Area", "Question", "Layer"]] +
                     [[q["area"], q["question"], q["layer"]] for q in AUDITQ], [1.35, 4.05, 1.1])),
          ("table", ([["Score", "Band", "Read"]] +
                     [[bd["range"], bd["label"], bd["verdict"]] for bd in BANDS], [0.85, 1.75, 3.9])),
          ("callout", ("How to use a bad score",
                       "A low score is not a verdict on the product; it is a statement about which "
                       "layers you rent. The remedy is always the same shape: pick one layer you can "
                       "credibly own within four quarters, and make the next two roadmap cycles about "
                       "acquiring it rather than about surface improvements. Surface work is easier to "
                       "ship, always demos better, and does not move this score.")),
          ("h2", "Instrument 4: the agent decoder"),
          ("p", "The word &ldquo;agent&rdquo; is not a layer. It is packaging. Decoding it before "
                "analysis is the single highest-return habit in this framework, because the word hides "
                "exactly the information you need."),
          ("table", ([
              ["Component", "Layer", "Required?"],
              ["The skill &mdash; doing the actual work", "L5 Execution", "Always"],
              ["Multi-step planning, routing, tool use", "L6 Orchestration", "Required for anything called agentic"],
              ["The interface it is met through", "L7 Surface", "Usually"],
              ["Cross-session recall", "L8 Memory", "If it remembers"],
              ["Connectors, permissions, protocols", "L4 Access", "Ridden, never owned by the agent"],
          ], [2.5, 1.7, 2.3])),
          ("p", "The common analytical error is tagging an agent product as an access-layer play "
                "because it uses connectors. It rides those pipes; it does not own them. Name the "
                "execution and orchestration first, then say which of access, surface, and memory it "
                "bundles. If a product claims to be an agent and you cannot name its L5, it is a "
                "surface with a loop.")]

    # ---- Part VII worked readings
    b += [("pagebreak"), ("h1", "Part VII &mdash; Worked readings"),
          ("p", "Six readings, each in the same shape: what the company appears to be, what it "
                "actually owns, what it rents, and the structural conclusion. Occupancy changes; the "
                "method does not. Run the same shape on your own company before you argue with the "
                "conclusions."),
          ("h2", "1. The absorbed wrapper"),
          ("p", "<b>Appears to be:</b> a category-defining AI writing product with strong brand and "
                "rapid early growth. <b>Actually owns:</b> a surface and a set of templates. "
                "<b>Rents:</b> the model, the data, the distribution. <b>Conclusion:</b> when the "
                "model layer shipped an equivalent loop inside a surface users already had open, the "
                "price floor went to zero and the valuation followed. Nothing about the product got "
                "worse. The layer beneath it absorbed what it was charging for. This is Law I in its "
                "purest observable form, and it is the base case against which every application-layer "
                "position should be argued."),
          ("h2", "2. The bottleneck owner"),
          ("p", "<b>Appears to be:</b> a component vendor in a cyclical hardware market. "
                "<b>Actually owns:</b> the scarce input to every other layer, plus the software "
                "ecosystem that makes switching expensive. <b>Rents:</b> fabrication, which is the one "
                "genuine exposure. <b>Conclusion:</b> pricing power follows scarcity, not visibility. "
                "The layer that looks least like a business in a boom is frequently the one collecting "
                "the boom's margin. Read the physical-resources layer beneath it for the constraint "
                "that actually binds."),
          ("h2", "3. The gatekeeper above the giant"),
          ("p", "<b>Appears to be:</b> a compliance automation tool, technically unremarkable next to "
                "the infrastructure it sits above. <b>Actually owns:</b> a trust gate that the "
                "infrastructure provider cannot occupy for itself. <b>Rents:</b> everything technical. "
                "<b>Conclusion:</b> the most capable firm in the chain pays a less capable firm for "
                "attestation, and will continue to, because the constraint is institutional. This is "
                "the clearest live illustration of Law IV, and the reason verification positions "
                "survive model generations that erase adjacent products."),
          ("h2", "4. Same category, different chain"),
          ("p", "<b>Appears to be:</b> two prompt-to-output products with comparable interfaces and "
                "comparable early traction. <b>Actually owns:</b> one holds only the surface; the "
                "other holds access, execution, orchestration, and memory. <b>Conclusion:</b> feature "
                "parity is not structural parity. The interfaces converge; the futures diverge. When "
                "you benchmark competitors, benchmark layers owned, not features shipped."),
          ("h2", "5. The data refinery"),
          ("p", "<b>Appears to be:</b> a mature information business in a category everyone assumes AI "
                "will disrupt. <b>Actually owns:</b> decades of structured proprietary data plus the "
                "workflow in which it is consumed. <b>Rents:</b> the model, cheerfully and "
                "interchangeably. <b>Conclusion:</b> where the corpus is the moat, model progress is a "
                "tailwind rather than a threat. Every capability improvement makes the data more "
                "valuable, because the data is the part that cannot be synthesised."),
          ("h2", "6. The arbitrageur"),
          ("p", "<b>Appears to be:</b> a small tool with unremarkable technology and remarkable "
                "margins. <b>Actually owns:</b> a position in the gap between a gatekeeper's marginal "
                "cost and the value the gatekeeper's constraint creates. <b>Conclusion:</b> every "
                "gatekeeper margin attracts an arbitrageur, and the arbitrageur's ceiling is the cost "
                "of the workaround. These businesses are real, often very profitable, and structurally "
                "temporary. Price them accordingly, and do not confuse the margin for a moat.")]

    # ---- Part VIII applications
    b += [("pagebreak"), ("h1", "Part VIII &mdash; Applications"),
          ("h2", "1. Building a roadmap that moves your position"),
          ("p", "Most roadmaps are lists of features grouped by customer request. A layer-aware "
                "roadmap groups by the layer each item reinforces, which makes an uncomfortable "
                "pattern immediately visible: the majority of shipped work usually reinforces the "
                "surface, because surface work is faster, demos better, and is what customers can "
                "articulate."),
          ("table", ([
              ["Roadmap item", "Layer reinforced", "Compounds?"],
              ["A new template library", "Thin L5", "No"],
              ["A visual refresh", "L7", "No"],
              ["An integration that captures usage data competitors cannot see", "L1c + L8", "Yes"],
              ["A compliance certification your buyers require", "L3", "Yes"],
              ["Write-back into the customer's system of record", "L4", "Yes"],
              ["Encoding a customer's approval rules as a configurable playbook", "L5d + L8d", "Yes"],
          ], [3.2, 1.9, 1.4])),
          ("numbers", [
              "Tag every roadmap item with the layer it reinforces. Disallow &ldquo;multiple&rdquo;.",
              "Compute the share of engineering weeks going to compounding layers. Most teams find it "
              "below twenty percent.",
              "Set a floor &mdash; a third is a reasonable starting point &mdash; and protect it "
              "through the quarter, because it will be the first thing traded away.",
              "Re-run the audit in Part VI every two quarters. If the score has not moved, the "
              "roadmap was surface work with good release notes.",
          ]),
          ("h2", "2. Diligence: reading a company in thirty minutes"),
          ("p", "A structured pass that produces a defensible view quickly. It will not tell you "
                "whether the company wins. It tells you what has to be true for it to win, which is "
                "the more useful output of a first meeting."),
          ("numbers", [
              "<b>Decode the pitch.</b> Strip the words agent, copilot, and platform. Write what the "
              "product does in one sentence a customer would recognise.",
              "<b>Tag the layers owned.</b> Not touched, not integrated with &mdash; owned. Two or "
              "three is normal; more than four claimed usually means fewer than two real.",
              "<b>Tag the layers rented.</b> For each, ask what happens if the supplier raises price, "
              "changes terms, or ships the same feature.",
              "<b>Locate the bottleneck.</b> One sentence naming what competitors must pay to cross. "
              "If the founder cannot supply it, that is the finding.",
              "<b>Check the currents.</b> Who is the buyer, what budget line, and what do they stop "
              "paying for once generation is free?",
              "<b>Apply Law I.</b> Name the specific platform release that would compress this "
              "company, and estimate how many quarters away it is.",
              "<b>Apply Law IV.</b> If the output carries weight, is this the generator or the "
              "verifier? Generators in regulated domains that pitch themselves as verifiers are "
              "mispricing a structural constraint.",
              "<b>Place the archetype.</b> Which of the six is it today, and which is it becoming?",
          ]),
          ("callout", ("The single most useful diligence question",
                       "&ldquo;What would a well-funded competitor with a frontier model and your exact "
                       "interface still not have twelve months from now?&rdquo; The quality of the "
                       "answer is close to a sufficient statistic for the quality of the position.")),
          ("h2", "3. A reference architecture for agent systems"),
          ("p", "The framework was built to analyse markets, but it works as an architecture checklist "
                "because the layers are also the components. Reading an agent design as a chain "
                "surfaces the omissions that show up in production three months later."),
          ("table", ([
              ["Layer", "Design decision", "Common omission"],
              ["L1 Data", "What context does the agent see that competitors' cannot?",
               "Grounding entirely in public or customer-supplied documents"],
              ["L2 Models", "Routing policy: which task goes to which model at which price?",
               "One frontier model for every call, including trivial ones"],
              ["L3 Gates", "What must be checked before an action is allowed to commit?",
               "Evaluation treated as a pre-launch activity rather than a runtime gate"],
              ["L4 Access", "Which systems can it read, which can it write, under whose credentials?",
               "Agent acting under a shared service account with no per-action provenance"],
              ["L5 Execution", "What judgement is encoded, and by whom was it reviewed?",
               "Prompt engineering in place of an encoded decision framework"],
              ["L6 Orchestration", "What happens at step seven when step three was subtly wrong?",
               "No recovery path, no checkpointing, no human escalation surface"],
              ["L7 Surface", "Where does the human meet it, and is that where the work already is?",
               "A new destination the user must remember to visit"],
              ["L8 Memory", "What persists, for whom, and what improves because of it?",
               "Transcript storage described as memory"],
          ], [1.15, 2.6, 2.75])),
          ("p", "Two design rules follow directly from the laws. First, keep generation and "
                "verification in separate components with separate owners wherever an action carries "
                "weight &mdash; the same architectural discipline that Law IV describes at market "
                "scale applies inside a single system, and for the same reason. Second, design so that "
                "ordinary operation produces outcome data: an agent that records what happened after "
                "it acted is accumulating an asset; one that records only what it produced is "
                "accumulating logs."),
          ("h2", "4. Building a market map"),
          ("p", "A market map places real companies on the ten layers within one vertical. It is the "
                "most effective way to learn the framework, and it produces something genuinely useful "
                "to other people, which is rare in strategy work."),
          ("numbers", [
              "Pick a vertical narrow enough that you can name thirty companies without searching.",
              "Build the grid: ten layers by five sublayers. Fifty cells.",
              "Place each company in the cells it <i>owns</i>. Most companies occupy two or three; if "
              "you are placing one in ten, you are recording marketing rather than structure.",
              "Mark the empty cells. Ask, for each, whether it is whitespace or a bad market. Most are "
              "bad markets, and saying so is the valuable part.",
              "Write the thesis paragraph last: where value is concentrating in this vertical, and "
              "which current is moving it.",
          ]),
          ("p", "Two disciplines make maps trustworthy. Name a real company in every claim &mdash; "
                "abstract archetypes are lazy and unfalsifiable. And date the map, because occupancy "
                "changes weekly while the structure does not; an undated map will be quoted long after "
                "it is wrong.")]

    # ---- Part IX glossary
    gloss = [
        ("Bottleneck", "A layer where supply cannot expand as fast as demand. Where margin settles."),
        ("Compounding memory", "L8c&ndash;e. State that makes the product more valuable to a specific customer over time."),
        ("Current", "A market force flowing horizontally across all layers. There are exactly three."),
        ("Defensible Triangle", "L1b + L5a/b/d + L8c/d/e. The most common application-layer fortress pattern."),
        ("Generation", "Production of a candidate output. Distinct from verification."),
        ("Intelligence Cube", "Function &times; vertical &times; layer. Volume indicates structural durability."),
        ("Layer", "One of ten positions in the production chain, L-1 through L8."),
        ("Outcome data", "L1d. What happened after the model acted. The scarcest and most defensible data class."),
        ("Register", "Substrate, Workflow, or Surface. A grouping of layers by half-life."),
        ("Sublayer", "One of five subdivisions within a layer. Fifty in total. Most moats live at this level."),
        ("Surface", "L7. What the user touches. Modality commoditizes; placement and habit do not."),
        ("Thin sliver", "A position occupying one contested layer and no others. The weakest position on the map."),
        ("Two-vendor rule", "Buyers pay for two vendors when one vendor's error is unrecoverable."),
        ("Verification", "An assertion to a third party that an output meets a standard. Cannot be credibly self-issued."),
        ("Wrapper", "A product whose value derives only from generic model capability. Absorbed on the platform's schedule."),
    ]
    b += [("pagebreak"), ("h1", "Part IX &mdash; Glossary"),
          ("table", ([["Term", "Definition"]] + [[f"<b>{t}</b>", d] for t, d in gloss], [1.6, 4.9])),
          ("h2", "Companion documents"),
          ("bullets", [
              "<b>Academic theory paper (v4.1)</b> &mdash; the single theoretical claim, its "
              "relationship to prior literature, and six falsifiable predictions.",
              "<b>Working paper (15 pages)</b> &mdash; literature review, theory, vignettes, "
              "alternative explanations, and research agenda.",
              "<b>This practitioner guide</b> &mdash; the full taxonomy, instruments, and applications.",
          ]),
          ("space", 6)]
    b += CITE_BLOCK
    return build(os.path.join(OUT, "scoi-practitioner-guide.pdf"), b,
                 "Supply Chain of Intelligence · Practitioner Guide", cover)


if __name__ == "__main__":
    # theory_brief() is superseded by scripts/papers/build_theory_brief_v4.py,
    # which publishes public/papers/scoi-verification-boundary.pdf.
    os.makedirs(OUT, exist_ok=True)
    for fn in (working_paper, practitioner_guide):
        path = fn()
        print("wrote", os.path.relpath(path, ROOT))

