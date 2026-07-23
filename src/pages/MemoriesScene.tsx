import { chapterCopy, memories } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { MemoryCard } from "@/ui/MemoryCard";

/**
 * The shared-memories gallery. Cards flow in a responsive wrap rather
 * than a rigid grid so the layout still feels handcrafted with any
 * number of memories.
 */
export function MemoriesScene() {
  return (
    <SceneWrapper id="memories" copy={chapterCopy.memories} maxWidth="5xl" tone="blush">
      <div className="flex flex-wrap items-start justify-center gap-8">
        {memories.map((memory, i) => (
          <MemoryCard key={memory.id} memory={memory} index={i} />
        ))}
      </div>
      <ContinueCue />
    </SceneWrapper>
  );
}
