# Balance Atlas memory

## 2026-11-10 — Second Instagram batch and restrained site refinement

- Added five examples (three reels, two story frames, a five-image carousel) from five additional catalogued recordings: img-3144, img-2387, img-2390, pxl-20261104_190908352 and img-2381. Total ten pieces. User prefers static image/text carousels; both are frozen and have no playback controls. New optimized SDR assets/provenance in ig/midia.json.
- User then authorized applying hierarchy/decoration suggestions: date/city precede the hero video on mobile; removed exterior bar, seal shadow, hero grain and background noise. Existing ticket link still points to example.com.
- Parallel research saved 24 sourced editorial ideas in KB `handstand-instagram-editorial-alem-evento.md`; Instagram/Shorts access limitations explicitly documented, no invented viral metrics. Priorities: shapes glossary, two views, wall, record vs practice, community.
- User requested separate complementary global playbooks: instagram-creation for editorial/composition/review; videos-remotion for implementation, linked from global CLAUDE.md. Project-specific rules stay in MARCA.md.
- Publication authorized through existing main→GitHub Pages workflow. The previous local-only status below describes the first round. No Instagram posting or MP4 rendering requested.

## 2026-11-10 — Instagram 02 proposal, brush identity and larger type

- Reviewed Claude's newer changes: the palette is CLOSED to original E green/yellow; Gabriel's painted-circle HF is applied throughout the site. Natural/B&W CSS looks are applied and HDR clips recut. Earlier C/E shortlist and rectangle studies are historical.
- Paulo requested an alternative Instagram page using the new straight-letter/brush-motion identity. Implemented `/festival/instagram2/`, with `/instagram2/` alias, in `src/festival/ig2/`. Five pieces: three reels, five-slide carousel and three-frame stories. One live Remotion Player, cue seeks, photographic filter comparison and safe-zone toggle; existing `/festival/instagram` untouched.
- Live feedback: text looked too small. Reflowed hooks and the Line piece to remove narrow text columns; main info 40–48 px, display mostly 80–125 px at 1080. Test at phone width. One large brush gesture per scene, no added grain/music, real media, separate text/image zones. Current identity paths and LOOK presets reused.
- Build passes; no new TypeScript diagnostics (pre-existing generic transition error at compositions.tsx:178). Desktop/mobile, playback, controls and 19 rendered scene/slide bounds checked. README in ig2 documents timings, sources and limits. Local proposal only; no commit, deployment or MP4 export.

## 2026-11-10 — Photo treatment direction recorded

- Paulo asked to record the proposed photo approach for original palettes C/E: lightly softened natural color as the default, moderate-contrast black and white as a secondary treatment, retaining skin/environment detail and natural skin color.
- Starting rhythm: roughly two color photos per B&W, flexible. Keep brand accents colored in clear areas; never cover bodies/hands/feet. Avoid sepia, strong duotone and visible grain for this direction.
- Full guidance in `src/festival/MARCA.md`, “Tratamento das fotos”. P&B/green/pink is the assistant's aesthetic preference, not a final C/E selection. No photos edited or site changes made.

## 2026-11-10 — Historical shortlist: original E and C; logo only

- Paulo supplied screenshots with E and C selected: **original forest green/yellow and forest green/pink** are Gabriel's favorites; Paulo wants to follow that direction. This supersedes the assistant's preference for muted C/sage. No final selection between E and C.
- Scope narrowed to logo and documentation. `design/handstandfest-logo-05/` contains the upright HF refinement (shared crossbar, uniform stems, fixed 4:3 enclosure), original C/E colors, normal/reversed/outline/monochrome SVG/PNG variants, transparent wordmarks, size proofs and before/after board.
- Refined shape is proposed for review, not approved by Gabriel. Exact colors verified in production CSS; exports visually inspected, dimensions/transparency checked. No new application boards, production change or publication.

## 2026-11-10 — Identity round 04, earlier palettes revisited

- Paulo asked for two additional PNG boards using earlier candidate palettes. Latest feedback: green/pink feels somewhat carnival-like; adjust tone/background. C was liked by Gabriel; D ranked second in the earlier research.
- `design/handstandfest-identity-04/pranchas/`: C adjusted (forest green / old rose / sage) and D adjusted (graphite / lavender / gray-lilac), same enclosed HF/F and paper/mineral/full-color applications as round 03. These are new derivatives, not the original C/D tokens; provenance, reproducible scripts and contrast ratios included.
- Pink/cyan was softened to dusty pink/sage; electric violet/mint to lavender/gray-lilac. Accent/stage contrast 5.52 and 6.54. Boards visually inspected; no final choice or publication.

## 2026-11-10 — Identity round 03, enclosed mark

- Paulo wants PNG boards opened in Finder, one per current palette, plus stronger background options. He likes an enclosure around HF; bare letters feel insufficient as a logo.
- `design/handstandfest-identity-03/pranchas/`: two 2600×2320 PNGs, cobalt/lime and plum/butter. Each shows filled and outlined HF, an enclosed inverted-F alternative, plus hero/story/A3/avatar on paper, muted mineral and full stage backgrounds. Main applications use HF; no final choice approved.
- Real photo, clear body zones. Static resvg exports inspected; nested SVG images must be flattened to preserve embedded photos. Round 02 retained.

## 2026-11-10 — Accent visibility fix

- User noticed lime/butter were missing from the interactive comparison. Both accents were too subtle and the top logo overview was hard-coded to plum. Fixed palette-dependent overview and UI colors; primary avatars now use accent on stage, edition/play badges and poster date have visible accent fills. Paper avatars preserved as alternatives.
- Four selector combinations checked in isolated JavaScript; all PNGs regenerated with resvg. Live local-file browser inspection was blocked, so no new live-browser check is claimed.

## 2026-11-10 — Identity round 02 (historical exploration)

- Paulo requested only two logo directions for this round: original inverted F and a new upright HF with the same heavy block style. Both are exploratory, not approved.
- Important correction from Paulo: round 01 felt too brutal/neon compared with the handstand identity he wants. Keep contrast, but prefer calmer applications; colors are open beyond the previous candidates. Do not default to acidic accents or giant dark/color fields.
- `design/handstandfest-identity-02/index.html` compares two logos × two palettes with working selectors. New plum/butter/cream palette and the existing B are applied to hero, story, A3 and avatar, with SVG logo families. More paper, smaller type, natural-color photos; accent only in small details.
- New tokens: paper #f6f0e8, ink #302b32, stage #4c3b49, accent/live #e5cc91, accent-ink #302b32, muted #d7cbd0. Suggested next direction is HF + plum, pending user review.
- All eight desktop/mobile selector combinations passed loading/overflow checks; application boards inspected. Round 01 preserved. No production changes, publication or commit. Scripts and README are included in the study.

## 2026-11-10 — HandstandFest identity study

- Review-only identity study: `design/handstandfest-identity-01/index.html`; reproducible generators in its `source/` folder.
- Palette B is the recommendation, not an approved decision. Three vector logo concepts: Corpo aberto, Apoio (preferred for further development), F invertido. Edition number proposed as a separate badge.
- Deliverables: hero, story 1080×1920, A3 RGB review proof, avatar, outlined SVG logo families on stage/paper and in monochrome, PNG previews, tokens and recalculated contrast ratios.
- Real source image: `public/festival/ig/still-dupla.webp`. Photo looks are browser-filter simulations on SDR media, not highlight recovery. A3 needs the high-resolution original, bleed and a color proof before print.
- Corrected stale contrast claims in `src/festival/MARCA.md`: A accent/stage = 4.493:1 (still below 4.5); D white/accent = 4.346:1 (fails normal text). B accent/stage = 5.685:1; C = 5.689:1, essentially equal.
- Desktop 1400 px and mobile 390 px checks passed: no page overflow, missing images or JS errors; real fonts loaded. Applications inspected for body/text collisions.
- No production CSS/component changes, commit, upload or publication. Existing untracked `acervo/vocabulario.yaml` was left untouched. Next: Paulo/Gabriel choose a logo direction and refine it; keep palette/logo status open until they decide.
