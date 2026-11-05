# Instagram pieces of the 1º HandstandFest: contract and specs

Ten pieces for the launch of @handstandfest, shown live on `/festival/instagram` (working page, not in the menu).
They are Remotion compositions played by `@remotion/player`; **nothing is rendered to MP4** until the palette is
closed, so every colour is a CSS variable of the page. On-screen copy is pt-BR, festival voice, no em-dash.

## Files and owners

| File | What | Owner |
|---|---|---|
| `kit.tsx` | formats, safe zones, `Quadro`, `Clip`, `Foto`, `DuasCameras`, `Esqueleto`, `Gancho`, `Etiqueta`, `Barras`, `Cortina`, `BarrasStory`, `Cronometro`, `Legenda`, `Fecho`, `Lamina` | coordinator. Need something new? Add it to your piece file; say so in your report |
| `tipos.ts` | `Slide` | coordinator |
| `pecas.ts` | title, idea, caption draft, sound, material of each piece (no React) | coordinator |
| `registro.ts` | id → slides | coordinator |
| `midia.json` + `scripts/festival_ig_midia.py` | web clips, photos, pose and caption files in `public/festival/ig/` | coordinator |
| `legendas/<clip>.json` | reviewed words of a spoken clip (`[{t, d, w}]`, seconds of the web clip) | coordinator |
| `pNN-<slug>.tsx` | one piece: `export const slides: Slide[]` | the agent the piece was given to |
| `p03-lugar.tsx` | reference implementation | coordinator |

A piece file imports only from `./kit`, `./tipos`, `../data` (dates, lotes), `remotion` and `@remotion/transitions`
(all at 4.0.534, already installed: install nothing). No new dependencies, no new media, no edits outside its own file.

## Rules for every piece

1. `Slide.comp` takes `PecaProps` (`{ guides?: boolean }`) and returns `<Quadro formato=... guides={guides}>`
   (or `<Lamina>` for a carousel slide, which wraps `Quadro`). Scenes are `<Sequence from durationInFrames>`.
   Use `f(seconds)` for every duration; never a raw frame count derived from 60 fps.
2. **Frame 0 carries the hook**: `Gancho` without `delay`. `Slide.capa` is a frame where the hook is fully visible.
3. **Safe zone**: text and faces inside `SAFE[formato]` (x 65–950, y 269–1248 on a reel; never below `yMax`).
   The page has a "zonas seguras" toggle that draws it.
4. **Nothing fixed for the whole video**: no frame, no corner logo, no watermark. Bars, blocks and labels enter and
   leave. The logo appears only in `Fecho`, the last 3 to 3.5 s of a reel and the last slide of a carousel.
5. **Overlay rule**: bars, blocks, text and the timer never cover the body of the person in the handstand. The spec
   of each scene says where the body is (in % of the frame); keep graphics in the free area it names.
6. **Sound**: no music. `volume` only where the spec says (speech, or room sound at 0.3). Everything else muted.
7. **Stories** do not draw `BarrasStory` (the app has its own); reels may, as a design cue.
8. Carousel: slide 1 is the cover, **slide 2 works as a second cover** (it must make sense alone), the last slide
   has one call to action. `Lamina` draws the `n/total` counter and the swipe hint.
9. Colours only through the kit tokens (`ACCENT`, `STAGE`, `CHALK`, `INK`, `LIVE`) and the `tom` props.
   Type: `WIDE` (Archivo 900, 125% width, upper-case) for display, `MONO` for facts. Minimum text size 30 px.
10. Dates and prices come from `../data` (`FEST`) and the kit (`QUANDO_CURTO`); lotes: 1º R$ 490 (10 vagas),
    2º R$ 590 (35), 3º R$ 690 (15); 60 vagas. Never hard-code a date.
11. Nothing invented: only the copy written in the spec.

## How to check your piece

- `npx tsc --noEmit -p tsconfig.json` must not report errors in your file.
- `npm run build` must pass.
- A dev server is already running at http://localhost:4322 (do not start another, do not restart it):
  `http://localhost:4322/festival/instagram/?montar=1#<id>` shows the piece once the coordinator has wired it.
  You cannot see it before that: get the timings and positions right from the spec.

## As built (05/11/2026)

All ten pieces are implemented and were checked frame by frame in the Player. Hook sizes in the specs below are the
design intent: the implementers measured every line with the real Archivo font and shrank the ones that passed the
safe width (each change is commented in the piece file), so trust the code for sizes. `Fecho` stacks its lines, so a
long `sub` wraps. To check a piece: `/festival/instagram/?montar=1`, then in the console
`window.__ig['<id>'].seekTo(<frame>)`.

## Specs

Notation: `S1 0.0 +2.6` = scene 1 starts at second 0.0 and lasts 2.6 s. `clip@1.2` = `<Clip src="clip" from={1.2}>`.
Positions are canvas pixels (1080 wide). "Body" areas are % of the canvas. Copy between quotes is final: use it as is.
`QUANDO_CURTO` = "16 — 18 abr 2027"; "16 a 18 de abril" must be built from `FEST`.
Lotes (constants at the top of the piece that needs them): 490 / 590 / 690, vagas 10 / 35 / 15, total 60.
Chip "câmera N": an `Etiqueta` (tom ink, size 30) at x 65, y 290 with a small `LIVE`-coloured square before the text
(write a tiny local component), entering at the first frame of its scene.
Every hard cut between two shots of footage gets a 3-frame white flash (opacity 0.5 → 0) on the incoming shot.

### 01 · `p01-convite.tsx` · Reel "O convite" · 30.8 s · speech with burnt-in captions
The two organizers talk to camera. Faces are at y 350–600; both people fill x 15–85% down to the bottom. Text sits
BELOW the faces (y 700+) and captions at y 1140. Clips play with `volume={1}`. Captions: `<Legenda words={json}
from={<same from as the Clip>} y={1140} />`, importing `./legendas/<clip>.json` (add `as Palavra[]`).
- S1 0.0 +5.7 `conv-abre@0`. Frame 0: `Gancho` ["O 1º festival", "de handstand", "do Brasil"], size 86, y 760,
  tons [chalk, accent, chalk], outAt f(3.4). `Barras` left, leaves at f(5.2).
- S2 5.7 +6.9 `conv-onde@0`. `Etiqueta` "16 a 18 de abril" (accent, size 40) x 65 y 760, delay 4, whole scene.
  At f(3.3): `Etiqueta` "Trapézio Voador · metrô Butantã" (chalk, size 34) x 65 y 850.
- S3 12.6 +5.2 `conv-quem@0.75`. Three `Etiqueta` (chalk, size 38) stacked at x 65, y 760 / 840 / 920, entering when
  each word is said: "acroyoga" f(2.9), "yoga" f(3.8), "calistenia" f(4.25). `Barras` right.
- S4 17.8 +5.2 `conv-porque@7.7`. Captions only (a hook block here duplicated the caption and covered the faces).
- S5 23.0 +4.4 `conv-bora@0.9` (façade, one of them walks to the camera in the lower half; top half is free).
  `Gancho` ["HandstandFest", "Brasil!"], size 96, y 300, tom accent, delay f(2.1). `Barras` left.
- S6 27.4 +3.4 `Fecho` cta "Link na bio", default sub.
- `capa`: 20.

### 02 · `p02-palmeiras.tsx` · Reel "Duas câmeras nas palmeiras" · 20.2 s · muted
Short cuts only, figures already up (Paulo, 05/11: never show the entry here). Two phones filmed the same moment.
- S1 0.0 +2.6 `palm-largo@0`, zoom [1, 1.06]. Wide: two tiny people upside down under giant palms (they are at
  x 15–22% and 55%, y 56–67%). Frame 0: `Gancho` ["Tem duas pessoas", "de ponta-cabeça", "nesta imagem."], size 74,
  y 300, tom accent, outAt f(2.2).
- S2 2.6 +1.8 `palm-zoom@0` (punch-in on the same instant). `Etiqueta` "achou." (accent, size 44) x 65 y 300, delay 2.
- S3 4.4 +2.0 `palm-px1@0`. Chip "câmera 2".
- S4 6.4 +2.2 `palm-perto@0.2` (one straddle large at x 62–98%, y 48–78%; one straight at x 46%; top 45% free).
  Chip "câmera 1". `Etiqueta` QUANDO_CURTO + " · São Paulo" (accent, size 36) x 65 y 370, delay 4.
- S5 8.6 +1.8 `palm-px2@0`. Chip "câmera 2".
- S6 10.4 +2.2 `palm-px3@0`. Chip "câmera 2". `Etiqueta` "Trapézio Voador" (chalk, size 36) x 65 y 370, delay 3.
- S7 12.6 +2.0 `palm-zoom3@0`. Chip "câmera 1".
- S8 14.6 +2.4 `palm-mural@0.2`, zoom [1, 1.08] (two on a round stage, colourful mural behind, figures at y 46–66%).
  `Gancho` ["3 dias assim."], size 110, y 300, tom accent, delay 4.
- S9 17.0 +3.2 `Fecho` cta "Link na bio", default sub.
- `BarrasStory` over S1–S8 (8 bars). `capa`: 15.

### 04 · `p04-linha.tsx` · Reel "A linha" · 16.8 s · muted · skeleton
One straight handstand in front of a mural, 10.8 s hold, then tuck and down. Body: x 45–70%, y 10–85%.
ALL graphics live in the left column, x 65–430, never wider.
- S1 0.0 +13.4 `mural-reta@0`, zoom [1, 1.04], focus [58, 50].
  - Frame 0: `Gancho` ["Parece", "difícil?"], size 60, x 65, y 300, tom accent, outAt f(3.0).
  - From f(2.2): `<Esqueleto pose="mural-reta" from={...} prumo glow />` as a child of the Clip (inside a
    `<Sequence from={f(2.2)} layout="none">`, so pass `from={2.2}`), until the end of the scene.
  - `Cronometro` from 0 to f(10.8), x 65, y 1010, size 84, label "livre".
  - At f(6.0): `Gancho` ["É muito mais", "do que", "parece."], size 54, x 65, y 300, tom chalk, delay f(6.0),
    outAt f(10.4).
  - `Barras` left, v 300, h 0 (vertical only is fine), leaves at f(12.6).
- S2 13.4 +3.4 `Fecho` cta "Link na bio", sub "10 s no livre: turma inter e avançado".
- `capa`: 30.

### 05 · `p05-dupla.tsx` · Reel "Treinar junto" · 23.0 s · muted · two skeletons, then two cameras
- S1 0.0 +6.6 `dupla-reta@0.4` (both straight, side by side: left body x 25–45%, right x 52–80%, y 28–75%; top 25%
  and bottom 22% free). Frame 0: `Gancho` ["Gente para", "treinar junto."], size 84, y 290, tom accent, outAt f(3.2).
  From f(1.6): two `Esqueleto` children of the Clip, `pose="dupla-reta-esq"` (color ACCENT, dots CHALK) and
  `pose="dupla-reta-dir"` (color CHALK, dots ACCENT), both `from={0.4 + 1.6}` inside a `<Sequence from={f(1.6)}
  layout="none">`. `Barras` right, leaves at f(6.0).
- S2 6.6 +9.0 `<DuasCameras a={{src:'dupla-a'}} b={{src:'dupla-b'}} from={0}` cuts (s): 0 a · 2.4 b · 4.6 a · 7.4 b.
  Camera a: both upside down glued side by side, front view (x 20–75%, y 34–72%). Camera b: the same from behind,
  with the other phone on its tripod in the foreground (x 0–30%, y 55–100%). Chip "câmera 1" / "câmera 2" following
  the cuts. `Etiqueta` QUANDO_CURTO (accent, size 38) x 65 y 370 from f(1.0) to f(4.4); `Etiqueta`
  "Trapézio Voador · São Paulo" (chalk, size 34) x 65 y 370 from f(4.8) to f(8.6).
- S3 15.6 +4.2 `<DuasCameras ... from={15.0}` cuts: 0 a · 2.0 b (they come down and high-five at ~17.5–18.5 s of the
  clip). `Gancho` ["Vem junto."], size 120, y 290, tom accent, delay f(2.2).
- S4 19.8 +3.2 `Fecho` cta "Link na bio", default sub.
- `capa`: 24.

### 06 · `p06-jornada.tsx` · Carrossel de vídeo "A jornada em cinco passos" · 7 slides (CARD 1080×1440)
Texts are the site's own five-step cards. On a card a 9:16 clip is cropped vertically around `focus[1]`.
Every slide except 1 and 7 shows, at x 60 y 60, a mono kicker "a jornada em cinco passos" (size 26, chalk on ink),
so it stands alone. Step number = a block (`ACCENT` background, `ACCENT_INK` text, `WIDE`, size 150, square-ish).
Body text = `MONO` 700, size 32, chalk on an ink box, max width 900, line-height 1.25.
1. Capa · f(2.8) · `palm-largo@0`, focus [50, 60] (tiny figures at card y 800–980; top is palms). `Gancho`
   ["A jornada", "em cinco", "passos"], size 112, y 90, tons [chalk, accent, chalk]. No kicker.
2. "1" + `Gancho` ["Chão e parede"] (size 76) · f(5.2) · `j-chao@0`, focus [50, 70] (two people folded, hands on the
   floor, at card y 835–1250). Number at x 60 y 120, title at y 300, text at y 420:
   "Mãos no chão, punhos e ombros preparados, corpo em linha com o apoio da parede."
3. "2" + ["Entradas"] · f(3.8) · `j-entrada@0`, focus [50, 60] (bodies from card y 630 down). Text:
   "Chutes, spotting, primeiros segundos sem apoio. Aprender a cair e a sair."
4. "3" + ["10", "segundos"] (size 60) · f(11.4) · `mural-reta@0`, focus [58, 45]. The body fills the card height at
   x 45–70%: everything in the left column x 60–430. Number (size 110) y 120, title y 270, `Cronometro` 0 → f(10.8)
   x 60 y 470 size 76 label "livre", text (width 370, size 28) y 700: "Segurar sozinho, com consistência. Corrigir
   com as mãos." `Esqueleto pose="mural-reta"` with `prumo`, child of the Clip.
5. "4" + ["Formas e press"] (size 60) · f(5.4) · `j-press@0`, focus [50, 55] (bodies at card y 270–1270, x 15–90%).
   Number (size 100) and title side by side in the top strip y 60–250; text at y 1285 (two lines, size 28):
   "Mudar as pernas de posição, os shapes, e a subida de força."
6. "5" + ["Uma mão"] (size 150) · f(4) · no footage: `STAGE` background with `Barras`. Number size 300 at y 160,
   title y 560, text y 800: "A parada de uma única mão, para quem segue por muito tempo."
7. `Fecho formato="card"` cta "Link na bio", sub "básico · intermediário · avançado" · f(4).
Slide `nome`: "capa", "chão e parede", "entradas", "10 segundos", "formas e press", "uma mão", "chamada".

### 07 · `p07-turma.tsx` · Carrossel de foto "Qual é a sua turma?" · 5 slides (CARD) · f(3) each
Photo slides use `<Foto>` with its slow push. Body text = `MONO` 700, size 36, chalk on ink box, max width 920.
1. Capa: `Foto src="still-dupla.webp"` (two people straight, bodies at card y 300–1200, x 25–80%). `Gancho`
   ["Qual é", "a sua turma?"], size 84, y 70, tom accent.
2. Second cover, `STAGE` background: mono kicker "1º HandstandFest · " + QUANDO_CURTO at x 60 y 70 (size 28).
   `Gancho` ["Você segura", "10 segundos", "longe da", "parede?"], size 116, y 300, tons [chalk, accent, chalk, chalk].
3. `Foto src="tv-sala-vidro.webp" filter="brightness(.5)"`. `Etiqueta` "ainda não" (accent, size 40) x 60 y 150.
   `Gancho` ["Básico"], size 150, y 250, tom chalk. Text y 520: "Você treina na parede e ainda não segura o livre."
   Second box y 760: "Linha, chute, saída segura e os primeiros segundos sem a parede."
4. `Foto src="tv-palco-luzes.webp" filter="brightness(.5)"`. `Etiqueta` "sim" (accent) x 60 y 150. `Gancho`
   ["Intermediário", "e avançado"], size 88, y 250, tom chalk. Text y 520: "Você segura uns 10 segundos no livre, de
   forma consistente (30 é o ideal)." Second box y 800: "Equilíbrio, formas, entradas, press e one arm."
5. `Fecho formato="card"` cta "Link na bio", sub "Na dúvida, manda um vídeo curto na inscrição".
Slide `nome`: "capa", "a pergunta", "básico", "inter e avançado", "chamada".

### 08 · `p08-tres-dias.tsx` · Carrossel de foto "3 dias" · 6 slides (CARD) · f(3) each
The schedule is provisional on the site: slides 2–5 carry a mono note "grade provisória" (size 24) at x 60 y 1360.
A row = time (`MONO` 700, size 30, `ACCENT_INK` on `ACCENT`, fixed width 150) + text (`MONO`, size 30, chalk on ink,
max width 760, wraps). Rows stack from y 420 with 16 px gap. Day header: `Gancho` [day, fio], size 110, y 110,
tons [accent, chalk], where day = "Sex 16" etc. built from `FEST.dias`.
1. Capa: `Foto src="tv-fachada.webp" focus={[35, 50]}`. `Gancho` ["3 dias no", "Trapézio", "Voador"], size 104, y 80,
   tons [chalk, accent, accent]. `Etiqueta` QUANDO_CURTO + " · São Paulo" (chalk, size 36) x 60 y 1270.
2. Second cover, `STAGE`: `Gancho` ["4 blocos", "por dia"], size 150, y 110, tons [chalk, accent]. Rows:
   9h "yoga e mobilidade, todo mundo junto" · 10h "aquecimento de punhos e ombros, na sua turma" ·
   10h30 "parada de mão" · 14h "aula de tema" · 16h "parada de mão ou jam".
3. `Foto src="tv-sala-vidro.webp" filter="brightness(.45)"`. Header ["Sex 16", "Base"]. Rows: 9h "Yoga e mobilidade,
   todo mundo junto" · 10h "Aquecimento de punhos e ombros" · 10h30 "Parada de mão" · 12h "Almoço" ·
   14h "Acroyoga (básico) · Flexibilidade e força para press (inter e avançado)" · 16h "Parada de mão" ·
   17h30 "Roda de abertura".
4. `Foto src="tv-palco-luzes.webp" filter="brightness(.45)"`. Header ["Sáb 17", "Construção"]. Rows: 9h, 10h, 10h30,
   12h as on Friday · 14h "Acro handstand corpo a corpo (básico) · Flexibilidade e força para press (inter e
   avançado)" · 16h "Jam: treino livre com os professores circulando".
5. `Foto src="tv-palco-largo.webp" filter="brightness(.45)"`. Header ["Dom 18", "Integração"]. Rows: 9h "Aquecimento
   lento, todo mundo junto" · 10h "Aquecimento de punhos e ombros" · 10h30 "Parada de mão" · 12h "Almoço" ·
   14h "Handstand em objetos (básico) · Flexibilidade e força para press (inter e avançado)" ·
   15h45 "Jam de encerramento, roda final e foto".
6. `Fecho formato="card"` cta "Link na bio", default sub.
Slide `nome`: "capa", "4 blocos", "sexta", "sábado", "domingo", "chamada".

### 09 · `p09-lote.tsx` · Stories "1º lote" · 4 frames (REEL size, `formato="story"`) · no `BarrasStory`
1. f(4) · `tour-fachada@0`, filter "brightness(.8)". `Etiqueta` "1º lote · agora" with a `LIVE` square that blinks
   (opacity 1 ↔ 0.3 every 15 frames) x 65 y 300. Frame 0: `Gancho` ["Abriu."], size 200, y 400, tom accent.
   `Etiqueta` "1º HandstandFest · " + QUANDO_CURTO (chalk, size 34) x 65 y 700, delay 10.
2. f(5) · `STAGE`. `Gancho` ["R$ 490"], size 190, y 300, tom accent. `Etiqueta` "primeiras 10 vagas" (chalk, size 40)
   x 65 y 560. Seat grid at x 65, y 700: 60 squares, 10 columns × 6 rows, 78 px with 12 px gap; the first 10 are
   `ACCENT` and pop in one by one (2 frames apart, from frame 8), the next 35 `CHALK` at opacity 0.35, the last 15
   `CHALK` at 0.15. Under the grid (y 1260), mono size 32, chalk: "10 a R$ 490 · 35 a R$ 590 · 15 a R$ 690".
   At y 1330, mono size 28: "passe completo, 3 dias".
3. f(5) · `Foto src="tv-palco-luzes.webp" filter="brightness(.45)"`. `Etiqueta` "o que tem" (accent, size 40) x 65
   y 290. Five `Etiqueta` (chalk, size 36) at x 65, y 400 + 86·n, delays 6 + 8·n: "3 dias · 16 a 18 de abril" ·
   "4 blocos por dia" · "turmas: básico · inter e avançado" · "professor e assistentes em cada turma" ·
   "Trapézio Voador · metrô Butantã".
4. f(5) · `STAGE`. `Gancho` ["Garanta", "sua vaga"], size 150, y 320, tons [chalk, accent]. `Etiqueta`
   "1º lote · R$ 490 · 10 vagas" (chalk, size 38) x 65 y 740. A dashed chalk box (x 190–890, y 1000–1160, 4 px,
   dash) with the mono label "figurinha de link aqui" (size 30) centred, and above it an `ACCENT` arrow (a 26 px
   wide bar 110 px tall ending in a triangle) bobbing 14 px up and down every second.
Slide `nome`: "abriu", "preço e vagas", "o que tem", "link".

### 10 · `p10-pergunta.tsx` · Reel "Vou sair fazendo parada de mão?" · 16.6 s · muted
The answer is the site's FAQ, word for word.
- S1 0.0 +3.8 `p-desce@0.3` (two people lowering from a straddle handstand; bodies at y 50–80%, top 45% free).
  Frame 0: `Gancho` ["Vou sair", "do festival", "fazendo", "parada de mão?"], size 82, y 290, tom chalk, outAt f(3.3).
- S2 3.8 +2.4 `STAGE` background, opened by `<Cortina tom="accent" len={8} />`. `Gancho` ["Depois de", "três dias,",
  "não."], size 128, y 420, tons [chalk, chalk, accent], delay 6. `Etiqueta` "ninguém aprende o livre num fim de
  semana" (ink, size 30) x 65 y 990, delay 20.
- S3 6.2 +7.0 `p-espelho@0.5`, filter "brightness(.7)" (two silhouettes in mirror at y 920–1550; the top 45% is free).
  `Etiqueta` "o que você leva" (accent, size 40) x 65 y 290, delay 2. Four `Etiqueta` (chalk, size 34) at x 65,
  y 385 / 455 / 525 / 595, delays f(0.8) / f(2.0) / f(3.2) / f(4.4): "ferramentas para treinar" ·
  "direção para os próximos meses" · "equilíbrio na parede e com assistência" · "gente para treinar junto".
- S4 13.2 +3.4 `Fecho` cta "Link na bio", default sub.
- `capa`: 20.
