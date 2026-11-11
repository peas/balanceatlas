# Approved imagery language — 11 November 2026

Paulo explicitly approved BOTH treatments below as a reusable HandstandFest language for the official website, Instagram, other assets and selected message moments in video. They complement the existing identity; neither replaces the other.

## A — Photographic scenery, engraved person, intermediate paint

Keep the scenery photographic and in natural colour. Highlight a selected person with black/ivory contour-following hatching and stipple that describe muscle volume and clothing. Place the actual v07 decorative brush BETWEEN the scenery and the person, in ochre, at **65% opacity**. The person must remain above the pigment, untinted. The background remains visible through the paint. Keep a version without paint.

Published in `/festival/handstand/#pratica-em-qualquer-lugar`. Source recipe: `design/handstandfest-arte/2026-11-11-prompts/compose-hybrid.mjs`; `node design/handstandfest-arte/2026-11-11-prompts/compose-hybrid.mjs 0.65 --publish` updates the editable three-layer SVG, PNG preview and optimized public WebP. The website uses the lightweight static WebP; the editable master retains layers. Existing 55% studies document the iteration; 65% is now the publication setting.

The current hybrid was generated from a photograph: its scenery has the original appearance but is NOT pixel-identical to the original. For future work requiring an intact original background, retain the source photograph as the base and register an illustrated foreground precisely with a reviewed matte. Never promise exact preservation from an unconstrained generative edit. The current warm/cool colour mask is specific to this image, not an automatic person segmenter.

## B — Engraved person, brush behind, deep-green field

Warm ivory/black engraved person on deep green, with a light-ochre brush behind. Keep the v07 bristle defects and natural irregularity. The existing inclined sweep is approved; oval and open arc remain other approved options. Here the light-ochre paint may be opaque: the 65% setting belongs to treatment A over scenery, not all brand paint.

Published in `/festival/sobre/#practice-title`, also present in the static `gravuras-aprovadas` carousel in Instagram2. Shared `EngravingArtwork.tsx` keeps figure, paint and background independent; `paint={false}` removes only the paint. Do not regenerate the figure to change its backdrop.

## Editorial use and motion

- Prefer one prominent person, readable negative spaces and little visual clutter. Keep group/community photographs authentic and photographic. Use the art as emphasis, not on every image.
- Anatomical hatching/stipple is the approved appearance. Plain grayscale, sharpening and a uniform screen-space crosshatch are different treatments and are not substitutes.
- For a message in video: play real footage → freeze a chosen frame → reveal its registered engraving → reveal paint and message. Message and paint may enter together for pace; a brush highlight must not precede the word it highlights. The seal can paint while other content enters.
- Both A and B are approved destinations for that freeze. Keep footage, frozen figure, paint, logo and typography independently controlled. Do not regenerate every video frame. Check hands, feet, hips, clothing and silhouette against the frozen frame; if the illustration moved, use a clear editorial cut rather than implying exact continuity.
- Static approval does not mean the new image-specific freeze transition has been implemented or validated. Existing site story players already support freeze/paint in other treatments. New integrations still need phone-size legibility, timing and alignment review, autoplay muted, pause/navigation, offscreen suspension and reduced-motion behavior.
- Use generous typography and negative space for the message; never cover faces, hands, feet or the meaningful body shape. Keep logo geometry fixed. Decorative paint can vary within its bristle family.

Prompts, tested assets and provenance: [engraving kit](../../design/handstandfest-arte/2026-11-11-prompts/README.md). Brand decisions: [MARCA.md](MARCA.md). Instagram usage: [ig2/README.md](ig2/README.md). General editorial and implementation guidance also live in the complementary global `instagram-creation` and `videos-remotion` playbooks.

The upcoming merge of the official home and `/festival/home2/ocre/` remains with Paulo's other agent. Reuse this language there; this change adds the photographic treatment to an existing official subpage and retains the approved green application.


## C — Continuous exercise-video hatching (experiment, 11 November 2026)

Paulo requested an additional treatment for whole exercise demonstrations with future voiceover, possibly under “Handstand Life” (name undecided). Review page: `/festival/gravura-lab/`; engine, controls, media provenance, Remotion adapter and export instructions: [engraving/README.md](engraving/README.md). Two real clips loop with independent contrast/gamma, hatching strength/spacing/angle, contour, ink/paper and photographic-colour controls. Graphite, green/colour and ochre are starting points for selecting one or two eventual standards, **not approved presets**.

This continuous filter is procedural and geometry-preserving; it treats the background too and does not follow individual muscles like the generated static art. It is appropriate to test for educational footage, while A/B remain the approved static/freeze language. Prioritize joint/hand visibility and temporal readability over ornament. Keep voiceover and captions separate, retain a natural-colour comparison, and document the chosen processing resolution with future presets. No narration or new final visual standard has been approved in this lab.
