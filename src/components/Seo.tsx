import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** When true, emit Article JSON-LD authored by Anand Arivukkarasu (for case studies & live articles). */
  article?: boolean;
  /** Emit NewsArticle instead of Article — used by the dated news feed so Google News / Top stories can classify it. */
  news?: boolean;
  /** ISO date for article published time. */
  datePublished?: string;
  /** ISO date for last substantive edit. */
  dateModified?: string;
  /** Editorial section, e.g. "AI Strategy" or a vertical name. */
  section?: string;
  /** Topical keywords for news classification and answer engines. */
  keywords?: string[];
  /** Source URLs the piece analyses — emitted as schema.org citation. */
  citations?: string[];
  /** One-paragraph direct answer to the article's question, for answer engines (AEO). */
  answer?: string;
}

const SITE = "https://supplychainofai.com";
const AUTHOR = "Anand Arivukkarasu";

const Seo = ({
  title,
  description,
  path,
  article,
  news,
  datePublished,
  dateModified,
  section,
  keywords,
  citations,
  answer,
}: SeoProps) => {
  const url = `${SITE}${path}`;
  const isArticle = article || news;

  const articleLd = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": news ? "NewsArticle" : "Article",
        headline: title.slice(0, 110),
        description,
        ...(answer ? { abstract: answer } : {}),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "en",
        isAccessibleForFree: true,
        author: {
          "@type": "Person",
          name: AUTHOR,
          url: SITE,
          jobTitle: "AI Product Architect",
          sameAs: ["https://www.linkedin.com/in/anandarivu"],
        },
        creator: { "@type": "Person", name: AUTHOR },
        publisher: { "@type": "Person", name: AUTHOR, url: SITE },
        ...(section ? { articleSection: section } : {}),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
        ...(citations?.length
          ? { citation: citations.map((c) => ({ "@type": "CreativeWork", url: c })) }
          : {}),
        isBasedOn: {
          "@type": "CreativeWork",
          name: "Supply Chain of Intelligence™",
          author: { "@type": "Person", name: AUTHOR },
          url: SITE,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".speakable-answer"],
        },
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified || datePublished
          ? { dateModified: dateModified ?? datePublished }
          : {}),
      }
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={AUTHOR} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="article:author" content={AUTHOR} />
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      {(dateModified ?? datePublished) && (
        <meta property="article:modified_time" content={dateModified ?? datePublished} />
      )}
      {section && <meta property="article:section" content={section} />}
      {keywords?.map((k) => (
        <meta key={k} property="article:tag" content={k} />
      ))}
      {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      {news && <meta name="news_keywords" content={(keywords ?? []).join(", ")} />}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@anandarivu" />
      {articleLd && (
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
