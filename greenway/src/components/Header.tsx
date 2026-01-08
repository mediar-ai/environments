"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";

interface Notification {
  id: number;
  type: "alert" | "info" | "success";
  message: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "alert",
    message: "Drug interaction alert: Patient #4521",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "info",
    message: "Lab results ready: Patient #3892",
    time: "15 min ago",
  },
  {
    id: 3,
    type: "success",
    message: "Claim approved: #CLM-2024-0892",
    time: "1 hour ago",
  },
];

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-12 bg-header border-b border-header-border flex items-center px-4 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-header-text-muted">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-header-text">Dashboard</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search patients, charts, orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-4 text-sm bg-header-input border border-header-input-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-1">
        <button className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors">
          New Patient
        </button>
        <button className="px-3 py-1.5 text-xs font-medium bg-header-button text-header-text border border-header-button-border rounded hover:bg-header-button-hover transition-colors">
          New Appointment
        </button>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowUserMenu(false);
          }}
          className="relative p-2 text-header-icon hover:bg-header-hover rounded transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <h3 className="font-semibold text-sm text-gray-800">
                Notifications
              </h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    {notif.type === "alert" && (
                      <AlertTriangle
                        size={16}
                        className="text-amber-500 mt-0.5"
                      />
                    )}
                    {notif.type === "info" && (
                      <Clock size={16} className="text-blue-500 mt-0.5" />
                    )}
                    {notif.type === "success" && (
                      <CheckCircle
                        size={16}
                        className="text-green-500 mt-0.5"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-gray-100">
              <button className="w-full text-xs text-primary hover:underline">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => {
            setShowUserMenu(!showUserMenu);
            setShowNotifications(false);
          }}
          className="flex items-center gap-2 p-1.5 hover:bg-header-hover rounded transition-colors"
        >
          <UserCircle size={24} className="text-header-icon" />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-medium text-header-text">Dr. Smith</p>
            <p className="text-xs text-header-text-muted">Family Medicine</p>
          </div>
          <ChevronDown size={14} className="text-header-icon" />
        </button>

        {showUserMenu && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <p className="font-semibold text-sm text-gray-800">Dr. Smith</p>
              <p className="text-xs text-gray-500">dr.smith@greenway.com</p>
            </div>
            <div className="py-1">
              <button className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings size={14} />
                Settings
              </button>
              <button className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <HelpCircle size={14} />
                Help & Support
              </button>
              <hr className="my-1" />
              <button className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-50 flex items-center gap-2">
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
