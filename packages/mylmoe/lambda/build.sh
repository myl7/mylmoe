#!/bin/bash
set -euo pipefail

rm -rf build build.zip
mkdir -p build
cp lambda_function.py build/
pip install --target=build -r requirements.txt
(cd build && zip -r ../build.zip .)
