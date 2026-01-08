"use client";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center bg-[#f5f5f5]">
      <div className="text-center p-8 bg-white border border-[#d0d0d0] shadow-lg max-w-md rounded">
        {/* SAP B1 Logo */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-[#e1692c] rounded flex items-center justify-center shadow-md">
            <span className="text-xl font-black text-white">SAP</span>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-[#333333] mb-1">
          SAP Business One
        </h1>
        <p className="text-[11px] text-[#666666] mb-6">
          Select a module from the menu on the left to begin
        </p>

        {/* Company Info */}
        <div className="bg-[#f9f9f9] border border-[#e0e0e0] p-4 mb-4 rounded">
          <div className="text-[11px] space-y-1 text-left text-[#333333]">
            <p><strong className="text-[#e1692c]">Company:</strong> ACME Corporation</p>
            <p><strong className="text-[#e1692c]">Database:</strong> SBO_ACME_LIVE</p>
            <p><strong className="text-[#e1692c]">User:</strong> manager</p>
            <p><strong className="text-[#e1692c]">Server:</strong> SBOSERVER01</p>
          </div>
        </div>

        {/* Quick Access */}
        <div className="text-[11px] text-left">
          <p className="font-semibold text-[#e1692c] mb-2">Quick Access:</p>
          <div className="grid grid-cols-2 gap-2">
            <a href="/b1/journal" className="p-2 bg-white hover:bg-[#e1692c] hover:text-white border border-[#d0d0d0] text-[#333333] rounded transition-colors">
              Journal Entry
            </a>
            <a href="/b1/invoice" className="p-2 bg-white hover:bg-[#e1692c] hover:text-white border border-[#d0d0d0] text-[#333333] rounded transition-colors">
              A/R Invoice
            </a>
            <a href="/b1/ap-invoice" className="p-2 bg-white hover:bg-[#e1692c] hover:text-white border border-[#d0d0d0] text-[#333333] rounded transition-colors">
              A/P Invoice
            </a>
            <a href="/" className="p-2 bg-white hover:bg-[#e1692c] hover:text-white border border-[#d0d0d0] text-[#333333] rounded transition-colors">
              Reports
            </a>
          </div>
        </div>

        {/* Version Switch Info */}
        <div className="mt-6 pt-4 border-t border-[#e0e0e0]">
          <p className="text-[10px] text-[#888888]">
            Use the button in the title bar to switch to S/4HANA version
          </p>
        </div>
      </div>
    </div>
  );
}
