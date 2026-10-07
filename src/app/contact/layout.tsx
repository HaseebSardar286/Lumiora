import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact 8BitField | Start Your Software Project",
  description:
    "Contact 8BitField to discuss custom web apps, SaaS, mobile, backend, and AI/ML development for your business or startup.",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
