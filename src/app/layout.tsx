import "@/lib/fontawesome";
import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import { BRAND } from "@/lib/brand";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: BRAND.seoTitle,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.seoDescription,
  keywords: [
    "custom software development",
    "SaaS development",
    "web applications",
    "mobile apps",
    "backend systems",
    "AI ML solutions",
    "MVP development",
    "business applications",
    "8BitField",
  ],
  authors: [{ name: BRAND.name }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: BRAND.seoTitle,
    description: BRAND.seoDescription,
    type: "website",
    locale: "en_US",
    siteName: BRAND.name,
    url: BRAND.siteUrl,
    images: [
      {
        url: BRAND.logoPath,
        alt: BRAND.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.seoTitle,
    description: BRAND.seoDescription,
    images: [BRAND.logoPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans relative overflow-x-hidden bg-white text-slate-600">
        <SiteJsonLd />
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <Header />
        <main className="w-full flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
