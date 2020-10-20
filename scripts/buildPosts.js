import fs from 'fs'
import parsePosts from './parsePosts.js'

const postMetaPath = './src/posts.json'

const postMeta = parsePosts().meta
const content = JSON.stringify(postMeta, null, 2) + '\n'
fs.writeFileSync(postMetaPath, content)
