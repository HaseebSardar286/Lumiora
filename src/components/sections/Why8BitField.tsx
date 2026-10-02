import React from "react";
import {
  faCode,
  faComments,
  faLayerGroup,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const points = [
  {
    icon: faCode,
    title: "Practical Engineering",
    desc: "We focus on building software that solves real business problems rather than adding unnecessary complexity.",
  },
  {
    icon: faLayerGroup,
    title: "Flexible Team",
    desc: "Bring in the specialists your project actually needs across web, backend, mobile, and AI/ML.",
  },
  {
    icon: faComments,
    title: "Direct Communication",
    desc: "Work directly with the people involved in planning and building your product.",
  },
  {
    icon: faSeedling,
    title: "Built to Grow",
    desc: "We aim to build maintainable systems that can evolve as your business grows.",
  },
];

export default function Why8BitField() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Work With 8BitField?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Small enough to communicate directly. Capable enough to build serious
            software.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-bit-orange-50 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-bit-orange" />
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
