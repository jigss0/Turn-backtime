import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { VoiceNote } from "@/data/types";
import { useMediaAvailable } from "@/hooks/useMediaAvailable";
import { cn } from "@/utils/cn";

interface VoiceNotePlayerProps {
  note: VoiceNote;
}

/**
 * A small, quiet control offered inside the Letter chapter: press play
 * to hear the letter read aloud. Styled as a pressed-gold button on a
 * hairline card, matching the same paper-and-foil language as the rest
 * of the book rather than a generic media-player widget.
 */
export function VoiceNotePlayer({ note }: VoiceNotePlayerProps) {
  const status = useMediaAvailable(note.src, "audio");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (status !== "available") return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play();
    }
  };

  return (
    <motion.div
      className="mt-8 flex items-center gap-4 rounded-full border border-rosegold/40 bg-burgundy-deep/40 px-5 py-3 shadow-card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause voice note" : "Play voice note"}
        aria-pressed={playing}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rosegold text-burgundy-deep shadow-gold",
          "transition-transform duration-300 ease-cinematic hover:scale-105 active:scale-95"
        )}
      >
        {playing ? (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
            <rect x="0" y="0" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="8" y="0" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
            <path d="M0 0L12 7L0 14V0Z" fill="currentColor" />
          </svg>
        )}
      </button>
      <span className="text-whisper uppercase tracking-wider2 text-pearl-white/80">{note.label}</span>
      <audio
        ref={audioRef}
        src={note.src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </motion.div>
  );
}
