# Publication lessons from Nordeste Nerd → HandstandFest

Reviewed 14 November 2026. `~/nordestenerd` pulled with `git pull --ff-only`,
from `a0a6701` to `96b538b`; checkout clean. Sources: `docs/reels-como-fazer.md`
(especially sections 4 and 7), `social/postar.mjs`, `social/fila.yaml`, and CLAUDE.md.
These are recorded production observations from August–October, not a fresh verification of
Instagram UI, platform limits, reach or music licensing. No Instagram publication was performed.

## Adopt for HF

- **Explicit crop check before publishing.** NN documented accidental square crops on 19 posts
  and its first Reel. Its uploader now selects Original explicitly. In our live publishing UI,
  verify the actual portrait crop and every hand/foot, not just the exported dimensions.
  Check feed, Reel and profile previews independently; don't assume one crop covers all destinations.
- **Deliver a cover with each Reel.** A deliberately chosen action frame plus complete, readable
  title; keep the body dominant. Export a separate cover PNG as well as the MP4. Our `cover`
  metadata and review thumbnails are a foundation, not automatically final-resolution cover files.
  NN successfully uploaded a separate cover in September. Its inability to edit covers later was
  a web-UI observation then, not a permanent platform rule. Get the cover right before publishing.
- **Action from frame zero.** HF starts with a person/exercise, not an empty brand intro. Let title,
  painted logo and action overlap in time when needed. Keep exercise entry, action and exit intact.
- **Read at phone scale.** NN's useful correction was that 40 px was a floor, not an ideal body size.
  Try 48–60 px for essential instructional copy at 1080 width; reduce copy before shrinking type.
  Use roughly 3 words/second only as an initial reading check. Complex movement plus text needs
  more time; validate by watching, not by a formula. Tiny credits belong in the caption.
- **UI-aware positioning.** NN used about 250 px top / 340–400 px bottom and extra right margin
  as working reserves. These are heuristics, not official current safe zones. Preview on the phone:
  our lower-right HF seals and bottom text deserve particular checking against the controls.
  Background video can fill the canvas while essential words and joints stay unobscured.
- **Selective gradient.** Darken where words need it; don't put a uniformly dark veil over the whole
  body. Preserve visible joints, fingers and muscle detail. Keep ochre/engraving layers independent.
- **Vary without losing identity.** Natural video, engraved freeze, photo and static carousel may
  alternate; keep HF glyph, ochre, fonts and tone. No need to invent a fresh component per Reel.
- **Story supports a reason.** Repost a useful Reel with one concrete prompt (e.g. “Você percebe o
  ombro subir?”), an event link or a verified teacher mention. It need not be a new daily production.
  Native sharing links to the original post; our rendered Story is an alternative asset, not that link.
  Prefer real motion excerpts for exercises. Add interactive stickers, music and real mentions in
  the app, checking available controls there. An @ printed in pixels is not an interactive tag.
- **Publication record.** Keep piece/version, MP4, cover, caption, source/credit, approval status,
  planned date, actual publication time and permalink. Only mark published after visible confirmation;
  if confirmation is lost, inspect the account before retrying to prevent duplicate posts.
  Planned calendar ≠ native scheduled post. No autonomous posting is introduced by this review.
- **Audio choice before export.** Compare short music samples first. For our exercise lessons,
  intelligible voiceover takes priority; keep clean/silent masters for native Instagram music.
  Platform availability/licensing and loudness must be checked for the actual destination.

## Do not transplant blindly

- “30–40 seconds”, “45–50 dense seconds”, “under 15 seconds is too short” and “over 60 loses reach”
  are NN-specific preferences or unsupported generalizations, not rules for HF. The 16/18/27-second
  exercise previews remain valid studies. Prefer one clear teaching point and complete execution.
- No fixed −19 dB “Instagram target”, fixed music gain or normalization recipe imported as a standard.
  Average amplitude and integrated loudness are different measurements. Mix and listen to actual voice/music.
- No generic viral CTAs, compulsory sales close, mascot treatment, institutional marking strategy,
  NN palette or template. Our aim is a niche practice community.
- Don't copy NN cookies/account profile, queue or browser script. It is account-specific, uses old
  selectors, and currently can continue when the requested cover upload fails. A future HF publisher
  should stop on missing cover/crop confirmation and use the supported tools in its execution environment.
- The retrieved repo has no validated standalone Story publisher. The concrete Story learning is
  manual sharing/mentions through the app, not evidence of a tested automation or reach gain.

## Next useful changes (proposed, not implemented by this review)

1. Export a publication package per approved piece: MP4 + full-resolution cover + caption + optional Story.
2. Add a phone-UI overlay to review essential text and seal placement (separate Reel/Story overlays).
3. Raise essential teaching text in the next exercise pass; keep sample/internal notes off final artwork.
4. Test one native repost with a concrete teaching prompt and one event Story with link, then compare
   actual replies, saves and useful conversations. No universal cadence or performance promise.

Existing source records: `src/festival/ig2/README.md`, shared `instagram-creation` and `videos-remotion`
playbooks. Keep platform mechanics dated and reverify in the actual publishing UI before use.
