import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Petal {
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: "blush" | "rosegold" | "pearl";
}

const hueColor: Record<Petal["hue"], string> = {
  blush: "#7A3B4E",
  rosegold: "#B9975B",
  pearl: "#F1E4E1",
};

function makePetals(count: number): Petal[] {
  const hues: Petal["hue"][] = ["blush", "rosegold", "pearl"];
  return Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 7 + Math.random() * 5,
    size: 7 + Math.random() * 8,
    hue: hues[i % hues.length],
  }));
}

interface PetalFieldProps {
  /** Slightly denser and brighter for the closing chapter's "warm return" */
  warm?: boolean;
}

/**
 * A gentle drift of flower petals — the opening chapter's weather motif,
 * and the same effect used again, warmer and denser, in the closing
 * chapter for a quiet visual echo. Pure CSS animation, no canvas.
 */
export function PetalField({ warm = false }: PetalFieldProps) {
  const reducedMotion = useReducedMotion();
  const count = reducedMotion ? 0 : warm ? 26 : 18;
  const petals = useMemo(() => makePetals(count), [count]);

  if (petals.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal, i) => (
        <span
          key={i}
          className="absolute top-0 animate-petal rounded-[60%_40%_60%_40%]"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.75,
            background: hueColor[petal.hue],
            opacity: warm ? 0.85 : 0.6,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            boxShadow: "0 2px 6px rgba(74,53,72,0.08)",
          }}
        />
      ))}
    </div>
  );
}
