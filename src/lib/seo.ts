import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

/** Marketing pages we want indexed (no admin, legacy forms, or private routes). */
export const INDEXABLE_PATHS: string[] = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/services/web-development",
  "/services/mobile-apps",
  "/services/ai-solutions",
  "/services/devops",
  "/services/ui-ux-design",
  "/services/qa-testing",
  "/services/product-management",
  "/solutions",
  "/process",
  "/portfolio",
  "/portfolio/case-studies",
  "/portfolio/live-projects",
  "/portfolio/testimonials",
  "/pricing",
  "/careers",
  "/blog",
];

export function absoluteUrl(path: string): string {
  const base = BRAND.siteUrl.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}`;
}

export async function fetchProjectSlugsForSeo(): Promise<string[]> {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${backendUrl}/api/projects`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const projects = data.projects || [];
    return projects
      .map((p: { slug?: string }) => p.slug)
      .filter(Boolean) as string[];
  } catch {
    return [];
  }
}

type PageSeoOptions = {
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
};

/** Consistent title, description, canonical, and Open Graph for a page. */
export function buildPageMetadata({
  path,
  title,
  description,
  image,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || BRAND.logoPath;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: BRAND.name,
      locale: "en_US",
      images: [{ url: ogImage, alt: BRAND.logoAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.siteUrl,
    logo: absoluteUrl(BRAND.logoPath.split("?")[0]),
    description: BRAND.seoDescription,
    email: BRAND.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: BRAND.email,
      telephone: BRAND.whatsappDisplay,
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: BRAND.siteUrl,
    description: BRAND.seoDescription,
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BRAND.name,
    url: BRAND.siteUrl,
    description: BRAND.seoDescription,
    image: absoluteUrl(BRAND.logoPath.split("?")[0]),
    areaServed: "Worldwide",
    serviceType: [
      "Custom software development",
      "Web application development",
      "Mobile app development",
      "SaaS development",
      "AI and machine learning solutions",
    ],
  };
}
