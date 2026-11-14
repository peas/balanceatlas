# Ten-pose press study — 14 November 2026

Requested by Paulo: sparse anatomical engravings from his real press, variable pose durations, a small camera drift or an abrupt +30% zoom followed by a 10-point retreat, and a quick ochre gesture behind the person during selected holds.

## Source and generation

Pool press: `natureza-pxl-20241201-151159837`, local public cut `public/festival/ig/natureza-v1/piscina-press-solo.mp4`, original offset 4.4 seconds. Contact sheet: ffmpeg `-ss 0.8 -vf fps=1/1.2,crop=720:760:0:0,scale=512:544,tile=5x2`. Ten equal cells, left to right, then next row. Sampling times are approximate; see manifest. Source crop preserves visible hand contact and the complete movement above the pool edge; the first pose has occluded lower body in the source.

One built-in image_gen edit, transparent_background=true, with the single sheet as edit target. Exact prompt: `prompt.txt`. Original generated sheet preserved as `engraved-sheet.png`; output dimensions 1923x817 rather than requested 2560x1088. `scripts/festival_press_sheet.mjs` slices by proportional cell boundaries and normalizes cell size only (512x544), not individual subject height. Assets: `public/festival/ig/press-study-v1/`.

The result is an artistic interpretation: enhanced muscles, possible contour/face drift. No claim of exact biomechanics, original-pixel preservation or corrected technique. Grayscale/very slight sepia in the composition suppresses colour fringing. The shared sheet trades per-pose resolution for consistency; enlarged details are softer than a dedicated full-resolution engraving. All ten cells reviewed together; not individually approved by Paulo yet.

## Motion and layers

`src/festival/press-study/PressStudy.tsx`: 1080x1920, 60 fps, 600 frames (10s). Pose durations [45,30,35,80,30,95,35,35,40,175]. Hard pose cuts, no anatomical interpolation. Camera anchor stays near hand contact. Accents only on poses 4, 6 and 10. Paint is a separate v07 BrushStroke behind the person, quickly revealed and hidden before movement resumes. Text and HF remain separate.

- Calm: cream, up to +7.5% slow zoom during holds.
- Pulse: deep green, +30% in 8 frames, down to +20% by frame 19, settles to +3%; quick ochre gesture.

Preview: `/instagram/press-estudo/` (noindex, experimental). Both share the exact same ten illustrated poses and timing. Original video is provided separately for honest comparison.

## Reproduce

1. `node scripts/festival_press_sheet.mjs` (also supports `--help`).
2. Bundle `src/festival/press-study/render.tsx`, with fonts and `festival/ig/press-study-v1` under its public directory.
3. Render `press-calmo` / `press-pulso`, H.264 CRF24. Current files under `local/festival/press-study/`; generated MP4s stay out of git.

This experiment does not authorize replacing the full-motion exercise library. Confirm aesthetic direction first; before teaching from it, review poses with Gabriel and preserve access to the real-speed source.
