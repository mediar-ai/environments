"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import AppointmentModal from "@/components/AppointmentModal";

const appointments = [
  { id: 1, time: "8:00 AM", duration: 30, patient: "John Smith", mrn: "MRN-4521", type: "Follow-up", provider: "Dr. Smith", status: "Confirmed", room: "Exam 1" },
  { id: 2, time: "8:30 AM", duration: 15, patient: "Mary Johnson", mrn: "MRN-3892", type: "New Patient", provider: "Dr. Smith", status: "Checked In", room: "Exam 2" },
  { id: 3, time: "9:00 AM", duration: 45, patient: "Robert Davis", mrn: "MRN-2847", type: "Annual Physical", provider: "Dr. Smith", status: "In Room", room: "Exam 1" },
  { id: 4, time: "10:00 AM", duration: 15, patient: "Sarah Wilson", mrn: "MRN-9182", type: "Sick Visit", provider: "Dr. Smith", status: "Confirmed", room: "" },
  { id: 5, time: "10:30 AM", duration: 15, patient: "Michael Brown", mrn: "MRN-7621", type: "Follow-up", provider: "Dr. Smith", status: "Confirmed", room: "" },
  { id: 6, time: "11:00 AM", duration: 30, patient: "Emily Chen", mrn: "MRN-5432", type: "Procedure", provider: "Dr. Smith", status: "Confirmed", room: "" },
  { id: 7, time: "1:00 PM", duration: 15, patient: "David Lee", mrn: "MRN-8765", type: "Follow-up", provider: "Dr. Smith", status: "Confirmed", room: "" },
  { id: 8, time: "1:30 PM", duration: 15, patient: "Lisa Garcia", mrn: "MRN-3456", type: "Telehealth", provider: "Dr. Smith", status: "Confirmed", room: "" },
  { id: 9, time: "2:00 PM", duration: 30, patient: "James Taylor", mrn: "MRN-6789", type: "New Patient", provider: "Dr. Smith", status: "Cancelled", room: "" },
  { id: 10, time: "3:00 PM", duration: 15, patient: "Amanda White", mrn: "MRN-2345", type: "Follow-up", provider: "Dr. Smith", status: "Confirmed", room: "" },
];

const providers = [
  { id: "dr-smith", name: "Dr. Sarah Smith", color: "bg-blue-500" },
  { id: "dr-jones", name: "Dr. Michael Jones", color: "bg-green-500" },
  { id: "dr-wilson", name: "Dr. Emily Wilson", color: "bg-purple-500" },
];

const statusColors: Record<string, { bg: string; text: string; icon: any }> = {
  Confirmed: { bg: "bg-blue-100", text: "text-blue-700", icon: Calendar },
  "Checked In": { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  "In Room": { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  Completed: { bg: "bg-gray-100", text: "text-gray-700", icon: CheckCircle },
  Cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
  "No Show": { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle },
};

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("dr-smith");
  const [view, setView] = useState<"day" | "week">("day");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const getStatusBadge = (status: string) => {
    const config = statusColors[status] || statusColors.Confirmed;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Schedule</h1>
          <p className="text-sm text-gray-500">Manage appointments and patient visits</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {formatDate(selectedDate)}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Provider Filter */}
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1.5 text-sm font-medium ${
                  view === "day"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 text-sm font-medium ${
                  view === "week"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Summary Stats */}
        <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
          <div className="px-4 py-3 border-r border-gray-200">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-semibold text-gray-800">{appointments.length}</p>
          </div>
          <div className="px-4 py-3 border-r border-gray-200">
            <p className="text-xs text-gray-500">Confirmed</p>
            <p className="text-lg font-semibold text-blue-600">
              {appointments.filter((a) => a.status === "Confirmed").length}
            </p>
          </div>
          <div className="px-4 py-3 border-r border-gray-200">
            <p className="text-xs text-gray-500">Checked In</p>
            <p className="text-lg font-semibold text-amber-600">
              {appointments.filter((a) => a.status === "Checked In").length}
            </p>
          </div>
          <div className="px-4 py-3 border-r border-gray-200">
            <p className="text-xs text-gray-500">In Room</p>
            <p className="text-lg font-semibold text-green-600">
              {appointments.filter((a) => a.status === "In Room").length}
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs text-gray-500">Cancelled</p>
            <p className="text-lg font-semibold text-red-600">
              {appointments.filter((a) => a.status === "Cancelled").length}
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="divide-y divide-gray-100">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                apt.status === "Cancelled" ? "opacity-50" : ""
              }`}
            >
              {/* Time */}
              <div className="w-24 flex-shrink-0">
                <p className="font-medium text-gray-800">{apt.time}</p>
                <p className="text-xs text-gray-500">{apt.duration} min</p>
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/patients/${apt.mrn}`}
                    className="font-medium text-gray-800 hover:text-primary"
                  >
                    {apt.patient}
                  </Link>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{apt.mrn}</span>
                </div>
                <p className="text-sm text-gray-500">{apt.type}</p>
              </div>

              {/* Room */}
              <div className="w-24 text-center">
                {apt.room ? (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                    {apt.room}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </div>

              {/* Status */}
              <div className="w-32 text-center">{getStatusBadge(apt.status)}</div>

              {/* Actions */}
              <div className="w-32 flex items-center justify-end gap-2">
                {apt.status !== "Cancelled" && apt.status !== "Completed" && (
                  <>
                    {apt.status === "Confirmed" && (
                      <button className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors">
                        Check In
                      </button>
                    )}
                    {apt.status === "Checked In" && (
                      <button className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                        Room
                      </button>
                    )}
                    {apt.status === "In Room" && (
                      <button className="px-2 py-1 text-xs font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                        Chart
                      </button>
                    )}
                  </>
                )}
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(apt) => console.log("Saved:", apt)}
      />
    </div>
  );
}
