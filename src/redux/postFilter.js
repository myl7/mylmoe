import produce from 'immer'

export default (s, a) => {
  switch (a.type) {
    case 'all':
      return a.payload !== undefined ? produce(s, s => {
        for (const post of a.payload) {
          s.posts[post.id] = post
        }
      }) : s
    case 'single':
      return a.payload !== undefined ? produce(s, s => {
        s.posts[a.payload.id] = a.payload
      }) : s
    default:
      return s
  }
}
