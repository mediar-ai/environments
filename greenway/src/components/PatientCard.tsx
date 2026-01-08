"use client";

import { UserCircle, Phone, Mail, AlertTriangle, Calendar } from "lucide-react";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    dob: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    lastVisit: string;
    nextAppointment?: string;
    alerts?: string[];
    insurance: string;
    mrn: string;
  };
}

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-start gap-3">
          <UserCircle size={40} className="text-gray-400" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{patient.name}</h3>
            <p className="text-xs text-gray-500">
              MRN: {patient.mrn} | DOB: {patient.dob} ({patient.age}y,{" "}
              {patient.gender})
            </p>
          </div>
          {patient.alerts && patient.alerts.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
              <AlertTriangle size={12} />
              {patient.alerts.length} Alert{patient.alerts.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Phone</p>
            <p className="text-gray-700 flex items-center gap-1">
              <Phone size={12} />
              {patient.phone}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Email</p>
            <p className="text-gray-700 flex items-center gap-1 truncate">
              <Mail size={12} />
              {patient.email}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Insurance</p>
            <p className="text-gray-700">{patient.insurance}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Last Visit</p>
            <p className="text-gray-700">{patient.lastVisit}</p>
          </div>
        </div>

        {patient.nextAppointment && (
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded text-sm">
            <Calendar size={14} className="text-primary" />
            <span className="text-gray-700">
              Next: <strong>{patient.nextAppointment}</strong>
            </span>
          </div>
        )}

        {patient.alerts && patient.alerts.length > 0 && (
          <div className="space-y-1">
            {patient.alerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-amber-50 rounded text-xs text-amber-800"
              >
                <AlertTriangle size={12} />
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
        <button className="flex-1 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors">
          Open Chart
        </button>
        <button className="flex-1 px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          Schedule
        </button>
      </div>
    </div>
  );
}
