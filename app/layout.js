import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "DIU Result Analyzer - CGPA Calculator & Academic Dashboard | Daffodil International University",
  description:
    "Free DIU CGPA calculator and academic result analyzer for Daffodil International University students. Calculate SGPA, CGPA, view semester results, and download academic transcripts instantly.",
  keywords: [
    "DIU CGPA calculator",
    "DIU SGPA calculator",
    "Daffodil International University result",
    "DIU result analyzer",
    "DIU academic dashboard",
    "DIU CGPA checker",
    "DIU grade calculator",
    "DIU semester result",
    "DIU student portal alternative",
    "Bangladesh university CGPA calculator",
    "DIU result viewer",
    "DIU academic performance tracker",
    "Daffodil University result checker",
    "DIU GPA calculator online",
    "DIU result analysis tool",
  ].join(", "),
  authors: [{ name: "SakibNjr", url: "https://github.com/sakibnjr" }],
  creator: "SakibNjr",
  publisher: "DIU Result Analyzer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://diu-result-analyzer.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diu-result-analyzer.vercel.app",
    title: "DIU Result Analyzer - Free CGPA Calculator for DIU Students",
    description:
      "Calculate your DIU CGPA, SGPA, and analyze academic performance with our free result analyzer for Daffodil International University students.",
    siteName: "DIU Result Analyzer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DIU Result Analyzer - CGPA Calculator Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIU Result Analyzer - Free CGPA Calculator",
    description:
      "Calculate DIU CGPA, SGPA & analyze academic results for Daffodil International University students",
    images: ["/og-image.jpg"],
    creator: "@sakibnjr",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  category: "Education",
  classification: "Educational Tool",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#2563eb",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DIU Result Analyzer",
  description:
    "Free CGPA and SGPA calculator for Daffodil International University students with academic result analysis and transcript generation.",
  url: "https://diu-result-analyzer.vercel.app",
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
  keywords:
    "DIU CGPA calculator, DIU SGPA calculator, Daffodil University result, academic dashboard, grade calculator",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  isFamilyFriendly: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://gateway7.diu.edu.bd" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
