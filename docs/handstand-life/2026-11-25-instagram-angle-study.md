# Instagram angle study — 25 November 2026

Internal reference study requested by Paulo. These are short observed samples, **not habitual athlete angles, clinical measurements, technical grades or population norms**. No third-party media was published or added to promotional compositions.

## Sources and selection

Browsed in Paulo's logged-in Chrome; public videos downloaded with yt-dlp after browser blob/asset downloads failed (no cookie export required).

- Daryna Yahorava, @darin.moves: https://www.instagram.com/darin.moves/reel/DfPbXOXONvT/ (2 November 2026). Demonstration of different shoulder conditions and their effect on tuck/alignment. Deliberate variations must not be labelled mistakes or her usual technique. Analysed tuck at 10–13 s and final straight position at 34–36.3 s. Excluded the preceding extension transition from the straight window.
- Yuval Ayalon: https://www.instagram.com/yuval_on_hands/reel/DfrrLSXomhw/ (13 November 2026). Negative press; straight position at 0.3–2.3 s and descending pike at 5–7 s. The pike window is moving, not a static hold.
- Also inspected/downloaded https://www.instagram.com/yuval_on_hands/reel/Df2iB9po4zZ/ (17 November 2026), but excluded: one-arm work is not comparable with the two-arm profile hold.
- Paulo: catalogue `paulo-20261125-parada-um-minuto`, 10–15 s of the existing upright SDR proxy.

## Method

HF's `scripts/handstand/pose.py`, MediaPipe Heavy, no smoothing, every third source frame (8 Hz Daryna; approximately 10 Hz Yuval). Paulo reuses his existing 15 Hz extraction. Per-clip fixed visible side: left for Paulo/Daryna, right for Yuval. Angle is computed in source pixel coordinates, not raw normalized coordinates. Shoulder = wrist–shoulder–hip, internal angle 0–180°; visibility threshold 0.65 at every required landmark. Ranges below are p10–p90 of valid samples, **not confidence intervals or measurement error bounds**. All shoulder windows have 100% valid landmark coverage.

| Person / segment | Window | Shoulder median | p10–p90 | Samples |
|---|---|---:|---:|---:|
| Paulo, straight | 10–15 s | 171.5° | 171.1–172.2° | 76 |
| Yuval, straight | 0.3–2.3 s | 179.0° | 178.0–179.3° | 20 |
| Yuval, descending pike | 5–7 s | 170.8° | 165.0–178.1° | 20 |
| Daryna, demonstrated tuck | 10–13 s | 165.3° | 164.6–168.4° | 25 |
| Daryna, final straight | 34–36.3 s | 178.4° | 175.9–179.4° | 19 |

Hip results are deliberately omitted from the headline comparison: the straight Yuval window has 0/20 accepted knee landmarks and Daryna only 2/19. Do not lower the confidence threshold to manufacture a complete table. Raw per-joint coverage remains in `results.json`. Elbow estimates are exploratory; the detector's centre placement does not establish actual elbow flexion/lockout.

## Interpretation and next study

Within these clips, shape and movement phase materially change the estimated shoulder angle. The straight samples are approximately 179° for Yuval and 178° for Daryna, versus approximately 172° for Paulo's selected window. Camera azimuth, perspective, lens, body proportions and landmark estimation differ, so the numerical gap must not be presented as degrees Paulo “needs to correct.” A narrow numerical range does not prove measurement accuracy. A few frames seconds apart are correlated, not independent trials.

To estimate an athlete's usual range, collect several comparable profile recordings per athlete and position, manually validate landmarks, and report between-recording variation. Miguel was not sampled in this pass. No normative claim is justified by this two-athlete sample.

## Local reproducibility

All downloaded videos, contact sheets, raw poses and results remain outside git:
`local/festival/analysis/references-20261125/`.

- `sources.json`: extraction source mapping.
- `compare.py`: selected windows, confidence filter, metrics and annotated contact sheet.
- `results.json`: medians, p10/p90 and accepted/total counts for each joint.
- `comparacao.jpg`: five annotated frames, source times and segment medians (the displayed frame need not equal its segment's median).
- `index.html`: local review with source links, numbers, pictures and original clips.
- `provenance.json`: original URLs and SHA-256 hashes.

Run `compare.py` with the same Python environment documented in `ANALISADOR.md`. Keep reference-only media separate from HF's publishable catalogue; no permission for Instagram reuse is inferred from analysis authorization.
