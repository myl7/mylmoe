import fs from 'fs'
import parsePosts from './parsePosts.js'

const postEmitPath = './src/posts.json'

const posts = parsePosts()
posts.forEach(post => delete post.body)

const content = JSON.stringify(posts, null, 2) + '\n'
fs.writeFileSync(postEmitPath, content)
