import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Web Development",
  description: "Custom web development services: high-performance apps, e-commerce, SaaS platforms built with Next.js, React, and modern cloud infrastructure.",
};

const features = [
  "Next.js & React applications",
  "E-commerce & marketplace platforms",
  "SaaS product development",
  "API design & integration",
  "CMS & headless architecture",
  "Performance optimisation",
  "SEO & Core Web Vitals",
  "Progressive Web Apps (PWA)",
];

export default function WebDevelopmentPage() {
  return (
    <>
      <PageHero
        badge="Web Development"
        title="High-Performance"
        highlight="Web Applications"
        subtitle="We build blazing-fast, scalable web platforms that convert visitors into customers and deliver exceptional user experiences across every device."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Web Development" }]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-brand-700 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faGlobe} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">
                Built for <span className="text-brand-700">Speed, Scale & Success</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Our web development team crafts custom digital products using modern frameworks, cloud-native architecture, and performance-first engineering. Every project is built with scalability in mind from day one.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-600 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Projects Delivered", value: "15+" },
                { label: "Avg Load Time", value: "<1s" },
                { label: "Core Web Vitals", value: "98/100" },
                { label: "Client Satisfaction", value: "95%" },
              ].map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <p className="text-3xl font-black text-brand-700 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-8">Our Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "Vercel", "Docker", "GraphQL", "Prisma", "Tailwind CSS"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-brand-850 text-slate-700">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-black text-slate-900 mb-4">Ready to build your next web platform?</h3>
          <a href="/get-a-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-bold rounded-2xl shadow-sm hover:bg-brand-800 transition-colors duration-200">
            Get a Free Quote <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </a>
        </div>
      </section>
      <CTA />
    </>
  );
}
