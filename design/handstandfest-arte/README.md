# Body, ink and gesture — 10 November 2026

**New reusable kit, 11 November 2026:** [photo-to-engraving prompts, independent brush variants, examples and handoff](2026-11-11-prompts/README.md). This tests real photographs, unlike the earlier extraction of supplied illustrations below. Approved art is applied to handstand/about pages and Instagram2; single-person bento and selective photo/paint studies are documented in the kit. Paulo plans the official/home2 merge with another agent. Ochre is now approved; earlier yellow/experimental wording below records the initial study.

Exploratory direction requested by Paulo from four WhatsApp images of shirts and art depicting him and Gabriel. The images combine black engraved figures, warm paper, an ochre/orange imperfect disc, thin orbit/axis marks and a brush ground. Do not infer which figure is which person. These are proposals, not approval of a new global palette.

## What was made

- Shirt studies 06 (cream/yellow), 07 (cream/ochre), 08 (green with the engraving on the back). Timeless, no event date; lowercase domain. Illustrated garments, not official Insider product photos.
- Three 1080×1440 static Instagram art cards in `src/festival/ig2/art-pieces.tsx`. Separate figure, brush, orbit, text and seal layers. Yellow `#ffd23f`, experimental ochre `#cb8b34`, paper `#f3eddd`, green `#123d33`.
- Two 1080×1920, 30 fps, ten-second motion studies: live video for 150 frames, freeze at frame 150, grayscale over 18 frames, paint starts at 165 over 42 frames. Logo paints concurrently. Natural footage stays unillustrated; the silhouettes are not substituted for the actual video pose.

The disc uses the actual v07 vector bristles from `pincel.ts`; no replacement logo was introduced. Keep utilities and readable typography geometric, with expression concentrated in the image. The new examples lead the existing continuous galleries; earlier work remains available.

## Sources and generation

Built-in ImageGen was used for transparent extraction, **not the CLI**. Exact prompts: `PROMPT-straddle.txt`, `PROMPT-stag.txt`, `PROMPT-freeze.txt`. Generated source PNGs are saved here. `straddle-source.png` and `stag-source.png` derive from the user's art-only references, with background, lettering and graphic elements removed. Do not treat them as new anatomical teaching diagrams or name the athlete without confirmation.

Video source: existing `ig2-formas.mp4`, catalogued `img-3144` source 5–24 seconds (see `src/festival/ig/midia.json`). The freeze is at derived 5 seconds = source 10 seconds. ImageGen supplied an alpha matte at the same composition; **RGB pixels come from the original video frame**, not a generated redraw. Soft source detail and approximate matte edges remain visible at high magnification. No additional people's footage was introduced.

## Regeneration

```sh
# Extract source frame, then reuse the saved generated matte.
ffmpeg -y -ss 5 -i public/festival/ig/ig2-formas.mp4 -frames:v 1 local/festival/freeze-formas.png
magick local/festival/freeze-formas.png \( design/handstandfest-arte/freeze-mask-source.png -resize 720x960! -alpha extract -morphology Erode Disk:1 \) -alpha off -compose CopyOpacity -composite -quality 92 public/festival/ig/arte/freeze-cutout.webp
magick design/handstandfest-arte/straddle-source.png -quality 90 public/festival/ig/arte/straddle.webp
magick design/handstandfest-arte/stag-source.png -quality 90 public/festival/ig/arte/stag.webp
# Python with fonttools; rsvg-convert and ImageMagick on PATH.
python scripts/festival_shirts.py
python scripts/festival_render.py arte-gravura-1 arte-gravura-2 arte-gravura-3 --still
python scripts/festival_render.py arte-freeze-ocre arte-freeze-amarelo
```

Print-art SVGs embed raster engravings and vector text/graphics. They are portable compositions, **not all-vector artwork or final press separations**. At the selected print size, prepare higher-resolution figures, ink separations, white underbase for green fabric, and a fabric proof. No invented Insider colour availability or print compatibility claim.

## Review

Checked the three final PNGs, all three front/back garment exports, Reel contact sheets and freeze/paint/closing frames. Preserved body extremities, moved the video crop down to clear the extended feet, kept headline inside the working safe width. Browser playback checked, static cards have no controls or movement. Build passes; TypeScript retains the pre-existing generic transition union error in `src/festival/compositions.tsx:179`, unrelated to these studies.

Render pipeline correction: Remotion 4.0.534 requires `bundle --out-dir <path>`; a second positional argument was ignored. The script now uses the explicit flag and also exports PNGs with `--still --frame`.

## Alternative homepage

`/festival/home2/` combines paper/ochre engraving with green/yellow ticket fields. Three sibling routes compare ochre, yellow and green. `src/components/fest/ArtHome.astro` holds the template, `ArtGesture.astro` the layered engraving. Shared schedules, teachers and ticket lots live in `src/festival/home-content.ts`, also consumed by the original homepage. Dates and sales availability stay in `data.ts`.

Teacher portraits have dry-brush underlays using the actual `stroke-v7.svg` mask and short name highlights. This restores the identity Paulo missed in the first home2 review. Keep paint outside the photographed bodies. Hero paint respects reduced motion; the practice video is user-controlled and has a same-source poster.

```sh
ffmpeg -nostdin -y -loglevel error -i public/festival/ig/ig2-formas.mp4 -frames:v 1 -f image2pipe -vcodec png - | magick png:- -quality 82 public/festival/ig/arte/formas-poster.webp
npm run build
```

Reviewed desktop and mobile layouts, teacher bristles, ticket anchors, schedule and FAQ disclosures. These routes are noindex studies; they do not replace `/festival/`.


## Approved ochre + website stories — 11 November 2026

Paulo selected ochre as the main accent, with cream and deep-green backgrounds. Lighter ochre on green preserves contrast. `/festival/home2/ocre/` and `/verde/` are the two current comparisons; the original home remains the default route.

`src/festival/ArtStories.tsx`: 720×900, 30 fps, 180-frame scenes overlapping by 12 frames. Event facts come from `data.ts`/`home-content.ts`; teacher photos/profiles are reused without invented bios. Preserve full source frames with `objectFit: contain`. Selected clips freeze at frame 120, grayscale ramps over 15 frames, brush reveals from 125 to 155; the seal may paint alongside other information. Use the same traced v07 paths, not a generic rough filter. Text on dark scenes has a clipped dark duplicate that follows the paint, keeping contrast through the reveal.

`ArtStoryPlayer.tsx`: wait for fonts, autoplay muted at ≥25% visibility, pause offscreen/backgrounded, respect reduced motion, retain manual pause. Four progress buttons plus previous/next/pause. Hero and teachers are separate sequences; static teacher cards remain available. Inline music listening is only in the Instagram studio and is separate from these silent website stories.

### Ochre hero restoration — 11 November 2026

At Paulo's request, `/festival/home2/ocre/` again leads with the original static `stag.webp` engraving through `ArtGesture`, with the v07 ochre disc, orbit and ground stroke. The existing `straddle.webp` illustration remains in the meeting note. These are the authored anatomical engravings, not procedural filters applied to footage. Teacher stories and other theme heroes retain their current behavior.
