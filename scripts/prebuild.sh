#!/bin/bash
set -euo pipefail

# Copyright (c) 2020-2022 myl7
# SPDX-License-Identifier: Apache-2.0

mkdir -p data
mkdir -p storage/images
esbuild next.config.ts --bundle --platform=node --outfile=next.config.mjs --external:./node_modules/'*' --target=es2020 --format=esm --inject:scripts/misc/react-shim.ts
esbuild scripts/rss.ts --bundle --platform=node --outfile=scripts/build/rss.mjs --external:./node_modules/'*' --target=es2020 --format=esm --inject:scripts/misc/react-shim.ts
node scripts/build/rss.mjs
esbuild scripts/sitemap.ts --bundle --platform=node --outfile=scripts/build/sitemap.mjs --external:./node_modules/'*' --target=es2020 --format=esm --inject:scripts/misc/react-shim.ts
node scripts/build/sitemap.mjs
esbuild scripts/tagrel.ts --bundle --platform=node --outfile=scripts/build/tagrel.mjs --external:./node_modules/'*' --target=es2020 --format=esm --inject:scripts/misc/react-shim.ts
node scripts/build/tagrel.mjs
