import site from '../content/site'
import getPosts from '../utils/getPosts'
import fs from 'fs'
import path from 'path'
import friends from '../content/friends'

const posts = getPosts()
const postDate = posts.map(post => post.meta.updDate).reduce((a, b) => (a > b ? a : b))
const pages = getPosts('pages')

const items = [
  { path: '/', date: postDate },
  ...posts.map(post => ({ path: post.meta.path, date: post.meta.updDate })),
  ...pages.map(post => ({ path: post.meta.path, date: post.meta.updDate })),
  { path: '/pages/friends', date: friends.updDate },
  { path: '/utils/brotli', date: null },
].map(({ path, date }) =>
  date
    ? `\
  <url>
    <loc>${site.url + path}</loc>
    <lastmod>${date}</lastmod>
  </url>`
    : `\
  <url>
    <loc>${site.url + path}</loc>
  </url>`
)

const res = `\
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>
`
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), res)
