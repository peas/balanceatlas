# Louisse confirmed teacher: proposed carousel

Decision on 24 November 2026. Target: 25 November, not automatically scheduled or published. This mixed photo/video carousel is explicitly requested by Paulo and is an exception to the earlier static-only preference. Prioritize Louisse, then Gabriel/community/event material. Move Paulo-led demonstrations to the later editorial block; keep the already-published opening posts intact.

## Proposed sequence

1. **Action-led cover.** Louisse large, whole body, hands/feet retained. “LOUISSE ESTÁ CONFIRMADA!” with a single ochre highlight, plus “Professora no HandstandFest”. Use her studio action photo; Paulo confirmed she took the photographs herself. A sharp frame from video-01 around 9 s remains an optional alternative. No generated pose.
2. **Movement, 9 seconds.** New video-01 approximately 3–12 s, showing actual transitions without speeding up. Minimal text: “Ela ensina parada de mão desde 2015.” Source: supplied biography. Let the movement occupy almost the entire slide.
3. **Portrait/action photo with short context.** “Do circo à parada de mão.” Support: “Louisse começou no circo em 2011 e se especializou na Escola Nacional de Circo.” One still, no long biography. Photo credit: Louisse Aldrigues (@lou.handstand), confirmed by Paulo on 24 November.
4. **One arm, 11–13 seconds.** New video-02 approximately 6–17 s, including return to two hands. At about source 10–12 s choose one readable exact-frame freeze, about 1 s, with a restrained ochre brush and P&B treatment, then resume motion. Review the exact contact position before finalizing. Do not call simple grayscale an anatomical engraving. If generating engraving later, use the approved separate-person/paint process, inspect hands and register against the exact frame. No repeated zoom accents.
5. **Useful closing.** “Vamos praticar com a Lou?” Date: 16 a 18 de abril de 2027. Place: Trapézio Voador, São Paulo. “Informações e inscrições no link da bio.” Connected HF seal here; no seal on every interior slide.

All media share a 1080×1440 canvas; inspect actual crop before upload. Keep full-body footage large using gentle framing; a 576×1024 source cannot tolerate aggressive zoom. Duration/timecodes are edit candidates from visual triage, not finished edits. Original audio stays off until reviewed.

## Caption draft

Louisse Aldrigues está confirmada como professora no 1º HandstandFest!

Nascida em Brasília, começou no circo em 2011 e se especializou em parada de mão na Escola Nacional de Circo. É professora de parada de mão desde 2015.

Vamos praticar com ela de 16 a 18 de abril de 2027, no Trapézio Voador, em São Paulo.

Conheça o trabalho dela em @lou.handstand. Informações e inscrições no link da bio.

Fotos: Louisse Aldrigues (@lou.handstand).

#handstand #handstandfest

## Sound and pending checks

Paulo permits music for this piece. Prefer one instrumental groove for the whole carousel, selected natively if that uploader supports mixed-media music. Otherwise embed a licensed track only in the video slides and retain silent masters; do not promise a continuous soundtrack across static slides. Existing licensed shortlist: `music/2026-11-23-trilhas-licenciadas.md`. No track has been applied yet.

Studio photo authorship is confirmed by Paulo: Louisse herself. Credit @lou.handstand in the caption. Review transitions at full speed, selected freeze, body cropping and chronology before exporting. No rendering, publishing or paid music purchase is implied by this brief.


## Prepared package, 24 November

Implemented in `src/festival/ig2/louisse-pieces.tsx`, registered in the calendar and render catalogue. Three static slides and two video slides (9 s / 12.4 s), all 1080×1440. Static cover uses studio photo 01 (red); biography and closing use photo 04 (ochre). Video 01 source 3–12 s; video 02 source 6–17 s with exact source-10-second freeze held 1.4 s, then resumed. Single P&B photographic hold with brush, no generated anatomy or camera zoom. Text kept below hands after visual revision.

Package: `local/festival/publicacao/2026-11-25-louisse/index.html`. Upload only the five numbered `01`–`05` JPG/MP4 files in order. Unnumbered PNGs and silent MP4s are masters, not extra slides. `legenda.txt` includes photo and music credits. The two final videos contain Coffee or Tea by Michael Ramir C. (Mixkit 1168), source from 12 s, normalized with short fades. Static slides have no soundtrack; silent video masters are retained if selecting continuous carousel music inside Instagram instead. Do not add a second soundtrack over the embedded version.

Rebuild with `python3 scripts/festival_louisse_package.py --help`. Final export uses the same compositions as the preview. This is a local review/export delivery, NOT Instagram publication, scheduling or website deployment.

## Revision 2 — first-time reader, 24 November

Supersedes the five-slide opening above. Six slides: action-led photo cover (“Olha o que a Louisse faz
na parada de mão!” with full teacher name), transitions video, circus biography photo, one-arm video
with exact-frame P&B/ochre hold, explicit festival confirmation with what/when/where, then a signed
sharing invitation with paper-plane icon. Photos and music attribution remain in caption.

The user reported video 4 absent from the local HTML preview. The export itself is H.264 High/yuv420p
with AAC. Add generated posters, explicit 3:4 dimensions, typed video source, load-error feedback and
an Open file link; verify actual browser playback rather than assuming codec metadata proves it works.
Reusable editorial policy is now in VOZ.md and the shared Instagram Creation playbook.

Validation: revised stills 1/5/6 inspected at 1080×1440. Chrome successfully played both final MP4s
through their ends from the generated file:// preview (9 s and 12.4 s, 1080×1440, no media errors).
Build and git diff whitespace check passed. Original failure not reproduced; the revised preview adds
visible posters and direct-open fallback rather than claiming a proven codec fix. No Instagram publication.
