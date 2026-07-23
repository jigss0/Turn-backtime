import { motion } from "framer-motion";
import { WaxSeal } from "./WaxSeal";
import { cn } from "@/utils/cn";

interface EnvelopeProps {
  opened: boolean;
  onOpen: () => void;
}

/**
 * A paper envelope rendered in CSS/SVG, flap animating open when tapped.
 * This is the site's signature object — the whole experience is framed
 * as "opening a keepsake," and this is the literal first gesture of
 * that. Rendered in soft blush and ivory stationery tones, with a
 * gentle hover lift so it reads as a tangible object rather than a UI
 * element.
 */
export function Envelope({ opened, onOpen }: EnvelopeProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={opened}
      aria-label="Open the letter"
      className={cn(
        "group relative flex flex-col items-center focus-visible:outline focus-visible:outline-1",
        "focus-visible:outline-offset-8 focus-visible:outline-rosegold/60",
        !opened && "cursor-pointer"
      )}
      whileHover={!opened ? { y: -4, scale: 1.015 } : undefined}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-40 w-56 sm:h-48 sm:w-64" style={{ perspective: 900 }}>
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-[2px] border border-rosegold/25"
          style={{
            background: "linear-gradient(180deg, #FFFDF8 0%, #F3EBDD 100%)",
            boxShadow: "0 30px 60px -20px rgba(42,15,24,0.32)",
          }}
        />

        {/* Bottom triangle flap (static, back layer) */}
        <div
          className="absolute inset-x-0 bottom-0 h-full"
          style={{
            clipPath: "polygon(0 100%, 50% 40%, 100% 100%)",
            background: "linear-gradient(180deg, #F3EBDD 0%, #E8DDCF 100%)",
          }}
        />

        {/* Top flap — animates open */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 origin-top"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background: "linear-gradient(160deg, #FFFDF8 0%, #F3EBDD 100%)",
            transformStyle: "preserve-3d",
          }}
          animate={opened ? { rotateX: 165 } : { rotateX: 0 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: opened ? 0.15 : 0 }}
        />

        {/* Wax seal, centered on the flap seam */}
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
          <WaxSeal broken={opened} />
        </div>

        {/* Peeking letter paper, rises slightly once opened */}
        <motion.div
          className="absolute inset-x-6 top-3 h-[70%] rounded-sm bg-pearl"
          initial={false}
          animate={opened ? { y: -18, opacity: 1 } : { y: 6, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />
      </div>

      {!opened && (
        <span className="mt-8 text-whisper uppercase tracking-wider3 text-cream/50 transition-colors duration-500 group-hover:text-cream/80">
          Tap to open
        </span>
      )}
    </motion.button>
  );
}
