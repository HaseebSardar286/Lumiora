import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, flexible pricing for web development, mobile apps, AI solutions, and managed services from Lumiora.",
};

const plans = [
  {
    name: "Starter",
    price: "$4,999",
    period: "/ project",
    desc: "Perfect for small businesses and MVPs.",
    features: ["Up to 5-page website", "Responsive design", "Basic SEO setup", "2 revision rounds", "30-day post-launch support", "CMS integration"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$14,999",
    period: "/ project",
    desc: "For growing businesses with complex needs.",
    features: ["Full web/mobile app", "Custom UI/UX design", "API integrations", "5 revision rounds", "90-day post-launch support", "Analytics & SEO", "Performance optimisation"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    desc: "Bespoke solutions for large-scale organisations.",
    features: ["Unlimited scope", "Dedicated team", "AI/ML integration", "Unlimited revisions", "12-month SLA support", "Security audits", "DevOps & infrastructure"],
    cta: "Contact Us",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        badge="Pricing"
        title="Transparent"
        highlight="Investment Plans"
        subtitle="No hidden fees, no surprises. Clear, flexible pricing that aligns with your goals and budget."
        breadcrumbs={[{ label: "Pricing" }]}
      />
      <section className="py-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white border border-gray-200 shadow-sm rounded-3xl p-7 flex flex-col ${
                  plan.popular ? "ring-2 ring-brand-700 shadow-md" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-5 py-1.5 rounded-full text-xs font-bold text-white bg-brand-700 shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                  <span className="text-brand-700 font-black text-sm">{plan.name[0]}</span>
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-brand-700">{plan.price}</span>
                  <span className="text-sm text-gray-400 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.cta === "Contact Us" ? "/contact" : "/get-a-quote"}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-200 ${
                    plan.popular
                      ? "bg-brand-700 text-white shadow-sm hover:bg-brand-800"
                      : "border border-gray-300 text-brand-700 hover:bg-brand-50 hover:border-gray-400"
                  }`}
                >
                  {plan.cta} <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ note */}
          <GlassCard className="text-center" hover={false}>
            <p className="text-gray-600 text-sm">
              All plans include a free initial consultation. Need something custom?{" "}
              <Link href="/contact" className="text-brand-700 font-semibold hover:underline">
                Let&apos;s talk
              </Link>
            </p>
          </GlassCard>
        </div>
      </section>
      <CTA />
    </>
  );
}
