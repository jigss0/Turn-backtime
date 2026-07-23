# Media

Drop files in the matching folder using the filenames already referenced
in `src/data/config.ts` and `src/data/content.ts` — or edit those files
to point at whatever names you'd rather use. Any file left missing is
skipped gracefully; its section simply won't render.

```
images/
  opening.jpg        → config.media.openingPhoto
  closing.jpg         → config.media.closingPhoto
  memory-1.jpg …       → content.memories[n].photo
  extra-1.jpg …        → content.hiddenExtras[n].media

videos/
  rain-window.mp4      → config.media.openingAmbientVideo (optional)

music/
  theme.mp3             → config.backgroundMusic.src

voice/
  letter-reading.mp3    → config.voiceNote.src (optional)
```

Tips:
- Compress photos/video before adding them — this keeps the site fast on
  mobile. Large hero images should be under ~500KB where possible.
- MP3 is fine for music and voice notes; keep the background track under
  a few MB if you can, since it preloads.
