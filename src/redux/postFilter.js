import produce from 'immer'

export default (s, a) => {
  switch (a.type) {
    case 'all':
      return a.payload !== undefined ? produce(s, s => {
        for (const post of a.payload) {
          s.posts[post.slug] = post
        }
      }) : s
    case 'single':
      return a.payload !== undefined ? produce(s, s => {
        s.posts[a.payload.slug] = a.payload
      }) : s
    default:
      return s
  }
}
