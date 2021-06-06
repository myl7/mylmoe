import produce from 'immer'
import {State} from './state'

export const themeInitAction = (dark: boolean) => ({
  type: 'theme.init',
  payload: dark
})

export const themeToggleAction = () => ({
  type: 'theme.toggle',
  payload: null
})

export type ThemeAction = ReturnType<typeof themeInitAction>|ReturnType<typeof themeToggleAction>

export const themeReducer = (state: State, action: ThemeAction) => {
  const key = action.type.substring(action.type.indexOf('.') + 1)
  switch (key) {
    case 'init':
      return produce(state, state => {
        state.theme.dark = action.payload as boolean
      })
    case 'switch':
      return produce(state, state => {
        state.theme.dark = !state.theme.dark
      })
    default:
      return state
  }
}
