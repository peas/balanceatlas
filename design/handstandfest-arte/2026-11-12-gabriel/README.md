# Gabriel: four editorial pieces — 12 November 2026

Paulo supplied nine MOVs and eleven photos/screenshots from Gabriel, requested cataloguing and four posts,
then requested final MP4/PNG renders opened in Finder. All twenty records were added to the existing
`acervo/catalogo.yaml` with approximate visual labels, source hashes, person counts and reuse notes.
Originals live only in `local/festival/gabriel-2026-11-12/originals/`; `scripts/festival_gabriel.py` imports
without deleting Downloads and prepares SDR proxies/contact sheets. It does not overwrite semantic labels.

## Chosen sources and editorial placement

| Piece | Source | Treatment | Calendar | Export |
|---|---|---|---|---|
| `gabriel-transicoes` | IMG_3372.MOV, 0–6 s | real-time tuck/straight changes → exact freeze at 6 s → P&B + ochre brush window | Day 2 | 1080×1920, 11 s MP4 |
| `gabriel-praia` | IMG_3377.MOV, 0–10 s | real-time leg shapes on sand → exact freeze at 10 s → P&B + ochre/green | Day 7 | 1080×1920, 15 s MP4 |
| `gabriel-gravura` | IMG_8751.PNG | new ImageGen contour hatching, transparent figure, separate v07 paint | Day 17 | 1080×1440 PNG |
| `gabriel-paisagem` | IMG_7876.JPEG | natural colour photograph, whole body, cream layout | Day 21 | 1080×1440 PNG |

These are four reviewable pieces, not posts sent to Instagram. Keep source captions as drafts and allow
Gabriel to review the generated interpretation. No invented quote, credential or exact location.
The photographic rock setting is a personal record, not a recommendation for beginners.

## Implementation

`src/festival/ig2/gabriel-pieces.tsx` supplies all four compositions to the calendar, Studio and CLI render.
For each Reel: HLG→SDR (Hable, npl=100), autorotation, constant 30 fps, H.264, silent source derivative.
The exported freeze is selected by decoded CFR frame number 180 or 300 from that same derivative.
The composition switches to that still at the same frame; no independent pose redraw or morph occurs.
Colour turns monochrome over 12 frames, the v07 brush window/ochre starts 5 frames after the message and
reveals over 30 frames. The seal paints concurrently. Original scene is retained inside the mask.
P&B freeze is **not** anatomical hatching. Only the static IMG_8751 interpretation is generated engraving.
No segmentation on video: this avoids losing fingertips and keeps frame registration.

Portrait-window masks need `preserveAspectRatio="none"` in the SVG itself, as well as CSS `mask-size: 100% 100%`.
The default SVG aspect ratio produced a central circle and clipped hands in the first export. The dedicated
`window-mask.svg` stretches the brush across the portrait image box; review the encoded freeze with hands
and toes visible, not only the browser preview. The HF logo master remains unchanged.

Source sound was not reviewed/transcribed and is not in the deliverables. Add music in Instagram if desired.
These observational clips are not narrated exercise demonstrations or a substitute for technique review.

## Regeneration

```sh
python3 scripts/festival_gabriel.py
python3 scripts/festival_gabriel_publish.py
python3 scripts/festival_render.py gabriel-paisagem gabriel-gravura --still
python3 scripts/festival_render.py gabriel-transicoes gabriel-praia
python3 scripts/festival_image_index.py --validate --summary
```

`publish.mjs` optimizes the existing photo/figure and the exact decoded freeze frames; it does not regenerate
the person. Executed ImageGen prompt and hashes are in this folder. Master PNG has real alpha.
Only lightweight selected derivatives enter `public/festival/ig/gabriel/`; raw footage is excluded from Git.

## Catalogue findings

IMG_3371 is floor mobility, not handstand. IMG_3375 clips the hand-contact area. IMG_3374 shows a group;
Gabriel was not individually identified. Background counts are approximate. IMG_2225 includes La Revo's
visible signature: retain it and confirm credit before a future reuse; it was not selected this round.
IMG_4209 and IMG_9684 are similar compositions but distinct files. No blanket identity inference for bystanders.

Validation: schema/IDs, selected time bounds, source rotation/HDR metadata, static exports, freeze-transition
frames and final encoded Reel playback/metadata. Existing unrelated TypeScript transition-union error in
`compositions.tsx` remains separate; the Astro build succeeds.

## Larger-media comparison and question-led openings

Follow-up on 12 November: `gabriel-transicoes-tela` preserves the complete source in an almost full-frame
1080×1920 canvas. Text overlays use a dark gradient; at frame 180 the exact still keeps the same geometry,
turns P&B, and gains a short ochre underline. No brush window or body shrink at the freeze. The original
window layout remains available for comparison. `gabriel-gravura-story` is a dedicated 9:16 green static
with a larger transparent figure and independent paint. Most opening hooks are questions; explanatory
follow-through and service posts may stay declarative.

The new five-image `ed-consistencia` carousel combines questions about practice with natural archive photos.
Its five slides export as separate 1080×1440 PNGs, never as a video carousel.

```sh
python3 scripts/festival_render.py gabriel-transicoes-tela
python3 scripts/festival_render.py gabriel-gravura-story ed-consistencia --still
```

Final local review set: `~/Documents/Codex/2026-11-10/den/outputs/gabriel-instagram-ampliado/`.
Checked all five carousel slides, the Story and full-Reel frame sequence; MP4 is H.264, BT.709,
1080×1920, 30 fps, 11 seconds, silent. Player playback and console were checked in the browser.
Filming brief and editorial decisions: `src/festival/ig2/PESQUISA-CAPTACAO.md` and `ESTRATEGIA.md`.
