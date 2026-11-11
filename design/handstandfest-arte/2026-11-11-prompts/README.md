# Reusable engraving and brush prompts — 11 November 2026

## Latest approval, publication and handoff

Paulo approved BOTH the photographic-scene/intermediate-paint treatment and the engraved figure on green as a general image/video language for site and Instagram, including freezes that deliver a message. Canonical guide: [IMAGERY.md](../../../src/festival/IMAGERY.md).

The latest publication request supersedes the earlier no-regeneration note. The scene treatment is now exported at **65% opacity** and published on `/festival/handstand/#pratica-em-qualquer-lugar`; the green treatment remains on `/festival/sobre/#practice-title`. Run `node design/handstandfest-arte/2026-11-11-prompts/compose-hybrid.mjs 0.65 --publish` for layered SVG, PNG and public WebP. Neither the figure nor scenery is regenerated to adjust paint. The original 55% output remains in the earlier delivered kit/history.

The official-home/ochre-home2 merge stays with Paulo's other agent. Retain approved art options, optional independent paint, photographic group scenes and story playback/accessibility behavior. The new image-specific freeze transitions are a direction to implement and validate, not completed video work.

## Intent and handoff

Paulo wants anatomical contour hatching and transparent figures for selected static emphasis in the site and Instagram, including freezes from footage. He will merge his preferred parts of the official home and home2 with another agent. **The three original applications were approved on 11 November. They are now used on `/festival/handstand/`, `/festival/sobre/` and as the `gravuras-aprovadas` static carousel in Instagram2. Neither homepage is redesigned here.** Use it as an asset/prompt library, not authorization to redesign the home.

Start with [figure engraving](prompts/01-figure-engraving.txt), then [brush composition](prompts/02-brush-composition.txt). The first is a reusable ImageGen edit prompt; the second is a composition brief for a code-capable/design agent. Decorative paint may vary, but the HF logo master remains fixed. Prompts are stored in English to match repository conventions. Exact executed prompts and the two cleanup requests are beside them.

## Tested assets

Four photographs were attached although the request mentioned two. We explicitly selected the first two as contrasting test cases; the two side-view photos have **not** been processed.

| Asset | Original | Treatment | Status |
|---|---|---|---|
| `assets/reta-costas.png` | `codex-clipboard-b5019ba9-0f70-4c79-a009-adfa61def667.png`, straight two-arm handstand seen from behind | ImageGen engraving + transparent extraction, then edge cleanup request | Visually approved for editorial use |
| `assets/straddle-montanha.png` | `PXL_20260711_135536963.jpg`, wide two-arm straddle on a deck | Same pipeline, then halo cleanup request | Visually approved for editorial use |

Built-in ImageGen was used, **not an API CLI or deterministic filter**. Style reference: `../straddle-source.png` (previous user-supplied artwork isolated in the earlier study). Do not copy that figure's one-arm pose into a new source. Local source paths, hashes and generated output provenance are in `manifest.json`; originals remain outside Git.

The current generated figures show contour-dependent line direction, retained clothing/hair and recognizable source poses. The model interprets volume and detail: the backlit straddle in particular becomes more explicit/idealized in muscle shading, and relative proportions/asymmetry are not pixel-exact. These are editorial art, not anatomical measurements or teaching diagrams. Exact source-to-illustration registration in a moving freeze transition has not been tested.

## Transparency and quality findings

Initial tool previews appeared to contain coloured fringes and a large halo. A cleanup pass was requested separately for each. We inspected actual RGBA outputs composited over cream and green: exterior pixels are transparent and the apparent broad halo is absent in the final composition. Some small coloured edge pixels remain at high magnification; inspect full-size before print or high-contrast large placement. Do not erode the silhouette globally to hide them: that risks fingers.

Review both source and result: all major limbs/extremities present, contact points and negative spaces readable, no added objects/text. Visual direction is approved; fine fingers/face, colour fringes and exact pose alignment still need inspection for each new use. The final files are raster PNGs with alpha, not vector figures. The warm body highlights are almost opaque in these exports (alpha often 253 rather than 255), so preview on the actual destination colour. This round does not claim print-ready separations or frame-perfect preservation.

## Native brush variations and reproducible previews

`compose.mjs` builds independent `brushes/{oval,sweep,arc}.svg` from the traced v07 circle and horizontal stroke. Oval is an affine derivative, sweep reuses the existing bristles, and open arc uses a smaller brush-shaped cutout plus a textured opening. These are deterministic vector variants, **not a new ImageGen brush generation**. No HF letters are included in these decorative assets; the seal remains untouched.

```sh
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --help
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs
node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --figure /absolute/figure.png --shape arc --background cream --output /absolute/card.svg
```

Requires the repository's Sharp dependency. The cards are 1080×1440 SVG compositions + PNG/WebP previews. They deliberately omit event copy to isolate the art treatment. SVG card files embed raster figures; only the brush assets are all-vector. The script replaces its own output paths; use a new output name for a new study.

The two figure PNGs also have lossless WebP siblings with preserved alpha. `sources/` stores brush-only SVG copies for portable regeneration; no logo lettering. In a standalone copy, install Sharp (`npm install sharp@0.34.5`, the version used here) before running `node compose.mjs`. The photographic originals are not required to recomposite the approved PNGs.

Validation this round: Node syntax/help, successful regeneration of all three SVG/PNG/WebP layouts, real-alpha metadata, visual inspection on cream/green and full comparison board, and the repository Astro build. Prompt quality was assessed against the two photographs, not benchmarked for arbitrary bodies or backgrounds. No new runtime dependencies. The later integration below uses these same approved assets.

The useful sequence is source → approved transparent figure → separately chosen paint → typography/layout → static export or exact-frame integration. Generate a new person only once per selected source; do not run ImageGen independently on every video frame. Keep titles readable from their intended entry time. Paint may accompany or follow text; it should not arrive before an absent word. A seal can paint while other content enters.

## Relationship to earlier experiments

- The pre-existing home engravings were extracted from supplied illustrations; they were not proof that a simple filter generates anatomical hatching from a photograph.
- The separate `gravura-lab` JS/FFmpeg study approximates engraving with contours and screen-space hatching. It is reproducible and preserves source geometry, but does not follow muscles as these generative interpretations do.
- Background segmentation is optional. If fingers fail, use the brush as the **window of the whole scene**, then P&B/contrast/hatching inside after freezing. It keeps scenery and still needs safe body margins.
- Browser matting and Remotion integration researched earlier remain separate, unvalidated integration candidates. This round creates static art and composition assets only.

## Integration guidance for the next agent

Read this README and [the brand brief](../../../src/festival/MARCA.md) for the brand history, then inspect `src/components/fest/ArtGesture.astro`, `ArtHome.astro`, `src/festival/ArtStories.tsx` and `ig2/art-pieces.tsx` before merging designs. The current ochre hero uses the approved earlier `stag.webp`; do not silently substitute these assets without a specific editorial reason. Keep event facts in `data.ts`/`home-content.ts`. Choose where static art adds emphasis and where the original autoplay stories carry information; that editorial merge belongs to Paulo's other agent.

## Approved integration and independent layers

`src/festival/EngravingArtwork.tsx` is shared by Astro and Remotion. `figure="straight" | "straddle"`, `paint="oval" | "sweep" | "arc" | false`, and `background="cream" | "green" | "none"` are independent. Disabling paint does not move or resize the figure. `paintProgress` reveals only the paint; animation timing belongs to the caller. Astro renders static HTML without a player. Remotion passes `Img` and a source resolver so exports wait for assets.

`node design/handstandfest-arte/2026-11-11-prompts/compose.mjs --publish` regenerates independent public WebP figures and SVG paint files under `public/festival/ig/arte/engraving-v1/`. No brush is baked into a figure. Static PNG exports: `python3 scripts/festival_render.py gravuras-aprovadas-1 gravuras-aprovadas-2 gravuras-aprovadas-3 --still`.

## Bento selection and selective photography tests

Paulo clarified that he means anatomical hatching/stipple, not ordinary grayscale, and that the treatment works better with one person and little visual clutter. A procedural crosshatch trial on four bento photographs was rejected by the implementation review: it also textures scenery and does not follow muscles. Group photographs remain unchanged. Only the overhead straddle (`saopaulo-2024/106.webp`) receives a generated transparent engraving, with a separate optional v07 paint layer. `BentoItem.engraving` and `paint` are independent; the original URL remains in `src`. Source, prompt and generated PNG are recorded here. The shared ordinary P&B recipe now lives in `src/festival/photo-look.ts`; do not confuse it with this illustration process.

A further requested study keeps the mountain/deck scene photographic and renders only the athlete as engraving: `assets/straddle-landscape-hybrid.png`. See reusable prompt `prompts/03-selective-photo.txt` and the exact executed `test-hybrid.txt`. This is a generative composite: the background looks like the original but is NOT a byte-identical retained photograph. For exact preservation, a registered foreground and a reviewed matte are needed. The standalone cutout changed proportions slightly; a naive paste would leave a doubled silhouette.

`compose-hybrid.mjs` adds native v07 paint BETWEEN that photographic scene and its existing engraved person, restoring person pixels through a scene-specific warm/cool colour mask. It does not redraw the person to adjust paint. The mask works for this warm figure against cool scenery, not arbitrary photographs; inspect edge pixels and dark hatching. Output is an editable three-layer SVG and PNG preview. `node .../compose-hybrid.mjs 0.55` changes opacity; 36% was too faint, 55% was the next study, and 65% is now the approved publication setting. The two landscape treatments are additional options, not replacements for the approved cream/green compositions, and the painted scene is now used on the official handstand page.

Prefer isolated subjects, readable negative spaces, light/simple backgrounds and limited ornament. Keep authentic group/community photographs photographic. For video, this is a selected frozen still: exact source registration is not yet validated and is required before a seamless live-to-art transition.
