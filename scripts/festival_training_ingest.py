#!/usr/bin/env python3
"""Inventory/deduplicate and preserve Gabriel training footage; make visual contact sheets. --help for paths."""
from pathlib import Path
import hashlib,json,subprocess,concurrent.futures,shutil
from PIL import Image,ImageOps,ImageDraw
import argparse
ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--source',type=Path,default=Path.home()/'Downloads/videos');ap.add_argument('--output',type=Path,default=Path(__file__).resolve().parents[1]/'local/festival/gabriel-2026-11-17');args=ap.parse_args();src=args.source;out=args.output;out.mkdir(parents=True,exist_ok=True)
for d in ['originals','sheets','frames']: (out/d).mkdir(exist_ok=True)
rows=[];seen={}
for p in sorted(src.iterdir()):
 if p.suffix.lower() not in ['.mov','.mp4','.jpg','.jpeg','.png']:continue
 sha=hashlib.sha256(p.read_bytes()).hexdigest()
 if sha in seen:seen[sha]['aliases'].append(p.name);continue
 r={'id':'gabriel-20261117-'+p.stem.lower().replace('(','-').replace(')',''),'file':p.name,'sha256':sha,'bytes':p.stat().st_size,'aliases':[]};seen[sha]=r;rows.append(r)
 shutil.copy2(p,out/'originals'/p.name)
 if p.suffix.lower() in ['.mov','.mp4']:
  j=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]));v=next(x for x in j['streams'] if x['codec_type']=='video');r.update(duration=float(j['format']['duration']),width=v['width'],height=v['height'],codec=v['codec_name'],color=v.get('color_transfer'),rotation=next((x.get('rotation',0) for x in v.get('side_data_list',[]) if 'rotation' in x),0),audio=any(x['codec_type']=='audio' for x in j['streams']))
 else:r['image']=True
(out/'manifest.json').write_text(json.dumps(rows,indent=2))
def sheet(r):
 p=out/'originals'/r['file'];times=[0] if r.get('image') else [round(r['duration']*f,2) for f in [.08,.24,.4,.56,.72,.88]]
 canvas=Image.new('RGB',(1200,450),'#f3eddf');draw=ImageDraw.Draw(canvas)
 for i,t in enumerate(times):
  f=out/'frames'/f"{r['id']}-{i}.jpg"
  if r.get('image'): im=ImageOps.exif_transpose(Image.open(p)).convert('RGB')
  else:
   subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(p),'-frames:v','1','-vf','scale=320:360:force_original_aspect_ratio=decrease',str(f)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);im=Image.open(f)
  im=ImageOps.contain(im,(195,360));canvas.paste(im,(i*200+(200-im.width)//2,45));draw.text((i*200+5,410),str(t)+'s',fill='black')
 draw.text((8,10),r['file']+' | '+str(round(r.get('duration',0),1))+'s',fill='black');canvas.save(out/'sheets'/f"{r['id']}.jpg")
with concurrent.futures.ThreadPoolExecutor(3) as ex:list(ex.map(sheet,rows))
print(json.dumps({'unique':len(rows),'duplicates':sum(len(r['aliases']) for r in rows),'minutes':sum(r.get('duration',0) for r in rows)/60,'sheets':str(out/'sheets')}))
