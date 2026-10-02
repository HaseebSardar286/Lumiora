import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SolutionsOverview from "@/components/sections/SolutionsOverview";
import ProblemFocus from "@/components/sections/ProblemFocus";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Software solutions for startups, growing businesses, existing products, and agencies — from MVPs to modernization.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        title="Built Around Your"
        highlight="Business"
        subtitle="Common scenarios we help with — whether you're launching something new or improving what you already have."
        breadcrumbs={[{ label: "Solutions" }]}
      />
      <SolutionsOverview showLink={false} />
      <ProblemFocus />
      <CTA />
    </>
  );
}
