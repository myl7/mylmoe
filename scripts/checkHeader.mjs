// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

// Check if there is file header (copyright and license notice) missing

import fs from 'fs'
import path from 'path'
import { globby } from 'globby'

const GLOB = ['{app,scripts,pages,public/raw/posts}/**/*.{js,mjs,jsx,ts,tsx,json,css,md,mdx}', 'next.config.js']
const INCLUDE = null
// JSON can not have comments
const EXCLUDE = [/\.json$/, 'app/nmconn/nmconnTemplate.ts']

const fpaths = (await globby(GLOB))
  .map((fpath) => path.resolve(fpath))
  .filter((fpath) =>
    INCLUDE ? INCLUDE.some((pattern) => fpath.match(pattern)) : !EXCLUDE.some((pattern) => fpath.match(pattern))
  )
const results = (
  await Promise.all(
    fpaths.map(async (fpath) => {
      const text = await fs.promises.readFile(fpath, 'utf8')
      const err = checkHeader(text, fpath)
      return { err, fpath }
    })
  )
).filter(({ err }) => err)
if (results.length > 0) {
  results.forEach(({ err, fpath }) => console.error(`${path.relative(process.cwd(), fpath)}:`, err))
  process.exit(1)
}

/**
 * @param {string} text
 * @param {string} fpath
 */
function checkHeader(text, fpath) {
  // Empty files do not need the header
  if (!text) return null
  const lines = text.split('\n').filter(Boolean)
  if (lines[0].startsWith('#!')) {
    lines.splice(0, 1)
  }
  if (lines[0].match(/^['"]use /)) {
    lines.splice(0, 1)
  }
  if (fpath.match(/\.mdx?$/)) {
    const start = lines.findIndex((line) => line == '---')
    lines.splice(0, start + 1)
    const end = lines.findIndex((line) => line == '---')
    lines.splice(0, end + 1)
  }
  if (fpath.match(/\.css$/) && lines[0] == '/*') {
    lines.splice(0, 1)
  }
  if (lines.length < 2) {
    return 'Too short to include the header'
  }
  if (!lines[0].match(/Copyright \(C\) .+/) || !lines[1].match(/SPDX-License-Identifier: [^ ]+/)) {
    return 'Invalid license header'
  }
  return null
}
