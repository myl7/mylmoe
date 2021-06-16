import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {FC, useEffect, useState} from 'react'
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
    type: dark ? 'dark' : 'light',
    primary: {
      main: '#2196f3'
    }
  }
})

const Theme: FC = ({children}) => {
  const dark = useSelector((state: State) => state.theme.dark)

  const dispatch = useDispatch()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const darkStore = localStorage.getItem('mylmoe.theme.dark')
    const dark = (darkStore == null ? false : Boolean(darkStore))
    themeEffect(dark)
    dispatch(themeInitAction(dark))
  })

  const body = (
    <MuiThemeProvider theme={theme(dark)}>
      {children}
    </MuiThemeProvider>
  )

  return mounted ? body : (
    <div style={{visibility: 'hidden'}}>
      {body}
    </div>
  )
}

export default Theme

export const themeEffect = (dark: boolean) => {
  document.getElementsByTagName('body')[0]!.style.setProperty('background-color', dark ? '#303030' : '#fafafa')
}
