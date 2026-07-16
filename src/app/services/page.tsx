import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Lumiora's full suite of technology services: Web Development, Mobile Apps, AI Solutions, QA, DevOps, UI/UX Design, and Product Management.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Our Services"
        title="Everything You Need to"
        highlight="Build & Scale"
        subtitle="From initial concept through to post-launch growth, Lumiora provides every technology capability your business needs under one roof."
        breadcrumbs={[{ label: "Services" }]}
      />
      <ServicesOverview />
      <CTA />
    </>
  );
}
