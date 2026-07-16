import "@/lib/fontawesome";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lumiora — Illuminating Digital Excellence",
    template: "%s | Lumiora",
  },
  description:
    "Lumiora is a premier technology company delivering cutting-edge web development, mobile apps, AI solutions, and digital transformation services that illuminate your path to success.",
  keywords: [
    "web development",
    "mobile apps",
    "AI solutions",
    "UI/UX design",
    "DevOps",
    "QA testing",
    "digital agency",
  ],
  authors: [{ name: "Lumiora" }],
  openGraph: {
    title: "Lumiora — Illuminating Digital Excellence",
    description: "Premium technology solutions for forward-thinking businesses.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumiora — Illuminating Digital Excellence",
    description: "Premium technology solutions for forward-thinking businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans relative overflow-x-hidden bg-white">
        {/* Floating background patterns */}
        <div className="fixed top-1/4 -left-12 w-48 h-48 rounded-full bg-brand-100/30 border border-brand-200/40 pointer-events-none z-[-1] animate-float-slow" />
        <div className="fixed top-2/3 -right-16 w-60 h-60 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none z-[-1] animate-float-fast" style={{ animationDelay: "1s" }} />
        <div className="fixed top-10 right-10 w-24 h-24 rounded-full bg-brand-100/20 border border-brand-200/35 pointer-events-none z-[-1] animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="fixed bottom-10 left-10 w-32 h-32 rounded-full bg-brand-200/25 border border-brand-200/40 pointer-events-none z-[-1] animate-float-fast" style={{ animationDelay: "3s" }} />

        <Header />
        <main className="w-full flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
