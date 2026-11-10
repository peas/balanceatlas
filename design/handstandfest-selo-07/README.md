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

Checked the rendered 1080 px preview against the supplied reference and verified that SVGs contain paths only (plus accessibility metadata/grouping). This iteration is an archived candidate; the live site, favicon and Remotion seal still use version 06. Prefer this richer contour at larger sizes; review the fine bristles separately before adopting it as a small favicon.
