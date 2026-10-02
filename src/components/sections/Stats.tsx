import React from "react";

const stats = [
  {
    value: "5+",
    label: "Clients",
    sub: "Businesses and teams we've worked with",
  },
  {
    value: "8+",
    label: "Projects",
    sub: "Software projects across different domains",
  },
  {
    value: "5+",
    label: "Team Members",
    sub: "Web, backend, mobile, and AI/ML",
  },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-slate-200 rounded-xl p-6 text-center"
            >
              <p className="font-display text-4xl font-bold text-brand-700 mb-1">
                {stat.value}
              </p>
              <p className="font-semibold text-slate-900 text-sm">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
