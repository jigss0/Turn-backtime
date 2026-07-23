import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Firefly {
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

function makeFireflies(count: number): Firefly[] {
  return Array.from({ length: count }, () => ({
    left: 10 + Math.random() * 80,
    top: 15 + Math.random() * 70,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 3,
    size: 2 + Math.random() * 3,
  }));
}

/**
 * A handful of soft, slowly drifting points of amber light — an
 * alternate opening-chapter atmosphere to rain or petals, for a quieter,
 * warmer first impression.
 */
export function FireflyField() {
  const reducedMotion = useReducedMotion();
  const count = reducedMotion ? 6 : 16;
  const flies = useMemo(() => makeFireflies(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flies.map((fly, i) => (
        <span
          key={i}
          className="absolute animate-float"
          style={{
            left: `${fly.left}%`,
            top: `${fly.top}%`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
          }}
        >
          <span
            className="block animate-twinkle rounded-full bg-amber-glow"
            style={{
              width: fly.size,
              height: fly.size,
              animationDelay: `${fly.delay}s`,
              boxShadow: "0 0 10px 3px rgba(232,185,140,0.5)",
            }}
          />
        </span>
      ))}
    </div>
  );
}
