import produce from 'immer'

export const arcaeaSetAction = (uid, data) => ({
  type: 'arcaea.set',
  payload: {uid: uid, data: data}
})

export const initArcaeaState = {
  uid: null,
  data: {
    songTitle: null,
    userInfo: null,
    scores: null
  }
}

export const arcaeaReducer = (state, action) => {
  const key = action.type.substring(action.type.indexOf('.') + 1)
  switch (key) {
    case 'set':
      return produce(state, state => {
        state.arcaea.uid = action.payload.uid
        state.arcaea.data = action.payload.data
      })
    default:
      return state
  }
}
