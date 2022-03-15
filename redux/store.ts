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
    initState
    // @ts-ignore
    // typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
  )

export const storeWrapper = createWrapper<Store<State>>(makeStore)
