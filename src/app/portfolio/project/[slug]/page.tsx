import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/sections/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExternalLink,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/data/projects";
import TrackedLink from "@/components/analytics/TrackedLink";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string): Promise<Project | null> {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${backendUrl}/api/projects/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.project || null;
  } catch (error) {
    console.error(`Error loading project details for ${slug}:`, error);
    return null;
  }
}

async function getAllProjects(): Promise<Project[]> {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${backendUrl}/api/projects`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  } catch (error) {
    console.error("Error loading all projects for paths:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.desc,
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const hasCaseStudy =
    project.problem || project.solution || project.contribution || project.outcome;

  return (
    <>
      <PageHero
        badge={project.category}
        title={project.title}
        highlight=""
        subtitle={project.desc}
        breadcrumbs={[
          { label: "Work", href: "/portfolio" },
          { label: "Case Study" },
          { label: project.title },
        ]}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" /> Back to Work
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden relative border border-slate-100 bg-brand-800">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {hasCaseStudy ? (
                <>
                  {project.problem && (
                    <CaseBlock title="Problem">
                      <p>{project.problem}</p>
                    </CaseBlock>
                  )}
                  {project.solution && (
                    <CaseBlock title="Solution">
                      <p>{project.solution}</p>
                    </CaseBlock>
                  )}
                </>
              ) : (
                <CaseBlock title="Overview">
                  <p className="whitespace-pre-line">{project.longDesc}</p>
                </CaseBlock>
              )}

              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">
                  Features
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-brand-600 w-4 h-4 shrink-0 mt-0.5"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                  Technology
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.contribution && (
                <CaseBlock title="Contribution">
                  <p>{project.contribution}</p>
                </CaseBlock>
              )}

              {project.outcome && (
                <CaseBlock title="Outcome">
                  <p>{project.outcome}</p>
                </CaseBlock>
              )}

              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">
                    Screenshots
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {project.screenshots.map((src, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-100 overflow-hidden aspect-[16/10] relative bg-slate-50"
                      >
                        <img
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 p-6 border border-slate-200 rounded-xl bg-slate-50 flex flex-col gap-5">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Project Details
                </h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between gap-4 py-2 border-b border-slate-200">
                    <span className="text-slate-500">Category</span>
                    <span className="text-slate-800 font-semibold text-right">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 py-2 border-b border-slate-200">
                    <span className="text-slate-500">Status</span>
                    <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-semibold text-xs uppercase">
                      {project.status}
                    </span>
                  </div>
                  {project.metrics && (
                    <div className="flex justify-between gap-4 py-2 border-b border-slate-200">
                      <span className="text-slate-500">Focus</span>
                      <span className="text-slate-800 font-semibold text-right">
                        {project.metrics}
                      </span>
                    </div>
                  )}
                </div>

                {project.liveUrl && (
                  <TrackedLink
                    href={project.liveUrl}
                    event="project_live_click"
                    props={{ project: project.slug }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Visit Live Project{" "}
                    <FontAwesomeIcon icon={faExternalLink} className="w-3.5 h-3.5" />
                  </TrackedLink>
                )}

                <TrackedLink
                  href="/contact"
                  event="cta_click"
                  props={{ location: "case_study", project: project.slug }}
                  className="flex items-center justify-center w-full py-3.5 px-5 border border-brand-300 text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors text-sm"
                >
                  Start a Project
                </TrackedLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
