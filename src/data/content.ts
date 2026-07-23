import type {
  AppreciationEntry,
  ChapterCopy,
  HiddenExtra,
  MemoryEntry,
  NightSkyStar,
  PromiseEntry,
  TimelineEntry,
  VideoSectionContent,
} from "./types";

/**
 * CONTENT
 * ───────────────────────────────────────────────────────────────────────
 * The actual words of the keepsake. Every string below is a placeholder —
 * replace them with the real letter, real memories, and real plans.
 * Keep entries short and specific; a handful of true, particular details
 * will always feel warmer than many generic ones.
 */

// ── Chapter headers ────────────────────────────────────────────────────

export const chapterCopy: Record<string, ChapterCopy> = {
  intro: {
    eyebrow: "A KEEPSAKE",
    title: "If I Could Turn Back Time",
    subtitle: "A small archive of us — made for Anjani, with more gratitude than words usually hold.",
  },
  letter: {
    eyebrow: "01 — THE LETTER",
    title: "A few things I've been meaning to say",
  },
  memories: {
    eyebrow: "02 — SHARED MEMORIES",
    title: "The moments I keep coming back to",
    subtitle: "Some of what I never want to forget.",
  },
  appreciation: {
    eyebrow: "03 — THINGS I APPRECIATE",
    title: "What I don't say enough",
  },
  reflections: {
    eyebrow: "04 — REFLECTIONS",
    title: "Looking back, honestly",
    subtitle: "Growth is easier to see looking backward.",
  },
  promises: {
    eyebrow: "05 — HOW I WANT TO SHOW UP",
    title: "Where I'm putting my care",
    subtitle: "Not guarantees — just what I'm choosing to work on",
  },
  video: {
    eyebrow: "06 — A MOMENT, MOVING",
    title: "___ Video chapter title ___",
    subtitle: "___ optional short line introducing the video ___",
  },
  timeline: {
    eyebrow: "07 — SHARED DREAMS",
    title: "What I hope is still ahead of us",
  },
  nightsky: {
    eyebrow: "08 — UNDER ONE SKY",
    title: "Every star, a small memory",
    subtitle: "Tap a star",
  },
  closing: {
    eyebrow: "09 — CLOSING",
    title: "Until I can tell you in person",
  },
};

// ── The Letter ─────────────────────────────────────────────────────────
// Written as an array of paragraphs so each can animate in individually.

export const letterParagraphs: string[] = [
  "___ Dear ___, ___",
  "___ Paragraph one — how this letter starts, and why you're writing it now. ___",
  "___ Paragraph two — something specific and true. ___",
  "___ Paragraph three — what you hope they take from this. ___",
  "___ Closing line before the signature. ___",
];

export const letterSignature = {
  line: "With all my love,",
  name: "___ Your Name ___",
};

// ── Reflections ─────────────────────────────────────────────────────────
// A short, honest set of reflection paragraphs — the "looking back" chapter.

export const reflections: string[] = [
  "___ A reflection on the two of you, honestly told. ___",
  "___ Something you understand now that you didn't before. ___",
  "___ A reflection on where things stand today. ___",
];

// ── Memories ───────────────────────────────────────────────────────────
// Add as many as you like — each renders as its own card/polaroid.

export const memories: MemoryEntry[] = [
  {
    id: "memory-1",
    title: "___ Memory title ___",
    date: "___ Month Year ___",
    photo: "/media/images/memory-1.jpg",
    caption: "___ one-line caption ___",
    story: "___ the fuller story behind this memory ___",
  },
  {
    id: "memory-2",
    title: "___ Memory title ___",
    date: "___ Month Year ___",
    photo: "/media/images/memory-2.jpg",
    caption: "___ one-line caption ___",
    story: "___ the fuller story behind this memory ___",
  },
  {
    id: "memory-3",
    title: "___ Memory title ___",
    date: undefined,
    photo: "/media/images/memory-3.jpg",
    caption: "___ one-line caption ___",
    story: "___ the fuller story behind this memory ___",
  },
];

// ── Appreciation ───────────────────────────────────────────────────────
// Keep these short — the layout is designed for many brief, specific lines.

export const appreciation: AppreciationEntry[] = [
  { id: "a1", text: "___ something specific you appreciate ___" },
  { id: "a2", text: "___ something specific you appreciate ___" },
  { id: "a3", text: "___ something specific you appreciate ___" },
  { id: "a4", text: "___ something specific you appreciate ___" },
  { id: "a5", text: "___ something specific you appreciate ___" },
  { id: "a6", text: "___ something specific you appreciate ___" },
];

// ── Promises ───────────────────────────────────────────────────────────

export const promises: PromiseEntry[] = [
  {
    id: "p1",
    title: "___ Promise title ___",
    description: "___ what this looks like in practice ___",
  },
  {
    id: "p2",
    title: "___ Promise title ___",
    description: "___ what this looks like in practice ___",
  },
  {
    id: "p3",
    title: "___ Promise title ___",
    description: "___ what this looks like in practice ___",
  },
];

// ── Future timeline / shared dreams ────────────────────────────────────

export const timeline: TimelineEntry[] = [
  {
    id: "t1",
    when: "___ Someday ___",
    title: "___ A trip you want to take together ___",
    description: "___ a sentence about why this one ___",
    icon: "trip",
  },
  {
    id: "t2",
    when: "___ Next year ___",
    title: "___ A goal you're working toward together ___",
    description: "___ a sentence about why this matters ___",
    icon: "goal",
  },
  {
    id: "t3",
    when: "___ Someday ___",
    title: "___ A celebration or milestone to look forward to ___",
    description: "___ a sentence about it ___",
    icon: "celebration",
  },
];

// ── Feature video ──────────────────────────────────────────────────────

export const videoSection: VideoSectionContent = {
  title: "___ Video title ___",
  description: "___ a sentence about what this video is ___",
  src: "/media/videos/feature.mp4",
  poster: "/media/images/feature-poster.jpg",
};

// ── Interactive night sky ───────────────────────────────────────────────
// Each star reveals a short message when tapped. Position (x, y) is a
// percentage of the sky field — spread these out so stars don't overlap.

export const nightSkyStars: NightSkyStar[] = [
  { id: "s1", x: 18, y: 24, magnitude: 0.9, message: "___ a memory or wish, short ___" },
  { id: "s2", x: 32, y: 55, magnitude: 0.6, message: "___ a memory or wish, short ___" },
  { id: "s3", x: 48, y: 20, magnitude: 1, message: "___ a memory or wish, short ___" },
  { id: "s4", x: 62, y: 62, magnitude: 0.7, message: "___ a memory or wish, short ___" },
  { id: "s5", x: 74, y: 30, magnitude: 0.8, message: "___ a memory or wish, short ___" },
  { id: "s6", x: 85, y: 58, magnitude: 0.55, message: "___ a memory or wish, short ___" },
  { id: "s7", x: 10, y: 68, magnitude: 0.65, message: "___ a memory or wish, short ___" },
  { id: "s8", x: 55, y: 78, magnitude: 0.75, message: "___ a memory or wish, short ___" },
];

// ── Closing ────────────────────────────────────────────────────────────

export const closingMessage: string[] = [
  "___ First closing line — how you want to leave this. ___",
  "___ Second closing line. ___",
];

// ── Hidden extras (optional, unlocked after the closing chapter) ──────

export const hiddenExtras: HiddenExtra[] = [
  {
    id: "extra-1",
    label: "One more thing",
    kind: "note",
    text: "___ a bonus handwritten-style note ___",
  },
  {
    id: "extra-2",
    label: "A photo I almost didn't include",
    kind: "photo",
    media: "/media/images/extra-1.jpg",
  },
];
