#!/usr/bin/env python3
"""Derive working files from the festival footage in local/festival/originais (see festival_acervo.py).

For every clip in local/festival/manifest.json that does not have them yet:
  proxies/<id>.mp4   540x960, 30 fps, H.264 (keyframe every 15 frames), HLG tone-mapped to SDR, AAC audio.
                     Same timeline as the original, so catalogue timestamps are valid for both.
  audio/<id>.wav     16 kHz mono (Whisper and audio sync between two phones)
  folhas/<id>-N.jpg  contact sheets, one frame every --passo seconds with the second burnt in

Nothing here goes to git or to the site. Web clips are cut separately, from the originals.

Examples
  scripts/festival_derivados.py                 # everything that is missing
  scripts/festival_derivados.py --so img-3174   # one clip
  scripts/festival_derivados.py --passo 1 --refazer-folhas
"""
import argparse, json, math, subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

LOCAL = Path(__file__).resolve().parent.parent / 'local' / 'festival'
FFULL = Path('/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg')
SDR = 'zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=mobius:desat=2,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,'
FONT = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(f"falhou: {' '.join(map(str, cmd))}\n{r.stderr[-800:]}")


def proxy(e, out):
    hdr = e.get('transfer') in ('arib-std-b67', 'smpte2084')
    ff = str(FFULL) if hdr and FFULL.exists() else 'ffmpeg'
    # scale first: tone-mapping in float at full HD is ~4x slower and the proxy does not need it
    vf = 'scale=540:-2,' + (SDR if hdr and FFULL.exists() else '') + 'format=yuv420p'
    cor = ['-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709'] if hdr else []
    audio = ['-c:a', 'aac', '-b:a', '96k'] if e.get('audio') else ['-an']
    run([ff, '-nostdin', '-v', 'error', '-y', '-i', LOCAL / e['local'], '-vf', vf, '-r', '30', '-c:v', 'libx264',
         '-preset', 'veryfast', '-crf', '23', '-g', '15', '-pix_fmt', 'yuv420p', *cor, *audio, '-movflags', '+faststart', out])


def wav(e, out):
    if e.get('audio'):
        run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', LOCAL / e['local'], '-vn', '-ac', '1', '-ar', '16000', out])


def folhas(e, px, passo, cols=6, rows=4):
    per = cols * rows
    n = max(1, math.floor(e['duration'] / passo + 0.3))  # a last sheet with under a third of a step has no frame
    for k in range(math.ceil(n / per)):
        out = LOCAL / 'folhas' / f"{e['id']}-{k + 1}.jpg"
        t0 = k * per * passo
        r = min(rows, math.ceil((min(n, (k + 1) * per) - k * per) / cols))  # no empty rows on short clips
        label = f"drawtext=fontfile='{FONT}':text='%{{eif\\:t+{t0}\\:d}}s':x=6:y=6:fontsize=26:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=4"
        run([str(FFULL), '-nostdin', '-v', 'error', '-y', '-ss', str(t0), '-t', str(per * passo), '-i', px,
             '-vf', f"fps=1/{passo}:start_time=0,scale=180:320,setpts=N*{passo}/TB,{label},tile={cols}x{r}",
             '-frames:v', '1', '-q:v', '4', out])


def one(e, args):
    px = LOCAL / 'proxies' / f"{e['id']}.mp4"
    au = LOCAL / 'audio' / f"{e['id']}.wav"
    if not px.exists():
        tmp = px.with_suffix('.part.mp4')  # never leave a half-written proxy behind
        proxy(e, tmp)
        tmp.rename(px)
    if not au.exists():
        wav(e, au)
    if args.refazer_folhas or not (LOCAL / 'folhas' / f"{e['id']}-1.jpg").exists():
        folhas(e, px, args.passo)
    return e['id']


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--so', help='only this clip id')
    ap.add_argument('--passo', type=float, default=2, help='seconds between contact-sheet frames (default 2)')
    ap.add_argument('--refazer-folhas', action='store_true', help='rebuild contact sheets even if they exist')
    ap.add_argument('--paralelo', type=int, default=3, help='clips processed at once (default 3)')
    args = ap.parse_args()
    files = json.loads((LOCAL / 'manifest.json').read_text())['files']
    if args.so:
        files = [e for e in files if e['id'] == args.so]
    for d in ('proxies', 'audio', 'folhas'):
        (LOCAL / d).mkdir(exist_ok=True)
    with ThreadPoolExecutor(args.paralelo) as ex:
        for i, id_ in enumerate(ex.map(lambda e: one(e, args), files), 1):
            print(f"{i} de {len(files)}: {id_}", flush=True)


if __name__ == '__main__':
    main()
