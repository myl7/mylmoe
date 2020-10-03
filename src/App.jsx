import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Link, Typography} from '@material-ui/core'
import {Home as HomeIcon, GitHub as GitHubIcon, Mail as MailIcon} from '@material-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import IndexView from './views/IndexView'

export default () => {
  return (
    <div>
      <Router>
        <AppBar position={'static'}>
          <Toolbar>
            <IconButton edge={'start'} color={'inherit'} children={<HomeIcon />} component={RouterLink} to={'/'} />
            <Typography variant={'h6'} style={{flexGrow: 1}}>mlblog</Typography>
            <IconButton children={<MailIcon color={'action'} />}
                        component={Link} href={'mailto:myl.ustc@gmail.com'} target={'_blank'} />
            <IconButton edge={'end'} children={<GitHubIcon color={'action'} />}
                        component={Link} href={'https://github.com/myl7'} target={'_blank'} />
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path={'/'} children={<IndexView />} />
        </Switch>
      </Router>
    </div>
  )
}
