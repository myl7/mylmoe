import fs from 'fs'
import getPostMeta from './getPostMeta.js'

const rssPath = './src/rss.xml'

const itemTemplate = (meta) => `\
    <item>
      <title>${meta.title}</title>
      <link>https://myl.moe/posts/${meta.slug}</link>
      <description />
      <author>myl7</author>
      <guid>https://myl.moe/posts/${meta.slug}</guid>
      <pubDate>${meta.date}</pubDate>
    </item>
`

const postMeta = getPostMeta()
const content = `\
<rss version="2.0">
  <channel>
    <title>mlblog</title>
    <link>https://myl.moe</link>
    <description />
    <language>en</language>
    <copyright>Copyright (c) 2020 myl7</copyright>
    <managingEditor>myl.ustc@gmail.com (myl7)</managingEditor>
    <webMaster>myl.ustc@gmail.com (myl7)</webMaster>
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
${postMeta.map(itemTemplate).join('')}\
  </channel>
</rss>
`
fs.writeFileSync(rssPath, content)
