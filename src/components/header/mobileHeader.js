import React, {useState} from 'react'
import {
  AppBar, Avatar, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography
} from '@material-ui/core'
import {Home as HomeIcon, Menu as MenuIcon} from '@material-ui/icons'
import nav from '../../../content/nav'
import {graphql, useStaticQuery} from 'gatsby'
import gravatar from '../../utils/gravatar'
import NavListButton from './navListButton'
import IntLinkReset from '../links/intLinkReset'
import ThemeSwitch from './themeSwitch'
import Search from './search'
import Follow from './follow'

const MobileHeader = () => {
  const [open, setOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query MobileHeaderQuery {
      site {
        siteMetadata {
          author {
            name
            email
            avatar
          }
        }
      }
    }
  `)
  const {name, email, avatar} = data.site.siteMetadata.author
  const avatarUrl = avatar ? avatar : gravatar(email)

  const handleClick = () => setOpen(open => !open)

  return (
    <AppBar position="fixed" color="default" component="header">
      <Toolbar style={{paddingLeft: '1em'}} component="nav">
        <IconButton onClick={handleClick} style={{marginLeft: '-0.5em'}}>
          <MenuIcon color="primary" />
        </IconButton>
        <IntLinkReset to="/">
          <Typography variant="h6">
            mylmoe
          </Typography>
        </IntLinkReset>
        <div style={{flexGrow: 1}} />
        <ThemeSwitch />
        <Typography variant="subtitle1">
          Dark
        </Typography>
        <Follow style={{marginLeft: '0.5em'}} />
        <IntLinkReset to="/about">
          <Avatar alt={'Avatar of ' + name} src={avatarUrl} />
        </IntLinkReset>
      </Toolbar>
      <Collapse in={open}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              <IntLinkReset to="/">
                Home
              </IntLinkReset>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Search />
          </ListItem>
          {nav.map(({list, text, to}) => list ? (
            <NavListButton text={text} list={list} key={text} />
          ) : (
            <ListItem button key={text}>
              <ListItemText>
                <IntLinkReset to={to}>
                  <Typography variant="subtitle1">
                    {text}
                  </Typography>
                </IntLinkReset>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </AppBar>
  )
}

export default MobileHeader
