/** Public brand identity for 8BitField */
export const BRAND = {
  name: "8BitField",
  tagline: "Software development for businesses and startups.",
  email: "hello@8bitfield.com",
  emailMailto: "mailto:hello@8bitfield.com",
  // Keep current deployment URL until a dedicated 8BitField domain is configured
  siteUrl: "https://lumiora-two.vercel.app",
  copyrightYear: 2026,
  seoTitle: "8BitField | Custom Software Development for Businesses & Startups",
  seoDescription:
    "8BitField builds custom web applications, SaaS products, backend systems, mobile applications, and AI/ML solutions for businesses and startups.",
  logoPath: "/brand-logo.png",
  logoAlt: "8BitField — Innovate the Pixel",
} as const;

export const BRAND_COPYRIGHT = `© ${BRAND.copyrightYear} ${BRAND.name}. All rights reserved.`;
