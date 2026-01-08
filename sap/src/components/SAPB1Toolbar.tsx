"use client";

import {
  FileText,
  Search,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  Plus,
  Trash2,
  Copy,
  Printer,
  Mail,
  RefreshCw,
} from "lucide-react";

export default function SAPB1Toolbar() {
  const ToolbarButton = ({
    icon: Icon,
    title,
    onClick,
    disabled = false,
    active = false,
  }: {
    icon: React.ElementType;
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
  }) => (
    <button
      className={`w-[28px] h-[28px] flex items-center justify-center rounded transition-colors ${
        disabled
          ? "text-[#c0c0c0] cursor-not-allowed"
          : active
          ? "bg-[#e1692c] text-white"
          : "text-[#e1692c] hover:bg-[#e1692c]/10"
      }`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={18} strokeWidth={1.5} />
    </button>
  );

  const Separator = () => (
    <div className="w-px h-[20px] bg-[#d0d0d0] mx-1" />
  );

  return (
    <div className="h-[36px] bg-white border-b border-[#d0d0d0] flex items-center px-2 gap-0.5">
      {/* Document Operations */}
      <ToolbarButton icon={FileText} title="New Document (Ctrl+N)" />
      <ToolbarButton icon={Search} title="Find (Ctrl+F)" />

      <Separator />

      {/* Navigation */}
      <ToolbarButton icon={ChevronFirst} title="First Record" />
      <ToolbarButton icon={ChevronLeft} title="Previous Record" />
      <ToolbarButton icon={ChevronRight} title="Next Record" />
      <ToolbarButton icon={ChevronLast} title="Last Record" />

      <Separator />

      {/* Data Operations */}
      <ToolbarButton icon={Plus} title="Add Row" />
      <ToolbarButton icon={Trash2} title="Delete Row" />
      <ToolbarButton icon={Copy} title="Duplicate" />

      <Separator />

      {/* Output */}
      <ToolbarButton icon={Printer} title="Print" />
      <ToolbarButton icon={Mail} title="Email" />
      <ToolbarButton icon={RefreshCw} title="Refresh" />

      <div className="flex-1" />

      {/* Mode Indicator */}
      <div className="flex items-center gap-2 text-[11px] mr-2">
        <span className="px-2 py-0.5 bg-[#e1692c] text-white rounded text-[10px] font-medium">
          Add
        </span>
      </div>
    </div>
  );
}
