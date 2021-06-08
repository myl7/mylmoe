import path from 'path'
import fs from 'fs'
import parse from '../remark/parse'
import {PostInfo} from '../remark/post'

const cache = {} as {[key: string]: PostInfo[]|null}

const getPosts = (folder: string = 'posts') => {
  if (!cache[folder]) {
    const postDir = path.join(process.cwd(), 'config', folder)
    const names = fs.readdirSync(postDir)
    cache[folder] = names.filter(name => name.endsWith('.md')).map(name => {
      const filePath = path.join(postDir, name)
      const content = fs.readFileSync(filePath).toString()
      return parse(name, content)
    })
  }
  return cache[folder]!
}

export default getPosts
