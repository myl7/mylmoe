import {createStore} from 'redux'
import {ThemeAction, themeReducer} from './theme'
import {initState, State} from './state'

type Action = ThemeAction

const reducer = (state: State|undefined, action: Action) => {
  state = state as State
  const domain = action.type.substring(0, action.type.indexOf('.'))
  switch (domain) {
    case 'theme':
      return themeReducer(state, action as ThemeAction)
    default:
      return state
  }
}

const store = createStore(reducer, initState)

export default store
