#!/usr/bin/env python3
"""Process NAS class images: dedup, compress, organize for website."""

import os
import sys
import hashlib
import subprocess
import shutil
import json
import re
from pathlib import Path
from collections import defaultdict

# -- Config --
NAS_BASE = "/Volumes/cc"
TARGET_BASE = os.path.expanduser("~/art-platform/public/works")
MAX_WIDTH = 1200
JPEG_QUALITY = "80"  # sips uses low/normal/high/best, or numeric for JPEG

# Map NAS student work dirs → website course IDs
STUDENT_DIRS = {
    "我的神奇早餐学生作品": "breakfast",
    "蝴蝶学生作品": "butterfly",
    "人偶作业": "doll",
    "面具学生作品": "mask",
    "7我设计的面具素材": "mask",
    "动物贴纸学生作品": "sticker",
    "四方连续学生作品": "pattern",
}

TEACHER_DIR = "线上课猫猫老师作品/基础课作品"

# Output structure
# public/works/
#   breakfast/   → 吃点什么
#   butterfly/   → 蝴蝶
#   doll/        → 人偶制作
#   mask/        → 我设计的面具
#   sticker/     → 动物贴纸
#   pattern/     → 四方连续
#   teacher/     → 教师示范


def md5_file(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def sips_resize(src, dst, max_width=MAX_WIDTH):
    """Resize and compress image using macOS sips."""
    # sips resizes maintaining aspect ratio, then converts to JPEG
    tmp = dst + ".tmp.jpg"
    subprocess.run(
        ["sips", "-Z", str(max_width), "-s", "format", "jpeg",
         "-s", "formatOptions", "80", src, "--out", tmp],
        capture_output=True, check=True
    )
    os.rename(tmp, dst)
    return os.path.getsize(dst)


def find_images(base_dir):
    """Find all image files in a directory tree."""
    exts = {'.jpg', '.jpeg', '.png', '.heic', '.HEIC', '.JPG', '.JPEG', '.PNG'}
    results = []
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if os.path.splitext(f)[1] in exts:
                results.append(os.path.join(root, f))
    return results


def main():
    # Phase 1: Collect all source images
    print("=" * 60)
    print("Phase 1: Collecting source images")
    print("=" * 60)

    source_map = defaultdict(list)  # category → [paths]

    # Student works
    student_base = os.path.join(NAS_BASE, "线上课学生作品")
    for dir_name, cat_id in STUDENT_DIRS.items():
        src_dir = os.path.join(student_base, dir_name)
        if not os.path.isdir(src_dir):
            print(f"  SKIP (not found): {dir_name}")
            continue
        imgs = find_images(src_dir)
        source_map[cat_id].extend(imgs)
        print(f"  {dir_name} → {cat_id}: {len(imgs)} images")

    # Teacher works
    teacher_src = os.path.join(NAS_BASE, TEACHER_DIR)
    if os.path.isdir(teacher_src):
        imgs = find_images(teacher_src)
        source_map["teacher"].extend(imgs)
        print(f"  Teacher works → teacher: {len(imgs)} images")

    # Phase 2: Dedup within each category
    print("\n" + "=" * 60)
    print("Phase 2: Deduplication")
    print("=" * 60)

    for cat_id in source_map:
        seen = {}
        unique = []
        dupes = 0
        for path in sorted(source_map[cat_id]):
            h = md5_file(path)
            if h not in seen:
                seen[h] = path
                unique.append(path)
            else:
                dupes += 1
        source_map[cat_id] = unique
        print(f"  {cat_id}: {len(unique)} unique, {dupes} duplicates removed")

    # Phase 3: Compress and copy
    print("\n" + "=" * 60)
    print("Phase 3: Compress and organize")
    print("=" * 60)

    report = {}  # category → [relative paths]

    for cat_id, paths in sorted(source_map.items()):
        out_dir = os.path.join(TARGET_BASE, cat_id)
        os.makedirs(out_dir, exist_ok=True)

        cat_report = []
        for i, src_path in enumerate(paths):
            ext = os.path.splitext(src_path)[1].lower()
            base_name = os.path.basename(src_path)
            stem = os.path.splitext(base_name)[0]

            out_name = f"{stem}.jpg"
            out_path = os.path.join(out_dir, out_name)

            # Skip if already processed
            if os.path.exists(out_path):
                rel_path = f"/works/{cat_id}/{out_name}"
                cat_report.append({
                    "path": rel_path,
                    "original": base_name,
                    "size_kb": os.path.getsize(out_path) // 1024,
                })
                print(f"  [{cat_id}] {base_name}: SKIP (already processed)")
                continue

            # Get original size
            orig_size = os.path.getsize(src_path)

            # Compress
            if ext in ('.heic', '.HEIC', '.png', '.PNG') or orig_size > 300 * 1024:
                new_size = sips_resize(src_path, out_path)
                print(f"  [{cat_id}] {base_name}: {orig_size//1024}KB → {new_size//1024}KB")
            else:
                # Already small, just copy
                shutil.copyfile(src_path, out_path)
                new_size = os.path.getsize(out_path)
                print(f"  [{cat_id}] {base_name}: {orig_size//1024}KB (copied)")

            rel_path = f"/works/{cat_id}/{out_name}"
            cat_report.append({
                "path": rel_path,
                "original": base_name,
                "size_kb": new_size // 1024,
            })

        report[cat_id] = cat_report

    # Phase 4: Generate report
    print("\n" + "=" * 60)
    print("Phase 4: Summary")
    print("=" * 60)

    total = 0
    for cat_id, items in sorted(report.items()):
        print(f"  {cat_id}: {len(items)} images")
        total += len(items)
    print(f"  TOTAL: {total} images")
    print(f"  Output: {TARGET_BASE}/")

    # Save report as JSON for updating fallback data
    report_path = os.path.join(os.path.dirname(__file__), "image-report.json")
    with open(report_path, "w") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"  Report saved to: {report_path}")


if __name__ == "__main__":
    main()
