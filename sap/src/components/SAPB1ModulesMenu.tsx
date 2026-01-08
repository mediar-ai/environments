"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  Settings,
  DollarSign,
  ShoppingCart,
  Truck,
  Users,
  Building2,
  Package,
  Cog,
  Factory,
  BarChart3,
  Wrench,
  UserCircle,
  Clipboard,
} from "lucide-react";

interface ModuleItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string; path?: string }[];
}

const modules: ModuleItem[] = [
  {
    id: "admin",
    label: "Administration",
    icon: Settings,
    children: [
      { id: "admin-system", label: "System Initialization" },
      { id: "admin-setup", label: "Setup" },
      { id: "admin-data", label: "Data Import/Export" },
      { id: "admin-utilities", label: "Utilities" },
    ],
  },
  {
    id: "financials",
    label: "Financials",
    icon: DollarSign,
    children: [
      { id: "fin-coa", label: "Chart of Accounts" },
      { id: "fin-journal", label: "Journal Entry", path: "/b1/journal" },
      { id: "fin-posting", label: "Journal Vouchers" },
      { id: "fin-budget", label: "Budget" },
      { id: "fin-cost", label: "Cost Accounting" },
      { id: "fin-reports", label: "Financial Reports" },
    ],
  },
  {
    id: "sales",
    label: "Sales - A/R",
    icon: ShoppingCart,
    children: [
      { id: "sales-quote", label: "Sales Quotation" },
      { id: "sales-order", label: "Sales Order" },
      { id: "sales-delivery", label: "Delivery" },
      { id: "sales-return", label: "Return" },
      { id: "sales-invoice", label: "A/R Invoice", path: "/b1/invoice" },
      { id: "sales-credit", label: "A/R Credit Memo" },
      { id: "sales-reserve", label: "A/R Reserve Invoice" },
      { id: "sales-down", label: "A/R Down Payment" },
    ],
  },
  {
    id: "purchasing",
    label: "Purchasing - A/P",
    icon: Truck,
    children: [
      { id: "purch-request", label: "Purchase Request" },
      { id: "purch-quote", label: "Purchase Quotation" },
      { id: "purch-order", label: "Purchase Order" },
      { id: "purch-grpo", label: "Goods Receipt PO" },
      { id: "purch-return", label: "Goods Return" },
      { id: "purch-invoice", label: "A/P Invoice", path: "/b1/ap-invoice" },
      { id: "purch-credit", label: "A/P Credit Memo" },
    ],
  },
  {
    id: "bp",
    label: "Business Partners",
    icon: Users,
    children: [
      { id: "bp-master", label: "Business Partner Master Data" },
      { id: "bp-activity", label: "Activity" },
      { id: "bp-campaign", label: "Campaign" },
    ],
  },
  {
    id: "banking",
    label: "Banking",
    icon: Building2,
    children: [
      { id: "bank-incoming", label: "Incoming Payments" },
      { id: "bank-outgoing", label: "Outgoing Payments" },
      { id: "bank-deposit", label: "Deposits" },
      { id: "bank-checks", label: "Checks for Payment" },
      { id: "bank-reconciliation", label: "Bank Statements" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
    children: [
      { id: "inv-master", label: "Item Master Data" },
      { id: "inv-receipt", label: "Goods Receipt" },
      { id: "inv-issue", label: "Goods Issue" },
      { id: "inv-transfer", label: "Inventory Transfer" },
      { id: "inv-count", label: "Inventory Counting" },
      { id: "inv-revaluation", label: "Inventory Revaluation" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: Cog,
    children: [
      { id: "res-master", label: "Resource Master Data" },
      { id: "res-capacity", label: "Resource Capacity" },
    ],
  },
  {
    id: "production",
    label: "Production",
    icon: Factory,
    children: [
      { id: "prod-bom", label: "Bill of Materials" },
      { id: "prod-order", label: "Production Order" },
      { id: "prod-receipt", label: "Receipt from Production" },
      { id: "prod-issue", label: "Issue for Production" },
    ],
  },
  {
    id: "mrp",
    label: "MRP",
    icon: Clipboard,
    children: [
      { id: "mrp-wizard", label: "MRP Wizard" },
      { id: "mrp-recommendations", label: "Order Recommendation" },
    ],
  },
  {
    id: "service",
    label: "Service",
    icon: Wrench,
    children: [
      { id: "svc-call", label: "Service Call" },
      { id: "svc-contract", label: "Service Contract" },
      { id: "svc-kb", label: "Solutions Knowledge Base" },
    ],
  },
  {
    id: "hr",
    label: "Human Resources",
    icon: UserCircle,
    children: [
      { id: "hr-master", label: "Employee Master Data" },
      { id: "hr-absence", label: "Time Sheet" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    children: [
      { id: "rep-financial", label: "Financial" },
      { id: "rep-sales", label: "Sales" },
      { id: "rep-purchasing", label: "Purchasing" },
      { id: "rep-inventory", label: "Inventory" },
      { id: "rep-banking", label: "Banking" },
    ],
  },
];

interface SAPB1ModulesMenuProps {
  onSelectItem: (module: string, window: string, path?: string) => void;
  currentModule: string;
}

export default function SAPB1ModulesMenu({
  onSelectItem,
  currentModule,
}: SAPB1ModulesMenuProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["financials"]));
  const [selected, setSelected] = useState<string | null>("fin-journal");

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const handleItemClick = (module: ModuleItem, item: { id: string; label: string; path?: string }) => {
    setSelected(item.id);
    onSelectItem(module.label, item.label, item.path);
    if (item.path) {
      window.location.href = item.path;
    }
  };

  return (
    <div className="w-[200px] bg-white border-r border-[#d0d0d0] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-[24px] bg-[#f5f5f5] border-b border-[#d0d0d0] flex items-center px-2">
        <span className="text-[11px] font-semibold text-[#e1692c]">Modules</span>
      </div>

      {/* Modules Tree */}
      <div className="flex-1 overflow-auto">
        {modules.map((module) => {
          const isExpanded = expanded.has(module.id);
          const Icon = module.icon;

          return (
            <div key={module.id}>
              {/* Module Header */}
              <div
                className={`flex items-center h-[24px] cursor-pointer hover:bg-[#e1692c]/10 px-1 ${
                  currentModule === module.label ? "bg-[#e1692c]/10" : ""
                }`}
                onClick={() => toggleExpand(module.id)}
              >
                <span className="w-4 h-4 flex items-center justify-center text-[#666666]">
                  {isExpanded ? (
                    <ChevronDown size={12} />
                  ) : (
                    <ChevronRight size={12} />
                  )}
                </span>
                <Icon size={14} className="text-[#e1692c] mx-1" />
                <span className="text-[11px] font-medium truncate text-[#333333]">{module.label}</span>
              </div>

              {/* Module Items */}
              {isExpanded && module.children && (
                <div className="bg-white">
                  {module.children.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center h-[22px] cursor-pointer hover:bg-[#e1692c] hover:text-white pl-7 pr-2 ${
                        selected === item.id ? "bg-[#e1692c] text-white" : ""
                      }`}
                      onClick={() => handleItemClick(module, item)}
                      onDoubleClick={() => handleItemClick(module, item)}
                    >
                      <FileText size={12} className={selected === item.id ? "text-white" : "text-[#e1692c]"} />
                      <span className="text-[10px] ml-1 truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
