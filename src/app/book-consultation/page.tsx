"use client";

import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faClock, faVideo, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
const days = ["Mon Jul 14", "Tue Jul 15", "Wed Jul 16", "Thu Jul 17", "Fri Jul 18"];

export default function BookConsultationPage() {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <>
      <PageHero
        badge="Book Consultation"
        title="Schedule Your"
        highlight="Free Consultation"
        subtitle="30-minute video call with a Lumiora expert to discuss your project, goals, and how we can help."
        breadcrumbs={[{ label: "Book Consultation" }]}
        gradient="from-brand-700 via-brand-700 to-brand-600"
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info row */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: faClock, label: "Duration", value: "30 minutes" },
              { icon: faVideo, label: "Format", value: "Google Meet / Zoom" },
              { icon: faCheckCircle, label: "Cost", value: "100% Free" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={icon} className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-semibold text-white text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {booked ? (
            <GlassCard hover={false} className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCalendarCheck} className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Consultation Booked!</h2>
              <p className="text-gray-500 mb-1">
                {selectedDay} at {selectedTime}
              </p>
              <p className="text-gray-400 text-sm">Check your email for the meeting link.</p>
            </GlassCard>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <GlassCard hover={false}>
                <h3 className="font-black text-slate-900 mb-5">Pick a Day</h3>
                <div className="space-y-2 mb-6">
                  {days.map((day) => (
                    <button key={day} onClick={() => setSelectedDay(day)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${selectedDay === day ? "bg-brand-700 text-white border-indigo-600 shadow-md" : "border-brand-200 text-gray-600 hover:border-brand-400"}`}>
                      {day}
                    </button>
                  ))}
                </div>
                <h3 className="font-black text-slate-900 mb-3">Pick a Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${selectedTime === t ? "bg-brand-700 text-white border-indigo-600 shadow-md" : "border-brand-200 text-gray-600 hover:border-brand-400"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Form */}
              <GlassCard hover={false}>
                <h3 className="font-black text-slate-900 mb-5">Your Details</h3>
                <form onSubmit={handleBook} className="space-y-4">
                  {[
                    { label: "Full Name", type: "text", placeholder: "Alex Morgan" },
                    { label: "Work Email", type: "email", placeholder: "alex@company.com" },
                    { label: "Company", type: "text", placeholder: "Company Inc." },
                  ].map(({ label, type, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                      <input required type={type} className="w-full px-4 py-2.5 rounded-xl border border-brand-200 bg-white/60 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all" placeholder={placeholder} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">What would you like to discuss?</label>
                    <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-200 bg-white/60 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all resize-none" placeholder="Project overview, challenges, goals..." />
                  </div>
                  <button type="submit" disabled={!selectedDay || !selectedTime}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 hover:-translate-y-0.5 transition-all">
                    <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                    Confirm Booking
                  </button>
                </form>
              </GlassCard>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
