/**
 * A fixed, full-viewport noise overlay rendered with an inline SVG
 * turbulence filter — no image asset required. Kept at very low opacity
 * and blended with `overlay` so it reads as texture, not distortion.
 */
export function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
}
