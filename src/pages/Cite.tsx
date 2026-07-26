import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, Copy, Download, FileDown } from "lucide-react";
import { toast } from "sonner";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import PersonalCapacityNotice from "@/components/PersonalCapacityNotice";
import {
  AUTHOR,
  LICENSE,
  PAPERS,
  SITE,
  bibtex,
  citationFormats,
  ris,
  type PaperMeta,
} from "@/data/papers";

const saveText = (name: string, text: string, mime: string) => {
  const blob = new Blob([text], { type: mime });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
  URL.revokeObjectURL(href);
};

const CitationBlock = ({ paper }: { paper: PaperMeta }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const formats = citationFormats(paper);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success(`Copied ${key}`);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  return (
    <section id={paper.id} className="scroll-mt-24 rounded-lg border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span>{paper.pages}</span>
        <span aria-hidden>·</span>
        <span>Version {paper.version}</span>
        <span aria-hidden>·</span>
        <span>PDF</span>
      </div>
      <h2 className="mt-3 font-serif text-2xl leading-snug text-foreground">{paper.title}</h2>
      <p className="mt-1 font-serif italic text-muted-foreground">{paper.subtitle}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={paper.file}
          download
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" /> PDF
        </a>
        <button
          onClick={() => saveText(`${paper.bibKey}.bib`, bibtex(paper), "application/x-bibtex")}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <FileDown className="h-4 w-4" /> .bib
        </button>
        <button
          onClick={() => saveText(`${paper.bibKey}.ris`, ris(paper), "application/x-research-info-systems")}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <FileDown className="h-4 w-4" /> .ris
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {Object.entries(formats).map(([key, value]) => (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {key}
              </span>
              <button
                onClick={() => copy(key, value)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
              >
                {copied === key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied === key ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded border border-border bg-muted/40 p-3 font-mono text-[12px] leading-relaxed text-foreground/85">
              {value}
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
};

const Cite = () => {
  const allBib = PAPERS.map(bibtex).join("\n\n");

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How to cite the Supply Chain of Intelligence",
    url: `${SITE}/cite`,
    license: LICENSE,
    author: { "@type": "Person", name: AUTHOR, url: `${SITE}/about` },
    citation: PAPERS.map((p) => ({
      "@type": "ScholarlyArticle",
      headline: p.title,
      url: `${SITE}${p.file}`,
      datePublished: p.released,
      version: p.version,
      license: LICENSE,
      author: { "@type": "Person", name: AUTHOR },
    })),
  };

  return (
    <SiteLayout>
      <Seo
        title="How to cite — Supply Chain of Intelligence"
        description="BibTeX, RIS, APA, MLA, and Chicago citations for every Supply Chain of Intelligence document: the summary brief, the academic theory brief, the working paper, and the practitioner guide. Free, CC-BY 4.0."
        path="/cite"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="mb-12">
          <Eyebrow>Citations</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            How to cite this work
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Every document is free and licensed CC-BY 4.0. Attribution to {AUTHOR} and a link to{" "}
            supplychainofai.com is the only condition. Copy a format below, or download a
            reference-manager file.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => saveText("supply-chain-of-intelligence.bib", allBib, "application/x-bibtex")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <FileDown className="h-4 w-4" /> Download all as .bib
            </button>
            <Link
              to="/papers"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Back to the papers
            </Link>
            <Link
              to="/endorse"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Submit a comment or endorsement
            </Link>
          </div>
        </header>

        <div className="space-y-8">
          {PAPERS.map((p) => (
            <CitationBlock key={p.id} paper={p} />
          ))}
        </div>

        <section className="mt-12 rounded-lg border border-border bg-muted/40 p-6">
          <h2 className="font-serif text-xl text-foreground">Citing the framework itself</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            To cite the framework rather than a specific document, point at the canonical reference
            page: Arivukkarasu, A. (2026). <em>The Supply Chain of Intelligence: the ten layers of the
            generative AI stack</em>. {SITE}/framework
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Supply Chain of Intelligence™ and The Intelligence Cube™ are trademarks of {AUTHOR}. The
            trademarks are not licensed under CC-BY; the text and structure are.
          </p>
        </section>

        <div className="mt-12">
          <PersonalCapacityNotice />
        </div>
      </article>
    </SiteLayout>
  );
};

export default Cite;
