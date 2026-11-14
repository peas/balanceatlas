# Archived festival setup notes

Superseded historical snapshot, preserved on 14 November 2026. Do not use these prices, domains, palette choices or publication states as current instructions. Read `src/festival/CURRENT.md` and the active source files.

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

