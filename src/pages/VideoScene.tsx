import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { chapterCopy, features } from "@/data/config";
import { videoSection } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { useMediaAvailable } from "@/hooks/useMediaAvailable";
import { cn } from "@/utils/cn";

/**
 * A single elegant video moment. Stays paused on its poster frame until
 * tapped — avoids autoplaying video weight on mobile data, and keeps the
 * cinematic pacing intentional rather than automatic.
 */
export function VideoScene() {
  const status = useMediaAvailable(videoSection.src, "video");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (!features.enableVideoSection || status !== "available") return null;

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play();
    setPlaying(true);
  };

  return (
    <SceneWrapper id="video" copy={chapterCopy.video} maxWidth="4xl" tone="deep">
      <motion.div
        className="relative w-full overflow-hidden rounded-sm shadow-card"
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          ref={videoRef}
          src={videoSection.src}
          poster={videoSection.poster}
          controls={playing}
          playsInline
          preload="none"
          className="aspect-video w-full bg-pearl-soft object-cover"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-burgundy-deep/30 transition-colors duration-500 hover:bg-burgundy-deep/15"
            )}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-rosegold/60 bg-burgundy-deep/70 shadow-gold backdrop-blur-sm">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
                <path d="M0 0L20 12L0 24V0Z" fill="#E7D2A6" />
              </svg>
            </span>
          </button>
        )}
      </motion.div>

      <p className="mt-6 max-w-md font-body text-sm font-light text-cream/60">
        {videoSection.description}
      </p>

      <ContinueCue />
    </SceneWrapper>
  );
}
