#!/bin/bash
set -euo pipefail

mkdir -p data
mkdir -p storage/images
esbuild next.config.ts --bundle --platform=node --outfile=next.config.js --inject:scripts/misc/react-shim.ts
esbuild scripts/rss.ts --bundle --platform=node --outfile=scripts/build/rss.js --inject:scripts/misc/react-shim.ts
node scripts/build/rss.js
esbuild scripts/sitemap.ts --bundle --platform=node --outfile=scripts/build/sitemap.js --inject:scripts/misc/react-shim.ts
node scripts/build/sitemap.js
esbuild scripts/tagrel.ts --bundle --platform=node --outfile=scripts/build/tagrel.js --inject:scripts/misc/react-shim.ts
node scripts/build/tagrel.js
