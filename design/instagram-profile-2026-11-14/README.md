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

## Feedback revision
Option 02 selected for further use; its HF is now the exact connected path from the original brand asset.
The previous separate-letter construction is superseded. Image-led editorial and biography covers have been
expanded to the frame; the grid is regenerated from the updated Remotion thumbnails.

## Variant 05 — figure outside the paint
Requested alternative: ochre brush sits only behind the original connected HF; Gabriel's approved
engraving stands beside it on cream, with a clear gap. Independent SVG groups preserve all three layers.
`05-gabriel-fora-mancha-hf.png` is the square upload; `-circular.png` previews the profile crop.
Regenerate with `node scripts/festival_avatar_outside_brush.mjs`. Does not supersede option 02 pending selection.

Final selection: Paulo prefers option 02 with the shared ochre brush (14 November).
Option 05 remains an unselected alternative. The approved 02 PNG/SVG is available in `/divulgacao/`.
