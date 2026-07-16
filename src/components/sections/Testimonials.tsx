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
    rating: 5,
  },
  {
    quote:
      "The AI solution Lumiora built for us processes 10 million events per day with incredible accuracy. Truly world-class engineering.",
    name: "Marcus Thompson",
    role: "CTO, DataFlow Inc.",
    initials: "MT",
    rating: 5,
  },
  {
    quote:
      "From design to deployment, the team delivered exceptional quality. Our mobile app is now rated 4.9 stars with 50k users.",
    name: "Priya Patel",
    role: "Founder, MedCare Digital",
    initials: "PP",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-52 h-52 rounded-full bg-brand-100/35 border border-brand-200/40 pointer-events-none" />

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
              className="bg-white border border-gray-200 shadow-sm rounded-2xl p-7 flex flex-col"
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

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
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
