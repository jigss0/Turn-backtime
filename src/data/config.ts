import type { AudioTrack, PersonProfile, VoiceNote } from "./types";

/**
 * SITE CONFIGURATION
 * ───────────────────────────────────────────────────────────────────────
 * Everything in this file controls WHO the experience is for, WHAT media
 * it uses, and HOW it behaves — as opposed to content.ts, which holds the
 * actual words (the letter, memories, promises...).
 *
 * Replace every "___" placeholder before publishing. Nothing here should
 * ever need a code change — just edit the values below.
 */

// ── People ─────────────────────────────────────────────────────────────

/** The person receiving this — used throughout the copy in content.ts */
export const recipient: PersonProfile = {
  name: "Anjani",
  nickname: "___ optional nickname ___",
};

/** You — the person who made this. Signs the letter, appears in "I" copy. */
export const author: PersonProfile = {
  name: "___ Your Name ___",
  nickname: "___ optional nickname ___",
};

// ── Site meta ──────────────────────────────────────────────────────────

export const siteMeta = {
  /** Shown in the browser tab */
  title: "For Anjani",
  /** Optional short line shown on the very first screen, above the envelope */
  openingLabel: "A KEEPSAKE FOR ANJANI",
  /** Used in the closing chapter's signature line */
  signOffDate: "___ Month Year ___",
};

// ── Theme ──────────────────────────────────────────────────────────────
// Fine-tune the accent used for glows, dividers, and highlighted text.
// Full palette lives in tailwind.config.ts — this just picks the accent.

export const theme = {
  /** One of: "amber" | "rosegold" | "teal" | "lavender" | "skyblue" */
  accent: "rosegold" as "amber" | "rosegold" | "teal" | "lavender" | "skyblue",
  /** Reduce motion/particles further even when the OS doesn't request it */
  calmMode: false,
};

// ── Background music ──────────────────────────────────────────────────

export const backgroundMusic: AudioTrack = {
  title: "___ Song Title — Artist ___",
  src: "/media/music/theme.mp3",
  fadeDuration: 2.5,
  defaultVolume: 0.45,
};

// ── Optional spoken voice note, offered in the letter chapter ─────────

export const voiceNote: VoiceNote | null = {
  label: "Press play to hear this in my voice",
  src: "/media/voice/letter-reading.mp3",
};
// Set voiceNote to `null` above to hide the voice-note control entirely.

// ── Media used outside the memories list (hero imagery, closing, etc) ─

export const media = {
  /** Full-bleed portrait/photo shown behind the intro, once opened */
  openingPhoto: "/media/images/opening.jpg",
  /** Shown in the closing chapter */
  closingPhoto: "/media/images/closing.jpg",
  /** Optional short looping video used as ambient texture in the intro */
  openingAmbientVideo: "/media/videos/rain-window.mp4",
  /** The feature video shown in its own chapter */
  featureVideo: "/media/videos/feature.mp4",
  /** Poster frame shown before the feature video is played */
  featureVideoPoster: "/media/images/feature-poster.jpg",
};

// ── Atmosphere ──────────────────────────────────────────────────────────
// Controls the opening chapter's weather motif and how it resolves by
// the closing chapter. The mood is calm reflection, never sadness — rain,
// where used, is soft and blue, and always gives way to warmth.

export const atmosphere = {
  /** "rain" | "petals" | "fireflies" — the opening chapter's weather */
  openingWeather: "petals" as "rain" | "petals" | "fireflies",
  /** Petals return warmer and brighter in the closing chapter regardless of the opening choice */
  warmClosing: true,
};

// ── Feature toggles ────────────────────────────────────────────────────

export const features = {
  /** Show the envelope opening scene before the experience begins */
  showEnvelopeIntro: true,
  /** Enable the unlockable extras after the closing chapter */
  enableHiddenExtras: true,
  /** Show the optional voice-note player in the Letter chapter */
  enableVoiceNote: true,
  /** Show a subtle chapter progress indicator */
  showProgressIndicator: true,
  /** Show the background-music control */
  enableBackgroundMusic: true,
  /** Show the feature video chapter */
  enableVideoSection: false,
  /** Show the interactive night-sky chapter */
  enableNightSky: true,
};

// ── Chapter order ──────────────────────────────────────────────────────
// The experience is read chapter by chapter, like a book — one full
// screen per chapter, turned via Continue / Back rather than scrolled.
// Reorder, or remove an id, to reshape the experience.

export const chapterOrder = [
  "intro",
  "letter",
  "memories",
  "appreciation",
  "reflections",
  "promises",
  "video",
  "timeline",
  "nightsky",
  "closing",
] as const;

export type ChapterId = (typeof chapterOrder)[number];
