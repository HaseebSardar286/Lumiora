import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/book-consultation",
  title: "Book Consultation",
  description: "Legacy consultation booking.",
  noIndex: true,
});

export default function BookConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
