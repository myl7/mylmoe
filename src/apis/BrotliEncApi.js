const subKey = '5bb30b9bf9ba47aa8418e25c3ae4ef51'

export default class BrotliEncApi {
  async enc(src) {
    const url = new URL('https://mlapis.azure-api.net/brotli-enc/enc')
    url.search = new URLSearchParams({'subscription-key': subKey}).toString()
    const res = await fetch(url.toString(), {
      method: 'POST',
      body: src.buffer
    })
    return res.status === 200 ? new Uint8Array(await res.arrayBuffer()) : undefined
  }
}
