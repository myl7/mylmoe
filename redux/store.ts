import { AnyAction, createStore, Store } from 'redux'
import { ThemeAction, themeReducer } from './theme'
import { initState, State } from './state'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import produce from 'immer'

type Action = ThemeAction | AnyAction

const reducer = (state: State = initState, action: Action) => {
  if (action.type === HYDRATE) {
    return produce(state, state => ({ ...state, ...(action.payload as State) }))
  }
  const domain = action.type.substring(0, action.type.indexOf('.'))
  switch (domain) {
    case 'theme':
      return themeReducer(state, action as ThemeAction)
    default:
      return state
  }
}

const makeStore = () =>
  createStore(
    reducer,
    initState,
    typeof process != undefined && process.env.NODE_ENV == 'development'
      ? typeof window !== 'undefined'
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        : undefined
      : undefined
  )

export const storeWrapper = createWrapper<Store<State>>(makeStore)
