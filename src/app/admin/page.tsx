"use client";

import React, { useState, useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProjectsPanel from "@/components/admin/AdminProjectsPanel";
import AdminContactsPanel, {
  type ContactMessage,
} from "@/components/admin/AdminContactsPanel";
import type { Project } from "@/data/projects";
import {
  faLock,
  faSpinner,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeTab, setActiveTab] = useState<"contacts" | "projects">("contacts");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("8bitfield_admin_email");
    const savedPassword = sessionStorage.getItem("8bitfield_admin_password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      verifyAndFetch(savedEmail, savedPassword);
    }
  }, []);

  const verifyAndFetch = async (emailVal: string, passwordVal: string) => {
    setLoading(true);
    setAuthError("");
    setError("");

    try {
      const encodedEmail = encodeURIComponent(emailVal);
      const encodedPass = encodeURIComponent(passwordVal);

      const contactsRes = await fetch(
        `/api/contact?email=${encodedEmail}&password=${encodedPass}`
      );

      if (!contactsRes.ok) {
        if (contactsRes.status === 401 || contactsRes.status === 403) {
          throw new Error("Invalid admin credentials");
        }
        if (contactsRes.status === 502 || contactsRes.status === 503) {
          throw new Error(
            "Admin API is unavailable. Check BACKEND_API_URL on the frontend host and that the backend is healthy."
          );
        }
        let detail = "";
        try {
          const errBody = await contactsRes.json();
          detail = errBody?.error ? ` (${errBody.error})` : "";
        } catch {
          /* ignore */
        }
        throw new Error(`Admin login failed (${contactsRes.status})${detail}`);
      }

      const contactsData = await contactsRes.json();
      setContacts(
        (contactsData.contacts || []).map((c: ContactMessage) => ({
          ...c,
          read: Boolean(c.read),
        }))
      );

      const projectsRes = await fetch("/api/projects");
      const projectsData = await projectsRes.json();
      setProjects(projectsData.projects || []);

      setIsAuthenticated(true);
      sessionStorage.setItem("8bitfield_admin_email", emailVal);
      sessionStorage.setItem("8bitfield_admin_password", passwordVal);
    } catch (err: unknown) {
      console.error(err);
      setAuthError(err instanceof Error ? err.message : "Failed to authenticate.");
      setIsAuthenticated(false);
      sessionStorage.removeItem("8bitfield_admin_email");
      sessionStorage.removeItem("8bitfield_admin_password");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      verifyAndFetch(email.trim(), password.trim());
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("8bitfield_admin_email");
    sessionStorage.removeItem("8bitfield_admin_password");
    setEmail("");
    setPassword("");
    setIsAuthenticated(false);
    setContacts([]);
    setProjects([]);
  };

  if (!isAuthenticated) {
    return (
      <>
        <PageHero
          badge="Admin"
          title="Admin"
          highlight="Login"
          subtitle="Sign in to manage contact messages and portfolio projects."
          compact
        />
        <section className="py-16 bg-slate-50/50">
          <div className="w-full max-w-md mx-auto px-4">
            <GlassCard hover={false} className="p-8 border border-slate-200">
              <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-700">
                <FontAwesomeIcon icon={faLock} className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-center text-slate-900 mb-6">
                Sign in
              </h2>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {authError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold">
                    {authError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-left font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
                    placeholder="admin@8bitfield.com"
                    required
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-left font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin w-4 h-4" />
                  ) : (
                    <>
                      Continue
                      <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </section>
      </>
    );
  }

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <>
      <PageHero
        badge="Admin Dashboard"
        title="Manage"
        highlight="Inbox"
        subtitle="Review contact messages and update portfolio case studies."
        compact
      />

      <section className="py-12 bg-slate-50/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("contacts")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "contacts"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Contact Messages
                {unreadCount > 0 && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${
                      activeTab === "contacts"
                        ? "bg-white/20 text-white"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Portfolio
              </button>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold border border-rose-100 bg-rose-50/50 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold leading-relaxed animate-fade-in">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="p-4 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold leading-relaxed animate-fade-in">
              🎉 {success}
            </div>
          )}

          {activeTab === "contacts" && (
            <AdminContactsPanel
              email={email}
              password={password}
              contacts={contacts}
              onContactsChange={setContacts}
              onError={setError}
              onSuccess={setSuccess}
            />
          )}

          {activeTab === "projects" && (
            <AdminProjectsPanel
              email={email}
              password={password}
              projects={projects}
              onProjectsChange={setProjects}
              onError={setError}
              onSuccess={setSuccess}
            />
          )}
        </div>
      </section>
    </>
  );
}
