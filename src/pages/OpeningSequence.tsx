import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteMeta, atmosphere } from "@/data/config";
import { Envelope } from "@/ui/Envelope";
import { RainField } from "@/effects/RainField";
import { PetalField } from "@/effects/PetalField";
import { FireflyField } from "@/effects/FireflyField";
import { AmbientGlow } from "@/effects/AmbientGlow";

interface OpeningSequenceProps {
  onOpened: () => void;
}

/**
 * Full-screen gate the visitor sees first: a sealed envelope resting in
 * a soft, calm atmosphere (petals, rain, or fireflies — see
 * config.atmosphere) and candlelight. Opening the envelope both starts
 * the ambient audio (browsers require a user gesture) and reveals the
 * book beneath it.
 */
export function OpeningSequence({ onOpened }: OpeningSequenceProps) {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onOpened();
    // Let the envelope's own opening animation play before the scene
    // dissolves and the book is revealed underneath.
    window.setTimeout(() => setVisible(false), 1900);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-pearl bg-clouds"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="absolute inset-0 bg-vignette" />
          <AmbientGlow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={520} />

          {atmosphere.openingWeather === "rain" && <RainField />}
          {atmosphere.openingWeather === "petals" && <PetalField />}
          {atmosphere.openingWeather === "fireflies" && <FireflyField />}

          <motion.p
            className="relative z-10 mb-10 text-whisper uppercase tracking-wider3 text-cream/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          >
            {siteMeta.openingLabel}
          </motion.p>

          <div className="relative z-10">
            <Envelope opened={opened} onOpen={handleOpen} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
