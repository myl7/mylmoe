import React from 'react'
import {MuiThemeProvider} from '@material-ui/core'
import theme from './utils/theme'
import Router from './Router'
import {Provider} from 'react-redux'
import {store} from './redux'

export default () => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    </div>
  )
}
