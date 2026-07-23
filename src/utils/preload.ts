/**
 * Preloads a small set of critical images (the opening and closing
 * photos) so they're decoded and ready by the time their chapters
 * scroll into view, rather than popping in mid-scroll. Silently no-ops
 * for paths that don't resolve — placeholder assets are expected.
 */
export function preloadImages(paths: Array<string | undefined>): void {
  paths.forEach((path) => {
    if (!path) return;
    const img = new Image();
    img.src = path;
  });
}
