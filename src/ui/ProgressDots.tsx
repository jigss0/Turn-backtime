import { chapterOrder } from "@/data/config";
import { cn } from "@/utils/cn";
import { accent } from "@/theme/tokens";
import { useChapterNavigation } from "@/context/ChapterNavigation";

/**
 * A quiet column of dots marking progress through the book — and, unlike
 * the old scroll-based version, an actual page picker: tapping a dot
 * jumps straight to that chapter.
 */
export function ProgressDots() {
  const { currentIndex, goTo } = useChapterNavigation();

  return (
    <div
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:right-8 sm:flex"
    >
      {chapterOrder.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Go to chapter ${i + 1}`}
          aria-current={i === currentIndex}
          className="flex h-4 w-4 items-center justify-center"
        >
          <span
            className={cn(
              "w-1.5 rounded-full transition-all duration-700 ease-cinematic",
              i === currentIndex ? cn(accent.bg, "h-4") : "h-1.5 bg-cream/25 hover:bg-cream/50"
            )}
          />
        </button>
      ))}
    </div>
  );
}
