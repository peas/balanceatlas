"""Prepare SDR reference samples for Gabriel; originals and transcripts remain outside Git."""
import concurrent.futures, json, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'local/festival/gabriel-filming-2026-11-13/sources'
SOURCES={1:'PXL_20261113_203328513.mp4',2:'PXL_20261113_204644378.mp4'}
DEST=ROOT/'public/festival/ig/gabriel-filming-v1'
DEST.mkdir(parents=True,exist_ok=True)
rows=json.loads((ROOT/'src/festival/ig2/gabriel-filming.json').read_text())
def run(row):
 s=row.get('sample')
 if not s:return
 target=DEST/(row['id']+'.mp4')
 if not target.exists():
  partial=target.with_suffix('.partial.mp4')
  subprocess.run(['/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg','-nostdin','-v','error','-ss',str(s['start']),'-i',str(SOURCE/SOURCES[s['source']]),'-t',str(s['end']-s['start']),'-map','0:v:0','-map','0:a:0?','-vf','scale=-2:960,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,fps=30','-c:v','libx264','-preset','slow','-crf','25','-threads','3','-c:a','aac','-b:a','96k','-movflags','+faststart','-y',str(partial)],check=True)
  partial.replace(target)
 poster=DEST/(row['id']+'.webp')
 subprocess.run(['/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg','-nostdin','-v','error','-ss',str(s.get('poster',min(5,(s['end']-s['start'])/2))),'-i',str(target),'-frames:v','1','-vf','scale=-2:720','-c:v','libwebp','-quality','82','-y',str(poster)],check=True)
 print(row['id'],flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(run,rows))
