import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TrackedLink from "@/components/analytics/TrackedLink";

export default function CTA() {
  return (
    <section className="py-20 lg:py-24 bg-brand-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-bit-orange" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
          Let&apos;s Build Something <span className="text-bit-orange">Useful.</span>
        </h2>
        <p className="text-brand-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Whether you have a complete specification or just an idea, tell us what
          you&apos;re trying to build. We&apos;ll help you figure out the next step.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrackedLink
            href="/contact"
            event="cta_click"
            props={{ location: "final_cta", label: "start_a_project" }}
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-bit-orange text-white font-semibold rounded-lg hover:bg-bit-orange-dark transition-colors"
          >
            Start a Project
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            />
          </TrackedLink>
          <TrackedLink
            href="/portfolio"
            event="cta_click"
            props={{ location: "final_cta", label: "view_our_work" }}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-bit-cyan/50 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
          >
            View Our Work
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
