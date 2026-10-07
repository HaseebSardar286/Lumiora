"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faImage,
  faPen,
  faPlus,
  faSpinner,
  faTimes,
  faTrashAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/data/projects";

type AdminProjectsPanelProps = {
  email: string;
  password: string;
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};

type FormState = {
  slug: string;
  title: string;
  category: string;
  status: string;
  desc: string;
  longDesc: string;
  tags: string;
  metrics: string;
  image: string;
  liveUrl: string;
  screenshots: string[];
  features: string;
  techStack: string;
  problem: string;
  solution: string;
  contribution: string;
  outcome: string;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  category: "",
  status: "Live",
  desc: "",
  longDesc: "",
  tags: "",
  metrics: "",
  image: "",
  liveUrl: "",
  screenshots: [],
  features: "",
  techStack: "",
  problem: "",
  solution: "",
  contribution: "",
  outcome: "",
};

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function listsToForm(project: Project): FormState {
  return {
    slug: project.slug || "",
    title: project.title || "",
    category: project.category || "",
    status: project.status || "Live",
    desc: project.desc || "",
    longDesc: project.longDesc || "",
    tags: asStringArray(project.tags).join(", "),
    metrics: project.metrics || "",
    image: project.image || "",
    liveUrl: project.liveUrl || "",
    screenshots: asStringArray(project.screenshots),
    features: asStringArray(project.features).join("\n"),
    techStack: asStringArray(project.techStack).join(", "),
    problem: project.problem || "",
    solution: project.solution || "",
    contribution: project.contribution || "",
    outcome: project.outcome || "",
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readApiJson(res: Response): Promise<Record<string, any>> {
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!contentType.includes("application/json")) {
    throw new Error(
      res.status === 404
        ? "Project API route not found. Rebuild/restart the backend (`npm start` in /backend)."
        : `Server returned a non-JSON response (${res.status}). Is the backend running the latest build?`
    );
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Invalid JSON from server (${res.status}).`);
  }
}

export default function AdminProjectsPanel({
  email,
  password,
  projects,
  onProjectsChange,
  onError,
  onSuccess,
}: AdminProjectsPanelProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingScreens, setUploadingScreens] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.title.localeCompare(b.title)),
    [projects]
  );

  const uploadFolder = useMemo(() => {
    return slugify(form.slug || form.title) || "project";
  }, [form.slug, form.title]);

  const isEditing = Boolean(editingSlug);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) closeModal();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, submitting]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const closeModal = () => {
    if (submitting || uploadingCover || uploadingScreens) return;
    setModalOpen(false);
    setEditingSlug(null);
    setForm(emptyForm);
  };

  const openCreateModal = () => {
    setEditingSlug(null);
    setForm(emptyForm);
    setModalOpen(true);
    onError("");
    onSuccess("");
  };

  const openEditModal = (project: Project) => {
    try {
      setEditingSlug(project.slug);
      setForm(listsToForm(project));
      setModalOpen(true);
      onError("");
      onSuccess("");
    } catch (err: unknown) {
      onError(
        err instanceof Error
          ? `Could not load project for editing: ${err.message}`
          : "Could not load project for editing."
      );
    }
  };

  const uploadImages = async (files: FileList | File[]): Promise<string[]> => {
    const list = Array.from(files);
    if (list.length === 0) return [];

    const body = new FormData();
    body.append("email", email);
    body.append("password", password);
    body.append("folder", uploadFolder);
    for (const file of list) {
      body.append("images", file);
    }

    const res = await fetch("/api/uploads/projects", {
      method: "POST",
      body,
    });
    const data = await readApiJson(res);
    if (!res.ok) throw new Error(data.error || "Failed to upload images.");
    return data.urls || [];
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    onError("");
    setUploadingCover(true);
    try {
      const urls = await uploadImages(files);
      if (urls[0]) updateField("image", urls[0]);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Cover upload failed.");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleScreenshotsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    onError("");
    setUploadingScreens(true);
    try {
      const urls = await uploadImages(files);
      setForm((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, ...urls],
      }));
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Screenshot upload failed.");
    } finally {
      setUploadingScreens(false);
      e.target.value = "";
    }
  };

  const removeScreenshot = (url: string) => {
    setForm((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((s) => s !== url),
    }));
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}" from the portfolio? This cannot be undone.`)) return;
    onError("");
    onSuccess("");

    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to delete project.");

      onProjectsChange(projects.filter((p) => p.slug !== slug));
      if (editingSlug === slug) closeModal();
      onSuccess(`Removed "${title}" from the portfolio.`);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Failed to delete project.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    onSuccess("");

    if (!form.image) {
      onError("Please upload a cover image (or keep the existing one when editing).");
      return;
    }

    setSubmitting(true);

    try {
      const isEdit = Boolean(editingSlug);
      const url = isEdit
        ? `/api/projects/${encodeURIComponent(editingSlug!)}`
        : "/api/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          screenshots: form.screenshots,
          email,
          password,
        }),
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to save project.");

      const saved: Project = data.project;
      if (isEdit) {
        onProjectsChange(
          projects.map((p) => (p.slug === editingSlug || p.slug === saved.slug ? saved : p))
        );
        onSuccess(`Updated "${saved.title}". Changes are live on the Work page.`);
      } else {
        onProjectsChange([...projects, saved]);
        onSuccess(
          `Added "${saved.title}". Case study: /portfolio/project/${saved.slug}`
        );
      }

      setModalOpen(false);
      setEditingSlug(null);
      setForm(emptyForm);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1";
  const fileBtnClass =
    "inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-brand-500 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-150 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900">Portfolio Projects</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">
            Manage case studies in a compact grid. Add or edit opens in a modal.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-sm">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
            New project
          </button>
        </div>
      </div>

      {sortedProjects.length === 0 ? (
        <GlassCard hover={false} className="py-16 text-center border-dashed">
          <p className="text-gray-400 font-medium text-sm mb-4">No projects yet.</p>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
            Add first project
          </button>
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedProjects.map((project) => (
            <GlassCard
              key={project.slug}
              hover={false}
              className="overflow-hidden border border-slate-100 p-0 flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <FontAwesomeIcon icon={faImage} className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 text-slate-700 border border-white/60">
                  {project.status}
                </span>
              </div>

              <div className="p-3.5 flex flex-col gap-2 flex-1">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                    {project.category}
                  </p>
                </div>

                <div className="mt-auto pt-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-bold text-white bg-brand-700 hover:bg-brand-800 rounded-lg cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                    Edit
                  </button>
                  <Link
                    href={`/portfolio/project/${project.slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center w-9 h-9 text-brand-700 border border-brand-200 rounded-lg hover:bg-brand-50"
                    title="View"
                  >
                    <FontAwesomeIcon icon={faExternalLink} className="w-3 h-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.slug, project.title)}
                    className="inline-flex items-center justify-center w-9 h-9 text-rose-600 border border-rose-100 bg-rose-50/50 rounded-lg hover:bg-rose-100 cursor-pointer"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {mounted &&
        modalOpen &&
        createPortal(
        <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center pt-20 sm:pt-6 pb-0 sm:pb-6 px-0 sm:px-6">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] cursor-pointer"
            onClick={closeModal}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative z-10 w-full sm:max-w-3xl max-h-[calc(100vh-5.5rem)] sm:max-h-[min(90vh,calc(100vh-3rem))] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in"
          >
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h4
                  id="project-modal-title"
                  className="text-lg font-black text-slate-900"
                >
                  {isEditing ? `Edit: ${form.title || editingSlug}` : "Add new project"}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isEditing
                    ? "Update copy, case-study sections, or replace images."
                    : "Fill the same fields used by existing portfolio case studies."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="w-9 h-9 rounded-xl border border-gray-200 text-slate-500 hover:text-slate-800 hover:border-gray-300 flex items-center justify-center cursor-pointer disabled:opacity-50"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="overflow-y-auto px-5 py-5 space-y-5 flex-1">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Title *</label>
                    <input
                      required
                      className={inputClass}
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="AssetLoop"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>URL slug</label>
                    <input
                      className={inputClass}
                      value={form.slug}
                      onChange={(e) => updateField("slug", e.target.value)}
                      placeholder="auto-from-title if empty"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Category *</label>
                    <input
                      required
                      className={inputClass}
                      value={form.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      placeholder="Rental Marketplace / Web Platform"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Status *</label>
                    <select
                      required
                      className={inputClass}
                      value={form.status}
                      onChange={(e) => updateField("status", e.target.value)}
                    >
                      <option value="Live">Live</option>
                      <option value="In Development">In Development</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Short description *</label>
                    <textarea
                      required
                      rows={2}
                      className={inputClass}
                      value={form.desc}
                      onChange={(e) => updateField("desc", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Long description *</label>
                    <textarea
                      required
                      rows={3}
                      className={inputClass}
                      value={form.longDesc}
                      onChange={(e) => updateField("longDesc", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Metrics / focus *</label>
                    <input
                      required
                      className={inputClass}
                      value={form.metrics}
                      onChange={(e) => updateField("metrics", e.target.value)}
                      placeholder="Marketplace Platform"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tags (comma-separated)</label>
                    <input
                      className={inputClass}
                      value={form.tags}
                      onChange={(e) => updateField("tags", e.target.value)}
                      placeholder="Angular, Node.js, Stripe"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Live demo URL</label>
                    <input
                      className={inputClass}
                      value={form.liveUrl}
                      onChange={(e) => updateField("liveUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tech stack (comma-separated)</label>
                    <input
                      className={inputClass}
                      value={form.techStack}
                      onChange={(e) => updateField("techStack", e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className={labelClass}>Cover image *</label>
                    <div className="flex flex-wrap items-start gap-4">
                      <label className={fileBtnClass}>
                        <FontAwesomeIcon
                          icon={uploadingCover ? faSpinner : faUpload}
                          className={`w-3.5 h-3.5 ${uploadingCover ? "animate-spin" : ""}`}
                        />
                        {uploadingCover
                          ? "Uploading..."
                          : form.image
                            ? "Replace cover"
                            : "Choose cover"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingCover || submitting}
                          onChange={handleCoverChange}
                        />
                      </label>
                      {form.image ? (
                        <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                          <img
                            src={form.image}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => updateField("image", "")}
                            className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center cursor-pointer"
                            title="Remove cover"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-36 h-24 rounded-xl border border-dashed border-gray-200 bg-slate-50 flex flex-col items-center justify-center gap-1 text-gray-400">
                          <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
                          <span className="text-[10px] font-bold">No cover</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className={labelClass}>Screenshots</label>
                    <label className={fileBtnClass}>
                      <FontAwesomeIcon
                        icon={uploadingScreens ? faSpinner : faUpload}
                        className={`w-3.5 h-3.5 ${uploadingScreens ? "animate-spin" : ""}`}
                      />
                      {uploadingScreens ? "Uploading..." : "Add screenshots"}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        disabled={uploadingScreens || submitting}
                        onChange={handleScreenshotsChange}
                      />
                    </label>
                    {form.screenshots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {form.screenshots.map((url) => (
                          <div
                            key={url}
                            className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                          >
                            <img
                              src={url}
                              alt="Screenshot"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeScreenshot(url)}
                              className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center cursor-pointer"
                              title="Remove screenshot"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-400">
                        Optional. If empty, cover is used as the screenshot.
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>Features (one per line)</label>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={form.features}
                      onChange={(e) => updateField("features", e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-4">
                  <p className="text-xs font-bold text-slate-700">
                    Case study sections (optional)
                  </p>
                  {(
                    [
                      ["problem", "Problem"],
                      ["solution", "Solution"],
                      ["contribution", "Contribution"],
                      ["outcome", "Outcome"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <textarea
                        rows={2}
                        className={inputClass}
                        value={form[key]}
                        onChange={(e) => updateField(key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 border-t border-slate-100 px-5 py-4 bg-slate-50/80 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 border border-gray-200 bg-white rounded-xl hover:border-gray-300 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingCover || uploadingScreens}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin w-3.5 h-3.5" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={isEditing ? faPen : faPlus}
                        className="w-3.5 h-3.5"
                      />
                      {isEditing ? "Save changes" : "Add project"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
