import { useEffect, useState } from "react";
import { theme } from "@/data/config";

/**
 * True if the visitor's OS requests reduced motion, OR the creator has
 * enabled calmMode in config.ts. Components should check this before
 * running decorative animation (rain, floating, parallax) — core
 * transitions should still respect prefers-reduced-motion via CSS too.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches || theme.calmMode);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
