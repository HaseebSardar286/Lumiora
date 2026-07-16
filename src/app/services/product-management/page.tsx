import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Product Management",
  description: "Expert product management services: roadmap strategy, sprint planning, stakeholder alignment, and product-market fit validation.",
};

export default function ProductManagementPage() {
  const features = ["Product strategy & vision", "Roadmap planning", "Agile sprint facilitation", "Stakeholder management", "User research & validation", "OKR & metrics frameworks", "Go-to-market planning", "Product-market fit analysis"];
  return (
    <>
      <PageHero badge="Product Management" title="Strategy That" highlight="Ships Products"
        subtitle="Expert product leadership that bridges business goals, user needs, and technical feasibility to ship products that matter."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Product Management" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-brand-700 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faClipboardList} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Product <span className="text-brand-700">Clarity & Direction</span></h2>
              <p className="text-gray-500 leading-relaxed mb-6">Our product managers bring structure, clarity, and momentum to complex product challenges — aligning teams, setting priorities, and ensuring on-time, on-budget delivery.</p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-700 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Products Shipped", value: "10+" }, { label: "On-time Delivery", value: "95%" }, { label: "Avg Sprint Velocity", value: "+40%" }, { label: "Avg ROI Increase", value: "3.2x" }].map((stat) => (
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
          Start Product Strategy <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
