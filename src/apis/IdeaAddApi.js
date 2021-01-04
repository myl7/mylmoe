export default class IdeaAddApi {
  async add(idea) {
    if (process.env.NODE_ENV === 'development') {
    }

    const res = await fetch('/admin/apis/idea-add', {
      method: 'POST',
      body: JSON.stringify(idea),
      headers: {'Content-Type': 'application/json'}
    })
    return res.status === 201
  }
}
