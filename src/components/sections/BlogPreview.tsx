import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "@/components/ui/SectionHeader";

const posts = [
  {
    title: "The Future of AI in Enterprise Software Development",
    excerpt:
      "Discover how large language models and AI agents are reshaping the way companies build and maintain software at scale.",
    category: "AI & Technology",
    readTime: "8 min read",
    date: "Jul 10, 2025",
    gradient: "from-brand-700 to-brand-900",
    href: "/blog/ai-enterprise-software",
  },
  {
    title: "Designing for Accessibility: Beyond the Basics",
    excerpt:
      "A practical guide to building inclusive digital products that reach every user, regardless of ability.",
    category: "UI/UX Design",
    readTime: "6 min read",
    date: "Jul 5, 2025",
    gradient: "from-brand-700 to-brand-600",
    href: "/blog/designing-for-accessibility",
  },
  {
    title: "Kubernetes at Scale: Lessons from 500+ Deployments",
    excerpt:
      "Real-world patterns, anti-patterns, and hard-won insights from managing Kubernetes clusters for global enterprises.",
    category: "DevOps",
    readTime: "12 min read",
    date: "Jun 28, 2025",
    gradient: "from-brand-700 to-brand-600",
    href: "/blog/kubernetes-at-scale",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 gradient-bg">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            badge="Insights"
            title="From Our"
            highlight="Blog"
            subtitle="Thought leadership and technical deep-dives from the Lumiora team."
            align="left"
          />
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 shrink-0 transition-colors"
          >
            View All Articles <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.title} href={post.href} className="group block">
              <div className="glass-card rounded-2xl overflow-hidden h-full">
                {/* Gradient banner */}
                <div className={`h-44 bg-gradient-to-br ${post.gradient} relative`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_70%,white,transparent)]" />
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30">
                      <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>

                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                    Read Article <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
