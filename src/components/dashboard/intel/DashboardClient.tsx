"use client";

import { useState, useCallback } from "react";
import { Feed, Story } from "@/lib/types";
import DashboardHeader from "./DashboardHeader";
import CategoryColumn from "./CategoryColumn";
import StoryDrawer from "./StoryDrawer";

interface DashboardClientProps {
  feed: Feed;
}

const CATEGORY_ORDER = [
  "ai_ml",
  "creator_economy",
  "business_strategy",
  "data_economics",
  "dev_tools",
];

export default function DashboardClient({ feed }: DashboardClientProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleClose = useCallback(() => setSelectedStory(null), []);

  const totalStories = Object.values(feed.categories).reduce(
    (sum, cat) => sum + cat.stories.length,
    0
  );

  return (
    <>
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DashboardHeader
          dateLabel={feed.date_label}
          generatedAt={feed.generated_at}
        />

        {/* Story count */}
        <div className="mb-6 text-xs text-text-muted font-mono">
          {totalStories} stories scored
        </div>

        {/* 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {CATEGORY_ORDER.map((key, i) => {
            const category = feed.categories[key];
            if (!category) return null;
            return (
              <CategoryColumn
                key={key}
                categoryKey={key}
                category={category}
                columnIndex={i}
                onStoryClick={setSelectedStory}
              />
            );
          })}
        </div>
      </div>

      <StoryDrawer story={selectedStory} onClose={handleClose} />
    </>
  );
}
