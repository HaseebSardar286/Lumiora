import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "In-depth case studies showcasing Lumiora's approach, solutions, and measurable results for our clients.",
};

const cases = [
  { title: "FinTech Analytics Platform", client: "BankFlow Corp", result: "+340% performance, $2B+ daily transactions", tags: ["Next.js", "AWS", "PostgreSQL"] },
  { title: "AI-Powered E-Commerce", client: "NeuralShop", result: "+87% conversion rate, 2M+ products personalised", tags: ["Python", "GPT-4", "React"] },
  { title: "Telemedicine Platform", client: "MedCare Digital", result: "50k+ patients, 4.9★ App Store rating", tags: ["React Native", "Node.js", "HIPAA"] },
  { title: "Multi-Cloud DevOps Platform", client: "Fortune 500 Enterprise", result: "99.99% uptime, 50x deployments/day", tags: ["Kubernetes", "Terraform", "GCP"] },
  { title: "Real-Time Collaboration SaaS", client: "WorkSync Inc.", result: "1M+ users, 300ms global latency", tags: ["WebSockets", "Redis", "Next.js"] },
  { title: "Global Logistics Dashboard", client: "FreightPro", result: "40% operational cost reduction", tags: ["React", "D3.js", "Python"] },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero badge="Case Studies" title="Deep Dives into" highlight="Real Results"
        subtitle="Detailed breakdowns of our most impactful projects — the challenges, our approach, and the measurable outcomes."
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: "Case Studies" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="h-40 bg-brand-700 flex items-end p-5 relative">
                  <FontAwesomeIcon icon={faBriefcase} className="absolute top-5 right-5 w-8 h-8 text-white/30" />
                  <span className="text-white/70 text-xs font-medium">{c.client}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-emerald-600 font-semibold mb-3">{c.result}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {c.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                    Read Case Study <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
