# Timeless HandstandFest shirts

Requested by Paulo, 10 November 2026: 2–3 Insider shirt proposals, preferably green, using the current HF, the stacked HAND / STAND / FEST name and a side-profile handstand silhouette with strong alignment. No year, date or edition on the artwork.

Original round: `/festival/camisetas/` presented three studies with front/back visible and download links to outlined SVG print artwork:

1. Classic: small chest seal; stacked name and side-profile figure on the back. Recommended direction.
2. Line: tall figure and compact name on the front; HF and name near the back neckline.
3. Body and letters: the figure acts as the left vertical of a poster-like front; compact name on the back.

Garments are original illustrated crewneck mockups, not official Insider photos or manufacturing proofs. Color is an approximation inspired by **Nori Green**, listed on the [official Tech T-Shirt product page](https://insiderstore.com/products/men-tech-t-shirt), checked 10 November 2026. Do not equate the mockup hex with an official fabric color code or claim size/color stock. The page asks for a fabric sample and print test before production; dimensions are visual estimates.

The silhouette source was generated with the built-in image generation tool, then visually inspected and traced with Potrace. It depicts an invented athlete, not an identifiable person from the archive. Source PNG, final prompt and traced master are stored here. The reviewed pose has joined legs, pointed feet, straight elbows and a stacked side-profile line; this is apparel illustration, not exercise instruction.

## Rebuild

Install `fonttools` in a Python environment and have ImageMagick, Potrace and librsvg (`rsvg-convert`) on PATH. The site itself has no new runtime dependencies.

`python scripts/festival_shirts.py` reads the current HF master, profile master and the licensed Archivo font in `design/fonts/`. It now outputs ten garment SVG/WebPs, ten print-art SVGs (all letters outlined) and the standalone silhouettes in `public/festival/camisetas/`.

To recreate the silhouette master from `silhouette-source.png`: extract alpha, invert to black-on-white, threshold at 50%, trim with 8 px white margin, then Potrace (`--turdsize 5 --opttolerance 0.3`). Normalize to a centered `110 × 400` SVG without stretching. Do not add paper-colored holes; the artwork has genuine transparency.

Green fabric is simulated with gradients in garment mockups. Print artwork excludes those garment gradients. The HF uses shirt-green letters inside a yellow seal in these visual studies; the printer should make that region a knockout matching the actual fabric. The current files are design proposals, not separated production plates. Retain small brush detail in the master; inspect minimum printable detail with the vendor before making screens.

## Related animation fix

Paulo noticed a brush appearing before its word. Poster name highlights now begin after the last character's entrance and recolor the letters only behind the moving brush, preserving contrast. Instagram 2 shows its text at frame 0 and begins the highlight at frame 5; the original Instagram kit keeps text and brush under the same entrance/exit transform. Static carousel frame 30 remains after the completed highlight.

## Legacy cleanup

Removed obsolete tracked logo kits 05/06, `HFMark.astro`, procedural brush generator and old public stroke/favicon; Git retains their history. Untracked studies 01–04 were moved outside the repository, not added to Git. Only the current version 07 logo remains active. Archivo and its OFL license were retained independently because the shirt generator needs them.

Validation: all three pairs inspected as rendered assets; production build passes with 49 pages. TypeScript remains at its pre-existing TransitionSeries generic diagnostic, with no new errors. Poster frames 0, 10, 30 and 60 were inspected: no empty brush before the name, readable white text during entry, green text on the completed yellow brush. The temporary review route was removed before the final build.

## Front-view trio and domain (10 November 2026, second round)

Paulo requested two new arrangements, now shown first on the page; studies 01–03 remain below for comparison:

- **04:** straight / straddle / one-arm figures beside the HF on the front; HAND / STAND / FEST.com.br on the back. Lowercase `.com.br` in yellow, baseline aligned after cream FEST.
- **05:** only the small chest HF in front; three front-view figures on the back with lowercase `handstandfest.com.br` beneath. Recommended of this round.

Three poses, not four, retain adequate separation and scale. They share an anatomical scale and palm baseline. The source sheet is `silhouettes-front-source.png`, generated via built-in image_gen, prompt in `PROMPT-FRONT.md`. Alpha traced to three SVG masters with Potrace; any painted internal shading disappears in the single-color print. The one-arm silhouette was rejected twice by Paulo: a symmetric torso with a removed arm does not show the weight shift; an invented diagonal correction was also rejected. His request is to use an actual handbalancer pose as the anatomical reference. These are apparel illustrations, not a technical teaching diagram.

Regenerate traces and all mockups: `python scripts/festival_shirts.py --trace-front`. Normal regeneration omits the flag; `--help` lists the option. New outputs use 04/05 filenames; the earlier mockups are not overwritten with different designs. `handstand-trio.svg` is reusable transparent vector artwork. All wording is converted to outlines. Domain spelling follows Paulo's request; printing it does not imply domain ownership/redirect has been configured.


Final one-arm: based on the observed pose of **Nicolas Montes de Oca**, from a [Guinness photograph](https://www.guinnessworldrecords.es/news/2022/11/images/nicolas-montes-de-oca-from-mexico-doing-a-hadstand-725538.jpg). Identity/context checked on the [Guinness record page](https://www.guinnessworldrecords.es/world-records/690251-longest-duration-to-perform-a-handstand-on-a-rotating-platform-male). Photo remains in gitignored `local/festival/references/`; the site uses an anonymous generated silhouette, not the photo, and implies no endorsement. `one-arm-reference-source.png` is the final illustration; the original sheet still supplies only the first two poses. `--trace-front` uses those separate inputs and aligns palm baselines. The rejected v2 is not used.
