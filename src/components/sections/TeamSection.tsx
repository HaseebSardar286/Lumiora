"use client";

import React, { useEffect, useState } from "react";
import type { TeamMember } from "@/data/team";

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.members)) {
          setMembers(data.members);
        }
      })
      .catch((err) => console.error("Error loading team members:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && members.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Meet the Team
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            The people behind 8BitField — engineers and specialists who ship
            web, mobile, backend, and AI/ML products.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-2xl bg-slate-200 mb-4" />
                <div className="h-4 w-2/3 rounded bg-slate-200 mb-2" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <article key={member._id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-200 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-base">
                  {member.name}
                </h3>
                <p className="text-sm text-brand-700 mt-0.5">
                  {member.designation}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
