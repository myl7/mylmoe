#!/bin/bash
set -euo pipefail

rm -rf build build.zip
mkdir -p build
cp lambda_function.py build/
pip install --target=build -r requirements.txt
zip -r build.zip build
