#!/bin/bash
set -euo pipefail

bundle() {
  case "$1" in
  prod)
    esbuild ./src/index.jsx \
      --outdir=./dist \
      --bundle \
      --minify \
      --splitting \
      --format=esm \
      --target=es6 \
      --define:process.env.NODE_ENV='"production"'
    ;;
  dev)
    esbuild ./src/index.jsx \
      --outdir=./dist \
      --bundle \
      --splitting \
      --format=esm \
      --target=es6 \
      --sourcemap \
      --define:process.env.NODE_ENV='"development"'
    ;;
  *)
    echo "No such option: $1"
    ;;
  esac
}

rm -rf ./dist
bundle "${1-dev}"
cp ./public/* ./dist/
