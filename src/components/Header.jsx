import React, {useState} from 'react'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  useMediaQuery,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  ListItem
} from '@material-ui/core'
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  GitHub as GitHubIcon,
  Home as HomeIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  RssFeed as RssFeedIcon
} from '@material-ui/icons'
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
  },
  listIndent1: {
    paddingLeft: '2em'
  }
})

export default () => {
  const classes = useStyles()

  const isXs = useMediaQuery(theme => theme.breakpoints.down('xs'))

  const [listOpen, setListOpen] = useState(false)
  const [listPageOpen, setListPageOpen] = useState(true)
  const [listUtilOpen, setListUtilOpen] = useState(true)

  const handleListClick = (setter) => () => {
    setter(open => !open)
  }

  return (
    <AppBar position={'static'} color={'secondary'}>
      {isXs ? (
        <>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={handleListClick(setListOpen)}>
              <MenuIcon color={'primary'} />
            </IconButton>
            <Typography variant={'h6'}>mylmoe</Typography>
          </Toolbar>
          <Collapse in={listOpen}>
            <List>
              <ListItem button component={RouterLink} to={'/'}>
                <ListItemIcon>
                  <HomeIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant={'subtitle1'}>Home</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={handleListClick(setListPageOpen)}>
                <ListItemText>
                  <Typography variant={'subtitle1'}>Pages</Typography>
                </ListItemText>
                {listPageOpen ? <ExpandLessIcon color={'primary'} /> : <ExpandMoreIcon color={'primary'} />}
              </ListItem>
              <Collapse in={listPageOpen}>
                <List disablePadding>
                  <ListItem button component={RouterLink} to={'/pages/arcaea'} className={classes.listIndent1}>
                    <ListItemText>
                      <Typography variant={'subtitle1'}>Arcaea</Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={handleListClick(setListUtilOpen)}>
                <ListItemText>
                  <Typography variant={'subtitle1'}>Utils</Typography>
                </ListItemText>
                {listUtilOpen ? <ExpandLessIcon color={'primary'} /> : <ExpandMoreIcon color={'primary'} />}
              </ListItem>
              <Collapse in={listUtilOpen}>
                <List disablePadding>
                  <ListItem button component={RouterLink} to={'/utils/brotli'} className={classes.listIndent1}>
                    <ListItemText>
                      <Typography variant={'subtitle1'}>Brotli</Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button component={RouterLink} to={'/pages/nonsence'}>
                <ListItemText>
                  <Typography variant={'subtitle1'}>Nonsence</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button component={RouterLink} to={'/pages/friends'}>
                <ListItemText>
                  <Typography variant={'subtitle1'}>Friends</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <IconButton component={ExternalLink} href={'https://myl.moe/rss'}>
                    <RssFeedIcon color={'primary'} />
                  </IconButton>
                  <IconButton component={ExternalLink} href={'mailto:myl.ustc@gmail.com'}>
                    <MailIcon color={'primary'} />
                  </IconButton>
                  <IconButton component={ExternalLink} href={'https://github.com/myl7'}>
                    <GitHubIcon color={'primary'} />
                  </IconButton>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </>
      ) : (
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
      )}
    </AppBar>
  )
}
