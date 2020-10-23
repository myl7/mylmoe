import fs from 'fs'
import glob from 'glob'
import YAML from 'js-yaml'
import md5 from 'md5'
import dayjs from 'dayjs'

const postPattern = './posts/*.md'
const postEmitPath = './src/posts.json'
const prePosts = JSON.parse(fs.readFileSync(postEmitPath).toString())
const postUrl = (slug) => `/raw/posts/${slug}.md`

export default () => {
  let posts = []
  glob.sync(postPattern).forEach(path => {
    const content = fs.readFileSync(path).toString()
    const sep = content.indexOf('---')
    const header = content.substring(0, sep)
    const body = content.substring(sep + 4)

    let post = YAML.safeLoad(header)

    const setIfNot = (obj, k, v) => {
      if (!obj[k]) obj[k] = v
    }

    const slug = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    setIfNot(post, 'slug', slug)

    const pubDate = slug.substring(0, 10)
    setIfNot(post, 'pubDate', pubDate)

    const prePost = prePosts.find(p => p.slug === slug)
    const hash = md5(body)

    let updDate = prePost.updDate
    if (hash !== prePost.hash) {
      updDate = dayjs().format('YYYY-MM-DD')
    }

    setIfNot(post, 'updDate', updDate)
    post.hash = hash

    setIfNot(post, 'abstract', '')

    post.url = postUrl(slug)
    post.bodyLen = body.length
    post.body = body

    posts.push(post)
  })

  posts.sort((a, b) => {
    const dateCmp = -a.pubDate.localeCompare(b.pubDate)
    return dateCmp === 0 ? -(a.id - b.id) : dateCmp
  })

  return posts
}
