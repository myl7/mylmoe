import {useState} from 'react'
import {
  AppBar, Avatar, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography
} from '@material-ui/core'
import {Home as HomeIcon, Menu as MenuIcon} from '@material-ui/icons'
import nav from '../../config/nav'
import NavListButton from './navListButton'
import IntLinkReset from '../links/intLinkReset'
import ThemeToggle from './themeSwitch'
import Search from './search'
import Follow from './follow'
import site from '../../config/site'

const MobileHeader = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(open => !open)

  return (
    <AppBar position="fixed" color="default" component="header">
      <Toolbar style={{paddingLeft: '1em'}} component="nav">
        <IconButton onClick={handleClick} style={{marginLeft: '-0.5em'}}>
          <MenuIcon color="primary" />
        </IconButton>
        <IntLinkReset href="/">
          <Typography variant="h6">
            mylmoe
          </Typography>
        </IntLinkReset>
        <div style={{flexGrow: 1}} />
        <ThemeToggle />
        <Typography variant="subtitle1">
          Dark
        </Typography>
        <Follow style={{marginLeft: '0.5em'}} />
        <IntLinkReset href="/pages/about">
          <Avatar alt={`Avatar of ${site.name}`} src={site.avatar} />
        </IntLinkReset>
      </Toolbar>
      <Collapse in={open}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              <IntLinkReset href="/">
                Home
              </IntLinkReset>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Search />
          </ListItem>
          {nav.map(({list, name}) => (
            <NavListButton name={name} list={list} key={name} />
          ))}
        </List>
      </Collapse>
    </AppBar>
  )
}

export default MobileHeader
