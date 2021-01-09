#!/bin/bash
set -euo pipefail

# Fix git submodule for AWS Amplify build
git config --file=.gitmodules submodule.images.url https://github.com/myl7/mylmoe-images
git config --file=.gitmodules submodule.images.branch goshujin-sama
git submodule sync --recursive
git submodule update --init --remote --recursive
