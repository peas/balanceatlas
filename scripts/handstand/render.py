#!/usr/bin/env python3
"""Render a prepared portrait analysis folder. Inputs: video.mp4 (720x1280 SDR,30fps), pose JSON.
Example: python3 scripts/handstand/render.py local/festival/analysis/paulo-20261125 --pose paulo-20261125.json
Originals/poses/renders remain local. No upload or Instagram publication.
"""
import argparse,json,subprocess,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
a=argparse.ArgumentParser(description=__doc__)
a.add_argument('folder',type=Path);a.add_argument('--pose',default='pose.json');a.add_argument('--side',choices=['left','right'],default='left');a.add_argument('--crop',default='150,400,420,700');a.add_argument('--still',type=int,help='Render a PNG at this frame instead of MP4')
x=a.parse_args();folder=x.folder.resolve();public=folder/'render-public';public.mkdir(exist_ok=True)
shutil.copy2(folder/'video.mp4',public/'video.mp4');shutil.copy2(folder/x.pose,public/'pose.json')
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_streams','-of','json',str(folder/'video.mp4')]))['streams'][0]
assert (probe['width'],probe['height'])==(720,1280),'Expected 720x1280 upright SDR source'
props={'duration':float(probe['duration']),'side':x.side,'crop':dict(zip(['x','y','w','h'],map(float,x.crop.split(','))))}
assert abs(props['crop']['w']/props['crop']['h']-.6)<.001,'Crop must have 3:5 aspect ratio to avoid stretching'
(folder/'render-props.json').write_text(json.dumps(props,indent=2))
bundle=folder/'bundle'
subprocess.run(['npx','remotion','bundle','src/festival/analysis/render.tsx','--public-dir',str(public),'--out-dir',str(bundle)],cwd=ROOT,check=True)
cmd=['npx','remotion','still' if x.still is not None else 'render',str(bundle),'paulo-alinhamento',str(folder/('preview.png' if x.still is not None else 'paulo-alinhamento.mp4')),'--props',json.dumps(props),'--overwrite']
cmd+=['--frame',str(x.still)] if x.still is not None else ['--codec','h264','--crf','20','--concurrency','2','--color-space','bt709']
subprocess.run(cmd,cwd=ROOT,check=True)
