import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import TrackedLink from "@/components/analytics/TrackedLink";
import BrandLogo from "@/components/ui/BrandLogo";
import { BRAND, BRAND_COPYRIGHT } from "@/lib/brand";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-bit-cyan" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex mb-4" aria-label="8BitField home">
              <BrandLogo height={72} variant="onDark" />
            </Link>
            <p className="text-brand-300 text-sm leading-relaxed max-w-xs">
              {BRAND.tagline}
            </p>
            <TrackedLink
              href={BRAND.emailMailto}
              event="email_click"
              props={{ location: "footer" }}
              className="mt-5 inline-flex items-center gap-2 text-sm text-brand-300 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-brand-500" />
              {BRAND.email}
            </TrackedLink>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              Navigate
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              Start a project
            </h4>
            <p className="text-sm text-brand-300 leading-relaxed mb-4 max-w-xs">
              Small enough to communicate directly. Capable enough to build serious
              software.
            </p>
            <TrackedLink
              href="/contact"
              event="cta_click"
              props={{ location: "footer", label: "discuss_project" }}
              className="inline-flex text-sm font-semibold text-bit-orange hover:text-bit-yellow transition-colors"
            >
              Discuss your project →
            </TrackedLink>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-6">
          <p className="text-xs text-brand-400">{BRAND_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}
