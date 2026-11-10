# Balance Atlas

Community-driven directory for the global handstand / hand balancing community.
**Site**: balanceatlas.com | **Repo**: github.com/balanceatlas/balanceatlas
**Language**: ALL in English — code, content, commit messages, branch names, PR descriptions, GitHub issue templates, CLAUDE.md, and memory files. No exceptions.

## Stack
- Astro 5.18 + Tailwind CSS v4 + Motion + Lenis
- Content: Markdown + YAML frontmatter (Astro Content Collections)
- Hosted on GitHub Pages
- Typography: Sora (headings) + DM Sans (body)
- Design: Photography-forward, coral/orange + navy + teal palette
- Plugin: `frontend-design@claude-code-plugins` — follow its anti-AI-slop rules

## Content Conventions
- Coaches: one `.md` per coach in `src/content/coaches/`, slug = filename
- Retreats: one `.md` per retreat in `src/content/retreats/`, filename pattern: `YYYY-location-coach.md`
- Photos: `public/images/retreats/<event-slug>/` (numbered 01.jpg, 02.jpg...)
- Videos: `public/videos/retreats/<event-slug>/` (numbered 01.mp4, 02.mp4...)
- Coach photos: `public/images/coaches/<coach-slug>.jpg`
- Venue photos: `public/images/retreats/<descriptive-name>.jpg`

## Media Hosting (Cloudflare R2)
- **Bucket**: `media-handstand` on Cloudflare R2
- **Public URL**: `https://media.balanceatlas.com` (custom domain on R2)
- **Credentials**: `.env` file (see `.env.example`), never committed
- `public/images/` and `public/videos/` are **gitignored** — media lives only on R2
- **`MEDIA_URL` pattern** (`src/config.ts`): prod builds use R2 public URL, dev uses `''` (empty, serves from local `public/`)
- Content `.md` files keep relative paths (e.g. `/images/retreats/...`) — templates add `MEDIA_URL` prefix at render time

### Scripts
- `scripts/upload_r2.py` — uploads `public/images/` + `public/videos/` to R2 (skips existing, `--force` to re-upload, `--dry-run`)
- `scripts/download_r2.py` — downloads all media from R2 to `public/` (for fresh clones, `--force` to re-download)
- `scripts/download_gphotos.py` — reusable Google Photos album downloader
- All require: `pip install boto3 python-dotenv`

### Workflow: Adding new media
1. Download locally: `python scripts/download_gphotos.py <album-url> public/images/retreats/<slug>/`
2. **Optimize before uploading** (MANDATORY):
   - Images: `cwebp -q 82 -m 6 input.jpg -o output.webp` (replace original with .webp)
   - Videos: `ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -vf scale=-2:720 -c:a aac -b:a 128k -movflags +faststart output.mp4`
   - Short clips (≤30s): CRF 23. Longer videos: CRF 26.
3. Upload to R2: `python scripts/upload_r2.py`
4. Update content `.md` with relative paths — use `.webp` extension for images (no MEDIA_URL prefix in .md files)

### Media Optimization Rules — CRITICAL
- **ALWAYS optimize media before uploading to R2.** Never upload raw camera/phone files.
- Images: WebP format, quality 82, `cwebp -q 82 -m 6`
- Videos: H.264 720p, CRF 23-26, AAC 128k, `faststart` flag for streaming
- This is non-negotiable — raw video from phones can be 50 Mbps, web needs 2-4 Mbps

### Image Handling
- **Format**: WebP (.webp) — all images converted from JPEG/PNG
- **Manifests**: each event photo dir has a `manifest.json` with filenames, dimensions, sizes, and content hashes (md5) for dedup
- **Max items per event**: ~100 photos + videos combined (Paulo's preference)
- **Cache-Control**: `public, max-age=31536000, immutable` set on all R2 objects (upload script applies automatically)
- **TODO**: implement dedup check using manifest hashes when adding photos from new albums

## Sourcing Images for Retreats/Coaches
When a retreat or coach doesn't have photos, search in this order:
1. **Event registration page** — look for og:image meta tag or hero images
2. **Venue website** — look for location/facility photos
3. **Coach's personal website** — about page or portfolio
4. **Coach's Instagram** — profile picture (use WebFetch on instagram.com/username)
5. **YouTube thumbnails** — for video-based sources, use `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
Always verify downloaded images are real (>5KB, not HTML redirects).

## Photo Selection Guidelines
- **Hero images**: prefer ACTION shots (handstands, movement, training) over scenery-only. Scenery is OK as fallback, but people doing handstands is always better.
- **Gallery balance**: mix action shots (handstands, training), social moments (group photos, meals), stretching/warmups, and scenery. Don't front-load stretching-only photos — lead with handstands.
- **Ordering**: when selecting gallery photos from a large album, don't just pick the first N photos sequentially. Scan the full album and curate a balanced mix.

## Design Reference
- Alun.com.br v2 home page patterns: ScrollReveal, full-bleed photos, dramatic typography, staggered reveals
- Details in `memory/alun-v2-design.md`

## Key Patterns
- Retreat detail pages: **showcase** layout (past + gallery) vs **simple** layout (upcoming)
- Bento grid for photo galleries
- Horizontal carousel with snap scrolling
- Scroll-triggered animations via Intersection Observer (`data-animate`)
- Video autoplay: `autoplay muted loop playsinline` for short clips (≤20s)

## Tone
- Community-driven, NOT salesy
- We're documenting and sharing, not pushing or selling
- Warm, inclusive language — "hand balancers" not "students/clients"

## Content Writing Rules — CRITICAL
- **NEVER write descriptions using LLM-generated text.** All descriptions of retreats, coaches, venues, etc. must be quotes or excerpts from real sources (official websites, event pages, social media bios).
- Always include a visible source link (small, in a corner or footer of the section) so the reader knows where the text came from.
- If no source text is available for a coach/retreat, leave the description empty or use a minimal factual stub (name, location, dates) — do NOT invent prose.

## Link Quality Rules — CRITICAL
- **ALWAYS verify links exist before using them.** Do not guess Instagram handles or URLs — verify with a real fetch/search.
- **Retreats**: the Source link should point to the MOST SPECIFIC page possible — the retreat/event page itself, not just the coach's Instagram. Priority: event registration page > event info page > venue event listing > coach website events page > coach Instagram. Only use Instagram as last resort.
- **Coaches**: the Source link should point to their official about/bio page when available, not a generic homepage.
- **Instagram handles**: verify the handle is correct (not a 404). When unsure, search for the person and confirm the exact handle.
- **Never assume** a handle follows a pattern (e.g., `firstname.lastname.topic`). Always verify.

## Hidden pages (Oct 2026)
- `/` is a "coming soon" landing; the full site lives at `/principal` (nav points there, all pages `noindex`).
- `/festival` — **1º HandstandFest** (São Paulo, Fri–Sun 16–18 Apr 2027; decided 05/11/2026, the dates live only in `FEST` in
  `src/festival/data.ts`), standalone page in **pt-BR** with its own identity
  (Archivo 125% wide + Space Mono, hard geometry: bars and blocks; six palettes A (original orange) / B / C / D / E / F as CSS tokens,
  `?paleta=` + a floating switcher while the identity is open; Gabriel liked C (deep green + pink), Paulo found it serious,
  so E and F (04/11/2026) keep the green with sun yellow / coral). Exception to the English-only rule for page copy.
  Its media is committed in `public/festival/` because this machine has no R2 token for `media-handstand`;
  move it to R2 once `.env` exists. Research: Drive `pesquisas/festival-handstand-sp-2027.md`.
  **Design direction Paulo likes (29/10/2026): social-media cues** — story progress bars, ▶ video badges,
  story-format teacher posters, mini Instagram stories, "agora" live dot on the open ticket batch, "Sobre o evento"
  tabs drawn as Instagram profile highlights (04/11/2026). Keep exploring this language (reels/stories/play
  affordances) in new sections. Any `[data-tabs]` scope with `[role=tab][data-tab]` + `[data-panel]` works as tabs.
  Venue: Trapézio Voador (R. Alvarenga 150, metrô Butantã; confirmed 04/11/2026; Google Maps embed + the venue's
  own place link). Tickets: 60 spots, 1º lote R$490 (first 10), 2º R$590 (next 35), 3º R$690 (last 15), sold on
  Sympla (Paulo creates the event; see Drive `pesquisas/ingressos-pessoa-fisica-plataformas.md`);
  `TICKETS` in festival.astro is a placeholder (example.com) until the Sympla link exists. It feeds the top nav
  "Garanta sua vaga" and both CTAs. Levels: básico, intermediário, avançado (the organizers' brief of 04/11/2026
  covers all levels; rule on the site: básico = trains on the wall, no freestanding yet; inter/avançado = 10 s
  freestanding consistently, 30 s ideal; one shared track). Schedule (04/11/2026, provisional, shaped after the
  Drive research `pesquisas/festival-handstand-grade-diaria.md`): 9h yoga together (light), 10h wrist/shoulder
  warm-up per level, 10h30 handstand per level, lunch, 14h theme class (acroyoga / acro handstand / handstand on
  objects for básico, flexibility + press strength for inter/avançado), then Fri 16h handstand + roda de abertura,
  Sat 16h jam, Sun jam de encerramento 15h45–17h. Day threads: Sex Base, Sáb Construção, Dom Integração.
  FAQ `#perguntas` holds decided facts plus two handstand answers Paulo asked for (como começar; "vou sair fazendo
  parada de mão?" = no, tools + direction + wall/assisted gains); his longer FAQ text is still to come.
  **Overlay rule (Paulo, 04/11/2026):** whenever bars, Ts and blocks are laid over photos/videos, check they do not
  cover text or the body of the person in the handstand. Poster names stay in the top-left ~400px because the
  feet sit top-centre (`fit()` in compositions.tsx); the T shape was narrowed for the same reason.
  Palette research (04/11/2026, Drive `pesquisas/paleta-festival-esporte.md`): B ranked first (energy, contrast,
  distance from Rosario), then D and C; A and F fail accent-on-stage contrast. Lime never sits on paper.
  **Brand (Paulo, 10/11/2026): one brand only, HandstandFest.** No parent brand ("Handstand Lab" and "Casa do
  Handstand" were studied and dropped, Drive `pesquisas/handstand-lab-nomes.md`); the same site and Instagram carry
  articles, news and meetups between editions. Palette and logo are still open: `src/festival/MARCA.md` (pt-BR) is
  the brand brief with every decision, the open questions and the prompt Paulo takes to other design tools (Astra).
  Update it on every brand decision.
  **Applied on the site (10/11/2026):** only palettes E (green + yellow, default) and C (green + pink) remain in
  `festival.css` and in the switcher (`?paleta=e|c`); A/B/D/F/G are history in MARCA.md, so older notes in this file
  about seven palettes and "default B" are superseded. The HF symbol is `src/components/fest/HFMark.astro` (nav,
  sticky bar, footer, favicon, `Fecho` card of the Instagram kit). The hero and subpage headers are light (`.claro`,
  paper background, accent as a block behind the word, never as text on paper); `.grain` green stays for teachers,
  tickets and the sticky bar. Photo treatment is recorded but not applied yet. Only `design/handstandfest-logo-05/`
  is committed; rounds 01–04 (86 MB of boards) stay local and untracked.
  Current direction (latest feedback, 10/11/2026): **original E (forest green/yellow) and C (forest green/pink)**.
  Paulo supplied screenshots of Gabriel's favorites and wants to follow them; no final choice between the two.
  Scope: logo and documentation only. `design/handstandfest-logo-05/` has the upright HF refinement with a shared
  crossbar and fixed 4:3 enclosure, SVG/PNG variants and before/after. Refined drawing pending review.
  Rounds 03/04 remain historical PNG studies; muted C/sage and D/lavender are not the current direction.
  Photo direction recorded at Paulo's request: softened natural color by default, moderate-contrast B&W as a
  secondary treatment, approximately 2:1 as a flexible starting rhythm. Preserve skin/detail, keep brand accents
  colored outside body zones; avoid sepia, strong duotone and visible grain. Full guidance in MARCA.md.
  Interactive identity study (10/11/2026, round 02): `design/handstandfest-identity-02/index.html`, with SVG/PNG assets
  and reproducible scripts. Paulo requested inverted F vs upright HF, a new palette, and a **less brutal/neon** tone.
  More paper, smaller titles and natural-color photos; plum/butter/cream is compared with B. No final choice yet.
  Round 01 remains at `design/handstandfest-identity-01/index.html`; its B/Apoio recommendation was not approved. Contrast audit:
  A accent/stage is 4.493:1 (not the old 1.5); D white/accent is 4.346:1 and fails normal button text. Details in MARCA.md.
  Instagram: @handstandfest (profile not taken as of 04/11/2026; Paulo creates it). Domain: handstandfest.com.br
  (free on 04/11/2026, only via Registro.br; Cloudflare Registrar has no .br), .com/.org/.net also free.
  **Structure (04/11/2026):** four pages under `src/pages/festival/` sharing `src/layouts/FestLayout.astro`
  (head, palette switcher kept in sessionStorage, footer, tabs/reveal/bento scripts), `src/festival/festival.css`
  (all styles), `src/festival/data.ts` (TICKETS, bento photos, FAQs, sobre texts) and `src/components/fest/`
  (FestNav, SobreTabs, Bento): `/festival/` home; `/festival/sobre/` = "Sobre o evento" (highlights tabs, "Quem faz"
  in Paulo's own words, festival FAQ); `/festival/handstand/` = "Sobre handstand" (running text is PAULO'S OWN,
  dictated 04/11/2026 and edited only with the voz-paulo rules: never paraphrase or add claims; photos float so the
  text snakes around them (`.snake`), two bento strips, a five-step summary mapped to the two classes, handstand
  FAQ, band to the world list); `/festival/mundo/` =
  handstand workshops/retreats worldwide from `src/festival/eventos.ts` (facts only; refresh from the Drive file
  `pesquisas/handstand-workshops-retreats.md` and bump `LEVANTAMENTO`). Menu: Sobre o evento · Sobre handstand ·
  Garanta sua vaga. The festival is meant to move to its own domain (handstandfest.com.br, not bought yet); links
  are root-relative under `/festival/`, so a move needs a base-path pass.
  Each class has a teacher plus assistant teachers (Paulo, 04/11/2026). Layout rules (04/11/2026): content width
  `--max: 1120px`, fluid side margin `--gutter: clamp(20px, 5vw, 72px)` (never hard-code 16px/1200px), bento capped
  at 1360px, hero height capped at 880px, a slim sticky bar (logo + links + CTA) slides in after the page header,
  `[id]` has scroll-margin for it. Domain confirmed: handstandfest.com.br (not bought yet).
  Hero and teacher cards are Remotion compositions (`src/festival/`, `@remotion/player` via `@astrojs/react`,
  `client:only`); clips are cut and graded by `scripts/festival_clips.sh`. Remotion packages pinned to one version.

## Festival footage archive and Instagram (Nov 2026)
- **Raw footage never enters git.** It lives in `local/festival/` (gitignored): originals from the shared Drive folder
  "Videos" (52 clips, 4 GB, 05/11/2026), the 7 venue photos, proxies, contact sheets, pose, transcripts,
  `manifest.json` (fingerprints). Catalogue and contract, in pt-BR (same exception as the festival copy):
  `acervo/catalogo.yaml` + `acervo/README.md` (schema, `posicao` vocabulary, flow for new uploads).
- Flow for a new Drive upload: `scripts/festival_acervo.py sync` (read-only on Drive, skips by md5 or
  name + size + duration) → `scripts/festival_derivados.py` (540x960 SDR proxies, wavs, contact sheets) →
  `scripts/festival_analise.py tudo` (pose via `~/paulo.com.br-render/scripts/pose.py`, upside-down intervals,
  two-phone sync by audio, Whisper) → catalogue the new ids. All have `--help`.
- **Who is who** (inferred from speech and context, Paulo to confirm): Paulo = beard and glasses, black shorts, owns
  the Pixel (`pxl-*`); Gabriel = the iPhone (`img-31xx`), beige shorts, hair tied. A child appears in `img-3177`:
  always crop them out. The 18/10 clips show a group of other people: do not publish without asking.
- **Two cameras**: 7 real pairs on 04/11/2026 (`par:` in the catalogue). An iPhone clip trimmed in Photos keeps the
  creation date of the original recording, so wall-clock guesses were up to 70 s off: search wide (default 240 s),
  trust score ≥ 25, and check on frames. Paulo (05/11): on the long palm-tree take use only short cuts of figures
  already up, never the entries.
- `/festival/instagram` (working page, not in the menu, noindex): ten pieces as live Remotion compositions, not
  rendered (palette still open, so they follow the palette switcher). Contract and specs: `src/festival/ig/PECAS.md`;
  kit `kit.tsx` (safe zones with a toggle, `Gancho`, `Legenda`, `Esqueleto`, `DuasCameras`, `Fecho`...), one file per
  piece `pNN-*.tsx`, titles and draft captions in `pecas.ts`, glue in `registro.ts`. Web media is cut by
  `scripts/festival_ig_midia.py` from `src/festival/ig/midia.json` into `public/festival/ig/` (committed, ~25 MB at
  crf 30: keep it lean, recuts bloat the history; move to R2 with the rest). `?montar=1` mounts every player.
  Format rules come from the Drive research `pesquisas/instagram-evento-formatos-playbook.md` (hook on frame 0,
  what/when/where before 8 s, nothing fixed for the whole video, no music in the render, 2nd carousel slide as a
  second cover). The venue section of the home plays piece 03 without its closing card.
- Paulo's review (05/11): pieces approved as a direction; open notes in `PECAS.md` ("Notes for the next pass"):
  some clips look blown out after the HDR tone-map, and some pieces should get a black-and-white or sepia look.
  He tried the vocabulary page and found the automatic `posicao` labels good enough: no need to push him to fill it.
- Footage caveat: on 04/11 the bodies are small in frame (8–35% of the height); crops beyond 2x are soft at 1080p.
  Next shoot: closer, phone at hip height, one take per figure.
- **Vocabulary page** (local only): `scripts/festival_vocabulario.py` serves `acervo/vocabulario.html` on
  http://localhost:4331, one card per catalogued scene with a position, looping and zoomed on the body. Paulo marks
  instants and names what he sees; it autosaves to `acervo/vocabulario.yaml` (`termos`, `marcacoes`). YAML is read
  and written through the system ruby (no PyYAML here). Once he has filled it in, replace the provisional `posicao`
  names in the catalogue with his terms.
- **To do (Paulo, 05/11/2026)**: bring the Balance Atlas retreat photos and videos into the same catalogue, with
  image cards on the vocabulary page.

## FAQ Page
- The site has a `/faq` page explaining the community, how to contribute, etc.
- Must include a question: "I'd like to remove a photo or my retreat/intensive, how do I do that?" → Answer: "Just send an email to paulo.silveira@gmail.com"
- Contact email for removals: paulo.silveira@gmail.com
