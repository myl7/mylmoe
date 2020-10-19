import fs from 'fs'
import parsePosts from './parsePosts.js'

const postMetaPath = './src/posts.js'

const postMeta = parsePosts().meta
const postMetaContent = 'let posts = ' + JSON.stringify(postMeta, null, 2)

let content = `\
${postMetaContent}

if (process.env.NODE_ENV === 'development') {
  const getPostMockUrl = (slug) => \`http://127.0.0.1:8080/raw/posts/\${slug}.md\`
  posts = posts.map(meta => {
    meta.url = getPostMockUrl(meta.slug)
    return meta
  })
}

export default posts
`
content = content.replace(/"/g, '\'')
fs.writeFileSync(postMetaPath, content)
