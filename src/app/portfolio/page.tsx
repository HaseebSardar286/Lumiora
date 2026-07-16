import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PortfolioHighlights from "@/components/sections/PortfolioHighlights";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse Lumiora's portfolio of case studies, live projects, and client testimonials across web, mobile, AI, and more.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge="Our Portfolio"
        title="Work We're"
        highlight="Proud Of"
        subtitle="Over 20 projects delivered across diverse industries. Here's a look at some of our work."
        breadcrumbs={[{ label: "Portfolio" }]}
        gradient="from-brand-700 via-brand-700 to-brand-600"
      />
      <PortfolioHighlights />
      <Testimonials />
      <CTA />
    </>
  );
}
