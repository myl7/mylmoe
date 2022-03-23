// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import path from 'path'
import fs from 'fs'
import parse from '../remark/parse'
import parseMeta from '../remark/parseMeta'
import lodash from 'lodash'
import { PostInfo, RawMeta } from '../remark/post'
import getMdxPostsViaStaticImport from './getMdxPostsViaStaticImport'

export const getMdPosts = lodash.memoize((folder: string = 'posts') => {
  const postDir = path.join(process.cwd(), 'content', folder)
  const names = fs.readdirSync(postDir)
  return names
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(postDir, name)
      const content = fs.readFileSync(filePath).toString()
      return parse(name, content, `/${folder}/`)
    })
})

export const getMdxPosts = lodash.memoize(async (folder: string = 'posts') => {
  const postDir = path.join(process.cwd(), 'pages', folder)
  const names = fs.readdirSync(postDir).filter(name => name.endsWith('.mdx'))
  if (typeof getMdxPostsViaStaticImport != undefined) {
    return getMdxPostsViaStaticImport(names, folder)
  } else {
    return await getMdxPostsViaDynamicImport(names, folder)
  }
})

const getMdxPostsViaDynamicImport = async (names: string[], folder: string) => {
  const posts = [] as PostInfo[]
  for (const name of names) {
    // FIXME: But dynamic import is not supported by esbuild
    const rawMeta = await import(
      /* webpackInclude: /\.mdx$/ */
      /* webpackMode: "eager" */
      `../pages/posts/${name}`
    ).then(m => m.meta as RawMeta)
    posts.push({ meta: parseMeta(name.substring(0, name.length - '.mdx'.length), rawMeta, `/${folder}/`) })
  }
  return posts
}

export const getPosts = async (folder: string = 'posts') => [...getMdPosts(folder), ...(await getMdxPosts(folder))]
