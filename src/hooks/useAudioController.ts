import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioTrack } from "@/data/types";

const STORAGE_KEY = "turnbacktime:audio-position";

interface AudioControllerState {
  isPlaying: boolean;
  isMuted: boolean;
  /** True once the browser has allowed playback to begin (needs a gesture) */
  hasStarted: boolean;
  play: () => void;
  pause: () => void;
  toggleMute: () => void;
  /** Fades in and starts playback — used for the intro's first interaction */
  fadeIn: () => void;
  fadeOut: (onComplete?: () => void) => void;
}

/**
 * Wraps a single <audio> element for the site's one background track.
 * Handles fade in/out, mute, and remembering playback position across a
 * visit (session-scoped — nothing leaves the browser, per the "no
 * backend, everything local" requirement).
 */
export function useAudioController(track: AudioTrack): AudioControllerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRaf = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio(track.src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";

    const savedPosition = sessionStorage.getItem(STORAGE_KEY);
    if (savedPosition) {
      audio.currentTime = parseFloat(savedPosition);
    }

    audioRef.current = audio;

    const remember = () => {
      sessionStorage.setItem(STORAGE_KEY, String(audio.currentTime));
    };
    audio.addEventListener("timeupdate", remember);

    return () => {
      audio.removeEventListener("timeupdate", remember);
      audio.pause();
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    };
  }, [track.src]);

  const runFade = useCallback(
    (from: number, to: number, duration: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);

      const start = performance.now();
      const step = (now: number) => {
        const elapsed = (now - start) / 1000;
        const t = Math.min(elapsed / duration, 1);
        audio.volume = from + (to - from) * t;
        if (t < 1) {
          fadeRaf.current = requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };
      fadeRaf.current = requestAnimationFrame(step);
    },
    []
  );

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasStarted(true);
        runFade(audio.volume, track.defaultVolume, track.fadeDuration);
      })
      .catch(() => {
        // Autoplay was blocked — expected until a user gesture occurs.
      });
  }, [runFade, track.defaultVolume, track.fadeDuration]);

  const fadeOut = useCallback(
    (onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      runFade(audio.volume, 0, track.fadeDuration, () => {
        audio.pause();
        setIsPlaying(false);
        onComplete?.();
      });
    },
    [runFade, track.fadeDuration]
  );

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
      runFade(audio.volume, track.defaultVolume, track.fadeDuration);
    });
  }, [runFade, track.defaultVolume, track.fadeDuration]);

  const pause = useCallback(() => {
    fadeOut();
  }, [fadeOut]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  return { isPlaying, isMuted, hasStarted, play, pause, toggleMute, fadeIn, fadeOut };
}
