# Reusable engraving and brush prompts — 11 November 2026

## Intent and handoff

Paulo wants anatomical contour hatching and transparent figures for selected static emphasis in the site and Instagram, including freezes from footage. He will merge his preferred parts of the official home and home2 with another agent. **This kit does not change either homepage or add new live compositions.** Use it as an asset/prompt library, not authorization to redesign the home.

Start with [figure engraving](prompts/01-figure-engraving.txt), then [brush composition](prompts/02-brush-composition.txt). The first is a reusable ImageGen edit prompt; the second is a composition brief for a code-capable/design agent. Decorative paint may vary, but the HF logo master remains fixed. Prompts are stored in English to match repository conventions. Exact executed prompts and the two cleanup requests are beside them.

## Tested assets

Four photographs were attached although the request mentioned two. We explicitly selected the first two as contrasting test cases; the two side-view photos have **not** been processed.

| Asset | Original | Treatment | Status |
|---|---|---|---|
| `assets/reta-costas.png` | `codex-clipboard-b5019ba9-0f70-4c79-a009-adfa61def667.png`, straight two-arm handstand seen from behind | ImageGen engraving + transparent extraction, then edge cleanup request | Review candidate; not user-approved |
| `assets/straddle-montanha.png` | `PXL_20260711_135536963.jpg`, wide two-arm straddle on a deck | Same pipeline, then halo cleanup request | Review candidate; not user-approved |

Built-in ImageGen was used, **not an API CLI or deterministic filter**. Style reference: `../straddle-source.png` (previous user-supplied artwork isolated in the earlier study). Do not copy that figure's one-arm pose into a new source. Local source paths, hashes and generated output provenance are in `manifest.json`; originals remain outside Git.

The current generated figures show contour-dependent line direction, retained clothing/hair and recognizable source poses. The model interprets volume and detail: the backlit straddle in particular becomes more explicit/idealized in muscle shading, and relative proportions/asymmetry are not pixel-exact. These are editorial art, not anatomical measurements or teaching diagrams. Exact source-to-illustration registration in a moving freeze transition has not been tested.

## Transparency and quality findings

Initial tool previews appeared to contain coloured fringes and a large halo. A cleanup pass was requested separately for each. We inspected actual RGBA outputs composited over cream and green: exterior pixels are transparent and the apparent broad halo is absent in the final composition. Some small coloured edge pixels remain at high magnification; inspect full-size before print or high-contrast large placement. Do not erode the silhouette globally to hide them: that risks fingers.

Review both source and result: all major limbs/extremities present, contact points and negative spaces readable, no added objects/text. Fine fingers/face, muscle interpretation, colour fringes and exact pose alignment still require Paulo's approval. The final files are raster PNGs with alpha, not vector figures. The warm body highlights are almost opaque in these exports (alpha often 253 rather than 255), so preview on the actual destination colour. This round does not claim print-ready separations or frame-perfect preservation.

## Native brush variations and reproducible previews

`compose.mjs` builds independent `brushes/{oval,sweep,arc}.svg` from the traced v07 circle and horizontal stroke. Oval is an affine derivative, sweep reuses the existing bristles, and open arc uses a smaller brush-shaped cutout plus a textured opening. These are deterministic vector variants, **not a new ImageGen brush generation**. No HF letters are included in these decorative assets; the seal remains untouched.

```sh
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --help
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --figure /absolute/figure.png --shape arc --background cream --output /absolute/card.svg
```

Requires the repository's Sharp dependency. The cards are 1080×1440 SVG compositions + PNG/WebP previews. They deliberately omit event copy to isolate the art treatment. SVG card files embed raster figures; only the brush assets are all-vector. The script replaces its own output paths; use a new output name for a new study.

The two figure PNGs also have lossless WebP siblings with preserved alpha. `sources/` stores brush-only SVG copies for portable regeneration; no logo lettering. In a standalone copy, install Sharp (`npm install sharp@0.34.5`, the version used here) before running `node compose.mjs`. The photographic originals are not required to recomposite the approved PNGs.

Validation this round: Node syntax/help, successful regeneration of all three SVG/PNG/WebP layouts, real-alpha metadata, visual inspection on cream/green and full comparison board, and the repository Astro build. Prompt quality was assessed against the two photographs, not benchmarked for arbitrary bodies or backgrounds. No new runtime dependencies or live-page changes.

The useful sequence is source → approved transparent figure → separately chosen paint → typography/layout → static export or exact-frame integration. Generate a new person only once per selected source; do not run ImageGen independently on every video frame. Keep titles readable from their intended entry time. Paint may accompany or follow text; it should not arrive before an absent word. A seal can paint while other content enters.

## Relationship to earlier experiments

- The pre-existing home engravings were extracted from supplied illustrations; they were not proof that a simple filter generates anatomical hatching from a photograph.
- The separate `gravura-lab` JS/FFmpeg study approximates engraving with contours and screen-space hatching. It is reproducible and preserves source geometry, but does not follow muscles as these generative interpretations do.
- Background segmentation is optional. If fingers fail, use the brush as the **window of the whole scene**, then P&B/contrast/hatching inside after freezing. It keeps scenery and still needs safe body margins.
- Browser matting and Remotion integration researched earlier remain separate, unvalidated integration candidates. This round creates static art and composition assets only.

## Integration guidance for the next agent

Read this README and [the brand brief](../../../src/festival/MARCA.md) for the brand history, then inspect `src/components/fest/ArtGesture.astro`, `ArtHome.astro`, `src/festival/ArtStories.tsx` and `ig2/art-pieces.tsx` before merging designs. The current ochre hero uses the approved earlier `stag.webp`; do not silently substitute this round's candidates. Keep event facts in `data.ts`/`home-content.ts`. Choose where static art adds emphasis and where the original autoplay stories carry information; that editorial merge belongs to Paulo's other agent.
