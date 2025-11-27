#!/bin/bash
# Batch thumbnail generator using ImageMagick
# Converts images to WebP, resizes to constant width, strips EXIF

# === CONFIG ===
INPUT_DIR="./gallery"       # Folder with original images
OUTPUT_DIR="./gallery/thumbnails"  # Folder for thumbnails
WIDTH=400                  # Desired thumbnail width in pixels
QUALITY=85                 # WebP quality (0-100)

# === SETUP ===
mkdir -p "$OUTPUT_DIR"

echo "Generating thumbnails..."
echo "Input:  $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo "Width:  ${WIDTH}px"
echo "Quality:${QUALITY}"

# === PROCESS ===
for img in "$INPUT_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  [ -e "$img" ] || continue  # Skip if no files found
  filename=$(basename "$img")
  name="${filename%.*}"
  output="$OUTPUT_DIR/${name}.webp"

  echo "→ Processing: $filename"
  convert "$img" -resize "${WIDTH}" -strip -quality $QUALITY "$output"
done

echo "✅ All thumbnails created in $OUTPUT_DIR"

