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
        gradient="from-white via-brand-alt to-brand-50"
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl mb-6">
                <FontAwesomeIcon icon={faGlobe} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">
                Built for <span className="gradient-text">Speed, Scale & Success</span>
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
                { label: "Projects Delivered", value: "15+", gradient: "from-brand-700 to-brand-900" },
                { label: "Avg Load Time", value: "<1s", gradient: "from-brand-700 to-brand-600" },
                { label: "Core Web Vitals", value: "98/100", gradient: "from-brand-700 to-brand-600" },
                { label: "Client Satisfaction", value: "95%", gradient: "from-brand-700 to-brand-600" },
              ].map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 gradient-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-8">Our Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "Vercel", "Docker", "GraphQL", "Prisma", "Tailwind CSS"].map((tech) => (
              <span key={tech} className="px-4 py-2 glass rounded-xl text-sm font-semibold text-brand-800 border border-brand-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-black text-slate-900 mb-4">Ready to build your next web platform?</h3>
          <a href="/get-a-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
            Get a Free Quote <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </a>
        </div>
      </section>
      <CTA />
    </>
  );
}
