import { useEffect, useState } from "react";

/**
 * Detects touch/coarse-pointer devices so components can swap hover-only
 * affordances (e.g. a hover glow) for tap-based ones — important for the
 * iPhone Safari target.
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouch(query.matches);
  }, []);

  return isTouch;
}
