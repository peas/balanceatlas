"""Rebuild registered clean cuts without changing editorial metadata (requires ffmpeg-full)."""
from pathlib import Path
import json, subprocess
root = Path(__file__).resolve().parents[1]
base = root / 'local/festival/gabriel-2026-11-17'
manifest = {row['id']: row for row in json.loads((base / 'manifest.json').read_text())}
cuts = json.loads((root / 'src/festival/ig2/gabriel-training-2026-11-17.json').read_text())
for cut in cuts:
    source = base / 'originals' / manifest[cut['source_id']]['file']
    target = root / 'public' / cut['src'].lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    vf = 'scale=720:-2,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p'
    subprocess.run(['/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg', '-v', 'error', '-y', '-ss', str(cut['source_start']), '-i', str(source), '-t', str(cut['seconds']), '-vf', vf, '-r', '30', '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-an', '-movflags', '+faststart', str(target)], check=True)
    subprocess.run(['/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg', '-v', 'error', '-y', '-ss', str(cut['freeze']), '-i', str(target), '-frames:v', '1', str(root / 'public' / cut['poster'].lstrip('/'))], check=True)
    print(cut['id'])
