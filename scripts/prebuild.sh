#!/bin/bash
set -euo pipefail

# Copyright (c) 2020-2022 myl7
# SPDX-License-Identifier: Apache-2.0

mkdir -p data
mkdir -p storage/images
node scripts/esbuild.mjs scripts/genGetMdxPostsViaStaticImport.ts scripts/build/genGetMdxPostsViaStaticImport.mjs
node scripts/build/genGetMdxPostsViaStaticImport.mjs
node scripts/esbuild.mjs next.config.ts next.config.mjs
node scripts/esbuild.mjs scripts/rss.ts scripts/build/rss.mjs
node --experimental-loader=@mdx-js/node-loader scripts/build/rss.mjs
node scripts/esbuild.mjs scripts/sitemap.ts scripts/build/sitemap.mjs
node --experimental-loader=@mdx-js/node-loader scripts/build/sitemap.mjs
node scripts/esbuild.mjs scripts/tagrel.ts scripts/build/tagrel.mjs
node --experimental-loader=@mdx-js/node-loader scripts/build/tagrel.mjs
