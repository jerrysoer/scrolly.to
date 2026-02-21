import { ExplainerLayout } from "@/components/explainers/shared/ExplainerLayout";
import { generateExplainerMetadata } from "@/lib/explainers/registry";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return generateExplainerMetadata((await params).slug, "learn");
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <ExplainerLayout slug={(await params).slug} section="learn">
      {children}
    </ExplainerLayout>
  );
}
