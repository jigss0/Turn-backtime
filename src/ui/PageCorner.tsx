import { motion } from "framer-motion";
import { useChapterNavigation } from "@/context/ChapterNavigation";

/**
 * A small folded-paper corner fixed at the bottom-right of the book,
 * hinting that the page can be turned. Lifts slightly on hover, like a
 * real page corner being picked up. Purely a secondary affordance —
 * ContinueCue remains the primary way to advance.
 */
export function PageCorner() {
  const { isLast, goNext } = useChapterNavigation();

  if (isLast) return null;

  return (
    <motion.button
      type="button"
      onClick={goNext}
      aria-label="Turn the page"
      className="group fixed bottom-0 right-0 z-40 h-16 w-16 sm:h-20 sm:w-20"
      whileHover="lift"
      initial="rest"
    >
      <motion.span
        className="absolute bottom-0 right-0 block h-full w-full origin-bottom-right"
        style={{
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
          background: "linear-gradient(315deg, #E7D2A6 0%, #B9975B 55%, #4A1F2C 100%)",
          boxShadow: "-6px -6px 16px -8px rgba(42,15,24,0.35)",
        }}
        variants={{
          rest: { scale: 1, rotate: 0 },
          lift: { scale: 1.08, rotate: -3 },
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.button>
  );
}
