import fs from 'fs'
import glob from 'glob'
import YAML from 'js-yaml'

const postPattern = './posts/*.md'

const getPostUrl = (slug) => `/raw/posts/${slug}.md`

export default () => {
  const postPaths = glob.sync(postPattern)

  let postMeta = []
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
    const pubDate = slug.substring(0, 10)
    setIfNot(meta, 'pubDate', pubDate)
    const updDate = pubDate
    setIfNot(meta, 'updDate', updDate)
    setIfNot(meta, 'abstract', '')

    meta.url = getPostUrl(slug)
    meta.bodyLen = body.length

    postMeta.push(meta)
  })

  postMeta.sort((a, b) => {
    const dateCmp = -a.updDate.localeCompare(b.updDate)
    return dateCmp === 0 ? -(a.id - b.id) : dateCmp
  })
  return {meta: postMeta}
}
