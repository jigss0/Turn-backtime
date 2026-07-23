import { motion } from "framer-motion";
import { chapterCopy, features, voiceNote } from "@/data/config";
import { letterParagraphs, letterSignature } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { VoiceNotePlayer } from "@/ui/VoiceNotePlayer";

/**
 * The personal letter, animated in paragraph by paragraph as it scrolls
 * into view. The emotional core of the whole experience.
 */
export function LetterScene() {
  return (
    <SceneWrapper id="letter" copy={chapterCopy.letter} tone="burgundy">
      <div className="flex flex-col gap-6 text-left">
        {letterParagraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            className="font-display text-body italic text-pearl-white/90"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraph}
          </motion.p>
        ))}

        <motion.div
          className="mt-4 self-end text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: letterParagraphs.length * 0.15 }}
        >
          <p className="font-body text-sm text-pearl-white/60">{letterSignature.line}</p>
          <p className="text-foil font-hand text-3xl">{letterSignature.name}</p>
        </motion.div>
      </div>

      {features.enableVoiceNote && voiceNote && <VoiceNotePlayer note={voiceNote} />}

      <ContinueCue />
    </SceneWrapper>
  );
}
