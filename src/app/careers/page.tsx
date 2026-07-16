import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot, faClock, faBriefcase, faArrowRight, faUsers, faRocket, faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Lumiora team — open roles in engineering, design, product management, and more.",
};

const openings = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Remote / SF", type: "Full-time" },
  { title: "AI/ML Engineer", dept: "AI Practice", location: "Remote", type: "Full-time" },
  { title: "Lead UI/UX Designer", dept: "Design", location: "Remote / London", type: "Full-time" },
  { title: "DevOps Engineer", dept: "Infrastructure", location: "Remote", type: "Full-time" },
  { title: "Product Manager", dept: "Product", location: "San Francisco", type: "Full-time" },
  { title: "QA Automation Engineer", dept: "Quality", location: "Remote", type: "Full-time" },
];

const perks = [
  { icon: faUsers, title: "Collaborative Culture", desc: "Work with brilliant people who care deeply about craft and impact." },
  { icon: faRocket, title: "Rapid Growth", desc: "Clear career paths, regular promotions, and learning budgets." },
  { icon: faHeart, title: "Great Benefits", desc: "Competitive salary, equity, health insurance, and generous PTO." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        badge="Careers"
        title="Build the Future"
        highlight="With Us"
        subtitle="We're hiring brilliant engineers, designers, and strategists who are passionate about creating exceptional digital products."
        breadcrumbs={[{ label: "Careers" }]}
      />

      {/* Perks */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {perks.map((p) => (
              <GlassCard key={p.title} className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-brand-700 flex items-center justify-center shadow-sm shrink-0">
                  <FontAwesomeIcon icon={p.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Open roles */}
          <h2 className="text-3xl font-black text-slate-900 mb-8">
            Open <span className="text-brand-700">Positions</span>
          </h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div key={job.title} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md hover:border-brand-200 transition-all duration-200 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-750 bg-brand-700 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-gray-400">{job.dept}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-brand-500" />{job.location}</span>
                  <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} className="w-3 h-3 text-brand-500" />{job.type}</span>
                  <Link href="#" className="flex items-center gap-1.5 px-4 py-2 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors">
                    Apply <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </Link>
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
