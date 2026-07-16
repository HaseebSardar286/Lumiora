import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "QA & Testing",
  description: "Comprehensive QA and testing services: automated testing, performance testing, security audits, and manual testing.",
};

export default function QATestingPage() {
  const features = ["Automated test suites", "End-to-end testing", "Performance & load testing", "Security penetration testing", "Mobile device testing", "API testing", "Regression testing", "Accessibility audits"];
  return (
    <>
      <PageHero badge="QA & Testing" title="Quality That" highlight="Builds Trust"
        subtitle="Rigorous quality assurance processes that catch bugs before your users do — ensuring every release is bulletproof."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "QA & Testing" }]}
        gradient="from-brand-700 via-blue-50 to-brand-600" />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-600 flex items-center justify-center shadow-xl mb-6">
                <FontAwesomeIcon icon={faShield} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Ship with <span className="gradient-text">Confidence</span></h2>
              <p className="text-gray-500 leading-relaxed mb-6">Our QA team combines automated and manual testing methodologies to ensure your product meets the highest standards of quality, performance, and security.</p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-700 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Tests Run", value: "10M+", gradient: "from-brand-700 to-brand-600" }, { label: "Bug Detection Rate", value: "99.2%", gradient: "from-brand-700 to-brand-600" }, { label: "Avg Defect Rate", value: "< 0.1%", gradient: "from-brand-700 to-brand-600" }, { label: "Coverage", value: "98%", gradient: "from-brand-700 to-brand-600" }].map((stat) => (
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
        <a href="/get-a-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-700 to-brand-600 text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
          Get a QA Audit <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
