import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faImages,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "@/components/ui/SectionHeader";

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Development",
    desc: "A real-time analytics platform processing $2B+ in daily transactions.",
    gradient: "from-brand-700 to-brand-900",
    tags: ["Next.js", "TypeScript", "AWS"],
    metrics: "↑ 340% performance",
  },
  {
    title: "MedCare Mobile",
    category: "Mobile App",
    desc: "Telemedicine app connecting 50,000+ patients with healthcare providers.",
    gradient: "from-brand-700 to-brand-600",
    tags: ["React Native", "Node.js", "HIPAA"],
    metrics: "4.9★ App Store",
  },
  {
    title: "NeuralShop AI",
    category: "AI Solutions",
    desc: "LLM-powered e-commerce personalisation engine boosting conversions by 87%.",
    gradient: "from-brand-700 to-brand-600",
    tags: ["Python", "GPT-4", "ML"],
    metrics: "+87% conversions",
  },
  {
    title: "CloudOps Platform",
    category: "DevOps",
    desc: "Multi-cloud infrastructure orchestration for Fortune 500 enterprise.",
    gradient: "from-brand-700 to-brand-600",
    tags: ["Kubernetes", "Terraform", "GCP"],
    metrics: "99.99% uptime",
  },
];

const portfolioCategories = [
  { icon: faBriefcase, label: "Case Studies", href: "/portfolio/case-studies", count: "8+" },
  { icon: faImages, label: "Live Projects", href: "/portfolio/live-projects", count: "12+" },
  { icon: faComments, label: "Testimonials", href: "/portfolio/testimonials", count: "10+" },
];

export default function PortfolioHighlights() {
  return (
    <section className="py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            badge="Our Work"
            title="Portfolio of"
            highlight="Excellence"
            subtitle="A glimpse of the transformative products we have built for our clients."
            align="left"
          />
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors shrink-0"
          >
            View All Work <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {projects.map((proj) => (
            <div key={proj.title} className="glass-card rounded-2xl overflow-hidden group">
              {/* Gradient banner */}
              <div className={`h-36 bg-gradient-to-br ${proj.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,white,transparent_70%)]" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-1.5">{proj.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{proj.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-bold text-emerald-600">{proj.metrics}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {portfolioCategories.map((cat) => (
            <Link key={cat.label} href={cat.href} className="group">
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4 bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={cat.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{cat.label}</p>
                  <p className="text-sm text-brand-600 font-medium">{cat.count} items</p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-4 h-4 text-brand-400 group-hover:text-brand-700 ml-auto group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
