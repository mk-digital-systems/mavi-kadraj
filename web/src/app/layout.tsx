import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import OzelGunEkrani from "@/components/OzelGunEkrani";

/** Genel site OG — public/images/mavi-kadraj-og.jpg */
const DEFAULT_OG = {
  url: "/images/mavi-kadraj-og.jpg",
  width: 1200,
  height: 630,
  alt: "Mavi Kadraj",
} as const;

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-inter",
});

/** Mobil tarayıcıların gerçek genişliği kullanması — aksi halde `md:` yanlış eşleşebilir */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1218",
};

export const metadata: Metadata = {
  applicationName: site.name,
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "tr_TR",
    type: "website",
    url: site.url,
    siteName: site.name,
    images: [DEFAULT_OG],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [DEFAULT_OG.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${outfit.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="relative min-h-[100dvh] overflow-x-clip antialiased">
        <div className="mk-grain" aria-hidden />
        <div className="relative z-10 flex min-h-[100dvh] flex-col">{children}</div>
        <OzelGunEkrani />
      </body>
    </html>
  );
}
