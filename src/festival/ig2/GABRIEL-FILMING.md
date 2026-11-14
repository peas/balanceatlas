# Gabriel filming brief — 13 November 2026

User request: a shareable weekend checklist at `/instagram/gabriel/`, containing exercise-specific samples from two narrated phone videos and the existing production backlog. Gabriel/Agustin need not speak on camera. Voiceover is created later and technical wording reviewed with him.

## Sources and inspection

- Video 1: `PXL_20261113_203328513.mp4`, 255.096 s, HEVC HLG, portrait display rotation -90°.
- Video 2: `PXL_20261113_204644378.mp4`, 94.541 s, HEVC HLG, portrait display rotation -90°.
- Originals supplied in Downloads `videos-exericicos-para-cortar-pro-gabriel-refazer/`. Copied into ignored `local/festival/gabriel-filming-2026-11-13/sources/`; originals not committed or replaced.
- Local inspection/transcripts: `local/festival/gabriel-filming-2026-11-13/` (ignored). MLX Whisper large-v3-turbo, pt, required no-context/word-timestamp/silence flags. Video 1 narrates demonstrations and requests extra camera angles. Video 2 has sparse speech and some uncertain automatic words; those were not promoted to instructional subtitles.
- Contact sheets visually checked against timings. Captions on the page are editorial filming instructions, **not literal subtitles of Paulo's speech**. Audio remains in reference cuts, on user-controlled playback; these are briefs, not finished exercise lessons.

## Current checklist

`gabriel-filming.json` is the source of truth for 19 briefs (14 timed samples). It includes new shoulder opening, ribs/chest/pelvis organisation, hand spacing, wall foot-release drills and lateral exit, as well as existing frog, hollow body, bear, scapula, cat-cow and shapes topics. Confirm names/variations with Gabriel; the user's demos are visual references, not claims of ideal form.

Reference cut windows (seconds on original):

| Sample | Source | In–out |
|---|---|---|
| Cat-cow | 1 | 9–22 |
| Scapula | 1 | 23–38 |
| Wrists | 1 | 39–50 |
| Bear to long plank | 1 | 51–70 |
| Hollow / pelvis | 1 | 71–88 |
| Frog | 1 | 92–116 |
| Shoulder opening / support | 1 | 118–138 |
| Belly-to-wall progression | 1 | 140–173 |
| Lateral exit | 1 | 174–188 |
| Controlled wall kick-up | 1 | 190–219 |
| Ribs / trunk demonstration | 1 | 239–252 |
| Shoulder opening / box | 2 | 3–30 |
| Feet-supported pike | 2 | 36–59 |
| Floor shoulder preparation | 2 | 68–86 |

## Regenerate

Run `python3 scripts/festival_filming_samples.py`. Requires `/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg` for zscale; ordinary installed ffmpeg lacks that filter. Source path is explicit in the script. Outputs H.264 SDR, 540×960, 30 fps, CRF 25, AAC 96 kbps and faststart; poster WebP 720 px tall, quality 82. HLG is mapped with npl=100 + Hable, matching the existing project recipe. Sources, source offsets and audio stay traceable. Published lightweight derivatives follow the existing festival media-in-Git exception.

The page is noindex, outside navigation, uses FestLayout metadata, no autoplay, and pauses other reference videos when one plays. Local checkboxes are browser-only, not a shared production database.

## Future library

These captures feed **Handstand Life: Guia de Sobrevivência**, a future subject-indexed collection beyond Instagram. Catalogue each eventual lesson by exercise, purpose, level/context, source/take, voiceover, technical review and related drills. No lesson should be marked complete merely because a reference sample exists.

## Validation

All 14 outputs checked with ffprobe: H.264 + AAC audio, durations within 0.15 s of the specified window (13.24 MB combined). Selected posters visually reviewed after SDR mapping. Sources sometimes cut extremities, especially the lateral-exit demonstration; the page explicitly requests a better complete-body reshoot. This is not a claim that these references are publication-ready instructional videos. No final Instagram exports were produced.
