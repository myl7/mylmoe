addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const genPostItem = post => {
  return `\
  <url>
    <loc>https://myl.moe/posts/${post.slug}</loc>
    <lastmod>${post.updDate}</lastmod>
  </url>
`
}

const handleReq = async () => {
  const list = JSON.parse(await MylmoePostNS.get('list'))

  const updDate = list.map(p => p.updDate).reduce((a, b) => a.localeCompare(b) > 0 ? a : b)
  // noinspection SpellCheckingInspection
  const c = `\
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myl.moe</loc>
    <lastmod>${updDate}</lastmod>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://myl.moe/pages/arcaea</loc>
  </url>
  <url>
    <loc>https://myl.moe/utils/brotli</loc>
  </url>
  <url>
    <loc>https://myl.moe/pages/nonsence</loc>
    <changefreq>hourly</changefreq>
  </url>
  <url>
    <loc>https://myl.moe/pages/friends</loc>
  </url>
  ${list.map(genPostItem).join('')}\
</urlset>
`
  return new Response(c, {headers: {'Content-Type': 'application/xml;charset=utf-8'}})
}
