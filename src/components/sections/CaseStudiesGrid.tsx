"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TrackedLink from "@/components/analytics/TrackedLink";
import { Project } from "@/data/projects";

const FEATURED_ORDER = [
  "assetloop-rental-platform",
  "marketing-crm-analytics",
  "cry-care-baby-classification",
];

export default function CaseStudiesGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          const sorted = [...data.projects].sort((a: Project, b: Project) => {
            const ai = FEATURED_ORDER.indexOf(a.slug);
            const bi = FEATURED_ORDER.indexOf(b.slug);
            if (ai === -1 && bi === -1) return 0;
            if (ai === -1) return 1;
            if (bi === -1) return -1;
            return ai - bi;
          });
          setProjects(sorted);
        }
      })
      .catch((err) => console.error("Error loading case studies:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-slate-50 border border-slate-200 rounded-xl h-[280px]"
            />
          ))
        : projects.map((c) => (
            <TrackedLink
              key={c.slug}
              href={`/portfolio/project/${c.slug}`}
              event="case_study_click"
              props={{ project: c.slug, source: "case_studies_page" }}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden group hover:border-brand-200 transition-colors flex flex-col"
            >
              <div className="h-40 relative overflow-hidden bg-brand-800">
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-4 text-white/90 text-[10px] font-bold tracking-wider uppercase z-10">
                  {c.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-slate-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Read Case Study
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                </span>
              </div>
            </TrackedLink>
          ))}
    </div>
  );
}
