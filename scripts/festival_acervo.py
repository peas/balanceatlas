#!/usr/bin/env python3
"""Sync the HandstandFest raw footage from a Google Drive folder into local/festival/ (gitignored).

READ-ONLY on Drive: it only lists and downloads. Nothing is uploaded, moved or deleted.

What it does
  1. Lists the folder recursively (Drive API v3, token from `gcloud auth print-access-token`).
  2. Skips every file already in local/festival/manifest.json. A file is "already here" when
       - its Drive md5 is in the manifest (same bytes, whatever the name or folder), or
       - its (name, size, duration) triple is in the manifest (same clip uploaded again).
  3. Downloads the rest to local/festival/originais/<folder-slug>/<name>, checks the md5 and
     records the fingerprint (drive id, md5, size, duration, capture time from ffprobe).

The manifest lives next to the footage on purpose: if local/ is wiped, both go together.
The human catalogue (what is in each clip, scene by scene) is acervo/catalogo.yaml, committed.

Examples
  scripts/festival_acervo.py sync                 # default folder, download what is new
  scripts/festival_acervo.py sync --dry-run       # only show what would be downloaded
  scripts/festival_acervo.py sync --folder <id>   # another Drive folder
  scripts/festival_acervo.py list                 # what the manifest holds
"""
import argparse
import hashlib
import json
import re
import subprocess
import sys
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCAL = ROOT / 'local' / 'festival'
MANIFEST = LOCAL / 'manifest.json'
DEFAULT_FOLDER = '1hox6tZ_yin42KHm4iKrSduHzeDJcDeby'  # "Videos" (shared by Gabriel, 05/11/2026)
FIELDS = 'nextPageToken,files(id,name,mimeType,size,md5Checksum,createdTime,modifiedTime,videoMediaMetadata)'
FOLDER_MIME = 'application/vnd.google-apps.folder'


def token() -> str:
    return subprocess.check_output(['gcloud', 'auth', 'print-access-token'], text=True).strip()


def api(url: str):
    req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token()}'})
    return urllib.request.urlopen(req)


def slug(s: str) -> str:
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def listing(folder: str, path: str = '') -> list[dict]:
    out, page = [], None
    while True:
        q = {'q': f"'{folder}' in parents and trashed=false", 'fields': FIELDS, 'pageSize': 1000,
             'supportsAllDrives': 'true', 'includeItemsFromAllDrives': 'true'}
        if page:
            q['pageToken'] = page
        d = json.load(api('https://www.googleapis.com/drive/v3/files?' + urllib.parse.urlencode(q)))
        for f in d.get('files', []):
            if f['mimeType'] == FOLDER_MIME:
                out += listing(f['id'], f"{path}{f['name']}/")
            else:
                f['folder'] = path.rstrip('/')
                out.append(f)
        page = d.get('nextPageToken')
        if not page:
            return out


def probe(p: Path) -> dict:
    r = subprocess.run(['ffprobe', '-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', str(p)],
                       capture_output=True, text=True)
    if r.returncode:
        return {}
    d = json.loads(r.stdout)
    v = next((s for s in d['streams'] if s['codec_type'] == 'video'), {})
    tags = d['format'].get('tags', {})
    rot = next((sd.get('rotation') for sd in v.get('side_data_list', []) if 'rotation' in sd), 0)
    return {
        'duration': round(float(d['format'].get('duration', 0)), 3),
        'captured': tags.get('com.apple.quicktime.creationdate') or tags.get('creation_time'),
        'width': v.get('width'), 'height': v.get('height'), 'rotation': rot,
        'fps': v.get('avg_frame_rate'), 'codec': v.get('codec_name'),
        'transfer': v.get('color_transfer'),
        'audio': any(s['codec_type'] == 'audio' for s in d['streams']),
    }


def load() -> dict:
    return json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {'files': []}


def save(m: dict) -> None:
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(m, indent=1, ensure_ascii=False) + '\n')


def triple(name: str, size, dur_ms) -> tuple:
    return (name.lower(), int(size or 0), round(int(dur_ms or 0) / 1000, 1))


def download(f: dict, dest: Path) -> str:
    part = dest.with_suffix(dest.suffix + '.part')
    h, done, total = hashlib.md5(), 0, int(f.get('size', 0))
    with api(f"https://www.googleapis.com/drive/v3/files/{f['id']}?alt=media&supportsAllDrives=true") as r, open(part, 'wb') as o:
        while chunk := r.read(4 << 20):
            o.write(chunk)
            h.update(chunk)
            done += len(chunk)
            print(f"\r    {done / 1e6:7.0f} de {total / 1e6:.0f} MB", end='', flush=True)
    print()
    if f.get('md5Checksum') and h.hexdigest() != f['md5Checksum']:
        part.unlink()
        raise SystemExit(f"md5 mismatch on {f['name']}")
    part.rename(dest)
    return h.hexdigest()


def sync(args) -> None:
    m = load()
    by_md5 = {e['md5'] for e in m['files']}
    by_triple = {triple(e['name'], e['size'], e['drive_duration_ms']) for e in m['files']}
    taken = {e['local'] for e in m['files']}
    remote = sorted(listing(args.folder), key=lambda f: (f['folder'], f['name'], f['id']))
    new = [f for f in remote
           if f.get('md5Checksum') not in by_md5
           and triple(f['name'], f.get('size'), f.get('videoMediaMetadata', {}).get('durationMillis')) not in by_triple]
    print(f"{len(remote)} no Drive, {len(remote) - len(new)} já no acervo, {len(new)} novos "
          f"({sum(int(f.get('size', 0)) for f in new) / 1e9:.2f} GB)")
    for i, f in enumerate(new, 1):
        rel = f"originais/{slug(f['folder']) or 'raiz'}/{f['name']}"
        if rel in taken or (LOCAL / rel).exists():  # same name, different bytes: keep both
            stem, dot, ext = f['name'].rpartition('.')
            rel = f"originais/{slug(f['folder']) or 'raiz'}/{stem}-{f['md5Checksum'][:6]}{dot}{ext}"
        print(f"  {i} de {len(new)}: {rel}")
        if args.dry_run:
            continue
        dest = LOCAL / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        md5 = download(f, dest)
        taken.add(rel)
        m['files'].append({
            'id': Path(rel).stem.lower().replace('pxl_', 'pxl-').replace('img_', 'img-'),
            'name': f['name'], 'folder': f['folder'], 'local': rel,
            'drive_id': f['id'], 'md5': md5, 'size': int(f.get('size', 0)),
            'drive_duration_ms': int(f.get('videoMediaMetadata', {}).get('durationMillis', 0)),
            'drive_created': f['createdTime'], **probe(dest),
        })
        save(m)  # after every file, so an interrupted run resumes where it stopped


def show(_args) -> None:
    m = load()
    for e in m['files']:
        print(f"{e['id']:28s} {e.get('duration', 0):7.1f}s {e['size'] / 1e6:7.1f}MB {e.get('captured') or '':28s} {e['local']}")
    print(f"{len(m['files'])} arquivos, {sum(e['size'] for e in m['files']) / 1e9:.2f} GB")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    s = sub.add_parser('sync', help='download what is new in the Drive folder')
    s.add_argument('--folder', default=DEFAULT_FOLDER, help='Drive folder id (default: the festival "Videos" folder)')
    s.add_argument('--dry-run', action='store_true', help='list what would be downloaded, download nothing')
    s.set_defaults(fn=sync)
    sub.add_parser('list', help='print the manifest').set_defaults(fn=show)
    args = ap.parse_args()
    args.fn(args)


if __name__ == '__main__':
    sys.exit(main())
