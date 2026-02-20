import { CategoryData, Story } from "@/lib/types";
import StoryCard from "./StoryCard";

interface CategoryColumnProps {
  categoryKey: string;
  category: CategoryData;
  columnIndex: number;
  onStoryClick: (story: Story) => void;
}

export default function CategoryColumn({
  category,
  columnIndex,
  onStoryClick,
}: CategoryColumnProps) {
  return (
    <div
      className="min-w-0"
      style={{
        animation: "fade-in-up 400ms ease-out both",
        animationDelay: `${columnIndex * 80}ms`,
      }}
    >
      {/* Category pill */}
      <div className="mb-3">
        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase bg-category-pill-bg text-category-pill-text">
          {category.label}
        </span>
        <span className="ml-2 text-xs text-text-muted font-mono">
          {category.stories.length}
        </span>
      </div>

      {/* Story stack */}
      <div className="space-y-2">
        {category.stories.map((story, i) => (
          <StoryCard
            key={story.url}
            story={story}
            index={i}
            onClick={() => onStoryClick(story)}
          />
        ))}
        {category.stories.length === 0 && (
          <p className="text-sm text-text-muted italic px-3 py-6">
            No stories scored today.
          </p>
        )}
      </div>
    </div>
  );
}
