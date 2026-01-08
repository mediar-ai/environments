"use client";

import { Minus, Square, X, RefreshCw } from "lucide-react";

interface SAPB1TitleBarProps {
  currentWindow: string;
  onSwitchVersion?: () => void;
}

export default function SAPB1TitleBar({ currentWindow, onSwitchVersion }: SAPB1TitleBarProps) {
  return (
    <div className="h-[32px] bg-[#1a1a2e] flex items-center justify-between select-none">
      {/* Left - SAP Logo and Title */}
      <div className="flex items-center h-full">
        {/* SAP B1 Logo */}
        <div className="flex items-center h-full px-3 bg-[#e1692c]">
          <span className="text-white text-[13px] font-bold tracking-wide">SAP</span>
          <span className="text-white text-[10px] ml-1 opacity-80">Business One</span>
        </div>
        <span className="text-white text-[12px] font-normal ml-3">{currentWindow}</span>

        {/* Version Switcher */}
        {onSwitchVersion && (
          <button
            onClick={onSwitchVersion}
            className="ml-4 px-2 py-1 text-[10px] text-white/70 hover:text-white hover:bg-white/10 rounded flex items-center gap-1"
            title="Switch to S/4HANA version"
          >
            <RefreshCw size={10} />
            <span>S/4HANA</span>
          </button>
        )}
      </div>

      {/* Center - Company Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-white/80 text-[11px]">ACME Corporation</span>
      </div>

      {/* Right - Window Controls */}
      <div className="flex items-center h-full">
        <button className="w-[45px] h-full flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors">
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <button className="w-[45px] h-full flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors">
          <Square size={12} strokeWidth={1.5} />
        </button>
        <button className="w-[45px] h-full flex items-center justify-center text-white/80 hover:bg-[#e81123] transition-colors">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
