import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** When true, emit Article JSON-LD authored by Anand Arivukkarasu (for case studies & live articles). */
  article?: boolean;
  /** ISO date for article published time. */
  datePublished?: string;
}

const SITE = "https://supplychainofai.com";
const AUTHOR = "Anand Arivukkarasu";

const Seo = ({ title, description, path, article, datePublished }: SeoProps) => {
  const url = `${SITE}${path}`;

  const articleLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        author: {
          "@type": "Person",
          name: AUTHOR,
          url: SITE,
          sameAs: ["https://www.linkedin.com/in/anandarivu"],
        },
        creator: { "@type": "Person", name: AUTHOR },
        publisher: { "@type": "Person", name: AUTHOR },
        isBasedOn: {
          "@type": "CreativeWork",
          name: "The Supply Chain of Intelligence",
          author: { "@type": "Person", name: AUTHOR },
          url: SITE,
        },
        ...(datePublished ? { datePublished } : {}),
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
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="article:author" content={AUTHOR} />
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
