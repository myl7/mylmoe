import getPosts from '../utils/getPosts'
import fs from 'fs'
import path from 'path'

const tags = Array.from(new Set(getPosts().flatMap(post => post.meta.tags.split(' '))))
const rel = tags.map(tag => {
  const posts = getPosts().filter(post => post.meta.tags.split(' ').indexOf(tag) != -1)
  return [tag, posts.map(post => post.meta)]
})
const res = JSON.stringify(rel)
fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'tagrel.json'), res)
