import dayjs from 'dayjs'

addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const formatDate = (date) =>
  dayjs(date).hour(0).minute(0).second(0).format('ddd, DD MMM YYYY HH:mm:ss ZZ')

const genItem = (post) => {
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

const handleReq = async () => {
  const list = JSON.parse(await MylmoePostNS.get('list'))

  const updDate = list.map(p => p.updDate).reduce((a, b) => a.localeCompare(b) > 0 ? a : b)
  const c = `\
<?xml version="1.0" encoding="UTF-8"?>
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
    <atom:link href="https://myl.moe/rss" rel="self" type="application/rss+xml" />
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
${list.map(genItem).join('')}\
  </channel>
</rss>
`

  return new Response(c, {headers: {'Content-Type': 'application/rss+xml;charset=utf-8'}})
}
