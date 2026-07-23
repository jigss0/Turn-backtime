import { motion } from "framer-motion";
import { media, atmosphere } from "@/data/config";
import { chapterCopy, closingMessage, letterSignature } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { LazyImage } from "@/ui/LazyImage";
import { PetalField } from "@/effects/PetalField";
import { AmbientGlow } from "@/effects/AmbientGlow";

/**
 * The final chapter proper. Whatever the opening's weather was, this
 * chapter always resolves the same way: the sky brightens, petals fall
 * warm and unhurried, and the mood settles into quiet warmth rather
 * than drama. Unlike every other chapter, it does not end with a
 * ContinueCue — HiddenExtrasScene follows as its own soft, opt-in
 * surprise rather than an automatic continuation.
 */
export function ClosingScene() {
  return (
    <SceneWrapper
      id="closing"
      copy={chapterCopy.closing}
      tone="blush"
      background={
        <div className="absolute inset-0 overflow-hidden bg-dawn">
          <AmbientGlow
            className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/3"
            size={720}
          />
          {atmosphere.warmClosing && <PetalField warm />}
        </div>
      }
    >
      <LazyImage
        src={media.closingPhoto}
        alt=""
        wrapperClassName="mb-10 aspect-[4/3] w-full max-w-sm rounded-sm shadow-card"
        className="h-full w-full object-cover"
      />

      <div className="flex flex-col gap-5">
        {closingMessage.map((line, i) => (
          <motion.p
            key={i}
            className="font-body text-body font-light leading-relaxed text-cream/85"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        className="mt-10 font-hand text-4xl text-ivory"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: closingMessage.length * 0.2 + 0.2 }}
      >
        {letterSignature.name}
      </motion.p>
    </SceneWrapper>
  );
}
