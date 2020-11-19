export default class PostApi {
  async posts() {
    const res = await fetch('/api/posts')
    return await res.json()
  }

  async post(slug) {
    const res = await fetch(`/api/posts/${slug}`)
    return await res.json()
  }
}
