addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const handleReq = async req => {
  let slug = null
  if (req.method === 'POST') {
    slug = (await req.json()).slug
  }

  if (slug) {
    const ideas = await MylmoeIdeaNS.get(slug)
    return new Response(ideas, {headers: {'Content-Type': 'application/json;charset=utf-8'}})
  } else {
    const slugs = JSON.parse(await MylmoeIdeaNS.get('list'))
    slug = slugs[slugs.length - 1]
    const ideas = JSON.parse(await MylmoeIdeaNS.get(slug))
    return new Response(
      JSON.stringify({slugs: slugs, ideas: ideas}),
      {headers: {'Content-Type': 'application/json;charset=utf-8'}}
    )
  }
}
