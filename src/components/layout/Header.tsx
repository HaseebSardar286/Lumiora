"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import TrackedLink from "@/components/analytics/TrackedLink";
import BrandLogo from "@/components/ui/BrandLogo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm ${
          scrolled ? "shadow-sm border-b border-slate-200" : "border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center group shrink-0" aria-label="8BitField home">
              <BrandLogo height={56} priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-bit-cyan-dark bg-bit-cyan-50"
                      : "text-slate-600 hover:text-bit-cyan-dark hover:bg-bit-cyan-50/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center">
              <TrackedLink
                href="/contact"
                event="cta_click"
                props={{ location: "header", label: "start_a_project" }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-bit-orange rounded-lg hover:bg-bit-orange-dark transition-colors duration-200"
              >
                Start a Project
              </TrackedLink>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-brand-700 hover:bg-slate-50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/25" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20 overflow-y-auto h-full">
            <nav className="space-y-1" aria-label="Mobile">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-bit-cyan-dark bg-bit-cyan-50"
                      : "text-slate-700 hover:bg-bit-cyan-50 hover:text-bit-cyan-dark"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <TrackedLink
                href="/contact"
                event="cta_click"
                props={{ location: "mobile_nav", label: "start_a_project" }}
                className="block w-full text-center px-6 py-3 bg-bit-orange text-white font-semibold rounded-lg hover:bg-bit-orange-dark transition-colors"
              >
                Start a Project
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 lg:h-[4.5rem]" />
    </>
  );
}
