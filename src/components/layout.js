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
import {useSelector} from 'react-redux'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import './highlight.css'
import 'katex/dist/katex.min.css'
import FloatAction from './floatAction'
import AddThis from './addThis'

const Layout = props => {
  const {children} = props

  const dark = useSelector(state => state.theme.dark)

  return (
    <MuiThemeProvider theme={theme(dark)}>
      <div>
        <Header />
        <Card variant="outlined" style={{margin: '5em 1em 0 1em'}} component="main">
          {children}
        </Card>
        <Footer />
        <FloatAction />
        <Fireworks />
        <AddThis />
      </div>
    </MuiThemeProvider>
  )
}

export default Layout
