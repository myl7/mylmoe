import arcaeaMockData from './ArcaeaApiData.mock.json'

const subKey = '7e1826c345a941f8a6e928b95626cf5c'

export const levels = ['lv11', 'lv10p', 'lv10', 'lv9p', 'lv9', 'lv8', 'lv7']

export default class ArcaeaApi {
  async data(raw = false) {
    let data = null
    if (process.env.NODE_ENV === 'development') {
      data = arcaeaMockData
    } else {
      const url = new URL('https://mlapis.azure-api.net/mylmoe-arcaea/Get')
      url.search = new URLSearchParams({'subscription-key': subKey}).toString()
      const res = await fetch(url.toString())
      if (res.status !== 200) {
        return undefined
      }

      const inBlob = await res.blob()
      const dec = new DecompressionStream('gzip')
      const out = inBlob.stream().pipeThrough(dec)
      data = await new Response(out).json()
    }

    if (!raw) {
      data = await this.preproc(data)
    }

    return data
  }

  async preproc(data) {
    const res = {
      songs: Object.fromEntries(levels.map(l => [l, []])),
      userInfo: {name: null, code: null, ptt: null, join_date: null}
    }

    const userInfo = data.userInfo
    const songs = data.songs

    res.userInfo.name = userInfo.name
    res.userInfo.code = userInfo.user_code
    res.userInfo.ptt = userInfo.rating / 100
    res.userInfo.join_date = userInfo.join_date

    return res
  }
}
