import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faGear,
  faWrench,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const problems = [
  {
    icon: faLightbulb,
    title: "Need a new product?",
    desc: "Build an MVP or production-ready application from the ground up.",
  },
  {
    icon: faGear,
    title: "Too much manual work?",
    desc: "Replace repetitive workflows with custom business software and automation.",
  },
  {
    icon: faWrench,
    title: "Existing software isn't working?",
    desc: "Fix bugs, improve performance, add features, or modernize legacy systems.",
  },
  {
    icon: faUsers,
    title: "Need more engineering capacity?",
    desc: "Work with a flexible development team that can complement your existing team.",
  },
];

export default function ProblemFocus() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Software Problems Shouldn&apos;t Slow Your Business Down.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Whether you&apos;re starting a new product, replacing manual processes, or
            improving an existing application, we help turn software problems into
            practical, maintainable solutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item) => (
            <div key={item.title} className="border-t-2 border-bit-orange pt-5">
              <div className="w-10 h-10 rounded-lg bg-bit-cyan-50 flex items-center justify-center mb-4">
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
