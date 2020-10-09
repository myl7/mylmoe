import fs from 'fs'
import getPostMeta from './getPostMeta.js'

const postMetaPath = './src/posts.js'

const postMeta = getPostMeta()
let postExport = 'export default ' + JSON.stringify(postMeta, null, 2)
postExport = postExport.replace(/"url(\d+)"/g, (_m, id) => `url${id}`)
postExport = postExport.replace(/'/g, '"')

let postImport = ''
postMeta.forEach(meta => {
  postImport += `import url${meta.id} from './posts/${meta.slug}.md'\n`
})

const content = `${postImport}\n${postExport}\n`
fs.writeFileSync(postMetaPath, content)
