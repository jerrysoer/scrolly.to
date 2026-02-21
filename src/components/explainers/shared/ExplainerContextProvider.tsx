"use client";

import { ExplainerContext } from "./ExplainerContext";
import type { Section } from "@/lib/explainers/registry";

interface ExplainerContextProviderProps {
  scopeName: string;
  themeKey: string;
  section: Section;
  children: React.ReactNode;
}

export function ExplainerContextProvider({
  scopeName,
  themeKey,
  section,
  children,
}: ExplainerContextProviderProps) {
  return (
    <ExplainerContext.Provider value={{ scopeName, themeKey, section }}>
      {children}
    </ExplainerContext.Provider>
  );
}
