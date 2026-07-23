import { motion } from "framer-motion";
import { chapterCopy } from "@/data/config";
import { reflections } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";

/**
 * A short, honest "looking back" chapter — quieter and more spaced out
 * than the letter, meant to read slowly.
 */
export function ReflectionsScene() {
  return (
    <SceneWrapper id="reflections" copy={chapterCopy.reflections} tone="deep">
      <div className="flex flex-col gap-8">
        {reflections.map((line, i) => (
          <motion.p
            key={i}
            className="font-body text-body font-light leading-relaxed text-cream/80"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.p>
        ))}
      </div>
      <ContinueCue />
    </SceneWrapper>
  );
}
