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
  /** Previous page URL path in a paginated series, emitted as <link rel="prev">. */
  prevPath?: string;
  /** Next page URL path in a paginated series, emitted as <link rel="next">. */
  nextPath?: string;
  /** Extra JSON-LD graphs to emit alongside the article schema. */
  jsonLd?: Record<string, unknown>[];
  /** Absolute or site-relative social share image. Defaults to the site OG image. */
  image?: string;
  /** Breadcrumb trail (Home first, current page last) — emitted as BreadcrumbList JSON-LD. */
  breadcrumbs?: { name: string; path: string }[];
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
  prevPath,
  nextPath,
  jsonLd,
  image,
  breadcrumbs,
}: SeoProps) => {
  const url = `${SITE}${path}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE}${image}`
    : `${SITE}/og-image.png`;
  const isArticle = article || news;

  const articleLd = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": news ? "NewsArticle" : "Article",
        headline: title.slice(0, 110),
        description,
        image: [imageUrl],
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

  const breadcrumbLd =
    breadcrumbs && breadcrumbs.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: `${SITE}${crumb.path}`,
          })),
        }
      : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={AUTHOR} />
      <link rel="canonical" href={url} />
      {prevPath && <link rel="prev" href={`${SITE}${prevPath}`} />}
      {nextPath && <link rel="next" href={`${SITE}${nextPath}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content="Supply Chain of Intelligence™" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@anandarivu" />
      <meta name="twitter:site" content="@anandarivu" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />
      {articleLd && (
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      )}
      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
      {jsonLd?.map((graph, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(graph)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
