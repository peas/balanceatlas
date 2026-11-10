#!/usr/bin/env python3
"""Cut the web media of the Instagram pieces (/festival/instagram) from the local footage.

Reads src/festival/ig/midia.json and writes to public/festival/ig/ (committed: this machine has no R2 token):

  clips   <nome>.mp4       portrait H.264, SDR (HLG tone-mapped), keyframe every 15 frames, faststart.
                           540x960 by default ("w": 720 for the ones shown large). Audio only with "som": true.
          pose/<nome>.json when "pose" is set: MediaPipe on the web clip itself, so seconds are the clip's seconds.
                           {"fps": 15, "frames": [[x, y, vis] * 12 joints | null]} (joint order = JOINTS in kit.tsx).
                           "pose": true = one person. "pose": {"esq": [0, 0.55], "dir": [0.45, 1]} = one file per
                           horizontal band (<nome>-esq.json, <nome>-dir.json) for two people side by side.
          src/festival/ig/legendas/<nome>.json when "legenda": true: the Whisper words inside the cut, re-timed to
                           the clip ([{"t", "d", "w"}]). Written ONLY if the file does not exist: after that it is
                           reviewed by hand and the script never touches it again.
  fotos   <nome> (webp)    from local/festival/fotos or any path, resized to "w" (default 1080), cwebp -q 82.
                           Or a frame of a clip: "quadro": {"de": "<clip id>", "t": 33.0} (+ optional "crop").

midia.json
  {"clips": [{"nome": "tour-vidro", "de": "img-3138", "ini": 0, "fim": 8, "w": 720, "som": false, "pose": false}],
   "fotos": [{"nome": "tv-palco.webp", "de": "fotos/trapezio-voador/PXL_20261104_173348522.jpg"}]}
  "de" = clip id of local/festival/manifest.json; "ini"/"fim" = seconds of the original.
  Optional per clip: "crop": "iw:ih*0.8:0:ih*0.1" (ffmpeg crop on the upright frame, before scaling), "crf" (30).

Examples
  scripts/festival_ig_midia.py                 # whatever is missing
  scripts/festival_ig_midia.py --so tour-vidro --refazer
"""
import argparse, json, subprocess, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCAL = ROOT / 'local' / 'festival'
OUT = ROOT / 'public' / 'festival' / 'ig'
IG = ROOT / 'src' / 'festival' / 'ig'
FFULL = '/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg'
# HLG -> SDR. Peak 100 nits + hable since 10/11/2026: the first chain (npl=203, mobius) blew the sky and the glass
# walls. Compared on five frames; hable at 100 keeps windows and sky without darkening skin.
SDR = 'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,'
RENDER = Path.home() / 'paulo.com.br-render'
PY = Path.home() / 'ciencia' / 'tamanhodouniverso' / '.venv-rosto' / 'bin' / 'python'
JOINTS = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]  # MediaPipe indices, in the order of JOINTS in kit.tsx


def run(cmd):
    r = subprocess.run([str(c) for c in cmd], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(f"falhou: {' '.join(str(c) for c in cmd)}\n{r.stderr[-800:]}")
    return r.stdout


def cut(c, src, out):
    w = c.get('w', 540)
    hdr = src.get('transfer') in ('arib-std-b67', 'smpte2084')
    crop = f"crop={c['crop']}," if c.get('crop') else ''
    vf = f"{crop}scale={w}:{w * 16 // 9}:force_original_aspect_ratio=increase,crop={w}:{w * 16 // 9},{SDR if hdr else ''}format=yuv420p"
    audio = ['-c:a', 'aac', '-b:a', '96k', '-ac', '1'] if c.get('som') and src.get('audio') else ['-an']
    cor = ['-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709'] if hdr else []
    run([FFULL, '-nostdin', '-v', 'error', '-y', '-ss', c['ini'], '-t', c['fim'] - c['ini'], '-i', LOCAL / src['local'],
         '-vf', vf, '-r', '30', '-c:v', 'libx264', '-preset', 'slow', '-crf', c.get('crf', 30), '-g', '15',
         '-pix_fmt', 'yuv420p', *cor, *audio, '-movflags', '+faststart', out])


def pose(c, clip):
    bands = c['pose'] if isinstance(c['pose'], dict) else {'': None}
    (OUT / 'pose').mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        inv = Path(tmp) / 'fontes.json'
        inv.write_text(json.dumps([{'id': c['nome'], 'arquivo': clip.name, 'fps': 30, 'rotacao': 0}]))
        for name, band in bands.items():
            extra = ['--recorte', f'{band[0]},{band[1]}', '--sufixo', name] if band else []
            run([PY, '-I', RENDER / 'scripts' / 'pose.py', c['nome'], '--passo', '2', '--suave', '--fontes', inv,
                 '--raiz', clip.parent, '--saida', tmp, *extra])
            raw = json.loads((Path(tmp) / f"{c['nome']}{'.' + name if name else ''}.json").read_text())
            frames = [[round(v, 3) for j in JOINTS for v in (q['pose'][j][0], q['pose'][j][1], q['pose'][j][3])] if 'pose' in q else None
                      for q in raw['quadros']]
            dest = OUT / 'pose' / f"{c['nome']}{'-' + name if name else ''}.json"
            dest.write_text(json.dumps({'fps': 15, 'frames': frames}, separators=(',', ':')))
            print(f"    pose {dest.name}: {sum(f is not None for f in frames)} de {len(frames)} quadros")


def legenda(c):
    dest = IG / 'legendas' / f"{c['nome']}.json"
    if dest.exists():
        return
    src = LOCAL / 'transcricoes' / f"{c['de']}.json"
    if not src.exists():
        print(f"    sem transcrição para {c['de']}"); return
    words = [{'t': round(w['start'] - c['ini'], 2), 'd': round(w['end'] - w['start'], 2), 'w': w['word'].strip()}
             for s in json.loads(src.read_text())['segments'] for w in s.get('words', [])
             if c['ini'] <= w['start'] and w['end'] <= c['fim']]
    dest.parent.mkdir(exist_ok=True)
    dest.write_text(json.dumps(words, ensure_ascii=False, indent=0) + '\n')
    print(f"    legenda {dest.name}: {len(words)} palavras (REVISAR à mão)")


def foto(p, refazer):
    dest = OUT / p['nome']
    if dest.exists() and not refazer:
        return
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / 'f.png'
        if 'quadro' in p:  # a frame of a clip: {"de": clip id, "t": seconds}, tone-mapped like the clips
            man = {e['id']: e for e in json.loads((LOCAL / 'manifest.json').read_text())['files']}
            e = man[p['quadro']['de']]
            src = Path(tmp) / 'q.png'
            hdr = e.get('transfer') in ('arib-std-b67', 'smpte2084')
            run([FFULL, '-nostdin', '-v', 'error', '-y', '-ss', p['quadro']['t'], '-i', LOCAL / e['local'], '-frames:v', '1',
                 '-vf', (f"crop={p['crop']}," if p.get('crop') else '') + (SDR if hdr else '') + 'format=rgb24', src])
        else:
            src = Path(p['de']) if Path(p['de']).is_absolute() else LOCAL / p['de']
        run(['magick', src, '-auto-orient', '-resize', f"{p.get('w', 1080)}x{p.get('w', 1080) * 2}>", '-strip', png])
        run(['cwebp', '-quiet', '-q', '82', '-m', '6', png, '-o', dest])
    print(f"  foto {dest.name} {dest.stat().st_size / 1e3:.0f} kB")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--so', help='only this clip or photo name')
    ap.add_argument('--refazer', action='store_true', help='rebuild even if the output exists (captions are never overwritten)')
    args = ap.parse_args()
    cfg = json.loads((IG / 'midia.json').read_text())
    man = {e['id']: e for e in json.loads((LOCAL / 'manifest.json').read_text())['files']}
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for c in cfg.get('clips', []):
        if args.so and c['nome'] != args.so:
            continue
        out = OUT / f"{c['nome']}.mp4"
        if not out.exists() or args.refazer:
            cut(c, man[c['de']], out)
            print(f"  clip {out.name} {c['fim'] - c['ini']:.1f}s {out.stat().st_size / 1e6:.2f} MB", flush=True)
            if c.get('pose'):
                pose(c, out)
        elif c.get('pose') and not list((OUT / 'pose').glob(f"{c['nome']}*.json")):
            pose(c, out)
        if c.get('legenda'):
            legenda(c)
        total += out.stat().st_size
    for p in cfg.get('fotos', []):
        if not args.so or p['nome'] == args.so:
            foto(p, args.refazer)
    print(f"clips no total: {total / 1e6:.1f} MB")


if __name__ == '__main__':
    main()
