// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Button,
  ClickAwayListener,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material'
import nav from '../../content/nav'
import NavListButton from './navListButton'
import ThemeToggle from './themeSwitch'
import Search from './search'
import Follow from './follow'
import site from '../../content/site'
import IntLink from '../links/intLink'
import { useRouter } from 'next/router'

const MobileHeader = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(open => !open)
  const handleClose = () => setOpen(false)

  const router = useRouter()

  const handleGo = (href: string) => () => router.push(href)

  return (
    <ClickAwayListener onClickAway={open ? handleClose : () => 0}>
      <AppBar position="fixed" color="default" component="header">
        <Toolbar style={{ paddingLeft: '1em' }} component="nav">
          <IconButton onClick={handleClick} style={{ marginLeft: '-0.5em' }} aria-label="Menu">
            <MenuIcon color="primary" />
          </IconButton>
          <Button onClick={handleClick}>
            <Typography variant="h6" color="primary">
              mylmoe
            </Typography>
          </Button>
          <div style={{ flexGrow: 1 }} />
          <ThemeToggle />
          <Typography variant="subtitle1">Dark</Typography>
          <Follow style={{ marginLeft: '0.5em' }} />
          <IntLink href="/pages/about">
            <Avatar alt={`Avatar of ${site.name}`} src={site.avatar} />
          </IntLink>
        </Toolbar>
        <Collapse in={open}>
          <div>
            <List>
              <ListItem button onClick={handleGo('/')}>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>
              <ListItem>
                <Search />
              </ListItem>
              {nav.map(({ list, name }) => (
                <NavListButton name={name} list={list} key={name} handleRootClose={handleClose} />
              ))}
            </List>
          </div>
        </Collapse>
      </AppBar>
    </ClickAwayListener>
  )
}

export default MobileHeader
