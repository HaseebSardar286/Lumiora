"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPen,
  faPlus,
  faSpinner,
  faTimes,
  faTrashAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import type { TeamMember } from "@/data/team";

export type { TeamMember };

type AdminTeamPanelProps = {
  email: string;
  password: string;
  members: TeamMember[];
  onMembersChange: (members: TeamMember[]) => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};

type FormState = {
  name: string;
  designation: string;
  image: string;
  sortOrder: string;
};

const emptyForm: FormState = {
  name: "",
  designation: "",
  image: "",
  sortOrder: "0",
};

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "member"
  );
}

async function readApiJson(res: Response): Promise<Record<string, any>> {
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!contentType.includes("application/json")) {
    throw new Error(
      res.status === 404
        ? "Team API route not found. Rebuild/restart the backend (`npm start` in /backend)."
        : `Server returned a non-JSON response (${res.status}). Is the backend running the latest build?`
    );
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Invalid JSON from server (${res.status}).`);
  }
}

export default function AdminTeamPanel({
  email,
  password,
  members,
  onMembersChange,
  onError,
  onSuccess,
}: AdminTeamPanelProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) => {
        const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        if (orderDiff !== 0) return orderDiff;
        return a.name.localeCompare(b.name);
      }),
    [members]
  );

  const uploadFolder = useMemo(
    () => slugify(form.name) || "member",
    [form.name]
  );

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting && !uploading) closeModal();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, submitting, uploading]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const closeModal = () => {
    if (submitting || uploading) return;
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
    onError("");
    onSuccess("");
  };

  const openEditModal = (member: TeamMember) => {
    setEditingId(member._id);
    setForm({
      name: member.name || "",
      designation: member.designation || "",
      image: member.image || "",
      sortOrder: String(member.sortOrder ?? 0),
    });
    setModalOpen(true);
    onError("");
    onSuccess("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    onError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.append("email", email);
      body.append("password", password);
      body.append("folder", uploadFolder);
      body.append("images", files[0]);

      const res = await fetch("/api/uploads/team", {
        method: "POST",
        body,
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to upload image.");
      if (data.urls?.[0]) updateField("image", data.urls[0]);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from the team? This cannot be undone.`)) return;
    onError("");
    onSuccess("");

    try {
      const res = await fetch(`/api/team/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to delete team member.");

      onMembersChange(members.filter((m) => m._id !== id));
      if (editingId === id) closeModal();
      onSuccess(`Removed "${name}" from the team.`);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Failed to delete team member.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    onSuccess("");

    if (!form.image) {
      onError("Please upload a photo for this team member.");
      return;
    }

    setSubmitting(true);

    try {
      const isEdit = Boolean(editingId);
      const url = isEdit
        ? `/api/team/${encodeURIComponent(editingId!)}`
        : "/api/team";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          designation: form.designation.trim(),
          image: form.image,
          sortOrder: Number(form.sortOrder) || 0,
          email,
          password,
        }),
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to save team member.");

      const saved: TeamMember = data.member;
      if (isEdit) {
        onMembersChange(
          members.map((m) => (m._id === editingId ? saved : m))
        );
        onSuccess(`Updated "${saved.name}".`);
      } else {
        onMembersChange([...members, saved]);
        onSuccess(`Added "${saved.name}" to the team.`);
      }

      setModalOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Failed to save team member.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400";
  const labelClass =
    "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1";
  const fileBtnClass =
    "inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-brand-500 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors";

  const modal =
    mounted &&
    modalOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget && !submitting && !uploading) {
            closeModal();
          }
        }}
      >
        <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-white">
            <h4 className="text-base font-black text-slate-900">
              {editingId ? "Edit team member" : "Add team member"}
            </h4>
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting || uploading}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className={labelClass}>Photo</label>
              <div className="flex flex-wrap items-start gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  {form.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faImage}
                      className="w-6 h-6 text-slate-300"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className={fileBtnClass}>
                    <FontAwesomeIcon
                      icon={uploading ? faSpinner : faUpload}
                      className={`w-3.5 h-3.5 ${uploading ? "animate-spin" : ""}`}
                    />
                    {uploading ? "Uploading…" : "Upload from computer"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading || submitting}
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 max-w-[220px]">
                    JPG, PNG, or WebP. Prefer a square portrait photo.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={inputClass}
                placeholder="Full name"
              />
            </div>

            <div>
              <label className={labelClass}>Designation</label>
              <input
                type="text"
                required
                value={form.designation}
                onChange={(e) => updateField("designation", e.target.value)}
                className={inputClass}
                placeholder="e.g. Backend Engineer"
              />
            </div>

            <div>
              <label className={labelClass}>Sort order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => updateField("sortOrder", e.target.value)}
                className={inputClass}
                placeholder="0"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first on the site.
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                disabled={submitting || uploading}
                className="px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold rounded-xl cursor-pointer disabled:opacity-60"
              >
                {submitting ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin w-3.5 h-3.5" />
                ) : editingId ? (
                  "Save changes"
                ) : (
                  "Add member"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-150 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900">Team Members</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">
            Add people shown on the homepage and About page. Each member needs a
            photo and designation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-sm">
            {members.length} member{members.length === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
            Add member
          </button>
        </div>
      </div>

      {sortedMembers.length === 0 ? (
        <GlassCard hover={false} className="py-16 text-center border-dashed">
          <p className="text-gray-400 font-medium text-sm mb-4">
            No team members yet.
          </p>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
            Add first member
          </button>
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedMembers.map((member) => (
            <GlassCard
              key={member._id}
              hover={false}
              className="overflow-hidden border border-slate-100 p-0 flex flex-col"
            >
              <div className="relative aspect-square bg-slate-100">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <FontAwesomeIcon icon={faImage} className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1 gap-3">
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {member.designation}
                  </p>
                </div>
                <div className="mt-auto flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(member)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-brand-500 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(member._id, member.name)}
                    className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 cursor-pointer"
                    aria-label={`Delete ${member.name}`}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {modal}
    </div>
  );
}
