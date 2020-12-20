#!/bin/bash
set -euo pipefail

# Use esbuild to bundle
# $1 -> Mode, prod or dev, no default
function bundle() {
  cmd='esbuild src/index.jsx --outdir=dist --bundle --format=esm --target=es6'
  case "$1" in
  prod)
    $cmd --minify --splitting --define:process.env.NODE_ENV='"production"'
    ;;
  dev)
    $cmd --sourcemap --define:process.env.NODE_ENV='"development"'
    ;;
  *)
    echo "Unexpected mode: $1"
    ;;
  esac
}

# Gen output
rm -rf dist
bundle "${1-prod}"
cp public/* dist/

# Set hash
hash=$(md5sum dist/index.js | cut -c 1-5)
mv dist/index.js dist/index.$hash.js
sed -i s/{{hash}}/$hash/g dist/index.html
