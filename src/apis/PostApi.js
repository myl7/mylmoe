import * as postApiMock from './postApi.mock'

export default class PostApi {
  async posts() {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postsData
    }

    const res = await fetch('' +
      'https://mlapis.azure-api.net/mlpost-public/GetPost?subscription-key=504fd063894b4e1aaa11d6f38a66820c'
    )
    return res.status === 200 ? await res.json() : undefined
  }

  async post(slug) {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postData
    }

    const res = await fetch(`/api/posts/${slug}`)
    return res.status === 200 ? await res.json() : undefined
  }
}
