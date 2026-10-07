/** Public brand identity for 8BitField */
export const BRAND = {
  name: "8BitField",
  tagline: "Software development for businesses and startups.",
  // Temporary personal inbox until company domain email is purchased
  email: "haseebsardar286@gmail.com",
  /** Opens Gmail compose in-browser (same tab behavior as WhatsApp web links) */
  emailUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=haseebsardar286%40gmail.com",
  emailMailto: "mailto:haseebsardar286@gmail.com",
  whatsappDisplay: "+92 310 4836096",
  whatsappUrl: "https://wa.me/923104836096",
  // Set NEXT_SITE_URL in Vercel when you connect a custom domain (server-side)
  siteUrl: (
    process.env.NEXT_SITE_URL || "https://lumiora-two.vercel.app"
  ).replace(/\/$/, ""),
  copyrightYear: 2026,
  seoTitle: "8BitField | Custom Software Development for Businesses & Startups",
  seoDescription:
    "8BitField builds custom web applications, SaaS products, backend systems, mobile applications, and AI/ML solutions for businesses and startups.",
  /** Cache-busted when the brand mark changes */
  logoPath: "/brand-logo.png?v=7",
  /** Light mark for dark surfaces (footer, dark UI) */
  logoOnDarkPath: "/brand-logo-on-dark.png?v=7b",
  logoAlt: "8BitField",
} as const;

export const BRAND_COPYRIGHT = `© ${BRAND.copyrightYear} ${BRAND.name}. All rights reserved.`;

/** Gmail web compose URL for any recipient (opens like WhatsApp links). */
export function gmailComposeUrl(to: string, subject?: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
