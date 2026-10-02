import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/sections/CTA";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies of 8BitField software projects across web applications, business systems, and AI/ML.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        badge="Case Studies"
        title="Project"
        highlight="Case Studies"
        subtitle="Browse every project with problem, solution, features, technology, and contribution details."
        breadcrumbs={[
          { label: "Work", href: "/portfolio" },
          { label: "Case Studies" },
        ]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaseStudiesGrid />
        </div>
      </section>
      <CTA />
    </>
  );
}
