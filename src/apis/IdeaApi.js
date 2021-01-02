export default class IdeaApi {
  async ideas(cursor) {
    if (process.env.NODE_ENV === 'development') {
    }

    const res = await fetch('/apis/idea', {
      method: 'POST',
      body: JSON.stringify({cursor: cursor}),
      headers: {'Content-Type': 'application/json'}
    })
    return res.status === 200 ? await res.json() : undefined
  }
}
