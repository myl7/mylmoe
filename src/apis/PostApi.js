import * as postApiMock from './postApi.mock'

const normalDate = dateObj => `${dateObj.year}-${dateObj.month.padStart(2, '0')}-${dateObj.day.padStart(2, '0')}`

export default class PostApi {
  async posts() {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postsData
    }

    const res = await fetch('' +
      'https://mlapis.azure-api.net/mlpost-public/GetPost?subscription-key=504fd063894b4e1aaa11d6f38a66820c'
    )
    if (res.status !== 200) {
      return undefined
    }

    let body = await res.json()
    body.pubDate = normalDate(body.pubDate)
    body.updDate = normalDate(body.updDate)
    return body
  }

  async post(slug) {
    if (process.env.NODE_ENV === 'development') {
      return postApiMock.postData
    }

    const res = await fetch(
      `'https://mlapis.azure-api.net/mlpost-public/GetPost?slug=${slug}&subscription-key=504fd063894b4e1aaa11d6f38a66820c'`
    )
    if (res.status !== 200) {
      return undefined
    }

    let body = await res.json()
    body.pubDate = normalDate(body.pubDate)
    body.updDate = normalDate(body.updDate)
    return body
  }
}
