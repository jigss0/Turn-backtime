import { useState } from "react";
import { motion } from "framer-motion";

interface BloomingFlowerProps {
  onBloomed: () => void;
}

const PETAL_COLORS = ["#7A3B4E", "#B9975B", "#F1E4E1", "#5A1E2F", "#E7D2A6"];

/**
 * A small hidden-surprise trigger: a closed bud that blooms open into a
 * five-petal flower when tapped, then invites the visitor onward. Used
 * to open the hidden extras — a gentler gesture than a plain button.
 */
export function BloomingFlower({ onBloomed }: BloomingFlowerProps) {
  const [bloomed, setBloomed] = useState(false);

  const handleTap = () => {
    if (bloomed) return;
    setBloomed(true);
    window.setTimeout(onBloomed, 750);
  };

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-label="Reveal a surprise"
      className="relative flex h-20 w-20 items-center justify-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-rosegold/60"
    >
      <svg viewBox="0 0 100 100" className="h-16 w-16">
        {bloomed &&
          PETAL_COLORS.map((color, i) => {
            const angle = (i / PETAL_COLORS.length) * Math.PI * 2;
            const cx = 50 + Math.cos(angle) * 14;
            const cy = 50 + Math.sin(angle) * 14;
            return (
              <motion.ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="16"
                ry="10"
                fill={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.92 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            );
          })}

        {!bloomed && (
          <motion.ellipse
            cx="50"
            cy="55"
            rx="10"
            ry="16"
            fill="#B9975B"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <circle cx="50" cy="50" r="6" fill="#8C6F3E" opacity={bloomed ? 1 : 0} />
      </svg>
    </button>
  );
}
