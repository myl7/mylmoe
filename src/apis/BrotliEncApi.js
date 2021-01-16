export default class BrotliEncApi {
  async enc(src) {
    const res = await fetch('https://c.azure-api.net/brotli/enc', {
      method: 'POST',
      body: src.buffer
    })
    return res.status === 200 ? new Uint8Array(await res.arrayBuffer()) : undefined
  }
}
