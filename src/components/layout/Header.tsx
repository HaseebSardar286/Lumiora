"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faTimes,
  faGlobe,
  faMobileScreen,
  faBrain,
  faShield,
  faClipboardList,
  faInfinity,
  faPenRuler,
  faBriefcase,
  faImages,
  faComments,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const servicesMenu = [
  { label: "Web Development", href: "/services/web-development", icon: faGlobe },
  { label: "Mobile Apps", href: "/services/mobile-apps", icon: faMobileScreen },
  { label: "AI Solutions", href: "/services/ai-solutions", icon: faBrain },
  { label: "QA & Testing", href: "/services/qa-testing", icon: faShield },
  { label: "Product Management", href: "/services/product-management", icon: faClipboardList },
  { label: "DevOps", href: "/services/devops", icon: faInfinity },
  { label: "UI/UX Design", href: "/services/ui-ux-design", icon: faPenRuler },
];

const portfolioMenu = [
  { label: "Case Studies", href: "/portfolio/case-studies", icon: faBriefcase },
  { label: "Live Projects", href: "/portfolio/live-projects", icon: faImages },
  { label: "Testimonials", href: "/portfolio/testimonials", icon: faComments },
];

const navItems = [
  { label: "About", href: "/about", num: "01" },
  { label: "Services", href: "/services", num: "02", submenu: servicesMenu },
  { label: "Portfolio", href: "/portfolio", num: "03", submenu: portfolioMenu },
  { label: "Process", href: "/process", num: "04" },
  { label: "Contact", href: "/contact", num: "05" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${
          scrolled
            ? "shadow-lg shadow-brand-100/50 border-b border-brand-100"
            : "border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 shadow-lg group-hover:shadow-brand-300 transition-shadow duration-300" />
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className="absolute inset-0 m-auto text-white w-5 h-5"
                />
              </div>
              <span className="text-xl font-black gradient-text tracking-tight">
                Lumiora
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        pathname?.startsWith(item.href) && item.href !== "/"
                          ? "text-brand-700 bg-brand-50"
                          : "text-gray-600 hover:text-brand-700 hover:bg-brand-50/60"
                      }
                    `}
                  >
                    {item.label}
                    {item.submenu && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.submenu && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 rounded-2xl bg-white border border-brand-100 shadow-2xl shadow-brand-100/50 overflow-hidden animate-fade-in-up">
                      <div className="p-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-all duration-200 group"
                          >
                            <span className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                              <FontAwesomeIcon icon={sub.icon} className="w-3.5 h-3.5 text-brand-600" />
                            </span>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/get-a-quote"
                className="px-4 py-2 text-sm font-semibold text-brand-700 border border-brand-300 rounded-xl hover:bg-brand-50 hover:border-brand-500 transition-all duration-200"
              >
                Get a Quote
              </Link>
              <Link
                href="/book-consultation"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 rounded-xl hover:shadow-lg hover:shadow-brand-200 hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-all"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-brand-950/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white/95 backdrop-blur-2xl shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20 overflow-y-auto h-full">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-brand-50 hover:text-brand-700 transition-all"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xs font-bold text-brand-400">{item.num}</span>
                          {item.label}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`w-3.5 h-3.5 transition-transform ${
                            mobileExpanded === item.label ? "rotate-180 text-brand-600" : ""
                          }`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-200 pl-4">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-all"
                            >
                              <FontAwesomeIcon icon={sub.icon} className="w-3.5 h-3.5 text-brand-500" />
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-brand-50 hover:text-brand-700 transition-all"
                    >
                      <span className="text-xs font-bold text-brand-400">{item.num}</span>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <Link
                href="/get-a-quote"
                className="block w-full text-center px-6 py-3 border border-brand-400 text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all"
              >
                Get a Quote
              </Link>
              <Link
                href="/book-consultation"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
