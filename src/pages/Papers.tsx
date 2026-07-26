import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import PersonalCapacityNotice from "@/components/PersonalCapacityNotice";
import { Download, FileText, GraduationCap, BookOpen } from "lucide-react";

const VERSION = "Version 2.0";
const RELEASED = "2026-07-26";

interface PaperDoc {
  id: string;
  file: string;
  audience: string;
  title: string;
  subtitle: string;
  pages: string;
  icon: typeof FileText;
  accent: string;
  abstract: string;
  contents: string[];
}

const DOCS: PaperDoc[] = [
  {
    id: "onepager",
    file: "/papers/scoi-onepager.pdf",
    audience: "Start here · for professors and reviewers",
    title: "The Verification Boundary — summary brief",
    subtitle: "The abstract, the proposition, and the refutation criteria in three pages",
    pages: "3 pages · Version 1.1",
    icon: FileText,
    accent: "var(--layer-4)",
    abstract:
      "The whole argument compressed to what a reviewer needs before deciding whether to read further: the abstract, the proposition with its three scope conditions, all six falsifiable predictions with refutation criteria, where the claim sits relative to prior literature, and the one question being asked. Designed to be read in four minutes and forwarded without apology.",
    contents: [
      "Abstract and the key claim in full",
      "The three conjunctive scope conditions and four forms of independence",
      "P1–P6 with refutation criteria, plus whole-claim refutation",
      "Positioning against Teece, Eisenmann–Parker–Van Alstyne, Coase, Akerlof, Power",
      "How to cite",
    ],
  },
  {
    id: "theory-brief",
    file: "/papers/scoi-verification-boundary.pdf",
    audience: "For academics and reviewers",
    title: "The Verification Boundary",
    subtitle:
      "Institutional independence as a boundary condition on platform expansion in AI markets",
    pages: "19 pages · Version 4.1",
    icon: GraduationCap,
    accent: "var(--layer-3)",
    abstract:
      "One claim, stated so it can be refuted: where an automated output can impose material, difficult-to-recover losses on parties beyond the producer, and where money, permission, admissibility, or liability depends on a credible assertion of conformity, verification must remain institutionally independent from generation. The brief proposes a stopping rule that platform envelopment leaves open, and answers the obvious objection that this is regulation in theoretical costume.",
    contents: [
      "The proposition, its scope conditions, and the consequence test",
      "Four forms of independence, from protected internal function to separate firm",
      "Positioning against Teece, Eisenmann–Parker–Van Alstyne, Coase, Williamson, Akerlof, Power",
      "Why the claim is not reducible to regulation, with a discriminating test",
      "Six falsifiable predictions (P1–P6) with explicit refutation criteria",
      "Where the boundary sits in Layer 3 (Gatekeeping), sublayer by sublayer",
      "Limitations, an empirical program, and how to cite",
    ],
  },


  {
    id: "working-paper",
    file: "/papers/scoi-working-paper.pdf",
    audience: "For researchers and analysts",
    title: "Supply Chain of Intelligence",
    subtitle:
      "Where competitive advantage accumulates in artificial intelligence markets",
    pages: "19 pages",
    icon: FileText,
    accent: "var(--layer-1)",
    abstract:
      "The full academic treatment: literature review, the ten-layer structure, the four laws and their mechanisms, the three currents, and market vignettes that test the argument against real outcomes.",
    contents: [
      "Literature review and positioning against prior work",
      "The ten layers, three registers, and their half-lives",
      "Four structural laws with mechanisms and escapes",
      "Vignettes: Jasper, NVIDIA, Vanta, Bloomberg, Replit",
      "Limitations, contribution, and a research agenda",
    ],
  },
  {
    id: "practitioner-guide",
    file: "/papers/scoi-practitioner-guide.pdf",
    audience: "For operators and investors",
    title: "Supply Chain of Intelligence — Practitioner Guide",
    subtitle:
      "Taxonomy, laws, instruments, and applications for operators and investors",
    pages: "45 pages",
    icon: BookOpen,
    accent: "var(--layer-5)",
    abstract:
      "The operational companion. Every layer and sublayer, what each is worth, who plays there, the moves that work, the characteristic failure modes, and two instruments for placing a company on the map.",
    contents: [
      "All ten layers and fifty sublayers, with operator notes",
      "The four laws applied to roadmap and diligence decisions",
      "The Defensible Triangle and the Intelligence Cube™",
      "A defensibility audit you can run in an afternoon",
      "Six company archetypes and a glossary",
    ],
  },
];

const Papers = () => {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: "Supply Chain of Intelligence — papers and guides",
    url: "https://supplychainofai.com/papers",
    author: {
      "@type": "Person",
      name: "Anand Arivukkarasu",
      url: "https://supplychainofai.com/about",
      sameAs: ["https://www.linkedin.com/in/anandarivu"],
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    hasPart: DOCS.map((d) => ({
      "@type": "ScholarlyArticle",
      headline: d.title,
      description: d.abstract,
      url: `https://supplychainofai.com${d.file}`,
      datePublished: RELEASED,
      version: "2.0",
      inLanguage: "en",
      license: "https://creativecommons.org/licenses/by/4.0/",
      author: { "@type": "Person", name: "Anand Arivukkarasu" },
      encodingFormat: "application/pdf",
    })),
  };

  return (
    <SiteLayout>
      <Seo
        title="Papers — Supply Chain of Intelligence (PDF downloads)"
        description="Three PDF documents on the Supply Chain of Intelligence: a 19-page academic theory paper on the verification boundary, a 19-page working paper, and a 45-page practitioner guide. Free, CC-BY 4.0."
        path="/papers"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
      </Helmet>

      <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <header className="mb-14">
          <Eyebrow>Downloads · {VERSION}</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Four documents, three audiences
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The same framework written four ways. The two-page summary is the fastest
            route to the claim; scholars can then evaluate it on its own terms;
            researchers get the full argument with its literature; operators get the
            taxonomy and the instruments.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            All are free, licensed CC-BY 4.0, and generated directly from the canonical
            data behind{" "}
            <Link to="/framework" className="underline underline-offset-4">
              /framework
            </Link>
            , so they cannot drift from the site. Ready-made citations live on{" "}
            <Link to="/cite" className="underline underline-offset-4">
              /cite
            </Link>
            .
          </p>

        </header>

        <div className="space-y-8">
          {DOCS.map((doc) => {
            const Icon = doc.icon;
            return (
              <section
                key={doc.id}
                id={doc.id}
                className="rounded-lg border border-border bg-card p-7 md:p-9"
                style={{ borderLeft: `3px solid hsl(${doc.accent})` }}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-4 w-4" style={{ color: `hsl(${doc.accent})` }} />
                  <span>{doc.audience}</span>
                  <span aria-hidden>·</span>
                  <span>{doc.pages}</span>
                  <span aria-hidden>·</span>
                  <span>PDF</span>
                </div>

                <h2 className="mt-4 font-serif text-2xl leading-snug text-foreground md:text-3xl">
                  {doc.title}
                </h2>
                <p className="mt-2 font-serif text-lg italic leading-snug text-muted-foreground">
                  {doc.subtitle}
                </p>

                <p className="mt-5 leading-relaxed text-foreground/85">{doc.abstract}</p>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {doc.contents.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: `hsl(${doc.accent})` }}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={doc.file}
                    download
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Read in browser
                  </a>
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-14 rounded-lg border border-border bg-muted/40 p-7">
          <h2 className="font-serif text-xl text-foreground">How to cite</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Arivukkarasu, A. (2026). <em>Supply Chain of Intelligence: where competitive
            advantage accumulates in artificial intelligence markets</em> (Version 2.0).
            https://supplychainofai.com/papers
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Every document has its own BibTeX, RIS, APA, MLA, and Chicago entry, with
            downloadable <code>.bib</code> and <code>.ris</code> files, on{" "}
            <Link to="/cite" className="underline underline-offset-4">
              the citation page
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/cite"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Citation formats
            </Link>
            <Link
              to="/endorse"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Comment, critique, or endorse
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Released {RELEASED}. Licensed CC-BY 4.0. Supply Chain of Intelligence™ and
            The Intelligence Cube™ are trademarks of Anand Arivukkarasu.
          </p>
        </section>


        <div className="mt-12">
          <PersonalCapacityNotice />
        </div>
      </article>
    </SiteLayout>
  );
};

export default Papers;
