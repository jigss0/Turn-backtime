import { useEffect, useState } from "react";

type MediaKind = "image" | "audio" | "video";
type Status = "checking" | "available" | "missing";

/**
 * Placeholder photos, tracks, and videos are expected while the creator
 * is still filling in config.ts / content.ts. Rather than showing broken
 * media, every section that depends on a file should use this hook and
 * render nothing (or a graceful fallback) until the real asset exists.
 */
export function useMediaAvailable(src: string | undefined | null, kind: MediaKind = "image"): Status {
  const [status, setStatus] = useState<Status>(src ? "checking" : "missing");

  useEffect(() => {
    if (!src) {
      setStatus("missing");
      return;
    }

    let cancelled = false;

    if (kind === "image") {
      const img = new Image();
      img.onload = () => !cancelled && setStatus("available");
      img.onerror = () => !cancelled && setStatus("missing");
      img.src = src;
    } else {
      const el = document.createElement(kind);
      el.preload = "metadata";
      el.oncanplaythrough = () => !cancelled && setStatus("available");
      el.onloadedmetadata = () => !cancelled && setStatus("available");
      el.onerror = () => !cancelled && setStatus("missing");
      el.src = src;
    }

    return () => {
      cancelled = true;
    };
  }, [src, kind]);

  return status;
}
