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
  compact?: boolean;
}

export default function PageHero({
  badge,
  title,
  highlight,
  subtitle,
  breadcrumbs,
  compact,
}: PageHeroProps) {
  return (
    <section className={`relative bg-transparent border-b border-gray-100 overflow-hidden ${compact ? "pt-8 pb-6" : "pt-16 pb-12"}`}>
      {/* Background bubbles */}
      <div className="absolute top-5 right-10 w-40 h-40 rounded-full bg-brand-200/20 border border-brand-200/30 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-48 h-48 rounded-full bg-brand-100/35 border border-brand-200/40 pointer-events-none" />

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
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-brand-50 text-brand-700 border border-brand-200 ${compact ? "mb-2" : "mb-5"}`}>
              {badge}
            </span>
          )}
          <h1 className={`font-black text-slate-900 leading-tight ${compact ? "text-2xl md:text-3xl mb-1" : "text-4xl md:text-5xl lg:text-6xl mb-5"}`}>
            {title}{" "}
            {highlight && <span className="text-brand-700">{highlight}</span>}
          </h1>
          {subtitle && (
            <p className={`leading-relaxed max-w-2xl ${compact ? "text-xs text-gray-400 mt-1" : "text-lg text-gray-500"}`}>{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
