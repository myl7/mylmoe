import * as postApiMock from './postApi.mock'

export default class PostApi {
  async posts() {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postsData
    }

    const res = await fetch('/api/posts')
    if (res.status !== 200) {
      return undefined
    }
    return await res.json()
  }

  async post(slug) {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postData
    }

    const res = await fetch(`/api/posts/${slug}`)
    if (res.status !== 200) {
      return undefined
    }
    return await res.json()
  }
}
