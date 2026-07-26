"""
Build the professor-facing summary brief.

  public/papers/scoi-onepager.pdf

Two pages by design, not by overflow. Page one carries the claim, its scope
conditions, and its positioning. Page two carries the falsifiable predictions,
the refutation standard, the one question asked of reviewers, and the citation.

Run: python3 scripts/papers/build_onepager.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import build  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "public", "papers")

VERSION = "Version 1.1"
DATE = "July 2026"


def blocks():
    return [
        # ── Page 1: the claim ────────────────────────────────────
        ("h1", "The Verification Boundary: institutional independence as a limit on "
               "platform expansion in AI markets"),
        ("small",
         "Summary brief &middot; Anand Arivukkarasu &middot; Supply Chain of Intelligence &middot; "
         f"{VERSION} &middot; {DATE} &middot; supplychainofai.com/papers &middot; CC-BY 4.0. "
         "Companion: Academic Theory Paper v4.1 (19 pp.), which is the canonical statement."),

        ("h3", "Abstract"),
        ("small",
         "AI platforms have strong incentives to absorb adjacent workflow, data, and assurance "
         "functions. Existing theories explain why integration occurs; none isolates the recurring "
         "case in which integration destroys the value of the asset being acquired. This work "
         "develops the <b>verification boundary</b>. The scarce asset is not superior intelligence, "
         "nor even superior error detection. It is credible independence."),

        ("h3", "The proposition"),
        ("quote",
         "When an automated output can impose material, difficult-to-recover loss on a party beyond "
         "the producer; when a third party conditions money, permission, coverage, admissibility, "
         "authorization, or liability on an assurance about that output; and when conformity can be "
         "assessed against a sufficiently determinate standard accepted by the conditioning party, "
         "accepted verification will require a governance arrangement that preserves institutional "
         "independence from the generating function. Improvements in generation or checking "
         "capability may reduce the cost and scope of verification, but do not by themselves "
         "eliminate the independence requirement."),

        ("h3", "Scope conditions (conjunctive) and forms of independence"),
        ("bullets", [
            "<b>External consequence.</b> An erroneous output can impose material, "
            "difficult-to-recover loss on a party beyond the producer. Coded ex ante from "
            "reversibility, litigation exposure, and insurance loss experience.",
            "<b>External conditioning.</b> A third party conditions money, permission, coverage, "
            "admissibility, authorization, or liability on an assurance about the output.",
            "<b>Determinate standard.</b> A sufficiently determinate standard, recognized by the "
            "conditioning party, exists against which conformity can be asserted. A quality "
            "preference does not qualify.",
        ]),
        ("small",
         "Independence admits four governance forms, in ascending strength: protected internal "
         "function; ring-fenced entity; regulated professional role; separate firm. <b>The boundary "
         "constrains governance control, not necessarily firm boundaries</b> &mdash; separate-firm "
         "formation is a contingent response, not the proposition."),

        ("h3", "Positioning"),
        ("small",
         "Existing theories identify technical, regulatory, transaction-cost, legitimacy, and "
         "capability constraints on integration; none isolates the condition examined here, where "
         "controlling the assurance function destroys the third-party credibility that gives it "
         "value. Nearest neighbours: envelopment (Eisenmann, Parker &amp; Van Alstyne, 2011); "
         "appropriability (Teece, 1986); transaction costs (Coase, 1937; Williamson, 1985); "
         "credence goods and audit institutions (Akerlof, 1970; Dulleck &amp; Kerschbamer, 2006; "
         "DeAngelo, 1981; Power, 1997). The full paper also tests the claim against independent "
         "V&amp;V, conformity assessment, structural separation, and credible commitment, any of "
         "which may already contain it. Current anchors: SR 11-7 independent model validation; the "
         "EU AI Act's mixed self-assessment and notified-body regime."),


        # ── Page 2: how to refute it ─────────────────────────────
        ("h1", "Falsifiable predictions and refutation standard"),
        ("small", "Five-year horizon from publication. P1&ndash;P3 test the mechanism; "
                  "P4&ndash;P6 test the claim against its two closest rivals, the regulatory "
                  "account and the transitional account."),
        ("table-split", ([
            ["", "Expected observation", "Refuted if"],
            ["P1 Separation",
             "Where all three conditions hold, accepted assurance flows through a protected "
             "function, ring-fenced entity, regulated role, or separate firm.",
             "Conditioning parties routinely accept generator assurance with no separation, "
             "across multiple cycles."],
            ["P2 Capability",
             "As accuracy rises, verification automates and narrows; independent accountability "
             "persists.",
             "Higher accuracy systematically causes assurance requirements to be dropped."],
            ["P3 Expansion bends",
             "Platforms expand into workflow, access, and surface more readily than into "
             "assurance of their own outputs.",
             "A platform repeatedly absorbs such assurance, controls its governance, and keeps "
             "third-party acceptance."],
            ["P4 Private demand",
             "Separation appears wherever a private payer conditions money or liability with no "
             "mandate, at half or more the regulated-market rate.",
             "Separation appears only under statute, and unregulated consequential markets "
             "integrate assurance without buyer resistance."],
            ["P5 Acquisition",
             "Acquired assurance providers are ring-fenced, or lose acceptance.",
             "Fully integrated providers keep acceptance and pricing power over multiple cycles."],
            ["P6 New mandates",
             "Within 24 months of a new requirement, an accredited or separately governed "
             "provider is accepted in most jurisdictions.",
             "Newly regulated domains resolve into single-vendor generation-plus-verification."],
        ], [1.1, 2.75, 2.65])),

        ("h3", "Whole-claim refutation, with coding rules fixed in advance"),
        ("small",
         "One well-documented market in which all three scope conditions hold and the generator's "
         "own attestation is durably accepted. <b>Durably accepted</b>: reliance continues across "
         "more than two renewal, audit, or certification cycles. <b>Scope conditions</b>: coded "
         "independently of whether separation is observed. <b>No separation</b>: no protected "
         "reporting line, no non-overridable refusal right, no external accreditation."),

        ("h3", "Conceded limits"),
        ("small",
         "Separation does not guarantee good verification: issuer-pays ratings and Andersen show "
         "nominal independence can be hollowed out, in which case the prediction is crisis and "
         "re-separation, not absorption. Where an assertion reduces to <i>this computation ran on "
         "this input</i>, cryptographic attestation can displace institutional independence, so "
         "the claim narrows to assertions containing irreducible judgment. Indemnification is "
         "predicted to work only where loss is financial and recoverable."),

        ("h3", "The one question asked of reviewers"),
        ("small",
         "Is the verification boundary already established under another name? If it is, a citation "
         "is the most useful reply. If not, the sharpest contribution is a counter-example "
         "satisfying all three scope conditions that survives the coding rules above."),

        ("h3", "How to cite"),
        ("small",
         "Arivukkarasu, A. (2026). <i>The verification boundary: institutional independence as a "
         "boundary condition on platform expansion in AI markets</i> (Academic Theory Paper, "
         "Version 4.1). Supply Chain of Intelligence. https://supplychainofai.com/papers "
         "&nbsp;&middot;&nbsp; Citation formats: supplychainofai.com/cite &nbsp;&middot;&nbsp; "
         "Comments and refutations: linkedin.com/in/anandarivu. CC-BY 4.0, personal capacity."),
    ]


def main():
    path = build(os.path.join(OUT, "scoi-onepager.pdf"), blocks(),
                 "The Verification Boundary \u00b7 Summary brief")
    print("wrote", path)


if __name__ == "__main__":
    main()
