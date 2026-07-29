import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "In-depth case studies showcasing Lumiora's approach, solutions, and measurable results for our clients.",
};

const cases = [
  {
    title: "Denbury Bright Smiles",
    client: "Premier Dental Clinic",
    result: "Integrated UTM tracking & dynamic service architecture",
    tags: ["Next.js", "TypeScript", "Bootstrap 5", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070",
    url: "https://dental-clinic-inky.vercel.app/"
  },
  {
    title: "AssetLoop — Rental Platform",
    client: "Rental Marketplace",
    result: "JWT role-based auth, ~20% response latency reduction",
    tags: ["Angular", "Node.js", "MongoDB", "JWT"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    url: "https://assetloop-rental-platform.vercel.app/"
  },
  {
    title: "Cry-Care — Baby Cry Classification",
    client: "Academic / FYP",
    result: "88% classification accuracy, SMOTE on 900+ audio records",
    tags: ["Python", "XGBoost", "SVM", "Scikit-Learn"],
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1974",
    url: "https://github.com/HaseebSardar286/Cry-Care-mobile-application/"
  },
  {
    title: "Marketing CRM & Analytics",
    client: "SaaS Enterprise",
    result: "UTM-based traffic tracking, 300+ events/sec",
    tags: ["Next.js", "Node.js", "Firebase", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    url: "https://dental-billing-team.vercel.app/"
  },
  {
    title: "MLB AI Predictor & Analytics",
    client: "Sports Analytics Client",
    result: "AI-driven win probability, player props & edge calculation",
    tags: ["Python", "XGBoost", "Scikit-Learn"],
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2070",
    url: "https://github.com/HaseebSardar286"
  },
  {
    title: "SVM Model for Engine Failure",
    client: "Predictive Maintenance",
    result: "90% failure detection accuracy on 1000+ records",
    tags: ["Python", "Machine Learning", "SVM", "Scikit-Learn"],
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2070",
    url: "https://github.com/HaseebSardar286/SVM-Model-for-Engine-Failure-dataset"
  }
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero badge="Case Studies" title="Deep Dives into" highlight="Real Results"
        subtitle="Detailed breakdowns of our most impactful projects — the challenges, our approach, and the measurable outcomes."
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: "Case Studies" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <a href={c.url} target="_blank" rel="noopener noreferrer" key={c.title} className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col no-underline text-inherit">
                <div className="h-40 relative flex items-end p-5 overflow-hidden bg-brand-700">
                  {c.image && (
                    <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <FontAwesomeIcon icon={faBriefcase} className="absolute top-5 right-5 w-6 h-6 text-white/40 z-10" />
                  <span className="text-white/80 text-[10px] font-bold z-10 tracking-wider uppercase">{c.client}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{c.title}</h3>
                  <p className="text-xs text-emerald-600 font-semibold mb-3">{c.result}</p>
                  <div className="flex flex-wrap gap-1 mb-4 flex-1 items-start">
                    {c.tags.map((t) => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all mt-auto pt-2 border-t border-gray-100">
                    Read Case Study <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
