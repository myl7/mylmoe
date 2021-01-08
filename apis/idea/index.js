addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const handleReq = async req => {
  let page
  if (req.method === 'POST') {
    page = (await req.json()).page
  } else {
    page = parseInt(await MylmoeIdeaNS.get('latest'))
  }

  const ideaText = await MylmoeIdeaNS.get(page.toString())
  const ideas = ideaText.split('\n---\n\n')

  return new Response(JSON.stringify(ideas), {headers: {'Content-Type': 'application/json;charset=utf-8'}})
}
