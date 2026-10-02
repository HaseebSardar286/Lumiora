import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/sections/CTA";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Stories",
  description: "Client stories and feedback from 8BitField projects.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        badge="Client Stories"
        title="More Client Stories"
        highlight="Coming Soon"
        subtitle="We only publish genuine testimonials from actual clients. Check back as we add verified feedback."
        breadcrumbs={[
          { label: "Work", href: "/portfolio" },
          { label: "Client Stories" },
        ]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed mb-8">
            More client stories coming soon. In the meantime, explore our selected
            work to see the types of software we build.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex px-6 py-3 bg-brand-700 text-white font-semibold rounded-lg hover:bg-brand-800 transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
