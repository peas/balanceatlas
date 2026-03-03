#!/usr/bin/env python3
"""
Download photos and videos from a Google Photos shared album.

Usage:
  python3 scripts/download_gphotos.py --url ALBUM_URL --slug EVENT_SLUG [--max-items N] [--no-clean]

Examples:
  python3 scripts/download_gphotos.py --url "https://photos.app.goo.gl/..." --slug greece-2025
  python3 scripts/download_gphotos.py --url "https://photos.app.goo.gl/..." --slug saopaulo-2024 --max-items 100

Output:
  public/images/retreats/<slug>/  (photos as 01.jpg, 02.jpg, ...)
  public/videos/retreats/<slug>/  (videos as 01.mp4, 02.mp4, ...)
  public/images/retreats/<slug>/manifest.json  (index with dimensions, hashes)
"""

import argparse
import hashlib
import json
import os
import re
import sys
import urllib.request
import urllib.error
import time

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


def resolve_short_url(url):
    """Resolve goo.gl short URLs to full Google Photos URLs."""
    if "goo.gl" in url or "photos.app.goo.gl" in url:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            resp = urllib.request.urlopen(req)
            resolved = resp.url
            print(f"Resolved short URL -> {resolved[:80]}...")
            return resolved
        except Exception as e:
            print(f"Warning: could not resolve short URL: {e}")
    return url


def fetch_album_html(album_url, cache_file):
    """Fetch album HTML, using cache if available."""
    if os.path.exists(cache_file) and os.path.getsize(cache_file) > 1000:
        print(f"Using cached HTML: {cache_file} ({os.path.getsize(cache_file)} bytes)")
        return

    album_url = resolve_short_url(album_url)
    print("Fetching album HTML...")
    req = urllib.request.Request(album_url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
        with open(cache_file, "wb") as f:
            f.write(data)
    print(f"Saved HTML: {len(data)} bytes")


def extract_ds_block(html, ds_key):
    """Extract the data array from an AF_initDataCallback block."""
    marker = f"AF_initDataCallback({{key: 'ds:{ds_key}'"
    start = html.find(marker)
    if start == -1:
        marker = f'AF_initDataCallback({{key: "ds:{ds_key}"'
        start = html.find(marker)
    if start == -1:
        return None

    data_start = html.find("[", html.find("data:", start))
    depth = 0
    for i in range(data_start, min(data_start + 500000, len(html))):
        if html[i] == "[":
            depth += 1
        elif html[i] == "]":
            depth -= 1
            if depth == 0:
                return html[data_start : i + 1]
    return None


def parse_album_html(cache_file):
    """Parse the Google Photos album HTML to extract media items."""
    with open(cache_file, "r", errors="replace") as f:
        html = f.read()

    print(f"HTML size: {len(html)} chars")

    ds1 = extract_ds_block(html, 1)
    if not ds1:
        print("ERROR: Could not find ds:1 data block")
        sys.exit(1)

    print(f"ds:1 data block: {len(ds1)} chars")

    entries = re.findall(
        r'\["(AF1Qip[^"]+)",\["(https://lh3\.googleusercontent\.com/pw/[^"]+)",(\d+),(\d+)',
        ds1,
    )
    print(f"Found {len(entries)} media entries with ID, URL, and dimensions")

    photos = []
    videos = []

    for photo_id, url, w, h in entries:
        width, height = int(w), int(h)
        entry_pos = ds1.find(f'"{photo_id}"')
        if entry_pos == -1:
            continue

        meta_start = ds1.find('{"15":', entry_pos)
        is_video = False
        if meta_start != -1 and meta_start < entry_pos + 800:
            depth2 = 0
            meta_end = meta_start
            for i in range(meta_start, min(meta_start + 2000, len(ds1))):
                if ds1[i] == "{":
                    depth2 += 1
                elif ds1[i] == "}":
                    depth2 -= 1
                    if depth2 == 0:
                        meta_end = i + 1
                        break
            meta_str = ds1[meta_start:meta_end]
            is_video = '"76647426"' in meta_str

        chunk = ds1[entry_pos : entry_pos + 600]
        duration_ms = 0
        duration_match = re.search(r'\[null,null,1\],\[(\d+)\]', chunk)
        if duration_match:
            duration_ms = int(duration_match.group(1))

        if is_video:
            videos.append({
                "id": photo_id,
                "url": url,
                "width": width,
                "height": height,
                "durationMs": duration_ms,
                "durationSeconds": round(duration_ms / 1000, 1),
            })
        else:
            photos.append({
                "id": photo_id,
                "url": url,
                "width": width,
                "height": height,
            })

    print(f"Parsed: {len(photos)} photos, {len(videos)} videos")

    if videos:
        print("Videos found:")
        for v in videos:
            print(f"  {v['id'][:30]}... {v['width']}x{v['height']} {v['durationSeconds']}s")

    return photos, videos


def md5_file(path):
    """Compute MD5 hash of a file."""
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def download_file(url, dest_path, timeout=120):
    """Download a file with retry logic."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = resp.read()
                with open(dest_path, "wb") as f:
                    f.write(data)
                return len(data)
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, OSError) as e:
            if attempt < 2:
                print(f"  Retry {attempt + 1}/3: {e}")
                time.sleep(2 * (attempt + 1))
            else:
                print(f"  FAILED after 3 attempts: {e}")
                return 0


def download_photos(photo_items, images_dir, clean=True):
    """Download all photos with progress."""
    os.makedirs(images_dir, exist_ok=True)
    total = len(photo_items)
    manifest_photos = []

    if clean:
        for f in os.listdir(images_dir):
            if f.endswith(".jpg"):
                os.remove(os.path.join(images_dir, f))

    for i, item in enumerate(photo_items, 1):
        filename = f"{i:02d}.jpg"
        dest = os.path.join(images_dir, filename)
        url = item["url"] + "=w1920-h1080"

        print(f"  [{i}/{total}] {filename} ({item['width']}x{item['height']})...", end=" ", flush=True)
        size = download_file(url, dest)
        if size:
            file_hash = md5_file(dest)
            print(f"{size // 1024} KB  md5:{file_hash[:8]}")
            manifest_photos.append({
                "filename": filename,
                "googleId": item["id"],
                "width": item["width"],
                "height": item["height"],
                "sizeBytes": size,
                "md5": file_hash,
            })
        else:
            print("SKIPPED")

    return manifest_photos


def download_videos(video_items, videos_dir):
    """Download all videos with progress."""
    os.makedirs(videos_dir, exist_ok=True)
    total = len(video_items)
    manifest_videos = []

    for i, item in enumerate(video_items, 1):
        filename = f"{i:02d}.mp4"
        dest = os.path.join(videos_dir, filename)
        url = item["url"] + "=dv"

        print(f"  [{i}/{total}] {filename} ({item['durationSeconds']}s)...", end=" ", flush=True)
        size = download_file(url, dest, timeout=300)
        if size:
            file_hash = md5_file(dest)
            size_mb = size / (1024 * 1024)
            print(f"{size_mb:.1f} MB  md5:{file_hash[:8]}")
            manifest_videos.append({
                "filename": filename,
                "googleId": item["id"],
                "width": item["width"],
                "height": item["height"],
                "durationSeconds": item["durationSeconds"],
                "sizeBytes": size,
                "md5": file_hash,
            })
        else:
            print("SKIPPED")

    return manifest_videos


def main():
    parser = argparse.ArgumentParser(description="Download photos/videos from a Google Photos shared album")
    parser.add_argument("--url", required=True, help="Google Photos shared album URL")
    parser.add_argument("--slug", required=True, help="Event slug (e.g. greece-2025)")
    parser.add_argument("--max-items", type=int, default=0, help="Max total items to download (0 = all)")
    parser.add_argument("--no-clean", action="store_true", help="Don't clean existing photos before download")
    args = parser.parse_args()

    images_dir = os.path.join(PROJECT_ROOT, "public", "images", "retreats", args.slug)
    videos_dir = os.path.join(PROJECT_ROOT, "public", "videos", "retreats", args.slug)
    manifest_path = os.path.join(images_dir, "manifest.json")
    cache_file = f"/tmp/gphotos_{args.slug}.html"

    print("=" * 60)
    print(f"Google Photos Album Downloader — {args.slug}")
    print(f"  Images -> {images_dir}")
    print(f"  Videos -> {videos_dir}")
    if args.max_items:
        print(f"  Max items: {args.max_items}")
    print("=" * 60)

    fetch_album_html(args.url, cache_file)

    print("\n--- Parsing album ---")
    photos, videos = parse_album_html(cache_file)

    if not photos and not videos:
        print("\nERROR: No media found.")
        sys.exit(1)

    # Apply max-items limit (prioritize photos, then videos)
    if args.max_items > 0:
        total = len(photos) + len(videos)
        if total > args.max_items:
            # Keep all videos (usually fewer), trim photos
            max_photos = max(0, args.max_items - len(videos))
            if max_photos < len(photos):
                print(f"Trimming photos from {len(photos)} to {max_photos} (max-items={args.max_items})")
                photos = photos[:max_photos]
            if len(photos) + len(videos) > args.max_items:
                max_videos = args.max_items - len(photos)
                print(f"Trimming videos from {len(videos)} to {max_videos}")
                videos = videos[:max_videos]

    print(f"\n--- Downloading {len(photos)} photos ---")
    manifest_photos = download_photos(photos, images_dir, clean=not args.no_clean)

    manifest_videos = []
    if videos:
        print(f"\n--- Downloading {len(videos)} videos ---")
        manifest_videos = download_videos(videos, videos_dir)
    else:
        print("\nNo videos found in album.")

    manifest = {
        "albumUrl": args.url,
        "slug": args.slug,
        "downloadedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "totalPhotos": len(manifest_photos),
        "totalVideos": len(manifest_videos),
        "photos": manifest_photos,
        "videos": manifest_videos,
    }
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n{'=' * 60}")
    print(f"Done! {args.slug}")
    print(f"  Photos: {len(manifest_photos)} -> {images_dir}")
    print(f"  Videos: {len(manifest_videos)} -> {videos_dir}")
    print(f"  Manifest: {manifest_path}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
