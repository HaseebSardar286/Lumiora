"use client";

import React, { useState, useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProjectsPanel from "@/components/admin/AdminProjectsPanel";
import type { Project } from "@/data/projects";
import {
  faCalendarCheck,
  faClock,
  faVideo,
  faEnvelope,
  faBuilding,
  faUser,
  faCheck,
  faTimes,
  faCalendarDay,
  faLock,
  faSpinner,
  faTrashAlt,
  faPlus,
  faBan,
  faArrowRight,
  faCommentAlt,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

interface Booking {
  id: string;
  name: string;
  email: string;
  company: string;
  notes: string;
  date: string;
  time: string;
  status: "Pending" | "Approved" | "Rejected" | "Rescheduled";
  meetingLink?: string;
  rescheduledDate?: string;
  rescheduledTime?: string;
  createdAt: string;
}

interface AdminConfig {
  slots: string[];
  blockedDates: string[];
}

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  services: string[];
  budget: string;
  notes: string;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType?: string;
  budget?: string;
  notes: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<AdminConfig>({ slots: [], blockedDates: [] });
  
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [activeTab, setActiveTab] = useState<
    "bookings" | "quotes" | "contacts" | "projects" | "availability"
  >("bookings");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Booking action states
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [meetingLinkInput, setMeetingLinkInput] = useState("");
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [reschedDate, setReschedDate] = useState("");
  const [reschedTime, setReschedTime] = useState("");

  // Config editing states
  const [newSlotInput, setNewSlotInput] = useState("");
  const [newBlockedDateInput, setNewBlockedDateInput] = useState("");

  const [minDate, setMinDate] = useState("");

  // Check sessionStorage for credentials on mount and set minDate boundary
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);

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

      // Test credentials by trying to fetch config
      const configRes = await fetch(`/api/admin/config?email=${encodedEmail}&password=${encodedPass}`);
      
      if (!configRes.ok) {
        throw new Error("Invalid admin credentials");
      }
      
      const configData = await configRes.json();
      setConfig(configData.config);
      
      // If config succeeds, login is valid. Fetch bookings.
      const bookingsRes = await fetch(`/api/bookings?email=${encodedEmail}&password=${encodedPass}`);
      const bookingsData = await bookingsRes.json();
      setBookings(bookingsData.bookings || []);

      // Fetch quote requests
      const quotesRes = await fetch(`/api/quotes?email=${encodedEmail}&password=${encodedPass}`);
      const quotesData = await quotesRes.json();
      setQuotes(quotesData.quotes || []);

      // Fetch contact messages
      const contactsRes = await fetch(`/api/contact?email=${encodedEmail}&password=${encodedPass}`);
      const contactsData = await contactsRes.json();
      setContacts(contactsData.contacts || []);

      const projectsRes = await fetch("/api/projects");
      const projectsData = await projectsRes.json();
      setProjects(projectsData.projects || []);

      setIsAuthenticated(true);
      sessionStorage.setItem("8bitfield_admin_email", emailVal);
      sessionStorage.setItem("8bitfield_admin_password", passwordVal);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || "Failed to authenticate.");
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
    setBookings([]);
    setQuotes([]);
    setContacts([]);
    setProjects([]);
  };

  const handleApprove = async (id: string) => {
    setError("");
    setSuccess("");
    
    const link = meetingLinkInput.trim() || `https://meet.google.com/lum-${id.toLowerCase()}`;
    
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          meetingLink: link,
          email,
          password
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve booking.");
      
      // Update local state
      setBookings((prev) => prev.map((b) => (b.id === id ? data.booking : b)));
      setSuccess(`Booking ${id} approved successfully! Notification email sent.`);
      setApprovingId(null);
      setMeetingLinkInput("");
    } catch (err: any) {
      setError(err.message || "Failed to approve.");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this request? An email notification will be sent to the user.")) return;
    
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          email,
          password
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reject booking.");
      
      setBookings((prev) => prev.map((b) => (b.id === id ? data.booking : b)));
      setSuccess(`Booking ${id} rejected. Notification email sent.`);
    } catch (err: any) {
      setError(err.message || "Failed to reject.");
    }
  };

  const handleReschedule = async (id: string) => {
    if (!reschedDate || !reschedTime) {
      setError("Please select a date and time to propose.");
      return;
    }
    
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reschedule",
          rescheduledDate: reschedDate,
          rescheduledTime: reschedTime,
          email,
          password
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reschedule booking.");
      
      setBookings((prev) => prev.map((b) => (b.id === id ? data.booking : b)));
      setSuccess(`Reschedule proposal sent to client for booking ${id}.`);
      setReschedulingId(null);
      setReschedDate("");
      setReschedTime("");
    } catch (err: any) {
      setError(err.message || "Failed to reschedule.");
    }
  };

  // Availability Management
  const handleSaveConfig = async (newSlots: string[], newBlocked: string[]) => {
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slots: newSlots,
          blockedDates: newBlocked,
          email,
          password
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save configuration.");
      
      setConfig(data.config);
      setSuccess("Configuration updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save config.");
    }
  };

  const handleAddSlot = () => {
    if (!newSlotInput.trim()) return;
    const formatted = newSlotInput.trim();
    if (config.slots.includes(formatted)) {
      setError("Slot already exists");
      return;
    }
    const updated = [...config.slots, formatted].sort();
    handleSaveConfig(updated, config.blockedDates);
    setNewSlotInput("");
  };

  const handleRemoveSlot = (slot: string) => {
    const updated = config.slots.filter((s) => s !== slot);
    handleSaveConfig(updated, config.blockedDates);
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDateInput) return;
    if (config.blockedDates.includes(newBlockedDateInput)) {
      setError("Date is already blocked");
      return;
    }
    const updated = [...config.blockedDates, newBlockedDateInput].sort();
    handleSaveConfig(config.slots, updated);
    setNewBlockedDateInput("");
  };

  const handleRemoveBlockedDate = (date: string) => {
    const updated = config.blockedDates.filter((d) => d !== date);
    handleSaveConfig(config.slots, updated);
  };

  // Helper to format date strings
  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  // Counter helpers
  const countByStatus = (status: string) => {
    if (status === "All") return bookings.length;
    return bookings.filter((b) => b.status === status).length;
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === "All") return true;
    return b.status === statusFilter;
  });

  // Render Login Panel if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <PageHero
          badge="Admin Access"
          title="Consultations"
          highlight="Admin Panel"
          subtitle="Authentication is required to manage booking schedules and time slot availabilities."
          compact
        />
        <section className="py-24 bg-slate-50/50">
          <div className="w-full max-w-md mx-auto px-4">
            <GlassCard hover={false} className="p-8 text-center">
              <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-700">
                <FontAwesomeIcon icon={faLock} className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Admin Sign In</h3>
              <p className="text-sm text-gray-400 mb-6">
                Enter the administrator credentials to review booking requests and manage schedules.
              </p>

              {authError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold">
                  ⚠️ {authError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-left font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
                  placeholder="admin@8bitfield.com"
                />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-left font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin w-4 h-4" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Unlock Dashboard
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

  return (
    <>
      <PageHero
        badge="Admin Dashboard"
        title="Manage Consultation"
        highlight="Bookings"
        subtitle="Review meeting requests, propose alternative times, block dates, and manage slot availabilities."
        compact
      />

      <section className="py-12 bg-slate-50/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "bookings"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Booking Requests
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "quotes"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Quote Requests
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "contacts"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Contact Messages
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "availability"
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-brand-500"
                }`}
              >
                Manage Availability
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold border border-rose-100 bg-rose-50/50 px-4 py-2 rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>

          {/* Feedback banners */}
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

          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Status Filter Row */}
              <div className="flex flex-wrap gap-2 pb-2">
                {[
                  { label: "All", filter: "All" },
                  { label: "Pending", filter: "Pending" },
                  { label: "Approved", filter: "Approved" },
                  { label: "Rescheduled", filter: "Rescheduled" },
                  { label: "Declined", filter: "Rejected" },
                ].map((item) => (
                  <button
                    key={item.filter}
                    onClick={() => setStatusFilter(item.filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      statusFilter === item.filter
                        ? "bg-brand-700 text-white border-brand-700 shadow-sm"
                        : "bg-white text-slate-600 border-gray-200 hover:border-brand-500"
                    }`}
                  >
                    {item.label} ({countByStatus(item.filter)})
                  </button>
                ))}
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <GlassCard hover={false} className="py-20 text-center border-dashed">
                    <p className="text-gray-400 font-medium">No bookings found for the selected status.</p>
                  </GlassCard>
                ) : (
                  filteredBookings.map((booking) => (
                    <GlassCard
                      key={booking.id}
                      hover={false}
                      className={`p-6 border transition-all ${
                        booking.status === "Pending"
                          ? "border-amber-200"
                          : booking.status === "Approved"
                          ? "border-emerald-200"
                          : booking.status === "Rejected"
                          ? "border-rose-200"
                          : "border-blue-200"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6">
                        {/* Left client details */}
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-black text-slate-800">{booking.name}</span>
                            <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                              {booking.id}
                            </span>
                            {/* Status Badge */}
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                booking.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : booking.status === "Approved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : booking.status === "Rejected"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-3 gap-2.5 text-xs font-semibold text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-gray-400" />
                              <span>{booking.email}</span>
                            </div>
                            {booking.company && (
                              <div className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 text-gray-400" />
                                <span>{booking.company}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faCalendarDay} className="w-3.5 h-3.5 text-gray-400" />
                              <span>
                                {formatDate(booking.date)} @ {booking.time}
                              </span>
                            </div>
                          </div>

                          {booking.notes && (
                            <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 mt-2">
                              <FontAwesomeIcon icon={faCommentAlt} className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                              <span className="italic">"{booking.notes}"</span>
                            </div>
                          )}

                          {/* Meeting details / Proposals */}
                          {booking.status === "Approved" && booking.meetingLink && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl p-3 text-xs font-bold mt-2">
                              <FontAwesomeIcon icon={faVideo} className="w-3.5 h-3.5 text-emerald-600" />
                              <span>
                                Meeting Link:{" "}
                                <a
                                  href={booking.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline text-brand-700"
                                >
                                  {booking.meetingLink}
                                </a>
                              </span>
                            </div>
                          )}

                          {booking.status === "Rescheduled" && booking.rescheduledDate && (
                            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-900 rounded-xl p-3 text-xs font-bold mt-2">
                              <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 text-blue-600" />
                              <span>
                                Suggested Proposal: {formatDate(booking.rescheduledDate)} at{" "}
                                {booking.rescheduledTime}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Right review actions */}
                        <div className="flex flex-wrap lg:flex-col gap-2 justify-end lg:items-end w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                          {booking.status === "Pending" && (
                            <>
                              <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                  onClick={() => {
                                    setApprovingId(booking.id);
                                    setMeetingLinkInput(
                                      `https://meet.google.com/lum-${booking.id.toLowerCase()}`
                                    );
                                    setReschedulingId(null);
                                  }}
                                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
                                >
                                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setReschedulingId(booking.id);
                                    setApprovingId(null);
                                  }}
                                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                                >
                                  <FontAwesomeIcon icon={faCalendarDay} className="w-3 h-3" />
                                  Propose Time
                                </button>
                              </div>
                              <button
                                onClick={() => handleReject(booking.id)}
                                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs rounded-xl border border-rose-200 transition-colors cursor-pointer"
                              >
                                <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                                Decline Request
                              </button>
                            </>
                          )}

                          {booking.status === "Approved" && (
                            <button
                              onClick={() => handleReject(booking.id)}
                              className="px-4 py-2 text-rose-600 bg-rose-50/50 hover:bg-rose-100 hover:text-rose-700 font-semibold text-xs border border-rose-100 rounded-xl transition-all cursor-pointer"
                            >
                              Cancel Call
                            </button>
                          )}

                          {booking.status === "Rescheduled" && (
                            <div className="text-[10px] font-bold text-gray-400 italic">
                              Awaiting client response to proposal...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Inline Approve Panel */}
                      {approvingId === booking.id && (
                        <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-fade-in">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Enter Meeting Video Call Link (Google Meet, Zoom, etc.)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={meetingLinkInput}
                              onChange={(e) => setMeetingLinkInput(e.target.value)}
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="https://meet.google.com/xyz"
                            />
                            <button
                              onClick={() => handleApprove(booking.id)}
                              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 cursor-pointer"
                            >
                              Confirm Approve
                            </button>
                            <button
                              onClick={() => setApprovingId(null)}
                              className="px-3 py-2 bg-gray-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-gray-300 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Inline Reschedule Panel */}
                      {reschedulingId === booking.id && (
                        <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-fade-in">
                          <p className="text-xs font-bold text-slate-700 mb-3">Propose a New Time Slot</p>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                Date
                              </label>
                              <input
                                required
                                type="date"
                                min={minDate}
                                value={reschedDate}
                                onChange={(e) => setReschedDate(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white text-slate-800 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                Time Slot
                              </label>
                              <select
                                required
                                value={reschedTime}
                                onChange={(e) => setReschedTime(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white text-slate-800 focus:outline-none"
                              >
                                <option value="">Select slot</option>
                                {config.slots.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex items-end gap-2">
                              <button
                                onClick={() => handleReschedule(booking.id)}
                                className="flex-1 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 cursor-pointer"
                              >
                                Send Proposal
                              </button>
                              <button
                                onClick={() => setReschedulingId(null)}
                                className="py-1.5 px-3 bg-gray-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-gray-300 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-gray-150 pb-4 mb-4">
                <h3 className="text-xl font-black text-slate-900">Project Quotes Submitted</h3>
                <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-sm">
                  Total Quotes: {quotes.length}
                </span>
              </div>

              <div className="space-y-4">
                {quotes.length === 0 ? (
                  <GlassCard hover={false} className="py-20 text-center border-dashed">
                    <p className="text-gray-400 font-medium">No quote requests found.</p>
                  </GlassCard>
                ) : (
                  quotes.map((quote) => (
                    <GlassCard key={quote.id} hover={false} className="p-6 border border-brand-100 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-800">{quote.name}</span>
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                              {quote.id}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                            Budget: {quote.budget}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-2.5 text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-gray-400" />
                            <span>{quote.email}</span>
                          </div>
                          {quote.company && (
                            <div className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 text-gray-400" />
                              <span>{quote.company}</span>
                            </div>
                          )}
                          {quote.phone && (
                            <div className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-gray-400" />
                              <span>{quote.phone}</span>
                            </div>
                          )}
                        </div>

                        {/* Services List tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {quote.services.map((svc) => (
                            <span key={svc} className="px-2 py-1 bg-brand-50 border border-brand-100 rounded-md text-[10px] font-bold text-brand-700">
                              {svc}
                            </span>
                          ))}
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed mt-2.5">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Project Description</p>
                          <p className="italic">"{quote.notes}"</p>
                        </div>

                        <div className="text-[9px] text-gray-400 text-right mt-1.5">
                          Submitted on {new Date(quote.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </GlassCard>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-gray-150 pb-4 mb-4">
                <h3 className="text-xl font-black text-slate-900">Project Inquiries</h3>
                <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-sm">
                  Total Messages: {contacts.length}
                </span>
              </div>

              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <GlassCard hover={false} className="py-20 text-center border-dashed">
                    <p className="text-gray-400 font-medium">No contact messages found.</p>
                  </GlassCard>
                ) : (
                  contacts.map((contact) => (
                    <GlassCard key={contact.id} hover={false} className="p-6 border border-brand-100 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-800">{contact.name}</span>
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                              {contact.id}
                            </span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2.5 text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-gray-400" />
                            <span>{contact.email}</span>
                          </div>
                          {contact.company && (
                            <div className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 text-gray-400" />
                              <span>{contact.company}</span>
                            </div>
                          )}
                          {contact.projectType && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-400">Type:</span>
                              <span>{contact.projectType}</span>
                            </div>
                          )}
                          {contact.budget && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-400">Budget:</span>
                              <span>{contact.budget}</span>
                            </div>
                          )}
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed mt-2.5">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Project Description</p>
                          <p className="italic">&quot;{contact.notes}&quot;</p>
                        </div>

                        <div className="text-[9px] text-gray-400 text-right mt-1.5">
                          Submitted on {new Date(contact.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </GlassCard>
                  ))
                )}
              </div>
            </div>
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

          {activeTab === "availability" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Slot Management Card */}
              <GlassCard hover={false} className="p-8">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-brand-700 w-4 h-4" />
                  Configure Time Slots
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Add or remove standard time slots that will be available to choose on business days.
                </p>

                {/* Slots grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {config.slots.map((slot) => (
                    <div
                      key={slot}
                      className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 group"
                    >
                      <span>{slot}</span>
                      <button
                        onClick={() => handleRemoveSlot(slot)}
                        className="text-gray-400 hover:text-rose-600 transition-colors"
                        title={`Remove ${slot}`}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add slot form */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSlotInput}
                    onChange={(e) => setNewSlotInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white text-slate-800 focus:outline-none"
                    placeholder="e.g. 05:00 PM"
                  />
                  <button
                    onClick={handleAddSlot}
                    className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />
                    Add Slot
                  </button>
                </div>
              </GlassCard>

              {/* Blocked Dates Card */}
              <GlassCard hover={false} className="p-8">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBan} className="text-rose-600 w-4 h-4" />
                  Block Full Dates
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Prevent users from booking any consultations on specific holiday, vacation, or unavailable days.
                </p>

                {/* Blocked dates list */}
                <div className="space-y-2 mb-6 max-h-[160px] overflow-y-auto pr-1">
                  {config.blockedDates.length === 0 ? (
                    <p className="text-xs text-gray-400 italic py-2 text-center bg-slate-50/50 border border-dashed border-gray-150 rounded-xl">
                      No blocked dates.
                    </p>
                  ) : (
                    config.blockedDates.map((date) => (
                      <div
                        key={date}
                        className="flex items-center justify-between px-4 py-2 border border-rose-100 rounded-xl bg-rose-50/20 text-xs font-bold text-slate-800"
                      >
                        <span>{formatDate(date)}</span>
                        <button
                          onClick={() => handleRemoveBlockedDate(date)}
                          className="text-gray-400 hover:text-rose-600 transition-colors"
                          title={`Unblock ${date}`}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add blocked date form */}
                <div className="flex gap-2">
                  <input
                    type="date"
                    min={minDate}
                    value={newBlockedDateInput}
                    onChange={(e) => setNewBlockedDateInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white text-slate-800 focus:outline-none"
                  />
                  <button
                    onClick={handleAddBlockedDate}
                    className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />
                    Block Date
                  </button>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
