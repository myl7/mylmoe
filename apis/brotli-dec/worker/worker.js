addEventListener('fetch', e => {
  e.respondWith(handleReq(e.request))
})

async function handleReq(req) {
  const {brotli_dec} = wasm_bindgen
  await wasm_bindgen(wasm)

  const raw = await req.arrayBuffer()
  console.log(raw)
  const view = new Uint8Array(raw)
  const res = brotli_dec(view)

  return new Response(res)
}
