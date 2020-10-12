import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import IndexView from './views/IndexView'
import PostView from './views/PostView'
import Footer from './components/Footer'
import Header from './components/Header'

export default () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path={'/'} children={<IndexView />} />
          <Route path={'/posts/:slug'} children={<PostView />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}
