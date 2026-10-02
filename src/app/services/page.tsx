import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TechStackSlider from "@/components/sections/TechStackSlider";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "8BitField builds business applications, SaaS & MVPs, web & backend systems, mobile apps, and practical AI/ML solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="What We"
        highlight="Build"
        subtitle="Custom software around your actual business requirements — web, backend, mobile, and AI/ML."
        breadcrumbs={[{ label: "Services" }]}
      />
      <ServicesOverview />
      <TechStackSlider />
      <CTA />
    </>
  );
}
