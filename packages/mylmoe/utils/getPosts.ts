import path from 'path'
import fs from 'fs'
import parse from '../remark/parse'
import {PostInfo} from '../remark/post'

let posts: PostInfo[]|null = null

const getPosts = () => {
  if (!posts) {
    const postDir = path.join(process.cwd(), 'config', 'posts')
    const names = fs.readdirSync(postDir)
    posts = names.filter(name => name.endsWith('.md')).map(name => {
      const filePath = path.join(postDir, name)
      const content = fs.readFileSync(filePath).toString()
      return parse(name, content)
    })
  }
  return posts
}

export default getPosts
