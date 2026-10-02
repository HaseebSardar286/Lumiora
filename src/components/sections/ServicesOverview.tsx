import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faRocket,
  faServer,
  faMobileScreen,
  faBrain,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    icon: faBuilding,
    title: "Business Applications",
    desc: "Custom software for businesses that need more than spreadsheets and disconnected tools.",
    examples: [
      "CRM",
      "ERP",
      "Inventory management",
      "Business dashboards",
      "Booking systems",
      "Management portals",
      "Internal tools",
      "Customer portals",
    ],
    cta: "Discuss Your Business Application",
    href: "/contact?type=Business+Application",
  },
  {
    icon: faRocket,
    title: "SaaS & MVP Development",
    desc: "Turn an idea into a working product that can be tested, launched, and improved.",
    examples: [
      "SaaS platforms",
      "Startup MVPs",
      "Subscription systems",
      "Admin dashboards",
      "User management",
      "Authentication",
      "Payment integrations",
      "API development",
    ],
    cta: "Build Your MVP",
    href: "/contact?type=SaaS+%2F+MVP",
  },
  {
    icon: faServer,
    title: "Web & Backend Development",
    desc: "Reliable web applications and backend systems designed around your requirements.",
    examples: [
      "REST APIs",
      "Java / Spring Boot",
      "Node.js",
      "Angular",
      "React",
      "Next.js",
      "PostgreSQL / MySQL",
      "MongoDB",
    ],
    cta: "Start a Project",
    href: "/contact?type=Web+Application",
  },
  {
    icon: faMobileScreen,
    title: "Mobile Applications",
    desc: "Mobile applications that connect users to your products, services, and business systems.",
    examples: [
      "Cross-platform apps",
      "Android",
      "iOS",
      "React Native",
      "API integration",
      "Authentication",
      "Notifications",
      "Business apps",
    ],
    cta: "Start a Project",
    href: "/contact?type=Mobile+Application",
  },
  {
    icon: faBrain,
    title: "AI & Computer Vision",
    desc: "Practical AI and computer-vision solutions designed around real business problems.",
    examples: [
      "Image classification",
      "Object detection",
      "Computer vision",
      "ML models",
      "OCR",
      "Document processing",
      "Prediction APIs",
      "Python ML services",
    ],
    cta: "Start a Project",
    href: "/contact?type=AI+%2F+Machine+Learning",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What We Build
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We bring together web, backend, mobile, and AI/ML expertise to build
              software around your actual business requirements.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors shrink-0"
          >
            View all services
            <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col hover:border-brand-200 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-bit-cyan flex items-center justify-center mb-5">
                <FontAwesomeIcon icon={svc.icon} className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">
                {svc.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{svc.desc}</p>
              <ul className="flex flex-wrap gap-1.5 mb-6">
                {svc.examples.slice(0, 6).map((ex) => (
                  <li
                    key={ex}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
              <Link
                href={svc.href}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-bit-cyan-dark hover:text-bit-orange transition-colors"
              >
                {svc.cta}
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
