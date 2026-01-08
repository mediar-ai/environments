"use client";

import {
  Play,
  Save,
  ArrowLeft,
  LogOut,
  X,
  Printer,
  Search,
  RotateCcw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  PanelLeftOpen,
  MessageSquare,
  HelpCircle,
  Settings,
} from "lucide-react";

interface SAPToolbarProps {
  transaction: string;
  onTransactionChange: (value: string) => void;
  onTransactionExecute: (tcode: string) => void;
  onToggleEasyAccess: () => void;
}

export default function SAPToolbar({
  transaction,
  onTransactionChange,
  onTransactionExecute,
  onToggleEasyAccess,
}: SAPToolbarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && transaction) {
      onTransactionExecute(transaction);
    }
  };

  const ToolbarButton = ({
    icon: Icon,
    title,
    onClick,
    disabled = false,
  }: {
    icon: React.ElementType;
    title: string;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button
      className={`w-[26px] h-[26px] flex items-center justify-center border border-transparent hover:border-[#808080] hover:bg-gradient-to-b hover:from-[#f8f8f8] hover:to-[#e0e0e0] ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={16} className={disabled ? "text-[#bdbdbd]" : "text-[#0a6ed1]"} strokeWidth={1.5} />
    </button>
  );

  const Separator = () => (
    <div className="w-px h-5 bg-[#d9d9d9] mx-1" />
  );

  return (
    <div className="h-9 bg-[#f5f6f7] border-b border-[#d9d9d9] flex items-center px-1 gap-0.5">
      {/* Transaction Code Input - Classic SAP Yellow Command Field */}
      <div className="flex items-center gap-0.5 mr-2">
        <input
          type="text"
          value={transaction}
          onChange={(e) => onTransactionChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="/n"
          className="w-32 h-[22px] px-2 text-xs font-mono bg-[#ffffcc] border border-[#808080] rounded-none focus:border-[#0a6ed1] focus:outline-none shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"
        />
        <button
          onClick={() => transaction && onTransactionExecute(transaction)}
          className="w-[22px] h-[22px] flex items-center justify-center bg-gradient-to-b from-[#f8f8f8] to-[#e8e8e8] border border-[#808080] rounded-none hover:from-[#e8e8e8] hover:to-[#d8d8d8] shadow-[inset_1px_1px_0_#ffffff]"
          title="Enter (Execute Transaction)"
        >
          <Play size={10} className="text-[#107e3e]" fill="#107e3e" />
        </button>
      </div>

      {/* Main Toolbar Buttons */}
      <ToolbarButton icon={Save} title="Save (Ctrl+S)" />
      <ToolbarButton icon={ArrowLeft} title="Back (F3)" />
      <ToolbarButton icon={LogOut} title="Exit (Shift+F3)" />
      <ToolbarButton icon={X} title="Cancel (F12)" />

      <Separator />

      <ToolbarButton icon={Printer} title="Print (Ctrl+P)" />
      <ToolbarButton icon={Search} title="Find (Ctrl+F)" />
      <ToolbarButton icon={RotateCcw} title="Refresh (F5)" />

      <Separator />

      <ToolbarButton icon={ChevronFirst} title="First Page (Ctrl+Page Up)" />
      <ToolbarButton icon={ChevronLeft} title="Previous Page (Page Up)" />
      <ToolbarButton icon={ChevronRight} title="Next Page (Page Down)" />
      <ToolbarButton icon={ChevronLast} title="Last Page (Ctrl+Page Down)" />

      <Separator />

      <ToolbarButton icon={ArrowUp} title="Up" />
      <ToolbarButton icon={ArrowDown} title="Down" />

      <Separator />

      <ToolbarButton icon={PanelLeftOpen} title="Toggle Menu" onClick={onToggleEasyAccess} />

      <div className="flex-1" />

      {/* Right Side */}
      <ToolbarButton icon={MessageSquare} title="Messages" />
      <ToolbarButton icon={Settings} title="Customizing" />
      <ToolbarButton icon={HelpCircle} title="Help (F1)" />
    </div>
  );
}
