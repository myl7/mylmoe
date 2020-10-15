const brotliDecWasm = import('brotli_dec_wasm')

const handler = async (formData) => {
  let {brotli_dec} = await brotliDecWasm

  let data = {
    songTitle: null,
    userInfo: null,
    scores: []
  }

  for (let blob of formData) {
    const buf = await blob.data.arrayBuffer()
    const view = new Uint8Array(buf)
    const msg_text = brotli_dec(view)
    const msg = JSON.parse(msg_text)

    switch (msg.cmd) {
      case 'songtitle':
        data.songTitle = msg.data
        break
      case 'userinfo':
        data.userInfo = msg.data
        break
      case 'scores':
        data.scores.push(...msg.data)
        break
      default:
        console.log(`rearrange brotli dec results failed:${msg_text}`)
        break
    }
  }

  return data
}

addEventListener('fetch', event => {
  return event.respondWith((async () => {
    const formData = await event.request.formData()
    const data = await handler(formData)

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })())
})
