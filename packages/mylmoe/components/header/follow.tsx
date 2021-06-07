import React, {FC, useState} from 'react'
import {Button, ButtonProps, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from '@material-ui/core'
import {AddAlert as AddAlertIcon, RssFeed as RssFeedIcon, Telegram as TelegramIcon} from '@material-ui/icons'
import ExtLinkReset from '../links/extLinkReset'
import {blue, yellow} from '@material-ui/core/colors'
import site from '../../config/site'

const Follow: FC<ButtonProps> = props => {
  const [elem, setElem] = useState<Element|null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setElem(e.currentTarget)

  const handleClose = () => setElem(null)

  return (
    <>
      <Button aria-controls="follow-menu" aria-haspopup="true" onClick={handleClick} startIcon={
        <AddAlertIcon color="secondary" />
      } {...props}>
        <Typography variant="subtitle1">
          Follow
        </Typography>
      </Button>
      <Menu id="follow-menu" anchorEl={elem} keepMounted open={Boolean(elem)} onClose={handleClose}
            getContentAnchorEl={null} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}>
        <ExtLinkReset href={`${site.url}/rss.xml`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon style={{minWidth: 'auto', marginRight: '0.5em'}}>
              <RssFeedIcon style={{color: yellow[800]}} />
            </ListItemIcon>
            <ListItemText primary="RSS" />
          </MenuItem>
        </ExtLinkReset>
        <ExtLinkReset href={`https://t.me/${site.tgChannel}`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon style={{minWidth: 'auto', marginRight: '0.5em'}}>
              <TelegramIcon style={{color: blue[500]}} />
            </ListItemIcon>
            <ListItemText primary="Telegram" />
          </MenuItem>
        </ExtLinkReset>
      </Menu>
    </>
  )
}

export default Follow
