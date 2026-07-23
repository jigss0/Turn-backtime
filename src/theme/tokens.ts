import { theme } from "@/data/config";

/**
 * Resolves the single configured accent (config.ts → theme.accent) into
 * concrete class names / hex values used across components. Keeping this
 * indirection means every component asks for "the accent" rather than a
 * hardcoded color, so changing theme.accent re-skins the whole site.
 */

export type AccentKey = "amber" | "rosegold" | "teal" | "lavender" | "skyblue";

interface AccentTokens {
  text: string;
  border: string;
  bg: string;
  glow: string;
  hex: string;
}

const accentMap: Record<AccentKey, AccentTokens> = {
  amber: {
    text: "text-amber-dim",
    border: "border-amber",
    bg: "bg-amber",
    glow: "shadow-candlelight",
    hex: "#C9A25E",
  },
  rosegold: {
    text: "text-rosegold-dark",
    border: "border-rosegold",
    bg: "bg-rosegold",
    glow: "shadow-[0_0_50px_10px_rgba(185,151,91,0.25)]",
    hex: "#B9975B",
  },
  teal: {
    text: "text-teal-dark",
    border: "border-teal",
    bg: "bg-teal",
    glow: "shadow-[0_0_50px_10px_rgba(122,97,82,0.25)]",
    hex: "#7A6152",
  },
  lavender: {
    text: "text-lavender-dark",
    border: "border-lavender",
    bg: "bg-lavender",
    glow: "shadow-[0_0_50px_10px_rgba(110,75,94,0.28)]",
    hex: "#6E4B5E",
  },
  skyblue: {
    text: "text-cream",
    border: "border-skyblue",
    bg: "bg-skyblue",
    glow: "shadow-[0_0_50px_10px_rgba(199,183,144,0.3)]",
    hex: "#C7B790",
  },
};

export const accent: AccentTokens = accentMap[theme.accent] ?? accentMap.rosegold;

/** Motion durations shared across scenes for a consistent "film" pace */
export const motion = {
  chapterEnter: 1.1,
  chapterEnterEase: [0.16, 1, 0.3, 1] as const,
  staggerBase: 0.12,
  microInteraction: 0.35,
  /** Duration of the page-turn transition between chapters */
  pageTurn: 0.9,
};
