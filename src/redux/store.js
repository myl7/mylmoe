import {createStore} from 'redux'
import {initThemeState, themeReducer} from './themeRedux'

const initState = {
  theme: initThemeState
}

const reducer = (state, action) => {
  const domain = action.type.substring(0, action.type.indexOf('.'))
  switch (domain) {
    case 'theme':
      return themeReducer(state, action)
    default:
      return state
  }
}

const store = createStore(reducer, initState)

export default store
