import { motion } from "framer-motion";
import { useChapterNavigation } from "@/context/ChapterNavigation";
import { cn } from "@/utils/cn";

/**
 * A small, fixed "go back a page" control — quieter than ContinueCue
 * since revisiting is secondary to moving forward. Hidden entirely on
 * the first chapter (nothing to go back to).
 */
export function BackCue() {
  const { isFirst, goBack } = useChapterNavigation();

  return (
    <motion.button
      type="button"
      onClick={goBack}
      aria-label="Go back a page"
      className={cn(
        "safe-top fixed left-5 top-6 z-40 flex h-10 w-10 items-center justify-center rounded-full",
        "border border-cream/15 bg-pearl/70 text-cream/70 backdrop-blur-sm transition-all duration-500",
        "hover:border-cream/35 hover:text-cream"
      )}
      initial={false}
      animate={{ opacity: isFirst ? 0 : 1, pointerEvents: isFirst ? "none" : "auto" }}
      transition={{ duration: 0.6 }}
    >
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
        <path d="M9 1L1 8L9 15" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </motion.button>
  );
}
