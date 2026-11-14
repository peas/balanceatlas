# Instagram profile studies — 14 November 2026

Four avatar layouts reuse the approved Gabriel straight-profile engraving from the pike/tuck transition,
the traced brush and native vector HF letterforms. No anatomy regenerated. SVGs embed the raster engraving;
they are editable layered compositions, not wholly vector illustrations. Individual PNGs are 1080 × 1080.
`avatars-comparacao.png` shows circular crops plus small-size previews. No official logo replacement yet.

`grid-3x3.png` is a profile-layout study using nine available post previews in reverse reading chronology,
not a screenshot of the real Instagram account or a promise of the exact calendar order. Pending exercise
shoots are deliberately omitted. Central 3:4 crops expose where reel covers need their own composition.
Rebuild with `node scripts/festival_instagram_profile.mjs`; inputs/order are in `manifest.json`.

Frame fix: `FestPlayer.tsx` sizes the player to cover the inner container via ResizeObserver, with two pixels
of bleed. The old contain behavior could expose fallback strips when rounded borders changed inner aspect.
Photo/video and filter layers now share the same player geometry; rounded clipping remains on the parent.
