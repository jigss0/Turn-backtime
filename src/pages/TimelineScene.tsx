import { chapterCopy } from "@/data/config";
import { timeline } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { TimelineItem } from "@/ui/TimelineItem";
import { accent } from "@/theme/tokens";
import { cn } from "@/utils/cn";

/**
 * The future timeline — hopes, trips, and milestones along a vertical
 * spine. Alternates sides on wider viewports, stacks on mobile.
 */
export function TimelineScene() {
  return (
    <SceneWrapper id="timeline" copy={chapterCopy.timeline} maxWidth="4xl" tone="soft">
      <div className="relative flex w-full flex-col gap-12 sm:gap-16">
        <div
          className={cn("absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 sm:block", accent.bg, "opacity-30")}
          aria-hidden="true"
        />
        {timeline.map((entry, i) => (
          <TimelineItem key={entry.id} entry={entry} index={i} align={i % 2 === 0 ? "right" : "left"} />
        ))}
      </div>
      <ContinueCue />
    </SceneWrapper>
  );
}
