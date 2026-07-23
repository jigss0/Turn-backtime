import { cn } from "@/utils/cn";
import { accent } from "@/theme/tokens";

interface AmbientGlowProps {
  className?: string;
  /** Diameter in pixels */
  size?: number;
}

/**
 * A soft, slowly flickering radial glow — meant to sit behind the
 * envelope or a chapter's focal image, evoking candlelight rather than
 * a UI highlight.
 */
export function AmbientGlow({ className, size = 480 }: AmbientGlowProps) {
  return (
    <div
      className={cn("pointer-events-none absolute animate-flicker rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${accent.hex}33 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
