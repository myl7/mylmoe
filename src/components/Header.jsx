import React, {useState} from 'react'
import {AppBar, IconButton, Toolbar, Button, Menu, MenuItem, Typography} from '@material-ui/core'
import {GitHub as GitHubIcon, Home as HomeIcon, Mail as MailIcon, RssFeed as RssFeedIcon} from '@material-ui/icons'
import ExternalLink from './link/ExternalLink'
import RouterLink from './link/RouterLink'

export default () => {
  const [pageMenuElem, setPageMenuElem] = useState(null)

  const handlePageMenuClick = e => {
    setPageMenuElem(e.currentTarget)
  }
  const handlePageMenuClose = () => {
    setPageMenuElem(null)
  }

  return (
    <AppBar position={'static'} style={{backgroundColor: '#606060'}}>
      <Toolbar style={{paddingLeft: 12, paddingRight: 12}}>
        <IconButton component={RouterLink} to={'/'}>
          <HomeIcon color={'action'} />
        </IconButton>
        <Typography variant={'h6'}>myl.moe</Typography>

        <Button aria-controls={'header-page-menu'} aria-haspopup={'true'} onClick={handlePageMenuClick}
                variant={'outlined'} style={{marginLeft: '2em'}}>
          <Typography variant={'subtitle1'}>Pages</Typography>
        </Button>
        <Menu id={'header-page-menu'} anchorEl={pageMenuElem} keepMounted open={Boolean(pageMenuElem)}
              onClose={handlePageMenuClose} getContentAnchorEl={null}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              transformOrigin={{vertical: 'top', horizontal: 'center'}}>
          <MenuItem component={RouterLink} to={'/pages/arcaea'} onClick={handlePageMenuClose}>Arcaea</MenuItem>
        </Menu>

        <div style={{flexGrow: 1}} />
        <IconButton component={ExternalLink}
                    href={'https://mlapis.azure-api.net/mlpost-public/Rss?subscription-key=504fd063894b4e1aaa11d6f38a66820c'}>
          <RssFeedIcon color={'action'} />
        </IconButton>
        <IconButton component={ExternalLink} href={'mailto:myl.ustc@gmail.com'}>
          <MailIcon color={'action'} />
        </IconButton>
        <IconButton component={ExternalLink} href={'https://github.com/myl7'}>
          <GitHubIcon color={'action'} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
