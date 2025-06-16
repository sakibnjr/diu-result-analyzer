import Head from "next/head";

export function SEOHead({
  title = "DIU Result Analyzer - Free CGPA Calculator for Daffodil International University",
  description = "Calculate DIU CGPA, SGPA, analyze academic results and download transcripts for Daffodil International University students. Free online grade calculator.",
  keywords = "DIU CGPA calculator, DIU SGPA calculator, Daffodil University result, DIU grade calculator, Bangladesh university CGPA",
  canonical = "https://diu-result-analyzer.vercel.app",
  ogImage = "/og-image.jpg",
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DIU Result Analyzer",
    description: description,
    url: canonical,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "SakibNjr",
    },
    about: {
      "@type": "EducationalOrganization",
      name: "Daffodil International University",
      alternateName: "DIU",
      url: "https://daffodilvarsity.edu.bd",
    },
    keywords: keywords,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to calculate DIU CGPA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use our free DIU CGPA calculator to automatically calculate your cumulative GPA. Simply login with your DIU credentials and the tool will fetch all your semester results and calculate your CGPA considering retaken courses.",
        },
      },
      {
        "@type": "Question",
        name: "Is DIU Result Analyzer free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, DIU Result Analyzer is completely free for all Daffodil International University students. You can calculate CGPA, SGPA, view results, and download transcripts without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download my DIU transcript?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can generate and download a professional PDF transcript with all your semester results, grades, and calculated CGPA using our transcript generator feature.",
        },
      },
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="DIU Result Analyzer" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="SakibNjr" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </Head>
  );
}
