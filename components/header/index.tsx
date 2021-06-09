import MobileHeader from './mobileHeader'
import {AppBar, Avatar, Box, IconButton, Toolbar, Typography} from '@material-ui/core'
import nav from '../../config/nav'
import {Home as HomeIcon} from '@material-ui/icons'
import NavMenuButton from './navMenuButton'
import ThemeToggle from './themeSwitch'
import Search from './search'
import Follow from './follow'
import site from '../../config/site'
import {useRouter} from 'next/router'
import IntLink from '../links/intLink'

const Header = () => {
  const router = useRouter()

  const handleGo = (href: string) => () => router.push(href)

  return (
    <>
      <Box display={{xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none'}}>
        <MobileHeader />
      </Box>
      <Box display={{xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block'}}>
        <AppBar position="relative" color="default" component="header">
          <Toolbar component="nav">
            <IconButton style={{marginLeft: '-0.5em'}} onClick={handleGo('/')} aria-label="Home">
              <HomeIcon color="primary" />
            </IconButton>
            <IntLink href="/">
              <Typography variant="h6">
                mylmoe
              </Typography>
            </IntLink>
            {nav.map(({list, name}) => (
              <NavMenuButton name={name} list={list} key={name} style={{marginLeft: '1em'}} />
            ))}
            <div style={{flexGrow: 1}} />
            <Search />
            <ThemeToggle />
            <Typography variant="subtitle1">
              Dark
            </Typography>
            <Follow style={{marginLeft: '0.5em', marginRight: '0.5em'}} />
            <IntLink href="/pages/about">
              <Avatar alt={`Avatar of ${site.name}`} src={site.avatar} />
            </IntLink>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
