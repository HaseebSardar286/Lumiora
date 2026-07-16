import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Our Process",
  description: "Discover Lumiora's proven 6-step delivery process — from discovery and strategy through to launch and ongoing support.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        badge="Our Process"
        title="How We Deliver"
        highlight="Consistent Results"
        subtitle="A structured, transparent 6-step methodology that ensures every project is delivered on time, on budget, and above expectations."
        breadcrumbs={[{ label: "Process" }]}
        gradient="from-white via-brand-alt to-brand-50"
      />
      <ProcessSteps />
      <CTA />
    </>
  );
}
