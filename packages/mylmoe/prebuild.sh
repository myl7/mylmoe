#!/bin/bash
set -euo pipefail

esbuild scripts/rss.ts --bundle --platform=node --outfile=scripts/build/rss.js --inject:scripts/react-shim.ts
node scripts/build/rss.js
esbuild scripts/sitemap.ts --bundle --platform=node --outfile=scripts/build/sitemap.js --inject:scripts/react-shim.ts
node scripts/build/sitemap.js
