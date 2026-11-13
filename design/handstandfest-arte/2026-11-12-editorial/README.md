# New editorial engravings — 12 November 2026

Paulo requested selected catalogue photos to receive the established anatomical hatching, background removal
and separate ochre paint, reducing repetition of the old fixed straddle. Two new figures were generated
with built-in ImageGen, not the procedural Remotion filter. Exact prompts and source/output hashes are
in `prompts/` and `manifest.json`. The originals stay in the existing catalogue/R2.

## Selection and application

- `profile.png`: Greece 2025 / 11. Straight handstand in low three-quarter side view, clothing retained.
  Oval paint. Applied to the straight slide in day 3 and the supporting story in day 16.
- `diagonal.png`: Thailand 2026 / 18. Rear view, asymmetric leg opening, two hand supports.
  Open arc. Applied to the day 3 cover and day 2 supporting story.
- Existing `../2026-11-11-prompts/assets/straddle-overhead.png`: reused for day 3's straddle slide
  over a light-ochre sweep on green. No third new image generation.

Community/class photos remain natural. An illustration does not replace missing exercise footage.
These generated interpretations are editorial, not posture measurements: source poses are recognizable,
but line work, muscles and proportions are interpreted. Check fingers, wrists and perspective before
technical teaching or large-format print. Figure pixels are not registered for seamless video overlays.

## Layers and reproducibility

`EngravingArtwork.tsx` exposes the new `profile`, `diagonal` and `overhead` figures alongside existing ones.
`paint` can be `false`, `oval`, `arc` or `sweep`; `paintTone` selects ochre/light ochre independently
of the background. Figure and SVG brush remain separate; never bake the brush into the cutout.
WebP files under `public/festival/ig/arte/engraving-v1/` preserve alpha losslessly.

From the repository root:

```sh
node design/handstandfest-arte/2026-11-12-editorial/publish.mjs
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --figure design/handstandfest-arte/2026-11-12-editorial/assets/profile.png --shape oval --background cream --output local/engraving-review/profile.svg
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --figure design/handstandfest-arte/2026-11-12-editorial/assets/diagonal.png --shape arc --background green --output local/engraving-review/diagonal.svg
python3 scripts/festival_render.py ed-formas-1 ed-formas-2 ed-formas-3 --still
```

These commands export existing art; only the saved ImageGen prompts regenerate a person. The native
compositor preserves the generated alpha and reuses v07 brush geometry. No new logo was generated.
Validation: inspect original vs. generated pose, alpha on cream/green, Remotion still exports and Astro build.
The tool's isolated preview can show apparent coloured fringes; the composited exports were checked at
publication size, without global erosion that could remove fingers.
