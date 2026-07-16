"use client";

import React, { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faPhone, faLocationDot, faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedinIn, faXTwitter, faGithub,
} from "@fortawesome/free-brands-svg-icons";

const contactInfo = [
  { icon: faEnvelope, label: "Email", value: "hello@lumiora.io", href: "mailto:hello@lumiora.io" },
  { icon: faPhone, label: "Phone", value: "+1 (555) 000-LUMI", href: "tel:+15550005864" },
  { icon: faLocationDot, label: "Address", value: "123 Innovation Drive, San Francisco, CA 94105", href: "#" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's Start a"
        highlight="Conversation"
        subtitle="Whether you have a project in mind or just want to say hello, we'd love to hear from you."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6">
                Get in <span className="text-brand-700">Touch</span>
              </h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((info) => (
                  <a key={info.label} href={info.href} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-brand-200 hover:shadow-sm transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center">
                      <FontAwesomeIcon icon={info.icon} className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{info.label}</p>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { icon: faLinkedinIn, href: "#" },
                  { icon: faXTwitter, href: "#" },
                  { icon: faGithub, href: "#" },
                ].map(({ icon, href }, i) => (
                  <a key={i} href={href} className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 hover:bg-brand-100 hover:text-brand-800 transition-colors">
                    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <GlassCard hover={false}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faPaperPlane} className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-black text-xl text-slate-900 mb-2">Send a Message</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {["First Name", "Last Name"].map((label) => (
                      <div key={label}>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                        <input required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors" placeholder={label} />
                      </div>
                    ))}
                  </div>
                  {[
                    { label: "Email", type: "email", placeholder: "you@company.com" },
                    { label: "Company", type: "text", placeholder: "Your company name" },
                  ].map(({ label, type, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                      <input required type={type} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors" placeholder={placeholder} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
                    <textarea required rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 text-white font-bold rounded-xl shadow-sm hover:bg-brand-800 transition-colors">
                    Send Message <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
