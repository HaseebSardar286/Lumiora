import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/sections/CTA";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description: "Interested in joining 8BitField? Reach out to discuss opportunities.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        badge="Careers"
        title="Join a Small Team"
        highlight="Building Real Software"
        subtitle="We keep the team flexible and hire for real project needs. If you're interested in working with 8BitField, get in touch."
        breadcrumbs={[{ label: "Careers" }]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed mb-8">
            There are no fabricated open roles listed here. If you&apos;d like to
            collaborate or join the team, send us a short note about your
            background and interests.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 bg-brand-700 text-white font-semibold rounded-lg hover:bg-brand-800 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
