import pako from 'pako'

addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

async function handleReq(req) {
  const {brotli_dec} = wasm_bindgen
  await wasm_bindgen(wasm)

  const view = new Uint8Array(await req.arrayBuffer())
  const res = brotli_dec(view)
  const out = pako.gzip(res)

  return new Response(out, {headers: {'Content-Type': 'application/octet-stream'}})
}
