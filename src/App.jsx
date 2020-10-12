import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'
import {Home as HomeIcon, GitHub as GitHubIcon, Mail as MailIcon, RssFeed as RssFeedIcon} from '@material-ui/icons'
import IndexView from './views/IndexView'
import PostView from './views/PostView'
import Footer from './components/Footer'
import ExternalLink from './components/ExternalLink'
import RouterLink from './components/RouterLink'

export default () => {
  return (
    <div>
      <Router>
        <AppBar position={'static'}>
          <Toolbar>
            <IconButton edge={'start'} component={RouterLink} to={'/'}>
              <HomeIcon color={'action'} />
            </IconButton>
            <Typography variant={'h6'} style={{flexGrow: 1}}>mlblog</Typography>
            <IconButton component={ExternalLink} href={'https://myl.moe/rss.xml'}>
              <RssFeedIcon color={'action'} />
            </IconButton>
            <IconButton component={ExternalLink} href={'mailto:myl.ustc@gmail.com'}>
              <MailIcon color={'action'} />
            </IconButton>
            <IconButton edge={'end'} component={ExternalLink} href={'https://github.com/myl7'}>
              <GitHubIcon color={'action'} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path={'/'} children={<IndexView />} />
          <Route path={'/posts/:slug'} children={<PostView />} />
        </Switch>

        <Footer />
      </Router>
    </div>
  )
}
