// Canonical citation metadata for every downloadable document.
// Single source of truth for /papers and /cite. Keep in sync with the
// PDF build scripts in scripts/papers/.

export type PaperMeta = {
  id: string;
  file: string;
  title: string;
  subtitle: string;
  pages: string;
  version: string;
  year: number;
  released: string; // ISO
  bibKey: string;
  kind: "techreport" | "misc";
  note: string;
};

export const SITE = "https://supplychainofai.com";
export const AUTHOR = "Anand Arivukkarasu";
export const LICENSE = "https://creativecommons.org/licenses/by/4.0/";

export const PAPERS: PaperMeta[] = [
  {
    id: "onepager",
    file: "/papers/scoi-onepager.pdf",
    title: "The Verification Boundary — summary brief",
    subtitle:
      "Abstract, proposition, and six falsifiable predictions with refutation criteria",
    pages: "3 pages",
    version: "1.1",
    year: 2026,
    released: "2026-07-26",
    bibKey: "arivukkarasu2026vbsummary",
    kind: "techreport",
    note: "Summary Brief v1.1",
  },
  {
    id: "theory-brief",
    file: "/papers/scoi-verification-boundary.pdf",
    title:
      "The Verification Boundary: institutional independence as a boundary condition on platform expansion in AI markets",
    subtitle: "Academic theory paper",
    pages: "19 pages",
    version: "4.1",
    year: 2026,
    released: "2026-07-26",
    bibKey: "arivukkarasu2026vb",
    kind: "techreport",
    note: "Academic Theory Paper v4.1",
  },
  {
    id: "working-paper",
    file: "/papers/scoi-working-paper.pdf",
    title:
      "Supply Chain of Intelligence: where competitive advantage accumulates in artificial intelligence markets",
    subtitle: "Working paper",
    pages: "19 pages",
    version: "2.0",
    year: 2026,
    released: "2026-07-26",
    bibKey: "arivukkarasu2026scoi",
    kind: "techreport",
    note: "Working Paper v2.0",
  },
  {
    id: "practitioner-guide",
    file: "/papers/scoi-practitioner-guide.pdf",
    title: "Supply Chain of Intelligence: practitioner guide",
    subtitle: "Taxonomy, laws, instruments, and applications",
    pages: "45 pages",
    version: "2.0",
    year: 2026,
    released: "2026-07-26",
    bibKey: "arivukkarasu2026scoiguide",
    kind: "techreport",
    note: "Practitioner Guide v2.0",
  },
];

const url = (p: PaperMeta) => `${SITE}${p.file}`;

const monthDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const bibtex = (p: PaperMeta) =>
  `@techreport{${p.bibKey},
  author      = {Arivukkarasu, Anand},
  title       = {${p.title}},
  institution = {Supply Chain of Intelligence},
  type        = {${p.note}},
  year        = {${p.year}},
  month       = {jul},
  url         = {${url(p)}},
  note        = {Licensed CC-BY 4.0}
}`;

export const ris = (p: PaperMeta) =>
  [
    "TY  - RPRT",
    "AU  - Arivukkarasu, Anand",
    `TI  - ${p.title}`,
    "PB  - Supply Chain of Intelligence",
    `PY  - ${p.year}`,
    `DA  - ${p.released.replace(/-/g, "/")}`,
    `M3  - ${p.note}`,
    `UR  - ${url(p)}`,
    "LA  - en",
    "ER  - ",
  ].join("\n");

export const apa = (p: PaperMeta) =>
  `Arivukkarasu, A. (${p.year}). ${p.title} (${p.note}). Supply Chain of Intelligence. ${url(p)}`;

export const mla = (p: PaperMeta) =>
  `Arivukkarasu, Anand. "${p.title}." Supply Chain of Intelligence, ${monthDay(p.released)}, ${url(p)}.`;

export const chicago = (p: PaperMeta) =>
  `Arivukkarasu, Anand. ${p.year}. "${p.title}." ${p.note}. Supply Chain of Intelligence. ${url(p)}.`;

export const citationFormats = (p: PaperMeta) => ({
  BibTeX: bibtex(p),
  RIS: ris(p),
  APA: apa(p),
  MLA: mla(p),
  Chicago: chicago(p),
});
