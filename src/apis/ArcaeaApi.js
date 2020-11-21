import data from './ArcaeaApiData.mock.json'

export default class ArcaeaApi {
  async data() {
    if (process.env.NODE_ENV === 'development') {
      return data
    }

    const res = await fetch('/api/arcaea')
    return res.status === 200 ? await res.json() : undefined
  }
}
