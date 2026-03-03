#!/usr/bin/env python3
"""Download all media from Cloudflare R2 to public/.

For fresh git clones — restores images/ and videos/ that are gitignored.
Skips files that already exist locally.

Requires: pip install boto3 python-dotenv
"""

import argparse
import os
import sys
from pathlib import Path

import boto3
from dotenv import load_dotenv


def main():
    parser = argparse.ArgumentParser(description="Download media from Cloudflare R2")
    parser.add_argument("--force", action="store_true", help="Re-download existing files")
    args = parser.parse_args()

    load_dotenv()

    access_key = os.getenv("R2_ACCESS_KEY_ID")
    secret_key = os.getenv("R2_SECRET_ACCESS_KEY")
    bucket = os.getenv("R2_BUCKET", "theinvertedmap-media")
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

    project_root = Path(__file__).resolve().parent.parent
    public_dir = project_root / "public"

    # List all objects
    all_keys: list[str] = []
    paginator = s3.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=bucket):
        for obj in page.get("Contents", []):
            all_keys.append(obj["Key"])

    if not all_keys:
        print("Bucket is empty — nothing to download")
        sys.exit(0)

    total = len(all_keys)
    downloaded = 0
    skipped = 0

    for i, key in enumerate(sorted(all_keys), 1):
        local_path = public_dir / key
        if local_path.exists() and not args.force:
            skipped += 1
            continue

        local_path.parent.mkdir(parents=True, exist_ok=True)
        print(f"{i}/{total}: {key}", end="", flush=True)
        s3.download_file(bucket, key, str(local_path))
        print(f" ✓")
        downloaded += 1

    print(f"\nDone: {downloaded} downloaded, {skipped} skipped (already exist), {total} total")


if __name__ == "__main__":
    main()
