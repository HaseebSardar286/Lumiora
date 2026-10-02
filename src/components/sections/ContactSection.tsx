import React, { Suspense } from "react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-24 bg-slate-50">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-xl" />}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
