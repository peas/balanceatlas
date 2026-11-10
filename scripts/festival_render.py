#!/usr/bin/env python3
"""Render Instagram 2 Reels to 1080x1920 H.264 MP4 with local fonts.

Requires npm ci, ffmpeg, and the committed festival media. No server, cloud render,
Telegram credentials or publishing is involved. Outputs stay in gitignored local/.
Examples: python scripts/festival_render.py futebol formas
          python scripts/festival_render.py futebol --output-dir /absolute/output
"""
import argparse
from pathlib import Path
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument('pieces', nargs='+', help='Reel IDs from ig2/pieces.tsx, e.g. futebol formas')
parser.add_argument('--output-dir', type=Path, default=ROOT/'local/festival/renders', help='MP4 destination')
parser.add_argument('--concurrency', type=int, default=2, help='Concurrent frames (default 2)')
parser.add_argument('--still', action='store_true', help='Export each composition as a static PNG instead of MP4')
parser.add_argument('--frame', type=int, default=0, help='Frame for --still (default 0)')
args = parser.parse_args()
if any(not re.fullmatch(r'[a-z][a-z0-9-]*', p) for p in args.pieces):
    parser.error('Piece IDs must contain lowercase letters, digits or hyphens.')
if args.concurrency < 1:
    parser.error('Concurrency must be positive.')
public = ROOT/'local/festival/render-public'
(public/'fonts').mkdir(parents=True, exist_ok=True)
shutil.copytree(ROOT/'public/festival/ig', public/'festival/ig', dirs_exist_ok=True)
for name in ['archivo.ttf', 'space-mono-bold.ttf']:
    shutil.copy2(ROOT/'design/fonts'/name, public/'fonts'/name)
# Read the site's tokens without importing its selectors and CSS asset URLs into Webpack.
css = (ROOT/'src/festival/festival.css').read_text()
(ROOT/'local/festival/render.css').write_text('\n'.join(re.findall(r':root\s*\{[^}]*\}', css)) + '\n* { box-sizing: border-box; margin: 0; padding: 0; }\n')
bundle = ROOT/'local/festival/render-bundle'
subprocess.run(['npx','remotion','bundle','src/festival/ig2/render.tsx','--out-dir',str(bundle),'--public-dir',str(public)],cwd=ROOT,check=True)
args.output_dir.mkdir(parents=True, exist_ok=True)
for piece in args.pieces:
    if args.still:
        subprocess.run(['npx','remotion','still',str(bundle),piece,str(args.output_dir/f'{piece}.png'),'--frame',str(args.frame),'--overwrite'],cwd=ROOT,check=True)
        continue
    raw = args.output_dir/f'{piece}-raw.mp4'
    final = args.output_dir/f'{piece}.mp4'
    subprocess.run(['npx','remotion','render',str(bundle),piece,str(raw),'--codec','h264','--crf','18','--concurrency',str(args.concurrency),'--color-space','bt709','--image-format','png','--overwrite'],cwd=ROOT,check=True)
    subprocess.run(['ffmpeg','-nostdin','-y','-hide_banner','-loglevel','error','-i',str(raw),'-c','copy','-movflags','+faststart',str(final)],check=True)
    raw.unlink()
    print(f'Rendered {piece}: {final}')
