import * as postApiMock from './postApi.mock'

const normalDate = dateObj => `\
${dateObj.year}-\
${dateObj.month.toString().padStart(2, '0')}-\
${dateObj.day.toString().padStart(2, '0')}`

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

    let posts = await res.json()
    for (let post of posts) {
      if (post !== undefined) {
        post.pubDate = normalDate(post.pubDate)
        post.updDate = normalDate(post.updDate)
      }
    }
    return posts
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

    let post = await res.json()
    post.pubDate = normalDate(post.pubDate)
    post.updDate = normalDate(post.updDate)
    return post
  }
}
