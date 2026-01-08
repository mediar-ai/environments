"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingUp,
  PenLine,
  FileEdit,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import TabPanel from "@/components/TabPanel";
import DataTable from "@/components/DataTable";
import PatientCard from "@/components/PatientCard";

// Sample data
const todayAppointments = [
  {
    id: "1",
    time: "9:00 AM",
    patient: "John Smith",
    mrn: "MRN-4521",
    type: "Follow-up",
    status: "Checked In",
    provider: "Dr. Smith",
  },
  {
    id: "2",
    time: "9:30 AM",
    patient: "Mary Johnson",
    mrn: "MRN-3892",
    type: "New Patient",
    status: "In Room",
    provider: "Dr. Smith",
  },
  {
    id: "3",
    time: "10:00 AM",
    patient: "Robert Davis",
    mrn: "MRN-2847",
    type: "Annual Physical",
    status: "Scheduled",
    provider: "Dr. Smith",
  },
  {
    id: "4",
    time: "10:30 AM",
    patient: "Sarah Wilson",
    mrn: "MRN-9182",
    type: "Sick Visit",
    status: "Scheduled",
    provider: "Dr. Smith",
  },
  {
    id: "5",
    time: "11:00 AM",
    patient: "Michael Brown",
    mrn: "MRN-7621",
    type: "Follow-up",
    status: "Scheduled",
    provider: "Dr. Smith",
  },
];

const pendingTasks = [
  {
    id: "1",
    task: "Review lab results",
    patient: "John Smith",
    priority: "High",
    due: "Today",
  },
  {
    id: "2",
    task: "Sign prescription renewal",
    patient: "Mary Johnson",
    priority: "Medium",
    due: "Today",
  },
  {
    id: "3",
    task: "Complete referral",
    patient: "Robert Davis",
    priority: "Low",
    due: "Tomorrow",
  },
  {
    id: "4",
    task: "Review imaging report",
    patient: "Sarah Wilson",
    priority: "High",
    due: "Today",
  },
];



const notesPendingSignoff = [
  {
    id: "N001",
    patient: "John Smith",
    mrn: "MRN-4521",
    type: "Progress Note",
    provider: "Dr. Smith",
    date: "01/07/2026",
    uploaded: "01/07/2026 10:30 AM",
  },
  {
    id: "N004",
    patient: "Mary Johnson",
    mrn: "MRN-3892",
    type: "New Patient",
    provider: "Dr. Smith",
    date: "12/28/2025",
    uploaded: "12/28/2025 2:15 PM",
  },
  {
    id: "N005",
    patient: "Robert Davis",
    mrn: "MRN-2847",
    type: "Office Visit",
    provider: "Dr. Smith",
    date: "01/06/2026",
    uploaded: "01/06/2026 4:45 PM",
  },
];

const recentPatients = [
  {
    id: "MRN-4521",
    name: "John Smith",
    dob: "03/15/1978",
    age: 47,
    gender: "M",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    lastVisit: "01/05/2026",
    nextAppointment: "01/07/2026 9:00 AM",
    alerts: ["Drug Allergy: Penicillin"],
    insurance: "Blue Cross PPO",
    mrn: "MRN-4521",
  },
  {
    id: "MRN-3892",
    name: "Mary Johnson",
    dob: "07/22/1985",
    age: 40,
    gender: "F",
    phone: "(555) 234-5678",
    email: "mary.j@email.com",
    lastVisit: "12/28/2025",
    insurance: "Aetna HMO",
    mrn: "MRN-3892",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "Checked In": "badge-info",
    "In Room": "badge-success",
    Scheduled: "badge-warning",
    Completed: "badge-success",
  };
  return <span className={`badge ${colors[status] || "badge-info"}`}>{status}</span>;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = {
    High: "badge-danger",
    Medium: "badge-warning",
    Low: "badge-info",
  };
  return <span className={`badge ${colors[priority] || "badge-info"}`}>{priority}</span>;
};

export default function Dashboard() {
  const router = useRouter();

  const appointmentColumns = [
    { key: "time", header: "Time", width: "80px" },
    { key: "patient", header: "Patient" },
    { key: "mrn", header: "MRN", width: "100px" },
    { key: "type", header: "Visit Type" },
    {
      key: "status",
      header: "Status",
      render: (row: (typeof todayAppointments)[0]) => (
        <StatusBadge status={row.status} />
      ),
    },
  ];

  
  const noteSignoffColumns = [
    { key: "patient", header: "Patient" },
    { key: "mrn", header: "MRN", width: "100px" },
    { key: "type", header: "Note Type" },
    { key: "date", header: "Date", width: "100px" },
    {
      key: "actions",
      header: "Actions",
      width: "120px",
      render: (row: (typeof notesPendingSignoff)[0]) => (
        <div className="flex gap-1">
          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
            <FileEdit size={12} className="inline mr-1" />
            Edit
          </button>
          <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
            <PenLine size={12} className="inline mr-1" />
            Sign
          </button>
        </div>
      ),
    },
  ];

  const taskColumns = [
    { key: "task", header: "Task" },
    { key: "patient", header: "Patient" },
    {
      key: "priority",
      header: "Priority",
      render: (row: (typeof pendingTasks)[0]) => (
        <PriorityBadge priority={row.priority} />
      ),
    },
    { key: "due", header: "Due", width: "100px" },
  ];

  const tabs = [
    {
      id: "appointments",
      label: "Today's Appointments",
      badge: todayAppointments.length,
      content: (
        <DataTable
          columns={appointmentColumns}
          data={todayAppointments}
          onRowClick={(row) => router.push(`/patients/${row.mrn}`)}
        />
      ),
    },
    {
      id: "tasks",
      label: "Pending Tasks",
      badge: pendingTasks.filter((t) => t.priority === "High").length,
      content: (
        <DataTable
          columns={taskColumns}
          data={pendingTasks}
          onRowClick={(row) => console.log("Clicked:", row)}
        />
      ),
    },
    {
      id: "messages",
      label: "Messages",
      badge: 3,
      content: (
        <div className="text-gray-500 text-sm py-8 text-center">
          <p>You have 3 unread messages</p>
        </div>
      ),
    },
    {
      id: "signoff",
      label: "Notes Pending Sign-off",
      badge: notesPendingSignoff.length,
      content: (
        <DataTable
          columns={noteSignoffColumns}
          data={notesPendingSignoff}
          onRowClick={(row) => router.push(`/patients/${row.mrn}`)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back, Dr. Smith. Here&apos;s your overview for today.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          change="+2 from yesterday"
          changeType="positive"
          icon={Calendar}
        />
        <StatsCard
          title="Patients Seen"
          value={2}
          change="3 remaining"
          changeType="neutral"
          icon={Users}
        />
        <StatsCard
          title="Pending Tasks"
          value={pendingTasks.length}
          change="2 high priority"
          changeType="negative"
          icon={FileText}
        />
        <StatsCard
          title="Pending Claims"
          value="$12,450"
          change="+5% this week"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Appointments & Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <TabPanel tabs={tabs} defaultTab="appointments" />

          {/* Alerts Section */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <h2 className="font-semibold text-gray-800">Clinical Alerts</h2>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Drug Interaction Warning
                  </p>
                  <p className="text-xs text-amber-700">
                    Patient John Smith (MRN-4521) - Potential interaction between
                    Warfarin and Aspirin
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <Clock size={16} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Overdue Lab Results
                  </p>
                  <p className="text-xs text-red-700">
                    3 patients have lab results pending review for over 48 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <TrendingUp size={16} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Quality Metric Update
                  </p>
                  <p className="text-xs text-blue-700">
                    Diabetes care gap closed for 5 patients this week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Patients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Recent Patients</h2>
            <button className="text-xs text-primary hover:underline">
              View All
            </button>
          </div>
          {recentPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Today&apos;s Progress
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Appointments</span>
                  <span className="text-gray-800">2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Charts Completed</span>
                  <span className="text-gray-800">2/2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tasks</span>
                  <span className="text-gray-800">1/4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
