"use client";

import { useState } from "react";

interface MenuItem {
  label: string;
  items?: { label: string; shortcut?: string; divider?: boolean }[];
}

const menuItems: MenuItem[] = [
  {
    label: "Menu",
    items: [
      { label: "Local File...", shortcut: "Ctrl+L" },
      { label: "Object", divider: true },
      { label: "End Session" },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Cancel", shortcut: "F12" },
      { label: "Undo", shortcut: "Ctrl+Z", divider: true },
      { label: "Cut", shortcut: "Ctrl+X" },
      { label: "Copy", shortcut: "Ctrl+C" },
      { label: "Paste", shortcut: "Ctrl+V" },
      { label: "Select All", shortcut: "Ctrl+A", divider: true },
      { label: "Find...", shortcut: "Ctrl+F" },
      { label: "Find Next", shortcut: "Ctrl+G" },
    ],
  },
  {
    label: "Favorites",
    items: [
      { label: "Add", shortcut: "Ctrl+Shift+F" },
      { label: "Delete", divider: true },
      { label: "Insert Folder" },
      { label: "Move" },
      { label: "Rename" },
    ],
  },
  {
    label: "Extras",
    items: [
      { label: "Settings..." },
      { label: "Set Start Transaction" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Create Session", shortcut: "Ctrl+N" },
      { label: "End Session", divider: true },
      { label: "User Profile" },
      { label: "Services" },
      { label: "Utilities" },
      { label: "List" },
      { label: "Own Spool Requests" },
      { label: "Own Jobs", divider: true },
      { label: "Status..." },
      { label: "Log Off" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Application Help", shortcut: "F1" },
      { label: "SAP Library", divider: true },
      { label: "Glossary" },
      { label: "Release Notes" },
      { label: "SAP Service Marketplace" },
      { label: "Settings...", divider: true },
      { label: "About..." },
    ],
  },
];

export default function SAPMenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="h-6 bg-[#f5f6f7] border-b border-[#d9d9d9] flex items-center px-1 select-none">
      {menuItems.map((menu) => (
        <div key={menu.label} className="relative">
          <button
            className={`px-3 h-5 text-xs hover:bg-[#e5f0fa] ${
              activeMenu === menu.label ? "bg-[#e5f0fa]" : ""
            }`}
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
          >
            {menu.label}
          </button>

          {activeMenu === menu.label && menu.items && (
            <div className="absolute left-0 top-full z-50 bg-white border border-[#c4c4c4] shadow-md min-w-[200px]">
              {menu.items.map((item, idx) => (
                <div key={idx}>
                  <button className="w-full px-4 py-1 text-xs text-left hover:bg-[#e5f0fa] flex justify-between items-center">
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-[#6a6d70] ml-4">{item.shortcut}</span>
                    )}
                  </button>
                  {item.divider && <hr className="border-[#e5e5e5] my-0.5" />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Click outside to close */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
