"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { track } from "@/lib/analytics";

const PROJECT_TYPES = [
  "Business Application",
  "SaaS / MVP",
  "Web Application",
  "Backend / API",
  "Mobile Application",
  "AI / Machine Learning",
  "Computer Vision",
  "Existing Application / Bug Fixing",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$3,000",
  "$3,000–$5,000",
  "$5,000+",
  "Not sure yet",
];

type ContactFormProps = {
  compact?: boolean;
  heading?: string;
  subtitle?: string;
};

export default function ContactForm({
  compact = false,
  heading = "Have a Project in Mind?",
  subtitle = "Tell us what you're building, what problem you're trying to solve, or what needs to be improved. We'll get back to you to discuss the project.",
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && PROJECT_TYPES.includes(type)) {
      setFormData((prev) => ({ ...prev, projectType: type }));
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSent(true);
      track("contact_form_submit", {
        projectType: formData.projectType || "unspecified",
        hasBudget: Boolean(formData.budget),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors";

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faPaperPlane} className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
          Message sent
        </h3>
        <p className="text-slate-600">
          We&apos;ll review your project and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div>
      {!compact && heading && (
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div
            role="alert"
            className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-sm"
          >
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={fieldClass}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={fieldClass}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-xs font-semibold text-slate-500 mb-1.5">
            Company <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={fieldClass}
            placeholder="Your company"
            autoComplete="organization"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="projectType"
              className="block text-xs font-semibold text-slate-500 mb-1.5"
            >
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={fieldClass}
            >
              <option value="">Select a type</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Budget <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={fieldClass}
            >
              <option value="">Select a range</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-xs font-semibold text-slate-500 mb-1.5">
            Project Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="notes"
            required
            rows={5}
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className={`${fieldClass} resize-none`}
            placeholder="Describe what you're building or what needs to be improved..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-bit-orange hover:bg-bit-orange-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Discuss My Project"}
          <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
