import { motion } from "framer-motion";
import type { PromiseEntry } from "@/data/types";
import { accent } from "@/theme/tokens";
import { cn } from "@/utils/cn";

interface PromiseCardProps {
  promise: PromiseEntry;
  index: number;
}

/**
 * A single promise, framed as an intention rather than a contract — a
 * thin accent rule rather than a checkmark or badge, since this isn't
 * something to be "completed."
 */
export function PromiseCard({ promise, index }: PromiseCardProps) {
  return (
    <motion.div
      className="w-full max-w-md rounded-sm border border-rosegold/30 bg-pearl-white/70 p-6 text-left shadow-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={cn("mb-3 h-px w-10", accent.bg)} />
      <h3 className="font-display text-xl text-ivory">{promise.title}</h3>
      <p className="mt-2 font-body text-sm font-light leading-relaxed text-cream/70">
        {promise.description}
      </p>
    </motion.div>
  );
}
