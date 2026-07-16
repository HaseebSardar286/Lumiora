import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  gradient?: string;
}

export default function PageHero({
  badge,
  title,
  highlight,
  subtitle,
  breadcrumbs,
  gradient = "from-white via-brand-alt to-brand-50",
}: PageHeroProps) {
  return (
    <section className={`relative pt-16 pb-12 bg-gradient-to-br ${gradient} overflow-hidden`}>


      {/* Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-brand-700 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-700 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {badge && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-brand-50 text-brand-700 border border-brand-200 mb-5">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-5">
            {title}{" "}
            {highlight && <span className="gradient-text">{highlight}</span>}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
