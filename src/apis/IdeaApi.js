import * as ideaApiMock from './ideaApi.mock'

export default class IdeaApi {
  async ideas(cursor) {
    if (process.env.NODE_ENV === 'development') {
      if (!cursor) {
        return ideaApiMock.ideas1
      } else {
        return undefined
      }
    }

    const res = await fetch('/apis/idea', {
      method: 'POST',
      body: JSON.stringify({cursor: cursor}),
      headers: {'Content-Type': 'application/json'}
    })
    return res.status === 200 ? await res.json() : undefined
  }
}
