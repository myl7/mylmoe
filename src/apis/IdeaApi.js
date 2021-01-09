import * as ideaApiMock from './ideaApi.mock'

export default class IdeaApi {
  async ideas(slug) {
    if (process.env.NODE_ENV === 'development') {
      if (slug) {
        return ideaApiMock.ideas1
      } else {
        return ideaApiMock.ideas
      }
    }

    const res = await fetch('/apis/idea', {
      method: 'POST',
      body: JSON.stringify({slug: slug}),
      headers: {'Content-Type': 'application/json'}
    })
    return res.status === 200 ? await res.json() : undefined
  }
}
