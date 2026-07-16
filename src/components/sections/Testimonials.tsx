import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    quote:
      "Lumiora completely transformed our digital presence. Our conversion rate jumped 240% within 3 months of launching the new platform.",
    name: "Sarah Chen",
    role: "CEO, NovaTech Ventures",
    initials: "SC",
    gradient: "from-brand-700 to-brand-900",
    rating: 5,
  },
  {
    quote:
      "The AI solution Lumiora built for us processes 10 million events per day with incredible accuracy. Truly world-class engineering.",
    name: "Marcus Thompson",
    role: "CTO, DataFlow Inc.",
    initials: "MT",
    gradient: "from-brand-700 to-brand-600",
    rating: 5,
  },
  {
    quote:
      "From design to deployment, the team delivered exceptional quality. Our mobile app is now rated 4.9 stars with 50k users.",
    name: "Priya Patel",
    role: "Founder, MedCare Digital",
    initials: "PP",
    gradient: "from-brand-700 to-brand-600",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="What Our"
          highlight="Clients Say"
          subtitle="Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped transform."
          className="mb-14"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card rounded-2xl p-7 border border-brand-50 flex flex-col"
            >
              {/* Quote icon */}
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="w-7 h-7 text-brand-300 mb-4"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="w-4 h-4 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed flex-1 mb-6 text-sm italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-brand-50">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
