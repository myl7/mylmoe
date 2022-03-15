import MobileHeader from './mobileHeader'
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import nav from '../../content/nav'
import { Home as HomeIcon } from '@mui/icons-material'
import NavMenuButton from './navMenuButton'
import ThemeToggle from './themeSwitch'
import Search from './search'
import Follow from './follow'
import site from '../../content/site'
import { useRouter } from 'next/router'
import IntLink from '../links/intLink'

const useStyles = makeStyles({
  avatar: {
    transition: 'transform 0.6s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'rotate(360deg)',
    },
  },
})

const Header = () => {
  const router = useRouter()
  const classes = useStyles()

  const handleGo = (href: string) => () => router.push(href)

  return (
    <>
      <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}>
        <MobileHeader />
      </Box>
      <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
        <AppBar position="fixed" color="default" component="header">
          <Toolbar component="nav">
            <IconButton style={{ marginLeft: '-0.5em' }} onClick={handleGo('/')} aria-label="Home">
              <HomeIcon color="primary" />
            </IconButton>
            <IntLink href="/">
              <Typography variant="h6">mylmoe</Typography>
            </IntLink>
            {nav.map(({ list, name }) => (
              <NavMenuButton name={name} list={list} key={name} style={{ marginLeft: '1em' }} />
            ))}
            <div style={{ flexGrow: 1 }} />
            <Search />
            <ThemeToggle />
            <Typography variant="subtitle1">Dark</Typography>
            <Follow style={{ marginLeft: '0.5em', marginRight: '0.5em' }} />
            <Avatar
              role="button"
              className={classes.avatar}
              alt={`Avatar of ${site.name}`}
              src={site.avatar}
              onClick={handleGo('/pages/about')}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
