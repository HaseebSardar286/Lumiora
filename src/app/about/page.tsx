import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faUsers,
  faRocket,
  faHeart,
  faMedal,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Lumiora — our story, mission, values, and the passionate team driving digital excellence.",
};

const values = [
  { icon: faLightbulb, title: "Innovation First", desc: "We push boundaries and embrace emerging technologies to stay ahead.", gradient: "from-brand-700 to-brand-900" },
  { icon: faUsers, title: "Client-Centric", desc: "Your success is our success. We build long-term partnerships, not one-off projects.", gradient: "from-brand-700 to-brand-600" },
  { icon: faRocket, title: "Excellence Always", desc: "We hold ourselves to the highest standards in code quality, design, and delivery.", gradient: "from-brand-700 to-brand-600" },
  { icon: faHeart, title: "Passionate Team", desc: "We love what we do, and that passion shows in every pixel and every line of code.", gradient: "from-brand-700 to-brand-600" },
  { icon: faMedal, title: "Proven Results", desc: "Consistent delivery with measurable outcomes for our clients.", gradient: "from-brand-800 to-brand-600" },
  { icon: faLeaf, title: "Sustainable Growth", desc: "We build scalable solutions designed to grow with your business long-term.", gradient: "from-brand-500 to-brand-600" },
];

const team = [
  { name: "Alex Morgan", role: "CEO & Co-Founder", initials: "AM", gradient: "from-brand-700 to-brand-900" },
  { name: "Jordan Lee", role: "CTO & Co-Founder", initials: "JL", gradient: "from-brand-700 to-brand-600" },
  { name: "Priya Sharma", role: "Chief Design Officer", initials: "PS", gradient: "from-brand-700 to-brand-600" },
  { name: "Chris Park", role: "Head of Engineering", initials: "CP", gradient: "from-brand-700 to-brand-600" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Lumiora"
        title="We're on a Mission to"
        highlight="Illuminate the Web"
        subtitle="Lumiora is a modern technology studio dedicated to building high-quality digital products. We believe every business deserves exceptional digital experiences."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-50 text-brand-700 border border-brand-200 mb-5">
                Our Story
              </span>
              <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                Crafting <span className="gradient-text">Digital Excellence</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Lumiora was founded with a single conviction: that great technology, thoughtfully crafted, can transform businesses and improve lives. We started with a passionate team and a relentless focus on quality.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Today, our agile team of engineers, designers, and strategists partners with forward-thinking businesses and startups to build products that matter.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {[
                { year: "Phase 1", event: "Founded in San Francisco by a passionate team of digital developers" },
                { year: "Phase 2", event: "Launched AI practice and delivered first 5 client projects" },
                { year: "Phase 3", event: "Expanded engineering team and launched QA & DevOps offerings" },
                { year: "Phase 4", event: "Reached 20+ projects milestone and 95% client satisfaction" },
              ].map((item) => (
                <div key={item.year} className="flex gap-5 items-start">
                  <div className="shrink-0 w-20 h-8 rounded-full bg-gradient-to-r from-brand-700 to-brand-900 flex items-center justify-center text-xs font-bold text-white">
                    {item.year}
                  </div>
                  <GlassCard padding="p-4" hover={false} className="flex-1">
                    <p className="text-sm text-gray-600">{item.event}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 gradient-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-50 text-brand-700 border border-brand-200 mb-4">
              Our Values
            </span>
            <h2 className="text-4xl font-black text-slate-900">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((val) => (
              <GlassCard key={val.title} className="flex gap-4 items-start">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${val.gradient} flex items-center justify-center shadow-md shrink-0`}>
                  <FontAwesomeIcon icon={val.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{val.title}</h3>
                  <p className="text-sm text-gray-500">{val.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>



      <CTA />
    </>
  );
}
