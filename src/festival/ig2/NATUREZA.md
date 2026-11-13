# Nature and water — 13 November 2026

The 12 November delivery contained **curated source cuts**, not Instagram artwork. Paulo requested the
actual pieces on 13 November. The nine cuts now become nine Reels, plus three dedicated 9:16 photo Stories
(waterfall pike, pool group, indoor pike). All twelve appear directly at `/instagram/#natureza`, above the
existing 21-day calendar; they are also registered in the style library and CLI renderer.

## Single source of truth

- `natureza.json`: source catalogue IDs, cut filenames, original timeline offsets, exact freeze frame,
  opening/final questions and draft captions. FPS is 30. Each Reel ends five seconds after the freeze.
- `natureza-pieces.tsx`: shared Player/export compositions. Near-full uncropped footage, 72 px headings,
  230 px HF seal, real v07 brush; no internal archive label in the artwork.
- `NatureCollection.tsx`: visible review section, per-piece anchors, movement/freeze/paint cue buttons,
  captions and source IDs outside the artwork. Static Stories have no playback controls.
- `acervo/catalogo.yaml`: source classification and `aplicacoes_instagram` backlinks.
- `acervo/lotes/natureza-2026-11-12.md`: original curation, source-time cuts and limitations.

The moving image remains natural. Most cuts transition to photographic grayscale/moderate contrast at
an exact CFR still. **Pool solo and deck pike instead retain the original colour scenery and add a registered
engraved foreground over independent v07 ochre paint at 65%.** Gabriel's transitions share that treatment.
Implementation: `EngravedFreeze.tsx`; exact prompts/provenance and limitations:
`design/handstandfest-arte/2026-11-13-freezes/README.md`. These generated illustrations are not the procedural
whole-video filter. The nature section also repeats Gabriel's preview so all three are easy to find.
The final question appears with the freeze; paint and seal can reveal together. Photo Stories retain natural
colour. No sound/music is included; choose music through Instagram when publishing.

The complete source cuts remain archived. Reels show their opening through the selected freeze, not an
assertion that the entire entry/hold/exit was included. Preparation is not a full handstand; the grouped
entry has impulse; the pike entry is asymmetric. Observational questions are not technical prescriptions.
No new event facts, attribution by face, or automatic Instagram posting.

## Reproduce

```sh
python3 scripts/festival_natureza.py --help
python3 scripts/festival_natureza.py
python3 scripts/festival_render.py natureza-piscina-press-dupla natureza-piscina-press-solo natureza-deck-pike-reta natureza-deck-tuck-reta natureza-deck-entrada-agrupada natureza-deck-preparacao natureza-deck-straddle-frente natureza-deck-straddle-baixo natureza-pavilhao-press-sequencia --output-dir local/festival/natureza-2026-11-13-renders/finais
python3 scripts/festival_render.py natureza-cachoeira natureza-comunidade natureza-pike --still --output-dir local/festival/natureza-2026-11-13-renders/finais
```

Preparation uses existing SDR masters, no second HDR tone map. Encodes silent H.264 previews at up to 720 px
width, CRF 24 (26 above 30 s), 30 fps, faststart, and exact-frame WebP freezes (quality 82). The compressed web derivatives
live in `public/festival/ig/natureza-v1/`, following the existing festival media convention. Originals and
1080×1920 final MP4/PNG exports stay in ignored `local/`. Web footage retains its original detail; upscaling
the 464 px pavilion recording does not restore detail. Do not update public media while rendering a bundle.

## Layout review

At 390 px, all twelve cards fit without horizontal page overflow. Questions were shortened using actual
Archivo text bounds rather than shrinking type. The solo water press uses a **lower title** because its
feet reach the upper text area; the gradient follows the text. The indoor pike Story places its seal on
the right to leave the head and arms clear. Review freeze frames and motion, not just frame zero.

## Delivery change

Paulo requested page-only review, without final exports. The initial render batch was stopped; its partial files are historical and predate engraving. Do not present that folder as the final current version. The commands above remain optional reproduction instructions.
