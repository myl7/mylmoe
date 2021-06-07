import {createStore} from 'redux'
import {ThemeAction, themeReducer} from './theme'
import {initState, State} from './state'

type Action = ThemeAction

const reducer = (state: State = initState, action: Action) => {
  const domain = action.type.substring(0, action.type.indexOf('.'))
  switch (domain) {
    case 'theme':
      return themeReducer(state, action as ThemeAction)
    default:
      return state
  }
}

const store = createStore(
  reducer, initState
  // @ts-ignore
  // typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
)

export default store
