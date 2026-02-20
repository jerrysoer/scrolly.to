import { promises as fs } from "fs";
import path from "path";
import { Feed } from "@/lib/types";
import DashboardClient from "@/components/dashboard/intel/DashboardClient";

export const revalidate = 3600;

export default async function IntelPage() {
  let feed: Feed;

  try {
    const feedPath = path.join(process.cwd(), "public", "feed.json");
    const raw = await fs.readFile(feedPath, "utf-8");
    feed = JSON.parse(raw);
  } catch {
    return (
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-lg text-text-muted mb-2">No feed data available</p>
          <p className="text-sm text-text-muted">
            Place a <code className="font-mono bg-surface px-1.5 py-0.5 rounded">feed.json</code> file in the <code className="font-mono bg-surface px-1.5 py-0.5 rounded">public/</code> directory.
          </p>
        </div>
      </div>
    );
  }

  return <DashboardClient feed={feed} />;
}
