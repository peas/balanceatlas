#!/usr/bin/env python3
"""Export the calendar posts listed in src/festival/ig2/ready-posts.json as files ready for the Instagram app.

Carousels and single images become 1080x1440 JPEGs (one per slide); Reels become 1080x1920 H.264 MP4 (no audio:
music is chosen inside Instagram) plus a separate cover JPEG. Files go to local/festival/prontos/<batch>/ (gitignored),
named NN-slug-K.jpg, NN-slug.mp4 and NN-slug-capa.jpg so they sort in posting order on a phone.

Requires npm ci and ffmpeg. Nothing is uploaded or published by this script.
Examples: python scripts/festival_ready_posts.py            # every post of the manifest
          python scripts/festival_ready_posts.py --only 4 8  # just posts 4 and 8
          python scripts/festival_ready_posts.py --list      # show the compositions of the bundle and exit
"""
import argparse, json, re, shutil, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT/'src/festival/ig2/ready-posts.json'
parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument('--only', nargs='*', type=int, help='Post numbers to export (default: all)')
parser.add_argument('--concurrency', type=int, default=3, help='Concurrent frames for video (default 3)')
parser.add_argument('--list', action='store_true', help='List bundle compositions and exit')
parser.add_argument('--skip-bundle', action='store_true', help='Reuse the existing bundle')
parser.add_argument('--manifest', type=Path, default=MANIFEST, help='Batch manifest')
args = parser.parse_args()

data = json.loads(args.manifest.read_text())
out = ROOT/'local/festival/prontos'/data['batch']
public = ROOT/'local/festival/render-public'
bundle = ROOT/'local/festival/render-bundle'
if not args.skip_bundle:
    (public/'fonts').mkdir(parents=True, exist_ok=True)
    shutil.copytree(ROOT/'public/festival/ig', public/'festival/ig', dirs_exist_ok=True)
    for img in (ROOT/'public/festival').glob('*.webp'):  # venue photos used by the opening carousels
        shutil.copy2(img, public/'festival'/img.name)
    for name in ['archivo.ttf', 'space-mono-bold.ttf']:
        shutil.copy2(ROOT/'design/fonts'/name, public/'fonts'/name)
    css = (ROOT/'src/festival/festival.css').read_text()
    (ROOT/'local/festival/render.css').write_text('\n'.join(re.findall(r':root\s*\{[^}]*\}', css)) + '\n* { box-sizing: border-box; margin: 0; padding: 0; }\n')
    subprocess.run(['npx','remotion','bundle','src/festival/ig2/render.tsx','--out-dir',str(bundle),'--public-dir',str(public)], cwd=ROOT, check=True)
if args.list:
    subprocess.run(['npx','remotion','compositions',str(bundle)], cwd=ROOT, check=True)
    raise SystemExit
out.mkdir(parents=True, exist_ok=True)
props = ['--props', json.dumps({'palette': 'ocre'})]

def still(comp, frame, target):
    subprocess.run(['npx','remotion','still',str(bundle),comp,str(target),'--frame',str(frame),'--image-format','jpeg','--jpeg-quality','95','--overwrite'] + props, cwd=ROOT, check=True)

posts = [p for p in data['posts'] if not args.only or p['n'] in args.only]
for i, post in enumerate(posts, 1):
    base = f"{post['n']:02d}-{post['slug']}"
    print(f"[{i} de {len(posts)}] {base}", flush=True)
    if post.get('video'):
        raw = out/f'{base}-raw.mp4'
        subprocess.run(['npx','remotion','render',str(bundle),post['piece'],str(raw),'--codec','h264','--crf','18','--concurrency',str(args.concurrency),'--color-space','bt709','--image-format','png','--muted','--overwrite'] + props, cwd=ROOT, check=True)
        subprocess.run(['ffmpeg','-nostdin','-y','-hide_banner','-loglevel','error','-i',str(raw),'-c','copy','-an','-movflags','+faststart',str(out/f'{base}.mp4')], check=True)
        raw.unlink()
        still(post['piece'], post['cover'], out/f'{base}-capa.jpg')
    else:
        n = post['slides']
        for k in range(1, n + 1):
            comp = post['piece'] if n == 1 else f"{post['piece']}-{k}"
            still(comp, post['frame'], out/(f'{base}.jpg' if n == 1 else f'{base}-{k}.jpg'))
print(f'Done: {out}')
