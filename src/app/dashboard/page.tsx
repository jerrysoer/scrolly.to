import { Feed } from "@/lib/types";
import DashboardClient from "@/components/dashboard/intel/DashboardClient";

export const revalidate = 3600;

const FEED_URL =
  "https://api.github.com/repos/jerrysoer/scrolly-intel/contents/public/feed.json";

async function fetchFeed(): Promise<Feed | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(FEED_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3.raw",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function IntelPage() {
  const feed = await fetchFeed();

  if (!feed) {
    return (
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-lg text-text-muted mb-2">No feed data available</p>
          <p className="text-sm text-text-muted">
            Could not load feed from source. Check that GITHUB_TOKEN is configured.
          </p>
        </div>
      </div>
    );
  }

  return <DashboardClient feed={feed} />;
}
