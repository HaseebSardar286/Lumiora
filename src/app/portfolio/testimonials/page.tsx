import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our clients say about Lumiora's technology services and project delivery.",
};

const stats = [
  { value: "10+", label: "Client Reviews", gradient: "from-brand-700 to-brand-900" },
  { value: "4.9★", label: "Average Rating", gradient: "from-brand-700 to-brand-600" },
  { value: "95%", label: "Would Recommend", gradient: "from-brand-700 to-brand-600" },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero badge="Testimonials" title="Loved by" highlight="Our Clients"
        subtitle="Hear directly from the founders, CTOs, and product leaders whose businesses we've transformed."
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: "Testimonials" }]}
        gradient="from-brand-700 via-brand-700 to-brand-600"
      />
      <section className="py-12 gradient-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((s) => (
              <GlassCard key={s.label} className="text-center flex flex-col items-center">
                <p className={`text-4xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent mb-1`}>{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="w-3 h-3 text-amber-400" />)}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </>
  );
}
