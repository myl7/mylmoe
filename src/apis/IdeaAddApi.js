import * as ideaAddApiMock from './ideaAddApi.mock'

export default class IdeaAddApi {
  async add(idea) {
    if (process.env.NODE_ENV === 'development') {
      return ideaAddApiMock.getStatus(idea)
    }

    const res = await fetch('/admin/apis/idea-add', {
      method: 'POST',
      body: JSON.stringify(idea),
      headers: {'Content-Type': 'application/json'}
    })
    return res.status
  }
}
