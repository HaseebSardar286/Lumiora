"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faVideo,
  faCheckCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

export default function BookConsultationPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [weekendWarning, setWeekendWarning] = useState(false);
  
  // Custom calendar month state
  const [viewDate, setViewDate] = useState<Date>(new Date());
  
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    notes: ""
  });

  const [todayDateStr, setTodayDateStr] = useState("");

  // Save current date string for disabling past days
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setTodayDateStr(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Custom calendar helpers
  const getDaysInMonth = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDayIndex = new Date(y, m, 1).getDay(); // Sunday-based index (0-6)
    const totalDays = new Date(y, m + 1, 0).getDate();
    return { firstDayIndex, totalDays };
  };

  const { firstDayIndex, totalDays } = getDaysInMonth(viewDate);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    const now = new Date();
    const prev = new Date(year, month - 1, 1);
    if (
      prev.getFullYear() < now.getFullYear() ||
      (prev.getFullYear() === now.getFullYear() && prev.getMonth() < now.getMonth())
    ) {
      return;
    }
    setViewDate(prev);
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Fetch available slots when a date is selected
  useEffect(() => {
    if (!selectedDate) return;

    setLoadingSlots(true);
    setSlots([]);
    setSelectedTime("");
    setError("");

    fetch(`/api/bookings/available-slots?date=${selectedDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load time slots.");
        return res.json();
      })
      .then((data) => {
        if (data.slots) {
          setSlots(data.slots);
        } else {
          setError(data.error || "Failed to load time slots.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Could not retrieve available time slots. Please try again.");
      })
      .finally(() => {
        setLoadingSlots(false);
      });
  }, [selectedDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "An error occurred while sending your booking request."
        );
      }

      // Redirect to the newly created booking status page
      router.push(`/book-consultation/status/${data.booking.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please check email integration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Book Consultation"
        title="Schedule Your"
        highlight="Free Consultation"
        subtitle="30-minute video call with a Lumiora expert to discuss your project, goals, and how we can help."
        breadcrumbs={[{ label: "Book Consultation" }]}
      />

      <section className="py-20 bg-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info row */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: faClock, label: "Duration", value: "30 minutes" },
              { icon: faVideo, label: "Format", value: "Google Meet / Zoom" },
              { icon: faCheckCircle, label: "Cost", value: "100% Free" }
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center">
                  <FontAwesomeIcon icon={icon} className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-semibold text-slate-900 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form and Calendar Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar & Time Slots */}
            <GlassCard hover={false}>
              <h3 className="font-black text-slate-900 mb-4 text-lg">1. Choose a Date</h3>
              <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 shadow-inner mb-6">
                {/* Calendar Month Traverse Header */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    disabled={year === new Date().getFullYear() && month === new Date().getMonth()}
                    className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-700 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    &lt;
                  </button>
                  <span className="font-bold text-slate-800 text-sm">
                    {monthsList[month]} {year}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-700 transition-colors cursor-pointer"
                  >
                    &gt;
                  </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                  <span>Su</span>
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {daysArray.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} />;
                    }

                    const dateObj = new Date(year, month, day);
                    const localToday = new Date();
                    localToday.setHours(0, 0, 0, 0);
                    const isPast = dateObj < localToday;
                    
                    const dateValue = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isSelected = selectedDate === dateValue;
                    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        disabled={isPast}
                        onClick={() => {
                          setSelectedDate(dateValue);
                          if (isWeekend) {
                            setWeekendWarning(true);
                          } else {
                            setWeekendWarning(false);
                          }
                        }}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-brand-700 text-white shadow-md font-bold scale-[1.08] relative z-10"
                            : isPast
                            ? "text-gray-300 line-through cursor-not-allowed pointer-events-none"
                            : isWeekend
                            ? "text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                            : "text-slate-700 hover:bg-brand-100/50 hover:text-brand-800"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {weekendWarning && (
                <div className="p-3.5 mb-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold leading-relaxed animate-fade-in">
                  ⚠️ Consultations are scheduled Monday to Friday. You can still request this date, but approval is subject to staff availability.
                </div>
              )}

              <h3 className="font-black text-slate-900 mb-3 text-lg">2. Select an Available Time</h3>
              {!selectedDate ? (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-2xl text-xs text-gray-400">
                  Please select a date first to check availability.
                </div>
              ) : loadingSlots ? (
                <div className="text-center py-6 text-xs text-gray-500 flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-brand-600" />
                  Checking availability...
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-6 bg-rose-50/50 border border-rose-100 rounded-2xl text-xs text-rose-600 font-medium">
                  No slots available for this date. Please choose another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                        selectedTime === t
                          ? "bg-brand-700 text-white border-brand-700 shadow-sm scale-[1.03]"
                          : "border-gray-200 text-gray-600 hover:border-brand-500 hover:bg-brand-50/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Details Form */}
            <GlassCard hover={false}>
              <h3 className="font-black text-slate-900 mb-5 text-lg">3. Your Contact Details</h3>
              
              {error && (
                <div className="p-4 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold leading-relaxed animate-fade-in">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                    placeholder="Alex Morgan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Work Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                    placeholder="alex@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                    placeholder="Company Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    What would you like to discuss?
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors resize-none"
                    placeholder="Project overview, challenges, goals..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-700 text-white font-bold rounded-xl shadow-sm disabled:opacity-40 hover:bg-brand-800 transition-all duration-200 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                      Sending Booking Request...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                      Request Consultation Booking
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
