import React from "react";

export default function EnterpriseExperience() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 lg:p-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Enterprise Engineering Experience
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Our team has experience working on enterprise software involving Java,
            Angular, SQL, backend systems, large datasets, authentication, business
            workflows, and performance optimization.
          </p>
          <ul className="flex flex-wrap gap-2">
            {[
              "Java enterprise applications",
              "Angular portals",
              "SQL / database optimization",
              "REST APIs",
              "Authentication / session management",
              "Large-data workflows",
              "Legacy application modernization",
            ].map((item) => (
              <li
                key={item}
                className="text-sm px-3 py-1.5 rounded-md bg-white text-slate-700 border border-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
