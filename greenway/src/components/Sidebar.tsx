"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  FileText,
  ClipboardList,
  Settings,
  BarChart3,
  MessageSquare,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Home,
  Stethoscope,
  Pill,
  FlaskConical,
  Activity,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { icon: <Home size={18} />, label: "Dashboard", href: "/" },
  {
    icon: <Calendar size={18} />,
    label: "Schedule",
    href: "/schedule",
    children: [
      { label: "Today's Appointments", href: "/schedule" },
      { label: "Weekly View", href: "/schedule" },
      { label: "Manage Slots", href: "/schedule" },
    ],
  },
  {
    icon: <Users size={18} />,
    label: "Patients",
    href: "/patients",
    children: [
      { label: "Patient Registry", href: "/patients" },
      { label: "New Patient", href: "/patients/new" },
      { label: "Search", href: "/patients" },
    ],
  },
  {
    icon: <FileText size={18} />,
    label: "Charts",
    children: [
      { label: "Active Charts", href: "/patients/MRN-4521" },
      { label: "Templates", href: "/" },
      { label: "Documents", href: "/" },
    ],
  },
  {
    icon: <Stethoscope size={18} />,
    label: "Clinical",
    children: [
      { label: "Orders", href: "/" },
      { label: "Results", href: "/lab" },
      { label: "Referrals", href: "/" },
    ],
  },
  {
    icon: <Pill size={18} />,
    label: "Medications",
    children: [
      { label: "e-Prescribe", href: "/" },
      { label: "Medication List", href: "/" },
      { label: "Drug Interactions", href: "/" },
    ],
  },
  {
    icon: <FlaskConical size={18} />,
    label: "Lab",
    href: "/lab",
    children: [
      { label: "Lab Orders", href: "/lab" },
      { label: "Lab Results", href: "/lab" },
      { label: "Pending", href: "/lab" },
    ],
  },
  {
    icon: <CreditCard size={18} />,
    label: "Billing",
    children: [
      { label: "Claims", href: "/" },
      { label: "Payments", href: "/" },
      { label: "Collections", href: "/" },
    ],
  },
  {
    icon: <BarChart3 size={18} />,
    label: "Reports",
    children: [
      { label: "Clinical Reports", href: "/" },
      { label: "Financial Reports", href: "/" },
      { label: "Quality Metrics", href: "/" },
    ],
  },
  {
    icon: <MessageSquare size={18} />,
    label: "Messages",
    href: "/",
  },
  { icon: <Settings size={18} />, label: "Settings", href: "/" },
];

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Patients"]);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`bg-sidebar text-sidebar-text h-screen flex flex-col transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="h-12 flex items-center px-3 border-b border-sidebar-border">
        <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">+</span>
        </div>
        {!collapsed && (
          <span className="ml-2 font-semibold text-white text-sm">
            Greenway Health
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.href && !item.children ? (
              <Link
                href={item.href}
                className={`w-full flex items-center px-3 py-2 text-sm hover:bg-sidebar-hover transition-colors ${
                  isActive(item.href) ? "bg-sidebar-hover border-l-2 border-primary" : ""
                }`}
              >
                <span className={isActive(item.href) ? "text-primary" : "text-sidebar-icon"}>{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                )}
              </Link>
            ) : (
              <button
                onClick={() => toggleExpand(item.label)}
                className={`w-full flex items-center px-3 py-2 text-sm hover:bg-sidebar-hover transition-colors ${
                  expandedItems.includes(item.label) ? "bg-sidebar-hover" : ""
                }`}
              >
                <span className="text-sidebar-icon">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left">{item.label}</span>
                    {item.children && (
                      <span className="text-sidebar-icon">
                        {expandedItems.includes(item.label) ? (
                          <ChevronDown size={14} />
                        ) : (
                          <ChevronRight size={14} />
                        )}
                      </span>
                    )}
                  </>
                )}
              </button>
            )}
            {/* Submenu */}
            {!collapsed &&
              item.children &&
              expandedItems.includes(item.label) && (
                <div className="bg-sidebar-submenu">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={`block pl-10 pr-3 py-1.5 text-xs hover:bg-sidebar-hover hover:text-white transition-colors ${
                        pathname === child.href ? "text-white bg-sidebar-hover" : "text-sidebar-text-muted"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center border-t border-sidebar-border hover:bg-sidebar-hover transition-colors"
      >
        <ChevronRight
          size={16}
          className={`text-sidebar-icon transition-transform ${
            collapsed ? "" : "rotate-180"
          }`}
        />
      </button>
    </aside>
  );
}
