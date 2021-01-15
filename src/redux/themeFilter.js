import produce from 'immer'

export default (s, a) => {
  switch (a.type) {
    case 'dark':
      return produce(s, s => {
        s.theme.dark = a.payload
      })
    default:
      return s
  }
}
