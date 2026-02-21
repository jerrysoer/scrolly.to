import { ExplainerPage } from "@/components/explainers/shared/ExplainerPage";
import { getSlugsBySection } from "@/lib/explainers/registry";

export function generateStaticParams() {
  return getSlugsBySection("learn").map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ExplainerPage slug={(await params).slug} />;
}
