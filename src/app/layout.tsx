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
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="w-full flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
