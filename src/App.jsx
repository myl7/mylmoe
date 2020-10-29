import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core'
import IndexView from './views/IndexView'
import PostView from './views/PostView'
import ArcaeaView from './views/ArcaeaView'
import Footer from './components/Footer'
import Header from './components/Header'
import theme from './utils/theme'

export default () => {
  return (
    <div>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route exact path={'/'} children={<IndexView />} />
            <Route path={'/posts/:slug'} children={<PostView />} />
            <Route path={'/pages/arcaea'} children={<ArcaeaView />} />
          </Switch>
          <Footer />
        </MuiThemeProvider>
      </Router>
    </div>
  )
}
