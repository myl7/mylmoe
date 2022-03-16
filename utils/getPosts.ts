// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import path from 'path'
import fs from 'fs'
import parse from '../remark/parse'
import lodash from 'lodash'

const getPosts = lodash.memoize((folder: string = 'posts') => {
  const postDir = path.join(process.cwd(), 'content', folder)
  const names = fs.readdirSync(postDir)
  return names
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(postDir, name)
      const content = fs.readFileSync(filePath).toString()
      return parse(name, content, folder ? `/${folder}/` : undefined)
    })
})

export default getPosts
