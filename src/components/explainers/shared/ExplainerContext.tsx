"use client";

import { createContext, useContext } from "react";
import type { Section } from "@/lib/explainers/registry";

interface ExplainerContextValue {
  scopeName: string;
  themeKey: string;
  section: Section;
}

export const ExplainerContext = createContext<ExplainerContextValue>({
  scopeName: "",
  themeKey: "",
  section: "learn",
});

export function useExplainer() {
  return useContext(ExplainerContext);
}
