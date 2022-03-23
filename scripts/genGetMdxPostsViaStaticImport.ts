import path from 'path'
import fs from 'fs'
import md5 from 'md5'

const getNames = (folder: string = 'posts') => {
  const postDir = path.join(process.cwd(), 'pages', folder)
  return fs.readdirSync(postDir).filter(name => name.endsWith('.mdx'))
}

const folders = ['posts', 'pages']

const importSrc = `\
import parseMeta from '../remark/parseMeta'
${getNames('posts')
  .map(name => ({ name, p: path.join(process.cwd(), 'pages', 'posts', name) }))
  .map(({ name, p }) => `// @ts-ignore\nimport { meta as ${'meta_' + md5(name)} } from '${p}'\n`)
  .join('')}
${getNames('pages')
  .map(name => ({ name, p: path.join(process.cwd(), 'pages', 'posts', name) }))
  .map(({ name, p }) => `// @ts-ignore\nimport { meta as ${'meta_' + md5(name)} } from '${p}'\n`)
  .join('')}
`

const funcSrc = `\
const getMdxPostsViaStaticImport = (names: string[], folder: string) => {
  if (folder == 'posts') {
    return [
      ${getNames('posts')
        .map(
          name =>
            `{ meta: parseMeta('${name}'.substring(0, '${name}'.length - '.mdx'.length), ${
              'meta_' + md5(name)
            }, \`/\${folder}/\`) },\n`
        )
        .join('')}
    ]
  } else if (folder == 'pages') {
    return [
      ${getNames('pages')
        .map(
          name =>
            `{ meta: parseMeta('${name}'.substring(0, '${name}'.length - '.mdx'.length), ${
              'meta_' + md5(name)
            }, \`/\${folder}/\`) },\n`
        )
        .join('')}
    ]
  } else {
    console.error('Invalid folder:', folder)
    process.exit(1)
  }
}
`

const exportSrc = 'export default getMdxPostsViaStaticImport\n'

const res = [importSrc, funcSrc, exportSrc].join('\n')
fs.writeFileSync(path.join(process.cwd(), 'utils', 'getMdxPostsViaStaticImport.ts'), res)
