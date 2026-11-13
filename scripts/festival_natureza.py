#!/usr/bin/env python3
"""Prepare the curated nature batch for Instagram compositions, without changing originals.

Run before festival_render.py. Uses natureza.json and the reviewed local cut masters.
Exports silent 720-wide SDR previews, exact CFR freeze frames and quality-82 WebP photos.
No publishing, external upload or generated anatomical illustration occurs here.
"""
import argparse
import json
import subprocess
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FULL_FFMPEG = Path('/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg')
FFMPEG = str(FULL_FFMPEG) if FULL_FFMPEG.exists() else shutil.which('ffmpeg')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--force', action='store_true', help='Rebuild existing preview derivatives')
    args = parser.parse_args()
    rows = json.loads((ROOT/'src/festival/ig2/natureza.json').read_text())
    src = ROOT/'local/festival/natureza-2026-11-12'
    out = ROOT/'public/festival/ig/natureza-v1'
    out.mkdir(parents=True, exist_ok=True)
    def ff(*cmd):
        subprocess.run([FFMPEG,'-nostdin','-y','-v','error',*map(str,cmd)],check=True)
    for i,row in enumerate(rows,1):
        source = src/row['sourcePath']
        name = row['file']
        if row['kind']=='reel':
            video = out/f'{name}.mp4'
            if args.force or not video.exists():
                ff('-i',source,'-t',(row['freezeFrame']+3)/30,
                   '-vf',"scale=w='min(720,iw)':h=-2,fps=30,setsar=1",'-an',
                   '-c:v','libx264','-crf','26' if row['freezeFrame']>900 else '24','-preset','slow','-threads','2',
                   '-pix_fmt','yuv420p','-color_range','tv','-movflags','+faststart',video)
            still = out/f'{name}-freeze.webp'
            if args.force or not still.exists():
                ff('-i',video,'-vf',f"select=eq(n\\,{row['freezeFrame']})",'-frames:v','1',
                   '-c:v','libwebp','-quality','82',still)
        else:
            with Image.open(source) as im:
                im.thumbnail((1440,1920))
                im.save(out/f'{name}.webp',quality=82,method=6)
        print(f'{i}/{len(rows)} {row["id"]}',flush=True)

if __name__=='__main__': main()
