import React, {useState} from 'react'
import {Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from '@material-ui/core'
import {AddAlert as AddAlertIcon, RssFeed as RssFeedIcon, Telegram as TelegramIcon} from '@material-ui/icons'
import ExtLinkReset from '../links/extLinkReset'
import {graphql, useStaticQuery} from 'gatsby'
import {blue, yellow} from '@material-ui/core/colors'

const Follow = props => {
  const {...others} = props

  const [elem, setElem] = useState(null)

  const handleClick = e => setElem(e.currentTarget)

  const handleClose = () => setElem(null)

  const data = useStaticQuery(graphql`
    query FollowQuery {
      site {
        siteMetadata {
          siteUrl
          telegramChannel
        }
      }
    }
  `)
  const {siteUrl, telegramChannel} = data.site.siteMetadata

  return (
    <>
      <Button aria-controls="follow-menu" aria-haspopup="true" onClick={handleClick} startIcon={
        <AddAlertIcon color="secondary" />
      } {...others}>
        <Typography variant="subtitle1">
          Follow
        </Typography>
      </Button>
      <Menu id="follow-menu" anchorEl={elem} keepMounted open={Boolean(elem)} onClose={handleClose}
            getContentAnchorEl={null} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}>
        <ExtLinkReset href={siteUrl + '/rss.xml'}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon style={{minWidth: 'auto', marginRight: '0.5em'}}>
              <RssFeedIcon style={{color: yellow[800]}} />
            </ListItemIcon>
            <ListItemText primary="RSS" />
          </MenuItem>
        </ExtLinkReset>
        <ExtLinkReset href={'https://t.me/' + telegramChannel}>
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
