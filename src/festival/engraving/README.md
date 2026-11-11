# Continuous video engraving lab

Requested by Paulo on 11 November 2026 for a possible **Handstand Life** exercise/voiceover series. Name and final looks are undecided. This is an additional experiment, not a replacement for the approved anatomical illustrations in [IMAGERY.md](../IMAGERY.md).

## Open and adjust

Run the existing Astro server (`npm run dev -- --port 4322`), then open `/festival/gravura-lab/`. The page is noindex and absent from the public navigation. Two muted videos loop simultaneously. Individual pause, original/filtered comparison, source selection, independent controls, PNG capture and copying a treatment to the other panel are provided.

- Contrast and gamma shape tones; gamma below 1 lifts midtones.
- Hatching strength controls strokes independently of contour strength; spacing and angle affect the screen-space pattern.
- Ink and paper colours permit neutral, green or ochre versions. Original-colour mix restores photographic colour in light areas, leaving the ink strokes visible.
- Three starting points are **drafts**: Grafite no papel, Verde & cor, Tinta ocre. Neither slider values nor simply viewing a preset constitute approval.
- Settings auto-save locally (`hf-engraving-lab-v1`); download/import JSON transfers both panels. No settings are sent to a server. Localhost and the public domain have separate browser storage.
- Processing width is fixed at **480 pixels**; aspect ratio and playback rate stay unchanged. Export at this processing scale before upscaling to a delivery canvas, or re-review the hatching. This is not a 1080p-detail claim.

## Source provenance

Existing optimized, SDR derivatives are reused; no new originals or audio enter Git. Source cuts/crops: `src/festival/ig/midia.json`; descriptions: `acervo/catalogo.yaml`.

| Clip | Original | Original interval | Selection |
|---|---|---|---|
| `mural-reta.mp4` | `img-3177` | 0–13.6 s | Paulo holding a straight handstand, then exiting. Existing crop excludes the child at the right of the source. |
| `p-desce.mp4` | `pxl-20261104_183102030` | 40–46.6 s | Paulo in front, Gabriel behind; controlled straddle descent. |
| `j-press.mp4` | same Pixel recording | 25.3–30.7 s | Optional alternative: both ascending in straddle press. |

## Implementation and fidelity

`engine.mjs` is the portable CPU reference: RGBA → RGBA, luminance/contrast/gamma, two Gaussian blurs (0.8 and 1.6), difference-of-Gaussian contour, shadow fill and gently curved fixed screen-space crosshatching. Alpha and source geometry are preserved. It extends the earlier `outputs/gravura-lab/engrave.mjs` experiment in the Codex workspace with independent hatch amount, angle and colour controls. It is **not flow-aligned anatomical engraving**, segmentation or an ML model. No random per-frame grain and no generative redraw.

`gpu.mjs` runs the same kernel/stroke design in two WebGL passes. The intermediate RGBA8 buffer quantizes blur values; GPU preview and CPU export are close, not guaranteed byte-identical. `lab.mjs` uses GPU first, a module worker running the CPU reference as fallback. Preview drops processing frames under load rather than slowing the filmed exercise. Initial dual CPU preview was about 8 fps in IAB; GPU reached about 30 filtered frames/s per preview on this Mac (informal observation, not a cross-device guarantee). Pause when the tab is hidden; respect reduced-motion by initially pausing. CPU fallback can be slower.

There is no foreground matte: the entire scene is treated. Prefer clear silhouettes and simple backgrounds. Fixed hatching can appear to slide across the moving body; inspect it in motion, not only on a still. Hands, joint angles and the meaningful transition must remain readable. Do not present lost detail as a correction of technique.

## Remotion and export

`EngravedVideo.tsx` is a **working adapter for the installed Remotion 4.0.534**, using `OffthreadVideo.onVideoFrame` and the synchronous CPU reference. Unlike the earlier standalone template, it requires no `@remotion/media` installation. Absolute positioning of both video and canvas matters: an invisible video in normal flex flow displaced the canvas in the first test; corrected before delivery.

`render.tsx` registers `EngravingStudy` (480×854, 30 fps, six seconds, descending clip). Example:

```sh
npx remotion render src/festival/engraving/render.tsx EngravingStudy local/festival/renders/engraving-study.mp4 --concurrency=2
```

To render an exported lab selection, pass a props JSON with `src` (clip URL), `settings` (the chosen `panels[n].settings`) and `processingWidth: 480` via `--props=<file>`. The lab's two-panel session envelope is not directly a composition props object. Keep final voiceover, captions, message/paint and logo in separate Remotion layers; the adapter is muted. No voiceover was recorded or synthesized in this study. A narration should determine pacing; do not accelerate an exercise merely to fit text.

Validation: `node src/festival/engraving/engine.test.mjs` checks determinism, alpha, slider influence and bounded JSON restoration. Astro production build passes. A two-second/60-frame MP4 slice at frames 30–89 was rendered and visually checked after fixing canvas layout. The render emits the repository's existing Zod-version warning; no dependency was changed for this lab. Long-form narrated episodes, mobile performance and final delivery-resolution QA remain to be done after Paulo chooses a look.

## Editorial handoff

For an educational sequence: authentic movement throughout + restrained continuous filter is one option; natural footage → frozen anatomical illustration + message/paint is another. Do not force every exercise into the illustrated freeze. Preserve a natural-colour version for technical comparison. The 65% paint preference belongs to the already-approved photographic **static** composition, not this filter's colour slider.

References: [imagery language](../IMAGERY.md), [static anatomical prompts](../../../design/handstandfest-arte/2026-11-11-prompts/README.md), [Instagram notes](../ig2/README.md). General rules: `~/.claude/skills/videos-remotion/SKILL.md` (implementation) and `~/.claude/skills/instagram-creation/SKILL.md` (editorial).
