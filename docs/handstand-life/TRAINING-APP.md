# Handstand Life: exercise library and future training app

Decision from Paulo, 16 November 2026: while making exercise/drill videos, prepare reusable material for a future training app with an exercise catalogue. This is a production requirement now, not a request to build or launch the app yet.

## Capture once, prepare independent outputs

- Keep each exercise's stable ID from `src/festival/ig2/gabriel-filming.json`. That file is the current filming checklist, not yet a complete training catalogue.
- Link each future exercise record to existing media IDs in `acervo/catalogo.yaml`; do not duplicate the original media catalogue.
- Preserve an unfiltered, uninterrupted demonstration: preparation, execution and exit, in real time. Save source file ID, source in/out seconds, rotation, crop and any speed changes separately.
- Gabriel and Paulo both demonstrate appropriate variations. Label person, variation, angle and take. Comparable views support observation, not a right/wrong ranking between people. Different attempts are not simultaneous multicamera footage.
- Retain clean video, photographs of useful phases, optional pose JSON, voiceover, transcript/captions and teaching notes separately. Ochre, hatching, music, branding and social hooks are optional presentation layers, not baked into the library master.
- The Instagram Reel is one derivative; the clean lesson and future app are others. Keep full entry/exit even when the social edit is shorter.
- Record purpose, equipment/support, prerequisites, variations/progressions, cues, what to observe, author and technical review status/date. Leave dosage and prescriptions unset until Gabriel reviews them. No invented universal progression or automated correctness score.
- Suggested lifecycle: `planned → captured → edited → technically_reviewed → ready`. Publication status belongs to each derivative, not to the exercise itself.
- Store originals and pose outputs in ignored local storage/R2 as appropriate, with versioned paths and hashes. Commit catalogue metadata and reusable code, not raw training videos or private trainee analyses.

Minimum future record: `id`, `title`, `aliases`, `purpose`, `equipment`, `prerequisites`, `variations`, `cues`, `review`, `media[]` (catalogue ID, person, angle, take, source interval, clean derivative, optional pose reference), `derivatives[]` (Reel, Story, lesson). This is a proposed contract, not a claim that a new app/schema has been implemented.

## Existing reuse: verified locally on 16 November

HF already uses the original detector; there is no need to duplicate it just to document this decision.

| Capability | Existing source | HF status |
|---|---|---|
| MediaPipe landmark extraction | `~/paulo.com.br-render/scripts/pose.py` | Called by `scripts/festival_analise.py pose` |
| Inverted-interval proposals | `scripts/festival_analise.py holds` | Implemented here; coarse heuristic, not validated handstand scoring |
| Two-phone synchronization | `scripts/festival_analise.py sync` | Existing audio cross-correlation; relevant only to overlapping recordings |
| Pose loading, interpolation, connections, pixel-space angles | `~/paulo.com.br-render/src/motor/pose.ts` | Reuse candidate; not ported into HF's exercise player |
| Skeleton, hip/shoulder angle arcs, press synchronization | `~/paulo.com.br-render/src/comparacao/PressAmigo.tsx` | Working reference composition in the source project; not a generic HF component yet |
| Movement overlays | `~/paulo.com.br-render/src/motor/overlays/movimento.tsx` | Reference for body line, angles, hip/hand alignment, trajectory and ghost |
| One-arm metrics, holds and camera roll handling | `~/paulo.com.br-render/scripts/onearm/analisar.py` | Specialized source; do not apply its thresholds to all drills |
| Analysis principles and known limitations | `~/paulo.com.br-render/docs/ANALISADOR.md` | Read before adapting; historic coaching judgments are not automatic rules for our library |

HF pose output: `local/festival/pose/<id>.json`. Contract: `fps`, `w`, `h`, and `quadros[{t, pose?}]`; pose is 33 `[x,y,z,visibility]` points, x/y normalized to the upright frame, `t` in source seconds. Source may also include `fonte`. Keep source geometry and time mapping when displaying a cropped/zoomed Reel.

Targeted use for an ID already present in `local/festival/manifest.json` with its proxy:

```sh
python3 scripts/festival_analise.py pose --so <existing-clip-id> --paralelo 1
```

The adapter uses `~/ciencia/tamanhodouniverso/.venv-rosto/bin/python` and the source project's model files. The interpreter path and `local/modelos/pose_landmarker_full.task` were found during this review; no new inference was run. Existing pose JSON is skipped by the adapter. Do not run `tudo` merely to catalogue images or selected drills. The current `holds --so` writes `analise.json` for the selected subset, replacing the previous aggregate: preserve/merge that aggregate before targeted use.

## What to adapt later

1. Start with a reviewed side-view drill from each person. Check landmark reliability against the video before calculating indicators.
2. Extract a small reusable pose/geometry/overlay module from the source project, with provenance and tests. Preserve aspect-ratio correction: calculate angles in pixel space, not directly on normalized x/y.
3. Overlay selected joints and one useful angle/line. Keep raw measurements separate from Gabriel's interpretation. Suppress unreliable/occluded points; do not interpolate confidently through tracking gaps.
4. Treat angles as 2D image estimates: camera roll, perspective, occlusion, inverted tracking and swapped sides affect them. Shoulder opening, scapular elevation and pelvic tilt cannot all be inferred reliably from one view or the same three landmarks. Do not promise skeletal anatomy or medical assessment.
5. For a future client-side experiment, investigate browser pose detection with local video; keep the file on the device by default. The source playbook contains this idea, not an implemented HF browser detector. Recheck browser APIs/performance when implementing; historical FPS estimates are not guarantees.
6. Build the searchable, reviewed exercise library before training plans, user tracking or automatic feedback. Name/platform and app scope remain open.

Related: `src/festival/CURRENT.md`, `src/festival/ig2/ESTRATEGIA.md`, `src/festival/IMAGERY.md`, `acervo/README.md`. Engraved imagery is an editorial derivative: run pose analysis on real source footage, never on generated anatomy.

## Update 25 November: HF-owned analysis layer
The selected pose extractor, gap-aware interpolation, aspect-corrected geometry and Remotion skeleton/angle overlay are now ported to HF. See [ANALISADOR.md](ANALISADOR.md). This supersedes the earlier “reuse candidate/not ported” status for those modules only; specialized one-arm metrics and client-side detection remain unported.
