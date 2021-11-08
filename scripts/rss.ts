import site from '../content/site'
import getPosts from '../utils/getPosts'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'

const posts = getPosts()
const postDate = posts.map(post => post.meta.updDate).reduce((a, b) => a > b ? a : b)

const rfc822 = (s: string) => dayjs(s).format('ddd, DD MMM YYYY HH:mm:ss +0800')

const items = posts.map(post => {
  const {title, excerpt, updDate, path} = post.meta
  return `\
    <item>
      <title>${title}</title>
      <link>${site.url + path}</link>
      <description>${excerpt}</description>
      <pubDate>${rfc822(updDate)}</pubDate>
      <guid>${site.url + path}</guid>
    </item>`
})

const res = `\
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>mylmoe</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>zh-cn</language>
    <copyright>Copyright 2020-2021 myl7</copyright>
    <lastBuildDate>${rfc822(postDate)}</lastBuildDate>
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
    <generator>myl7/mylmoe</generator>
    <managingEditor>myl@myl.moe (myl7)</managingEditor>
    <webMaster>myl@myl.moe (myl7)</webMaster>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`
fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), res)
