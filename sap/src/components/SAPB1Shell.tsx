"use client";

import { useState, ReactNode } from "react";
import SAPB1TitleBar from "./SAPB1TitleBar";
import SAPB1MenuBar from "./SAPB1MenuBar";
import SAPB1Toolbar from "./SAPB1Toolbar";
import SAPB1ModulesMenu from "./SAPB1ModulesMenu";
import SAPB1StatusBar from "./SAPB1StatusBar";

interface SAPB1ShellProps {
  children: ReactNode;
  onSwitchVersion?: () => void;
}

export default function SAPB1Shell({ children, onSwitchVersion }: SAPB1ShellProps) {
  const [currentModule, setCurrentModule] = useState("Financials");
  const [currentWindow, setCurrentWindow] = useState("Journal Entry");
  const [statusMessage, setStatusMessage] = useState("Ready");

  const handleModuleSelect = (module: string, windowName: string, path?: string) => {
    setCurrentModule(module);
    setCurrentWindow(windowName);
    setStatusMessage(`Opening ${windowName}...`);
    if (path) {
      globalThis.window.location.href = path;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#ece9d8]">
      {/* SAP B1 Title Bar */}
      <SAPB1TitleBar
        currentWindow={currentWindow}
        onSwitchVersion={onSwitchVersion}
      />

      {/* SAP B1 Menu Bar */}
      <SAPB1MenuBar />

      {/* SAP B1 Toolbar */}
      <SAPB1Toolbar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Modules Menu (Left) */}
        <SAPB1ModulesMenu
          onSelectItem={handleModuleSelect}
          currentModule={currentModule}
        />

        {/* Document Area */}
        <main className="flex-1 overflow-auto bg-[#ece9d8] p-1">
          {children}
        </main>
      </div>

      {/* SAP B1 Status Bar */}
      <SAPB1StatusBar message={statusMessage} />
    </div>
  );
}
