import { motion } from "framer-motion";
import type { TimelineEntry } from "@/data/types";
import { accent } from "@/theme/tokens";
import { cn } from "@/utils/cn";

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
  align: "left" | "right";
}

const icons: Record<NonNullable<TimelineEntry["icon"]>, string> = {
  trip: "✦",
  goal: "◆",
  celebration: "✶",
  dream: "☾",
  milestone: "●",
};

/**
 * One stop along the vertical timeline spine. Alternates sides on wider
 * screens for visual rhythm; stacks single-column on mobile.
 */
export function TimelineItem({ entry, index, align }: TimelineItemProps) {
  return (
    <motion.div
      className={cn(
        "relative flex w-full flex-col gap-1 sm:w-1/2",
        align === "right" ? "sm:ml-auto sm:pl-10 sm:text-left" : "sm:mr-auto sm:pr-10 sm:text-right"
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className={cn(
          "absolute top-1 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full sm:block",
          accent.bg,
          align === "right" ? "left-0" : "left-full"
        )}
        aria-hidden="true"
      />
      <span className={cn("text-whisper uppercase tracking-wider2", accent.text)}>
        {icons[entry.icon ?? "dream"]}&nbsp; {entry.when}
      </span>
      <h3 className="font-display text-xl text-ivory">{entry.title}</h3>
      <p className="font-body text-sm font-light leading-relaxed text-cream/70">{entry.description}</p>
    </motion.div>
  );
}
