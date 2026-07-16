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
    gradient: "from-brand-700 to-brand-900",
    sub: "Across diverse industries",
  },
  {
    icon: faUsers,
    value: "10+",
    label: "Happy Clients",
    gradient: "from-brand-700 to-brand-600",
    sub: "Startups & enterprises",
  },
  {
    icon: faCode,
    value: "1+",
    label: "Year of Operation",
    gradient: "from-brand-700 to-brand-600",
    sub: "Within 1 year of launch",
  },
  {
    icon: faGlobe,
    value: "95%",
    label: "Client Satisfaction",
    gradient: "from-brand-700 to-brand-600",
    sub: "Committed to quality",
  },
];

export default function Stats() {
  return (
    <section className="py-20 gradient-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #111184 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg mb-4 animate-pulse-glow`}
              >
                <FontAwesomeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <p
                className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
              >
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
