import React from "react";

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "We discuss your business, users, requirements, and goals.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "We define the scope, architecture, technology, timeline, and milestones.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Our engineering team develops the product in manageable iterations.",
  },
  {
    num: "04",
    title: "Test & Refine",
    desc: "We test the system, fix issues, and refine the product based on feedback.",
  },
  {
    num: "05",
    title: "Launch & Support",
    desc: "We help deploy the application and can continue supporting and improving it after launch.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            From Idea to Working Software
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            A simple, transparent process focused on shipping useful software.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <p className="font-display text-4xl font-bold text-bit-cyan mb-3">
                {step.num}
              </p>
              <h3 className="font-display font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
