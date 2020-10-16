import data from './arcaeaProberApiData.mock.json'

const arcaeaProberApiUrl = 'http://127.0.0.1:8081/arcaea-prober-api'

let api = async () => {
  const resp = await fetch(arcaeaProberApiUrl)
  return await resp.json()
}

if (process.env.NODE_ENV === 'development') {
  api = async () => data
}

export default api
