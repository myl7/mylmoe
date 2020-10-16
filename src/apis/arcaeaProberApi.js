import data from './arcaeaProberApiData.mock.json'

const arcaeaProberApiUrl = 'http://127.0.0.1:8081/arcaea-prober-api'

let api = async () => {
  const resp = await fetch(arcaeaProberApiUrl)
  return await resp.json()
}

if (process.env.NODE_ENV === 'development') {
  api = async () => data
}

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   score: number,
 *   count: {
 *     strict_pure: number,
 *     pure: number,
 *     far: number,
 *     lost: number
 *   },
 *   health: number,
 *   play_date: string,
 *   get_date: string,
 *   clear_type: string,
 *   constant: number,
 *   rating: number
 * }} Song
 */

/**
 * @function Api
 * @async
 * @return {{
 *   songs: Song[],
 *   user_info: {
 *     id: number,
 *     name: string,
 *     recent_song_id: string,
 *     join_date: string,
 *     ptt: number,
 *     code: string
 *   }
 * }}
 */

/** @type {Api} */
export default api
