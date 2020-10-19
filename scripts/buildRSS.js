import fs from 'fs'
import dayjs from 'dayjs'
import parsePosts from './parsePosts.js'

const rssPath = './assets/rss.xml'

const itemTemplate = (meta) => {
  const date = dayjs(meta.date).hour(12).minute(0).second(0).format('ddd, DD MMM YYYY HH:mm:ss ZZ')
  return `\
    <item>
      <title>${meta.title}</title>
      <link>https://myl.moe/posts/${meta.slug}</link>
      <description />
      <author>myl.ustc@gmail.com (myl7)</author>
      <guid>https://myl.moe/posts/${meta.slug}</guid>
      <pubDate>${date}</pubDate>
    </item>
`
}

const postMeta = parsePosts().meta
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
    <atom:link href="https://myl.moe/rss.xml" rel="self" type="application/rss+xml" />
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
${postMeta.map(itemTemplate).join('')}\
  </channel>
</rss>
`
fs.writeFileSync(rssPath, content)
