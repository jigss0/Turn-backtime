import { useMemo, type CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Drop {
  left: number;
  delay: number;
  duration: number;
  height: number;
  opacity: number;
}

function makeDrops(count: number): Drop[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 2.6 + Math.random() * 2.2,
    height: 40 + Math.random() * 60,
    opacity: 0.08 + Math.random() * 0.14,
  }));
}

/**
 * A soft field of falling rain streaks behind the envelope. Pure CSS
 * animation (see the `fall` keyframe in tailwind.config.ts) — no canvas,
 * so it stays cheap on iPhone Safari. Thins out considerably, or
 * disappears, when reduced motion is requested.
 */
export function RainField() {
  const reducedMotion = useReducedMotion();
  const dropCount = reducedMotion ? 0 : 46;
  const drops = useMemo(() => makeDrops(dropCount), [dropCount]);

  if (drops.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((drop, i) => (
        <span
          key={i}
          className="absolute top-0 w-px animate-fall"
          style={
            {
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              opacity: drop.opacity,
              background: "linear-gradient(180deg, transparent, #C7B790, transparent)",
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
