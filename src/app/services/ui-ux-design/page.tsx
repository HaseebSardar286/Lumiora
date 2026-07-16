import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "UI/UX Design",
  description: "Human-centred UI/UX design services: user research, wireframing, prototyping, design systems, and accessibility-first interfaces.",
};

export default function UIUXDesignPage() {
  const features = ["User research & interviews", "Information architecture", "Wireframing & prototyping", "Visual UI design", "Design systems & tokens", "Usability testing", "Interaction design", "Accessibility (WCAG 2.2)"];
  return (
    <>
      <PageHero badge="UI/UX Design" title="Design That" highlight="Delights & Converts"
        subtitle="Human-centred design experiences that turn complex problems into intuitive, beautiful interfaces your users will love."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "UI/UX Design" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-brand-700 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faPenRuler} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Design Driven by <span className="text-brand-700">Empathy & Data</span></h2>
              <p className="text-gray-500 leading-relaxed mb-6">Our designers combine deep user empathy with data-driven decision making to create interfaces that are not just beautiful — they convert, retain, and delight.</p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-600 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Designs Shipped", value: "20+" }, { label: "Avg UX Score", value: "92/100" }, { label: "Conversion Lift", value: "+25%" }, { label: "Accessibility", value: "WCAG AAA" }].map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <p className="text-3xl font-black text-brand-700 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white text-center">
        <a href="/get-a-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-bold rounded-2xl shadow-sm hover:bg-brand-800 transition-colors duration-200">
          Start a Design Project <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
