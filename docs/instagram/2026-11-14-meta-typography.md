# Typography: what Meta actually recommends

Checked 14 November 2026 in Paulo's Chrome. Web fetch returned a login/block page; the actual
Business Help Center article loaded in Chrome and was read directly.

Source: https://www.facebook.com/business/help/980593475366490
Title: About text overlays and the safe zone for ads on Facebook and Instagram.

## Official guidance, scoped to ads

The article recommends clean modern typography, sufficient size and contrast, unobstructed visuals,
few messages and keeping important elements inside the safe zone. It describes the Ads Manager safe-zone
guardrail and warns that taller screens may cause zoom/cropping. It does **not** prescribe a numeric font
size in pixels or points. Its ad guidance is useful for our review but is not an organic Reel specification.
The bottom 40% recommendation is explicitly scoped to Reels ads containing disclaimers.

## HF assessment (our judgement, not Meta requirements)

At 1080-wide export displayed 360 pixels wide:
- 72–90 px headings become approximately 24–30 px: a sensible starting range for short hooks.
- 42 px support copy becomes approximately 14 px: readable in good conditions, but marginal for dense text.
- 28–34 px labels become approximately 9–11 px: keep nonessential; never put the teaching point there.

Prefer 48–60 px for essential supporting information, shorter copy and enough reading time; retain
scene-specific review rather than globally enlarging text over the demonstrator. Test actual phone-sized
frames and moving footage, and the native crop/interface. None of these pixel bands is a Meta mandate.
Earlier HF sizes were based on local visual tests and the existing research, not a new official numeric
specification. The older KB dossier overgeneralizes some ad rules; do not inherit those as universal rules.

## Related gallery adjustment

The pool and deck figures use registered 1080×1920 web canvases, with considerable transparent margins.
`recorte_previa` in `acervo/gravuras.json` limits only the gallery SVG viewport to the visible figure,
with padding. No bitmap regeneration, resampling or changed video registration. `canvas_web` distinguishes
web dimensions from the original master's dimensions. Gabriel's tight profile crop is preferred for
standalone reuse; its registered freeze is linked as a technical variant and no longer duplicated in the gallery.

## Applied after Paulo's approval
Essential supporting copy now starts at 48 px in the shared kit, editorial cards/stories, Gabriel biography,
practice statements, spotlight explanation slides and level descriptions. Secondary labels/counters keep
smaller sizes. Long biography copy was shortened and footer positions adjusted instead of reducing the font.
Headlines already in the 72–90 px range remain; longer headlines retain scene-specific line breaks/sizing.
`festival_instagram_profile.mjs` also generates `grid-3x3-final.png`: the same nine covers, a clean
1080×1440 three-by-three preview without the comparison-sheet header. All covers/review stills are refreshed.
