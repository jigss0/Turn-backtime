import { useState } from "react";
import { motion } from "framer-motion";
import type { MemoryEntry } from "@/data/types";
import { LazyImage } from "./LazyImage";
import { cn } from "@/utils/cn";

interface MemoryCardProps {
  memory: MemoryEntry;
  index: number;
}

/**
 * A single memory rendered like an old photograph tucked into a paper
 * frame: the photo gently zooms when opened, a handwritten caption sits
 * beneath it like a note scrawled on the border, and the fuller story
 * unfolds as a quiet, tiny reflection.
 */
export function MemoryCard({ memory, index }: MemoryCardProps) {
  const [open, setOpen] = useState(false);
  const tilt = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <motion.button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className={cn(
        "group relative w-full max-w-xs rounded-[2px] bg-pearl-white p-3 pb-6 text-left shadow-page",
        "transition-transform duration-500 ease-cinematic hover:-translate-y-1 hover:rotate-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-rosegold"
      )}
      style={{ rotate: `${tilt}deg` }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gold pin, as if the photo were tacked to a scrapbook page */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rosegold shadow-gold"
      />
      {memory.photo && (
        <div className="relative overflow-hidden border border-obsidian/5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-cinematic group-hover:translate-x-full"
          />
          <motion.div
            animate={{ scale: open ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <LazyImage
              src={memory.photo}
              alt={memory.title}
              wrapperClassName="aspect-[4/3] w-full bg-pearl-soft"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      )}

      <div className="pt-3 text-obsidian">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg leading-tight">{memory.title}</h3>
          {memory.date && (
            <span className="whitespace-nowrap text-[11px] text-obsidian/50">{memory.date}</span>
          )}
        </div>

        {/* Handwritten-style note, like a caption penned on the border */}
        <p className="mt-1 font-hand text-xl leading-snug text-rosegold-dark">{memory.caption}</p>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-3 border-t border-obsidian/10 pt-3 font-body text-sm leading-relaxed text-obsidian/80">
            {memory.story}
          </p>
        </motion.div>

        <span className="mt-2 block text-[10px] uppercase tracking-wider2 text-obsidian/40">
          {open ? "Tap to close" : "Tap to read more"}
        </span>
      </div>
    </motion.button>
  );
}
