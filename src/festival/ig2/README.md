# Instagram 02 — composition proposal

For new static/freeze illustration accents, use the [reusable engraving and brush kit](../../../design/handstandfest-arte/2026-11-11-prompts/README.md). It keeps anatomical hatching, transparent figure and decorative paint separate. The three approved applications form the `gravuras-aprovadas` static carousel, using the shared `EngravingArtwork` component with independent optional paint. Keep generated art distinct from the reproducible JS/FFmpeg filter and review source-pose alignment before any freeze transition.

Working route: `/festival/instagram2/`. `/instagram2/` redirects there. The original `/festival/instagram/` and its pieces are unchanged.

## Direction

This proposal follows the latest actual identity, not the previous palette studies: approved ochre/cream/deep green (11 November 2026), upright HF on Gabriel's painted circle (version 07, traced from the supplied reference). `../pincel.ts` is the source of the shapes; `Selo` from `../ig/kit.tsx` supplies the closing animation. One brush gesture per scene, stable typography, direct cuts, real footage. No artificial grain, sepia or added people. Compositions remain silent; optional music references are separate.

Sixteen listed pieces, thirty-one preview units. All are displayed in document order; no piece/slide selector. The first five:

- Together: 17.5 s reel, natural color → B&W → natural color, then 3.5 s closing card.
- Venue: 14.5 s reel, three spaces, natural color/natural color/B&W, then closing card.
- Line: 14.5 s reel, uncropped portrait in B&W; large headline above footage, then closing card.
- Class: five 1080×1440 carousel slides. The question on slide 2 works independently as a second cover.
- Encounter: three 1080×1920 story frames with date, place and invitation.

Copy and factual statements come from `../ig/PECAS.md`, existing compositions and `../data.ts`; dates come from `QUANDO`. Speech clips were not reused, so all clips are muted. Venue statements retain the source trail of the existing venue piece. No new event or booking claims. Scenes are live previews, not finished MP4 exports.

## Typography and safe areas

Paulo's feedback during review: text looked too small. Layouts were reflowed, not simply magnified. Display headlines generally 80–125 px (the one-line room title is 75 px); main information is 40–48 px on a 1080-wide composition. Carousel counters are 36 px and its secondary kicker 36 px. Archivo 900 / 125% width, Space Mono for facts; fonts are awaited before first preview, with system fallback if loading fails.

All essential reel text stays at x 65–950 and y 269–1500; stories x 65–1015 / y 250–1580; carousel x 60–1020 / y 60–1380. Shared safe-zone overlay distinguishes the conservative reel region from the harder lower limit. These are the project's conservative working guides, not a guarantee for every Instagram UI placement. Recheck the final export in the target app.

Text and media windows are disjoint. `Line` contains the complete source portrait; the duet windows crop only roof/floor at reviewed moments. No overlay covers hands, feet or bodies. The three-line opening hooks allow bigger text without unintended line wraps. Read at phone width, not just full-size on a monitor.

## Implementation

- `kit.tsx`: layout primitives, one-stroke title reveal, media windows and closing card.
- `pieces.tsx`: declarative durations, scenes, review cues and slide registry.
- `Studio.tsx`: continuous gallery of every piece and slide, automatically mounted near the viewport; offscreen pause, per-video scene cues, shared filter comparison and guide toggle.
- `studio.css`: three-column desktop gallery, two-column tablet and one-column phone layout. Carousel/story groups span the full gallery width and expose every frame.

`direction` uses the selected look per scene. `cor`, `pb`, `cru` override only the photographic layer, keeping branding colored. `cru` means no extra CSS filter on the already tone-mapped SDR asset, not raw HDR. Reuse `LOOK` from the shared kit to stay aligned with the site. No new dependencies. New derivatives have distinct names and documented source times.

## Validation

Build with `npm run build`. Type-check with `./node_modules/.bin/tsc --noEmit`. The pre-existing generic transition error in `../compositions.tsx:178` also occurs before this work; no new TypeScript diagnostics were introduced.

Browser review covered desktop and a 390 px mobile viewport, piece/slide switching, timeline cue seeks, filter override, guide toggle and playback. Rendered text bounds were checked in 19 scene/slide states for clipping, text/text collisions and intersections with media windows. Source clip duration limits were checked with ffprobe. The initial round was local only. This round is approved for publication through the existing GitHub Pages workflow.

## Second round — 10 November 2026

Paulo requested five more examples from unused footage, an editorial research track beyond the festival, and deployment. He explicitly prefers photo/text carousels, never video carousels. Both carousels in this proposal are now frozen compositions with no playback controls. `more-pieces.tsx` adds:

| Piece | Format | Source / original seconds | Intent |
| --- | --- | --- | --- |
| Parada? Só no nome. | 16.5 s reel | img-3144, 5–18 shown (5–24 derivative) | One continuous sequence of changing shapes |
| No mesmo ritmo | 15.5 s reel | img-2387, 23–35 shown (23–36 derivative) | Legs in L, B&W, real-time duet |
| Antes de ficar no ar | 15.5 s reel | img-2390, 21–33 shown (21–34 derivative) | Entry and hold, no exercise prescription |
| Pode entrar | Two 5.5 s stories | pxl-20261104_190908352, 0.5–11.5 shown | Door opening and venue interior |
| Uma parada. Quantas formas? | Five static carousel images | img-2381, frames at 10 / 6 / 4 s | Observation prompts, open/joined legs and transition |

All five source recordings are new to this proposal. None were used in its initial five pieces. The four video cuts and three stills are reproducible through `../ig/midia.json` and `scripts/festival_ig_midia.py --so NAME`; the cutter now accepts an optional output `h`, retaining the original default for older media. Real HDR material uses the existing SDR pipeline; clips are optimized H.264/faststart and stills are WebP. The new files total approximately 10.5 MB. Source provenance and people/restrictions are in `acervo/catalogo.yaml`; no 18 October group footage or child footage was added.

The three educational reels close with an observation/community question, not festival dates or ticket sales. Their new copy is an original editorial draft based on visible footage, not an attributed quote or a promise about learning outcomes. The venue stories retain the established event facts. No audio was added.

The new carousel uses full-image containment so no feet/hands are cropped. Each static slide wraps the composition in `Freeze frame={30}`. Do not disable the seal animation by passing `giro={0}`: that creates an invalid interpolation range. Keep a positive duration and freeze after completion.

The workbench omits the public-site sticky ticket bar so it does not cover preview controls. Public festival pages retain their navigation.

## Related editorial work

The research note `handstand-instagram-editorial-alem-evento.md` lives in Paulo's research KB. It contains 24 sourced post ideas and distinguishes editorial hypotheses from verified claims. First candidates: shapes glossary, two views of one figure, wall as a tool, record versus daily practice, finding training partners. Instagram and Shorts access was limited; no viral-performance claims were made.

The reusable playbooks are global: `~/.claude/skills/instagram-creation/SKILL.md` (content, formats, composition and review) and `~/.claude/skills/videos-remotion/SKILL.md` (technical implementation). They complement each other; local brand rules remain in MARCA.md.

## Publication checks for the second round

The 48-page production build passes. TypeScript still reports only the baseline generic TransitionSeries issue in `compositions.tsx:178`; the Instagram files introduce no new diagnostics. New scenes and all carousel slides were inspected with rendered font bounds, corrected line breaks, media duration probes and real playback (video readyState 4, advancing time). Static slides contain no video elements. Mobile 390px has no horizontal page overflow. The updated home hero was checked at 390px and 1280px; facts precede the video on mobile without colliding with the seal.

## Gallery navigation — 10 November 2026

Paulo requested the same browse-by-scrolling approach as the original Instagram page. All ten pieces now appear together, with all 21 previews directly in the document. Nothing requires selecting a piece or slide. IntersectionObserver mounts each preview automatically within 400 px of the viewport; a separate observer pauses video when it exits the visible viewport. No autoplay. Mounted players retain their frame when revisited. Fonts are awaited and dimensions reserved to prevent layout shifts.

Verified 10 articles / 21 preview slots, automatic viewport mounting, all five static carousel frames together on desktop, zero video elements in the static carousel, real playback followed by offscreen pause, and the last carousel at 390 px without horizontal overflow. Build passed; TypeScript baseline remains unchanged.

### Maintaining this gallery

1. Add or revise a piece in the `PIECES` registry in `pieces.tsx` (additional compositions live in `more-pieces.tsx`). Each piece has a stable `id`, metadata and a `slides` array; the gallery maps both levels, so new slides appear without navigation wiring.
2. Keep layout in `studio.css`: three columns by default, two below 1000 px, one below 651 px. Multi-frame pieces span the gallery and use their own responsive grid. Reserve each preview's `1080 / slide.height` aspect ratio before mounting.
3. Keep the two observers in `Preview` separate: the 400 px preload observer mounts once; the visibility observer pauses offscreen playback. Do not unmount previously viewed players or autoplay every card. Shared `inputProps` remain memoized so unrelated renders do not reset timelines.
4. Use static photo/text compositions for carousels, frozen at the intended frame with playback controls disabled. Reels and stories retain individual playback and review cues; filters and safe-zone guides remain global.
5. Review at desktop and phone width: every piece/slide is reachable by scrolling, no horizontal overflow, fonts loaded, video advances on play and pauses offscreen. Check the last sequence as well as the first row. Run `npm run build`, compare TypeScript diagnostics against the known baseline, and run `git diff --check`.
6. Sync with `git pull --ff-only`, commit only the intended files, and push `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub Pages. Wait for that commit's workflow to succeed, then reload `/festival/instagram2/` and verify the hydrated gallery; an immediate DOM check before React mounts can incorrectly report zero pieces.

Gallery implementation: commit `71a5933`, published successfully by [GitHub Actions run 42883552446](https://github.com/peas/balanceatlas/actions/runs/42883552446). Production verification found all 10 articles and 21 preview slots with no horizontal overflow.


## Shared brush identity — version 07

The site and both Instagram kits now use the traced version 07 master. `../Brush.tsx` renders the shared horizontal mark derived from that circle's edges; `Selo` uses the full traced silhouette and a separate HF path. Generation and responsive PNG/WebP assets are documented in `design/handstandfest-selo-07/README.md`. Composition timing, safe areas and gallery behavior are retained.

## Football variant and capture planning (10 November 2026)

Paulo requested a joke using the ball in the mural handstand. Piece `futebol` adds a 13.5-second Reel: “Gosta de futebol?” → “Aqui a mão não é falta.” → “Vem fazer handstand!”. It reuses `mural-reta` (catalogue img-3177, existing crop excludes the child), starting at 3.4 s for 10 s, then a 3.5 s end card. No new derivative or soundtrack. The source ball enters around 9 s, close to the 5.5 s headline change. This is a humorous variant, not a new source or a claim that handstand trains football skills. Gallery now has 11 pieces and 22 previews.

[PAUTAS.md](PAUTAS.md) is the editable production companion to the existing research: 24 ideas with suggested archive footage/photos, new-shot briefs, candidate catalogue IDs where known, and blank file/timecode fields. It includes the original sourced editorial table. No new technical exercise claims or viral metrics were added. The research KB remains the reference; this repository file tracks material selection and was opened in VS Code at Paulo's request.

## MP4 export (10 November 2026)

`python scripts/festival_render.py futebol formas` prepares an isolated public directory, local licensed Archivo/Space Mono fonts, and the site's actual root CSS tokens, bundles once, and renders the registered Reel IDs. CLI dependency is pinned to the same Remotion version as the Player (4.0.534). `render.tsx` registers the shared compositions, waits for fonts, and keeps guides disabled. `Media` uses the page URL in Player and `staticFile()` in offline render. No copied composition or separate copy/animation fork.

1080×1920, 30 fps, H.264 CRF 18, BT.709, PNG frame capture, concurrency 2, faststart. MP4s and staged render CSS/assets remain under gitignored `local/festival/`. Font sources and licenses are committed in `design/fonts/`. No soundtrack added. The script has `--help` and `--output-dir`; it does not send files or publish anything.

Paulo explicitly requested the football Reel and another one via Faisca/Telegram. Exported “Gosta de futebol?” (13.5 s, 3.4 MB) and “Parada? Só no nome.” (16.5 s, 2.2 MB), reviewed frame sheets and metadata, then sent as original MP4 documents through his configured Faisca bot. No Telegram token or recipient data belongs in this repository.

Rendering documentation: [Remotion CLI](https://www.remotion.dev/docs/render) and [public directory](https://www.remotion.dev/docs/options/public-dir). A normal `npm run build` does not render videos; CLI-only entry is not imported into Astro pages.

## Ochre comparison and photographic studies — 10 November 2026

`?paleta=ocre` opens the gallery with warm paper `#f3eddf`, deep green `#123d33` and ochre `#cb8b34`. The toolbar switches back to the original direction and updates the shareable URL. `PieceProps.palette` reaches Canvas and both closing-card helpers, so the same palette works in Player and CLI exports, including SVG seals. This began as a palette comparison; the 11 November approval below makes ochre the default. Art pieces retain their intentional light/dark layouts; the alternate yellow disc follows the palette override.

`ochre-photos.tsx` adds three static carousel images and a separate nine-second photo Reel. Reuses `img-2381` stills at 10 / 6 / 4 seconds (`ig2-estrela-*.webp`), already present in the gallery. Filenames are legacy labels, not reliable pose annotations: inspect the actual frame. Full-image containment, grayscale, v07 bristles at the edges and a multiply-blended ochre disc in the trees above the athletes. No generated redraw or body motion. For the static branch, paint progress is explicitly 1; do not rely on a Freeze frame beyond a short composition's duration.

Motion: each photo stays three seconds; grayscale changes over frames 0–18, paint starts at 18 and completes at 56. Titles are visible from frame 0. The existing `arte-freeze-ocre` provides the separate live-footage experiment: video → freeze → P&B → paint behind the original-pixel cutout.

```sh
python3 scripts/festival_render.py fotos-ocre-1 fotos-ocre-2 fotos-ocre-3 --still --palette ocre
python3 scripts/festival_render.py fotos-ocre-motion arte-freeze-ocre --palette ocre
```

Gallery after the approved-art integration: 17 pieces / 34 previews. PNGs are 1080×1440; MP4s 1080×1920, 30 fps, 9 and 10 seconds, no audio. New files stay in outputs/local, not public Git media. Reviewed actual exports and palette switching, including a Reel closing card. Build passes; the existing generic transition TypeScript diagnostic is unchanged.


## Approved ochre, larger previews and music — 11 November 2026

Ochre is the default in `Canvas`, Studio and `festival_render.py`. `?paleta=original` keeps yellow as a comparison; `?paleta=ocre` is still accepted. Cream `#f3eddf` / green `#123d33` with ochre `#cb8b34`, lighter ochre `#dfab5b` on dark backgrounds. Photo card 3 (and segment 3 of its animation) is green. Captions are 40 px, counters 36 px; art-card kickers 36 px and domains 38 px. Larger two-column previews are on by default, with a checkbox to restore the compact view. Review at phone width as well as full export size.

`music.ts` maps six existing pieces to Brazilian tracks; [MUSICA.md](MUSICA.md) records the eight-track research and sources. Each suggestion has an external official listening link and an optional YouTube embed. This player is separate from Remotion and never autoplays. Exports contain no commercial soundtrack; the actual recording/segment is selected in Instagram, with synchronization still pending.

The website counterpart lives in `../ArtStories.tsx` and `../ArtStoryPlayer.tsx`: real-time visual sequences reuse v07 brush assets and shared event facts, without importing social UI safe zones into the website layout.

## Shared image/video language approved — 11 November 2026

See [IMAGERY.md](../IMAGERY.md). Paulo approved both photographic scenery + selectively engraved person + intermediate ochre paint (65%), and engraved person + light-ochre brush on deep green. Reuse these in static pieces and selected message-bearing freezes, with independent layers and verified frame registration. This approval does not mean new freeze compositions have already been implemented. Existing art carousels remain.

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

Validation for this rollout: production build and 21 composition/frame previews passed; the calendar Player played and reached its paint cue without browser errors. Representative H.264 exports are 1080×1920 (football and Gabriel beach), plus seven PNGs including the five-slide consistency carousel. `tsc --noEmit` still reports the pre-existing transition-union type error at `src/festival/compositions.tsx:165`; no new type errors were reported.

## Nature and water — actual compositions (13 November 2026)

The curated nature cuts now have nine Reel compositions and three photo Stories, listed directly at the
top of `/instagram/#natureza` rather than hidden inside the old style library. Real-time footage freezes
at a registered CFR frame; selected figures gain anatomical engraving over colour scenery, while the
other clips use photographic P&B. Questions, ochre and the painted HF seal enter without reducing the body. Photos keep their scenery in colour. Source offsets, caption drafts, regeneration and
export details: [NATUREZA.md](NATUREZA.md). See the selected engraved applications below.

### Engraved freeze examples (13 November, follow-up)

Pool solo, deck pike and Gabriel transitions now use the approved three-layer freeze: intact colour scenery,
v07 ochre at 65%, generated black/ivory figure above. Shared `EngravedFreeze.tsx`; prompts and provenance:
`design/handstandfest-arte/2026-11-13-freezes/README.md`. Gabriel also appears beside the nature examples for
comparison, while retaining his calendar placement. Page-only delivery; the prior export batch was stopped.

## Full script review and concrete voice — 13 November 2026

`/instagram-revisao/` now covers all 49 catalogue compositions (128 real rendered WebP frames), plus unproduced calendar briefs. Calendar-first grouping and filters separate nature additions, library alternatives and pending capture. Videos show three moments, carousels up to three representative slides, static artwork one image. Regenerate with `review-render.tsx` and `scripts/festival_review_stills.mjs` after updating compositions; stills are snapshots, not live players.

Paulo's direction: questions should name a recognisable practice situation or shape, e.g. “Como está o seu tuck?” followed by observing tuck-to-straight, rather than broad “Como você muda de forma?”. Tie the development to the actual visible movement. Keep the tone curious, specific and welcoming; avoid vague engagement bait, invented diagnoses, performance promises or pretending an advanced shape is a beginner drill. Event logistics and useful explanations can remain statements. Teaching prescriptions require Gabriel's review.

`review-suggestions.ts` contains proposals only: they have NOT replaced artwork copy. After Paulo returns feedback, extract the reasons behind edits, document tone/teaching/provocation examples and apply the pattern to uncommented pieces where appropriate, preserving exceptions. Empty feedback is not approval of every suggestion.

Comments retain `hf-script-review-2026-11-13-v1` localStorage keys and stable IDs. They belong to the browser AND origin, so localhost/public and Chrome/in-app browser have separate drafts. Copy/download Markdown is the explicit handoff; no automatic sync. The suggestion button appends without overwriting.

## Publication handoff — lessons from Nordeste Nerd (14 November 2026)
See `docs/instagram/2026-11-14-nordestenerd-publication-lessons.md`: explicit portrait-crop check,
separate image-led Reel covers, phone-scale typography, native Story reposts with purpose, and confirmation
before recording publication. NN's historical web UI behavior is not a current platform guarantee.
Export packages and UI-safe overlays are proposed next steps, not implemented by this documentation update.
