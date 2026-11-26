"""MediaPipe Pose Landmarker over an original video, in SOURCE seconds, rotated by the ffprobe metadata.

Usage: python scripts/pose.py FONTE_ID [--modelo full|heavy] [--de S] [--ate S] [--passo N] [--suave] [--folha]
                              [--fontes JSON] [--raiz DIR] [--saida DIR] [--pessoas N] [--recorte X0,X1 --sufixo S]
  FONTE_ID   id from local/fontes.json (file name without extension, "~" -> "_")
  --fontes/--raiz/--saida  inventory, originals folder and output folder (defaults local/fontes.json, local/originais,
             local/pose; the one-arm archive uses local/onearm/acervo.json, local/onearm/originais, local/onearm/pose)
  --modelo   local/modelos/pose_landmarker_<modelo>.task (default full)
  --de/--ate analyse only this source interval (seconds)
  --passo    analyse every Nth frame (default 1)
  --suave    One Euro filter on x/y (constants from tamanhodouniverso/scripts/apresentador/empacotar.py)
  --folha    also write local/pose/<id>.jpg with the skeleton on 8 frames
  --recorte  analyse only the vertical band X0..X1 (0..1 of the rotated width) and map the landmarks back to the whole
             frame; with --sufixo S the output is <id>.<S>.json. Two people side by side: one run per half (overlapping
             bands) is far more reliable than --pessoas 2 on low-resolution video (11/10/2026)
  --pessoas  detect up to N people and write one file per person, <id>.p0.json, <id>.p1.json... (same format); people
             are tracked by the continuity of the hip centre (p0 = leftmost when first seen), so crossings keep ids
Output: local/pose/<id>.json = {"fonte", "fps", "w", "h", "quadros": [{"t": s, "pose": [[x, y, z, vis] x 33]}]}
x/y normalised to the ROTATED (portrait) frame. Run with ~/ciencia/tamanhodouniverso/.venv-rosto/bin/python -I.
"""
import argparse, json, math, sys, time
from pathlib import Path
import cv2, numpy as np
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions

RAIZ = Path(__file__).resolve().parents[2]
CONEXOES = [(11, 12), (11, 13), (13, 15), (12, 14), (14, 16), (11, 23), (12, 24), (23, 24), (23, 25), (25, 27), (24, 26), (26, 28), (27, 31), (28, 32)]
ROT = {90: cv2.ROTATE_90_COUNTERCLOCKWISE, -90: cv2.ROTATE_90_CLOCKWISE, 180: cv2.ROTATE_180, 270: cv2.ROTATE_90_CLOCKWISE}


class UmEuro:
    """One Euro filter (Casiez 2012), per coordinate, in pixels."""
    def __init__(self, fps, mincut=1.2, beta=0.015, dcut=1.0):
        self.fps, self.mincut, self.beta, self.dcut = fps, mincut, beta, dcut
        self.x = self.dx = None

    @staticmethod
    def alfa(fps, cut):
        tau = 1 / (2 * math.pi * cut)
        return 1 / (1 + tau * fps)

    def __call__(self, v):
        if self.x is None:
            self.x, self.dx = v, 0.0
            return v
        dx = (v - self.x) * self.fps
        self.dx += self.alfa(self.fps, self.dcut) * (dx - self.dx)
        cut = self.mincut + self.beta * abs(self.dx)
        self.x += self.alfa(self.fps, cut) * (v - self.x)
        return self.x


ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('--model-dir', type=Path, default=RAIZ / 'local/modelos');
ap.add_argument('fonte'); ap.add_argument('--modelo', default='full'); ap.add_argument('--de', type=float); ap.add_argument('--ate', type=float)
ap.add_argument('--passo', type=int, default=1); ap.add_argument('--suave', action='store_true'); ap.add_argument('--folha', action='store_true')
ap.add_argument('--pessoas', type=int, default=1); ap.add_argument('--recorte'); ap.add_argument('--sufixo'); ap.add_argument('--fontes', default='local/fontes.json'); ap.add_argument('--raiz', default='local/originais'); ap.add_argument('--saida', default='local/pose')
a = ap.parse_args()

fontes = {f['id']: f for f in json.load(open(RAIZ / a.fontes))}
if a.fonte not in fontes:
    sys.exit(f'fonte desconhecida: {a.fonte} (ver {a.fontes})')
F = fontes[a.fonte]
cap = cv2.VideoCapture(str(RAIZ / a.raiz / F['arquivo']))
if not cap.isOpened(): sys.exit('Cannot open source video; finish preprocessing before pose extraction')
cap.set(cv2.CAP_PROP_ORIENTATION_AUTO, 0)  # Rotation is applied explicitly below.
fps = cap.get(cv2.CAP_PROP_FPS) or F['fps']
rot = ROT.get(F['rotacao'])
pose = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=str(a.model_dir / f'pose_landmarker_{a.modelo}.task')),
    running_mode=vision.RunningMode.VIDEO, num_poses=a.pessoas, min_pose_detection_confidence=0.5, min_tracking_confidence=0.5))
if a.de: cap.set(cv2.CAP_PROP_POS_MSEC, a.de * 1000)
quadros, guardados, w, h, t0 = [], [], None, None, time.time()
# contact sheet: keep only the 8 frames nearest to evenly spaced times (keeping every frame took ~6 MB each at 1080p
# and exhausted memory with 4 processes in parallel, 11/10/2026)
ini = a.de or 0.0
fim = a.ate or (cap.get(cv2.CAP_PROP_FRAME_COUNT) / fps)
alvos = [ini + k * (fim - ini) / 7 for k in range(8)]
filtros = None
trilhas, porPessoa = {}, {k: [] for k in range(a.pessoas)}  # multi-person tracking (--pessoas)
while True:
    ok, bgr = cap.read()
    if not ok: break
    i = int(round(cap.get(cv2.CAP_PROP_POS_FRAMES))) - 1
    t = i / fps
    if a.ate and t > a.ate: break
    if i % a.passo: continue
    if rot is not None: bgr = cv2.rotate(bgr, rot)
    if a.recorte:
        x0, x1 = (float(v) for v in a.recorte.split(','))
        if w is None: wcheio = bgr.shape[1]
        bgr = np.ascontiguousarray(bgr[:, int(x0 * bgr.shape[1]):int(x1 * bgr.shape[1])])
    if w is None:
        h, w = bgr.shape[:2]
        print(f'{a.fonte}: {w}x{h} após rotação {F["rotacao"]}, {fps:.2f} fps', file=sys.stderr)
    img = mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))
    r = pose.detect_for_video(img, int(t * 1000))
    q = {'t': round(t, 4)}
    if a.pessoas > 1:
        # assign each detected pose to the track whose last hip centre is nearest (greedy), new tracks left to right
        dets = sorted(([[p.x, p.y, p.z, p.visibility] for p in lm] for lm in r.pose_landmarks), key=lambda d: (d[23][0] + d[24][0]) / 2)
        livres = list(range(a.pessoas)); pq = {}
        for d in dets:
            hx, hy = (d[23][0] + d[24][0]) / 2, (d[23][1] + d[24][1]) / 2
            cand = [k for k in livres if k in trilhas] or livres
            k = min(cand, key=lambda k: math.hypot(hx - trilhas[k][0], hy - trilhas[k][1]) if k in trilhas else 9 + k)
            livres.remove(k); trilhas[k] = (hx, hy)
            pq[k] = [[round(v[0], 4), round(v[1], 4), round(v[2], 4), round(v[3], 3)] for v in d]
        for k in range(a.pessoas):
            porPessoa[k].append({'t': round(t, 4), **({'pose': pq[k]} if k in pq else {})})
        quadros.append(q)
        continue
    if r.pose_landmarks:
        pts = [[p.x, p.y, p.z, p.visibility] for p in r.pose_landmarks[0]]
        if a.recorte: pts = [[x0 + p[0] * (x1 - x0), p[1], p[2], p[3]] for p in pts]  # back to the whole frame
        if a.suave:
            if filtros is None: filtros = [(UmEuro(fps / a.passo), UmEuro(fps / a.passo)) for _ in pts]
            for k, p in enumerate(pts):
                p[0] = filtros[k][0](p[0] * w) / w
                p[1] = filtros[k][1](p[1] * h) / h
        q['pose'] = [[round(p[0], 4), round(p[1], 4), round(p[2], 4), round(p[3], 3)] for p in pts]
        if a.folha and alvos and t >= alvos[0]:
            guardados.append((t, bgr.copy(), q['pose']))
            while alvos and t >= alvos[0]: alvos.pop(0)
    quadros.append(q)
if a.pessoas > 1:
    for k, qs in porPessoa.items():
        out = RAIZ / a.saida / f'{a.fonte}.p{k}.json'
        json.dump({'fonte': a.fonte, 'fps': fps, 'w': w, 'h': h, 'passo': a.passo, 'suave': False, 'modelo': a.modelo, 'pessoa': k, 'quadros': qs}, open(out, 'w'))
        print(f'pessoa {k}: pose em {sum(1 for q in qs if "pose" in q)} de {len(qs)} quadros ->', out)
    sys.exit(0)
if not quadros: sys.exit('No frames decoded; no pose output written')
det = sum(1 for q in quadros if 'pose' in q)
dt = time.time() - t0
print(f'{len(quadros)} quadros em {dt:.0f}s; pose em {det} ({100 * det / max(1, len(quadros)):.0f}%)')
if a.recorte: w = wcheio  # landmarks are normalised to the whole frame again
out = RAIZ / a.saida / f'{a.fonte}{"." + a.sufixo if a.sufixo else ""}.json'
json.dump({'fonte': a.fonte, 'fps': fps, 'w': w, 'h': h, 'passo': a.passo, 'suave': a.suave, 'modelo': a.modelo, 'quadros': quadros}, open(out, 'w'))
print('->', out)
if a.folha and guardados:
    sel = (guardados + guardados[-1:] * 8)[:8]
    tiles = []
    for t, bgr, pts in sel:
        for (u, v) in CONEXOES:
            pu, pv = pts[u], pts[v]
            if pu[3] > 0.5 and pv[3] > 0.5:
                cv2.line(bgr, (int(pu[0] * w), int(pu[1] * h)), (int(pv[0] * w), int(pv[1] * h)), (0, 255, 160), 6)
        cv2.putText(bgr, f'{t:.1f}s', (30, 120), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 255), 8)
        tiles.append(cv2.resize(bgr, (360, 640)))
    folha = np.vstack([np.hstack(tiles[:4]), np.hstack(tiles[4:])])
    cv2.imwrite(str(out.with_suffix('.jpg')), folha)
    print('folha:', out.with_suffix('.jpg'))
