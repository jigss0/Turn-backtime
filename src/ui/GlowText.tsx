import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { accent } from "@/theme/tokens";

interface GlowTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  /** Adds the slow candlelight flicker animation */
  flicker?: boolean;
}

/**
 * Renders text in the configured accent color with a soft text-shadow
 * glow — used sparingly for eyebrows, chapter numerals, and single
 * emphasized words within the letter.
 */
export function GlowText({ as: Tag = "span", children, flicker, className, ...props }: GlowTextProps) {
  return (
    <Tag
      className={cn(accent.text, flicker && "animate-flicker", className)}
      style={{ textShadow: `0 0 24px ${accent.hex}55` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
