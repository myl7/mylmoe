import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

const handleReq = async (req) => {
  if (!req.headers.has('Authorization')) {
    return new Response(null, {
      status: 401,
      headers: {'WWW-Authenticate': 'Basic realm="mylmoe admin secret"'}
    })
  }

  const auth = req.headers.get('Authorization')
  if (auth.substring(0, 6) !== 'Basic ') {
    return new Response(null, {status: 403})
  }

  let secret = null
  try {
    secret = atob(auth.substring(6))
  } catch (e) {
    return new Response(null, {status: 403})
  }

  if (secret !== SECRET) {
    return new Response(null, {status: 403})
  }

  const idea = await req.json()

  for (const attr of ['title', 'body', 'pubTime']) {
    if (!idea[attr]) {
      return new Response('Invalid ' + attr, {status: 400})
    }
  }

  const num = Math.trunc(dayjs.utc('2100-01-01T00:00:00').diff(dayjs.utc(idea.pubTime)) / 1000)
  const key = num.toString().padStart(13)

  await MylmoeIdeaNS.put(key, JSON.stringify(idea))
  return new Response(null, {status: 201})
}
