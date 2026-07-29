import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExternalLink, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically based on the project slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Lumiora Portfolio",
    };
  }

  return {
    title: `${project.title} — Case Study & Project Details`,
    description: project.desc,
  };
}

// Statically pre-generate paths for high-performance static rendering
export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHero
        badge={project.category}
        title={project.title}
        highlight=""
        subtitle={project.desc}
        breadcrumbs={[
          { label: "Portfolio", href: "/portfolio" },
          { label: "Live Projects", href: "/portfolio/live-projects" },
          { label: project.title },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/portfolio/live-projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" /> Back to Live Projects
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Feature Image Banner */}
              <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden relative shadow-sm border border-gray-100 flex-shrink-0 bg-brand-700">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Deep Dive Description */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">Project Overview</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{project.longDesc}</p>
              </div>

              {/* Core Features */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">Key Deliverables & Features</h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 w-5 h-5 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">Technologies & Architecture</h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 bg-brand-50 border border-brand-100 rounded-xl text-xs font-semibold text-brand-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* System Screens Gallery */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-5">System Screen Previews</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.screenshots.map((src, i) => (
                      <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 aspect-[16/10] relative bg-brand-50 flex items-center justify-center">
                        <img
                          src={src}
                          alt={`${project.title} Preview ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4">
              <GlassCard className="sticky top-24 p-6 sm:p-8 flex flex-col gap-6 bg-slate-50/50 border-gray-200">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-5">Project Details</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                      <span className="text-gray-500 font-medium">Category</span>
                      <span className="text-slate-800 font-bold">{project.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                      <span className="text-gray-500 font-medium">Project Status</span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-bold text-xs uppercase">
                        {project.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                      <span className="text-gray-500 font-medium">Key Outcome</span>
                      <span className="text-emerald-600 font-black">{project.metrics}</span>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Links */}
                {project.liveUrl && (
                  <div className="flex flex-col gap-3 mt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-2xl transition-all shadow-sm hover:shadow-md text-sm text-center"
                    >
                      Visit Live Website <FontAwesomeIcon icon={faExternalLink} className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
