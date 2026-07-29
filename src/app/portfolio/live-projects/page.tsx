import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Live Projects",
  description: "Browse Lumiora's live, deployed projects across web, mobile, and AI — see our work in action.",
};

export default function LiveProjectsPage() {
  return (
    <>
      <PageHero badge="Live Projects" title="Production-Ready" highlight="Live Deployments"
        subtitle="A selection of our live, deployed products actively serving users around the world."
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: "Live Projects" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((p) => (
              <Link key={p.title} href={`/portfolio/project/${p.slug}`} className="group flex">
                <GlassCard className="flex flex-col overflow-hidden w-full transition-all duration-200 group-hover:border-brand-200 group-hover:shadow-md cursor-pointer">
                  <div className="h-28 rounded-xl bg-brand-700 mb-4 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {p.image && (
                      <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-white/90 font-bold text-[10px] z-10 uppercase tracking-wider">{p.category}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-brand-700 transition-colors">{p.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold flex-shrink-0">{p.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 flex-1 leading-relaxed">{p.desc}</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-800 transition-colors mt-auto pt-2 border-t border-gray-100">
                    View Details <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
