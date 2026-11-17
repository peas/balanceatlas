import json,subprocess,concurrent.futures
from pathlib import Path
root=Path(__file__).resolve().parents[1];base=root/'local/festival/gabriel-2026-11-17';rows=json.loads((base/'manifest.json').read_text());out=root/'public/festival/ig/gabriel-training-review-v2';out.mkdir(exist_ok=True)
def make(row):
 src=base/'originals'/row['file'];times=[.24,.56,.72] if row.get('duration') else [0]
 for n,f in enumerate(times):
  dest=out/f"{row['id']}-{n}.webp"
  if dest.exists():continue
  vf='scale=720:-2'
  if row.get('color')=='arib-std-b67':vf+=',zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p'
  cmd=['/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg','-v','error','-nostdin','-y']
  if row.get('duration'):cmd+=['-ss',str(row['duration']*f)]
  subprocess.run(cmd+['-i',str(src),'-vf',vf,'-frames:v','1','-quality','82',str(dest)],check=True)
 return row['id']
with concurrent.futures.ThreadPoolExecutor(3) as ex:
 for id in ex.map(make,rows):print(id,flush=True)
