"use client";

import { useState } from "react";

interface MenuItem {
  label: string;
  items?: { label: string; shortcut?: string; divider?: boolean }[];
}

const menuItems: MenuItem[] = [
  {
    label: "File",
    items: [
      { label: "New", shortcut: "Ctrl+N" },
      { label: "Open", shortcut: "Ctrl+O" },
      { label: "Close" },
      { label: "Close All", divider: true },
      { label: "Save", shortcut: "Ctrl+S" },
      { label: "Save as Draft", divider: true },
      { label: "Print", shortcut: "Ctrl+P" },
      { label: "Print Preview" },
      { label: "Export to PDF", divider: true },
      { label: "Exit" },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", shortcut: "Ctrl+Z" },
      { label: "Redo", shortcut: "Ctrl+Y", divider: true },
      { label: "Cut", shortcut: "Ctrl+X" },
      { label: "Copy", shortcut: "Ctrl+C" },
      { label: "Paste", shortcut: "Ctrl+V" },
      { label: "Select All", shortcut: "Ctrl+A" },
    ],
  },
  {
    label: "View",
    items: [
      { label: "System Information" },
      { label: "User-Defined Fields", divider: true },
      { label: "Restore User Interface" },
    ],
  },
  {
    label: "Data",
    items: [
      { label: "Add", shortcut: "Ctrl+A" },
      { label: "Find", shortcut: "Ctrl+F" },
      { label: "First Record", shortcut: "Ctrl+Shift+F" },
      { label: "Previous Record" },
      { label: "Next Record" },
      { label: "Last Record", divider: true },
      { label: "Duplicate" },
      { label: "Remove" },
    ],
  },
  {
    label: "Go To",
    items: [
      { label: "Main Menu", shortcut: "Ctrl+0" },
      { label: "Financials" },
      { label: "Sales - A/R" },
      { label: "Purchasing - A/P" },
      { label: "Business Partners" },
      { label: "Banking" },
      { label: "Inventory" },
    ],
  },
  {
    label: "Modules",
    items: [
      { label: "Administration" },
      { label: "Financials" },
      { label: "Sales - A/R" },
      { label: "Purchasing - A/P" },
      { label: "Business Partners" },
      { label: "Banking" },
      { label: "Inventory" },
      { label: "Production" },
      { label: "MRP" },
      { label: "Service" },
      { label: "Human Resources" },
      { label: "Reports" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Queries", shortcut: "Ctrl+Q" },
      { label: "User-Defined Windows", divider: true },
      { label: "My Personal Settings" },
      { label: "Form Settings" },
    ],
  },
  {
    label: "Window",
    items: [
      { label: "Cascade" },
      { label: "Tile Horizontally" },
      { label: "Tile Vertically" },
      { label: "Close All Windows" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "SAP Business One Help", shortcut: "F1" },
      { label: "Context Help", divider: true },
      { label: "Support Portal" },
      { label: "About SAP Business One" },
    ],
  },
];

export default function SAPB1MenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="h-[28px] bg-[#f5f5f5] border-b border-[#d0d0d0] flex items-center select-none">
      {menuItems.map((menu) => (
        <div key={menu.label} className="relative">
          <button
            className={`px-3 h-[26px] text-[12px] text-[#333333] hover:bg-[#e1692c] hover:text-white transition-colors ${
              activeMenu === menu.label ? "bg-[#e1692c] text-white" : ""
            }`}
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
          >
            {menu.label}
          </button>

          {activeMenu === menu.label && menu.items && (
            <div className="absolute left-0 top-full z-50 bg-white border border-[#d0d0d0] shadow-lg min-w-[220px] py-1">
              {menu.items.map((item, idx) => (
                <div key={idx}>
                  <button className="w-full px-4 py-1.5 text-[12px] text-left text-[#333333] hover:bg-[#e1692c] hover:text-white flex justify-between items-center transition-colors">
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-[#888888] ml-6 text-[11px]">{item.shortcut}</span>
                    )}
                  </button>
                  {item.divider && <hr className="border-[#e0e0e0] my-1" />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {activeMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
