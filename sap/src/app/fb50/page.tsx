"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Calculator,
  FileText,
  Eye,
  Check,
} from "lucide-react";

interface JournalLine {
  id: number;
  glAccount: string;
  shortText: string;
  debitCredit: "D" | "C";
  amount: string;
  costCenter: string;
  profitCenter: string;
  assignment: string;
}

const initialLines: JournalLine[] = [
  {
    id: 1,
    glAccount: "400000",
    shortText: "Revenue - Product Sales",
    debitCredit: "C",
    amount: "15,000.00",
    costCenter: "1000",
    profitCenter: "PC1000",
    assignment: "INV-2024-001",
  },
  {
    id: 2,
    glAccount: "140000",
    shortText: "Accounts Receivable",
    debitCredit: "D",
    amount: "15,000.00",
    costCenter: "",
    profitCenter: "",
    assignment: "INV-2024-001",
  },
];

export default function FB50Page() {
  const [headerData, setHeaderData] = useState({
    documentDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    postingDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    documentType: "SA",
    companyCode: "1000",
    currency: "USD",
    reference: "",
    headerText: "",
    postingPeriod: "01",
    fiscalYear: "2025",
  });

  const [lines, setLines] = useState<JournalLine[]>(initialLines);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const addLine = () => {
    const newLine: JournalLine = {
      id: lines.length + 1,
      glAccount: "",
      shortText: "",
      debitCredit: "D",
      amount: "",
      costCenter: "",
      profitCenter: "",
      assignment: "",
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
    const debitTotal = lines
      .filter((l) => l.debitCredit === "D")
      .reduce((sum, l) => sum + parseFloat(l.amount.replace(/,/g, "") || "0"), 0);
    const creditTotal = lines
      .filter((l) => l.debitCredit === "C")
      .reduce((sum, l) => sum + parseFloat(l.amount.replace(/,/g, "") || "0"), 0);
    return { debitTotal, creditTotal, balance: debitTotal - creditTotal };
  };

  const handleSimulate = () => {
    const { balance } = calculateTotals();
    if (Math.abs(balance) > 0.01) {
      setMessage({ type: "error", text: `Document does not balance. Difference: ${balance.toFixed(2)} USD` });
    } else {
      setMessage({ type: "success", text: "Document simulation successful. Document is ready for posting." });
    }
    setShowMessage(true);
  };

  const handlePost = () => {
    const { balance } = calculateTotals();
    if (Math.abs(balance) > 0.01) {
      setMessage({ type: "error", text: `Cannot post: Document does not balance. Difference: ${balance.toFixed(2)} USD` });
    } else {
      const docNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
      setMessage({ type: "success", text: `Document ${docNumber} posted in company code 1000` });
    }
    setShowMessage(true);
  };

  const { debitTotal, creditTotal, balance } = calculateTotals();

  return (
    <div className="h-full flex flex-col bg-[#f5f6f7]">
      {/* Transaction Toolbar */}
      <div className="h-8 bg-[#e5e5e5] border-b border-[#d9d9d9] flex items-center px-2 gap-1">
        <button
          onClick={handlePost}
          className="sap-button sap-button-primary flex items-center gap-1"
        >
          <Check size={14} />
          <span>Post</span>
        </button>
        <button onClick={handleSimulate} className="sap-button flex items-center gap-1">
          <Eye size={14} className="text-[#0a6ed1]" />
          <span>Simulate</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <FileText size={14} className="text-[#0a6ed1]" />
          <span>Park</span>
        </button>
        <div className="w-px h-5 bg-[#d9d9d9] mx-1" />
        <button onClick={addLine} className="sap-button flex items-center gap-1">
          <Plus size={14} className="text-[#107e3e]" />
          <span>Add Line</span>
        </button>
        <button onClick={deleteLine} className="sap-button flex items-center gap-1" disabled={selectedRow === null}>
          <Trash2 size={14} className={selectedRow === null ? "text-[#bdbdbd]" : "text-[#bb0000]"} />
          <span>Delete</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <Copy size={14} className="text-[#0a6ed1]" />
          <span>Copy</span>
        </button>
      </div>

      {/* Message Area */}
      {showMessage && (
        <div
          className={`sap-message ${
            message.type === "success" ? "sap-message-success" : "sap-message-error"
          }`}
        >
          {message.text}
          <button
            className="ml-auto text-xs underline"
            onClick={() => setShowMessage(false)}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto p-2">
        {/* Header Section */}
        <div className="sap-panel">
          <div className="sap-panel-header">
            <span>Document Header</span>
          </div>
          <div className="sap-panel-content">
            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
              {/* Column 1 */}
              <div>
                <div className="sap-field">
                  <label className="sap-field-label required">Document Date</label>
                  <input
                    type="text"
                    className="sap-input w-28"
                    value={headerData.documentDate}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, documentDate: e.target.value })
                    }
                  />
                </div>
                <div className="sap-field">
                  <label className="sap-field-label required">Posting Date</label>
                  <input
                    type="text"
                    className="sap-input w-28"
                    value={headerData.postingDate}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, postingDate: e.target.value })
                    }
                  />
                </div>
                <div className="sap-field">
                  <label className="sap-field-label required">Document Type</label>
                  <select
                    className="sap-select w-20"
                    value={headerData.documentType}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, documentType: e.target.value })
                    }
                  >
                    <option value="SA">SA</option>
                    <option value="AB">AB</option>
                    <option value="AF">AF</option>
                    <option value="AN">AN</option>
                    <option value="DA">DA</option>
                    <option value="DG">DG</option>
                    <option value="DR">DR</option>
                    <option value="DZ">DZ</option>
                    <option value="KA">KA</option>
                    <option value="KG">KG</option>
                    <option value="KR">KR</option>
                    <option value="KZ">KZ</option>
                  </select>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <div className="sap-field">
                  <label className="sap-field-label required">Company Code</label>
                  <input
                    type="text"
                    className="sap-input w-16"
                    value={headerData.companyCode}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, companyCode: e.target.value })
                    }
                  />
                </div>
                <div className="sap-field">
                  <label className="sap-field-label required">Currency</label>
                  <input
                    type="text"
                    className="sap-input w-12"
                    value={headerData.currency}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, currency: e.target.value })
                    }
                  />
                </div>
                <div className="sap-field">
                  <label className="sap-field-label">Reference</label>
                  <input
                    type="text"
                    className="sap-input w-40"
                    value={headerData.reference}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, reference: e.target.value })
                    }
                    placeholder=""
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div>
                <div className="sap-field">
                  <label className="sap-field-label">Posting Period</label>
                  <input
                    type="text"
                    className="sap-input w-12"
                    value={headerData.postingPeriod}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, postingPeriod: e.target.value })
                    }
                  />
                </div>
                <div className="sap-field">
                  <label className="sap-field-label">Fiscal Year</label>
                  <input
                    type="text"
                    className="sap-input w-16"
                    value={headerData.fiscalYear}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, fiscalYear: e.target.value })
                    }
                  />
                </div>
                <div className="sap-field">
                  <label className="sap-field-label">Header Text</label>
                  <input
                    type="text"
                    className="sap-input w-48"
                    value={headerData.headerText}
                    onChange={(e) =>
                      setHeaderData({ ...headerData, headerText: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Section */}
        <div className="sap-panel">
          <div className="sap-panel-header flex justify-between">
            <span>Line Items</span>
            <div className="flex items-center gap-4 text-xs font-normal">
              <span>
                Debit: <strong className="text-[#107e3e]">{debitTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} {headerData.currency}</strong>
              </span>
              <span>
                Credit: <strong className="text-[#107e3e]">{creditTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} {headerData.currency}</strong>
              </span>
              <span>
                Balance:{" "}
                <strong className={Math.abs(balance) < 0.01 ? "text-[#107e3e]" : "text-[#bb0000]"}>
                  {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })} {headerData.currency}
                </strong>
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="sap-table">
              <thead>
                <tr>
                  <th style={{ width: "30px" }}></th>
                  <th style={{ width: "100px" }}>G/L Account</th>
                  <th style={{ width: "200px" }}>Short Text</th>
                  <th style={{ width: "50px" }}>D/C</th>
                  <th style={{ width: "120px" }}>Amount</th>
                  <th style={{ width: "80px" }}>Cost Center</th>
                  <th style={{ width: "80px" }}>Profit Ctr</th>
                  <th style={{ width: "120px" }}>Assignment</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line, idx) => (
                  <tr
                    key={line.id}
                    className={selectedRow === idx ? "selected" : ""}
                    onClick={() => setSelectedRow(idx)}
                  >
                    <td className="text-center text-[#6a6d70]">{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full"
                        value={line.glAccount}
                        onChange={(e) => updateLine(idx, "glAccount", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full"
                        value={line.shortText}
                        onChange={(e) => updateLine(idx, "shortText", e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="sap-select w-full"
                        value={line.debitCredit}
                        onChange={(e) =>
                          updateLine(idx, "debitCredit", e.target.value as "D" | "C")
                        }
                      >
                        <option value="D">Debit</option>
                        <option value="C">Credit</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full text-right"
                        value={line.amount}
                        onChange={(e) => updateLine(idx, "amount", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full"
                        value={line.costCenter}
                        onChange={(e) => updateLine(idx, "costCenter", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full"
                        value={line.profitCenter}
                        onChange={(e) => updateLine(idx, "profitCenter", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full"
                        value={line.assignment}
                        onChange={(e) => updateLine(idx, "assignment", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
