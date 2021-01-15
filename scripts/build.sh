#!/bin/bash
set -euo pipefail

mode="${1-prod}"

# Use esbuild to bundle
# $1 -> Mode, prod or dev, no default
function bundle() {
  cmd='esbuild src/index.jsx --log-level=error --outdir=dist --bundle --format=esm --target=es6 --loader:.md=text'
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
bundle "$mode"
cp public/* dist/
mkdir -p dist/images
cp -r images/* dist/images/
mkdir -p dist/wasm
cp node_modules/brotli-dec-wasm/pkg/brotli-dec-wasm_bg.wasm dist/wasm/

# Set hash
html_hash=$(md5sum dist/index.js | cut -c 1-5)
mv dist/index.js "dist/index.$html_hash.js"
css_hash=$(md5sum dist/index.css | cut -c 1-5)
mv dist/index.css "dist/index.$css_hash.css"

sed -i "s/{{html_hash}}/$html_hash/g" dist/index.html
sed -i "s/{{css_hash}}/$css_hash/g" dist/index.html

# Preload chunks
if [ "$mode" == prod ]; then
  for f in dist/*.js; do
    if [ "${f:5:5}" == chunk ]; then
      sed -i "17a <link rel=\"preload\" href=\"${f:4}\" as=\"script\">" dist/index.html
    fi
  done
fi

# Remove google analytics in dev
if [ "$mode" != prod ]; then
  sed -i 4,10d dist/index.html
fi
