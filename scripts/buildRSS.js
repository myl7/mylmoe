import fs from 'fs'
import dayjs from 'dayjs'
import parsePosts from './parsePosts.js'

const rssPath = './assets/rss.xml'
const formatDate = (date) => dayjs(date).hour(12).minute(0).second(0).format('ddd, DD MMM YYYY HH:mm:ss ZZ')

const itemTemplate = (post) => {
  const pubDate = formatDate(post.pubDate)
  return `\
    <item>
      <title>${post.title}</title>
      <link>https://myl.moe/posts/${post.slug}</link>
      <description />
      <author>myl.ustc@gmail.com (myl7)</author>
      <guid>https://myl.moe/posts/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>
`
}

const posts = parsePosts()
const updDate = posts.map(p => p.updDate).reduce((a, b) => a.localeCompare(b) > 0 ? a : b)
const content = `\
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>mlblog</title>
    <link>https://myl.moe</link>
    <description />
    <language>en</language>
    <copyright>Copyright (c) 2020 myl7</copyright>
    <managingEditor>myl.ustc@gmail.com (myl7)</managingEditor>
    <webMaster>myl.ustc@gmail.com (myl7)</webMaster>
    <pubDate>${formatDate(updDate)}</pubDate>
    <atom:link href="https://myl.moe/rss.xml" rel="self" type="application/rss+xml" />
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
${posts.map(itemTemplate).join('')}\
  </channel>
</rss>
`
fs.writeFileSync(rssPath, content)
