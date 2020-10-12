import fs from 'fs'
import parsePosts from './parsePosts.js'

const postMetaPath = './src/posts.js'

const posts = parsePosts()

const postMeta = posts.meta
let postExport = 'export default ' + JSON.stringify(postMeta, null, 2)
postExport = postExport.replace(/"url(\d+)"/g, (_m, id) => `url${id}`)
postExport = postExport.replace(/'/g, '"')

const postImport = postMeta.map(meta => `import url${meta.id} from './posts/${meta.slug}.md'\n`).join('')

const postImageImport = posts.images.map(image => `import '../assets/images/${image}'\n`).join('')

const jbNoinspection = '// noinspection SpellCheckingInspection\n'

const content = `${postImport}${postImageImport}\n${jbNoinspection}${postExport}\n`
fs.writeFileSync(postMetaPath, content)
