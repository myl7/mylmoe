addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const handleReq = async (req) => {
  let page = null
  if (req.method === 'POST') {
    page = (await req.json()).page
  }

  if (page) {
    let res = await MylmoeIdeaNS.get(page)

    if (res === null) {
      return new Response('Idea page not found', {status: 404})
    } else {
      res = JSON.parse(res)
      await enhanceRes(res)

      return new Response(res, {headers: {'Content-Type': 'application/json;charset=utf-8'}})
    }
  } else {
    const latest = JSON.parse(await MylmoeIdeaNS.get('latest'))
    const start = latest.page

    const res = JSON.parse(await MylmoeIdeaNS.get(start.toString()))
    await enhanceRes(res)

    return new Response(res, {headers: {'Content-Type': 'application/json;charset=utf-8'}})
  }
}

const enhanceRes = async (res) => {
  const prePage = res.prev
  if (res.ideas.length < 10 && prePage) {
    const preRes = JSON.parse(await MylmoeIdeaNS.get(prePage))

    res.ideas = [...preRes.ideas, ...res.ideas]
    res.prev = preRes.prev
  }
}
