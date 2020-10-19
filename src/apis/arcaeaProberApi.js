import data from './arcaeaProberApiData.mock.json'

const arcaeaProberApiUrl = 'https://myl.moe/apis/arcaea-prober.js'

let api = async () => {
  const resp = await fetch(arcaeaProberApiUrl)
  return await resp.json()
}

if (process.env.NODE_ENV === 'development') {
  api = async () => data
}

export default api
