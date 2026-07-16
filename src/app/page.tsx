import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServicesOverview from "@/components/sections/ServicesOverview";
import PortfolioHighlights from "@/components/sections/PortfolioHighlights";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumiora — Illuminating Digital Excellence",
  description:
    "Lumiora is a premier technology company delivering cutting-edge web development, mobile apps, AI solutions, and digital transformation services.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <PortfolioHighlights />
      <ProcessSteps />
      <Testimonials />
      <CTA />
    </>
  );
}
