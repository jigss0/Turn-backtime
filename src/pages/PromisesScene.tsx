import { chapterCopy } from "@/data/config";
import { promises } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { PromiseCard } from "@/ui/PromiseCard";

export function PromisesScene() {
  return (
    <SceneWrapper id="promises" copy={chapterCopy.promises} maxWidth="4xl" tone="soft">
      <div className="flex flex-col items-center gap-5">
        {promises.map((promise, i) => (
          <PromiseCard key={promise.id} promise={promise} index={i} />
        ))}
      </div>
      <ContinueCue />
    </SceneWrapper>
  );
}
