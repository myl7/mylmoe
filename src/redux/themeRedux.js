import produce from 'immer'

export const themeInitAction = dark => ({
  type: 'theme.init',
  payload: dark
})

export const themeSwitchAction = () => ({
  type: 'theme.switch'
})

export const initThemeState = {
  dark: false
}

export const themeReducer = (state, action) => {
  const key = action.type.substring(action.type.indexOf('.') + 1)
  switch (key) {
    case 'init':
      return produce(state, state => {
        state.theme.dark = action.payload
      })
    case 'switch':
      return produce(state, state => {
        state.theme.dark = !state.theme.dark
      })
    default:
      return state
  }
}
