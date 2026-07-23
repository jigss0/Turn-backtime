import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { features } from "@/data/config";
import { hiddenExtras } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { BloomingFlower } from "@/ui/BloomingFlower";
import { LazyImage } from "@/ui/LazyImage";
import { useMediaAvailable } from "@/hooks/useMediaAvailable";
import type { HiddenExtra } from "@/data/types";

/**
 * An optional, opt-in coda after the closing chapter. Nothing unlocks
 * automatically — the visitor chooses to reveal it, which is what keeps
 * this feeling like a found surprise rather than a reward mechanic.
 */
export function HiddenExtrasScene() {
  const [revealed, setRevealed] = useState(false);

  if (!features.enableHiddenExtras || hiddenExtras.length === 0) return null;

  return (
    <SceneWrapper id="extras" maxWidth="4xl" tone="blush">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="prompt"
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-body text-sm font-light text-cream/50">
              There's one more thing, if you'd like to see it.
            </p>
            <BloomingFlower onBloomed={() => setRevealed(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="extras"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-10"
          >
            {hiddenExtras.map((extra, i) => (
              <ExtraItem key={extra.id} extra={extra} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SceneWrapper>
  );
}

function ExtraItem({ extra, index }: { extra: HiddenExtra; index: number }) {
  const mediaStatus = useMediaAvailable(extra.media, extra.kind === "video" ? "video" : "image");

  return (
    <motion.div
      className="flex max-w-sm flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-body text-xs uppercase tracking-wider2 text-cream/40">{extra.label}</span>

      {extra.kind === "photo" && extra.media && mediaStatus === "available" && (
        <LazyImage
          src={extra.media}
          alt={extra.label}
          wrapperClassName="w-full rounded-sm shadow-card"
          className="h-full w-full object-cover"
        />
      )}

      {extra.kind === "video" && extra.media && mediaStatus === "available" && (
        <video src={extra.media} controls playsInline className="w-full rounded-sm shadow-card" />
      )}

      {(extra.kind === "note" || extra.kind === "message") && extra.text && (
        <p className="font-hand text-2xl leading-relaxed text-ivory">{extra.text}</p>
      )}
    </motion.div>
  );
}
