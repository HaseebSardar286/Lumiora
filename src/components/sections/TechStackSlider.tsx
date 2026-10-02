import React from "react";

const categories = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "Java EE", "Node.js", "Express"],
  },
  {
    title: "Frontend",
    items: ["Angular", "React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Android", "iOS"],
  },
  {
    title: "AI / ML",
    items: [
      "Python",
      "Scikit-learn",
      "Computer Vision",
      "Machine Learning",
      "Data Processing",
    ],
  },
  {
    title: "Infrastructure",
    items: ["Git", "GitHub", "Docker", "Vercel", "Cloud platforms"],
  },
];

export default function TechStackSlider() {
  return (
    <section className="py-20 lg:py-24 bg-white border-y border-slate-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Technology Capabilities
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Technologies the team can genuinely deliver — grouped by capability,
            not as a logo wall.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-display font-semibold text-slate-900 mb-3 pb-2 border-b border-slate-200">
                {cat.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm px-3 py-1.5 rounded-md bg-slate-50 text-slate-700 border border-slate-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
