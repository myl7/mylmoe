import React, {useState} from 'react'
import {
  AppBar, Button, IconButton, Toolbar, Typography, makeStyles, ListItemIcon, ListItemText, Collapse, List, ListItem,
  Avatar
} from '@material-ui/core'
import {
  ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon, GitHub as GitHubIcon, Home as HomeIcon, Mail as MailIcon,
  Menu as MenuIcon, RssFeed as RssFeedIcon
} from '@material-ui/icons'
import ExternalLink from './ExternalLink'
import RouterLink from './RouterLink'
import MenuButton from './MenuButton'
import {useXs} from './screenSizeHooks'
import ThemeSwitch from './ThemeSwitch'

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: '1em',
    paddingRight: '1em'
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
  headerButtonLast: {
    marginRight: '2em',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  flexDivider: {
    flexGrow: 1
  },
  listIndent1: {
    paddingLeft: '2em'
  }
})

export default () => {
  const classes = useStyles()

  const isXs = useXs()

  const [listOpen, setListOpen] = useState(false)
  const [listPageOpen, setListPageOpen] = useState(true)
  const [listUtilOpen, setListUtilOpen] = useState(true)

  const handleListClick = (setter) => () => {
    setter(open => !open)
  }

  const buttons = {
    pages: {
      title: 'Pages',
      items: [
        {
          title: 'Arcaea',
          to: '/pages/arcaea'
        },
        {
          title: 'About',
          to: '/pages/about'
        },
        {
          title: 'Privacy Policy',
          to: '/pages/privacy-policy'
        }
      ]
    },
    utils: {
      title: 'Utils',
      items: [
        {
          title: 'Brotli',
          to: '/utils/brotli'
        }
      ]
    },
    nonsence: {
      title: 'Nonsence',
      to: '/pages/nonsence'
    },
    friends: {
      title: 'Friends',
      to: '/pages/friends'
    }
  }

  const gravatarHash = '41e17fe63d0c1f91234b320b1feb3bef'

  return (
    <AppBar position={'static'} color={'default'}>
      {isXs ? (
        <>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={handleListClick(setListOpen)}>
              <MenuIcon />
            </IconButton>

            <Typography variant={'h6'} color={'textPrimary'} component={RouterLink} to={'/'}>
              mylmoe
            </Typography>

            <div className={classes.flexDivider} />

            <Avatar alt={'myl7'} src={`https://www.gravatar.com/avatar/${gravatarHash}&d=retro`} component={RouterLink}
                    to={'/pages/about'} />
          </Toolbar>

          <Collapse in={listOpen}>
            <List>
              <ListItem button component={RouterLink} to={'/'}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant={'subtitle1'} color={'textPrimary'}>
                    Home
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem button onClick={handleListClick(setListPageOpen)}>
                <ListItemText>
                  <Typography variant={'subtitle1'} color={'textPrimary'}>
                    {buttons.pages.title}
                  </Typography>
                </ListItemText>
                {listPageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={listPageOpen}>
                <List disablePadding>
                  {buttons.pages.items.map(item => (
                    <ListItem button component={RouterLink} to={item.to} className={classes.listIndent1}>
                      <ListItemText>
                        <Typography variant={'subtitle1'} color={'textPrimary'}>
                          {item.title}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              <ListItem button onClick={handleListClick(setListUtilOpen)}>
                <ListItemText>
                  <Typography variant={'subtitle1'} color={'textPrimary'}>
                    {buttons.utils.title}
                  </Typography>
                </ListItemText>
                {listUtilOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={listUtilOpen}>
                <List disablePadding>
                  {buttons.utils.items.map(item => (
                    <ListItem button component={RouterLink} to={item.to} className={classes.listIndent1}>
                      <ListItemText>
                        <Typography variant={'subtitle1'} color={'textPrimary'}>
                          {item.title}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              <ListItem button component={RouterLink} to={buttons.nonsence.to}>
                <ListItemText>
                  <Typography variant={'subtitle1'} color={'textPrimary'}>
                    {buttons.nonsence.title}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem button component={RouterLink} to={buttons.friends.to}>
                <ListItemText>
                  <Typography variant={'subtitle1'} color={'textPrimary'}>
                    {buttons.friends.title}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>
                  <IconButton component={ExternalLink} href={'https://myl.moe/rss'}>
                    <RssFeedIcon />
                  </IconButton>
                  <IconButton component={ExternalLink} href={'mailto:myl.ustc@gmail.com'}>
                    <MailIcon />
                  </IconButton>
                  <IconButton component={ExternalLink} href={'https://github.com/myl7'}>
                    <GitHubIcon />
                  </IconButton>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </>
      ) : (
        <Toolbar className={classes.toolbar}>
          <IconButton component={RouterLink} to={'/'}>
            <HomeIcon />
          </IconButton>

          <Typography variant={'h6'} color={'textPrimary'} component={RouterLink} to={'/'}>
            mylmoe
          </Typography>

          <MenuButton id={'header-page-menu'} className={classes.headerButtonFirst} items={buttons.pages.items.map(
            item => ({
              component: RouterLink, to: item.to, children: (
                <Typography variant={'subtitle1'} color={'textPrimary'}>
                  {item.title}
                </Typography>
              )
            })
          )}>
            <Typography variant={'subtitle1'}>
              {buttons.pages.title}
            </Typography>
          </MenuButton>

          <MenuButton id={'header-util-menu'} className={classes.headerButton} items={buttons.utils.items.map(
            item => ({
              component: RouterLink, to: item.to, children: (
                <Typography variant={'subtitle1'} color={'textPrimary'}>
                  {item.title}
                </Typography>
              )
            })
          )}>
            <Typography variant={'subtitle1'}>
              {buttons.utils.title}
            </Typography>
          </MenuButton>

          <Button className={classes.headerButton} variant={'outlined'} component={RouterLink} to={buttons.nonsence.to}>
            <Typography variant={'subtitle1'}>
              {buttons.nonsence.title}
            </Typography>
          </Button>

          <Button className={classes.headerButton} variant={'outlined'} component={RouterLink} to={buttons.friends.to}>
            <Typography variant={'subtitle1'}>
              {buttons.friends.title}
            </Typography>
          </Button>

          <div className={classes.flexDivider} />

          <ThemeSwitch />
          <Typography variant={'subtitle1'} style={{marginRight: '1em'}}>Dark</Typography>

          <MenuButton className={classes.headerButtonLast} id={'header-social-menu'} items={[{
            children: (
              <>
                <IconButton component={ExternalLink} href={'https://myl.moe/rss'}>
                  <RssFeedIcon />
                </IconButton>
                <IconButton component={ExternalLink} href={'mailto:myl.ustc@gmail.com'}>
                  <MailIcon />
                </IconButton>
                <IconButton component={ExternalLink} href={'https://github.com/myl7'}>
                  <GitHubIcon />
                </IconButton>
              </>
            )
          }]}>
            <Typography variant={'subtitle1'}>
              SNSs
            </Typography>
          </MenuButton>

          <Avatar alt={'myl7'} src={`https://www.gravatar.com/avatar/${gravatarHash}&d=retro`} component={RouterLink}
                  to={'/pages/about'} />
        </Toolbar>
      )}
    </AppBar>
  )
}
