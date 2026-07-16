import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUsers,
  faCode,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    icon: faRocket,
    value: "20+",
    label: "Projects Delivered",
    sub: "Across diverse industries",
  },
  {
    icon: faUsers,
    value: "10+",
    label: "Happy Clients",
    sub: "Startups & enterprises",
  },
  {
    icon: faCode,
    value: "1+",
    label: "Year of Operation",
    sub: "Within 1 year of launch",
  },
  {
    icon: faGlobe,
    value: "95%",
    label: "Client Satisfaction",
    sub: "Committed to quality",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-10 left-1/4 w-40 h-40 rounded-full bg-brand-100/35 border border-brand-200/40 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-52 h-52 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-700 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <p className="text-4xl font-black text-brand-700 mb-1">
                {stat.value}
              </p>
              <p className="font-bold text-brand-900 text-sm">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
