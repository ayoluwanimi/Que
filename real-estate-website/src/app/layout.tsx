import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG, SEO_DEFAULTS } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SEO_DEFAULTS.metaTitle,
  },
  description: SEO_DEFAULTS.metaDescription,
  keywords: SEO_DEFAULTS.keywords,
  authors: [{ name: SITE_CONFIG.company.name }],
  creator: SITE_CONFIG.company.name,
  publisher: SITE_CONFIG.company.name,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_DEFAULTS.metaTitle,
    description: SEO_DEFAULTS.metaDescription,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [{
      url: SEO_DEFAULTS.ogImage,
      width: 1200,
      height: 630,
      alt: SITE_CONFIG.name,
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.metaTitle,
    description: SEO_DEFAULTS.metaDescription,
    images: [SEO_DEFAULTS.ogImage],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
