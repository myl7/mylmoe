// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// To sync GitHub profile and the profile page in mylmoe

import fs from 'fs'

const lines = (await fs.promises.readFile('posts/myl7.md', 'utf8')).split('\n')
const fmStart = lines.findIndex((line) => line == '---')
lines.splice(0, fmStart + 1)
const fmEnd = lines.findIndex((line) => line == '---')
lines.splice(0, fmEnd + 1)
const hStart = lines.findIndex((line) => line.startsWith('<!--') && line.endsWith('-->'))
const hEnd = lines.slice(hStart + 1).findIndex((line) => line.startsWith('<!--') && line.endsWith('-->')) + hStart + 1
lines.splice(hEnd + 1, 0, ...[
  '',
  '# Hi, I am myl7!',
  '',
  "![myl7's GitHub Stats](https://github-readme-stats.vercel.app/api?username=myl7&count_private=true&theme=gruvbox&show_icons=true)",
])
process.stdout.write(lines.join('\n').trimStart())
