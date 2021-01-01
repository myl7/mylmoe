import React from 'react'
import {AppBar, Button, IconButton, Toolbar, Typography, makeStyles} from '@material-ui/core'
import {GitHub as GitHubIcon, Home as HomeIcon, Mail as MailIcon, RssFeed as RssFeedIcon} from '@material-ui/icons'
import ExternalLink from './ExternalLink'
import RouterLink from './RouterLink'
import MenuButton from './MenuButton'

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: 12,
    paddingRight: 12
  },
  headerButtonFirst: {
    marginLeft: '2em',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  headerButton: {
    marginLeft: '1em',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  flexDivider: {
    flexGrow: 1
  }
})

export default () => {
  const classes = useStyles()

  return (
    <AppBar position={'static'} color={'secondary'}>
      <Toolbar className={classes.toolbar}>
        <IconButton component={RouterLink} to={'/'}>
          <HomeIcon color={'primary'} />
        </IconButton>
        <Typography variant={'h6'}>mylmoe</Typography>

        <MenuButton id={'header-page-menu'} className={classes.headerButtonFirst} items={[
          {component: RouterLink, to: '/pages/arcaea', children: 'Arcaea'}
        ]}>
          <Typography variant={'subtitle1'}>Pages</Typography>
        </MenuButton>
        <MenuButton id={'header-util-menu'} className={classes.headerButton} items={[
          {component: RouterLink, to: '/utils/brotli', children: 'Brotli'}
        ]}>
          <Typography variant={'subtitle1'}>Utils</Typography>
        </MenuButton>
        <Button className={classes.headerButton} variant={'outlined'} color={'primary'} component={RouterLink}
                to={'/pages/nonsence'}>
          <Typography variant={'subtitle1'}>Nonsence</Typography>
        </Button>
        <Button className={classes.headerButton} variant={'outlined'} color={'primary'} component={RouterLink}
                to={'/pages/friends'}>
          <Typography variant={'subtitle1'}>Friends</Typography>
        </Button>

        <div className={classes.flexDivider} />
        <IconButton component={ExternalLink} href={'https://myl.moe/rss'}>
          <RssFeedIcon color={'primary'} />
        </IconButton>
        <IconButton component={ExternalLink} href={'mailto:myl.ustc@gmail.com'}>
          <MailIcon color={'primary'} />
        </IconButton>
        <IconButton component={ExternalLink} href={'https://github.com/myl7'}>
          <GitHubIcon color={'primary'} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
