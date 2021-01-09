#!/bin/bash
set -euo pipefail

# Use esbuild to bundle
# $1 -> Mode, prod or dev, no default
function bundle() {
  cmd='esbuild src/index.jsx --log-level=error --outdir=dist --bundle --format=esm --target=es6'
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
mkdir -p dist/images
cp -r images/* dist/images/
mkdir -p dist/wasm
cp node_modules/brotli-dec-wasm/pkg/brotli-dec-wasm_bg.wasm dist/wasm/

# Set hash
hash=$(md5sum dist/index.js | cut -c 1-5)
mv dist/index.js dist/index.$hash.js
sed -i s/{{hash}}/$hash/g dist/index.html
