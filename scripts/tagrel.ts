// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { getPosts } from '../utils/posts'
import fs from 'fs'
import path from 'path'

// @ts-ignore
const posts = await getPosts()
const tags = Array.from(new Set(posts.flatMap(post => post.meta.tags.split(' '))))
const rel = tags.map(tag => {
  // @ts-ignore
  const taggedPosts = posts.filter(post => post.meta.tags.split(' ').indexOf(tag) != -1)
  return [tag, taggedPosts.map(post => post.meta)]
})
const res = JSON.stringify(rel)
fs.writeFileSync(path.join(process.cwd(), 'data', 'tagrel.json'), res)
