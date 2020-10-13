import fs from 'fs'
import glob from 'glob'
import YAML from 'js-yaml'

const postPattern = './src/posts/*.md'

export default () => {
  const postPaths = glob.sync(postPattern)

  let postMeta = []
  let postImages = []
  postPaths.forEach((postPath) => {
    let content = fs.readFileSync(postPath).toString()
    const sep = content.indexOf('---')
    const header = content.substring(0, sep)
    const body = content.substring(sep + 4)

    let meta = YAML.safeLoad(header)

    const setIfNot = (obj, k, v) => {
      if (!obj[k]) obj[k] = v
    }
    const slug = postPath.substring(postPath.lastIndexOf('/') + 1, postPath.lastIndexOf('.'))
    setIfNot(meta, 'slug', slug)
    const date = slug.substring(0, 10)
    setIfNot(meta, 'date', date)

    meta.url = 'url' + meta.id

    postMeta.push(meta)

    const imageMatch = body.matchAll(/!\[.+?]\(\.\/images\/(.+?)\)/g)
    postImages.push(...[...imageMatch].map(m => m[1]))
  })

  postMeta.sort((a, b) => -a.date.localeCompare(b.date))
  return {meta: postMeta, images: postImages}
}
