import mockArcaeaProberData from './mock/arcaeaProberData.json'

export const ArcaeaProberState = Object.freeze({
  WaitQueried: 0,
  WaitSongTitle: 1,
  WaitUserInfo: 2,
  WaitScores: 3
})

export const arcaeaProber = (
  {uid, levelStart = 7, levelEnd = 12, brotliDec}
) => new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === 'development') {
    resolve(mockArcaeaProberData)
    return
  }

  let state = ArcaeaProberState.WaitQueried
  let songTitle
  let userInfo
  let scores = []

  const ws = new WebSocket('wss://arc.estertion.win:616')
  ws.addEventListener('open', () => ws.send(`${uid} ${levelStart} ${levelEnd}`))
  ws.addEventListener('message', e => {
    switch (state) {
      case ArcaeaProberState.WaitQueried:
        if (e.data === 'queried') {
          state = ArcaeaProberState.WaitSongTitle
        } else {
          reject({state: ArcaeaProberState.WaitQueried, data: e.data})
        }
        break
      case ArcaeaProberState.WaitSongTitle:
        if (typeof e.data.arrayBuffer === 'function') {
          e.data.arrayBuffer().then(buf => {
            const arr = new Uint8Array(buf)
            const res = JSON.parse(new TextDecoder().decode(brotliDec(arr)))
            if (res.cmd === 'songtitle') {
              songTitle = res.data
              console.log(songTitle)
              state = ArcaeaProberState.WaitUserInfo
            } else {
              reject({state: ArcaeaProberState.WaitSongTitle, data: res})
            }
          }).catch(() => {
            reject({state: ArcaeaProberState.WaitSongTitle, data: e.data})
          })
        } else {
          reject({state: ArcaeaProberState.WaitSongTitle, data: e.data})
        }
        break
      case ArcaeaProberState.WaitUserInfo:
        if (typeof e.data.arrayBuffer === 'function') {
          e.data.arrayBuffer().then(buf => {
            const arr = new Uint8Array(buf)
            const res = JSON.parse(new TextDecoder().decode(brotliDec(arr)))
            if (res.cmd === 'userinfo') {
              userInfo = res.data
              console.log(userInfo)
              state = ArcaeaProberState.WaitScores
            } else {
              reject({state: ArcaeaProberState.WaitUserInfo, data: res})
            }
          }).catch(() => {
            reject({state: ArcaeaProberState.WaitUserInfo, data: e.data})
          })
        } else {
          reject({state: ArcaeaProberState.WaitUserInfo, data: e.data})
        }
        break
      case ArcaeaProberState.WaitScores:
        if (typeof e.data.arrayBuffer === 'function') {
          e.data.arrayBuffer().then(buf => {
            const arr = new Uint8Array(buf)
            const res = JSON.parse(new TextDecoder().decode(brotliDec(arr)))
            if (res.cmd === 'scores') {
              scores = [...scores, ...res.data]
            } else {
              reject({state: ArcaeaProberState.WaitScores, data: res})
            }
          }).catch(() => {
            reject({state: ArcaeaProberState.WaitScores, data: e.data})
          })
        } else if (e.data === 'bye') {
          ws.close()
          console.log(scores)
          resolve({songTitle, userInfo, scores})
        } else {
          reject({state: ArcaeaProberState.WaitScores, data: e.data})
        }
        break
      default:
        break
    }
  })
})
