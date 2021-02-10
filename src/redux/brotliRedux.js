import produce from 'immer'

export const brotliInitAction = init => ({
  type: 'brotli.init',
  payload: init
})

export const initBrotliState = {
  init: null
}

export const brotliReducer = (state, action) => {
  const key = action.type.substring(action.type.indexOf('.') + 1)
  switch (key) {
    case 'init':
      return produce(state, state => {
        state.brotli.init = action.payload
      })
    default:
      return state
  }
}
