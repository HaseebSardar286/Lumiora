import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "AI Solutions",
  description: "Custom AI and machine learning solutions: LLM integration, predictive analytics, intelligent automation, and computer vision.",
};

const features = [
  "LLM & GPT-4 integration", "Custom ML model development", "Predictive analytics", "Computer vision",
  "NLP & chatbots", "AI-powered automation", "RAG & vector search", "MLOps & model serving",
];

export default function AISolutionsPage() {
  return (
    <>
      <PageHero badge="AI Solutions" title="Intelligent Systems That" highlight="Transform Business"
        subtitle="We harness the power of AI and machine learning to automate processes, unlock insights, and create competitive advantages."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "AI Solutions" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-brand-700 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faBrain} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">
                AI That Delivers <span className="text-brand-700">Real Business Value</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Our AI practice combines deep expertise in machine learning, large language models, and data engineering to build production-grade AI systems that solve real business problems at scale.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-600 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "AI Projects", value: "5+" },
                { label: "Accuracy Rate", value: "97.3%" },
                { label: "Cost Saved", value: "35%+" },
                { label: "Data Points / Day", value: "1M+" },
              ].map((stat) => (
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
          Explore AI Solutions <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
