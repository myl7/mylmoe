#!/bin/bash
set -euo pipefail

esbuild scripts/rss.ts --bundle --platform=node --outfile=scripts/rss.js --inject:scripts/react-shim.ts
node scripts/rss.js
esbuild scripts/sitemap.ts --bundle --platform=node --outfile=scripts/sitemap.js --inject:scripts/react-shim.ts
node scripts/sitemap.js
