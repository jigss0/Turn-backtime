import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { motion as motionTokens } from "@/theme/tokens";
import type { ChapterCopy } from "@/data/types";
import { GlowText } from "@/ui/GlowText";
import { useChapterNavigation } from "@/context/ChapterNavigation";
import { siteMeta } from "@/data/config";

interface SceneWrapperProps {
  id: string;
  copy?: ChapterCopy;
  children?: ReactNode;
  className?: string;
  /** Which paper stock this page is "printed" on */
  tone?: "default" | "soft" | "deep" | "blush" | "burgundy";
  /** Inner content column width — most chapters read best narrow (2xl) */
  maxWidth?: "2xl" | "4xl" | "5xl";
  /** Optional full-bleed layer (gradient, petals, glow) rendered behind the content column */
  background?: ReactNode;
}

const maxWidthClass: Record<NonNullable<SceneWrapperProps["maxWidth"]>, string> = {
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
};

const paperBg: Record<NonNullable<SceneWrapperProps["tone"]>, string> = {
  default: "bg-pearl",
  soft: "bg-pearl-soft",
  deep: "bg-pearl-deep",
  blush: "bg-pearl-blush",
  burgundy: "bg-burgundy-deep",
};

const paperInk: Record<NonNullable<SceneWrapperProps["tone"]>, string> = {
  default: "text-cream",
  soft: "text-cream",
  deep: "text-cream",
  blush: "text-cream",
  burgundy: "text-pearl-white",
};

const zigzagTone: Record<NonNullable<SceneWrapperProps["tone"]>, string> = {
  default: "tone-pearl",
  soft: "tone-soft",
  deep: "tone-deep",
  blush: "tone-blush",
  burgundy: "tone-burgundy",
};

/**
 * The one container every chapter is built from — and the single place
 * the "physical page" of the magazine is rendered. Each chapter is a
 * full page in the book (PageStage renders one at a time): warm
 * printed-paper stock with a fibrous grain, generous editorial
 * margins, a running head + pagination like a real magazine spread,
 * and a hand-cut zigzag edge along the bottom. Individual chapters only
 * ever describe their content — the paper itself lives here, so every
 * page in the book automatically matches.
 */
export function SceneWrapper({
  id,
  copy,
  children,
  className,
  tone = "default",
  maxWidth = "2xl",
  background,
}: SceneWrapperProps) {
  const { currentIndex, total } = useChapterNavigation();
  const pageNumber = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section
      id={id}
      className={cn(
        "paper-texture scene relative isolate px-6 pb-20 pt-10 sm:px-10",
        paperBg[tone],
        paperInk[tone],
        className
      )}
    >
      {/* Printed masthead row — running head + pagination, like a real spread */}
      <div className="safe-top pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-6 text-whisper uppercase tracking-wider2 opacity-60 sm:px-10">
        <span className="emboss">{siteMeta.title.replace(/^For /, "")}</span>
        <span className="emboss">{pageNumber}</span>
      </div>

      {/* Thin gold corner flourishes — quiet editorial signature on every page */}
      <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 z-20 h-3 w-3 border-l border-t border-rosegold/40 sm:left-6 sm:top-6" />
      <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 z-20 h-3 w-3 border-r border-t border-rosegold/40 sm:right-6 sm:top-6" />

      {background}

      <motion.div
        className={cn("relative z-10 mx-auto flex w-full flex-1 flex-col items-center justify-center text-center", maxWidthClass[maxWidth])}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: motionTokens.chapterEnterEase }}
      >
        {copy && (
          <header className="mb-12 flex flex-col items-center gap-4">
            {copy.eyebrow && (
              <>
                <GlowText
                  as="p"
                  className={cn("text-whisper uppercase tracking-wider3", tone === "burgundy" && "!text-rosegold-light")}
                >
                  {copy.eyebrow}
                </GlowText>
                <span className="divider-gold w-16" aria-hidden="true" />
              </>
            )}
            <h2
              className={cn(
                "font-display text-chapter text-balance",
                tone === "burgundy" ? "text-pearl-white" : "emboss text-ivory"
              )}
            >
              {copy.title}
            </h2>
            {copy.subtitle && (
              <p className={cn("max-w-md text-body font-body font-light", tone === "burgundy" ? "text-pearl-white/70" : "text-cream/70")}>
                {copy.subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </motion.div>

      {/* Hand-cut zigzag paper edge along the bottom of every page */}
      <div className={cn("paper-zigzag-edge", zigzagTone[tone])} aria-hidden="true" />
    </section>
  );
}
