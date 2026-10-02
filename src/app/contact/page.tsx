"use client";

import React, { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Have a Project in"
        highlight="Mind?"
        subtitle="Tell us what you're building, what problem you're trying to solve, or what needs to be improved."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                Get in touch
              </h2>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                Send a short description of your project and what you need help
                with. We&apos;ll review it and discuss the next steps.
              </p>

              <a
                href="mailto:hello@8bitfield.com"
                className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-200 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-700 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                    hello@8bitfield.com
                  </p>
                </div>
              </a>
            </div>

            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <Suspense
                fallback={<div className="h-80 animate-pulse bg-slate-50 rounded-lg" />}
              >
                <ContactForm compact heading="" subtitle="" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
