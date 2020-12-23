addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*'
}

const handleReq = async (req) => {
  let sel = ''
  if (req.method === 'POST') {
    sel = (await req.json()).slug
  }

  if (sel) {
    const post = await MylmoePostNS.get(sel)

    if (post === null) {
      return new Response('Post not found', {status: 404, headers: corsHeaders})
    } else {
      return new Response(post, {headers: {'content-type': 'application/json;charset=utf-8', ...corsHeaders}})
    }
  } else {
    const list = await MylmoePostNS.get('list')

    return new Response(list, {headers: {'content-type': 'application/json;charset=utf-8', ...corsHeaders}})
  }
}
