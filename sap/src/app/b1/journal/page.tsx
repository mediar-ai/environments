"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Printer,
  Save,
  X,
  Search,
  Calculator,
} from "lucide-react";

interface JournalLine {
  id: number;
  glAccount: string;
  glAccountName: string;
  debit: string;
  credit: string;
  shortName: string;
  projectCode: string;
  costCenter: string;
  remarks: string;
}

const initialLines: JournalLine[] = [
  {
    id: 1,
    glAccount: "1100-001",
    glAccountName: "Cash - Operating Account",
    debit: "15,000.00",
    credit: "",
    shortName: "DEP-001",
    projectCode: "",
    costCenter: "CC100",
    remarks: "Customer deposit received",
  },
  {
    id: 2,
    glAccount: "4000-001",
    glAccountName: "Revenue - Product Sales",
    debit: "",
    credit: "15,000.00",
    shortName: "REV-001",
    projectCode: "PRJ-2024",
    costCenter: "CC100",
    remarks: "January sales revenue",
  },
];

export default function B1JournalEntryPage() {
  const [headerData, setHeaderData] = useState({
    series: "Primary",
    number: "JE-0000123",
    postingDate: new Date().toLocaleDateString("en-GB"),
    documentDate: new Date().toLocaleDateString("en-GB"),
    dueDate: new Date().toLocaleDateString("en-GB"),
    reference: "",
    reference2: "",
    transNo: "",
    project: "",
    remarks: "",
  });

  const [lines, setLines] = useState<JournalLine[]>(initialLines);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("content");

  const addLine = () => {
    const newLine: JournalLine = {
      id: lines.length + 1,
      glAccount: "",
      glAccountName: "",
      debit: "",
      credit: "",
      shortName: "",
      projectCode: "",
      costCenter: "",
      remarks: "",
    };
    setLines([...lines, newLine]);
  };

  const deleteLine = () => {
    if (selectedRow !== null) {
      setLines(lines.filter((_, idx) => idx !== selectedRow));
      setSelectedRow(null);
    }
  };

  const updateLine = (index: number, field: keyof JournalLine, value: string) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [field]: value };
    setLines(newLines);
  };

  const calculateTotals = () => {
    const debitTotal = lines.reduce(
      (sum, l) => sum + parseFloat(l.debit.replace(/,/g, "") || "0"),
      0
    );
    const creditTotal = lines.reduce(
      (sum, l) => sum + parseFloat(l.credit.replace(/,/g, "") || "0"),
      0
    );
    return { debitTotal, creditTotal, balance: debitTotal - creditTotal };
  };

  const handleAdd = () => {
    const { balance } = calculateTotals();
    if (Math.abs(balance) > 0.01) {
      setMessage({
        type: "error",
        text: `Journal entry is not balanced. Difference: ${Math.abs(balance).toFixed(2)}`,
      });
    } else {
      const docNumber = Math.floor(Math.random() * 900000) + 100000;
      setMessage({
        type: "success",
        text: `Journal Entry ${docNumber} added successfully`,
      });
    }
    setShowMessage(true);
  };

  const { debitTotal, creditTotal, balance } = calculateTotals();

  return (
    <div className="h-full flex flex-col">
      {/* B1 Document Window */}
      <div className="flex-1 flex flex-col m-1 bg-white border border-[#d0d0d0]">
        {/* Window Title Bar */}
        <div className="h-[26px] bg-[#f5f5f5] border-b border-[#d0d0d0] flex items-center px-3">
          <span className="text-[#e1692c] text-[12px] font-semibold">Journal Entry - Add</span>
        </div>

        {/* Toolbar */}
        <div className="h-[32px] bg-white border-b border-[#d0d0d0] flex items-center px-2 gap-1">
          <button onClick={handleAdd} className="h-[26px] px-3 bg-[#e1692c] text-white text-[11px] border-none rounded flex items-center gap-1 hover:bg-[#c85a25]">
            <Save size={12} />
            <span>Add</span>
          </button>
          <button className="h-[26px] px-3 bg-white text-[#333333] text-[11px] border border-[#d0d0d0] rounded flex items-center gap-1 hover:bg-[#f5f5f5]">
            <Search size={12} />
            <span>Find</span>
          </button>
          <div className="w-px h-[18px] bg-[#d0d0d0] mx-1" />
          <button onClick={addLine} className="h-[26px] px-2 bg-white text-[#e1692c] border border-[#d0d0d0] rounded flex items-center hover:bg-[#e1692c]/10">
            <Plus size={14} />
          </button>
          <button onClick={deleteLine} className="h-[26px] px-2 bg-white text-[#e1692c] border border-[#d0d0d0] rounded flex items-center hover:bg-[#e1692c]/10 disabled:text-[#c0c0c0]" disabled={selectedRow === null}>
            <Trash2 size={14} />
          </button>
          <button className="h-[26px] px-2 bg-white text-[#e1692c] border border-[#d0d0d0] rounded flex items-center hover:bg-[#e1692c]/10">
            <Copy size={14} />
          </button>
          <div className="w-px h-[18px] bg-[#d0d0d0] mx-1" />
          <button className="h-[26px] px-2 bg-white text-[#e1692c] border border-[#d0d0d0] rounded flex items-center hover:bg-[#e1692c]/10">
            <Printer size={14} />
          </button>
          <button className="h-[26px] px-2 bg-white text-[#e1692c] border border-[#d0d0d0] rounded flex items-center hover:bg-[#e1692c]/10">
            <Calculator size={14} />
          </button>
          <div className="flex-1" />
          <button className="h-[26px] px-3 bg-white text-[#333333] text-[11px] border border-[#d0d0d0] rounded flex items-center gap-1 hover:bg-[#f5f5f5]">
            <X size={12} />
            <span>Cancel</span>
          </button>
        </div>

        {/* Message */}
        {showMessage && (
          <div className={`b1-message ${message.type === "success" ? "b1-message-success" : "b1-message-error"}`}>
            {message.text}
            <button className="ml-auto text-[10px] underline" onClick={() => setShowMessage(false)}>
              Close
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f9f9f9]">
          {/* Header Fields */}
          <div className="p-3 border-b border-[#e0e0e0] bg-white">
            <div className="grid grid-cols-4 gap-x-4 gap-y-1">
              {/* Row 1 */}
              <div className="b1-field">
                <label className="b1-field-label">Series</label>
                <select className="b1-select w-24">
                  <option>Primary</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="b1-field">
                <label className="b1-field-label">Number</label>
                <input type="text" className="b1-input w-28" value={headerData.number} readOnly />
              </div>
              <div className="b1-field">
                <label className="b1-field-label">Posting Date</label>
                <input
                  type="text"
                  className="b1-input w-24"
                  value={headerData.postingDate}
                  onChange={(e) => setHeaderData({ ...headerData, postingDate: e.target.value })}
                />
              </div>
              <div className="b1-field">
                <label className="b1-field-label">Due Date</label>
                <input
                  type="text"
                  className="b1-input w-24"
                  value={headerData.dueDate}
                  onChange={(e) => setHeaderData({ ...headerData, dueDate: e.target.value })}
                />
              </div>

              {/* Row 2 */}
              <div className="b1-field">
                <label className="b1-field-label">Reference</label>
                <input
                  type="text"
                  className="b1-input w-32"
                  value={headerData.reference}
                  onChange={(e) => setHeaderData({ ...headerData, reference: e.target.value })}
                />
              </div>
              <div className="b1-field">
                <label className="b1-field-label">Reference 2</label>
                <input
                  type="text"
                  className="b1-input w-32"
                  value={headerData.reference2}
                  onChange={(e) => setHeaderData({ ...headerData, reference2: e.target.value })}
                />
              </div>
              <div className="b1-field">
                <label className="b1-field-label">Document Date</label>
                <input
                  type="text"
                  className="b1-input w-24"
                  value={headerData.documentDate}
                  onChange={(e) => setHeaderData({ ...headerData, documentDate: e.target.value })}
                />
              </div>
              <div className="b1-field">
                <label className="b1-field-label">Trans. No.</label>
                <input type="text" className="b1-input w-24" value={headerData.transNo} readOnly />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="b1-tabs">
            <button
              className={`b1-tab ${activeTab === "content" ? "active" : ""}`}
              onClick={() => setActiveTab("content")}
            >
              Contents
            </button>
            <button
              className={`b1-tab ${activeTab === "accounting" ? "active" : ""}`}
              onClick={() => setActiveTab("accounting")}
            >
              Accounting
            </button>
          </div>

          {/* Tab Content - Grid */}
          <div className="b1-tab-content flex-1 overflow-auto">
            <table className="b1-table">
              <thead>
                <tr>
                  <th style={{ width: "30px" }}>#</th>
                  <th style={{ width: "100px" }}>G/L Account</th>
                  <th style={{ width: "200px" }}>G/L Account Name</th>
                  <th style={{ width: "100px" }}>Debit</th>
                  <th style={{ width: "100px" }}>Credit</th>
                  <th style={{ width: "80px" }}>Short Name</th>
                  <th style={{ width: "80px" }}>Project Code</th>
                  <th style={{ width: "80px" }}>Cost Center</th>
                  <th style={{ width: "150px" }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line, idx) => (
                  <tr
                    key={line.id}
                    className={selectedRow === idx ? "selected" : ""}
                    onClick={() => setSelectedRow(idx)}
                  >
                    <td className="text-center">{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full"
                        value={line.glAccount}
                        onChange={(e) => updateLine(idx, "glAccount", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full"
                        value={line.glAccountName}
                        onChange={(e) => updateLine(idx, "glAccountName", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full text-right"
                        value={line.debit}
                        onChange={(e) => updateLine(idx, "debit", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full text-right"
                        value={line.credit}
                        onChange={(e) => updateLine(idx, "credit", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full"
                        value={line.shortName}
                        onChange={(e) => updateLine(idx, "shortName", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full"
                        value={line.projectCode}
                        onChange={(e) => updateLine(idx, "projectCode", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full"
                        value={line.costCenter}
                        onChange={(e) => updateLine(idx, "costCenter", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="b1-input w-full"
                        value={line.remarks}
                        onChange={(e) => updateLine(idx, "remarks", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Totals */}
          <div className="h-[32px] bg-[#f5f5f5] border-t border-[#d0d0d0] flex items-center px-4 gap-8">
            <span className="text-[11px] text-[#666666]">
              Total Debit:{" "}
              <strong className="text-[#e1692c]">
                {debitTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </strong>
            </span>
            <span className="text-[11px] text-[#666666]">
              Total Credit:{" "}
              <strong className="text-[#e1692c]">
                {creditTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </strong>
            </span>
            <span className="text-[11px] text-[#666666]">
              Balance:{" "}
              <strong className={Math.abs(balance) < 0.01 ? "text-[#3c763d]" : "text-[#a94442]"}>
                {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
