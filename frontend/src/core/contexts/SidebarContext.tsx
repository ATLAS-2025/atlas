"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type SidebarMode = "home" | "project";

interface SidebarContextType {
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SidebarMode>("home");

  return (
    <SidebarContext.Provider value={{ mode, setMode }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
