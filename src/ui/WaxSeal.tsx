import { motion } from "framer-motion";
import { recipient } from "@/data/config";

interface WaxSealProps {
  broken: boolean;
  /** Initial shown at the center of the seal — defaults to the recipient's first letter */
  initial?: string;
}

/**
 * A circular rose-gold wax seal, embossed with the recipient's initial
 * and catching a soft highlight of light. On `broken`, it splits into
 * two halves and falls away — the gesture that opens the whole
 * experience.
 */
export function WaxSeal({ broken, initial }: WaxSealProps) {
  const letter = (initial ?? recipient.name.trim().charAt(0) ?? "?").toUpperCase();

  return (
    <div className="relative h-20 w-20 sm:h-24 sm:w-24" aria-hidden="true">
      {/* Left half */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          broken
            ? { x: -14, y: 10, rotate: -18, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        style={{ clipPath: "polygon(0 0, 52% 0, 48% 100%, 0 100%)" }}
      >
        <SealDisc letter={letter} />
      </motion.div>

      {/* Right half */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          broken
            ? { x: 14, y: 10, rotate: 18, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 48% 100%)" }}
      >
        <SealDisc letter={letter} />
      </motion.div>
    </div>
  );
}

function SealDisc({ letter }: { letter: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_6px_14px_rgba(169,117,107,0.4)]">
      <defs>
        <radialGradient id="sealGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#7A3B4E" />
          <stop offset="55%" stopColor="#5A1E2F" />
          <stop offset="100%" stopColor="#320F1A" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sealGradient)" stroke="#B9975B" strokeOpacity={0.8} strokeWidth={1.25} />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#E7D2A6" strokeOpacity={0.35} strokeWidth={0.75} />
      {/* Soft highlight — catches light; brightens slightly on hover via the envelope's group state */}
      <ellipse
        cx="38"
        cy="30"
        rx="16"
        ry="10"
        fill="#FDF8F5"
        opacity={0.28}
        className="transition-opacity duration-500 group-hover:opacity-45"
      />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="34"
        fill="#FBF6F2"
        fillOpacity={0.95}
      >
        {letter}
      </text>
    </svg>
  );
}
