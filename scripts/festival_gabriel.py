#!/usr/bin/env python3
"""Import Gabriel's November 12 batch and derive SDR review proxies. No originals in Git.
Run from any directory: python3 scripts/festival_gabriel.py [--source /path/to/files]
Semantic annotations remain in acervo/catalogo.yaml, not in this technical manifest.
"""
import argparse, hashlib, json, shutil, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'local/festival/gabriel-2026-11-12'
VIDEOS=[f'IMG_{n}.MOV' for n in [3377,3376,3375,3374,3373,3372,3371,2700,2745]]
PHOTOS=['IMG_7884.JPEG','IMG_7876.JPEG','IMG_7877.JPEG','IMG_7865.JPEG','IMG_8751.PNG','IMG_4209.JPG','IMG_9685.JPG','IMG_2225.JPEG','IMG_9687.JPG','IMG_9684.JPG','IMG_3370.PNG']
FF='/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg'
SDR='scale=540:-2,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p'
def run(args):subprocess.run(list(map(str,args)),check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
def one(name,source):
 original=BASE/'originals'/name
 if not original.exists():shutil.copy2(source/name,original)
 row={'file':name,'id':'gabriel-'+Path(name).stem.lower().replace('_','-'),'local':str(original.relative_to(ROOT)),'sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'bytes':original.stat().st_size}
 if name in VIDEOS:
  probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(original)]))
  v=next(s for s in probe['streams'] if s['codec_type']=='video')
  row.update(duration=float(probe['format']['duration']),width=v['width'],height=v['height'],fps=v['r_frame_rate'],transfer=v.get('color_transfer'),rotation=next((s['rotation'] for s in v.get('side_data_list',[]) if 'rotation' in s),0),audio=any(s['codec_type']=='audio' for s in probe['streams']))
  proxy=BASE/'proxies'/f'{Path(name).stem}.mp4'
  if not proxy.exists():run([FF,'-y','-v','error','-i',original,'-vf',SDR,'-r','30','-c:v','libx264','-crf','23','-preset','veryfast','-g','30','-an','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart',proxy])
  times=list(range(0,int(row['duration']),2)); sheet=Image.new('RGB',(1080,((len(times)+5)//6)*345),'#eee9df');d=ImageDraw.Draw(sheet)
  for i,t in enumerate(times):
   frame=BASE/'frames'/f'{Path(name).stem}-{t:02}.jpg'
   if not frame.exists():run([FF,'-y','-v','error','-ss',t,'-i',proxy,'-frames:v','1',frame])
   im=ImageOps.contain(Image.open(frame),(174,310));x=i%6*180;y=i//6*345;sheet.paste(im,(x+(180-im.width)//2,y));d.text((x+5,y+315),f'{name} {t}s',fill='#111')
  sheet.save(BASE/'sheets'/f'{Path(name).stem}.jpg',quality=90)
 else:
  with Image.open(original) as im:im=ImageOps.exif_transpose(im);row.update(width=im.width,height=im.height)
 print(name,flush=True);return row
if __name__=='__main__':
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--source',type=Path,default=Path.home()/'Downloads');args=ap.parse_args()
 for d in ['originals','proxies','frames','sheets']:(BASE/d).mkdir(parents=True,exist_ok=True)
 with ThreadPoolExecutor(3) as ex:rows=list(ex.map(lambda n:one(n,args.source),VIDEOS+PHOTOS))
 (BASE/'manifest.json').write_text(json.dumps(rows,indent=2)+'\n')
 print('Imported',len(rows),'files into',BASE)
