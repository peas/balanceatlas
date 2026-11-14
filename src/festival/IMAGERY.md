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


## Site simplification — 12 November 2026

Paulo removed decorative blocks, Ts and bars over site photos/videos, and paint behind teacher cards. Shared site compositions follow this rule (hero, teacher, lineup). Retain meaningful text highlights and approved engraved-person/paint compositions A/B; this is not a rejection of the engraving language. Avoid reintroducing floating geometry as filler.

## Reusable processed-asset index — 12 November 2026

`acervo/gravuras.json` indexes eight detached engraved figures and two scene composites with provenance,
prompts, master/web paths, dimensions, alpha, review status and reuse notes. Originals stay in catalogo.yaml.
Reuse the figure with optional independent v07 paint rather than regenerating it for each post. Keep approval
states distinct; a generated figure is not a measurement or a substitute for an exercise demonstration.
The Instagram production page exposes the same inventory. Print suitability still requires size/proof review.

After export review, Paulo requested larger media on Reels/Stories. `gabriel-transicoes-tela` compares an
almost full-frame native video with the earlier small brush window; freeze retains the body's scale, while
paint highlights the text. `gabriel-gravura-story` enlarges the illustration in a dedicated story layout.
These are comparison proposals, not a global replacement of every composition. Preserve whole-body motion.

## Approved Instagram signature and framing — 12 November 2026

Paulo approved the larger-video test as the default for existing and future Instagram pieces.

- Reels/video Stories: full or almost full frame; preserve complete hands/feet and the movement path. A 3:4 source uses a width-filling uncropped box. Text overlays use a controlled gradient or a free side column, never an automatic crop to fill 9:16. Freeze and live video retain identical geometry.
- HF seal is visibly larger (220–230 px on a 1080 px canvas; larger on closing cards). Place it in available space, away from the body and platform controls. These sizes are working defaults, not platform requirements.
- Static Stories and individual images carry the HF seal. **Carousel interiors do not:** reserve the logo/signature for an informative final slide with a useful takeaway/question and where to continue the conversation. Do not append an empty logo card.
- Ochre is the recurring visual signature: one brush gesture/highlight when the piece has no ochre artwork. An engraved figure on an ochre disc/brush already supplies the gesture; avoid redundant marks. Preserve the authentic v07 bristles.
- Remove internal labels such as “acervo de retiros · Balance Atlas” and “gravura a partir do acervo” from exported artwork. Keep provenance, original credits and permissions in catalogues, review notes and captions where needed. Do not remove a photographer’s actual signature from an image.
- Most openings remain concrete questions. Development and event logistics may remain statements.

Implementation: `ig2/kit.tsx` (`VideoScene`, `BrandSeal`, `PracticeClose`), individual art compositions and the legacy kit's closing seal. Scope is Instagram; this does not reintroduce decorative overlays behind teachers on the website. The former old/new framing comparison is now a description of the approved language. Historical exported files are snapshots; regenerate to obtain the current design.

Research distinction: Meta's [Best Practices hub](https://about.fb.com/news/2024/10/best-practices-education-hub-creators-instagram/) describes general and personalized account guidance. It does not establish a rule that logos must be on the last carousel slide. That choice is Paulo's approved editorial/identity direction, not an algorithmic performance claim. A safe-zone help page required login during this check; no new universal margin percentage was inferred.

## Implemented registered freezes — 13 November 2026

Treatment A is now implemented for the pool-solo, deck-pike and Gabriel-transitions Reels on `/instagram/`.
`ig2/EngravedFreeze.tsx` keeps the exact colour still, v07 paint (65%) and transparent generated figure
independent; `showPaint`/`paintOpacity` change the middle layer only. Assets preload during playback.
Source-frame prompts, hashes, timing and alignment review: `design/handstandfest-arte/2026-11-13-freezes/`.
Unlike the older hybrid, this background is the original still. Generated contours remain an interpretation;
check the overlay at hands/feet/hips, not just the isolated illustration. No final export was requested for
this iteration: the user reviews the live compositions on the page. Keep whole-video procedural hatching
separate from this static anatomical illustration technique.


## Stepped press engraving experiment — 14 November 2026

At Paulo's request, one 5x2 contact sheet from his pool press was transformed into ten illustrated poses together to encourage consistent hatching. See `design/handstandfest-arte/2026-11-14-press-sequence/README.md` and `/instagram/press-estudo/`. Remotion cuts between poses with variable holds; gentle zoom or +30% impulse / 10-point retreat; independent ochre briefly enters/exits behind the figure on three holds. This is an explicitly requested sparse-pose animation experiment, not frame-by-frame full-video generation or a new default. The generator exaggerates some musculature and may shift contours; no morph/interpolation, technical posture assessment or claim of pixel registration. Review before reuse.
