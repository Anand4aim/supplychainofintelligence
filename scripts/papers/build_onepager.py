"""
Build the professor-facing one-pager.

  public/papers/scoi-onepager.pdf

A single page: abstract, the key claim, the six falsifiable predictions in
compressed form, where the claim sits in the framework, and how to cite.
Designed to be the first attachment in an academic outreach email.

Run: python3 scripts/papers/build_onepager.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import build  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "public", "papers")

VERSION = "Version 1.0"
DATE = "July 2026"


def blocks():
    return [
        ("h1", "The Verification Boundary &mdash; one page"),
        ("small",
         "Anand Arivukkarasu &middot; Supply Chain of Intelligence &middot; "
         f"{VERSION} &middot; {DATE} &middot; supplychainofai.com/papers &middot; CC-BY 4.0. "
         "Written in a personal capacity."),

        ("h3", "Abstract"),
        ("p",
         "Strategy and organization theory explain why firms integrate complementary assets, "
         "envelop adjacent markets, and select governance that economizes on transaction costs. "
         "They do not specify the recurring limit that appears when an automated system produces "
         "consequential outputs and a third party must rely on an assurance about them. This work "
         "develops the <b>verification boundary</b>, a stopping rule that platform envelopment "
         "leaves open. The scarce asset is not superior intelligence, nor even superior error "
         "detection; it is credible independence. The claim predicts a credibility boundary to "
         "platform expansion rather than a technical one, and is stated so that it can be refuted."),

        ("h3", "Key claim"),
        ("quote",
         "When an automated output can create material, difficult-to-recover losses for parties "
         "beyond its producer, and an external actor conditions money, permission, admissibility, "
         "or liability on an assurance about that output, credible verification must remain "
         "institutionally independent from generation. Improvements in the generator&rsquo;s "
         "technical capability do not, by themselves, relax this requirement."),
        ("small",
         "Scope conditions are conjunctive: <b>(i)</b> consequential output, <b>(ii)</b> reliance "
         "by a party other than the producer, <b>(iii)</b> an external actor conditioning a "
         "decision on the assurance. Independence admits four forms, ordered by strength: a "
         "protected internal function, a ring-fenced subsidiary, a regulated professional role, "
         "and a separate firm. Separate-firm formation is a contingent organizational response, "
         "not the proposition itself."),

        ("h3", "Falsifiable predictions (five-year horizon)"),
        ("table-split", ([
            ["", "Expected observation", "Refuted if"],
            ["P1 Governance separation",
             "Accepted assurance flows through a protected function, ring-fenced entity, regulated "
             "role, or separate firm.",
             "Conditioning parties routinely accept generator assurance with no separation, across "
             "renewal cycles."],
            ["P2 Capability does not erase independence",
             "As accuracy rises, verification becomes automated and selective; independent "
             "accountability persists.",
             "Higher accuracy systematically causes assurance requirements to be dropped."],
            ["P3 Expansion bends",
             "Generation platforms expand into workflow, access, and surface more readily than into "
             "assurance of their own outputs.",
             "A platform repeatedly absorbs such assurance and retains third-party acceptance."],
            ["P4 Private conditioning suffices",
             "Separation appears in unregulated markets wherever a private payer conditions money or "
             "liability on the assurance.",
             "Separation appears only under statute; unregulated consequential markets integrate "
             "assurance freely."],
            ["P5 Acquisition without ring-fencing",
             "Acquired assurance providers are either ring-fenced or lose third-party acceptance.",
             "Fully integrated providers retain acceptance and pricing power over multiple cycles."],
            ["P6 Mandates produce roles",
             "New assurance requirements produce an independent role or accreditation within roughly "
             "two years.",
             "Newly regulated domains resolve into single-vendor generation-plus-verification."],
        ], [1.35, 2.6, 2.55])),
        ("small",
         "<b>Whole-claim refutation.</b> One well-documented market in which all three scope "
         "conditions hold and the generator&rsquo;s own attestation is durably accepted by the "
         "conditioning third party, across multiple cycles and without ring-fencing."),

        ("h3", "Where the claim sits"),
        ("p",
         "The boundary is located at Layer 3 (Gatekeeping) of the Supply Chain of Intelligence, a "
         "ten-layer account of where value is created, captured, and defended in AI markets. The "
         "taxonomy is supporting context; the proposition can be evaluated without it. Positioning "
         "is against Eisenmann, Parker &amp; Van Alstyne (2011) on envelopment, Teece (1986) on "
         "complementary assets, Coase (1937) and Williamson (1985) on boundaries, Akerlof (1970) "
         "and Dulleck &amp; Kerschbamer (2006) on credence goods, and Power (1997) on audit society."),

        ("h3", "The one question asked of reviewers"),
        ("p",
         "Is the verification boundary already contained in an existing result under another name? "
         "If it is, a citation is the most useful reply. If it is not, the sharpest contribution is "
         "a counter-example that satisfies all three scope conditions and survives the refutation "
         "test above."),

        ("h3", "How to cite"),
        ("small",
         "Arivukkarasu, A. (2026). <i>The verification boundary: institutional independence as a "
         "boundary condition on platform expansion in AI markets</i> (Academic Theory Brief, "
         "Version 4.0). Supply Chain of Intelligence. https://supplychainofai.com/papers"),
        ("small",
         "BibTeX: @techreport{arivukkarasu2026vb, author = {Arivukkarasu, Anand}, title = {The "
         "Verification Boundary: Institutional Independence as a Boundary Condition on Platform "
         "Expansion in AI Markets}, year = {2026}, number = {Academic Theory Brief v4.0}, "
         "institution = {Supply Chain of Intelligence}, "
         "url = {https://supplychainofai.com/papers}}"),
        ("small",
         "Full brief (15 pp.), working paper (19 pp.), and practitioner guide (45 pp.) at "
         "supplychainofai.com/papers. Citation formats for every document at "
         "supplychainofai.com/cite. Comments and refutations: linkedin.com/in/anandarivu."),
    ]


def main():
    path = build(os.path.join(OUT, "scoi-onepager.pdf"), blocks(),
                 "The Verification Boundary \u00b7 One-page summary")
    print("wrote", path)


if __name__ == "__main__":
    main()
