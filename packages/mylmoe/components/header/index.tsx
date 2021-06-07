import MobileHeader from './mobileHeader'
import {AppBar, Avatar, Box, IconButton, Toolbar, Typography} from '@material-ui/core'
import nav from '../../config/nav'
import {Home as HomeIcon} from '@material-ui/icons'
import IntLinkReset from '../links/intLinkReset'
import NavMenuButton from './navMenuButton'
import ThemeToggle from './themeSwitch'
import Search from './search'
import Follow from './follow'
import site from '../../config/site'

const Header = () => {
  return (
    <>
      <Box display={{xs: 'block', sm: 'none'}}>
        <MobileHeader />
      </Box>
      <Box display={{xs: 'none', sm: 'block'}}>
        <AppBar position="fixed" color="default" component="header">
          <Toolbar component="nav">
            <IconButton style={{marginLeft: '-0.5em'}}>
              <IntLinkReset href="/">
                <HomeIcon color="primary" />
              </IntLinkReset>
            </IconButton>
            <IntLinkReset href="/">
              <Typography variant="h6">
                mylmoe
              </Typography>
            </IntLinkReset>
            {nav.map(({list, name}) => (
              <NavMenuButton name={name} list={list} key={name} style={{marginLeft: '1em'}} />
            ))}
            <div style={{flexGrow: 1}} />
            <Search style={{width: 'auto'}} />
            <ThemeToggle />
            <Typography variant="subtitle1">
              Dark
            </Typography>
            <Follow style={{marginLeft: '0.5em'}} />
            <IntLinkReset href="/pages/about">
              <Avatar alt={`Avatar of ${site.name}`} src={site.avatar} />
            </IntLinkReset>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
