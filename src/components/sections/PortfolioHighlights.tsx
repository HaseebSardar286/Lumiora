"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/data/projects";
import TrackedLink from "@/components/analytics/TrackedLink";

const FEATURED_ORDER = [
  "assetloop-rental-platform",
  "marketing-crm-analytics",
  "cry-care-baby-classification",
];

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    const ai = FEATURED_ORDER.indexOf(a.slug);
    const bi = FEATURED_ORDER.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

type Props = {
  /** Max projects to show. Omit or pass 0 to show all. */
  limit?: number;
  showHeader?: boolean;
  viewAllHref?: string;
};

export default function PortfolioHighlights({
  limit,
  showHeader = true,
  viewAllHref = "/portfolio/live-projects",
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          const sorted = sortProjects(data.projects);
          setProjects(
            limit && limit > 0 ? sorted.slice(0, limit) : sorted
          );
        }
      })
      .catch((err) => console.error("Error loading portfolio highlights:", err))
      .finally(() => setLoading(false));
  }, [limit]);

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Selected Work
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Software projects we&apos;ve worked on across web applications,
                business systems, and AI/ML.
              </p>
            </div>
            {limit && limit > 0 && (
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors shrink-0"
              >
                View all work
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: limit && limit > 0 ? limit : 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-50 border border-slate-200 rounded-xl h-[300px]"
                />
              ))
            : projects.map((proj) => (
                <TrackedLink
                  key={proj.slug}
                  href={`/portfolio/project/${proj.slug}`}
                  event="case_study_click"
                  props={{ project: proj.slug }}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-brand-200 transition-colors flex flex-col"
                >
                  <div className="h-40 relative overflow-hidden bg-brand-800 flex-shrink-0">
                    {proj.image && (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                      <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                        {proj.category}
                      </span>
                    </div>
                    {proj.status && (
                      <span className="absolute top-3 right-3 z-10 text-[10px] px-2 py-0.5 rounded-md bg-white/90 text-slate-700 font-semibold">
                        {proj.status}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-bit-cyan-dark group-hover:text-bit-orange transition-colors">
                      View Case Study
                      <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                    </span>
                  </div>
                </TrackedLink>
              ))}
        </div>
      </div>
    </section>
  );
}
