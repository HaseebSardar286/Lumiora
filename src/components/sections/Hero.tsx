"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlay,
  faStar,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-bg">
      {/* Animated blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-brand-200/50 blob animate-float" />
      <div
        className="absolute bottom-10 right-10 w-64 h-64 bg-brand-200/50 blob animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-100/40 blob"
        style={{ animationDelay: "4s", animationDuration: "6s" }}
      />



      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="animate-fade-in-up">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-200 mb-8">
              <div className="flex -space-x-1">
                {[
                  "bg-brand-400",
                  "bg-brand-500",
                  "bg-brand-400",
                  "bg-brand-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${color} border-2 border-white flex items-center justify-center text-xs text-white font-bold`}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                Trusted by growing <span className="text-brand-700 font-bold">businesses</span>
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="w-3 h-3 text-amber-400" />
                ))}
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] text-slate-900 mb-6">
              We{" "}
              <span className="gradient-text">Illuminate</span>
              <br />
              Your Digital
              <br />
              <span className="gradient-text">Excellence</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
              From visionary web platforms to intelligent AI solutions — Lumiora crafts
              transformative digital experiences that drive measurable growth.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                "Web Development",
                "AI Solutions",
                "Mobile Apps",
                "UI/UX Design",
              ].map((feat) => (
                <span
                  key={feat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-brand-800 bg-brand-50 border border-brand-200"
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-brand-600" />
                  {feat}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/get-a-quote"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white font-bold rounded-2xl shadow-xl shadow-brand-200 hover:shadow-2xl hover:shadow-brand-300 hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Project
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/portfolio"
                className="group flex items-center gap-3 px-8 py-4 glass text-brand-800 font-bold rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-white/80"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-white ml-0.5" />
                </div>
                View Our Work
              </Link>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Card & badges wrapper to keep them together */}
            <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              {/* Main card */}
              <div className="glass-card rounded-3xl p-8 animate-float">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-brand-900">Project Dashboard</p>
                    <p className="text-xs text-gray-400">Real-time analytics</p>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Projects Done", value: "20+", color: "from-brand-700 to-brand-500" },
                    { label: "Happy Clients", value: "10+", color: "from-brand-600 to-brand-400" },
                    { label: "Team Members", value: "8+", color: "from-brand-800 to-brand-600" },
                    { label: "Years Experience", value: "1+", color: "from-brand-600 to-brand-700" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl p-4">
                      <p className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[
                    { label: "Client Satisfaction", pct: 95, color: "from-brand-400 to-brand-600" },
                    { label: "On-Time Delivery", pct: 95, color: "from-brand-500 to-brand-700" },
                    { label: "Project Success Rate", pct: 98, color: "from-brand-600 to-brand-accent" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{bar.label}</span>
                        <span className="font-semibold text-brand-700">{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-brand-50">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-2 shadow-xl animate-float" style={{ animationDelay: "3s" }}>
                <p className="text-xs font-bold text-brand-700">🚀 Latest Project</p>
                <p className="text-xs text-gray-400">Launched in 48hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-brand-300 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-brand-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
