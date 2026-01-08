"use client";

import { useState } from "react";
import {
  Check,
  Eye,
  FileText,
  Calculator,
  Paperclip,
  History,
  Search,
} from "lucide-react";

interface InvoiceLine {
  id: number;
  item: string;
  poNumber: string;
  poItem: string;
  material: string;
  shortText: string;
  quantity: string;
  unit: string;
  amount: string;
  taxCode: string;
}

const initialLines: InvoiceLine[] = [
  {
    id: 1,
    item: "001",
    poNumber: "4500001234",
    poItem: "00010",
    material: "MAT-001",
    shortText: "Office Supplies - Paper",
    quantity: "100",
    unit: "EA",
    amount: "500.00",
    taxCode: "V1",
  },
  {
    id: 2,
    item: "002",
    poNumber: "4500001234",
    poItem: "00020",
    material: "MAT-002",
    shortText: "Office Supplies - Pens",
    quantity: "50",
    unit: "EA",
    amount: "150.00",
    taxCode: "V1",
  },
  {
    id: 3,
    item: "003",
    poNumber: "4500001234",
    poItem: "00030",
    material: "MAT-003",
    shortText: "Printer Toner",
    quantity: "5",
    unit: "EA",
    amount: "350.00",
    taxCode: "V1",
  },
];

export default function MIROPage() {
  const [basicData, setBasicData] = useState({
    transactionType: "Invoice",
    invoiceDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    postingDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    reference: "INV-2024-00891",
    companyCode: "1000",
    currency: "USD",
    grossAmount: "1,000.00",
    taxAmount: "0.00",
    vendor: "100123",
    vendorName: "Office Depot Inc.",
    paymentTerms: "NT30",
    baselineDate: new Date().toISOString().split("T")[0].replace(/-/g, "."),
  });

  const [lines, setLines] = useState<InvoiceLine[]>(initialLines);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("basic");

  const calculateTotal = () => {
    return lines.reduce(
      (sum, l) => sum + parseFloat(l.amount.replace(/,/g, "") || "0"),
      0
    );
  };

  const handleSimulate = () => {
    const total = calculateTotal();
    const gross = parseFloat(basicData.grossAmount.replace(/,/g, "") || "0");

    if (Math.abs(total - gross) > 0.01) {
      setMessage({
        type: "warning",
        text: `Invoice amount (${gross.toFixed(2)}) does not match line items (${total.toFixed(2)})`,
      });
    } else {
      setMessage({
        type: "success",
        text: "Document simulation successful. Invoice is ready for posting.",
      });
    }
    setShowMessage(true);
  };

  const handlePost = () => {
    const docNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    setMessage({
      type: "success",
      text: `Document ${docNumber} posted in company code ${basicData.companyCode}`,
    });
    setShowMessage(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#f5f6f7]">
      {/* Transaction Toolbar */}
      <div className="h-8 bg-[#e5e5e5] border-b border-[#d9d9d9] flex items-center px-2 gap-1">
        <button onClick={handlePost} className="sap-button sap-button-primary flex items-center gap-1">
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
        <button className="sap-button flex items-center gap-1">
          <Calculator size={14} className="text-[#0a6ed1]" />
          <span>Calculate Tax</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <Paperclip size={14} className="text-[#0a6ed1]" />
          <span>Attachments</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <History size={14} className="text-[#0a6ed1]" />
          <span>History</span>
        </button>
      </div>

      {/* Message Area */}
      {showMessage && (
        <div
          className={`sap-message ${
            message.type === "success"
              ? "sap-message-success"
              : message.type === "warning"
              ? "sap-message-warning"
              : "sap-message-error"
          }`}
        >
          {message.text}
          <button className="ml-auto text-xs underline" onClick={() => setShowMessage(false)}>
            Dismiss
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto p-2">
        {/* Transaction Type */}
        <div className="sap-panel">
          <div className="sap-panel-header">
            <span>Transaction</span>
          </div>
          <div className="sap-panel-content flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="transactionType"
                checked={basicData.transactionType === "Invoice"}
                onChange={() => setBasicData({ ...basicData, transactionType: "Invoice" })}
                className="sap-checkbox"
              />
              <span className="text-xs">Invoice</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="transactionType"
                checked={basicData.transactionType === "Credit Memo"}
                onChange={() => setBasicData({ ...basicData, transactionType: "Credit Memo" })}
                className="sap-checkbox"
              />
              <span className="text-xs">Credit Memo</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="transactionType"
                checked={basicData.transactionType === "Subsequent Debit"}
                onChange={() => setBasicData({ ...basicData, transactionType: "Subsequent Debit" })}
                className="sap-checkbox"
              />
              <span className="text-xs">Subsequent Debit</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="transactionType"
                checked={basicData.transactionType === "Subsequent Credit"}
                onChange={() => setBasicData({ ...basicData, transactionType: "Subsequent Credit" })}
                className="sap-checkbox"
              />
              <span className="text-xs">Subsequent Credit</span>
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#d9d9d9] bg-white">
          <button
            className={`sap-tab ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Data
          </button>
          <button
            className={`sap-tab ${activeTab === "payment" ? "active" : ""}`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
          <button
            className={`sap-tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`sap-tab ${activeTab === "tax" ? "active" : ""}`}
            onClick={() => setActiveTab("tax")}
          >
            Tax
          </button>
        </div>

        {/* Basic Data Tab */}
        {activeTab === "basic" && (
          <div className="sap-panel border-t-0">
            <div className="sap-panel-content">
              <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                {/* Column 1 - Invoice Data */}
                <div>
                  <div className="sap-field">
                    <label className="sap-field-label required">Invoice Date</label>
                    <input
                      type="text"
                      className="sap-input w-28"
                      value={basicData.invoiceDate}
                      onChange={(e) => setBasicData({ ...basicData, invoiceDate: e.target.value })}
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label required">Posting Date</label>
                    <input
                      type="text"
                      className="sap-input w-28"
                      value={basicData.postingDate}
                      onChange={(e) => setBasicData({ ...basicData, postingDate: e.target.value })}
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Reference</label>
                    <input
                      type="text"
                      className="sap-input w-40"
                      value={basicData.reference}
                      onChange={(e) => setBasicData({ ...basicData, reference: e.target.value })}
                    />
                  </div>
                </div>

                {/* Column 2 - Amount */}
                <div>
                  <div className="sap-field">
                    <label className="sap-field-label required">Amount</label>
                    <input
                      type="text"
                      className="sap-input w-28 text-right"
                      value={basicData.grossAmount}
                      onChange={(e) => setBasicData({ ...basicData, grossAmount: e.target.value })}
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Tax Amount</label>
                    <input
                      type="text"
                      className="sap-input w-28 text-right"
                      value={basicData.taxAmount}
                      onChange={(e) => setBasicData({ ...basicData, taxAmount: e.target.value })}
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Currency</label>
                    <input
                      type="text"
                      className="sap-input w-12"
                      value={basicData.currency}
                      readOnly
                    />
                  </div>
                </div>

                {/* Column 3 - Vendor */}
                <div>
                  <div className="sap-field">
                    <label className="sap-field-label required">Vendor</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="sap-input w-24"
                        value={basicData.vendor}
                        onChange={(e) => setBasicData({ ...basicData, vendor: e.target.value })}
                      />
                      <button className="sap-button px-2">
                        <Search size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Name</label>
                    <input
                      type="text"
                      className="sap-input w-48"
                      value={basicData.vendorName}
                      readOnly
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Company Code</label>
                    <input
                      type="text"
                      className="sap-input w-16"
                      value={basicData.companyCode}
                      onChange={(e) => setBasicData({ ...basicData, companyCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === "payment" && (
          <div className="sap-panel border-t-0">
            <div className="sap-panel-content">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div>
                  <div className="sap-field">
                    <label className="sap-field-label">Payment Terms</label>
                    <select className="sap-select w-32" value={basicData.paymentTerms}>
                      <option value="NT30">NT30 - Net 30</option>
                      <option value="NT45">NT45 - Net 45</option>
                      <option value="NT60">NT60 - Net 60</option>
                      <option value="2/10N30">2/10 Net 30</option>
                    </select>
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Baseline Date</label>
                    <input
                      type="text"
                      className="sap-input w-28"
                      value={basicData.baselineDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PO Reference / Line Items */}
        <div className="sap-panel mt-2">
          <div className="sap-panel-header flex justify-between">
            <span>Purchase Order Reference</span>
            <span className="font-normal text-xs">
              Total: <strong className="text-[#107e3e]">{calculateTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })} {basicData.currency}</strong>
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="sap-table">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>Item</th>
                  <th style={{ width: "100px" }}>PO Number</th>
                  <th style={{ width: "60px" }}>PO Item</th>
                  <th style={{ width: "80px" }}>Material</th>
                  <th style={{ width: "200px" }}>Short Text</th>
                  <th style={{ width: "60px" }}>Quantity</th>
                  <th style={{ width: "40px" }}>UoM</th>
                  <th style={{ width: "100px" }}>Amount</th>
                  <th style={{ width: "60px" }}>Tax Code</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line, idx) => (
                  <tr
                    key={line.id}
                    className={selectedRow === idx ? "selected" : ""}
                    onClick={() => setSelectedRow(idx)}
                  >
                    <td className="text-center">{line.item}</td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full"
                        value={line.poNumber}
                        readOnly
                      />
                    </td>
                    <td>
                      <input type="text" className="sap-input w-full" value={line.poItem} readOnly />
                    </td>
                    <td>
                      <input type="text" className="sap-input w-full" value={line.material} readOnly />
                    </td>
                    <td>
                      <input type="text" className="sap-input w-full" value={line.shortText} readOnly />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full text-right"
                        value={line.quantity}
                        readOnly
                      />
                    </td>
                    <td>
                      <input type="text" className="sap-input w-full" value={line.unit} readOnly />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sap-input w-full text-right"
                        value={line.amount}
                        readOnly
                      />
                    </td>
                    <td>
                      <input type="text" className="sap-input w-full" value={line.taxCode} readOnly />
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
