import React, {useEffect} from 'react'
import {createMuiTheme, MuiThemeProvider, useMediaQuery} from '@material-ui/core'
import Router from './Router'
import {useDispatch, useSelector} from 'react-redux'

export default () => {
  const dispatch = useDispatch()

  const darkPrefer = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    const darkStorage = localStorage.getItem('mylmoe.theme.dark')

    let dark
    if (darkStorage === null) {
      dark = darkPrefer
      localStorage.setItem('mylmoe.theme.dark', dark.toString())
    } else {
      dark = darkStorage === 'true'
    }

    dispatch({
      type: 'theme.dark',
      payload: dark
    })
  }, [darkPrefer])

  const dark = useSelector(s => s.theme.dark)

  const theme = dark => createMuiTheme({
    typography: {
      button: {
        textTransform: 'none'
      }
    },
    palette: {
      type: dark ? 'dark' : 'light'
    }
  })

  return (
    <MuiThemeProvider theme={theme(dark)}>
      <Router />
    </MuiThemeProvider>
  )
}
