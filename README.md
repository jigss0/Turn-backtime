# If I Could Turn Back Time

A handcrafted, cinematic digital keepsake — a personal letter built as a
single continuous scroll experience. React + Vite + TypeScript + Tailwind
+ Framer Motion. No backend, no database, everything runs locally in the
browser and deploys as a static site (GitHub Pages compatible).

## Status: Phase 1

This phase includes:
- Project setup, architecture, and tooling
- The full theme/token system (`tailwind.config.ts`, `src/theme/tokens.ts`)
- The configuration system (`src/data/config.ts`, `src/data/content.ts`)
- Reusable components (`SceneWrapper`, `ContinueCue`, `AudioController`, `Button`, `GlowText`, `ProgressDots`)
- The opening sequence — sealed envelope, rain, candlelight, wax seal — and the Intro chapter it reveals

Later phases add the remaining chapters (Letter, Memories, Appreciation,
Reflections, Promises, Timeline, Closing, Hidden Extras) as additional
scenes in `App.tsx`, using the same `SceneWrapper` pattern.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL it prints — on your phone, use your computer's local
network address (Vite prints one under "Network:") so you can test on
iPhone Safari directly.

## Editing your content

You should never need to touch component code. Everything personal lives
in two files:

- **`src/data/config.ts`** — names, media file paths, background music,
  theme accent, and feature toggles (e.g. turn off hidden extras).
- **`src/data/content.ts`** — the actual words: the letter, memories,
  things you appreciate, promises, and the future timeline.

Every value that still needs replacing is wrapped in `___` — search the
two files for `___` to find everything left to fill in.

Drop your photos, video, and music into `public/media/...` — see
`public/media/README.md` for exactly which filenames each field expects.
Anything left missing is hidden gracefully rather than showing a broken
image or player.

## Building & deploying to GitHub Pages

```bash
npm run build
```

If deploying to `https://<username>.github.io/<repo-name>/` (a project
site, not a custom domain), build with the repo name as the base path:

```bash
BASE_PATH=/<repo-name>/ npm run build
```

Then publish the contents of `dist/` to your `gh-pages` branch (or via
GitHub Actions) however you prefer.

## Project structure

```
public/media/            your photos, video, music, voice notes
src/
  data/
    config.ts             who this is for, media, theme, toggles
    content.ts             the letter, memories, promises, timeline
    types.ts                shared shapes for the above
  theme/tokens.ts          resolves the configured accent color
  ui/                      small reusable primitives (Button, Envelope...)
  effects/                 ambient visual effects (rain, grain, glow)
  components/               composed building blocks (SceneWrapper...)
  hooks/                    audio, scroll, motion, media-availability
  pages/                    full scenes/chapters (Intro, Opening, ...)
  App.tsx                   assembles the chapters in order
```
