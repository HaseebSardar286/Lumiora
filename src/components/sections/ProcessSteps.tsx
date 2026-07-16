import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faRulerCombined,
  faCode,
  faVial,
  faRocket,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    num: "01",
    icon: faCompass,
    title: "Discovery & Strategy",
    desc: "Deep-dive workshops to understand your goals, users, and competitive landscape.",
  },
  {
    num: "02",
    icon: faRulerCombined,
    title: "Design & Prototyping",
    desc: "High-fidelity wireframes and interactive prototypes validated with real users.",
  },
  {
    num: "03",
    icon: faCode,
    title: "Development & Build",
    desc: "Agile sprints with daily standups, transparent progress, and clean codebases.",
  },
  {
    num: "04",
    icon: faVial,
    title: "QA & Testing",
    desc: "Automated + manual testing across devices and browsers before every release.",
  },
  {
    num: "05",
    icon: faRocket,
    title: "Launch & Deploy",
    desc: "Zero-downtime deployments with robust CI/CD pipelines and monitoring.",
  },
  {
    num: "06",
    icon: faHeadset,
    title: "Support & Growth",
    desc: "Ongoing optimisation, feature evolution, and dedicated support post-launch.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-16 left-10 w-60 h-60 rounded-full bg-brand-100/35 border border-brand-200/40 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="How We Work"
          title="Our Proven"
          highlight="6-Step Process"
          subtitle="A structured, transparent methodology that consistently delivers outstanding results on time and on budget."
          className="mb-16"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-12 right-12 h-0.5 bg-brand-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 h-full">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-700 flex items-center justify-center relative">
                      <FontAwesomeIcon icon={step.icon} className="w-5 h-5 text-white" />
                      {/* Step badge */}
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-700 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-4xl font-black text-brand-200">{step.num}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
