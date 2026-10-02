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
    <section
      className={`relative overflow-hidden border-b border-slate-100 bg-white ${
        compact ? "pt-8 pb-6" : "pt-16 pb-12"
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-bit-cyan" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-bit-cyan-dark transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-bit-cyan-dark transition-colors"
                  >
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
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-bit-cyan-50 text-bit-cyan-dark border border-bit-cyan/30 ${
                compact ? "mb-2" : "mb-5"
              }`}
            >
              {badge}
            </span>
          )}
          <h1
            className={`font-black text-brand-800 leading-tight ${
              compact ? "text-2xl md:text-3xl mb-1" : "text-4xl md:text-5xl lg:text-6xl mb-5"
            }`}
          >
            {title}{" "}
            {highlight && <span className="text-bit-orange">{highlight}</span>}
          </h1>
          {subtitle && (
            <p
              className={`leading-relaxed max-w-2xl ${
                compact ? "text-xs text-gray-400 mt-1" : "text-lg text-gray-500"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
