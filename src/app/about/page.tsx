import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Why8BitField from "@/components/sections/Why8BitField";
import TeamSection from "@/components/sections/TeamSection";
import EnterpriseExperience from "@/components/sections/EnterpriseExperience";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "8BitField is a small, specialized software development team that helps startups and businesses build custom software products.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About 8BitField"
        title="A Small Team That Builds"
        highlight="Serious Software"
        subtitle="We help startups and businesses build custom software products, business applications, SaaS platforms, mobile apps, backend systems, and AI/ML solutions."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Engineering with clarity and care
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                8BitField is a small, specialized software development team. We are
                not a large enterprise agency — and we don&apos;t pretend to be one.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                Our focus is practical engineering: turning ideas, operational
                problems, and product requirements into reliable, maintainable
                software.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Small enough to communicate directly. Capable enough to build
                serious software.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  value: "5+",
                  label: "Clients",
                  sub: "Businesses and teams we've worked with",
                },
                {
                  value: "8+",
                  label: "Projects",
                  sub: "Across web, business systems, and AI/ML",
                },
                {
                  value: "5+",
                  label: "Team Members",
                  sub: "Web, backend, mobile, and AI/ML",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-slate-200 rounded-xl p-5 bg-slate-50"
                >
                  <p className="font-display text-3xl font-bold text-brand-700 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Why8BitField />
      <TeamSection />
      <EnterpriseExperience />
      <CTA />
    </>
  );
}
