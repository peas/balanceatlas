# Publication review: same-nine grid

The before grid is the actual preserved pre-change render, not a recreated approximation.
Both grids use the nine IDs/order in `../instagram-profile-2026-11-14/manifest.json` and central 3:4 crops.
After: full-resolution cover exports, larger editorial support text, exercise text moved into the
working UI region and HF seal in the empty wall area. Unaffected covers are intentionally unchanged.

Regenerate after rebuilding review-bundle:

```
node scripts/festival_review_stills.mjs
node scripts/festival_instagram_profile.mjs
node scripts/festival_grid_comparison.mjs
```

Never overwrite `grid-before.png` as part of regeneration. `review-before.json` preserves source frame metadata.
This is an editorial profile simulation, not an actual Instagram screenshot or evidence of publication.
Covers are review candidates; uploader crop and device UI still require checking. Existing old MP4s remain
historical renders; the revised compositions are available on the page, without a new MP4 batch.
