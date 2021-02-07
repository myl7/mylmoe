import React from 'react'
import 'normalize.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/source-code-pro/400.css'
import './layout.css'
import {Card, MuiThemeProvider} from '@material-ui/core'
import Fireworks from './fireworks'
import theme from '../utils/theme'
import Header from './header'
import Footer from './footer'
import GoTop from './goTop'

const Layout = props => {
  const {children} = props

  return (
    <MuiThemeProvider theme={theme(false)}>
      <div>
        <Header />
        <Card variant="outlined" style={{margin: '5em 1em 0 1em'}} component="main">
          {children}
        </Card>
        <Footer />
        <GoTop />
        <Fireworks />
      </div>
    </MuiThemeProvider>
  )
}

export default Layout
