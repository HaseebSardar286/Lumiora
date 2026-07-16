import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-400/30 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/10 text-white border border-gray-300 mb-6">
          Ready to Start?
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
          Let&apos;s Build Something
          <br />
          <span className="text-brand-200">Extraordinary</span>
        </h2>
        <p className="text-lg text-brand-100 max-w-xl mx-auto mb-10 leading-relaxed">
          Schedule a free consultation with our experts and discover how Lumiora
          can transform your digital vision into reality.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-consultation"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-brand-800 font-bold rounded-2xl shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300"
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
            className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-brand-200 text-sm">
          {["No commitment required", "Response within 24 hours", "100% confidential"].map(
            (text) => (
              <span key={text} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-300" />
                {text}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
