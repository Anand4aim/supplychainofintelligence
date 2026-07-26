"""
Build the Academic Theory Brief v4.0 — The Verification Boundary.

  public/papers/scoi-verification-boundary.pdf

Successor to v3.2. Adds: the regulation-vs-structure rebuttal (Section 5),
the L3 Gatekeeping mapping (Section 8), repaired decision tables, complete
P1-P6 prediction set with refutation criteria, and a limitations section.

Run: python3 scripts/papers/build_theory_brief_v4.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import build, cover_page  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "public", "papers")

VERSION = "Version 4.1"
DATE = "July 2026"

TITLE = "The Verification Boundary"
SUB = ("Institutional independence as a boundary condition on platform "
       "expansion in AI markets")

BYLINE = ("Anand Arivukkarasu &middot; Supply Chain of Intelligence &middot; former product "
          "leader, Meta (Instagram) &middot; written in a personal capacity.")

ABSTRACT = (
    "AI platforms have strong incentives to absorb adjacent workflow, data, and assurance "
    "functions. Existing theories explain why integration occurs, but do not isolate a recurring "
    "case in which integration can destroy the value of the asset being acquired. This paper "
    "proposes the <b>verification boundary</b>. When an automated output can impose material, "
    "difficult-to-recover loss on a party beyond the producer; when a third party conditions "
    "money, permission, coverage, admissibility, authorization, or liability on an assurance about "
    "that output; and when conformity can be assessed against a sufficiently determinate standard "
    "accepted by that party, accepted verification requires a governance arrangement that "
    "preserves institutional independence from the generating function. Independence may be "
    "preserved through a protected internal function, a ring-fenced entity, a regulated "
    "professional role, or a separate firm: the boundary constrains governance control, not "
    "necessarily firm boundaries. Improvements in model accuracy can automate and narrow "
    "verification, but do not by themselves make self-attestation acceptable. The paper "
    "distinguishes technical checking from governance-based assurance, states six falsifiable "
    "predictions with refutation criteria and coding rules, treats conflicted-verifier episodes "
    "and cryptographic attestation as live tests rather than confirmations, and proposes an "
    "empirical program for identifying where platform envelopment bends rather than passes "
    "through. The wider Supply Chain of Intelligence taxonomy is supporting context and is not "
    "required to evaluate the claim."
)

PROP = (
    "<b>Proposition (the verification boundary).</b> When an automated output can impose material, "
    "difficult-to-recover loss on a party beyond the producer; when a third party conditions money, "
    "permission, coverage, admissibility, authorization, or liability on an assurance about that "
    "output; and when conformity can be assessed against a sufficiently determinate standard "
    "accepted by the conditioning party, <b>accepted verification will require a governance "
    "arrangement that preserves institutional independence from the generating function.</b> "
    "Improvements in generation or checking capability may reduce the cost and scope of "
    "verification, but do not by themselves eliminate the independence requirement."
)

REFERENCES = [
    "Adner, R. (2017). Ecosystem as structure: an actionable construct for strategy. "
    "<i>Journal of Management</i>, 43(1), 39&ndash;58.",
    "Akerlof, G. A. (1970). The market for &ldquo;lemons&rdquo;: quality uncertainty and the market "
    "mechanism. <i>Quarterly Journal of Economics</i>, 84(3), 488&ndash;500.",
    "Baldwin, C. Y., &amp; Clark, K. B. (2000). <i>Design Rules: The Power of Modularity</i>. MIT Press.",
    "Coase, R. H. (1937). The nature of the firm. <i>Economica</i>, 4(16), 386&ndash;405.",
    "DeAngelo, L. E. (1981). Auditor independence, &ldquo;low balling,&rdquo; and disclosure "
    "regulation. <i>Journal of Accounting and Economics</i>, 3(2), 113&ndash;127.",
    "Dulleck, U., &amp; Kerschbamer, R. (2006). On doctors, mechanics and computer specialists: the "
    "economics of credence goods. <i>Journal of Economic Literature</i>, 44(1), 5&ndash;42.",
    "Eisenmann, T., Parker, G., &amp; Van Alstyne, M. (2011). Platform envelopment. "
    "<i>Strategic Management Journal</i>, 32(12), 1270&ndash;1285.",
    "Gawer, A. (2014). Bridging differing perspectives on technological platforms. "
    "<i>Research Policy</i>, 43(7), 1239&ndash;1249.",
    "Holmstrom, B. (1979). Moral hazard and observability. <i>Bell Journal of Economics</i>, "
    "10(1), 74&ndash;91.",
    "Jacobides, M. G., Cennamo, C., &amp; Gawer, A. (2018). Towards a theory of ecosystems. "
    "<i>Strategic Management Journal</i>, 39(8), 2255&ndash;2276.",
    "Porter, M. E. (1985). <i>Competitive Advantage</i>. Free Press.",
    "Power, M. (1997). <i>The Audit Society: Rituals of Verification</i>. Oxford University Press.",
    "Rochet, J.-C., &amp; Tirole, J. (2003). Platform competition in two-sided markets. "
    "<i>Journal of the European Economic Association</i>, 1(4), 990&ndash;1029.",
    "Shapiro, C. (1983). Premiums for high quality products as returns to reputations. "
    "<i>Quarterly Journal of Economics</i>, 98(4), 659&ndash;679.",
    "Spence, M. (1973). Job market signaling. <i>Quarterly Journal of Economics</i>, 87(3), 355&ndash;374.",
    "Teece, D. J. (1986). Profiting from technological innovation. <i>Research Policy</i>, "
    "15(6), 285&ndash;305.",
    "Williamson, O. E. (1985). <i>The Economic Institutions of Capitalism</i>. Free Press.",
]


def blocks():
    b = []

    # ── 1. Problem ───────────────────────────────────────────────
    b += [
        ("callout", ("PROPOSITION", PROP)),
        ("h1", "1. The problem the proposition addresses"),
        ("p", "Artificial intelligence expands the range of outputs that can be produced cheaply: "
              "diagnoses, valuations, legal filings, financial disclosures, software configurations, "
              "engineering plans, and operational decisions. As generation becomes faster and less "
              "expensive, firms that control models or user surfaces have strong incentives to "
              "integrate forward into workflow, orchestration, and decision support. Theories of "
              "appropriability (Teece, 1986), envelopment (Eisenmann, Parker &amp; Van Alstyne, 2011), "
              "and transaction-cost economizing (Williamson, 1985) all point in the same direction: "
              "absorb the adjacency."),
        ("p", "Yet some functions resist absorption even where integration would lower technical and "
              "coordination costs. A model provider may inspect its own output more accurately than "
              "any external reviewer, and accuracy alone still does not determine whether another "
              "party will <i>accept</i> its assurance. Courts, regulators, insurers, boards, "
              "counterparties, and affected customers may require an assertion whose value depends "
              "on the assessor not being governed by the producer whose work is being assessed."),
        ("p", "The verification boundary is a claim about that institutional requirement. It is not a "
              "claim that generators cannot check their own work, that all verification must occur in "
              "separate firms, or that every consequential AI use will spawn a verification industry. "
              "It predicts <i>when</i> assurance becomes an economically distinct role because "
              "independence is part of what the relying party is purchasing."),
        ("h2", "The gap this brief addresses"),
        ("p", "Platform envelopment explains why platforms absorb adjacent markets: shared user bases, "
              "bundling economics, and cost complementarities make the move attractive and often "
              "decisive. The theory is deliberately silent on where absorption stops. Existing "
              "stopping conditions in the literature are largely technical or regulatory: the "
              "adjacency is too distant, capabilities do not transfer, or an authority forbids the "
              "move. This brief proposes an additional stopping condition that is neither. Expansion "
              "bends where the enveloping firm's own governance destroys the value of the asset it "
              "is trying to acquire, because that asset is the credibility of an assertion about "
              "the firm's own output."),
        ("h2", "Definitions"),
        ("table", ([
            ["Term", "Definition"],
            ["Generation", "Production of a candidate output or decision: a diagnosis, valuation, "
                           "filing, configuration, recommendation, or design."],
            ["Checking", "Testing or reviewing an output for defects. May be performed by the "
                         "generator; improves quality without creating an independent assurance."],
            ["Verification", "An assertion that an output conforms to a specified standard, "
                             "addressed to a party entitled to rely on that assertion."],
            ["Institutional independence", "A governance condition under which the verifier's "
                                           "incentives, authority, evidence access, and "
                                           "accountability are sufficiently separated from the "
                                           "generator to make the assertion credible to the "
                                           "relying party."],
            ["Conditioning third party", "A regulator, insurer, auditor, court, board, lender, "
                                         "counterparty, or affected customer that conditions money, "
                                         "permission, admissibility, coverage, or liability on the "
                                         "assurance."],
        ], [1.5, 5.0])),
        ("p", "The distinction between <i>checking</i> and <i>verification</i> carries the argument. "
              "Checking is an engineering activity subject to capability improvement. Verification is "
              "a governance act subject to acceptance by someone other than the producer. Conflating "
              "the two is what makes the boundary look like a temporary artifact of immature models."),

        # ── 2. Mechanism ─────────────────────────────────────────
        ("h1", "2. The mechanism: independence is the asset"),
        ("p", "The mechanism has four parts. Together they explain why a capability improvement in the "
              "generator does not relax the governance constraint."),
        ("numbers", [
            "<b>Consequential reliance creates demand for assurance, not merely for quality.</b> Where "
            "an error can impose material and difficult-to-recover loss on another party, the relevant "
            "question is not only whether the output is likely to be correct. It is who is entitled to "
            "make an assertion on which others may rely, and who bears accountability when that "
            "assertion fails.",
            "<b>Self-attestation is informative but insufficient under defined incentive conditions.</b> "
            "Brands, warranties, repeat business, contractual penalties, and balance-sheet liability "
            "can make a producer's own assurance credible when losses are recoverable and punishment is "
            "timely (Shapiro, 1983). The boundary arises when those devices do not adequately protect "
            "the relying party, or when law, insurance, professional duty, or governance rules require "
            "assurance from a separately accountable actor.",
            "<b>Credibility depends on separable incentives and accountability.</b> Verification has "
            "economic value only when the verifier can investigate, refuse certification, disclose "
            "adverse findings, and bear consequences without being overruled by the generator "
            "(DeAngelo, 1981). The required separation may be functional, legal, professional, or "
            "organizational; the stronger the conflict between production incentives and assurance "
            "obligations, the stronger the separation required.",
            "<b>Capability and credibility are different variables.</b> A generator may become the best "
            "technical detector of its own errors. That improvement can lower the cost of verification, "
            "change the evidence reviewed, and automate much of the process. It does not establish that "
            "the generator is an acceptable <i>sole attestor</i> where the relying party requires "
            "independence. The scarce asset is credible independence, not intelligence.",
        ]),
        ("callout", ("OBSERVABLE COROLLARY: THE TWO-VENDOR RULE",
                     "Where a single vendor's error is unrecoverable, procurement selects two vendors, "
                     "paying a duplication tax to avoid a single-point-of-failure tax. The behaviour is "
                     "observable and priced in security, audit, clinical, and financial procurement, and "
                     "it long predates AI. It is a market-side signal that independence is bought "
                     "separately from capability.")),
        ("h2", "The consequence test"),
        ("table", ([
            ["Step", "Question", "Outcome"],
            ["1. Generation", "A candidate output is produced.", "Proceeds to the test."],
            ["2. Consequence test", "Can an error impose material, hard-to-recover loss on a party "
                                    "beyond the producer?",
             "No: integrated assurance. Internal testing, warranty, and brand remain sufficient."],
            ["3. Conditioning test", "Does an external actor condition money, permission, "
                                     "admissibility, or liability on an assurance about the output?",
             "No: integrated assurance, with reputational discipline only."],
            ["4. Standard test", "Does an assurable standard exist, or can one be constructed?",
             "No: no assurance market forms; the demand is latent until a standard emerges."],
            ["5. Crossing the boundary", "All three scope conditions hold simultaneously.",
             "Yes: independent assurance. A separately governed actor makes the accepted assertion."],
        ], [1.15, 2.6, 2.75])),
        ("p", "Governance separation may occur within one firm, through a ring-fenced unit, or across "
              "firms. Firm separation is a contingent organizational response, not the proposition."),
        ("h2", "Four forms of independence"),
        ("table", ([
            ["Governance form", "What preserves credibility", "Typical setting"],
            ["Protected internal function", "Reporting line to the board or a committee, budget "
                                            "insulation, non-overridable veto, disclosure duty.",
             "Internal audit; model risk management; clinical safety officers."],
            ["Ring-fenced unit or subsidiary", "Separate legal entity, separate P&amp;L, information "
                                               "barriers, independent leadership.",
             "Acquired assurance vendors retained at arm's length; certification arms."],
            ["Regulated professional role", "Licensure, personal liability, professional duty that "
                                            "overrides the employer's instruction.",
             "Statutory auditors; licensed engineers; attorneys of record; radiologists."],
            ["Separate firm", "No ownership or control relationship; reputation staked on refusal "
                              "rights; portable across clients.",
             "Third-party auditors, testing laboratories, ratings and certification bodies."],
        ], [1.35, 2.75, 2.4])),
        ("p", "The proposition is agnostic across these four. It predicts that <i>one of them</i> must "
              "be present for the assurance to be accepted, and that all four become harder to sustain "
              "as the generator's control over the verifier increases. This is what makes the claim "
              "testable rather than tautological: an observed market in which none of the four forms "
              "is present, yet the assurance is durably accepted, refutes it."),

        # ── 3. Relation to literature ────────────────────────────
        ("h1", "3. Relationship to prior work"),
        ("p", "The claim is intended as an increment, not a replacement. Each literature below supplies "
              "part of the argument; the column on the right states what the proposition adds."),
        ("table", ([
            ["Literature", "What it establishes", "What the proposition adds"],
            ["Teece (1986); Porter (1985): appropriability and value chains",
             "Complementary assets and chain position determine who captures rent from innovation.",
             "Identifies an asset (credible independence) whose value is destroyed by the act of "
             "integrating it, inverting the usual complementary-asset logic."],
            ["Eisenmann, Parker &amp; Van Alstyne (2011); Gawer (2014): platform envelopment",
             "Platforms absorb adjacent markets using shared users, bundling, and cost complementarity.",
             "Proposes a stopping rule the theory leaves open: envelopment bends at assurance performed "
             "over the enveloper's own outputs, because control is precisely what the buyer is paying "
             "to exclude."],
            ["Coase (1937); Williamson (1985): transaction costs and firm boundaries",
             "Boundary choice economizes on transaction costs, asset specificity, and hold-up.",
             "Adds a case where integration lowers transaction cost yet is still rejected, because "
             "third-party acceptance, not internal efficiency, is the binding constraint."],
            ["Baldwin &amp; Clark (2000): modularity",
             "Interfaces and information hiding determine where a system can be cleanly divided.",
             "Suggests a governance interface, not only a technical one: the accepted assertion is the "
             "module boundary."],
            ["Jacobides, Cennamo &amp; Gawer (2018); Adner (2017): ecosystems",
             "Complementarity, bottlenecks, and multilateral dependence define ecosystem roles.",
             "Identifies a role that must remain separately governed even when the hub can technically "
             "perform it better than anyone else."],
            ["Akerlof (1970); Spence (1973); Holmstrom (1979): information and incentives",
             "Adverse selection, signalling, moral hazard, and observability.",
             "Links incentive-compatible assurance to a governance prediction under rapidly improving "
             "machine capability, where the observability problem is shifting rather than shrinking."],
            ["Dulleck &amp; Kerschbamer (2006); Power (1997); DeAngelo (1981): credence goods and "
             "verification institutions",
             "Markets develop attestation institutions where buyers cannot evaluate quality directly, "
             "and auditor independence has measurable economic value.",
             "Extends the logic to AI market structure and separates technical checking from assurance "
             "whose credibility rests on institutional independence."],
        ], [1.5, 2.4, 2.6])),
        ("p", "The nearest neighbour is the audit-independence literature. The difference is directional: "
              "that work explains why independence has value inside an established assurance profession, "
              "taking the profession's existence as given. The proposition here predicts <i>where new "
              "assurance roles will be created</i> in markets that do not yet have them, and predicts "
              "that the creation is driven by consequence structure rather than by the arrival of "
              "regulation."),

        # ── 4. Scope ─────────────────────────────────────────────
        ("h1", "4. Scope conditions and counterexamples"),
        ("p", "The proposition applies only when all three conditions hold simultaneously. The scope is "
              "deliberately narrow, to make the claim refutable rather than universal."),
        ("bullets", [
            "<b>Material external consequence.</b> An erroneous output can impose material loss, denial "
            "of rights, physical harm, legal exposure, or another difficult-to-recover consequence on a "
            "party beyond the producer.",
            "<b>External conditioning.</b> A third party conditions money, permission, admissibility, "
            "insurance, liability, or authorization on an assurance about the output.",
            "<b>Assurable standard.</b> A standard exists, or can be constructed, against which "
            "conformity can be assessed and asserted.",
        ]),
        ("p", "Where one or more conditions are absent, integrated checking, producer warranties, brand "
              "reputation, user review, or ordinary contractual remedies may be sufficient. The theory "
              "therefore predicts <i>no</i> general separation in low-consequence or easily reversible "
              "uses, which is where most current AI deployment sits."),
        ("h2", "Cases the theory must not claim"),
        ("table", ([
            ["Case", "Conditions", "Prediction"],
            ["Marketing copy generation", "Consequence low; no external conditioning.",
             "No separation. Integrated checking and brand suffice. A verification market here would "
             "weaken the theory."],
            ["Consumer code assistants", "Consequence usually recoverable; no conditioning party.",
             "No separation for general use; separation appears only at the regulated or "
             "safety-critical subset."],
            ["Internal knowledge search", "Losses internalized by the producer.",
             "No separation; internal quality management is the efficient response."],
            ["Clinical decision support", "All three conditions hold.",
             "Separation, via regulated professional role or licensed reviewer, and stable under model "
             "improvement."],
            ["Financial reporting automation", "All three conditions hold.",
             "Separation, via statutory audit and independent model validation."],
            ["Consumer credit decisioning", "All three hold under fair-lending regimes.",
             "Separation, via independent model validation and adverse-action reviewability."],
        ], [1.5, 1.85, 3.15])),
        ("h2", "Genuine hard cases"),
        ("p", "Three cases sit uncomfortably with the proposition and should be treated as live tests "
              "rather than confirmations. First, cloud security certification, where hyperscalers "
              "supply both infrastructure and substantial attestation tooling; the boundary holds only "
              "because the final assertion is still made by an accredited external assessor, and a "
              "shift in that practice would be evidence against the claim. Second, high-frequency "
              "trading risk controls, where the speed requirement pushes assurance inside the "
              "generating firm and independence survives only as a protected internal function. "
              "Third, closed clinical systems in single-payer settings, where the payer, regulator, "
              "and provider can be the same institution, and the four forms of independence collapse "
              "toward the first. Each is a place where the theory could fail informatively."),

        # ── 5. Rebuttal ──────────────────────────────────────────
        ("h1", "5. Is this regulation wearing a theoretical costume?"),
        ("p", "The strongest objection to the proposition is that it restates a triviality: regulated "
              "activities attract mandated oversight, so of course assurance is separate. If that were "
              "the whole content, the claim would be an observation about administrative law, not a "
              "boundary condition on firm strategy. Four lines of argument distinguish the two, and "
              "each generates a different observable."),
        ("numbers", [
            "<b>The conditioning party is frequently private.</b> Insurers, lenders, boards, "
            "acquirers, enterprise procurement, and indemnifying counterparties condition money and "
            "liability on assurance in the absence of any statute. Cyber-insurance underwriting, "
            "lender collateral valuation, and pre-acquisition technical diligence all demand "
            "independent assessment because the payer, not the state, refuses to accept the "
            "producer's word. If the claim were regulatory, these private demands should be absent "
            "or fall away under competitive pressure. They do not.",
            "<b>Separation precedes regulation more often than it follows.</b> Independent testing "
            "laboratories, credit ratings, marine classification societies, and financial audit each "
            "emerged as market institutions and were codified afterward. Regulation typically "
            "ratifies a separation the market already produced. A purely regulatory account has the "
            "causal arrow backwards, and the ordering is historically checkable.",
            "<b>Regulation itself needs explanation.</b> Even where a statute mandates independence, "
            "the interesting question is why lawmakers converge on <i>independence</i> as the remedy "
            "rather than on higher accuracy standards, larger penalties, or mandatory insurance. The "
            "proposition supplies that answer: accuracy requirements do not address the credibility "
            "of the assertion, and penalties do not create a party entitled to refuse.",
            "<b>The prediction is about capability, and regulation says nothing about capability.</b> "
            "A regulatory account predicts nothing about what happens as generators improve. The "
            "proposition does: assurance becomes more automated and more selective while independent "
            "accountability persists. If assurance requirements systematically relax as accuracy "
            "rises, the proposition is refuted and the regulatory account survives untouched.",
        ]),
        ("callout", ("THE DISCRIMINATING TEST",
                     "Take markets satisfying the consequence and conditioning conditions where no "
                     "statute mandates independent assurance. The regulatory account predicts "
                     "integration; the proposition predicts separation supplied privately, priced, and "
                     "stable. Cyber-insurance, lender-side valuation, and acquisition diligence are the "
                     "cleanest available settings for the comparison, because the mandate is absent and "
                     "the money is real.")),
        ("h2", "A second objection: is separation just transitional?"),
        ("p", "The alternative reading is that verification is separate today because models are "
              "unreliable, and that the boundary dissolves once reliability is high enough. This is "
              "the objection the proposition is designed to meet head-on. The separation is not "
              "predicated on error rates. Statutory audit did not arise because bookkeepers were bad "
              "at arithmetic, and it has not been dissolved by double-entry software, ERP systems, or "
              "continuous controls monitoring, all of which raised accuracy substantially. What each "
              "improvement changed was the cost and method of assurance, not the identity of the party "
              "entitled to assert. The proposition predicts the same pattern for AI, and P2 below "
              "states the condition under which that prediction fails."),

        # ── 6. Predictions ───────────────────────────────────────
        ("h1", "6. Falsifiable predictions"),
        ("p", "Each prediction states an observable pattern and a refutation condition, over a "
              "five-year horizon from publication. P1 to P3 test the core mechanism; P4 to P6 test the "
              "claim against its two closest rivals, the regulatory account and the transitional "
              "account."),
        ("table", ([
            ["", "Expected observation", "Refuted if"],
            ["P1. Governance separation",
             "In markets satisfying all three scope conditions, accepted assurance is supplied through "
             "a protected function, ring-fenced entity, regulated professional role, or separate firm.",
             "Conditioning third parties routinely accept assurance from the generator with no "
             "meaningful governance separation, across multiple renewal cycles."],
            ["P2. Capability does not erase independence",
             "As generator accuracy improves, verification becomes more automated and more selective, "
             "while the requirement for independent accountability persists.",
             "Higher generator accuracy systematically causes regulators, insurers, auditors, or "
             "counterparties to eliminate independent assurance requirements."],
            ["P3. Platform expansion bends rather than passes through",
             "Generation platforms expand into workflow, orchestration, data access, and user surfaces "
             "more readily than into assurance evaluating their own outputs.",
             "A generation platform repeatedly absorbs such assurance, controls its governance, and "
             "retains third-party acceptance across multiple audit or renewal cycles."],
            ["P4. Private conditioning is sufficient",
             "Separation appears in unregulated markets wherever a private payer conditions money or "
             "liability on the assurance, at comparable rates to regulated markets.",
             "Separation is observed only where a statute or regulator mandates it, and unregulated "
             "consequential markets integrate assurance without buyer resistance."],
            ["P5. Acquisition without ring-fencing degrades acceptance",
             "Where a generator acquires an assurance provider, either governance is ring-fenced or "
             "third-party acceptance of that provider's assertions declines.",
             "Acquired assurance providers are fully integrated into generator governance and retain "
             "acceptance and pricing power over multiple cycles."],
            ["P6. New mandates produce roles, not absorption",
             "Where an assurance requirement is newly imposed, an independent role, accreditation, or "
             "vendor emerges within roughly two years rather than the function being absorbed by "
             "incumbent generators.",
             "Newly regulated domains routinely resolve into single-vendor generation-plus-verification "
             "with no structural separation."],
        ], [1.45, 2.55, 2.5])),
        ("h2", "What would refute the proposition as a whole"),
        ("p", "A single well-documented market in which all three scope conditions hold and the "
              "generator's own attestation is durably accepted by the conditioning third party, across "
              "more than two renewal or audit cycles, would force an amendment. Capability arguments "
              "alone would not: the proposition explicitly predicts that generators become more "
              "accurate and that the separation persists anyway. Nor would isolated instances of "
              "self-certification in low-consequence settings, which fall outside scope by "
              "construction."),

        # ── 7. Empirical program ─────────────────────────────────
        ("h1", "7. An empirical program"),
        ("p", "The claim is stated to be tested by others. The following operationalizations are "
              "offered so that disagreement can be resolved with data rather than with intuition."),
        ("table", ([
            ["Construct", "Candidate measures"],
            ["Consequence severity", "Regulatory classification; insurance loss data; litigation "
                                     "exposure; reversibility of harm; presence of statutory duty."],
            ["Conditioning intensity", "Presence of a reliance clause; audit or certification "
                                       "requirement; insurance condition precedent; procurement "
                                       "mandate; admissibility rule."],
            ["Governance independence", "Reporting line; veto and refusal rights; budget control; "
                                        "ownership; accreditation status; personal liability; "
                                        "rotation and tenure rules."],
            ["Economic outcomes", "Contract duration; switching cost; assurance spend; pricing and "
                                  "gross margin; churn; claims experience; regulatory acceptance rate."],
            ["Capability change", "Generator accuracy and error rates; model upgrade cadence; degree "
                                  "of review automation; change in the <i>amount</i> rather than the "
                                  "<i>independence</i> of assurance."],
        ], [1.6, 4.9])),
        ("h2", "Methods"),
        ("bullets", [
            "Comparative case studies tracing how assurance governance changes before and after AI "
            "adoption in medicine, finance, legal services, cybersecurity, and industrial engineering.",
            "Event studies around new assurance mandates, testing whether they produce protected roles, "
            "ring-fenced units, accreditation regimes, or new vendors, and on what lag.",
            "Procurement and contracting analysis, coding requests for proposal, insurance clauses, "
            "audit requirements, and reliance provisions for explicit independence requirements. This "
            "is the most direct test of P4, because contracts reveal private demand without a mandate.",
            "Panel analysis relating changes in generator capability to assurance spending and "
            "governance structure, controlling for output volume and regulatory intensity. This is the "
            "direct test of P2.",
            "Vignette experiments with regulators, boards, insurers, and enterprise buyers, testing "
            "whether identical technical assurance is valued differently depending on who controls "
            "the assessor. This isolates credibility from capability.",
        ]),
        ("h1", "8. Implications for AI market structure"),
        ("p", "<b>First, platform expansion may face a credibility boundary rather than a technical "
              "one.</b> Model providers can improve assurance, automate it, and even supply the tools "
              "used to perform it, while remaining unable to serve as the sole accepted verifier of "
              "their own outputs in some markets. The constraint binds on governance, not on skill, "
              "which is why it does not appear in capability-based accounts of platform limits."),
        ("p", "<b>Second, verification is not necessarily a permanent labor-intensive layer.</b> "
              "Automation can compress its cost and change its operating model substantially. The "
              "durable element, where the proposition holds, is the governance right to make an "
              "accepted assertion independently, and that right is not a function of headcount."),
        ("p", "<b>Third, the most defensible firm may not be the one with the strongest model.</b> In "
              "consequential markets, durable value may accrue to organizations holding accreditation, "
              "liability capacity, evidentiary access, procedural rights, or trusted standing with the "
              "conditioning third party. These are slow assets. They are also, unlike model quality, "
              "not obviously subject to rapid commoditization."),
        ("p", "<b>Fourth, the boundary is a strategic instrument, not only a description.</b> A firm "
              "choosing where to compete can ask whether the position it is entering is one where its "
              "own governance would destroy the asset. If so, partnering, ring-fencing, or standing "
              "aside dominates acquisition."),

        # ── 9. L3 mapping ────────────────────────────────────────
        ("h1", "9. Where the boundary sits in the wider framework"),
        ("p", "The claim originated inside the Supply Chain of Intelligence, a descriptive framework "
              "partitioning AI markets into ten layers from physical resources to compounding memory, "
              "which describes where value, control, and defensibility accumulate. Within that "
              "taxonomy the verification boundary grounds Layer 3, <b>Gatekeeping</b>: the layer that "
              "governs whether a system is allowed in. <b>Evaluating the proposition does not require "
              "accepting the taxonomy.</b> The mapping is provided so that the empirical work can be "
              "located precisely, and because the taxonomy predicts that the boundary is unevenly "
              "distributed across Layer 3 rather than uniform."),
        ("layer", ("L3", "Gatekeeping", "Trust, acceptance, approval. Can the system be allowed in? "
                                        "The slowest position to build and the hardest to replicate.")),
        ("p", "Layer 3 divides into five sublayers. The proposition does not apply equally to all of "
              "them, and that unevenness is itself testable: the sublayers where independence is "
              "constitutive should show separation, and the sublayers where it is not should show "
              "integration even under high consequence."),
        ("table", ([
            ["Sublayer", "Function", "Does the boundary bind?"],
            ["L3a. Compliance and export controls",
             "Regulatory, legal, and policy filters (HIPAA, GDPR, SOC 2, the EU AI Act), plus export "
             "controls, model sovereignty, and data-residency regimes.",
             "Yes, strongly. The conditioning party is explicit and the assertion is addressed to it. "
             "Independence is usually mandated or accredited."],
            ["L3b. Quality gates",
             "Accuracy, hallucination detection, output grading, eval harnesses, regression suites.",
             "Partly. Tooling integrates readily; the <i>assertion</i> derived from it separates only "
             "when a conditioning party relies on it. This is the sublayer most likely to be absorbed, "
             "and therefore the best test of P3."],
            ["L3c. Safety, security, and provenance",
             "Harmful-content filtering, adversarial defense, prompt-injection protection, and content "
             "provenance (C2PA, watermarking, deepfake attestation).",
             "Yes for attestation, no for controls. Provenance claims are assertions to third parties; "
             "filters are internal controls. The split within one sublayer is a sharp prediction."],
            ["L3d. Editorial gates",
             "Tone, brand voice, style, taste, human judgment over what is published.",
             "No, ordinarily. Consequences are usually reputational and internalized by the producer, "
             "so integrated judgment is efficient."],
            ["L3e. Distribution gates",
             "App store approval, ranking, marketplace curation, discovery control.",
             "Different mechanism. Separation here is produced by platform market power, not by "
             "credibility demand, and should not be counted as confirming evidence."],
        ], [1.4, 2.4, 2.7])),
        ("p", "The distinction between L3b and L3c matters for the empirical program. A naive test that "
              "codes all of Layer 3 as boundary-bearing would find mixed results and conclude the "
              "proposition is weak. The proposition predicts the mixture, and predicts its shape: "
              "absorption of eval tooling, persistence of accredited attestation, and no separation at "
              "all in editorial judgment. The remaining layers, the four structural laws, and the "
              "case corpus are documented in the companion working paper and practitioner guide and "
              "are not load-bearing here."),
        ("h1", "10. Limitations"),
        ("p", "The proposition is stated for a five-year horizon and rests on institutional "
              "arrangements that could change. Three limitations deserve explicit statement. First, "
              "the four forms of independence are not equally observable; protected internal functions "
              "are difficult to code from public data, which biases empirical work toward finding "
              "separate firms and may overstate the organizational implication. Second, the theory "
              "does not predict which of the four forms will be selected in a given market, only that "
              "one will be present; a fuller theory would supply that selection mechanism. Third, "
              "cross-jurisdictional variation may confound tests, since the same activity can face "
              "mandated independence in one regime and none in another. That variation is also an "
              "opportunity, since it provides a natural experiment for P4."),
        ("h1", "References"),
    ]
    b += [("ref", r) for r in REFERENCES]
    b += [
        ("space", 8),
        ("h2", "How to cite"),
        ("small", "Arivukkarasu, A. (2026). <i>The verification boundary: institutional independence "
                  "as a boundary condition on platform expansion in AI markets</i> (Academic Theory "
                  "Brief, Version 4.0). Supply Chain of Intelligence. "
                  "https://supplychainofai.com/papers"),
        ("small", "BibTeX: @techreport{arivukkarasu2026vb, author = {Arivukkarasu, Anand}, "
                  "title = {The Verification Boundary: Institutional Independence as a Boundary "
                  "Condition on Platform Expansion in AI Markets}, year = {2026}, "
                  "number = {Academic Theory Brief v4.0}, institution = {Supply Chain of "
                  "Intelligence}, url = {https://supplychainofai.com/papers}}"),
        ("small", "Licensed CC-BY 4.0. Supply Chain of Intelligence&trade; and The Intelligence "
                  "Cube&trade; are trademarks of Anand Arivukkarasu. Earlier drafts used the term "
                  "&ldquo;trust boundary&rdquo;; &ldquo;verification boundary&rdquo; is the settled "
                  "term. Comments and refutations are welcome at linkedin.com/in/anandarivu."),
    ]
    return b


def main():
    cover = cover_page(
        TITLE, SUB,
        f"Supply Chain of Intelligence &middot; Academic Theory Brief &middot; {VERSION} "
        f"&middot; {DATE}",
        [BYLINE,
         "Canonical source: supplychainofai.com/papers &nbsp;&middot;&nbsp; "
         "linkedin.com/in/anandarivu &nbsp;&middot;&nbsp; Licensed CC-BY 4.0",
         "This brief develops one claim and asks to be judged on it alone."],
        abstract=ABSTRACT,
    )
    path = build(os.path.join(OUT, "scoi-verification-boundary.pdf"), blocks(),
                 "The Verification Boundary \u00b7 Academic Theory Brief v4.0", cover)
    print("wrote", path)


if __name__ == "__main__":
    main()
