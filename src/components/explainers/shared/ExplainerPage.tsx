"use client";

import dynamic from "next/dynamic";
import { getExplainer } from "@/lib/explainers/registry";

interface ExplainerPageProps {
  slug: string;
}

export function ExplainerPage({ slug }: ExplainerPageProps) {
  const config = getExplainer(slug);
  if (!config) return null;

  const Component = dynamic(config.component, {
    loading: () => <div className="min-h-screen" />,
  });

  return <Component />;
}
