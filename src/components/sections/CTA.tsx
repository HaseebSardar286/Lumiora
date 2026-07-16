import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-gray-100">
      {/* Background bubbles */}
      <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-brand-100/35 border border-brand-200/40 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-brand-200/15 border border-brand-200/25 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-brand-50 text-brand-700 border border-brand-200 mb-6">
          Ready to Start?
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
          Let&apos;s Build Something
          <br />
          <span className="text-brand-700">Extraordinary</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Schedule a free consultation with our experts and discover how Lumiora
          can transform your digital vision into reality.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-consultation"
            className="group flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-bold rounded-2xl shadow-sm hover:bg-brand-800 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5" />
            Book Free Consultation
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/get-a-quote"
            className="px-8 py-4 border border-brand-350 border-gray-300 text-brand-700 font-bold rounded-2xl hover:bg-brand-50 transition-colors duration-200"
          >
            Get a Quote
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
          {["No commitment required", "Response within 24 hours", "100% confidential"].map(
            (text) => (
              <span key={text} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                {text}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
