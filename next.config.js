/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better SEO
  experimental: {
    optimizeCss: true,
  },

  // Compress images for better page speed
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Security headers for better SEO ranking
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: "/cgpa-calculator",
        destination: "/",
      },
      {
        source: "/diu-result-analyzer",
        destination: "/",
      },
      {
        source: "/sgpa-calculator",
        destination: "/",
      },
    ];
  },

  // Compression for better performance
  compress: true,

  // Generate static pages when possible
  output: "standalone",

  // Bundle analyzer for optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = "all";
    }

    return config;
  },

  // Environment variables for SEO
  env: {
    SITE_NAME: "DIU Result Analyzer",
    SITE_DESCRIPTION: "Free CGPA Calculator for DIU Students",
  },
};

module.exports = nextConfig;
