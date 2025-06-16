export default function robots() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://diu-result-analyzer.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
