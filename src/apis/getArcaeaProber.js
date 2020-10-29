import data from './getArcaeaProber.mock.json'

const arcaeaProberApiUrl = '/apis/arcaea-prober.json.js'

let api = async () => {
  const resp = await fetch(arcaeaProberApiUrl)
  return await resp.json()
}

if (process.env.NODE_ENV === 'development') {
  api = async () => data
}

export default api
