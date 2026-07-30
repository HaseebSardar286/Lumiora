"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faImages,
  faComments,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "@/components/ui/SectionHeader";
import { Project } from "@/data/projects";

const portfolioCategories = [
  // { icon: faBriefcase, label: "Case Studies", href: "/portfolio/case-studies", count: "6+" },
  { icon: faImages, label: "Live Projects", href: "/portfolio/live-projects", count: "7+" },
  { icon: faComments, label: "Testimonials", href: "/portfolio/testimonials", count: "3+" },
];

export default function PortfolioHighlights() {
  const [highlightProjects, setHighlightProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          setHighlightProjects(data.projects.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error loading portfolio highlights:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-brand-100/35 border border-brand-200/40 pointer-events-none" />

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
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-50 border border-slate-200 rounded-2xl h-[280px] flex flex-col" />
            ))
          ) : (
            highlightProjects.map((proj) => (
              <Link
                key={proj.title}
                href={`/portfolio/project/${proj.slug}`}
                className="group bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
              >
                {/* Image banner */}
                <div className="h-36 relative overflow-hidden bg-brand-700 flex-shrink-0">
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 z-10">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 mb-1.5 text-sm group-hover:text-brand-700 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1">{proj.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-emerald-600">{proj.metrics}</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-800 transition-colors">
                    View Details <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 max-w-4xl mx-auto gap-5">
          {portfolioCategories.map((cat) => (
            <Link key={cat.label} href={cat.href} className="group">
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex items-center gap-4 hover:shadow-md hover:border-brand-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-brand-700 flex items-center justify-center">
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
