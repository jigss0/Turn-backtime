/**
 * Shared types for the site's two editable data files:
 *  - config.ts   → who this is for, media assets, feature toggles, audio
 *  - content.ts  → the actual words: the letter, memories, promises, etc.
 *
 * Keeping the shapes here means both files (and every component that reads
 * them) stay in sync without duplicating type definitions.
 */

/** A path relative to /public, e.g. "/media/images/beach-day.jpg" */
export type MediaPath = string;

export interface PersonProfile {
  /** First name only, used in casual copy ("...for you, Alex") */
  name: string;
  /** Optional nickname/pet name, used in the most intimate lines */
  nickname?: string;
}

export interface AudioTrack {
  /** Display title, shown in the audio control tooltip */
  title: string;
  /** Path to the audio file in /public/media/music */
  src: MediaPath;
  /** Seconds to fade in/out on play, pause, and chapter transitions */
  fadeDuration: number;
  /** Starting volume, 0–1 */
  defaultVolume: number;
}

export interface VoiceNote {
  /** Short label shown next to the play control, e.g. "A message for you" */
  label: string;
  /** Path to the audio file in /public/media/voice */
  src: MediaPath;
}

export interface MemoryEntry {
  id: string;
  title: string;
  /** Optional — memories may be undated ("sometime that summer") */
  date?: string;
  photo?: MediaPath;
  /** Short line shown as a caption under the photo */
  caption: string;
  /** The fuller story, shown when the memory card is open/in focus */
  story: string;
}

export interface AppreciationEntry {
  id: string;
  /** A short "thing I appreciate" line — kept brief so a list of many reads well */
  text: string;
}

export interface PromiseEntry {
  id: string;
  title: string;
  description: string;
}

export interface TimelineEntry {
  id: string;
  /** Rough timeframe label, e.g. "Someday", "Next spring", "2027" */
  when: string;
  title: string;
  description: string;
  icon?: "trip" | "goal" | "celebration" | "dream" | "milestone";
}

export interface VideoSectionContent {
  title: string;
  description: string;
  src: MediaPath;
  poster?: MediaPath;
}

export interface NightSkyStar {
  id: string;
  /** Position as a percentage of the sky field, 0-100 */
  x: number;
  y: number;
  /** Short wish/memory revealed when this star is tapped */
  message: string;
  /** Relative brightness, 0-1 — larger/brighter stars draw the eye first */
  magnitude: number;
}

export interface HiddenExtra {
  id: string;
  label: string;
  /** What kind of surprise this is, used to pick the right renderer */
  kind: "photo" | "note" | "video" | "memory" | "message";
  media?: MediaPath;
  text?: string;
}

export interface ChapterCopy {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}
