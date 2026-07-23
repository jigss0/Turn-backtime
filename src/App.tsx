import { useEffect, useState } from "react";
import { features, media } from "@/data/config";
import { OpeningSequence } from "@/pages/OpeningSequence";
import { IntroScene } from "@/pages/IntroScene";
import { LetterScene } from "@/pages/LetterScene";
import { MemoriesScene } from "@/pages/MemoriesScene";
import { AppreciationScene } from "@/pages/AppreciationScene";
import { ReflectionsScene } from "@/pages/ReflectionsScene";
import { PromisesScene } from "@/pages/PromisesScene";
import { VideoScene } from "@/pages/VideoScene";
import { TimelineScene } from "@/pages/TimelineScene";
import { NightSkyScene } from "@/pages/NightSkyScene";
import { ClosingScene } from "@/pages/ClosingScene";
import { HiddenExtrasScene } from "@/pages/HiddenExtrasScene";
import { FilmGrain } from "@/effects/FilmGrain";
import { AudioController } from "@/components/AudioController";
import { BackCue } from "@/ui/BackCue";
import { ProgressDots } from "@/ui/ProgressDots";
import { PageStage } from "@/components/PageStage";
import { ChapterNavigationProvider } from "@/context/ChapterNavigation";
import { preloadImages } from "@/utils/preload";

/**
 * Assembles every chapter, keyed by the ids in `chapterOrder`
 * (src/data/config.ts), and hands them to PageStage — which renders the
 * experience as a book read one full screen at a time, turned via
 * Continue / Back / swipe / arrow keys, rather than scrolled.
 *
 * ChapterNavigationProvider is mounted once here, at the top, so
 * PageStage and the fixed navigation chrome around it (BackCue,
 * ProgressDots, and any ContinueCue inside a chapter) all share the
 * same "which page are we on" state.
 */
export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    preloadImages([media.openingPhoto, media.closingPhoto]);
  }, []);

  return (
    <div className="relative min-h-dvh bg-pearl">
      <FilmGrain />

      {features.showEnvelopeIntro && <OpeningSequence onOpened={() => setOpened(true)} />}

      <ChapterNavigationProvider>
        {opened && (
          <>
            <BackCue />
            {features.showProgressIndicator && <ProgressDots />}
          </>
        )}
        {features.enableBackgroundMusic && <AudioController shouldStart={opened} />}

        <PageStage
          chapters={{
            intro: <IntroScene />,
            letter: <LetterScene />,
            memories: <MemoriesScene />,
            appreciation: <AppreciationScene />,
            reflections: <ReflectionsScene />,
            promises: <PromisesScene />,
            video: <VideoScene />,
            timeline: <TimelineScene />,
            nightsky: <NightSkyScene />,
            closing: (
              <>
                <ClosingScene />
                <HiddenExtrasScene />
              </>
            ),
          }}
        />
      </ChapterNavigationProvider>
    </div>
  );
}
