"use client";

import React, { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faPhone, faLocationDot, faPaperPlane
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    notes: ""
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSent(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Contact Us"
        title="Let's Start a"
        highlight="Conversation"
        subtitle="Have a project in mind or want to learn more? Reach out to us through any channel below."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info Column */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                Get in <span className="text-brand-700">Touch</span>
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                We're always excited to collaborate on new digital products. Use our contact info below to get in touch with our team directly, or send us a message using the form. We'll get back to you within 24 hours.
              </p>

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

            {/* Form Column */}
            <GlassCard hover={false}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faPaperPlane} className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-black text-xl text-slate-900 mb-2">Send a Message</h3>
                  
                  {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold leading-relaxed">
                      ⚠️ {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors"
                      placeholder="Alex Morgan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Work Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company (optional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={4}
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors resize-none"
                      placeholder="Tell us about your project or general query..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-45"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
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
