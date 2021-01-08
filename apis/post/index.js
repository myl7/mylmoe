addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const handleReq = async (req) => {
  let slug = null
  if (req.method === 'POST') {
    slug = (await req.json()).slug
  }

  if (slug) {
    const post = await MylmoePostNS.get(slug)

    if (post === null) {
      return new Response('Post not found', {status: 404})
    } else {
      return new Response(post, {headers: {'Content-Type': 'application/json;charset=utf-8'}})
    }
  } else {
    const list = await MylmoePostNS.get('list')

    return new Response(list, {headers: {'Content-Type': 'application/json;charset=utf-8'}})
  }
}
