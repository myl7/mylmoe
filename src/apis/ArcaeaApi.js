const subKey = '7e1826c345a941f8a6e928b95626cf5c'

export default class ArcaeaApi {
  async data() {
    if (process.env.NODE_ENV === 'development') {
      return data
    }

    const url = new URL('https://mlapis.azure-api.net/mylmoe-arcaea/Get')
    url.search = new URLSearchParams({'subscription-key': subKey}).toString()
    const res = await fetch(url.toString())
    if (res.status !== 200) {
      return undefined
    }

    const raw = await res.blob()
    const dec = new DecompressionStream('gzip')
    const out = raw.stream().pipeThrough(dec)
    return await new Response(out).json()
  }
}
