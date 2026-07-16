import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BlogPreview from "@/components/sections/BlogPreview";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thought leadership, technical tutorials, and industry insights from the Lumiora engineering and design team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        badge="Blog"
        title="Insights &"
        highlight="Thought Leadership"
        subtitle="Technical deep-dives, industry trends, and engineering best practices from the Lumiora team."
        breadcrumbs={[{ label: "Blog" }]}
        gradient="from-white via-brand-alt to-brand-50"
      />
      <BlogPreview />
      <CTA />
    </>
  );
}
