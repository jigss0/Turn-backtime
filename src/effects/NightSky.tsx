import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NightSkyStar } from "@/data/types";
import { cn } from "@/utils/cn";

interface NightSkyProps {
  stars: NightSkyStar[];
}

/**
 * A field of tappable stars over a dark sky. Tapping one reveals a short
 * message beneath it; only one is open at a time. Positions are
 * percentage-based so this scales cleanly across phone and desktop
 * viewports without a canvas or WebGL dependency.
 */
export function NightSky({ stars }: NightSkyProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = stars.find((s) => s.id === activeId) ?? null;

  return (
    <div className="relative h-[60vh] w-full max-w-3xl overflow-hidden rounded-sm border border-pearl/15 bg-midnight">
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-px w-px rounded-full bg-pearl"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              opacity: 0.3 + ((i * 13) % 50) / 100,
            }}
          />
        ))}
      </div>

      {stars.map((star) => (
        <button
          key={star.id}
          type="button"
          onClick={() => setActiveId((cur) => (cur === star.id ? null : star.id))}
          aria-label="Reveal a memory"
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-amber"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
        >
          <motion.span
            className={cn("block rounded-full bg-amber-glow animate-flicker")}
            style={{
              width: 3 + star.magnitude * 5,
              height: 3 + star.magnitude * 5,
              boxShadow: `0 0 ${8 + star.magnitude * 14}px ${2 + star.magnitude * 4}px rgba(232,192,139,0.55)`,
            }}
            whileTap={{ scale: 1.6 }}
          />
        </button>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            className="absolute inset-x-6 bottom-6 rounded-sm border border-pearl/20 bg-midnight/80 p-4 text-center backdrop-blur-sm sm:inset-x-16"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-lg italic text-pearl">{active.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
