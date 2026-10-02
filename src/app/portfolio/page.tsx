import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PortfolioHighlights from "@/components/sections/PortfolioHighlights";
import CTA from "@/components/sections/CTA";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Software projects from 8BitField across web applications, business systems, and AI/ML.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge="Our Work"
        title="Selected"
        highlight="Work"
        subtitle="Software projects we've worked on across web applications, business systems, and AI/ML."
        breadcrumbs={[{ label: "Work" }]}
      />
      {/* Show every project — no artificial 3-item limit */}
      <PortfolioHighlights showHeader={false} />
      <section className="pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-6">
          <Link
            href="/portfolio/live-projects"
            className="inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Live projects →
          </Link>
          <Link
            href="/portfolio/case-studies"
            className="inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Case studies →
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
