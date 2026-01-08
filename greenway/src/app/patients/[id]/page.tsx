"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText,
  Pill,
  Activity,
  FlaskConical,
  Stethoscope,
  ClipboardList,
  Plus,
  Edit,
  Printer,
  ChevronLeft,
  Heart,
  Thermometer,
  Scale,
  Ruler,
  Clock,
  CheckCircle,
  XCircle,
  FileEdit,
  PenLine,
  Upload,
} from "lucide-react";
import Link from "next/link";

// Mock patient data
const patientData: Record<string, any> = {
  "MRN-4521": {
    id: "MRN-4521",
    name: "John Smith",
    dob: "03/15/1978",
    age: 47,
    gender: "Male",
    ssn: "***-**-1234",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main St, Springfield, IL 62701",
    emergencyContact: "Jane Smith (Wife) - (555) 123-4568",
    insurance: "Blue Cross PPO",
    insuranceId: "BCB123456789",
    pcp: "Dr. Sarah Smith",
    allergies: ["Penicillin", "Sulfa drugs"],
    conditions: ["Type 2 Diabetes", "Hypertension", "Hyperlipidemia"],
    vitals: [
      { date: "01/07/2026", bp: "138/88", hr: 78, temp: "98.6°F", weight: "185 lbs", height: "5'10\"", bmi: 26.5, o2: "98%" },
      { date: "12/15/2025", bp: "142/90", hr: 82, temp: "98.4°F", weight: "187 lbs", height: "5'10\"", bmi: 26.8, o2: "97%" },
      { date: "11/20/2025", bp: "140/86", hr: 76, temp: "98.6°F", weight: "186 lbs", height: "5'10\"", bmi: 26.7, o2: "98%" },
    ],
    medications: [
      { name: "Metformin", dose: "500mg", frequency: "Twice daily", prescriber: "Dr. Smith", startDate: "06/15/2023", status: "Active" },
      { name: "Lisinopril", dose: "10mg", frequency: "Once daily", prescriber: "Dr. Smith", startDate: "03/20/2022", status: "Active" },
      { name: "Atorvastatin", dose: "20mg", frequency: "Once daily at bedtime", prescriber: "Dr. Smith", startDate: "03/20/2022", status: "Active" },
      { name: "Aspirin", dose: "81mg", frequency: "Once daily", prescriber: "Dr. Smith", startDate: "03/20/2022", status: "Active" },
    ],
    labs: [
      { date: "01/05/2026", test: "HbA1c", result: "7.2%", range: "4.0-5.6%", status: "High" },
      { date: "01/05/2026", test: "Fasting Glucose", result: "142 mg/dL", range: "70-100 mg/dL", status: "High" },
      { date: "01/05/2026", test: "Total Cholesterol", result: "198 mg/dL", range: "<200 mg/dL", status: "Normal" },
      { date: "01/05/2026", test: "LDL", result: "118 mg/dL", range: "<100 mg/dL", status: "High" },
      { date: "01/05/2026", test: "HDL", result: "45 mg/dL", range: ">40 mg/dL", status: "Normal" },
      { date: "01/05/2026", test: "Creatinine", result: "1.0 mg/dL", range: "0.7-1.3 mg/dL", status: "Normal" },
    ],
    notes: [
      { id: "N001", date: "01/07/2026", type: "Progress Note", provider: "Dr. Smith", summary: "Follow-up for diabetes management. Patient reports good compliance with medications. Discussed diet modifications.", status: "Pending Sign-off" },
      { id: "N002", date: "12/15/2025", type: "Office Visit", provider: "Dr. Smith", summary: "Annual physical exam. Ordered routine labs. Flu vaccine administered.", status: "Signed" },
      { id: "N003", date: "11/20/2025", type: "Phone Note", provider: "Nurse Johnson", summary: "Patient called regarding medication refill. Authorized 90-day supply of Metformin.", status: "Signed" },
    ],
    appointments: [
      { date: "01/07/2026", time: "9:00 AM", type: "Follow-up", provider: "Dr. Smith", status: "Checked In" },
      { date: "04/07/2026", time: "10:30 AM", type: "Follow-up", provider: "Dr. Smith", status: "Scheduled" },
    ],
  },
  "MRN-3892": {
    id: "MRN-3892",
    name: "Mary Johnson",
    dob: "07/22/1985",
    age: 40,
    gender: "Female",
    ssn: "***-**-5678",
    phone: "(555) 234-5678",
    email: "mary.j@email.com",
    address: "456 Oak Ave, Springfield, IL 62702",
    emergencyContact: "Robert Johnson (Husband) - (555) 234-5679",
    insurance: "Aetna HMO",
    insuranceId: "AET987654321",
    pcp: "Dr. Sarah Smith",
    allergies: [],
    conditions: ["Anxiety", "Migraine"],
    vitals: [
      { date: "12/28/2025", bp: "118/76", hr: 72, temp: "98.4°F", weight: "145 lbs", height: "5'6\"", bmi: 23.4, o2: "99%" },
    ],
    medications: [
      { name: "Sertraline", dose: "50mg", frequency: "Once daily", prescriber: "Dr. Smith", startDate: "09/10/2024", status: "Active" },
      { name: "Sumatriptan", dose: "50mg", frequency: "As needed for migraine", prescriber: "Dr. Smith", startDate: "06/15/2024", status: "Active" },
    ],
    labs: [
      { date: "12/28/2025", test: "CBC", result: "Normal", range: "-", status: "Normal" },
      { date: "12/28/2025", test: "TSH", result: "2.1 mIU/L", range: "0.4-4.0 mIU/L", status: "Normal" },
    ],
    notes: [
      { id: "N004", date: "12/28/2025", type: "New Patient", provider: "Dr. Smith", summary: "New patient visit. Established care, reviewed history. Patient reports well-controlled anxiety on current medication.", status: "Pending Sign-off" },
    ],
    appointments: [],
  },
};

const tabs = [
  { id: "summary", label: "Summary", icon: User },
  { id: "vitals", label: "Vitals", icon: Activity },
  { id: "medications", label: "Medications", icon: Pill },
  { id: "labs", label: "Lab Results", icon: FlaskConical },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "orders", label: "Orders", icon: ClipboardList },
];

export default function PatientChart() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  const patient = patientData[patientId] || patientData["MRN-4521"];

  const [activeTab, setActiveTab] = useState("summary");

  const openInWord = (noteId: string) => {
    // Get the document URL
    const docUrl = `${window.location.origin}/api/document/${patientId}/${noteId}`;

    // Try to open in Microsoft Word using the ms-word: protocol
    // This will launch the real Word application
    const msWordUrl = `ms-word:ofe|u|${docUrl}`;

    // Create a hidden link and click it to trigger the protocol
    const link = document.createElement("a");
    link.href = msWordUrl;
    link.click();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      Normal: "bg-green-100 text-green-800",
      High: "bg-red-100 text-red-800",
      Low: "bg-amber-100 text-amber-800",
      Active: "bg-green-100 text-green-800",
      Discontinued: "bg-gray-100 text-gray-800",
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>{status}</span>;
  };

  const NoteStatusBadge = ({ status }: { status: string }) => {
    const configs: Record<string, { bg: string; text: string }> = {
      "Pending Sign-off": { bg: "bg-amber-100", text: "text-amber-800" },
      "Signed": { bg: "bg-green-100", text: "text-green-800" },
      "Draft": { bg: "bg-gray-100", text: "text-gray-800" },
    };
    const config = configs[status] || configs["Draft"];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
        {status === "Pending Sign-off" && <Clock size={12} />}
        {status === "Signed" && <CheckCircle size={12} />}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft size={20} className="text-gray-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-800">{patient.name}</h1>
            {patient.allergies.length > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                <AlertTriangle size={12} />
                Allergies
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {patient.id} | DOB: {patient.dob} ({patient.age}y, {patient.gender}) | PCP: {patient.pcp}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => openInWord(patient.notes[0]?.id || "N001")}
            className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <FileEdit size={14} />
            Open in Word
          </button>
          <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
            <Plus size={14} />
            New Note
          </button>
          <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
            <Edit size={14} />
            Edit
          </button>
          <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>

      {/* Alerts Bar */}
      {patient.allergies.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-500" />
          <div>
            <span className="font-medium text-red-800">Allergies: </span>
            <span className="text-red-700">{patient.allergies.join(", ")}</span>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Left Sidebar - Patient Info */}
        <div className="w-64 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={32} className="text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{patient.name}</p>
                <p className="text-xs text-gray-500">{patient.gender}, {patient.age} years</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={14} className="text-gray-400 mt-0.5" />
                <span className="text-gray-700">{patient.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-gray-400 mt-0.5" />
                <span className="text-gray-700 break-all">{patient.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gray-400 mt-0.5" />
                <span className="text-gray-700">{patient.address}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Insurance</h3>
            <p className="text-sm text-gray-700">{patient.insurance}</p>
            <p className="text-xs text-gray-500">ID: {patient.insuranceId}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Conditions</h3>
            <div className="space-y-1">
              {patient.conditions.map((condition: string, i: number) => (
                <div key={i} className="text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {condition}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Upcoming</h3>
            {patient.appointments.filter((a: any) => a.status === "Scheduled").map((apt: any, i: number) => (
              <div key={i} className="text-sm">
                <p className="text-gray-700 font-medium">{apt.date}</p>
                <p className="text-gray-500">{apt.time} - {apt.type}</p>
              </div>
            ))}
            {patient.appointments.filter((a: any) => a.status === "Scheduled").length === 0 && (
              <p className="text-sm text-gray-500">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary -mb-px bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {/* Summary Tab */}
              {activeTab === "summary" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Latest Vitals</h3>
                      {patient.vitals[0] && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs">Blood Pressure</p>
                            <p className="font-medium">{patient.vitals[0].bp}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs">Heart Rate</p>
                            <p className="font-medium">{patient.vitals[0].hr} bpm</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs">Temperature</p>
                            <p className="font-medium">{patient.vitals[0].temp}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs">O2 Sat</p>
                            <p className="font-medium">{patient.vitals[0].o2}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Active Medications</h3>
                      <div className="space-y-1">
                        {patient.medications.filter((m: any) => m.status === "Active").slice(0, 4).map((med: any, i: number) => (
                          <div key={i} className="text-sm flex justify-between">
                            <span className="text-gray-700">{med.name} {med.dose}</span>
                            <span className="text-gray-500">{med.frequency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Recent Labs</h3>
                      <div className="space-y-1">
                        {patient.labs.slice(0, 4).map((lab: any, i: number) => (
                          <div key={i} className="text-sm flex justify-between items-center">
                            <span className="text-gray-700">{lab.test}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">{lab.result}</span>
                              <StatusBadge status={lab.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Latest Note</h3>
                      {patient.notes[0] && (
                        <div className="bg-gray-50 p-3 rounded text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{patient.notes[0].type}</span>
                            <span className="text-gray-500">{patient.notes[0].date}</span>
                          </div>
                          <p className="text-gray-600">{patient.notes[0].summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Vitals Tab */}
              {activeTab === "vitals" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Vital Signs History</h3>
                    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
                      <Plus size={14} />
                      Record Vitals
                    </button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">BP</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">HR</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Temp</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Weight</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">BMI</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">O2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.vitals.map((v: any, i: number) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-700">{v.date}</td>
                          <td className="px-3 py-2 text-gray-700">{v.bp}</td>
                          <td className="px-3 py-2 text-gray-700">{v.hr} bpm</td>
                          <td className="px-3 py-2 text-gray-700">{v.temp}</td>
                          <td className="px-3 py-2 text-gray-700">{v.weight}</td>
                          <td className="px-3 py-2 text-gray-700">{v.bmi}</td>
                          <td className="px-3 py-2 text-gray-700">{v.o2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Medications Tab */}
              {activeTab === "medications" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Medication List</h3>
                    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
                      <Plus size={14} />
                      e-Prescribe
                    </button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Medication</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Dose</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Frequency</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Prescriber</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Start Date</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.medications.map((m: any, i: number) => (
                        <tr key={i} className="border-b hover:bg-gray-50 cursor-pointer">
                          <td className="px-3 py-2 text-gray-700 font-medium">{m.name}</td>
                          <td className="px-3 py-2 text-gray-700">{m.dose}</td>
                          <td className="px-3 py-2 text-gray-700">{m.frequency}</td>
                          <td className="px-3 py-2 text-gray-700">{m.prescriber}</td>
                          <td className="px-3 py-2 text-gray-700">{m.startDate}</td>
                          <td className="px-3 py-2"><StatusBadge status={m.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Labs Tab */}
              {activeTab === "labs" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Laboratory Results</h3>
                    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
                      <Plus size={14} />
                      Order Labs
                    </button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Test</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Result</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Reference Range</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.labs.map((l: any, i: number) => (
                        <tr key={i} className="border-b hover:bg-gray-50 cursor-pointer">
                          <td className="px-3 py-2 text-gray-700">{l.date}</td>
                          <td className="px-3 py-2 text-gray-700 font-medium">{l.test}</td>
                          <td className="px-3 py-2 text-gray-700">{l.result}</td>
                          <td className="px-3 py-2 text-gray-500">{l.range}</td>
                          <td className="px-3 py-2"><StatusBadge status={l.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Notes Tab - MIRA WORKFLOW */}
              {activeTab === "notes" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Clinical Notes</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openInWord(patient.notes[0]?.id || "N001")}
                        className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <FileEdit size={14} />
                        Open in Word
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
                        <Plus size={14} />
                        New Note
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {patient.notes.map((n: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-800">{n.type}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-600">{n.provider}</span>
                            <NoteStatusBadge status={n.status} />
                          </div>
                          <span className="text-sm text-gray-500">{n.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{n.summary}</p>
                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => openInWord(n.id)}
                            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                          >
                            <FileEdit size={12} />
                            Edit in Word
                          </button>
                          {n.status === "Pending Sign-off" && (
                            <button className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex items-center gap-1">
                              <PenLine size={12} />
                              Sign Note
                            </button>
                          )}
                          <button
                            onClick={() => openInWord(n.id)}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                          >
                            <Upload size={12} />
                            Upload to EMR
                          </button>
                          <button className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1">
                            <Printer size={12} />
                            Print
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Orders</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
                        <Plus size={14} />
                        Lab Order
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                        <Plus size={14} />
                        Imaging
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                        <Plus size={14} />
                        Referral
                      </button>
                    </div>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    <ClipboardList size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>No pending orders</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
