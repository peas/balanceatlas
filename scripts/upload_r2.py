#!/usr/bin/env python3
"""Upload local media (public/images/ + public/videos/) to Cloudflare R2.

Preserves directory structure: public/images/retreats/... → images/retreats/...
Skips existing keys unless --force is passed. Uploads 5 files concurrently.

Requires: pip install boto3 python-dotenv
"""

import argparse
import mimetypes
import os
import sys
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import boto3
from dotenv import load_dotenv

MEDIA_DIRS = ["public/images", "public/videos"]
MAX_WORKERS = 5

CONTENT_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".json": "application/json",
}


def get_content_type(path: Path) -> str:
    ext = path.suffix.lower()
    if ext in CONTENT_TYPES:
        return CONTENT_TYPES[ext]
    guess, _ = mimetypes.guess_type(str(path))
    return guess or "application/octet-stream"


def main():
    parser = argparse.ArgumentParser(description="Upload media to Cloudflare R2")
    parser.add_argument("--force", action="store_true", help="Re-upload existing files")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be uploaded")
    parser.add_argument("--workers", type=int, default=MAX_WORKERS, help="Concurrent uploads (default: 5)")
    args = parser.parse_args()

    load_dotenv()

    access_key = os.getenv("R2_ACCESS_KEY_ID")
    secret_key = os.getenv("R2_SECRET_ACCESS_KEY")
    bucket = os.getenv("R2_BUCKET", "media-handstand")
    endpoint = os.getenv("R2_ENDPOINT")

    if not all([access_key, secret_key, endpoint]):
        print("Error: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_ENDPOINT must be set in .env")
        sys.exit(1)

    s3 = boto3.client(
        "s3",
        endpoint_url=endpoint,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name="auto",
    )

    # Collect all local files
    project_root = Path(__file__).resolve().parent.parent
    files: list[tuple[Path, str]] = []
    for media_dir in MEDIA_DIRS:
        full_dir = project_root / media_dir
        if not full_dir.exists():
            continue
        for file_path in sorted(full_dir.rglob("*")):
            if file_path.is_file():
                key = str(file_path.relative_to(project_root / "public"))
                files.append((file_path, key))

    if not files:
        print("No media files found in public/images/ or public/videos/")
        sys.exit(0)

    # Get existing keys (unless --force)
    existing_keys: set[str] = set()
    if not args.force:
        paginator = s3.get_paginator("list_objects_v2")
        for page in paginator.paginate(Bucket=bucket):
            for obj in page.get("Contents", []):
                existing_keys.add(obj["Key"])

    to_upload = [(fp, k) for fp, k in files if k not in existing_keys]
    skipped = len(files) - len(to_upload)
    total = len(to_upload)

    if args.dry_run:
        for fp, key in to_upload:
            print(f"[dry-run] {key} ({get_content_type(fp)})")
        print(f"\nDry run: {total} would be uploaded, {skipped} skipped")
        return

    if total == 0:
        print(f"Nothing to upload ({skipped} already exist)")
        return

    print(f"Uploading {total} files ({skipped} skipped, {args.workers} concurrent)...")
    lock = threading.Lock()
    done = 0
    errors = 0

    def upload_one(file_path: Path, key: str) -> str:
        s3.upload_file(
            str(file_path),
            bucket,
            key,
            ExtraArgs={
                "ContentType": get_content_type(file_path),
                "CacheControl": "public, max-age=31536000, immutable",
            },
        )
        return key

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(upload_one, fp, k): k for fp, k in to_upload}
        for f in as_completed(futures):
            with lock:
                done += 1
            try:
                key = f.result()
                if done % 20 == 0 or done == total:
                    print(f"{done}/{total}: {key} ✓", flush=True)
            except Exception as e:
                with lock:
                    errors += 1
                print(f"ERROR {futures[f]}: {e}", flush=True)

    print(f"\nDone: {done} uploaded, {skipped} skipped, {errors} errors")


if __name__ == "__main__":
    main()
