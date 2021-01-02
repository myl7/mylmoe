addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const handleReq = async (req) => {
  let cursor = null
  if (req.method === 'POST') {
    cursor = (await req.json()).cursor
  }

  const res = await MylmoeIdeaNS.list({limit: 20, cursor: cursor ? cursor : undefined})
  const ret = {ideas: []}

  for (const key of res.keys) {
    const idea = JSON.parse(await MylmoeIdeaNS.get(key.name))
    ret.ideas.push(idea)
  }

  if (!res.list_complete) {
    ret.cursor = res.cursor
  }

  return new Response(JSON.stringify(ret), {headers: {'Content-Type': 'application/json;charset=utf-8'}})
}
