import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { chapterOrder, type ChapterId } from "@/data/config";

interface ChapterNavigationValue {
  currentIndex: number;
  currentId: ChapterId;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  /** 1 when the most recent navigation moved forward, -1 when it moved back — drives PageStage's flip direction */
  direction: 1 | -1;
  goNext: () => void;
  goBack: () => void;
  goTo: (index: number) => void;
}

const ChapterNavigationContext = createContext<ChapterNavigationValue | null>(null);

/**
 * Owns "which chapter is currently open" for the whole book-like
 * experience, plus the direction of the most recent move. This replaces
 * scroll position as the source of truth — nothing here reads or writes
 * window.scrollY. Direction is updated in the same state transition as
 * the index so PageStage never renders a stale flip direction.
 */
export function ChapterNavigationProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = chapterOrder.length;

  const clamp = (i: number) => Math.max(0, Math.min(total - 1, i));

  const navigateTo = (index: number) => {
    const target = clamp(index);
    setDirection(target >= currentIndex ? 1 : -1);
    setCurrentIndex(target);
  };

  const value = useMemo<ChapterNavigationValue>(
    () => ({
      currentIndex,
      currentId: chapterOrder[currentIndex],
      total,
      isFirst: currentIndex === 0,
      isLast: currentIndex === total - 1,
      direction,
      goNext: () => navigateTo(currentIndex + 1),
      goBack: () => navigateTo(currentIndex - 1),
      goTo: (index: number) => navigateTo(index),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIndex, direction, total]
  );

  return <ChapterNavigationContext.Provider value={value}>{children}</ChapterNavigationContext.Provider>;
}

/**
 * Reads the current chapter-navigation state. Must be used within
 * <ChapterNavigationProvider> (PageStage provides this automatically).
 */
export function useChapterNavigation(): ChapterNavigationValue {
  const ctx = useContext(ChapterNavigationContext);
  if (!ctx) {
    throw new Error("useChapterNavigation must be used within a ChapterNavigationProvider");
  }
  return ctx;
}
