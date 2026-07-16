import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Live Projects",
  description: "Browse Lumiora's live, deployed projects across web, mobile, and AI — see our work in action.",
};

const projects = [
  { title: "FinFlow Dashboard", category: "Web App", status: "Live", url: "#", gradient: "from-brand-700 to-brand-900", desc: "Real-time financial analytics platform." },
  { title: "MedCare iOS App", category: "Mobile", status: "Live", url: "#", gradient: "from-brand-700 to-brand-600", desc: "Telemedicine mobile application." },
  { title: "NeuralShop AI", category: "AI Platform", status: "Live", url: "#", gradient: "from-brand-700 to-brand-600", desc: "AI-powered product recommendation engine." },
  { title: "CloudOps Portal", category: "DevOps", status: "Live", url: "#", gradient: "from-brand-700 to-brand-600", desc: "Multi-cloud infrastructure management." },
  { title: "WorkSync SaaS", category: "Web App", status: "Live", url: "#", gradient: "from-brand-800 to-brand-600", desc: "Real-time team collaboration platform." },
  { title: "FreightPro Dashboard", category: "Web App", status: "Live", url: "#", gradient: "from-brand-400 to-brand-700", desc: "Global logistics operations dashboard." },
  { title: "EduLearn Platform", category: "Web App", status: "Live", url: "#", gradient: "from-brand-700 to-brand-accent", desc: "AI-powered personalised learning." },
  { title: "RetailAI Analytics", category: "AI Platform", status: "Live", url: "#", gradient: "from-brand-600 to-brand-600", desc: "Predictive retail analytics system." },
];

export default function LiveProjectsPage() {
  return (
    <>
      <PageHero badge="Live Projects" title="Production-Ready" highlight="Live Deployments"
        subtitle="A selection of our live, deployed products actively serving users around the world."
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: "Live Projects" }]}
        gradient="from-white via-brand-alt to-brand-50"
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((p) => (
              <GlassCard key={p.title} className="flex flex-col">
                <div className={`h-28 rounded-xl bg-gradient-to-br ${p.gradient} mb-4 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,white,transparent_70%)]" />
                  <span className="text-white font-black text-lg opacity-30">{p.category}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">{p.status}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3 flex-1">{p.desc}</p>
                <a href={p.url} className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors">
                  View Live <FontAwesomeIcon icon={faExternalLink} className="w-3 h-3" />
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
