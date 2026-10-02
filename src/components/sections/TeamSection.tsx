import React from "react";

const capabilities = [
  {
    title: "Backend Engineering",
    desc: "APIs, business logic, databases, and reliable server-side systems.",
  },
  {
    title: "Web Development",
    desc: "Modern web applications with Angular, React, and Next.js.",
  },
  {
    title: "Mobile Development",
    desc: "Cross-platform and native mobile applications for iOS and Android.",
  },
  {
    title: "AI & Computer Vision",
    desc: "Practical machine learning, classification, and vision solutions.",
  },
  {
    title: "Product & Delivery",
    desc: "Scoping, planning, iteration, and shipping maintainable products.",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            A Small Team With Different Specialties
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            8BitField brings together developers and specialists across backend, web,
            mobile, and AI/ML development. We keep the team flexible so each project
            gets the skills it actually needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="bg-white border border-slate-200 rounded-xl p-5"
            >
              <h3 className="font-display font-semibold text-slate-900 mb-2 text-sm">
                {cap.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
