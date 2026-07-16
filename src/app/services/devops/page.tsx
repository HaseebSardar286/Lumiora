import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "DevOps",
  description: "DevOps and cloud infrastructure services: CI/CD pipelines, Kubernetes, Terraform, AWS/GCP/Azure, and site reliability engineering.",
};

export default function DevOpsPage() {
  const features = ["CI/CD pipeline design", "Kubernetes orchestration", "Terraform IaC", "AWS, GCP & Azure", "Site reliability engineering", "24/7 monitoring & alerting", "Security & compliance", "Cost optimisation"];
  return (
    <>
      <PageHero badge="DevOps" title="Infrastructure Built for" highlight="Zero Downtime"
        subtitle="Cloud-native DevOps practices that deliver continuous integration, deployment, and maximum reliability for your mission-critical systems."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "DevOps" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-brand-700 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faInfinity} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Deploy Faster, <span className="text-brand-700">Break Nothing</span></h2>
              <p className="text-gray-500 leading-relaxed mb-6">Our DevOps team designs and implements battle-tested infrastructure that enables teams to ship faster, with confidence. From automated pipelines to multi-cloud orchestration.</p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-600 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Clusters Managed", value: "12+" }, { label: "Avg Uptime", value: "99.99%" }, { label: "Deploy Frequency", value: "5x/day" }, { label: "MTTR", value: "< 5min" }].map((stat) => (
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
          Modernise Your Infrastructure <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
