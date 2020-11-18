import React from 'react'
import {MuiThemeProvider} from '@material-ui/core'
import theme from './utils/theme'
import Router from './Router'

export default () => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
    </div>
  )
}
