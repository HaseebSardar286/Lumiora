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
        gradient="from-brand-700 via-pink-50 to-brand-600" />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-accent flex items-center justify-center shadow-xl mb-6">
                <FontAwesomeIcon icon={faPenRuler} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Design Driven by <span className="gradient-text">Empathy & Data</span></h2>
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
              {[{ label: "Designs Shipped", value: "20+", gradient: "from-brand-700 to-brand-accent" }, { label: "Avg UX Score", value: "92/100", gradient: "from-brand-600 to-brand-600" }, { label: "Conversion Lift", value: "+25%", gradient: "from-brand-700 to-brand-600" }, { label: "Accessibility", value: "WCAG AAA", gradient: "from-brand-700 to-brand-600" }].map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white text-center">
        <a href="/get-a-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-700 to-brand-accent text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
          Start a Design Project <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
