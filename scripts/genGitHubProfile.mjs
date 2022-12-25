// To sync the GitHub profile with the one of mylmoe

import fs from 'fs'

const lines = (await fs.promises.readFile('app/myl7.md', 'utf8')).trim().split('\n')
// Currently no front matter so comment it
// const fmStart = lines.findIndex((line) => line == '---')
// lines.splice(0, fmStart + 1)
// const fmEnd = lines.findIndex((line) => line == '---')
// lines.splice(0, fmEnd + 1)
const hStart = lines.findIndex((line) => line.startsWith('<!--') && line.endsWith('-->'))
const hEnd = lines.slice(hStart + 1).findIndex((line) => line.startsWith('<!--') && line.endsWith('-->')) + hStart + 1
lines.splice(
  hEnd + 1,
  0,
  ...[
    '',
    '# Hi, I am myl7!',
    '',
    "![myl7's GitHub Stats](https://github-readme-stats.vercel.app/api?username=myl7&count_private=true&theme=gruvbox&show_icons=true)",
  ]
)
process.stdout.write(lines.join('\n') + '\n')
