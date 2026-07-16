import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faEnvelope,
  faPhone,
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedinIn,
  faXTwitter,
  faGithub,
  faInstagram,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "QA & Testing", href: "/services/qa-testing" },
    { label: "DevOps", href: "/services/devops" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Our Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],
  "Quick Links": [
    { label: "Case Studies", href: "/portfolio/case-studies" },
    { label: "Live Projects", href: "/portfolio/live-projects" },
    { label: "Testimonials", href: "/portfolio/testimonials" },
    { label: "Get a Quote", href: "/get-a-quote" },
    { label: "Book Consultation", href: "/book-consultation" },
  ],
};

const socials = [
  { icon: faLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: faXTwitter, href: "https://x.com", label: "X/Twitter" },
  { icon: faGithub, href: "https://github.com", label: "GitHub" },
  { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: faDribbble, href: "https://dribbble.com", label: "Dribbble" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-700/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top CTA strip */}

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-accent flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Lumiora</span>
            </Link>
            <p className="text-brand-300 text-sm leading-relaxed mb-6 max-w-xs">
              Illuminating digital excellence through innovative technology solutions. We build
              products that inspire and transform businesses worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: faEnvelope, text: "hello@lumiora.io" },
                { icon: faPhone, text: "+1 (555) 000-LUMI" },
                { icon: faLocationDot, text: "San Francisco, CA 94105" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-brand-300">
                  <FontAwesomeIcon icon={icon} className="w-4 h-4 text-brand-500 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4 tracking-wide uppercase text-xs">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-400">
            © {new Date().getFullYear()} Lumiora. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-gray-200 flex items-center justify-center text-brand-400 hover:text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200"
              >
                <FontAwesomeIcon icon={icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-brand-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
