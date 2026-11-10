# HandstandFest — logo refinement 05

## Current direction, 10 November 2026

Paulo shared two screenshots and said these were Gabriel's favorites and that he wants to follow this direction. The visible selectors identify **E (original forest green/yellow)** and **C (original forest green/pink)**. Exact tokens were verified against `src/festival/festival.css`. The muted C and D derivatives from round 04 are historical explorations, not the selected direction. No final choice between E and C has been made.

Paulo narrowed the request to creating the logo and recording the direction. The refined drawing is a proposal for review; it was not shown to Gabriel before this export. No hero/story/poster work or production site change is part of this round.

## Drawing

Upright HF with a continuous shared crossbar. The three stems remain separate above and below that crossbar, preserving both initials. Equal 18-unit strokes, 80-unit cap height, 132-unit combined width. The 192×144 enclosure is always 4:3; glyph margins are 30 units horizontally and 32 vertically. The outlined variant has a 6-unit inset frame. All corners remain square. This is custom vector lettering, not a font substitution or an illustrated person.

Wordmark: outlined Archivo 900 at 125% width, consistent with previous rounds. Edition number stays outside the permanent mark.

## Files

- `pranchas/01-logo-verde-amarelo-e-verde-rosa.png`: side-by-side palette and logo review.
- `pranchas/02-antes-e-depois.png`: the shape change, holding the original pink palette constant.
- `logos/hf-e.svg` and `.png`: E, yellow mark on green block.
- `logos/hf-c.svg` and `.png`: C, pink mark on green block.
- `hf-*-inverso`: green mark on accent block.
- `hf-contorno`: green outlined enclosure, transparent background.
- `hf-mono-preto`, `hf-mono-branco`: single-color filled enclosure with transparent letter cutouts.
- `assinatura-*`: symbol and wordmark on transparent background; normal for light fields, `negativa` for dark fields.
- `reducao-*`: native 32/48/96 px symbol exports. Use the filled mark at these sizes; the outline is intended for larger uses.
- `palettes.json`: original tokens and contrast ratios. Accent/stage E = 8.38:1, C = 5.69:1. Muted colors are recorded for provenance but not used in the logo.

Use an external clear space of at least one letter-stem width (18 units in the 192-unit master). Do not stretch the enclosure. SVG text is outlined and needs no font installation. PNG symbols are 768×576; transparent lockups are 1600×400.

## Rebuild and verification

```sh
python source/build_logo_v5.py --assets /path/to/round-01/assets --output /path/to/new-output
node source/export_logo_kit.mjs /path/to/new-output /path/to/node_modules
```

Requires fonttools, @resvg/resvg-js and sharp. The original fonts/licenses are included in `assets/`, so that folder can also be passed as --assets. Both scripts support --help. Nineteen PNGs were rendered and checked for dimensions; transparency was checked in outline, monochrome and lockup assets. Both review boards were visually inspected. Original rounds retained; no publication or commit.
