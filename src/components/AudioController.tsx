import { motion } from "framer-motion";
import { backgroundMusic } from "@/data/config";
import { useAudioController } from "@/hooks/useAudioController";
import { cn } from "@/utils/cn";

interface AudioControllerProps {
  /** Parent tells us once the intro gesture has happened, to trigger fade-in */
  shouldStart: boolean;
}

/**
 * A single, unobtrusive circular control fixed to the corner of the
 * screen for the whole visit — a soft glass pill on the pearl
 * background, edged in rose gold. Starts muted-until-gesture (browsers
 * require this); once `shouldStart` flips true — the envelope opening —
 * it fades the track in.
 */
export function AudioController({ shouldStart }: AudioControllerProps) {
  const { isPlaying, isMuted, toggleMute, fadeIn, fadeOut } = useAudioController(backgroundMusic);

  const handleToggle = () => {
    if (!isPlaying) {
      fadeIn();
    } else {
      fadeOut();
    }
  };

  return (
    <motion.div
      className="safe-bottom safe-top fixed bottom-6 right-6 z-40 flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldStart ? 1 : 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
        title={backgroundMusic.title}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-rosegold/30 shadow-card",
          "bg-pearl/80 backdrop-blur-sm transition-all duration-500 hover:border-rosegold/60 hover:bg-pearl"
        )}
      >
        <NoteIcon playing={isPlaying} />
      </button>

      {isPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          aria-pressed={isMuted}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-rosegold/30 bg-pearl/80 shadow-card backdrop-blur-sm transition-all duration-500 hover:border-rosegold/60 hover:bg-pearl"
        >
          <span className="text-whisper text-cream/80">{isMuted ? "OFF" : "ON"}</span>
        </button>
      )}
    </motion.div>
  );
}

function NoteIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {playing ? (
        <>
          <rect x="6" y="5" width="3.5" height="14" rx="1" fill="#3A2A26" />
          <rect x="14.5" y="5" width="3.5" height="14" rx="1" fill="#3A2A26" />
        </>
      ) : (
        <path d="M8 5v14l11-7-11-7z" fill="#3A2A26" />
      )}
    </svg>
  );
}
