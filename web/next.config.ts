import type { NextConfig } from "next";

/** Üretim: Vercel (medya / görseller CDN + edge). */
const nextConfig: NextConfig = {
  /* Dev’de Strict Mode bileşeni iki kez mount eder; canvas/kar katmanı ile bazen lokal titreme. Prod’da çift mount zaten yok. */
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/harita",
        destination: "/kadraj-yansimalari",
        statusCode: 301,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mavikadraj.com.tr",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
