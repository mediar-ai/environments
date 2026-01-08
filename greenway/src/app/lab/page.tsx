"use client";

import { useState } from "react";
import {
  FlaskConical,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const labResults = [
  {
    id: 1,
    patient: "John Smith",
    mrn: "MRN-4521",
    orderDate: "01/05/2026",
    resultDate: "01/06/2026",
    orderedBy: "Dr. Smith",
    status: "Pending Review",
    priority: "Routine",
    tests: [
      { name: "HbA1c", result: "7.2%", range: "4.0-5.6%", status: "High", flag: true },
      { name: "Fasting Glucose", result: "142 mg/dL", range: "70-100 mg/dL", status: "High", flag: true },
      { name: "Total Cholesterol", result: "198 mg/dL", range: "<200 mg/dL", status: "Normal", flag: false },
      { name: "LDL", result: "118 mg/dL", range: "<100 mg/dL", status: "High", flag: true },
      { name: "HDL", result: "45 mg/dL", range: ">40 mg/dL", status: "Normal", flag: false },
      { name: "Triglycerides", result: "175 mg/dL", range: "<150 mg/dL", status: "High", flag: true },
    ],
  },
  {
    id: 2,
    patient: "Mary Johnson",
    mrn: "MRN-3892",
    orderDate: "12/28/2025",
    resultDate: "12/29/2025",
    orderedBy: "Dr. Smith",
    status: "Reviewed",
    priority: "Routine",
    tests: [
      { name: "CBC", result: "Normal", range: "-", status: "Normal", flag: false },
      { name: "TSH", result: "2.1 mIU/L", range: "0.4-4.0 mIU/L", status: "Normal", flag: false },
      { name: "Vitamin D", result: "32 ng/mL", range: "30-100 ng/mL", status: "Normal", flag: false },
    ],
  },
  {
    id: 3,
    patient: "Robert Davis",
    mrn: "MRN-2847",
    orderDate: "01/06/2026",
    resultDate: null,
    orderedBy: "Dr. Smith",
    status: "Pending Results",
    priority: "STAT",
    tests: [
      { name: "Troponin", result: "-", range: "<0.04 ng/mL", status: "Pending", flag: false },
      { name: "BNP", result: "-", range: "<100 pg/mL", status: "Pending", flag: false },
      { name: "D-Dimer", result: "-", range: "<500 ng/mL", status: "Pending", flag: false },
    ],
  },
  {
    id: 4,
    patient: "Sarah Wilson",
    mrn: "MRN-9182",
    orderDate: "01/04/2026",
    resultDate: "01/05/2026",
    orderedBy: "Dr. Jones",
    status: "Pending Review",
    priority: "Routine",
    tests: [
      { name: "Urinalysis", result: "Normal", range: "-", status: "Normal", flag: false },
      { name: "Urine Culture", result: "No growth", range: "-", status: "Normal", flag: false },
    ],
  },
  {
    id: 5,
    patient: "Michael Brown",
    mrn: "MRN-7621",
    orderDate: "01/03/2026",
    resultDate: "01/04/2026",
    orderedBy: "Dr. Smith",
    status: "Reviewed",
    priority: "Routine",
    tests: [
      { name: "PSA", result: "2.8 ng/mL", range: "0-4 ng/mL", status: "Normal", flag: false },
      { name: "Creatinine", result: "1.1 mg/dL", range: "0.7-1.3 mg/dL", status: "Normal", flag: false },
      { name: "BUN", result: "18 mg/dL", range: "7-20 mg/dL", status: "Normal", flag: false },
    ],
  },
];

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  "Pending Review": { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  "Pending Results": { bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  Reviewed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  Critical: { bg: "bg-red-100", text: "text-red-700", icon: AlertTriangle },
};

export default function LabResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedResults, setExpandedResults] = useState<number[]>([1]);

  const toggleExpand = (id: number) => {
    setExpandedResults((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredResults = labResults.filter((result) => {
    const matchesSearch =
      result.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] || statusConfig["Pending Review"];
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const getResultBadge = (status: string) => {
    const colors: Record<string, string> = {
      Normal: "bg-green-100 text-green-800",
      High: "bg-red-100 text-red-800",
      Low: "bg-amber-100 text-amber-800",
      Critical: "bg-red-200 text-red-900 font-bold",
      Pending: "bg-gray-100 text-gray-600",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || colors.Normal}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Lab Results</h1>
          <p className="text-sm text-gray-500">
            Review and manage laboratory results
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
          <FlaskConical size={16} />
          New Lab Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by patient name or MRN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Pending Results">Pending Results</option>
            <option value="Reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {labResults.filter((r) => r.status === "Pending Review").length}
              </p>
              <p className="text-xs text-gray-500">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {labResults.filter((r) => r.status === "Pending Results").length}
              </p>
              <p className="text-xs text-gray-500">Awaiting Results</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {labResults.filter((r) => r.tests.some((t) => t.flag)).length}
              </p>
              <p className="text-xs text-gray-500">Abnormal Results</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {labResults.filter((r) => r.status === "Reviewed").length}
              </p>
              <p className="text-xs text-gray-500">Reviewed Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header Row */}
            <div
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(result.id)}
            >
              <button className="mr-3 text-gray-400">
                {expandedResults.includes(result.id) ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>

              <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                <div>
                  <Link
                    href={`/patients/${result.mrn}`}
                    className="font-medium text-gray-800 hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {result.patient}
                  </Link>
                  <p className="text-xs text-gray-500">{result.mrn}</p>
                </div>

                <div className="text-sm">
                  <p className="text-gray-500">Ordered</p>
                  <p className="text-gray-700">{result.orderDate}</p>
                </div>

                <div className="text-sm">
                  <p className="text-gray-500">Result</p>
                  <p className="text-gray-700">{result.resultDate || "-"}</p>
                </div>

                <div className="text-sm">
                  <p className="text-gray-500">Ordered By</p>
                  <p className="text-gray-700">{result.orderedBy}</p>
                </div>

                <div>
                  {result.priority === "STAT" && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold mr-2">
                      STAT
                    </span>
                  )}
                  {getStatusBadge(result.status)}
                </div>

                <div className="flex items-center justify-end gap-2">
                  {result.tests.some((t) => t.flag) && (
                    <span className="flex items-center gap-1 text-red-600 text-xs">
                      <AlertTriangle size={14} />
                      Abnormal
                    </span>
                  )}
                  {result.status === "Pending Review" && (
                    <button
                      className="px-3 py-1 text-xs font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedResults.includes(result.id) && (
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="pb-2 font-medium">Test</th>
                      <th className="pb-2 font-medium">Result</th>
                      <th className="pb-2 font-medium">Reference Range</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.tests.map((test, i) => (
                      <tr
                        key={i}
                        className={`border-t border-gray-200 ${test.flag ? "bg-red-50" : ""}`}
                      >
                        <td className="py-2 font-medium text-gray-800">
                          {test.flag && (
                            <AlertTriangle
                              size={14}
                              className="inline mr-1 text-red-500"
                            />
                          )}
                          {test.name}
                        </td>
                        <td className="py-2 text-gray-700">{test.result}</td>
                        <td className="py-2 text-gray-500">{test.range}</td>
                        <td className="py-2">{getResultBadge(test.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 flex justify-end gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                    <FileText size={14} />
                    View Full Report
                  </button>
                  {result.status === "Pending Review" && (
                    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-1">
                      <CheckCircle size={14} />
                      Mark as Reviewed
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
