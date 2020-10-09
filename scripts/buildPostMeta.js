import fs from 'fs'
import glob from 'glob'
import YAML from 'js-yaml'

const postPattern = './src/posts/*.md'
const postMetaPath = './src/posts.js'

const postPaths = glob.sync(postPattern)

let postMeta = []
postPaths.forEach((postPath) => {
  let content = fs.readFileSync(postPath).toString()
  const header = content.substring(0, content.indexOf('---'))
  let meta = YAML.safeLoad(header)

  const setIfNot = (obj, k, v) => {
    if (!obj[k]) obj[k] = v
  }
  const slug = postPath.substring(postPath.lastIndexOf('/') + 1, postPath.lastIndexOf('.'))
  setIfNot(meta, 'slug', slug)
  const date = slug.substring(0, 10)
  setIfNot(meta, 'date', date)

  meta.url = 'url' + meta.id

  postMeta.push(meta)
})

postMeta.sort((a, b) => -a.date.localeCompare(b.date))
let postExport = 'export default ' + JSON.stringify(postMeta, null, 2)
postExport = postExport.replace(/"url(\d+)"/g, (_m, id) => `url${id}`)
postExport = postExport.replace(/'/g, '"')

let postImport = ''
postMeta.forEach(meta => {
  postImport += `import url${meta.id} from './posts/${meta.slug}.md'\n`
})

const content = `${postImport}\n${postExport}\n`
fs.writeFileSync(postMetaPath, content)
