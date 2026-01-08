"use client";

import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

interface SAPB1StatusBarProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
}

export default function SAPB1StatusBar({ message, type = "info" }: SAPB1StatusBarProps) {
  const getMessageStyle = () => {
    switch (type) {
      case "success":
        return "bg-[#dff0d8] text-[#3c763d]";
      case "warning":
        return "bg-[#fcf8e3] text-[#8a6d3b]";
      case "error":
        return "bg-[#f2dede] text-[#a94442]";
      default:
        return "bg-[#d9edf7] text-[#31708f]";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={14} />;
      case "warning":
        return <AlertCircle size={14} />;
      case "error":
        return <XCircle size={14} />;
      default:
        return <Info size={14} />;
    }
  };

  return (
    <div className="h-[26px] bg-[#f5f5f5] border-t border-[#d0d0d0] flex items-center px-2 select-none">
      {/* Status Message */}
      <div className={`flex items-center gap-2 px-3 py-0.5 rounded text-[11px] ${getMessageStyle()}`}>
        {getIcon()}
        <span>{message}</span>
      </div>

      <div className="flex-1" />

      {/* Right Side Info Boxes */}
      <div className="flex items-center gap-1">
        <div className="px-3 py-0.5 bg-white border border-[#d0d0d0] text-[10px] text-[#666666]">
          <span className="text-[#e1692c] font-medium">ACME Corp</span>
        </div>
        <div className="px-3 py-0.5 bg-white border border-[#d0d0d0] text-[10px] text-[#666666]">
          manager
        </div>
        <div className="px-3 py-0.5 bg-white border border-[#d0d0d0] text-[10px] text-[#666666]">
          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
