import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useChapterNavigation } from "@/context/ChapterNavigation";

interface ContinueCueProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * The book's page-turn control. Defaults to advancing to the next
 * chapter via the navigation context — pass onClick only to override
 * that (e.g. the opening chapter's "Begin"). Quiet and breathing rather
 * than a loud button, since this is the only "turn the page" gesture
 * most chapters need.
 */
export function ContinueCue({ label = "Continue", onClick, className }: ContinueCueProps) {
  const { goNext } = useChapterNavigation();
  const handleClick = onClick ?? goNext;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={cn(
        "mt-16 flex flex-col items-center gap-3 text-cream/50",
        "cursor-pointer transition-colors duration-500 hover:text-cream/85",
        className
      )}
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-whisper uppercase tracking-wider3">{label}</span>
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
        <path d="M0 7H21M21 7L15 1M21 7L15 13" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.button>
  );
}
