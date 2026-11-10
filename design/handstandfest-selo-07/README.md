# HandstandFest — traced brush seal

10 November 2026. Paulo supplied `reference.png` and asked for an SVG closer to its brushwork, which he found richer than the procedural circle currently used on the site.

- `hf-brush.svg`: transparent background, true vector paths; approximately 53 KB.
- `hf-brush-paper.svg`: same artwork on the brand's flat cream background.
- `hf-brush.png`: transparent 1080 × 1080 raster preview.
- `reference.png`: supplied source, archived for reproducibility.

The dry-brush outline and gaps are traced from the supplied image with Potrace. Small isolated specks below three pixels are discarded. The upright HF is rebuilt as one geometric path with a continuous crossbar, matching the reference's proportions. Colors use the existing brand values: green `#0f3d33`, yellow `#ffd23f`, paper `#f6f1e4`.

This is a two-color vector interpretation: it preserves the brush silhouette, not the photograph's paper grain or mottled pigment. There are no embedded raster images, fonts, external dependencies, SVG filters or paper-colored cutouts in the transparent version. The holes are actual transparency. Groups `brush` and `hf` can be colored or animated separately.

Regenerate with ImageMagick and Potrace installed:

```sh
python3 scripts/festival_trace_seal.py
magick -background none design/handstandfest-selo-07/hf-brush.svg -resize 1080x1080 design/handstandfest-selo-07/hf-brush.png
```

Checked the rendered 1080 px preview against the supplied reference and verified that SVGs contain paths only (plus accessibility metadata/grouping). Paulo subsequently requested applying this version throughout the site and Remotion previews; implementation is described below.


## Shared live identity

Run `python3 scripts/festival_brand_assets.py` after changing the master. It generates:

- `public/festival/brand/hf-{green,yellow}-v7.svg` and transparent PNG/lossless WebP at 96, 192, 384 and 768 px. `HFSelo.astro` uses a responsive picture with WebP preferred and PNG fallback. Nav, sticky bar, footer and hero share one drawing; the `simples` prop only selects delivery size. The favicon uses the green SVG.
- `public/festival/brand/stroke-v7.svg`: horizontal stroke made by unwrapping/sampling the upper and lower brush edges from the master circle, retaining its dry gaps and bristle clusters. The center stays solid for text readability. This is a derived shape, not a squashed HF logo.
- `src/festival/pincel.ts`: shared brush, HF and stroke paths with normalized transforms (200-square seal, 400×100 stroke). `Brush.tsx` draws the stroke in React. Astro headings use the same shape as a CSS mask; both Instagram kits, the home video stamps and teacher poster name highlights use it. The circular Remotion reveal and separate HF entrance retain their original timing; no runtime random texture or SVG filters.

Keep counters, buttons, schedule cells and utility chips straight. Use one brush accent per title instead of making every UI surface textured. Teacher/poster grain overlays were removed so paper-like noise does not compete with the actual brush. Static carousels remain frozen photos/text, without video.

Versioned asset URLs avoid serving the previous drawing from cache. The historical `festival_pincel.py` now writes only inside the version 06 archive. To regenerate the complete chain: `festival_trace_seal.py` → `festival_brand_assets.py` → `npm run build`.

Validation: 48-page production build passed. TypeScript diagnostics match the existing transition generic issue in `compositions.tsx` (line shifted by the new import); no new errors. Desktop 1280 px and phone 390 px: seals load as WebP, no page overflow. Both Instagram pages render the derived stroke; the new gallery has 10 pieces/21 previews and no video in its static carousel. The new circular seal was inspected in the closing card; original-gallery video playback reached readyState 4 with advancing time.
