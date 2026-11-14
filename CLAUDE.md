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
  **Overlay rule (updated by Paulo, 12/11/2026):** no decorative bars, Ts or blocks over site photos/videos; no paint behind teacher/lineup cards. Keep meaningful text highlights and approved engraved-person/paint layers (IMAGERY.md). Shared site players were cleaned. Purchase CTAs are rectangular with 10px corners and 3px outlines across subpages (Gabriel review, 13/11/2026); hero lot information is plain text, not a competing button. Hero has no vertical line and “1º” sits above HAND, aligned left (13/11/2026). See MARCA.md for the decision.
  Palette research (04/11/2026, Drive `pesquisas/paleta-festival-esporte.md`): B ranked first (energy, contrast,
  distance from Rosario), then D and C; A and F fail accent-on-stage contrast. Lime never sits on paper.
  **Brand (Paulo, 10/11/2026): one brand only, HandstandFest.** No parent brand ("Handstand Lab" and "Casa do
  Handstand" were studied and dropped, Drive `pesquisas/handstand-lab-nomes.md`); the same site and Instagram carry
  articles, news and meetups between editions. Green/yellow and the brush-circle HF are now in use: `src/festival/MARCA.md` (pt-BR) is
  the brand brief with every decision, the open questions and the prompt Paulo takes to other design tools (Astra).
  Update it on every brand decision.
  **Sympla (10/11/2026):** event https://www.sympla.com.br/evento/handstand-fest/3650651, edited that day to match
  the site (name "1º HandstandFest · festival de parada de mão", Sunday ends 17h, description built from the site
  copy, ticket renamed "1º lote", 10 units, R$490 + R$49 fee, sales 18/11/2026 14:21 to 17/03/2027). Saving it
  without the payout registration (CPF/CNPJ, Gabriel's job) sent the event back to DRAFT, so the public URL is 404
  and lots 2 and 3 cannot be created yet (Sympla opens the payout form instead of the ticket form). Until it is
  published again `SYMPLA_NO_AR` in `data.ts` is false and every ticket button scrolls to `#ingressos`; flip it to
  true afterwards. Then create "2º lote" (35, R$590) and "3º lote" (15, R$690) with "Por lote" (starts when the
  previous one sells out). The site shows "abre 18/11" until `VENDA.abre` and switches to "aberto" in the browser.
  **Brush identity v07 (10/11/2026):** master traced from Paulo's supplied reference in
  `design/handstandfest-selo-07/hf-brush.svg`. `scripts/festival_brand_assets.py` generates `src/festival/pincel.ts`
  and versioned `public/festival/brand/` assets: green/yellow seal SVGs, transparent PNG + lossless WebP at
  96/192/384/768 px, and a horizontal stroke derived from the same circle's dry-brush edges.
  `HFSelo.astro` serves responsive pictures (menu, sticky bar, footer, hero); `simples` means small delivery,
  not a different shape. Shared `Brush.tsx` serves Instagram hooks and the site's video stamps/teacher posters;
  CSS headings use the same stroke as a mask. Animated `Selo` keeps brush and HF independent with real transparent
  gaps. One brush accent per heading; buttons, schedule and utility chips keep hard geometry. Obsolete version 06 files were removed from the current tree. Recipe and validation in the v07 README; direction in MARCA.md.
  **Current palette (Paulo, 11/11/2026): ochre + cream + deep green** (replaces the former E green/yellow choice), tokens on `:root` in `festival.css`; the
  switcher and `?paleta=` are gone, so everything below about E/C or seven palettes is history. **Photo treatment
  applied by CSS** (no recuts): softened natural colour by default (`--foto-cor`), moderate black and white
  (`--foto-pb`) on about a third (`pb: true` on a bento item, class `pb` on a figure, `look="pb"` on `Clip`/`Foto`
  in the Instagram kit, used for backdrops behind text). Clips were recut the same day: HLG to SDR is now
  `npl=100` + `tonemap=hable` (sky and glass walls keep detail), and the hero/teacher clips lost the old baked grade
  (`scripts/festival_clips.sh`; sources in `~/paulo.com.br-render/local/treinos/2026-10-11-gabriel/girados-hd/` and
  `~/Downloads`). The MediaPipe venv moved to `~/ciencia/tamanhodouniverso/.venv-rosto`.
  **Legacy cleanup (Paulo, 10/11/2026):** removed obsolete logo kits 05/06, HFMark, the procedural generator,
  old favicon and old stroke from the current tree. Prior tracked versions remain recoverable in Git history;
  untracked rounds 01–04 were moved outside the repository. Version 07 is the only active logo master.
  **Shirts:** `/festival/camisetas/` lists five timeless front/back proposals. New 04/05 lead with three front-view figures (straight/straddle/one-arm) and lowercase handstandfest.com.br; 01–03 below use the HF, stacked name and
  an original side-profile handstand silhouette. Illustrated crewneck mockups reference Insider Nori Green;
  exact fabric color/printing require a physical sample. No dates, years or city on the prints.
  `scripts/festival_shirts.py` regenerates outlined SVG print artwork and WebP mockups with fonttools + librsvg;
  the licensed Archivo source is in `design/fonts/`. Assets: `public/festival/camisetas/`.
  **Brush timing:** text must appear with or before its highlight. Instagram 2 holds the text from frame 0 and
  starts brushing at frame 5; the original kit shares the text/brush transform. Poster names finish entering
  before their brush; text changes color only where the brush has reached to preserve contrast.
  **Domain (11/11/2026):** handstandfest.com.br was registered by Paulo at Registro.br that day. Cloudflare zone
  created in his account (Free plan): proxied A records for the apex and `www` (192.0.2.1, placeholder) and one
  Redirect Rule, all requests → `https://balanceatlas.com/festival/` (302, temporary until the site moves to the
  domain). The zone was assigned `dolly.ns.cloudflare.com` + `matt.ns.cloudflare.com`; Registro.br had been set
  to `byron` + `kim` (the pair of paulo.com.br); Paulo changed it the same day and the domain went live: apex and
  `www`, http and https, all answer 302 to the festival (checked 11/11/2026).
  **Served on the domain (11/11/2026, later the same day):** the Redirect Rule is disabled (kept, not deleted) and
  the Worker `handstandfest-site` (`worker-handstandfest/`, routes on apex and `www`, `npx wrangler deploy` there)
  proxies `handstandfest.com.br/<page>` to `balanceatlas.com/festival/<page>` and strips `/festival/` from page
  links in the HTML; assets keep `/festival/...` and `/_astro/...`; old `/festival/<page>` URLs, `www` and http
  301 to the clean URL. The site is still built once, for balanceatlas.com, so keep links root-relative under
  `/festival/`; both addresses work. Pages are still `noindex`.
  The dashboard's API refuses writes from page scripts (403) and the local wrangler token only reads zones: DNS
  changes go through the dashboard UI. Older notes saying the domain is not bought are superseded.
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
- `/festival/instagram2` (10/11/2026): alternative proposal in `src/festival/ig2/`, alias `/instagram2/`.
  Eleven pieces using the current green/yellow brush-circle identity: 7 reels, two static 5-slide carousels and two story sequences (3 + 2 frames).
  Continuous gallery requested by Paulo: all 11 pieces and 22 previews are listed, including every carousel/story frame.
  Players mount automatically near the viewport and pause offscreen; shared photo-look override and safe-zone guides. Existing instagram unchanged.
  Paulo found the first typography too small: main info now 40–48 px, headlines mostly 80–125 px at 1080; review at
  phone width. No added grain/music, text kept off bodies, dates from QUANDO. Details and checks in ig2/README.md.
  New cuts/stills from five additional catalogue sources in `ig/midia.json`; carousels are images/text only, frozen with no video controls.
  Publication authorized 10/11/2026 via GitHub Pages. MP4 export: `python scripts/festival_render.py futebol formas` (CLI pinned 4.0.534, shared compositions, local fonts and site tokens, files in gitignored local/festival/renders). First two exports sent to Paulo via Faisca on explicit request. Editorial research: KB `handstand-instagram-editorial-alem-evento.md` (24 ideas). Editable shot planning in `src/festival/ig2/PAUTAS.md` (archive candidates, new photos/videos, file/timecode fields). Football variant `futebol` reuses the reviewed mural crop; no new source.
  Global complementary playbooks: `~/.claude/skills/instagram-creation/SKILL.md` and `~/.claude/skills/videos-remotion/SKILL.md`.
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
- **Photo index (12/11/2026)**: `acervo/catalogo.yaml` now includes 190 image records (189 visually reviewed, one missing URL), with approximate `handstand`, person counts, shapes, full-body status and suggested uses. Consult `acervo/README.md` and `scripts/festival_image_index.py --help` before selecting exercise/Instagram images. Keep annotations in this existing YAML; no batch pose detection needed. Retreat videos and image cards on the vocabulary page remain to do.

## FAQ Page
- The site has a `/faq` page explaining the community, how to contribute, etc.
- Must include a question: "I'd like to remove a photo or my retreat/intensive, how do I do that?" → Answer: "Just send an email to paulo.silveira@gmail.com"
- Contact email for removals: paulo.silveira@gmail.com

## Festival refinement — 10 November 2026

Paulo approved a small hierarchy/decoration pass alongside the Instagram proposal: mobile hero now places date/city above the video; desktop hierarchy is retained. Removed the external bar behind the hero video, seal drop shadow, animated hero grain and noise texture in green fields. Keep the seal, one brush highlight and real photography as the identity. Remaining ideas (not implemented): explicit pause/offscreen handling for other video surfaces, editorial links, branded social preview image. Ticket URL remains the pre-existing example.com placeholder; obtain the real destination before promoting ticket sales.

## Approved image/video language and home handoff — 11 November 2026

Read `src/festival/IMAGERY.md`: Paulo approved BOTH the selective engraving over photographic scenery with intermediate ochre paint, and the engraved figure with a brush on deep green. This is a shared language for the official site, Instagram and selected video freezes that deliver a message. It complements existing photographic/community material and cream/ochre compositions. The scenery variant now uses **65% paint opacity**; that does not change every brush/logo opacity.

The earlier notes-only/no-regeneration request was superseded by explicit approval to put both applications on official pages. Published: scenery variant on `/festival/handstand/#pratica-em-qualquer-lugar`, green variant retained on `/festival/sobre/#practice-title`. `compose-hybrid.mjs 0.65 --publish` regenerates the scene's layered SVG/PNG master and public WebP. The current generative hybrid is not a pixel-identical original background; preserve original pixels plus a registered foreground when exactness is required. See the imagery guide for layers, asset paths, source limitations, editorial selection and freeze timing.

Paulo is merging the official homepage with his preferred parts of `/festival/home2/ocre/` in another agent. This round only integrates the already-approved art in existing official subpages and records the shared language; it does not perform that home merge. Retain optional independent paint, anatomical hatching rather than plain grayscale, low-clutter single-person imagery, authentic group photographs, fixed HF master and the existing autoplay/pause/reduced-motion behavior. New exact-frame engraving transitions remain to be validated.

## Artistic festival studies — 10 November 2026

**Reusable photo-to-engraving kit (11 November 2026):** `design/handstandfest-arte/2026-11-11-prompts/README.md` holds two reusable prompts (anatomical contour hatching + transparent extraction; separate brush composition), exact tested prompts, two approved photo-derived PNGs, source hashes and a native SVG compositor with oval/sweep/open-arc variants. Decoration may vary within the v07 bristle language; the HF seal itself stays fixed. Generative illustration is not the deterministic JS/FFmpeg filter and is not anatomy-exact; inspect fingers, proportions, alpha and residual coloured edges. Prefer selected stills or an exact freeze frame, not per-frame generation. Paulo will merge official home/home2 with another agent: the home merge remains separate. Approved applications now appear in handstand/about pages and the Instagram2 `gravuras-aprovadas` carousel via `EngravingArtwork.tsx` (optional independent paint). A single low-clutter bento photo gets an additional generated engraving; group photos remain photographic. Selective colour-scene + engraved-person and adjustable intermediate ochre paint studies are documented in the kit; they are not plain grayscale filters. Shared guidance is in the Instagram and Remotion playbooks.

Shirt proposals 06–08 and three static art cards + two freeze/paint Reels now explore the engraving references supplied by Paulo (himself and Gabriel). Sources, exact built-in ImageGen prompts and regeneration: `design/handstandfest-arte/README.md`. Shared `ig2/art-pieces.tsx` keeps figure, v07 brush, orbit and text separate. Ochre is experimental; keep global green/yellow. Gallery now has 14 pieces / 27 previews. Print SVGs for these shirts contain raster engravings: do not call them entirely vector or press-ready. Render script supports `--still --frame` and uses explicit `bundle --out-dir`.

## Alternative festival homepage — 10 November 2026

`/festival/home2/` is the mixed art study, with `/ocre/`, `/amarelo/` and `/verde/` variants. `ArtHome.astro` shares event facts via `home-content.ts` with the original home; `ArtGesture.astro` reuses the engraved figures and v07 brush. Paulo liked the direction and requested recognizable bristles around invited teachers: textured underlays outside photos and short name highlights, with bodies unobscured. Keep utilities clean. The original home stays the default. Ochre is now approved: cream/ochre and deep-green/light-ochre are the two directions. `ArtStories.tsx` + `ArtStoryPlayer.tsx` restore silent autoplay sequences in the hero and teachers section, with progress, manual navigation/pause, viewport suspension and reduced-motion support. Selected clips freeze at 4 seconds, desaturate and receive the v07 brush/seal. Recipe in `design/handstandfest-arte/README.md`.

**Ochre hero restoration (11 November 2026):** Paulo requested the original static engraved figures with anatomy-following hatching again. Only `/festival/home2/ocre/` restores the `ArtGesture` stag hero; the straddle illustration below and teacher stories remain. Do not replace these authored illustrations with the procedural engraving-filter experiment.

## Instagram ochre experiment — 10 November 2026

`/festival/instagram2/` defaults to the approved ochre/paper/green direction (`?paleta=original` compares the old yellow) to the live compositions, via a reversible toolbar selector and exportable `PieceProps.palette`. New `ochre-photos.tsx`: three P&B/ochre photo cards from existing img-2381 stills plus a separate animated-photo Reel. Current gallery: 17 pieces / 34 previews. CLI `--palette ocre` also colors closing seals; photo and freeze/paint MP4s are exported outside Git. Approved palette with larger previews and increased secondary typography; card 3 supplies the green contrast. Six pieces have Brazilian music suggestions and optional official YouTube listening embeds, separate from the silent compositions. Final music selection happens in Instagram; no recording or synchronization is bundled. See ig2/README.md and ig2/MUSICA.md.

## Official home takes the home2/ocre art language — 11 November 2026

Paulo and Gabriel chose the home2/ocre look for the official home and subpages, keeping the official copy and
structure (hero title with the brushed HAND, ticker, teacher section unchanged). Added in `festival.css` (last
block): `.moldura` = one v07 brush stroke behind a photo/video, outside the media so it never covers a body (hero
video, teacher poster, lineup stories, "Quem faz" photo); `ArtGesture` straddle left of "Três dias treinando"
(`.about` is now a two-column grid) and stag on the green tickets section (`.signup-art`, hidden under 900 px).
Instagram pages already followed the ochre tokens. home2 stays online as a study. "handstandlife" (hashtag,
maybe a domain instead of the dropped Handstand Lab) is an idea only; note in MARCA.md.

## One Instagram page, named styles — 11 November 2026

One player per piece (`UNIT` in `catalog.tsx` joins the slides of a carousel or story sequence with `<Series>`; slide names are jump buttons) — Paulo found separate per-slide players hard to follow.
`/festival/instagram/` now lists every piece (the ten of `ig/` and the seventeen of `ig2/`) in one Studio gallery,
grouped by named style with filter chips (`#<style-id>` in the URL). `/festival/instagram2/` and `/instagram2/`
redirect there. Styles and the piece → style map live in `src/festival/ig2/catalog.tsx`: **Tela cheia** (`ig/`
p01–p10, full-bleed video with text strips), **Janela no papel** (ig2 default: cream canvas, text in its own
space, media in a window), **Gravura e mancha**, **Congela e pinta**, **Foto P&B com ocre**. A new ig2 piece
defaults to "Janela no papel" unless added to `STYLE_OF`. The treatment selector only affects ig2 pieces; `IgCard`
and the `.ig-*` CSS are unused but kept. Use these style names when talking to Paulo and Gabriel.
"handstandlife": ideas for use (community hashtag vs. event hashtag, section name for between-editions content)
were discussed on 11/11/2026; nothing decided.


## Continuous engraving / prospective Handstand Life — 11 November 2026

`/festival/gravura-lab/` is Paulo's adjustable two-video study (noindex, not in navigation). Canonical implementation/recipe: `src/festival/engraving/README.md`; portable CPU RGBA engine, faster WebGL preview, CPU worker fallback, bounded local JSON presets, and tested Remotion `OffthreadVideo.onVideoFrame` adapter. Reuses `mural-reta`, `p-desce`, optional `j-press`; no raw footage added. Presets are drafts for Paulo to choose, not new brand defaults. Whole-video procedural hatching is an additional option for future narrated exercise demonstrations (“Handstand Life”, provisional name); keep voiceover/captions separate. It is not generated anatomical art or foreground segmentation. Shared visual guidance is in IMAGERY.md and the complementary global Instagram/Remotion playbooks.

## Festival hidden on balanceatlas.com — 12 November 2026

Paulo asked for `balanceatlas.com/festival/` to be a 404: the festival answers only on handstandfest.com.br.
`npm run build` = `astro build && node scripts/festival_hide.mjs`, which moves every built festival HTML page from
`dist/festival/` to `dist/hf/` (assets stay in `dist/festival/`). The Worker reads pages from `/hf/` (falls back to
`/festival/` on 404). Source, links and `astro dev` still use `/festival/`; do not link to balanceatlas.com/festival
anywhere. The repo is public, so `/hf/` is unlisted, not secret. `/instagram2` on Balance Atlas redirects to the
festival domain. Home copy changed the same day (Gabriel's notes): intro heading and paragraph rewritten, the
"Quatro blocos por dia" paragraph and "Perto do metrô" removed. `FestPlayer` now plays only while on screen
(six players at once made old computers flicker). Friday's "Roda de abertura" (17h30–18h30) was removed from the schedule on Paulo's call (12/11/2026); Friday ends at 17h30. The adjustable engraving video filter lives at
`/festival/gravura-lab/` (another agent, commit 18cf134).

## Mobile media fallback — 12 November 2026

Paulo reported Agustin showing only ochre and lineup cards only green on Chrome/Pixel 10, while desktop worked.
These match the compositions' hidden entrance frame: `FestPlayer` skipped playback for reduced motion but still
rendered frame zero over the HTML image. Reduced motion now renders the real static photo; other players start
at visible frame 60 and have image posters for unplayed/buffering/error states. Media islands have real boxes,
and the observed player wrapper uses absolute inset rather than percentage height through display:contents.
Keep offscreen pause. Do not require autoplay for essential photographs to appear. Build and reduced-motion
render checks passed; confirmation on Paulo's physical Pixel remains pending.

## Instagram editorial calendar — 12 November 2026

`/festival/instagram/` now leads with a proposed 21-day community sequence (one feed post + supporting story),
not the style comparison gallery. Canonical plan: `src/festival/ig2/editorial.ts`; rationale, sources, capture
priorities and measurement: `ig2/ESTRATEGIA.md`. `EditorialCalendar.tsx` lists previews and honest production
slots; start date is editable/local-only. `editorial-pieces.tsx` adds four ochre/engraving static pieces.
Carousel slides are static and individually visible. Old Studio remains a secondary collapsed library.
Paulo explicitly prioritizes niche community over virality. No automatic Instagram publishing; technical
exercise copy/capture and professional portraits stay pending review. References are not festival guests.

**Editorial image variety (12 November 2026):** Paulo found the fixed engraved straddle overused.
`ig2/editorial-images.ts` now curates ten existing catalogue photos and maps candidates to calendar days.
New static pieces/stories mix real group/class photos and varied single-person poses; the original engraving
is a selective illustration, not a default story stamp. Pending exercise slots show contextual references
and outstanding capture needs, never substitute a different movement as the demonstration. Future engraving
candidates and exact catalogue IDs are recorded in `ig2/ESTRATEGIA.md`; no new AI engraving was generated
in this pass. Preserve hands/feet and identify retreat imagery as archive, not future festival coverage.

**Selected editorial engravings (12 November 2026, follow-up):** Paulo requested the saved hatching/extraction
prompts on selected new photos. Two new ImageGen cutouts (Greece profile 11, Thailand diagonal 18) and the
existing overhead straddle now illustrate calendar day 3; days 2/16 stories use diagonal/profile selectively.
Separate optional v07 paint uses arc/oval/sweep and ochre/light-ochre tones; community photos stay natural.
Exact prompts, source hashes, PNG masters and regeneration: `design/handstandfest-arte/2026-11-12-editorial/`.
This supersedes the previous no-new-engraving status. Not a procedural video filter or anatomy measurement.

**Gabriel batch (12 November 2026):** Nine supplied MOVs + eleven photos now share `acervo/catalogo.yaml`
(IDs `gabriel-img-*`; 201 image records total). Raw copies/proxies/contact sheets stay under
`local/festival/gabriel-2026-11-12/`. Import/export scripts: `festival_gabriel.py`, `festival_gabriel_publish.py`.
Four selected sources power `ig2/gabriel-pieces.tsx`: two exact-frame freeze/P&B/ochre Reels (IMG_3372 at
6 s and IMG_3377 at 10 s), natural IMG_7876 and a new transparent engraving from IMG_8751. Calendar days
2/7/17/21; stories reuse native posts rather than unrelated art. Prompts, hashes, render recipes and limits:
`design/handstandfest-arte/2026-11-12-gabriel/README.md`. Video brush masks retain the scene, not segmentation
or generated anatomical hatching. No source audio in exports, no automated Instagram posting.

## Instagram post-export refinement — 12 November 2026

Paulo requested larger bodies/media and mostly question-led openings. Day 2 now tests
`gabriel-transicoes-tela` (almost full frame, readable overlay, exact freeze without shrinking the video),
with the previous layout visible alongside it. `gabriel-gravura-story` is a dedicated larger 9:16 static.
Do not assume approval of all-full-screen layouts. Day 16 is the five-static-slide `ed-consistencia` carousel.
`production-plan.ts` powers the page's filming checklist and future topics; `PESQUISA-CAPTACAO.md` contains
Gabriel's filming brief and primary-source/Chrome research with dated, non-comparable HSF view counts.
Use #handstandlife for practice/community and #handstandfest for the event; community copy invites people
to help create/map training meetups and places, not a claim that a complete map exists. Story reposts are
selective and contextual; the 2–3-day follow-up is an editorial test, not a Meta rule (ESTRATEGIA.md).
`acervo/gravuras.json` is the separate reusable derived-art index (eight figures, two composites); raw
sources remain in catalogo.yaml. Reuse independent figures/paint and retain honest review/provenance states.

## Instagram framing/signature approved — 12 November 2026

The full-video comparison is now approved for all existing/future Instagram footage. Use full or near-full framing without cropping bodies; keep geometry through freezes. HF seals are larger (220–230 px baseline); static Stories and standalone images get the seal too. Carousel interiors have **no logo**: only the informative final slide carries the larger signature. Ochre brush/highlight is the recurring cue unless the engraved figure's ochre disc already provides it. Internal archive/Balance Atlas labels stay out of exported artwork, but provenance/required credits remain in catalogues and captions. Canonical rules and limits: `src/festival/ig2/README.md`, `IMAGERY.md`, `MARCA.md`. This supersedes the test-only/full-frame-not-yet-approved note above. Site teacher decoration restrictions remain unchanged.

## Nature/pool media curation — 12 November 2026

Reviewed the two new Downloads folders and standalone pool video (24 files, 23 unique sources). `acervo/catalogo.yaml` adds eight videos and four images; a fifth photo is the higher-resolution original of existing `photo-thailand-2026-56`. `acervo/lotes/natureza-2026-11-12.md` records the shortlist, omissions and nine original-timeline cuts; its JSON is the ingestion/deduplication manifest. `scripts/festival_curated_media.py` preserves accepted originals and makes local SDR cuts, photo derivatives and a gallery. Prefer the two water presses, waterfall pike and eleven-person pool photo for future Instagram variety. These are prepared source assets, not newly published posts; audio remains unreviewed. Full sources/cuts stay out of Git, public-web derivatives require normal optimization.

## Nature/water Instagram pieces — 13 November 2026

The 12 November curation has now become nine actual Reels plus three photo Stories, visible at the top of
`/instagram/#natureza` (local route `/festival/instagram/`). Registry/copy/source timing: `ig2/natureza.json`;
shared preview/export components: `natureza-pieces.tsx`; workflow: `ig2/NATUREZA.md`. Near-full footage, exact
freeze, photographic P&B, ochre text highlight and large painted HF seal. Solo water press has lower text
to leave feet visible; indoor pike photo has the seal on the right. Selected pool/deck cuts and Gabriel transitions now use registered anatomical engraving over the intact colour still, with independent v07 ochre at 65%; see `design/handstandfest-arte/2026-11-13-freezes/README.md`. No music.
Web derivatives live in `public/festival/ig/natureza-v1/`; the initial export batch was stopped at Paulo’s request; review is page-only, and partial local exports predate engraving. Catalogue backlinks record actual composition use.


## Festival navigation and footer — 13 November 2026

The detailed three-day schedule now lives on `/festival/sobre/#grade`, after the event introduction tabs.
The home keeps `#grade` as a short link to that section, preserving existing anchors; level cards stay on the home.
Schedule data remains in `src/festival/home-content.ts`; the existing scoped tab handler serves both sets of tabs
on Sobre independently. Paulo removed the “um projeto Balance Atlas” footer link across festival pages.


## Persistent festival menu — 13 November 2026

Public pages share one fixed FestNav rendered by FestLayout: Início / O evento / Handstand, active page underlined.
Desktop also shows HF and the ticket CTA; mobile keeps only the three visible links, no hamburger.
The old header menu and scroll-triggered duplicate were removed; body padding and anchor offsets reserve space.
Study/editorial pages retain their existing stickyNav=false opt-out. The ticket footnote now links to Sobre
with Paulo's shorter copy, without repeating the batch progression.


## Festival search indexing and sharing — 13 November 2026

Paulo explicitly enabled search indexing: the official home, Sobre, Handstand and Mundo are now index/follow.
This supersedes earlier “festival pages are noindex” instructions; the Balance Atlas site remains unchanged.
`FestMeta.astro` owns description, canonical, Open Graph, Twitter large cards and JSON-LD (WebSite/WebPage;
Event on the home with dates from FEST and confirmed venue; no ticket offers while Sympla is unpublished).
`FestLayout` supplies it automatically: public pages default to indexable; stickyNav=false study/editorial
pages default to noindex. Use explicit indexable when navigation and indexing differ. The standalone engraving
lab also uses FestMeta with noindex. Never strip noindex from experiments just to grow the sitemap.

Every future festival page must use FestLayout or FestMeta. Default social image is the approved straddle
engraving on cream/ochre, a versioned 1200x630 JPEG under public/festival/social/. Per-page ogImage/ogImageAlt
can override with another reviewed local 1200x630 JPEG. Page titles/descriptions remain specific. Regeneration:
`node scripts/festival_social_image.mjs` (bundled fonts, original engraving, v07 stroke/seal; no regenerated art).

After festival_hide, `scripts/festival_metadata.mjs` validates ALL non-redirect HTML (metadata, JSON-LD,
canonical, local image existence/dimensions/size). Build fails if a future page bypasses the contract.
It generates dist/festival/sitemap.xml from indexable pages only, plus robots.txt allowing crawling so
crawlers can read noindex on studies. Worker routes root /robots.txt and /sitemap.xml to those festival
assets, not the Balance Atlas root. Do not use blanket Disallow, which blocks social previews/noindex discovery.
Canonical and OG URLs always use handstandfest.com.br without /festival or /hf; assets retain /festival.
No invented lastmod, reviews, ratings, live ticket availability or organizer business identity.
References: https://ogp.me/ and Google Search Central indexing/Event structured-data documentation.


## Sympla live, sales scheduled — 13 November 2026

Public canonical event URL verified in the browser: https://www.sympla.com.br/evento/1-handstandfest-festival-de-parada-de-mao/3650651.
SYMPLA_NO_AR is now true, superseding draft/404 notes. The ticket widget still says “Não iniciado” and purchase
is disabled; keep the scheduled 18 November opening, do not label tickets as already on sale. Paulo confirmed
R$450 + R$45 fee for lot 1 after the live widget disagreed with the old R$490 copy. VENDA.preco/taxa are now
shared by home, ticker, FAQ, studies and Instagram closing/lot templates. JSON-LD has no active offer yet.
Sympla's event description itself still says R$490 and links the old balanceatlas.com/festival URL; that external
copy needs an organizer edit (not modified by this site deployment).

## Instagram editorial revision — 13 November 2026

Use `src/festival/ig2/EDITORIAL-REVISION-2026-11-13.md` and the source feedback
`docs/instagram/2026-11-13-user-review.md` for this revision. Concrete observations and named
skills beat generic questions; do not force every headline into question form. Interleave practice,
exercises, community and event posts. The weekly calendar is a proposal, not an automatic queue.
Public teacher name: Gabriel Agustin. The festival idea came from him after an Argentina experience;
shared biography lives in `home-content.ts`. All confirmed teachers use the same grid, no guest tier.
The camera-facing scorpion engraving is rejected for reuse. Prefer the straight-profile derivative
registered in `acervo/gravuras.json`; preserve the registered freeze canvas and independent paint layer.
English movement terms may receive a restrained ochre highlight, not mandatory italics. Famous-balancer
spotlights are independent references, without HF endorsement/guest implications or imported unapproved footage.
`/instagram/gabriel/` is the filming brief: silent demonstrations, voiceover later; reference samples retain
Paulo's original audio and have editorial labels, not claimed literal subtitles. The future educational archive
is “Handstand Life: Guia de Sobrevivência”. Keep pending lessons visibly pending until filmed and reviewed.
