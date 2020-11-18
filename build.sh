#!/bin/bash
set -euo pipefail

rm -rf ./dist
esbuild ./src/index.jsx \
  --outdir=./dist \
  --bundle \
  --minify \
  --splitting \
  --format=esm \
  --target=es6 \
  --define:process.env.NODE_ENV='"production"'
