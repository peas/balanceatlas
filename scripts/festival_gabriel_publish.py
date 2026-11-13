#!/usr/bin/env python3
"""Export only the four selected Gabriel sources as lightweight web assets (no raw MOVs).
Import/review first with festival_gabriel.py. Freeze times are in original-source seconds.
"""
from pathlib import Path
import subprocess, json
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'local/festival/gabriel-2026-11-12/originals'
OUT=ROOT/'public/festival/ig/gabriel';OUT.mkdir(parents=True,exist_ok=True)
FF='/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg'
SDR='scale=720:-2,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,fps=30'
for n,seconds in [(3372,6),(3377,10)]:
 movie=OUT/f'img-{n}.mp4'
 subprocess.run([FF,'-y','-v','error','-i',str(BASE/f'IMG_{n}.MOV'),'-vf',SDR,'-t',str(seconds+0.1),'-c:v','libx264','-crf','22','-preset','medium','-an','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart',str(movie)],check=True)
 # Select the exact CFR frame used by the composition; no approximate keyframe seek.
 subprocess.run([FF,'-y','-v','error','-i',str(movie),'-vf',f'select=eq(n\\,{seconds*30})','-frames:v','1',str(BASE.parent/'frames'/f'export-img-{n}.png')],check=True)
print('Selected videos and exact freeze frames exported.')

subprocess.run(['node',str(ROOT/'design/handstandfest-arte/2026-11-12-gabriel/publish.mjs')],check=True)
