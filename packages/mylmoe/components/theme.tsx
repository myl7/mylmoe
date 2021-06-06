import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import React from 'react'
import {useSelector} from 'react-redux'
import {State} from '../redux/state'

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
