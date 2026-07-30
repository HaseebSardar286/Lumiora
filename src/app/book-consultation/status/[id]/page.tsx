"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faVideo,
  faEnvelope,
  faBuilding,
  faUser,
  faCheckCircle,
  faTimesCircle,
  faArrowLeft,
  faCalendarDay,
  faSpinner,
  faCheck,
  faTimes,
  faExternalLinkAlt
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
}

export default function BookingStatusPage({
  params
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const [id, setId] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responding, setResponding] = useState(false);

  // Safely resolve the Next.js async dynamic parameters
  useEffect(() => {
    if ("then" in params) {
      params.then((p) => setId(p.id));
    } else {
      setId((params as any).id);
    }
  }, [params]);

  const fetchBooking = () => {
    if (!id) return;
    setLoading(true);
    setError("");
    fetch(`/api/bookings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Booking not found");
        return res.json();
      })
      .then((data) => {
        setBooking(data.booking);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not retrieve booking details. Please verify the ID.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  const handleRespond = async (action: "accept" | "decline") => {
    if (!id) return;
    setResponding(true);
    setError("");

    try {
      const res = await fetch(`/api/bookings/${id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update your response.");
      }

      setBooking(data.booking);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setResponding(false);
    }
  };

  const getStatusDisplay = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-800",
          dot: "bg-amber-500",
          title: "Pending Approval",
          desc: "Your consultation request has been received and is waiting for our team to review. We'll update you via email soon."
        };
      case "Approved":
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          dot: "bg-emerald-500",
          title: "Approved & Confirmed",
          desc: "Success! Your consultation has been approved and confirmed. Meeting details are listed below."
        };
      case "Rejected":
        return {
          bg: "bg-rose-50 border-rose-200 text-rose-800",
          dot: "bg-rose-500",
          title: "Declined",
          desc: "Unfortunately, our team is unavailable for the requested time. Please try booking a different time slot."
        };
      case "Rescheduled":
        return {
          bg: "bg-blue-50 border-blue-200 text-blue-800",
          dot: "bg-blue-500",
          title: "Rescheduling Proposed",
          desc: "Our team has proposed a new date and time for our call. Please review and respond below."
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200 text-gray-800",
          dot: "bg-gray-500",
          title: "Unknown Status",
          desc: "Status is being verified."
        };
    }
  };

  // Helper to format date string nicely
  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <PageHero
        badge="Booking Status"
        title="Consultation Request"
        highlight="Status"
        subtitle={`Track the progress of your scheduled consultation request. Booking ID: ${id || "..."}`}
        breadcrumbs={[
          { label: "Book Consultation", href: "/book-consultation" },
          { label: "Booking Status" }
        ]}
      />

      <section className="py-20 bg-slate-50/50">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-700 font-semibold mb-8 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
            Back to Booking
          </Link>

          {loading ? (
            <GlassCard hover={false} className="py-24 text-center">
              <FontAwesomeIcon icon={faSpinner} className="w-10 h-10 animate-spin text-brand-700 mb-4" />
              <p className="text-gray-500 font-medium">Retrieving booking status...</p>
            </GlassCard>
          ) : error || !booking ? (
            <GlassCard hover={false} className="border-rose-200 py-16 text-center">
              <FontAwesomeIcon icon={faTimesCircle} className="w-12 h-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Could Not Load Booking</h3>
              <p className="text-gray-500 mb-6">{error || "The requested booking does not exist."}</p>
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-brand-700 text-white font-bold rounded-xl hover:bg-brand-800 transition-colors"
              >
                Book New Consultation
              </Link>
            </GlassCard>
          ) : (
            <div className="space-y-6">
              {/* Status Banner */}
              {(() => {
                const statusDetails = getStatusDisplay(booking.status);
                return (
                  <div
                    className={`flex items-start gap-4 p-6 rounded-3xl border ${statusDetails.bg} shadow-sm animate-fade-in`}
                  >
                    <div className="flex items-center justify-center pt-1">
                      <span className={`w-3.5 h-3.5 rounded-full ${statusDetails.dot} flex shrink-0 animate-pulse`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-1">{statusDetails.title}</h4>
                      <p className="text-sm font-medium leading-relaxed">{statusDetails.desc}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Booking Details Card */}
              <GlassCard hover={false} className="p-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
                  <h3 className="text-lg font-black text-slate-900">Meeting Details</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {booking.id}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mt-0.5">
                        <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Contact</p>
                        <p className="text-sm font-bold text-slate-800">{booking.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{booking.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mt-0.5">
                        <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Company</p>
                        <p className="text-sm font-bold text-slate-800">{booking.company || "Not Specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mt-0.5">
                        <FontAwesomeIcon icon={faCalendarDay} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Scheduled Date</p>
                        <p className="text-sm font-bold text-slate-800">{formatDate(booking.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mt-0.5">
                        <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Scheduled Time</p>
                        <p className="text-sm font-bold text-slate-800">{booking.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5">Discuss Topics</p>
                    <p className="text-sm text-slate-700 italic leading-relaxed">"{booking.notes}"</p>
                  </div>
                )}

                {/* Approved meeting link CTA */}
                {booking.status === "Approved" && booking.meetingLink && (
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-bold rounded-2xl shadow-sm hover:bg-brand-800 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faVideo} className="w-4 h-4" />
                      Join Consultation Call
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                )}
              </GlassCard>

              {/* Rescheduling proposal handler card */}
              {booking.status === "Rescheduled" && (
                <GlassCard hover={false} className="border-brand-200 p-8 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDay} className="text-brand-600 w-4 h-4" />
                    Review Proposed Reschedule Slot
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Our team suggested a new date and time because your selected slot was unavailable. Let us know if this slot works:
                  </p>

                  <div className="grid grid-cols-2 gap-4 bg-brand-50/50 border border-brand-100 rounded-2xl p-5 mb-8">
                    <div>
                      <p className="text-xs text-brand-600 font-bold uppercase tracking-wider">Proposed Date</p>
                      <p className="text-base font-bold text-brand-950 mt-1">
                        {booking.rescheduledDate ? formatDate(booking.rescheduledDate) : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-600 font-bold uppercase tracking-wider">Proposed Time</p>
                      <p className="text-base font-bold text-brand-950 mt-1">{booking.rescheduledTime}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleRespond("accept")}
                      disabled={responding}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {responding ? (
                        <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                      ) : (
                        <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                      )}
                      Accept Proposed Slot
                    </button>
                    <button
                      onClick={() => handleRespond("decline")}
                      disabled={responding}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-rose-200 text-rose-600 bg-white font-bold rounded-xl hover:bg-rose-50 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {responding ? (
                        <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                      )}
                      Decline & Rebook
                    </button>
                  </div>
                </GlassCard>
              )}

              {/* Action buttons for rejected */}
              {booking.status === "Rejected" && (
                <div className="text-center mt-6">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-bold rounded-2xl shadow-sm hover:bg-brand-800 transition-all cursor-pointer"
                  >
                    Select Another Time Slot
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
