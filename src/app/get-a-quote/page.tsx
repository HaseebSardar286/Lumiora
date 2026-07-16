"use client";

import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const services = ["Web Development", "Mobile App", "AI Solution", "UI/UX Design", "DevOps", "QA & Testing", "Product Management", "Other"];
const budgets = ["< $5,000", "$5,000–$15,000", "$15,000–$50,000", "$50,000–$150,000", "$150,000+"];

export default function GetAQuotePage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (s: string) => setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  return (
    <>
      <PageHero
        badge="Get a Quote"
        title="Tell Us About"
        highlight="Your Project"
        subtitle="Fill in a few quick details and we'll send you a personalised proposal within 24 hours."
        breadcrumbs={[{ label: "Get a Quote" }]}
        gradient="from-white via-brand-alt to-brand-50"
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-brand-50">
                <div className={`h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-900 transition-all duration-500 ${step >= s ? "w-full" : "w-0"}`} />
              </div>
            ))}
          </div>

          {submitted ? (
            <GlassCard hover={false} className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Quote Request Sent!</h2>
              <p className="text-gray-500">We&apos;ll send your personalised proposal within 24 hours.</p>
            </GlassCard>
          ) : (
            <GlassCard hover={false}>
              {step === 1 && (
                <div>
                  <h3 className="font-black text-xl text-slate-900 mb-1">What do you need?</h3>
                  <p className="text-sm text-gray-400 mb-5">Select all services that apply.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((s) => (
                      <button key={s} onClick={() => toggle(s)} className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${selected.includes(s) ? "bg-brand-700 text-white border-indigo-600 shadow-md" : "border-brand-200 text-gray-600 hover:border-brand-400"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} disabled={selected.length === 0} className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-700 to-brand-900 text-white font-bold rounded-xl disabled:opacity-40 hover:-translate-y-0.5 transition-all">
                    Next <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-black text-xl text-slate-900 mb-1">What&apos;s your budget?</h3>
                  <p className="text-sm text-gray-400 mb-5">This helps us propose the right solution.</p>
                  <div className="space-y-3">
                    {budgets.map((b) => (
                      <button key={b} onClick={() => setBudget(b)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${budget === b ? "bg-brand-700 text-white border-indigo-600 shadow-md" : "border-brand-200 text-gray-600 hover:border-brand-400"}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-brand-300 text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-all">Back</button>
                    <button onClick={() => setStep(3)} disabled={!budget} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-700 to-brand-900 text-white font-bold rounded-xl disabled:opacity-40 hover:-translate-y-0.5 transition-all">
                      Next <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <h3 className="font-black text-xl text-slate-900 mb-1">Your Contact Details</h3>
                  <p className="text-sm text-gray-400 mb-5">We&apos;ll use these to send your proposal.</p>
                  <div className="space-y-4">
                    {[
                      { label: "Full Name", type: "text", placeholder: "Alex Morgan" },
                      { label: "Work Email", type: "email", placeholder: "alex@company.com" },
                      { label: "Company", type: "text", placeholder: "Company Inc." },
                      { label: "Phone (optional)", type: "tel", placeholder: "+1 555 000 0000" },
                    ].map(({ label, type, placeholder }) => (
                      <div key={label}>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                        <input type={type} required={!label.includes("optional")} className="w-full px-4 py-2.5 rounded-xl border border-brand-200 bg-white/60 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all" placeholder={placeholder} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Project Description</label>
                      <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-200 bg-white/60 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all resize-none" placeholder="Brief overview of your project..." />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-brand-300 text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-all">Back</button>
                    <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-brand-700 to-brand-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
          )}
        </div>
      </section>
    </>
  );
}
