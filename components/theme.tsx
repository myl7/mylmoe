import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../redux/state'
import {themeInitAction} from '../redux/theme'

const theme = (dark: boolean) => createMuiTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    type: dark ? 'dark' : 'light'
  }
})

const Theme: React.FC = ({children}) => {
  const dark = useSelector((state: State) => state.theme.dark)

  const dispatch = useDispatch()

  useEffect(() => {
    const key = 'mylmoe.dark'
    const darkStore = localStorage.getItem(key)
    const dark = (darkStore === null ? false : Boolean(darkStore))
    themeEffect(dark)
    dispatch(themeInitAction(dark))
  })

  return (
    <MuiThemeProvider theme={theme(dark)}>
      {children}
    </MuiThemeProvider>
  )
}

export default Theme

export const themeEffect = (dark: boolean) => {
  document.getElementsByTagName('body')[0]!.style.setProperty('background-color', dark ? '#303030' : '#fafafa')
}
