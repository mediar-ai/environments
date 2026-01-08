"use client";

import { useState, useEffect, ReactNode } from "react";
import SAPShell from "./SAPShell";
import SAPB1Shell from "./SAPB1Shell";

interface SAPVersionSwitchProps {
  children: ReactNode;
  b1Children?: ReactNode;
}

export default function SAPVersionSwitch({ children, b1Children }: SAPVersionSwitchProps) {
  const [version, setVersion] = useState<"s4" | "b1">("b1"); // Default to B1 since user uses B1
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved preference
    const saved = localStorage.getItem("sap-version");
    if (saved === "s4" || saved === "b1") {
      setVersion(saved);
    }
  }, []);

  const switchVersion = () => {
    const newVersion = version === "s4" ? "b1" : "s4";
    setVersion(newVersion);
    localStorage.setItem("sap-version", newVersion);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (version === "b1") {
    return (
      <SAPB1Shell onSwitchVersion={switchVersion}>
        {b1Children || children}
      </SAPB1Shell>
    );
  }

  return (
    <SAPShellWithSwitch onSwitchVersion={switchVersion}>
      {children}
    </SAPShellWithSwitch>
  );
}

// Extended S/4 shell with switch button
function SAPShellWithSwitch({
  children,
  onSwitchVersion
}: {
  children: ReactNode;
  onSwitchVersion: () => void;
}) {
  return (
    <div className="relative">
      {/* Version switch button */}
      <button
        onClick={onSwitchVersion}
        className="absolute top-1 right-40 z-50 px-2 py-0.5 text-[10px] text-white/80 hover:text-white hover:bg-white/20 rounded flex items-center gap-1 transition-colors"
        title="Switch to SAP Business One"
      >
        Switch to B1
      </button>
      <SAPShell>{children}</SAPShell>
    </div>
  );
}
