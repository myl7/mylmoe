import path from 'path'
import fs from 'fs'
import parse from '../remark/parse'
import lodash from 'lodash'

const getPosts = lodash.memoize((folder: string = 'posts') => {
  const postDir = path.join(process.cwd(), 'config', folder)
  const names = fs.readdirSync(postDir)
  return names.filter(name => name.endsWith('.md')).map(name => {
    const filePath = path.join(postDir, name)
    const content = fs.readFileSync(filePath).toString()
    return parse(name, content)
  })
})

export default getPosts
