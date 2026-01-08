"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  Users,
  UserPlus,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const patients = [
  {
    id: "MRN-4521",
    name: "John Smith",
    dob: "03/15/1978",
    age: 47,
    gender: "M",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    insurance: "Blue Cross PPO",
    pcp: "Dr. Smith",
    lastVisit: "01/05/2026",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-3892",
    name: "Mary Johnson",
    dob: "07/22/1985",
    age: 40,
    gender: "F",
    phone: "(555) 234-5678",
    email: "mary.j@email.com",
    insurance: "Aetna HMO",
    pcp: "Dr. Smith",
    lastVisit: "12/28/2025",
    nextAppt: null,
    status: "Active",
  },
  {
    id: "MRN-2847",
    name: "Robert Davis",
    dob: "11/03/1962",
    age: 63,
    gender: "M",
    phone: "(555) 345-6789",
    email: "rdavis@email.com",
    insurance: "Medicare",
    pcp: "Dr. Jones",
    lastVisit: "01/06/2026",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-9182",
    name: "Sarah Wilson",
    dob: "05/18/1990",
    age: 35,
    gender: "F",
    phone: "(555) 456-7890",
    email: "sarah.w@email.com",
    insurance: "United Healthcare",
    pcp: "Dr. Smith",
    lastVisit: "12/20/2025",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-7621",
    name: "Michael Brown",
    dob: "09/25/1975",
    age: 50,
    gender: "M",
    phone: "(555) 567-8901",
    email: "mbrown@email.com",
    insurance: "Cigna PPO",
    pcp: "Dr. Smith",
    lastVisit: "01/02/2026",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-5432",
    name: "Emily Chen",
    dob: "02/14/1988",
    age: 37,
    gender: "F",
    phone: "(555) 678-9012",
    email: "echen@email.com",
    insurance: "Blue Shield",
    pcp: "Dr. Wilson",
    lastVisit: "11/15/2025",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-8765",
    name: "David Lee",
    dob: "08/30/1970",
    age: 55,
    gender: "M",
    phone: "(555) 789-0123",
    email: "dlee@email.com",
    insurance: "Humana",
    pcp: "Dr. Jones",
    lastVisit: "12/10/2025",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-3456",
    name: "Lisa Garcia",
    dob: "04/12/1995",
    age: 30,
    gender: "F",
    phone: "(555) 890-1234",
    email: "lgarcia@email.com",
    insurance: "Kaiser",
    pcp: "Dr. Smith",
    lastVisit: "01/03/2026",
    nextAppt: "01/07/2026",
    status: "Active",
  },
  {
    id: "MRN-6789",
    name: "James Taylor",
    dob: "12/05/1958",
    age: 67,
    gender: "M",
    phone: "(555) 901-2345",
    email: "jtaylor@email.com",
    insurance: "Medicare Advantage",
    pcp: "Dr. Jones",
    lastVisit: "10/20/2025",
    nextAppt: null,
    status: "Inactive",
  },
  {
    id: "MRN-2345",
    name: "Amanda White",
    dob: "06/28/1982",
    age: 43,
    gender: "F",
    phone: "(555) 012-3456",
    email: "awhite@email.com",
    insurance: "Anthem",
    pcp: "Dr. Wilson",
    lastVisit: "12/01/2025",
    nextAppt: "01/08/2026",
    status: "Active",
  },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider =
      providerFilter === "all" || patient.pcp === providerFilter;
    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesProvider && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Patient Registry
          </h1>
          <p className="text-sm text-gray-500">
            Search and manage patient records
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <Link
            href="/patients/new"
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <UserPlus size={16} />
            New Patient
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{patients.length}</p>
              <p className="text-xs text-gray-500">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {patients.filter((p) => p.status === "Active").length}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {patients.filter((p) => p.nextAppt).length}
              </p>
              <p className="text-xs text-gray-500">Scheduled</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserPlus size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-xs text-gray-500">New This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, MRN, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Providers</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Jones">Dr. Jones</option>
            <option value="Dr. Wilson">Dr. Wilson</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Patient
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Contact
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Insurance
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                PCP
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Last Visit
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Next Appt
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, idx) => (
              <tr
                key={patient.id}
                className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3">
                  <Link href={`/patients/${patient.id}`} className="block">
                    <p className="font-medium text-gray-800 hover:text-primary">
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {patient.id} | DOB: {patient.dob} ({patient.age}
                      {patient.gender})
                    </p>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Phone size={12} className="text-gray-400" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Mail size={12} className="text-gray-400" />
                    {patient.email}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{patient.insurance}</td>
                <td className="px-4 py-3 text-gray-700">{patient.pcp}</td>
                <td className="px-4 py-3 text-gray-700">{patient.lastVisit}</td>
                <td className="px-4 py-3">
                  {patient.nextAppt ? (
                    <span className="text-primary font-medium">
                      {patient.nextAppt}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No patients found matching your search criteria
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
