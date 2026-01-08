"use client";

import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

interface SAPStatusBarProps {
  message: string;
  type?: "success" | "warning" | "error" | "info";
}

export default function SAPStatusBar({ message, type = "info" }: SAPStatusBarProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={14} className="text-[#107e3e]" />;
      case "warning":
        return <AlertTriangle size={14} className="text-[#df6e0c]" />;
      case "error":
        return <XCircle size={14} className="text-[#bb0000]" />;
      default:
        return <Info size={14} className="text-[#0a6ed1]" />;
    }
  };

  return (
    <div className="h-6 bg-[#f5f6f7] border-t border-[#d9d9d9] flex items-center px-2 select-none">
      {/* Status Message */}
      <div className="flex items-center gap-2 flex-1">
        {getIcon()}
        <span className="text-xs text-[#32363a]">{message}</span>
      </div>

      {/* Right Side Info */}
      <div className="flex items-center gap-4 text-xs text-[#6a6d70]">
        <span>INS</span>
        <span>|</span>
        <span>DEV(1)/800</span>
        <span>|</span>
        <span>SAPTESTER</span>
        <span>|</span>
        <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
}
