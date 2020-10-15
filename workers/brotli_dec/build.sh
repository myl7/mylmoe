#!/bin/bash
rm -rf ./dist
./node_modules/.bin/esbuild --target=chrome86 --format=esm --outdir=./dist --bundle index.js
cp ./node_modules/brotli_dec_wasm/brotli_dec_wasm_bg.wasm ./dist/
