"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  Star,
} from "lucide-react";

interface TreeNode {
  id: string;
  label: string;
  icon?: "folder" | "transaction";
  tcode?: string;
  children?: TreeNode[];
}

const menuTree: TreeNode[] = [
  {
    id: "favorites",
    label: "Favorites",
    icon: "folder",
    children: [
      { id: "fav-fb50", label: "FB50 - Enter G/L Account Document", icon: "transaction", tcode: "FB50" },
      { id: "fav-miro", label: "MIRO - Enter Incoming Invoice", icon: "transaction", tcode: "MIRO" },
      { id: "fav-fbl3n", label: "FBL3N - G/L Account Line Items", icon: "transaction", tcode: "FBL3N" },
    ],
  },
  {
    id: "sap-menu",
    label: "SAP Menu",
    icon: "folder",
    children: [
      {
        id: "office",
        label: "Office",
        icon: "folder",
        children: [
          { id: "workplace", label: "Workplace", icon: "transaction" },
        ],
      },
      {
        id: "cross-app",
        label: "Cross-Application Components",
        icon: "folder",
        children: [],
      },
      {
        id: "logistics",
        label: "Logistics",
        icon: "folder",
        children: [
          {
            id: "mm",
            label: "Materials Management",
            icon: "folder",
            children: [
              {
                id: "mm-invoice",
                label: "Logistics Invoice Verification",
                icon: "folder",
                children: [
                  { id: "miro", label: "MIRO - Enter Incoming Invoice", icon: "transaction", tcode: "MIRO" },
                  { id: "mir7", label: "MIR7 - Park Invoice", icon: "transaction", tcode: "MIR7" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "accounting",
        label: "Accounting",
        icon: "folder",
        children: [
          {
            id: "fi",
            label: "Financial Accounting",
            icon: "folder",
            children: [
              {
                id: "fi-gl",
                label: "General Ledger",
                icon: "folder",
                children: [
                  {
                    id: "fi-gl-document",
                    label: "Document Entry",
                    icon: "folder",
                    children: [
                      { id: "fb50", label: "FB50 - Enter G/L Account Document", icon: "transaction", tcode: "FB50" },
                      { id: "fb01", label: "FB01 - Post Document", icon: "transaction", tcode: "FB01" },
                      { id: "f-02", label: "F-02 - Enter G/L Account Posting", icon: "transaction", tcode: "F-02" },
                    ],
                  },
                  {
                    id: "fi-gl-account",
                    label: "Account",
                    icon: "folder",
                    children: [
                      { id: "fbl3n", label: "FBL3N - G/L Account Line Item Display", icon: "transaction", tcode: "FBL3N" },
                      { id: "fs10n", label: "FS10N - G/L Account Balance", icon: "transaction", tcode: "FS10N" },
                    ],
                  },
                ],
              },
              {
                id: "fi-ap",
                label: "Accounts Payable",
                icon: "folder",
                children: [
                  {
                    id: "fi-ap-document",
                    label: "Document Entry",
                    icon: "folder",
                    children: [
                      { id: "fb60", label: "FB60 - Enter Incoming Invoices", icon: "transaction", tcode: "FB60" },
                      { id: "f-43", label: "F-43 - Enter Vendor Invoice", icon: "transaction", tcode: "F-43" },
                    ],
                  },
                ],
              },
              {
                id: "fi-ar",
                label: "Accounts Receivable",
                icon: "folder",
                children: [
                  {
                    id: "fi-ar-document",
                    label: "Document Entry",
                    icon: "folder",
                    children: [
                      { id: "fb70", label: "FB70 - Enter Outgoing Invoices", icon: "transaction", tcode: "FB70" },
                      { id: "f-22", label: "F-22 - Enter Customer Invoice", icon: "transaction", tcode: "F-22" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "co",
            label: "Controlling",
            icon: "folder",
            children: [],
          },
        ],
      },
      {
        id: "hr",
        label: "Human Resources",
        icon: "folder",
        children: [],
      },
      {
        id: "info-systems",
        label: "Information Systems",
        icon: "folder",
        children: [],
      },
      {
        id: "tools",
        label: "Tools",
        icon: "folder",
        children: [
          {
            id: "abap",
            label: "ABAP Workbench",
            icon: "folder",
            children: [
              { id: "se38", label: "SE38 - ABAP Editor", icon: "transaction", tcode: "SE38" },
              { id: "se80", label: "SE80 - Object Navigator", icon: "transaction", tcode: "SE80" },
            ],
          },
          {
            id: "admin",
            label: "Administration",
            icon: "folder",
            children: [
              { id: "sm37", label: "SM37 - Background Job Overview", icon: "transaction", tcode: "SM37" },
              { id: "su01", label: "SU01 - User Maintenance", icon: "transaction", tcode: "SU01" },
            ],
          },
        ],
      },
    ],
  },
];

interface SAPEasyAccessProps {
  onSelectTransaction: (tcode: string) => void;
}

export default function SAPEasyAccess({ onSelectTransaction }: SAPEasyAccessProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["favorites", "sap-menu", "accounting", "fi", "fi-gl", "fi-gl-document"]));
  const [selected, setSelected] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const handleDoubleClick = (node: TreeNode) => {
    if (node.tcode) {
      onSelectTransaction(node.tcode);
    } else if (node.children) {
      toggleExpand(node.id);
    }
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expanded.has(node.id);
    const isSelected = selected === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center h-6 cursor-pointer hover:bg-[#e5f0fa] ${
            isSelected ? "bg-[#d4edfc]" : ""
          }`}
          style={{ paddingLeft: `${level * 16 + 4}px` }}
          onClick={() => {
            setSelected(node.id);
            if (hasChildren) {
              toggleExpand(node.id);
            }
          }}
          onDoubleClick={() => handleDoubleClick(node)}
        >
          {/* Expand/Collapse Icon */}
          <span className="w-4 h-4 flex items-center justify-center">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={12} className="text-[#6a6d70]" />
              ) : (
                <ChevronRight size={12} className="text-[#6a6d70]" />
              )
            ) : null}
          </span>

          {/* Node Icon */}
          <span className="w-4 h-4 flex items-center justify-center mr-1">
            {node.id === "favorites" ? (
              <Star size={14} className="text-[#df6e0c]" fill="#df6e0c" />
            ) : node.icon === "folder" ? (
              isExpanded ? (
                <FolderOpen size={14} className="text-[#df6e0c]" />
              ) : (
                <Folder size={14} className="text-[#df6e0c]" />
              )
            ) : (
              <FileText size={14} className="text-[#0a6ed1]" />
            )}
          </span>

          {/* Label */}
          <span className="text-xs text-[#32363a] truncate">{node.label}</span>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 bg-white border-r border-[#d9d9d9] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-7 bg-[#e5e5e5] border-b border-[#d9d9d9] flex items-center px-2">
        <span className="text-xs font-semibold text-[#32363a]">SAP Easy Access</span>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-auto py-1">
        {menuTree.map((node) => renderNode(node))}
      </div>
    </div>
  );
}
