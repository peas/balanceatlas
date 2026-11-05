#!/usr/bin/env python3
"""Measure the festival footage so the catalogue (acervo/catalogo.yaml) has real timings.

Works on the proxies and wavs made by festival_derivados.py. Everything it writes stays in local/festival/.

  pose   MediaPipe pose for every proxy -> pose/<id>.json. Reuses ~/paulo.com.br-render/scripts/pose.py (same JSON:
         {"fps","w","h","quadros":[{"t","pose":[[x,y,z,vis] x 33]}]}, x/y 0..1 of the upright frame, source seconds).
  holds  from the pose: when the body is upside down (ankles above hips above shoulders, hands on the floor)
         -> analise.json {"<id>": {"invertido": [[de, ate], ...], "pose_pct": n}}
  sync   clips of the two phones that overlap in wall-clock time; the exact offset comes from cross-correlating the
         audio -> sync.json [{"a","b","offset","score"}], where t_b = t_a + offset (seconds of each source)
  fala   mlx_whisper (large-v3-turbo, Paulo's mandatory flags) -> transcricoes/<id>.json + .txt
  tudo   pose, holds, sync, fala

Examples
  scripts/festival_analise.py tudo
  scripts/festival_analise.py pose --so img-3174
"""
import argparse, json, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from pathlib import Path

LOCAL = Path(__file__).resolve().parent.parent / 'local' / 'festival'
RENDER = Path.home() / 'paulo.com.br-render'
PY = Path.home() / 'paulo.com.br' / 'tamanhodouniverso' / '.venv-rosto' / 'bin' / 'python'
NOMES = 'HandstandFest, handstand, parada de mão, Trapézio Voador, Gabriel, Agustin, Paulo, acroyoga, São Paulo.'


def manifest(so=None):
    files = json.loads((LOCAL / 'manifest.json').read_text())['files']
    return [e for e in files if not so or e['id'] == so]


def pose(args):
    (LOCAL / 'pose').mkdir(exist_ok=True)
    files = manifest(args.so)
    inv = LOCAL / 'fontes-proxies.json'  # the inventory shape pose.py expects
    inv.write_text(json.dumps([{'id': e['id'], 'arquivo': f"{e['id']}.mp4", 'fps': 30, 'rotacao': 0} for e in manifest()]))
    todo = [e for e in files if not (LOCAL / 'pose' / f"{e['id']}.json").exists()]

    def one(e):
        r = subprocess.run([PY, '-I', RENDER / 'scripts' / 'pose.py', e['id'], '--passo', '2', '--suave', '--fontes', inv,
                            '--raiz', LOCAL / 'proxies', '--saida', LOCAL / 'pose'], capture_output=True, text=True)
        return e['id'], r.returncode, (r.stdout.strip().splitlines() or [r.stderr[-300:]])[0]

    with ThreadPoolExecutor(args.paralelo) as ex:
        for i, (id_, rc, msg) in enumerate(ex.map(one, todo), 1):
            print(f"{i} de {len(todo)}: {id_} {'ok' if rc == 0 else 'FALHOU'} {msg}", flush=True)


def holds(args):
    out = {}
    for e in manifest(args.so):
        p = LOCAL / 'pose' / f"{e['id']}.json"
        if not p.exists():
            continue
        q = json.loads(p.read_text())['quadros']
        segs, start, last = [], None, None
        for f in q:
            pts = f.get('pose')
            inv = False
            if pts:
                y = lambda a, b: (pts[a][1] + pts[b][1]) / 2
                vis = min(pts[i][3] for i in (11, 12, 23, 24))
                # ankles above hips above shoulders (y grows downwards), with a margin so a forward fold does not count
                inv = vis > 0.4 and y(27, 28) < y(23, 24) - 0.04 and y(23, 24) < y(11, 12) - 0.04
            if inv:
                start = f['t'] if start is None else start
                last = f['t']
            elif start is not None and f['t'] - last > 0.5:  # tolerate half a second of lost tracking
                segs.append([start, last]); start = None
        if start is not None:
            segs.append([start, last])
        out[e['id']] = {'invertido': [[round(a, 1), round(b, 1)] for a, b in segs if b - a >= 1.0],
                        'pose_pct': round(100 * sum('pose' in f for f in q) / max(1, len(q)))}
    (LOCAL / 'analise.json').write_text(json.dumps(out, indent=1) + '\n')
    for k, v in out.items():
        print(f"{k:44s} pose {v['pose_pct']:3d}%  invertido: {v['invertido']}")


def start_of(e):
    """Wall-clock start (UTC). iPhone: creationdate is the start. Pixel: the file name is the start (UTC)."""
    m = re.match(r'PXL_(\d{8})_(\d{6})(\d{3})', e['name'])
    if m:
        return datetime.strptime(m[1] + m[2], '%Y%m%d%H%M%S').replace(tzinfo=timezone.utc) + timedelta(milliseconds=int(m[3]))
    c = e.get('captured')
    return datetime.fromisoformat(c.replace('Z', '+00:00')).astimezone(timezone.utc) if c else None


def sync(args):
    import numpy as np, wave

    def load(id_):
        with wave.open(str(LOCAL / 'audio' / f'{id_}.wav')) as w:
            x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32)
        x -= x.mean()
        return x / (np.abs(x).max() or 1)

    files = [e for e in manifest() if e.get('audio') and start_of(e)]
    cam = lambda e: 'pixel' if e['name'].startswith('PXL_') else 'iphone'
    out = []
    for a in files:
        for b in files:
            if cam(a) != 'iphone' or cam(b) != 'pixel':
                continue
            sa, sb = start_of(a), start_of(b)
            guess = (sa - sb).total_seconds()  # t_b = t_a + guess
            overlap = min(sa + timedelta(seconds=a['duration']), sb + timedelta(seconds=b['duration'])) - max(sa, sb)
            if overlap.total_seconds() < -args.janela:  # phone clocks can be several seconds apart
                continue
            x, y = load(a['id']), load(b['id'])
            n = 1 << (len(x) + len(y)).bit_length()
            c = np.fft.irfft(np.fft.rfft(y, n) * np.conj(np.fft.rfft(x, n)), n)  # peak at lag = t_b - t_a
            lags = np.concatenate([np.arange(0, n // 2), np.arange(-n // 2, 0)]) / 16000
            c[np.abs(lags - guess) > args.janela] = 0  # only near the wall-clock guess
            k = int(np.argmax(c))
            score = float(c[k] / (np.std(c[c != 0]) or 1)) if np.count_nonzero(c) > 1 else 0.0
            off = float(lags[k])
            both = min(a['duration'], b['duration'] - off) - max(0.0, -off)
            out.append({'a': a['id'], 'b': b['id'], 'offset': round(off, 3), 'relogio': round(guess, 1),
                        'juntos': round(both, 1), 'score': round(score, 1)})
    out.sort(key=lambda r: -r['score'])
    (LOCAL / 'sync.json').write_text(json.dumps(out, indent=1) + '\n')
    for r in out:
        print(f"{r['a']:18s} + {r['b']:26s} offset {r['offset']:8.3f}s (relógio {r['relogio']:6.1f}) juntos {r['juntos']:6.1f}s score {r['score']:6.1f}")


def fala(args):
    d = LOCAL / 'transcricoes'
    d.mkdir(exist_ok=True)
    todo = [e for e in manifest(args.so) if e.get('audio') and not (d / f"{e['id']}.json").exists()]
    for i, e in enumerate(todo, 1):
        r = subprocess.run(['mlx_whisper', str(LOCAL / 'audio' / f"{e['id']}.wav"), '--model', 'mlx-community/whisper-large-v3-turbo',
                            '--language', 'pt', '--condition-on-previous-text', 'False', '--word-timestamps', 'True',
                            '--hallucination-silence-threshold', '2', '--initial-prompt', NOMES,
                            '--output-format', 'json', '--output-dir', str(d)], capture_output=True, text=True)
        j = d / f"{e['id']}.json"
        if j.exists():
            segs = json.loads(j.read_text()).get('segments', [])
            (d / f"{e['id']}.txt").write_text(''.join(f"[{s['start']:.1f}-{s['end']:.1f}] {s['text'].strip()}\n" for s in segs))
        print(f"{i} de {len(todo)}: {e['id']} {'ok' if j.exists() else 'FALHOU ' + r.stderr[-200:]}", flush=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('cmd', choices=['pose', 'holds', 'sync', 'fala', 'tudo'])
    ap.add_argument('--so', help='only this clip id')
    ap.add_argument('--paralelo', type=int, default=3, help='pose processes at once (default 3)')
    ap.add_argument('--janela', type=float, default=240, help='sync: seconds around the wall-clock guess to search (default 240). An iPhone clip trimmed in Photos keeps the creation date of the ORIGINAL recording, so the guess can be a minute off (04/11/2026: 5 of 7 pairs); a real pair scores 25+, verify on frames')
    args = ap.parse_args()
    for step in (['pose', 'holds', 'sync', 'fala'] if args.cmd == 'tudo' else [args.cmd]):
        print(f'== {step}', flush=True)
        globals()[step](args)


if __name__ == '__main__':
    sys.exit(main())
