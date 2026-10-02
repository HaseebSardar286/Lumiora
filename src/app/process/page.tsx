import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How 8BitField works: understand, plan, build, test & refine, then launch & support.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        badge="How We Work"
        title="From Idea to"
        highlight="Working Software"
        subtitle="A simple five-step process focused on shipping useful, maintainable software."
        breadcrumbs={[{ label: "Process" }]}
      />
      <ProcessSteps />
      <CTA />
    </>
  );
}
