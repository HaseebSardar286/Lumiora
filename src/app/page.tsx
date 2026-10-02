import Hero from "@/components/sections/Hero";
import ProblemFocus from "@/components/sections/ProblemFocus";
import ServicesOverview from "@/components/sections/ServicesOverview";
import SolutionsOverview from "@/components/sections/SolutionsOverview";
import ProcessSteps from "@/components/sections/ProcessSteps";
import PortfolioHighlights from "@/components/sections/PortfolioHighlights";
import Why8BitField from "@/components/sections/Why8BitField";
import TechStackSlider from "@/components/sections/TechStackSlider";
import TeamSection from "@/components/sections/TeamSection";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import ContactSection from "@/components/sections/ContactSection";
import EnterpriseExperience from "@/components/sections/EnterpriseExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "8BitField | Custom Software Development for Businesses & Startups",
  description:
    "8BitField builds custom web applications, SaaS products, backend systems, mobile applications, and AI/ML solutions for businesses and startups.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemFocus />
      <ServicesOverview />
      <SolutionsOverview />
      <ProcessSteps />
      <PortfolioHighlights limit={6} viewAllHref="/portfolio" />
      <EnterpriseExperience />
      <Why8BitField />
      <TechStackSlider />
      <TeamSection />
      <FAQ />
      <CTA />
      <ContactSection />
    </>
  );
}
