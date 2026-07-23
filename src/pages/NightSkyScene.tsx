import { chapterCopy, features } from "@/data/config";
import { nightSkyStars } from "@/data/content";
import { SceneWrapper } from "@/components/SceneWrapper";
import { ContinueCue } from "@/components/ContinueCue";
import { NightSky } from "@/effects/NightSky";

export function NightSkyScene() {
  if (!features.enableNightSky) return null;

  return (
    <SceneWrapper id="nightsky" copy={chapterCopy.nightsky} maxWidth="5xl" tone="deep">
      <NightSky stars={nightSkyStars} />
      <ContinueCue />
    </SceneWrapper>
  );
}
