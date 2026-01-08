"use client";

import { Minus, Square, X, Copy } from "lucide-react";

interface SAPTitleBarProps {
  transaction: string;
}

export default function SAPTitleBar({ transaction }: SAPTitleBarProps) {
  const getTitle = () => {
    switch (transaction) {
      case "FB50":
        return "Enter G/L Account Document: Company Code 1000";
      case "MIRO":
        return "Enter Incoming Invoice: Company Code 1000";
      case "FBL3N":
        return "G/L Account Line Item Display";
      default:
        return "SAP Easy Access";
    }
  };

  return (
    <div className="h-[30px] bg-gradient-to-b from-[#4a6785] to-[#354a5f] flex items-center justify-between select-none border-b border-[#2a3a4f]">
      {/* Left - SAP Logo and Title */}
      <div className="flex items-center h-full">
        {/* SAP Logo Box */}
        <div className="flex items-center justify-center w-[30px] h-full bg-[#f0ab00]">
          <svg viewBox="0 0 46 24" className="h-[14px]" fill="#000000">
            <path d="M5.5 0.3C2.5 0.3 0 2.8 0 5.8v12.4c0 3 2.5 5.5 5.5 5.5h7.3l3.5-11.5L19.8 24h7.3c3 0 5.5-2.5 5.5-5.5V5.8c0-3-2.5-5.5-5.5-5.5H5.5z"/>
            <text x="16" y="17" fontFamily="Arial Black, Arial" fontSize="14" fontWeight="900" fill="white" textAnchor="middle">SAP</text>
          </svg>
        </div>
        <span className="text-white text-[12px] font-normal px-3 tracking-wide">{getTitle()}</span>
      </div>

      {/* Right - Window Controls (Windows 11 style) */}
      <div className="flex items-center h-full">
        <button className="w-[46px] h-full flex items-center justify-center text-white/90 hover:bg-white/10 transition-colors" title="Minimize">
          <Minus size={12} strokeWidth={1} />
        </button>
        <button className="w-[46px] h-full flex items-center justify-center text-white/90 hover:bg-white/10 transition-colors" title="Maximize">
          <Copy size={10} strokeWidth={1} className="rotate-180" />
        </button>
        <button className="w-[46px] h-full flex items-center justify-center text-white/90 hover:bg-[#c42b1c] transition-colors" title="Close">
          <X size={14} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
