# Balance Atlas memory

13 Nov 2026: visual consistency published in 71ab2a0 (Pages succeeded). Follow-up venue copy supplied by Paulo: “Um espaço amplo, confortável, para as práticas do handstand e além.” without quotation marks; metro proximity unquoted; removed the explanatory photo/source/date paragraph at his request. Venue Instagram links remain on the photo cards.

13 Nov 2026: applied Gabriel’s screenshot feedback to the official site: shared 3px content outlines / 10px corners, rectangular CTAs including nav, contrasting media frames, rounded ticket cards without faded outlines, edition above HAND aligned left. Tokens in festival.css; decision and future design principles in MARCA.md supersede 12 Nov pill CTAs/inline edition. Mobile (390px) and desktop (1366px) visually checked; build passed. Paulo requested publication via the existing main → GitHub Pages workflow.

13 Nov 2026: nature curation now has 9 Reels + 3 photo Stories at `/instagram/#natureza`, plus a Gabriel comparison. Selected freezes add registered engraving over original colour scenery and independent ochre at 65%. Source/copy registry `ig2/natureza.json`; recipe `ig2/NATUREZA.md`; prompts in `design/handstandfest-arte/2026-11-13-freezes/`. Page-only review requested; partial earlier exports are obsolete.

Nature/pool batch (12 Nov 2026): 8 videos + 4 new photos catalogued; high-res source linked to existing Thailand photo. Nine local cuts and five photo derivatives via `scripts/festival_curated_media.py`; shortlist, source-time offsets and omissions in `acervo/lotes/natureza-2026-11-12.md`. Prioritize water presses, waterfall pike and group pool photo. No new posts published.

## 2026-11-12 — Full-video and larger signature approved

- Paulo approved full/near-full video across Instagram, with unchanged geometry at freeze and a larger HF seal. Added shared video/signature primitives and updated window-based pieces.
- Static Stories and standalone images carry HF; carousel interiors do not. Only an informative closing slide is signed. Ochre gesture is the recurring cue; do not double it on already painted engravings. Internal archive labels removed from artwork; provenance retained. Rules in ig2/README.md, IMAGERY.md, MARCA.md and global playbooks.

## 2026-11-12 — Instagram post-export refinement

- Larger-media comparison: day 2 full-frame Reel keeps body size through its exact freeze; dedicated green engraving Story enlarges the figure. Original window version remains for comparison, not a blanket layout replacement. New 5-slide consistency carousel occupies day 16. Exported and visually reviewed 1080p MP4/PNGs.
- Most openings are now concrete questions, per Paulo; service posts and explanatory follow-through can remain statements. Practice/community use #handstandlife; event uses #handstandfest. Invite contributions to a developing meetup/place map.
- Filming checklist and future carousels share `ig2/production-plan.ts`; research/brief in `ig2/PESQUISA-CAPTACAO.md`. Story reposts should add context, not mirror every post. Public view counts are dated examples, not comparable performance rankings.
- Reusable art index: `acervo/gravuras.json` (8 transparent figures + 2 composites), referenced by IMAGERY.md and page. Provenance and separate paint retained.

## 2026-11-11 — Adjustable continuous-video engraving

- Built `/festival/gravura-lab/`: two exercise clips containing Paulo, muted loops, independently adjustable contrast/tones/hatching/contours/colour, saved browser state and portable JSON. GPU preview reached ~30 fps versus ~8 fps with both CPU filters in this browser.
- Reusable engine and actual Remotion adapter: `src/festival/engraving/README.md`. A short 30 fps MP4 verifies export. Full-video treatment is a draft for a possible Handstand Life exercise + voiceover series, not yet an approved preset or title. Anatomical static illustrations and freeze/paint remain complementary.

## 2026-11-11 — Two approved image/video treatments, published

- Paulo explicitly approved both scenery + engraved person + intermediate ochre paint, and engraved person + brush on green, as general imagery language for site/Instagram and message-bearing video freezes. Canonical guide: `src/festival/IMAGERY.md`.
- The publication request supersedes the prior notes-only request: rendered the scenery version at 65% paint and applied it to the official handstand page; retained the green version in Sobre o evento. The replaced group photo stays in the community bento. Layered masters remain editable; the site serves an optimized WebP.
- Prompts and global playbooks updated. New matching freeze transitions are design guidance, not newly implemented videos. Home merge still belongs to the other agent.


## 2026-11-11 — Final preference and handoff

- Paulo liked the selective engraved-person / photographic-scenery study and now prefers **65% paint opacity** for its intermediate layer. Existing files remain at 55%; **do not regenerate yet**. The 65% value is a next-render preference, not a tested output or a global opacity token.
- He is moving the official-home/ochre-home2 merge to another agent. Handoff and retained design decisions are in CLAUDE.md and the engraving kit README. This turn updates notes only.


## 2026-11-11 — Approved art, selected bento and photographic scene

- Applied approved art to handstand/about pages and `gravuras-aprovadas` static carousel. Reusable `EngravingArtwork` keeps figure, optional paint and background independent.
- Paulo corrected ordinary P&B to anatomical hatching/stipple and prefers single subjects with little clutter. Rejected procedural crosshatch on group photos; one overhead straddle is illustrated with a separate brush. Group photos keep their previous appearance.
- Added selective illustration over photographic scenery as an additional study, then a native v07 intermediate paint layer. Raised paint opacity from 36% to 55% at Paulo’s request. Generative hybrid is not a pixel-exact original background; scene-specific mask and editable SVG are recorded in the kit. Neither replaces the cream/green applications.


## 2026-11-11 — Reusable engraving prompts and paint family

- Two real-photo tests (rear straight handstand, mountain straddle) generated via built-in ImageGen with anatomical contour hatching and alpha. Exact prompts/provenance/limitations: `design/handstandfest-arte/2026-11-11-prompts/README.md`. Generative redraw approximates anatomy; not an exact filter. The three original applications were visually approved on 11 November.
- Separate figure from paint. Native SVG oval/sweep/open-arc variants inherit v07 bristles; HF seal stays fixed. Compositor + 1080×1440 previews saved. Minor edge colours remain; review before large/print use. Original photos stay outside Git.
- Updated global Instagram/Remotion playbooks. Paulo will merge official home + home2 in another agent; the later approved integration adds handstand/about illustrations and a three-image Instagram2 carousel. Two other supplied side-profile photos were not processed.

## 2026-11-11 — Restore the static ochre hero

- Paulo prefers the original authored engraving with anatomy-following hatching for `/festival/home2/ocre/`. Restored the stag illustration in the hero; kept the straddle below, ochre palette, brush graphics and teacher stories. Other theme heroes are unchanged. The separate procedural filter study is not a replacement for these illustrations.

## 2026-11-11 — Approved ochre and moving home

- Paulo chose ochre over yellow and approved cream/ochre alternating with deep green/light ochre. Updated global festival tokens, v07 SVG/PNG/WebP seals and favicon; Instagram2/render CLI now default to ochre, with old yellow retained as explicit comparison. Increased supporting text/counters, larger gallery previews, green third photo card.
- Restored silent autoplay stories on home2 hero and teachers: four scenes each, progress/navigation/pause, suspend offscreen and respect reduced motion. Selected clips freeze at 4 s, then P&B + bristles + seal. Original route is still the official homepage. Shared event facts unchanged.
- Parallel Brazilian music research: BaianaSystem for community, Luedji/Maz for freeze/paint, Jorge Ben for football; six suggestions with optional listening embeds in the gallery, eight-track shortlist in ig2/MUSICA.md and personal research KB. Final Instagram selection/sync remains pending; no commercial audio in exports.

## 2026-11-10 — Ochre Instagram comparison

- Paulo requested home2 ochre on Instagram2, plus actual carousel photographs in P&B with ochre painting and motion tests. Added shareable `?paleta=ocre` selector, export palette props, three static photo cards and a separate 9-second photo animation; exported the existing 10-second freeze/paint footage with an ochre seal too. Full bodies preserved, pigment in trees and bristled edges. No global palette change or social-account posting. Recipe/source times in ig2/README.md.

## 2026-11-10 — Alternative artistic homepage

- `/festival/home2/` mixes engraved cream/ochre with green/yellow; `/ocre/`, `/amarelo/`, `/verde/` compare the same full event page. Shared `home-content.ts` keeps original and alternative schedules, teachers and lots aligned. Current homepage remains the default.
- Paulo liked home2 but missed the brushwork around invited teachers. Restored v07 dry-brush edges behind portraits and short highlights under names; preserve faces and handstand bodies. Use expressive marks at focal points, retain simple utilities. ArtGesture reuses the shirt illustrations and actual circle/stroke vectors. Native video has controls and a poster from the same clip; no autoplay. Four variants are studies, not final palette approval.

## 2026-11-10 — Engraving and paint studies

- Paulo supplied artistic shirt illustrations of himself/Gabriel and requested a less rigid direction, static Instagram art and live-video → freeze → grayscale → paint tests. Added shirts 06–08, three static cards and two 10-second Reels. Built-in ImageGen transparent extractions preserve reference poses; the motion matte reveals original video pixels. Same v07 bristles, independent body/ink/orbit/text layers. Ochre is an experiment, not a global palette change. Recipe, prompts and limitations: `design/handstandfest-arte/README.md`.
- Fixed render bundle output flag (`--out-dir`), added PNG still exports. Sent three shirt comparisons and three static cards as original PNG documents via @FaiscaDoisBot; Telegram acknowledged all six (2926–2931).

## 2026-11-10 — First MP4 exports

- Explicit request: render football plus another Reel and send via Faisca. Sent football (13.5 s) and Shapes (16.5 s) as original MP4 documents through @FaiscaDoisBot; Telegram acknowledged both. 1080×1920, 30 fps, H.264, no soundtrack. Repeatable `scripts/festival_render.py`, shared render entry and staticFile-aware ig2 media; fonts loaded locally and CSS tokens read from the site. MP4s remain outside git.

## 2026-11-10 — Painted seal approval

- Paulo explicitly liked the logo being painted/brushed into Reels and videos. It may animate simultaneously with text and other elements when speed matters; do not serialize logo then copy by default. Word highlights still must accompany/follow words. Saved in MARCA.md and both global complementary playbooks.

## 2026-11-10 — Front-view shirts, football Reel and shot list

- New shirt proposals 04/05 lead `/festival/camisetas/`: three front-view silhouettes (straight, straddle, one-arm), HF, and lowercase domain. 04 has HAND/STAND/FEST.com.br on the back with yellow suffix; 05 has only HF at chest and trio + domain on back. Three poses preserve space; prior three studies remain below. Paulo rejected two generated one-arm poses and required a real handbalancer reference; final proposal uses Nicolas Montes de Oca’s observed Guinness photo pose, with the reference kept local-only and documented. Original generated sheet, prompt and SVG masters stored with regeneration recipe. No date/year.
- Added football joke version in Instagram 2 using the existing mural crop: Gosta de futebol? / Aqui a mão não é falta. / Vem fazer handstand! Total 11 pieces, 22 previews. Source crop unchanged, ball around 9 seconds.
- Created and opened `src/festival/ig2/PAUTAS.md` in VS Code: 24 educational/community ideas from prior research, each with what to find in own footage, what to shoot, candidate IDs where known and blank selection/timecode fields. KB untouched.

## 2026-11-10 — Timeless shirts, old-logo cleanup and brush timing

- Paulo requested removing old logos and creating `/festival/camisetas/`: three illustrated front/back studies, green inspired by Insider Nori Green, current HF, stacked HAND/STAND/FEST and a generated then traced side-profile handstand. No date/year/city on the prints. SVG artwork and WebP mockups are generated by `scripts/festival_shirts.py`; sources/prompt in `design/handstandfest-camisetas/`.
- Removed tracked kits 05/06, HFMark, legacy generator and old public favicon/stroke; untracked 01–04 moved outside the repo. Retained licensed Archivo separately in `design/fonts/`. Current master remains v07.
- Corrected poster brush timing: name enters first, brush follows, text recoloring follows the brush for contrast. Instagram 2 highlights begin five frames after visible text; original-kit text/background entrances remain synchronized.

## 2026-11-10 — Apply version 07 as the shared brush identity

- Paulo requested PNG/WebP application in the menu/seal and matching brushwork in site videos and Instagram Remotion. Responsive transparent images now serve all static seals; animations share traced SVG paths. Horizontal stroke derives from the same brush perimeter, used by CSS headings, both Instagram kits, hero video stamps and teacher poster highlights. Utility geometry stays straight.
- `scripts/festival_brand_assets.py` regenerates versioned assets and `pincel.ts`; recipe in the v07 design README and CLAUDE.md. Legacy procedural generator is archive-only.

## 2026-11-10 — Brush seal traced from supplied reference

- Paulo found the site's procedural brush too simple and requested an SVG matching a supplied richer brush-circle HF. Archived the source, true-vector transparent/cream SVGs and transparent PNG in `design/handstandfest-selo-07/`.
- Reproducible via `scripts/festival_trace_seal.py` (ImageMagick + Potrace). Preserves dry-brush gaps and upright joined HF; uses current green/yellow. Flat pigment, no raster/paper texture embedded. Render inspected. Candidate only; live site's version 06 is unchanged.

## 2026-11-10 — Instagram gallery without selection clicks

- Paulo wants all pieces listed like the original Instagram page. Replaced the one-player selector in instagram2 with a continuous gallery: all ten pieces and all 21 reel/story/carousel previews. Three columns desktop, one on phones; static carousel frames remain static.
- Automatic near-viewport mounting avoids preloading every video; offscreen playback pauses. Shared filters/guides and per-video cue buttons remain. Build and desktop/mobile checks passed; deploy follows the existing GitHub Pages workflow.
- Published as `71a5933`; GitHub Actions run `42883552446` succeeded and the production gallery was verified (10 articles, 21 slots). Paulo requested the implementation recipe be kept in the repository and pull/push performed: see “Maintaining this gallery” in `src/festival/ig2/README.md` for registry, layout, observers, review and publication steps.

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


## 2026-11-12 — Visual photo catalogue

- Extended `acervo/catalogo.yaml`, retaining the existing video records: 190 image references, 189 visually inspected, one unavailable (Turkey hero HTTP 404, unknown fields null).
- Paulo wants approximate discovery labels: handstand boolean, total people, people in handstand, shapes, whole body, group/all practising and suggested uses. Headstand is separate. No automatic skeleton analysis or face identification.
- `scripts/festival_image_index.py` prepares ignored contact sheets, validates the canonical YAML and filters/exports selections. Schema and examples in `acervo/README.md`. Retreat videos and vocabulary image cards remain pending.

## 2026-11-13 — Engraved freezes on the Instagram page

- Nine nature Reels + three photo Stories are actual compositions, now visible above the calendar. Pool solo, deck pike and Gabriel transitions use three independent layers: original colour still, v07 ochre 65%, registered transparent engraving. Full-frame footage and large HF seal retained.
- Prompts/provenance: `design/handstandfest-arte/2026-11-13-freezes/README.md`; art index: `acervo/gravuras.json`; implementation: `ig2/EngravedFreeze.tsx`. Page-only review requested; stopped the earlier final export batch (partial local files are obsolete snapshots).

13 Nov: temporary `/instagram-revisao/` lists all 49 catalogue compositions with 128 real previews, plus pending briefs, current copy/timing, proposed objectives, optional order and per-piece comments. Drafts use versioned browser localStorage; copy/download Markdown is the explicit handoff, no server sync or automatic composition changes.

13 Nov voice: concrete shape/situation questions (“Como está o seu tuck?” + tuck→straight observation), not generic engagement prompts. Review-only proposals in `ig2/review-suggestions.ts`; after returned feedback, document rationale and extrapolate to uncommented pieces with judgment. See `ig2/README.md`.
