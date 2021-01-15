#!/bin/bash
set -euo pipefail

mode="${1-prod}"

# Use esbuild to bundle js
# $1 -> Mode, prod or dev, no default
function bundle-js() {
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

rm -rf dist

bundle-js "$mode"

mkdir -p dist/images
cp -r images/* dist/images/

mkdir -p dist/wasm
cp node_modules/brotli-dec-wasm/pkg/brotli-dec-wasm_bg.wasm dist/wasm/

# Tmp public build dir
mkdir -p dist/tmp
cp -r public/* dist/tmp/

# Set hash
hash=$(md5sum dist/index.js | cut -c 1-5)
mv dist/index.js "dist/index.$hash.js"
sed -i "s/{{html_hash}}/$hash/g" dist/tmp/index.html

# Preload chunks
if [ "$mode" == prod ]; then
  for f in dist/*.js; do
    if [ "${f:5:5}" == chunk ]; then
      sed -i "16a <link rel=\"preload\" as=\"script\" href=\"${f:4}\" crossorigin=\"anonymous\">" dist/tmp/index.html
    fi
  done
fi

# Remove google analytics in dev
if [ "$mode" != prod ]; then
  sed -i 4,10d dist/tmp/index.html
fi

node scripts/inline-css.js

html-minifier --collapse-whitespace --remove-comments --minify-css true --minify-js true \
  --input-dir dist/tmp --output-dir dist -o dist/index.html

rm -rf dist/tmp
