"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    q: "What type of projects do you work on?",
    a: "We work on custom web applications, SaaS products, backend systems, mobile applications, business software, and AI/ML solutions.",
  },
  {
    q: "Can you work with an existing development team?",
    a: "Yes. We can contribute as an extended engineering team for specific features, backend systems, integrations, maintenance, or complete projects.",
  },
  {
    q: "Can you develop an MVP?",
    a: "Yes. We can help define the initial scope, build the core product, deploy it, and continue development based on user feedback.",
  },
  {
    q: "Can you work with an existing application?",
    a: "Yes. We can help with bug fixing, feature development, API integrations, performance improvements, and modernization.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. Support and continued development can be arranged depending on the project.",
  },
  {
    q: "How do we start?",
    a: "Send us a short description of your project and what you need help with. We'll review it and discuss the next steps.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Straight answers about how we work and what we can help with.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-slate-900">
                    {faq.q}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-slate-600 leading-relaxed -mt-1">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
