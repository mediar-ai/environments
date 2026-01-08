"use client";

import { useState, ReactNode } from "react";
import SAPTitleBar from "./SAPTitleBar";
import SAPMenuBar from "./SAPMenuBar";
import SAPToolbar from "./SAPToolbar";
import SAPStatusBar from "./SAPStatusBar";
import SAPEasyAccess from "./SAPEasyAccess";

interface SAPShellProps {
  children: ReactNode;
}

export default function SAPShell({ children }: SAPShellProps) {
  const [transaction, setTransaction] = useState("");
  const [showEasyAccess, setShowEasyAccess] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Ready");
  const [currentTransaction, setCurrentTransaction] = useState("SESSION_MANAGER");

  const handleTransactionExecute = (tcode: string) => {
    const tc = tcode.toUpperCase();
    setCurrentTransaction(tc);
    setTransaction("");
    setStatusMessage(`Transaction ${tc} started`);

    // Navigate based on transaction code
    if (tc === "FB50") {
      window.location.href = "/fb50";
    } else if (tc === "MIRO") {
      window.location.href = "/miro";
    } else if (tc === "FBL3N") {
      window.location.href = "/fbl3n";
    } else if (tc === "SE38" || tc === "SM37" || tc === "SU01") {
      setStatusMessage(`Transaction ${tc} - Demo not available`);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f5f6f7]">
      {/* SAP Title Bar */}
      <SAPTitleBar transaction={currentTransaction} />

      {/* SAP Menu Bar */}
      <SAPMenuBar />

      {/* SAP Toolbar */}
      <SAPToolbar
        transaction={transaction}
        onTransactionChange={setTransaction}
        onTransactionExecute={handleTransactionExecute}
        onToggleEasyAccess={() => setShowEasyAccess(!showEasyAccess)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* SAP Easy Access Menu (Left Panel) */}
        {showEasyAccess && (
          <SAPEasyAccess onSelectTransaction={handleTransactionExecute} />
        )}

        {/* Transaction Content */}
        <main className="flex-1 overflow-auto bg-[#f5f6f7] p-2">
          {children}
        </main>
      </div>

      {/* SAP Status Bar */}
      <SAPStatusBar message={statusMessage} />
    </div>
  );
}
