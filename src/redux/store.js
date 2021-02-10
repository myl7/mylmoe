import {createStore} from 'redux'
import {initThemeState, themeReducer} from './themeRedux'
import {brotliReducer, initBrotliState} from './brotliRedux'
import {arcaeaReducer, initArcaeaState} from './arcaeaRedux'

const initState = {
  theme: initThemeState,
  brotli: initBrotliState,
  arcaea: initArcaeaState
}

const reducer = (state, action) => {
  const domain = action.type.substring(0, action.type.indexOf('.'))
  switch (domain) {
    case 'theme':
      return themeReducer(state, action)
    case 'brotli':
      return brotliReducer(state, action)
    case 'arcaea':
      return arcaeaReducer(state, action)
    default:
      return state
  }
}

const store = createStore(reducer, initState)

export default store
