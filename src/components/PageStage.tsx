import { useEffect, useRef, type ReactNode, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chapterOrder, type ChapterId } from "@/data/config";
import { useChapterNavigation } from "@/context/ChapterNavigation";
import { motion as motionTokens } from "@/theme/tokens";
import { PageCorner } from "@/ui/PageCorner";

interface PageStageProps {
  /** One entry per id in chapterOrder — the actual chapter component */
  chapters: Partial<Record<ChapterId, ReactNode>>;
}

/**
 * The book itself. Renders exactly one chapter at a time, full-screen,
 * and turns between them with a cinematic page-flip rather than a
 * scroll. Owns keyboard (arrow keys) and swipe navigation.
 *
 * Must be rendered inside a <ChapterNavigationProvider> — App.tsx
 * provides this at the top level so sibling controls (BackCue,
 * ProgressDots) can also read the same navigation state.
 */
export function PageStage({ chapters }: PageStageProps) {
  const { currentIndex, currentId, direction, goNext, goBack } = useChapterNavigation();
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goBack]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 60;
    if (deltaX < -SWIPE_THRESHOLD) goNext();
    if (deltaX > SWIPE_THRESHOLD) goBack();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      style={{ perspective: 1800 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentId}
          initial={{ opacity: 0, rotateY: direction > 0 ? 8 : -8, x: direction > 0 ? 40 : -40, scale: 0.985 }}
          animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: direction > 0 ? -8 : 8, x: direction > 0 ? -40 : 40, scale: 0.985 }}
          transition={{ duration: motionTokens.pageTurn, ease: motionTokens.chapterEnterEase }}
          className="absolute inset-0 h-dvh w-full overflow-y-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {chapters[currentId]}
        </motion.div>
      </AnimatePresence>

      <PageCorner />

      <span className="sr-only" aria-live="polite">
        Chapter {currentIndex + 1} of {chapterOrder.length}
      </span>
    </div>
  );
}
