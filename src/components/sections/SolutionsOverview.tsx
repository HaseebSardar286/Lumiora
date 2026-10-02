import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faChartLine,
  faCodeBranch,
  faHandshake,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const solutions = [
  {
    icon: faRocket,
    title: "Startups",
    desc: "MVPs, SaaS products, prototypes, dashboards, and scalable backend systems.",
  },
  {
    icon: faChartLine,
    title: "Growing Businesses",
    desc: "CRM, ERP, inventory, operations, customer portals, and automation.",
  },
  {
    icon: faCodeBranch,
    title: "Existing Products",
    desc: "Feature development, maintenance, bug fixing, optimization, and modernization.",
  },
  {
    icon: faHandshake,
    title: "Agencies",
    desc: "White-label development and additional engineering capacity.",
  },
];

export default function SolutionsOverview({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Built Around Your Business
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Instead of listing technologies first, we start with the business
              scenarios you actually need help with.
            </p>
          </div>
          {showLink && (
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors shrink-0"
            >
              Explore solutions
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item) => (
            <div
              key={item.title}
              className="bg-slate-50 border border-slate-100 rounded-xl p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-bit-cyan/30 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-bit-cyan-dark" />
              </div>
              <h3 className="font-display font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
