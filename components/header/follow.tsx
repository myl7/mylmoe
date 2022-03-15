import React, { FC, useState } from 'react'
import { Button, ButtonProps, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { AddAlert as AddAlertIcon, RssFeed as RssFeedIcon, Telegram as TelegramIcon } from '@mui/icons-material'
import { blue, yellow } from '@mui/material/colors'
import site from '../../content/site'
import ExtLinkSign from '../links/extLinkSign'

const Follow: FC<ButtonProps> = props => {
  const [elem, setElem] = useState<Element | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setElem(e.currentTarget)

  const handleClose = () => setElem(null)

  const handleGo = (href: string) => () => window.location.assign(href)

  return (
    <>
      <Button
        aria-controls="follow-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<AddAlertIcon color="secondary" />}
        {...props}
      >
        <Typography variant="subtitle1">Follow</Typography>
      </Button>
      <Menu
        id="follow-menu"
        anchorEl={elem}
        keepMounted
        open={Boolean(elem)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableScrollLock={true}
      >
        <MenuItem onClick={handleGo(`${site.url}/rss.xml`)}>
          <ListItemIcon style={{ minWidth: 'auto', marginRight: '0.5em' }}>
            <RssFeedIcon style={{ color: yellow[800] }} />
          </ListItemIcon>
          <ListItemText primary="RSS" />
        </MenuItem>
        <MenuItem onClick={handleGo(`https://t.me/${site.tgChannel}`)}>
          <ListItemIcon style={{ minWidth: 'auto', marginRight: '0.5em' }}>
            <TelegramIcon style={{ color: blue[500] }} />
          </ListItemIcon>
          <ListItemText primary="Telegram" />
          <span className="ext-link">
            <ExtLinkSign />
          </span>
        </MenuItem>
      </Menu>
    </>
  )
}

export default Follow
