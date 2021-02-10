import React from 'react'
import {useXs} from '../../utils/screenSize'
import MobileHeader from './mobileHeader'
import {AppBar, Avatar, Button, IconButton, Toolbar, Typography} from '@material-ui/core'
import nav from '../../../content/nav'
import {graphql, useStaticQuery} from 'gatsby'
import {Home as HomeIcon} from '@material-ui/icons'
import gravatar from '../../utils/gravatar'
import IntLinkReset from '../links/intLinkReset'
import NavMenuButton from './navMenuButton'
import ThemeSwitch from './themeSwitch'

const Header = () => {
  const isXs = useXs()

  const data = useStaticQuery(graphql`
    query HeaderQuery {
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

  return isXs ? (
    <MobileHeader />
  ) : (
    <AppBar position="absolute" color="default" component="header">
      <Toolbar component="nav">
        <IconButton style={{marginLeft: '-0.5em'}}>
          <IntLinkReset to="/">
            <HomeIcon color="primary" />
          </IntLinkReset>
        </IconButton>
        <IntLinkReset to="/">
          <Typography variant="h6">
            mylmoe
          </Typography>
        </IntLinkReset>
        {nav.map(({list, text, to}) => list ? (
          <NavMenuButton text={text} list={list} key={text} style={{marginLeft: '1em'}} />
        ) : (
          <Button variant="outlined" style={{marginLeft: '1em'}} key={text}>
            <IntLinkReset to={to}>
              <Typography variant="subtitle1">
                {text}
              </Typography>
            </IntLinkReset>
          </Button>
        ))}
        <div style={{flexGrow: 1}} />
        <ThemeSwitch />
        <Typography variant="subtitle1" style={{marginRight: '1em'}}>
          Dark
        </Typography>
        <IntLinkReset to="/about">
          <Avatar alt={'Avatar of ' + name} src={avatarUrl} />
        </IntLinkReset>
      </Toolbar>
    </AppBar>
  )
}

export default Header
