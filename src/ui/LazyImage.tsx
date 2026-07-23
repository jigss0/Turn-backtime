import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaAvailable } from "@/hooks/useMediaAvailable";
import { cn } from "@/utils/cn";

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** Applied to the wrapping element, e.g. for aspect ratio */
  wrapperClassName?: string;
}

/**
 * The single image primitive used everywhere a photo appears. Renders
 * nothing if the file is still a placeholder / missing (see
 * useMediaAvailable), uses the browser's native lazy loading, and fades
 * in once decoded rather than popping in abruptly.
 */
export function LazyImage({ src, alt, className, wrapperClassName }: LazyImageProps) {
  const status = useMediaAvailable(src, "image");
  const [loaded, setLoaded] = useState(false);

  if (status !== "available" || !src) return null;

  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      />
    </div>
  );
}
