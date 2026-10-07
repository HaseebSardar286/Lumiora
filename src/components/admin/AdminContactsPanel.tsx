"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelope,
  faEnvelopeOpen,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { gmailComposeUrl } from "@/lib/brand";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType?: string;
  budget?: string;
  notes: string;
  read: boolean;
  createdAt: string;
};

type Props = {
  email: string;
  password: string;
  contacts: ContactMessage[];
  onContactsChange: (contacts: ContactMessage[]) => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};

type Filter = "all" | "unread" | "read";

async function readApiJson(res: Response): Promise<Record<string, any>> {
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!contentType.includes("application/json")) {
    throw new Error(`Server returned a non-JSON response (${res.status}).`);
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Invalid JSON from server (${res.status}).`);
  }
}

export default function AdminContactsPanel({
  email,
  password,
  contacts,
  onContactsChange,
  onError,
  onSuccess,
}: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const unreadCount = useMemo(
    () => contacts.filter((c) => !c.read).length,
    [contacts]
  );

  const filtered = useMemo(() => {
    if (filter === "unread") return contacts.filter((c) => !c.read);
    if (filter === "read") return contacts.filter((c) => c.read);
    return contacts;
  }, [contacts, filter]);

  const setReadStatus = async (
    id: string,
    read: boolean,
    options?: { silent?: boolean }
  ) => {
    setBusyId(id);
    onError("");
    try {
      const res = await fetch(`/api/contact/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, read }),
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to update message.");

      const updated = data.contact as ContactMessage;
      onContactsChange(contacts.map((c) => (c.id === id ? updated : c)));
      if (selected?.id === id) setSelected(updated);
      if (!options?.silent) {
        onSuccess(read ? "Marked as read." : "Marked as unread.");
      }
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Failed to update message.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from ${name}? This cannot be undone.`)) return;
    setBusyId(id);
    onError("");
    try {
      const res = await fetch(`/api/contact/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await readApiJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to delete message.");

      onContactsChange(contacts.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
      onSuccess("Message deleted.");
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Failed to delete message.");
    } finally {
      setBusyId(null);
    }
  };

  const openMessage = async (contact: ContactMessage) => {
    setSelected(contact);
    onSuccess("");
    onError("");
    if (!contact.read) {
      await setReadStatus(contact.id, true, { silent: true });
    }
  };

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: contacts.length },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "read", label: "Read", count: contacts.length - unreadCount },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-150 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900">Contact Messages</h3>
          <p className="text-xs text-gray-500 mt-1">
            Project inquiries from the website contact form.
          </p>
        </div>
        <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl">
          {unreadCount} unread · {contacts.length} total
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              filter === item.key
                ? "bg-brand-700 text-white border-brand-700 shadow-sm"
                : "bg-white text-slate-600 border-gray-200 hover:border-brand-500"
            }`}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <GlassCard hover={false} className="py-20 text-center border-dashed">
            <p className="text-gray-400 font-medium">No messages in this view.</p>
          </GlassCard>
        ) : (
          filtered.map((contact) => (
            <GlassCard
              key={contact.id}
              hover={false}
              className={`p-0 border overflow-hidden transition-colors ${
                contact.read
                  ? "border-slate-200 bg-white"
                  : "border-brand-200 bg-brand-50/40"
              }`}
            >
              <button
                type="button"
                onClick={() => openMessage(contact)}
                className="w-full text-left p-5 hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {!contact.read && (
                        <span className="w-2 h-2 rounded-full bg-bit-orange shrink-0" aria-label="Unread" />
                      )}
                      <span
                        className={`text-sm ${
                          contact.read ? "font-semibold text-slate-800" : "font-black text-slate-900"
                        }`}
                      >
                        {contact.name}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                        {contact.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          contact.read
                            ? "bg-slate-100 text-slate-500"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {contact.read ? "Read" : "Unread"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-gray-400" />
                        {contact.email}
                      </span>
                      {contact.company && (
                        <span className="inline-flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 text-gray-400" />
                          {contact.company}
                        </span>
                      )}
                      {contact.projectType && <span>{contact.projectType}</span>}
                    </div>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                      {contact.notes}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {new Date(contact.createdAt).toLocaleString()}
                  </span>
                </div>
              </button>

              <div className="flex flex-wrap gap-2 px-5 pb-4">
                <button
                  type="button"
                  disabled={busyId === contact.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReadStatus(contact.id, !contact.read);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-gray-200 bg-white text-slate-600 hover:border-brand-500 disabled:opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={contact.read ? faEnvelope : faEnvelopeOpen}
                    className="w-3 h-3"
                  />
                  {contact.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  disabled={busyId === contact.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(contact.id, contact.name);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-rose-100 bg-rose-50 text-rose-600 hover:border-rose-300 disabled:opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      {mounted &&
        selected &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <button
              type="button"
              aria-label="Close message"
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelected(null)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-message-title"
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-xl sm:rounded-2xl border border-slate-200"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {selected.id}
                  </p>
                  <h2
                    id="contact-message-title"
                    className="text-lg font-black text-slate-900"
                  >
                    {selected.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <Field label="Email" value={selected.email} />
                  <Field label="Company" value={selected.company || "—"} />
                  <Field label="Project type" value={selected.projectType || "—"} />
                  <Field label="Budget" value={selected.budget || "—"} />
                  <Field
                    label="Status"
                    value={selected.read ? "Read" : "Unread"}
                  />
                  <Field
                    label="Submitted"
                    value={new Date(selected.createdAt).toLocaleString()}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Project description
                  </p>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selected.notes}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 flex flex-wrap gap-2 px-6 py-4 border-t border-slate-100 bg-white">
                <a
                  href={gmailComposeUrl(
                    selected.email,
                    `Re: Your inquiry (${selected.id})`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-brand-700 text-white hover:bg-brand-800"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" />
                  Reply by email
                </a>
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={() => setReadStatus(selected.id, !selected.read)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 bg-white text-slate-700 hover:border-brand-500 disabled:opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={selected.read ? faEnvelope : faEnvelopeOpen}
                    className="w-3.5 h-3.5"
                  />
                  {selected.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={() => handleDelete(selected.id, selected.name)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-rose-100 bg-rose-50 text-rose-600 hover:border-rose-300 disabled:opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
        {label}
      </p>
      <p className="font-semibold text-slate-800 break-words">{value}</p>
    </div>
  );
}
