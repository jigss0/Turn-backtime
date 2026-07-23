import type { Config } from "tailwindcss";

// Design tokens for "If I Could Turn Back Time" — luxury editorial /
// coffee-table-book palette, dedicated to Anjani. Deep burgundy, plum and
// espresso inks against warm cream and champagne-gold paper. Token
// *names* are kept stable from earlier palettes so every existing
// component keeps working unchanged — only the hex values (and a
// handful of new paper/gold tokens) have moved to this mood board.
//
//   pearl     → the warm paper family: cream, ivory, soft beige page tones
//   obsidian  → the deepest ink — charcoal / near-black espresso, used for
//               text on light paper and as the overlay/cover tone
//   cream     → primary "ink" text color across the site (espresso brown)
//   ivory     → deepest heading ink (near-black plum)
//   burgundy  → the primary luxury color family: deep burgundy / wine red,
//               used for covers, dividers, alternate-tone paper, buttons
//   rosegold  → champagne / antique gold — the primary metallic accent
//   amber     → warm gold-glow accent (candlelight, highlights)
//   teal / lavender / skyblue → muted plum/gold-leaning accent options,
//               desaturated so they never fight the burgundy+gold palette
//   midnight  → an intentional dark exception, used only by the
//               interactive night-sky chapter
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pearl: {
          DEFAULT: "#F8F3EA", // Warm Ivory
          soft: "#F3EBDD", // Cream Paper
          deep: "#E8DDCF", // Soft Beige
          white: "#FFFDF8", // Pearl White
          blush: "#F1E4E1", // faint rose paper option
        },
        obsidian: {
          DEFAULT: "#2B2B2B", // Charcoal
          soft: "#3A2A26", // Espresso Brown
        },
        burgundy: {
          DEFAULT: "#4A1F2C", // Deep Burgundy
          deep: "#320F1A", // near-black burgundy, for the cover
          wine: "#5A1E2F", // Wine Red
          plum: "#4B233D", // Rich Plum
          cherry: "#61243C", // Dark Cherry
          light: "#7A3B4E", // lifted tint for subtle backgrounds/borders
        },
        rosegold: {
          DEFAULT: "#B9975B", // Antique Gold
          light: "#D8C29D", // Champagne Gold
          dark: "#8C6F3E", // deeper bronze gold
          foil: "#E7D2A6", // bright foil highlight
        },
        cream: {
          DEFAULT: "#3A2A26", // body ink — Espresso Brown
          dim: "#6B5B52", // softer taupe ink for secondary text
        },
        ivory: "#2B1620",
        amber: {
          DEFAULT: "#C9A25E",
          glow: "#E7D2A6",
          dim: "#A9803F",
        },
        teal: {
          DEFAULT: "#7A6152",
          light: "#A08B7C",
          dark: "#584338",
        },
        lavender: {
          DEFAULT: "#6E4B5E",
          light: "#93697F",
          dark: "#4B2F3C",
        },
        skyblue: {
          DEFAULT: "#C7B790",
          light: "#E3D8BC",
        },
        midnight: {
          DEFAULT: "#211119",
          soft: "#170B10",
        },
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "\"Cormorant Garamond\"", "serif"],
        serif: ["\"Cormorant Garamond\"", "serif"],
        body: ["\"Manrope\"", "\"Helvetica Neue\"", "sans-serif"],
        hand: ["\"Caveat\"", "cursive"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 8vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        chapter: ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
        body: ["clamp(1rem, 1.4vw, 1.125rem)", { lineHeight: "1.75" }],
        whisper: ["0.75rem", { lineHeight: "1.6", letterSpacing: "0.18em" }],
      },
      letterSpacing: {
        wider2: "0.2em",
        wider3: "0.32em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      boxShadow: {
        candlelight: "0 0 60px 10px rgba(201, 151, 91, 0.22)",
        card: "0 20px 50px -20px rgba(42, 15, 24, 0.35)",
        page: "0 30px 90px -25px rgba(42, 15, 24, 0.45)",
        emboss: "0 1px 0 rgba(255,255,255,0.5), 0 -1px 0 rgba(42,15,24,0.25)",
        gold: "0 8px 24px -8px rgba(185, 151, 91, 0.5)",
      },
      backgroundImage: {
        vignette: "radial-gradient(ellipse at center, transparent 45%, rgba(74,31,44,0.35) 100%)",
        dawn: "linear-gradient(180deg, #F8F3EA 0%, #F1E4E1 45%, #E7D2A6 100%)",
        clouds: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.3) 0%, transparent 55%)",
        "gold-foil": "linear-gradient(120deg, #8C6F3E 0%, #E7D2A6 35%, #B9975B 55%, #E7D2A6 75%, #8C6F3E 100%)",
        "cover-burgundy": "radial-gradient(ellipse at 50% 20%, #5A1E2F 0%, #4A1F2C 45%, #320F1A 100%)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.85" },
          "50%": { opacity: "0.92" },
          "55%": { opacity: "0.78" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh)", opacity: "0" },
          "10%": { opacity: "0.5" },
          "100%": { transform: "translateY(110vh)", opacity: "0" },
        },
        petal: {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.85" },
          "50%": { transform: "translateY(50vh) translateX(20px) rotate(180deg)" },
          "100%": { transform: "translateY(110vh) translateX(-10px) rotate(360deg)", opacity: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        bloom: {
          "0%": { transform: "scale(0.6) rotate(-8deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        flicker: "flicker 4.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        fall: "fall 3.5s linear infinite",
        petal: "petal 9s linear infinite",
        twinkle: "twinkle 3.2s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        bloom: "bloom 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 3.5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
