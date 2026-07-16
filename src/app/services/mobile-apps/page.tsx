import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Mobile Apps",
  description: "Native and cross-platform mobile app development for iOS and Android — React Native, Flutter, Swift, Kotlin.",
};

const features = [
  "iOS & Android native apps", "React Native & Flutter", "Offline-first architecture", "Push notifications",
  "In-app purchases", "Biometric authentication", "Real-time features", "App Store optimisation",
];

export default function MobileAppsPage() {
  return (
    <>
      <PageHero badge="Mobile Apps" title="Apps Users" highlight="Love to Use"
        subtitle="We craft native and cross-platform mobile experiences that are fast, intuitive, and built to retain users."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Mobile Apps" }]}
        gradient="from-brand-700 via-brand-700 to-brand-600" />
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-600 flex items-center justify-center shadow-xl mb-6">
                <FontAwesomeIcon icon={faMobileScreen} className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-5">
                Cross-Platform <span className="gradient-text">Mobile Excellence</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Our mobile team builds pixel-perfect applications for iOS and Android using React Native and Flutter for shared codebases, or native Swift/Kotlin for maximum performance.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-brand-600 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Apps Published", value: "8+", gradient: "from-brand-700 to-brand-600" },
                { label: "Avg App Rating", value: "4.8★", gradient: "from-brand-700 to-brand-600" },
                { label: "Downloads", value: "50K+", gradient: "from-brand-700 to-brand-600" },
                { label: "Retention Rate", value: "78%", gradient: "from-brand-700 to-brand-600" },
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
      <section className="py-16 bg-white text-center">
        <a href="/get-a-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-700 to-brand-600 text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
          Build Your App <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </a>
      </section>
      <CTA />
    </>
  );
}
