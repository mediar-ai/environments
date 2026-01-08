"use client";

import { useState } from "react";
import {
  Play,
  Download,
  Printer,
  Filter,
  LayoutList,
  Settings2,
  ArrowUpDown,
  Columns3,
} from "lucide-react";

interface LineItem {
  id: number;
  companyCode: string;
  documentNumber: string;
  documentType: string;
  postingDate: string;
  documentDate: string;
  glAccount: string;
  accountName: string;
  debitCredit: "S" | "H";
  amountLC: number;
  currency: string;
  reference: string;
  text: string;
  user: string;
  clearingDoc: string;
}

const sampleData: LineItem[] = [
  {
    id: 1,
    companyCode: "1000",
    documentNumber: "1000000001",
    documentType: "SA",
    postingDate: "2025.01.02",
    documentDate: "2025.01.02",
    glAccount: "400000",
    accountName: "Revenue - Product Sales",
    debitCredit: "H",
    amountLC: -15000.00,
    currency: "USD",
    reference: "INV-2024-001",
    text: "January Sales",
    user: "SAPTESTER",
    clearingDoc: "",
  },
  {
    id: 2,
    companyCode: "1000",
    documentNumber: "1000000002",
    documentType: "SA",
    postingDate: "2025.01.03",
    documentDate: "2025.01.03",
    glAccount: "400000",
    accountName: "Revenue - Product Sales",
    debitCredit: "H",
    amountLC: -8500.00,
    currency: "USD",
    reference: "INV-2024-002",
    text: "Service Revenue",
    user: "SAPTESTER",
    clearingDoc: "",
  },
  {
    id: 3,
    companyCode: "1000",
    documentNumber: "1000000003",
    documentType: "KR",
    postingDate: "2025.01.04",
    documentDate: "2025.01.03",
    glAccount: "500000",
    accountName: "Cost of Goods Sold",
    debitCredit: "S",
    amountLC: 6200.00,
    currency: "USD",
    reference: "BILL-2024-001",
    text: "Inventory Cost",
    user: "SAPTESTER",
    clearingDoc: "",
  },
  {
    id: 4,
    companyCode: "1000",
    documentNumber: "1000000004",
    documentType: "SA",
    postingDate: "2025.01.05",
    documentDate: "2025.01.05",
    glAccount: "610000",
    accountName: "Office Expenses",
    debitCredit: "S",
    amountLC: 1250.00,
    currency: "USD",
    reference: "EXP-2024-001",
    text: "Office Supplies",
    user: "SAPTESTER",
    clearingDoc: "1000000010",
  },
  {
    id: 5,
    companyCode: "1000",
    documentNumber: "1000000005",
    documentType: "SA",
    postingDate: "2025.01.06",
    documentDate: "2025.01.06",
    glAccount: "400000",
    accountName: "Revenue - Product Sales",
    debitCredit: "H",
    amountLC: -22000.00,
    currency: "USD",
    reference: "INV-2024-003",
    text: "Q1 Contract Revenue",
    user: "SAPTESTER",
    clearingDoc: "",
  },
  {
    id: 6,
    companyCode: "1000",
    documentNumber: "1000000006",
    documentType: "KZ",
    postingDate: "2025.01.06",
    documentDate: "2025.01.06",
    glAccount: "113100",
    accountName: "Bank Account - Main",
    debitCredit: "S",
    amountLC: 45500.00,
    currency: "USD",
    reference: "PAY-2024-001",
    text: "Customer Payment",
    user: "SAPTESTER",
    clearingDoc: "",
  },
  {
    id: 7,
    companyCode: "1000",
    documentNumber: "1000000007",
    documentType: "SA",
    postingDate: "2025.01.07",
    documentDate: "2025.01.07",
    glAccount: "620000",
    accountName: "Travel Expenses",
    debitCredit: "S",
    amountLC: 3400.00,
    currency: "USD",
    reference: "EXP-2024-002",
    text: "Business Travel Q1",
    user: "SAPTESTER",
    clearingDoc: "",
  },
];

export default function FBL3NPage() {
  const [selectionData, setSelectionData] = useState({
    glAccount: "",
    glAccountTo: "",
    companyCode: "1000",
    fiscalYear: "2025",
    postingDateFrom: "2025.01.01",
    postingDateTo: "2025.12.31",
    openItems: false,
    clearedItems: false,
    allItems: true,
  });

  const [data, setData] = useState<LineItem[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [executed, setExecuted] = useState(false);

  const handleExecute = () => {
    setData(sampleData);
    setExecuted(true);
  };

  const toggleRowSelection = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const calculateTotals = () => {
    const debit = data.filter(d => d.debitCredit === "S").reduce((sum, d) => sum + d.amountLC, 0);
    const credit = data.filter(d => d.debitCredit === "H").reduce((sum, d) => sum + Math.abs(d.amountLC), 0);
    return { debit, credit, balance: debit - credit };
  };

  const { debit, credit, balance } = calculateTotals();

  if (!executed) {
    // Selection Screen
    return (
      <div className="h-full flex flex-col bg-[#f5f6f7]">
        {/* Toolbar */}
        <div className="h-8 bg-[#e5e5e5] border-b border-[#d9d9d9] flex items-center px-2 gap-1">
          <button onClick={handleExecute} className="sap-button sap-button-primary flex items-center gap-1">
            <Play size={14} />
            <span>Execute</span>
          </button>
        </div>

        {/* Selection Screen */}
        <div className="flex-1 overflow-auto p-2">
          <div className="sap-panel">
            <div className="sap-panel-header">
              <span>G/L Account Line Item Display</span>
            </div>
            <div className="sap-panel-content">
              <div className="max-w-2xl">
                {/* Account Selection */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-[#32363a] mb-2 border-b border-[#e5e5e5] pb-1">
                    Account Selection
                  </h3>
                  <div className="sap-field">
                    <label className="sap-field-label">G/L Account</label>
                    <input
                      type="text"
                      className="sap-input w-24"
                      value={selectionData.glAccount}
                      onChange={(e) => setSelectionData({ ...selectionData, glAccount: e.target.value })}
                      placeholder=""
                    />
                    <span className="mx-2 text-xs">to</span>
                    <input
                      type="text"
                      className="sap-input w-24"
                      value={selectionData.glAccountTo}
                      onChange={(e) => setSelectionData({ ...selectionData, glAccountTo: e.target.value })}
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label required">Company Code</label>
                    <input
                      type="text"
                      className="sap-input w-16"
                      value={selectionData.companyCode}
                      onChange={(e) => setSelectionData({ ...selectionData, companyCode: e.target.value })}
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-field-label">Fiscal Year</label>
                    <input
                      type="text"
                      className="sap-input w-16"
                      value={selectionData.fiscalYear}
                      onChange={(e) => setSelectionData({ ...selectionData, fiscalYear: e.target.value })}
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-[#32363a] mb-2 border-b border-[#e5e5e5] pb-1">
                    Posting Date
                  </h3>
                  <div className="sap-field">
                    <label className="sap-field-label">Posting Date</label>
                    <input
                      type="text"
                      className="sap-input w-28"
                      value={selectionData.postingDateFrom}
                      onChange={(e) => setSelectionData({ ...selectionData, postingDateFrom: e.target.value })}
                    />
                    <span className="mx-2 text-xs">to</span>
                    <input
                      type="text"
                      className="sap-input w-28"
                      value={selectionData.postingDateTo}
                      onChange={(e) => setSelectionData({ ...selectionData, postingDateTo: e.target.value })}
                    />
                  </div>
                </div>

                {/* Item Selection */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-[#32363a] mb-2 border-b border-[#e5e5e5] pb-1">
                    Line Item Selection
                  </h3>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itemSelection"
                        checked={selectionData.openItems}
                        onChange={() => setSelectionData({ ...selectionData, openItems: true, clearedItems: false, allItems: false })}
                        className="sap-checkbox"
                      />
                      <span className="text-xs">Open Items</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itemSelection"
                        checked={selectionData.clearedItems}
                        onChange={() => setSelectionData({ ...selectionData, openItems: false, clearedItems: true, allItems: false })}
                        className="sap-checkbox"
                      />
                      <span className="text-xs">Cleared Items</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itemSelection"
                        checked={selectionData.allItems}
                        onChange={() => setSelectionData({ ...selectionData, openItems: false, clearedItems: false, allItems: true })}
                        className="sap-checkbox"
                      />
                      <span className="text-xs">All Items</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  return (
    <div className="h-full flex flex-col bg-[#f5f6f7]">
      {/* Toolbar */}
      <div className="h-8 bg-[#e5e5e5] border-b border-[#d9d9d9] flex items-center px-2 gap-1">
        <button className="sap-button flex items-center gap-1">
          <Download size={14} className="text-[#0a6ed1]" />
          <span>Export</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <Printer size={14} className="text-[#0a6ed1]" />
          <span>Print</span>
        </button>
        <div className="w-px h-5 bg-[#d9d9d9] mx-1" />
        <button className="sap-button flex items-center gap-1">
          <Filter size={14} className="text-[#0a6ed1]" />
          <span>Filter</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <ArrowUpDown size={14} className="text-[#0a6ed1]" />
          <span>Sort</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <Columns3 size={14} className="text-[#0a6ed1]" />
          <span>Columns</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <LayoutList size={14} className="text-[#0a6ed1]" />
          <span>Subtotals</span>
        </button>
        <button className="sap-button flex items-center gap-1">
          <Settings2 size={14} className="text-[#0a6ed1]" />
          <span>Layout</span>
        </button>
        <div className="flex-1" />
        <button className="sap-button" onClick={() => setExecuted(false)}>
          Back to Selection
        </button>
      </div>

      {/* Summary Bar */}
      <div className="h-7 bg-white border-b border-[#d9d9d9] flex items-center px-4 gap-6 text-xs">
        <span>
          <strong>{data.length}</strong> Line Items
        </span>
        <span>
          Debit: <strong className="text-[#107e3e]">{debit.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD</strong>
        </span>
        <span>
          Credit: <strong className="text-[#107e3e]">{credit.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD</strong>
        </span>
        <span>
          Balance: <strong className={balance >= 0 ? "text-[#107e3e]" : "text-[#bb0000]"}>
            {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
          </strong>
        </span>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto">
        <table className="sap-table">
          <thead className="sticky top-0">
            <tr>
              <th style={{ width: "30px" }}></th>
              <th style={{ width: "60px" }}>Co.Code</th>
              <th style={{ width: "100px" }}>Document No.</th>
              <th style={{ width: "50px" }}>Type</th>
              <th style={{ width: "90px" }}>Posting Date</th>
              <th style={{ width: "80px" }}>G/L Acct</th>
              <th style={{ width: "180px" }}>Account Name</th>
              <th style={{ width: "40px" }}>D/C</th>
              <th style={{ width: "120px" }}>Amount in LC</th>
              <th style={{ width: "50px" }}>Curr.</th>
              <th style={{ width: "100px" }}>Reference</th>
              <th style={{ width: "150px" }}>Text</th>
              <th style={{ width: "80px" }}>User</th>
              <th style={{ width: "100px" }}>Clearing Doc</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={selectedRows.has(item.id) ? "selected" : ""}
                onClick={() => toggleRowSelection(item.id)}
              >
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="sap-checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => toggleRowSelection(item.id)}
                  />
                </td>
                <td>{item.companyCode}</td>
                <td className="text-[#0a6ed1] cursor-pointer hover:underline">
                  {item.documentNumber}
                </td>
                <td>{item.documentType}</td>
                <td>{item.postingDate}</td>
                <td>{item.glAccount}</td>
                <td>{item.accountName}</td>
                <td className="text-center">{item.debitCredit}</td>
                <td className={`text-right ${item.amountLC < 0 ? "text-[#bb0000]" : ""}`}>
                  {item.amountLC.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
                <td>{item.currency}</td>
                <td>{item.reference}</td>
                <td>{item.text}</td>
                <td>{item.user}</td>
                <td className="text-[#0a6ed1]">{item.clearingDoc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
