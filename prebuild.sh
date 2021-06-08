#!/bin/bash
set -euo pipefail

esbuild scripts/rss.ts --bundle --platform=node --outfile=scripts/rss.js
node scripts/rss.js
esbuild scripts/sitemap.ts --bundle --platform=node --outfile=scripts/sitemap.js
node scripts/sitemap.js
