#!/bin/bash
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "Usage: $0 <input> <output>"
  exit 1
fi

magick "$1" -resize x630 -gravity Center -background white -extent 1200x630 "$2"
