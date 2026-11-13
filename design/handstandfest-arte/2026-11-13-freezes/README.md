# Registered engraving freezes — 13 November 2026

Paulo requested the approved scenery + intermediate ochre + engraved-person language on selected new nature Reels and Gabriel footage. These three illustrations were generated with the **built-in ImageGen tool**, transparent backgrounds, from the exact stills used by the compositions. The prompts are saved verbatim in `prompts/`; `manifest.json` identifies source hashes, original timestamps, output hashes and consumers. New art is reviewed for composition; individual user approval is still pending.

## Three independent layers

1. Exact source still, in natural colour, with the original scenery intact.
2. The genuine v07 brush circle, ochre `#cb8b34`, at **65% opacity**. Reveal starts five frames after the freeze and finishes over 30 frames. It can be disabled or its opacity changed independently.
3. Black/ivory contour hatching and stipple on the person, with actual alpha outside the body. It enters over ten frames at the freeze. It is an editorial illustration, not a medical/anatomical measurement or a continuous video filter.

Implementation: `src/festival/ig2/EngravedFreeze.tsx`. Coordinates in `FREEZE_ART` are on the source 720×1280 canvas, mapped with the same contain geometry as the video. Master PNGs retain their generated 941×1672 canvas. Web derivatives normalize the very small aspect difference to 1080×1920 with Sharp (`fit: fill`, WebP quality 90 / alpha 100). This is delivery resizing, not a second illustration generation. Assets preload while footage plays.

- Pool solo: freeze 12.6 s into the cut (17 s in the original).
- Deck pike: freeze 16 s into the cut (48 s in the original).
- Gabriel transitions: freeze 6 s into IMG_3372's published clip.

## Review and reuse

Reviewed each foreground over its exact photograph for hands, feet, head, hip position and silhouette; no conspicuous doubled body. The model slightly interprets contour/texture and does not produce a pixel-exact person mask. Review at production size before using these as exercise diagrams. Scenery pixels come from the original still, not a generated background. The foreground covers the original person; no scene inpainting was used. The pool cap retains a muted pink trace from the source.

Keep the full transparent canvas for registered freezes; crop a COPY only when making independent posters, carousel art or shirts. Figure and paint must never be flattened in the reusable asset index. Source photographs remain in `acervo/catalogo.yaml`; these illustrations are separately indexed in `acervo/gravuras.json`.

Review page: `https://handstandfest.com.br/instagram/#natureza` (local `/festival/instagram/`). Nature section includes all nine Reels, three static Stories and a repeated Gabriel preview for easy comparison; the calendar consumes the same Gabriel composition. Only selected pieces use engraving; other freezes stay photographic P&B and group photographs stay natural.

**Delivery:** Paulo cancelled final exports and asked to review in the page. The earlier export batch was stopped; any files left in ignored `local/festival/natureza-2026-11-13-renders/finais/` are historical/partial and do NOT represent these new engraved freezes. No new final MP4/PNG batch is required.
