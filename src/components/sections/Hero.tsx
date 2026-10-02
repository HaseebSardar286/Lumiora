"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TrackedLink from "@/components/analytics/TrackedLink";

const trustStats = [
  {
    value: "5+",
    label: "Clients",
    sub: "Businesses and teams we've worked with.",
  },
  {
    value: "8+",
    label: "Projects",
    sub: "Software projects delivered across different domains.",
  },
  {
    value: "5+",
    label: "Team Members",
    sub: "Specialists across web, backend, mobile, and AI/ML.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-100">
      <div className="absolute top-0 left-0 right-0 h-1 bg-bit-orange" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl animate-fade-in-up">
          <p className="text-sm font-semibold tracking-wide text-bit-cyan-dark mb-5 uppercase">
            Custom Software Development
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-brand-800 mb-6 tracking-tight">
            We Build Software That Moves Your Business{" "}
            <span className="text-bit-orange">Forward.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            From business applications and SaaS products to mobile apps, backend
            systems, and AI solutions, 8BitField helps businesses turn ideas and
            operational problems into reliable software.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <TrackedLink
              href="/contact"
              event="cta_click"
              props={{ location: "hero", label: "start_a_project" }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-bit-orange text-white font-semibold rounded-lg hover:bg-bit-orange-dark transition-colors duration-200"
            >
              Start a Project
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              />
            </TrackedLink>
            <TrackedLink
              href="/portfolio"
              event="cta_click"
              props={{ location: "hero", label: "view_our_work" }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-800 font-semibold rounded-lg border border-bit-cyan/40 hover:border-bit-cyan hover:text-bit-cyan-dark transition-colors duration-200"
            >
              View Our Work
            </TrackedLink>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
            {trustStats.map((stat, i) => (
              <div key={stat.label}>
                <p
                  className={`font-display text-3xl font-bold mb-1 ${
                    i === 1 ? "text-bit-orange" : "text-bit-cyan-dark"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-slate-900">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
