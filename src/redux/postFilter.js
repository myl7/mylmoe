import produce from 'immer'

export default (s, a) => {
  switch (a.type) {
    case 'all':
      return produce(s, s => {
        for (const post of a.payload) {
          s.posts[post.id] = post
        }
      })
    case 'single':
      return produce(s, s => {
        s.posts[a.payload.id] = a.payload
      })
    default:
      return s
  }
}
