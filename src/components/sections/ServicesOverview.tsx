import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMobileScreen,
  faBrain,
  faShield,
  faClipboardList,
  faInfinity,
  faPenRuler,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: faGlobe,
    title: "Web Development",
    desc: "Blazing-fast, SEO-optimised web apps built with the latest frameworks and cloud-native architectures.",
    href: "/services/web-development",
    gradient: "from-brand-700 to-brand-900",
    bg: "from-brand-50 to-brand-alt",
    border: "border-brand-200",
  },
  {
    icon: faMobileScreen,
    title: "Mobile Apps",
    desc: "Native and cross-platform apps for iOS & Android that delight users and drive engagement.",
    href: "/services/mobile-apps",
    gradient: "from-brand-600 to-brand-800",
    bg: "from-brand-alt to-brand-50",
    border: "border-brand-200",
  },
  {
    icon: faBrain,
    title: "AI Solutions",
    desc: "Intelligent automation, ML models, and LLM-powered products that give you a competitive edge.",
    href: "/services/ai-solutions",
    gradient: "from-brand-800 to-brand-950",
    bg: "from-brand-100 to-brand-50",
    border: "border-brand-200",
  },
  {
    icon: faShield,
    title: "QA & Testing",
    desc: "Rigorous quality assurance with automated test suites ensuring every release is bulletproof.",
    href: "/services/qa-testing",
    gradient: "from-brand-700 to-brand-600",
    bg: "from-brand-50 to-brand-alt",
    border: "border-brand-100",
  },
  {
    icon: faClipboardList,
    title: "Product Management",
    desc: "Strategic product leadership that aligns technology with your business goals and user needs.",
    href: "/services/product-management",
    gradient: "from-brand-800 to-brand-600",
    bg: "from-brand-50 to-brand-alt",
    border: "border-brand-200",
  },
  {
    icon: faInfinity,
    title: "DevOps",
    desc: "CI/CD pipelines, cloud infrastructure, and SRE practices for maximum reliability and velocity.",
    href: "/services/devops",
    gradient: "from-brand-500 to-brand-800",
    bg: "from-brand-50 to-brand-alt",
    border: "border-brand-100",
  },
  {
    icon: faPenRuler,
    title: "UI/UX Design",
    desc: "Human-centred design that transforms complexity into intuitive, beautiful user experiences.",
    href: "/services/ui-ux-design",
    gradient: "from-brand-600 to-brand-accent",
    bg: "from-brand-50 to-brand-alt",
    border: "border-brand-200",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/30 to-white pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            badge="What We Do"
            title="Services That"
            highlight="Drive Growth"
            subtitle="From concept to deployment — we cover every dimension of digital product development."
            align="left"
          />
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors shrink-0"
          >
            View All Services{" "}
            <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <Link key={svc.title} href={svc.href} className="group block">
              <div
                className={`glass-card rounded-2xl p-6 h-full border ${svc.border} bg-gradient-to-br ${svc.bg} bg-opacity-40 relative overflow-hidden`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <FontAwesomeIcon icon={svc.icon} className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-bold text-slate-900 mb-2 text-base">{svc.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  Learn more{" "}
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                </div>

                {/* Hover shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/30 to-transparent rounded-2xl transition-opacity duration-300 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
