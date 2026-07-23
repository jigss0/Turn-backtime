import { motion } from "framer-motion";
import { chapterCopy, media, recipient } from "@/data/config";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { AmbientGlow } from "@/effects/AmbientGlow";
import { PetalField } from "@/effects/PetalField";
import { useMediaAvailable } from "@/hooks/useMediaAvailable";
import { cn } from "@/utils/cn";

/**
 * The first chapter proper — revealed once the envelope has opened.
 * Carries the same soft petal atmosphere from the opening gate through
 * into the book itself, so the transition feels continuous.
 */
export function IntroScene() {
  const photoStatus = useMediaAvailable(media.openingPhoto, "image");

  return (
    <SceneWrapper
      id="intro"
      tone="burgundy"
      background={
        <div className="absolute inset-0 overflow-hidden">
          <AmbientGlow className="left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" size={600} />
          <PetalField />
        </div>
      }
    >
      {photoStatus === "available" && (
        <motion.div
          className="mb-10 h-64 w-full max-w-sm overflow-hidden rounded-sm shadow-card sm:h-80"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={media.openingPhoto} alt="" className={cn("h-full w-full object-cover")} />
          <div className="absolute inset-0 bg-gradient-to-t from-pearl/25 via-transparent to-transparent" />
        </motion.div>
      )}

      <p className="text-whisper uppercase tracking-wider3 text-rosegold-light">A Keepsake</p>
      <span className="divider-gold my-4 w-20" aria-hidden="true" />
      <h1 className="text-foil text-foil-shimmer font-display text-hero text-balance">{chapterCopy.intro.title}</h1>

      {chapterCopy.intro.subtitle && (
        <p className="mt-6 max-w-md font-body text-body font-light text-pearl-white/70">
          {chapterCopy.intro.subtitle.replace("___ Recipient Name ___", recipient.name)}
        </p>
      )}

      <ContinueCue label="Begin" />
    </SceneWrapper>
  );
}
