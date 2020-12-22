import * as postApiMock from './postApi.mock'

export default class PostApi {
  async posts() {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postsData
    }

    const res = await fetch('https://mylmoe-post.myl.workers.dev', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    return res.status === 200 ? await res.json() : undefined
  }

  async post(slug) {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postData
    }

    const res = await fetch('https://mylmoe-post.myl.workers.dev', {
      method: 'POST',
      body: JSON.stringify({slug: slug}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    return res.status === 200 ? await res.json() : undefined
  }
}
