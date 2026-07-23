import { motion } from "framer-motion";
import { appreciation, chapterCopy } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { accent } from "@/theme/tokens";
import { cn } from "@/utils/cn";

/**
 * A grid of brief, specific appreciations — presented as floating glass
 * cards. Deliberately terse per-entry so a long list still reads well.
 */
export function AppreciationScene() {
  return (
    <SceneWrapper id="appreciation" copy={chapterCopy.appreciation} maxWidth="4xl" tone="soft">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {appreciation.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="rounded-sm border border-rosegold/30 bg-pearl-white/70 p-5 text-left shadow-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: (i % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={cn("mr-2 font-display italic", accent.text)}>&ldquo;</span>
            <span className="font-body text-sm font-light leading-relaxed text-cream/85">
              {entry.text}
            </span>
          </motion.div>
        ))}
      </div>
      <ContinueCue />
    </SceneWrapper>
  );
}
