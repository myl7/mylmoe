import React, {useState} from 'react'
import {Button, Menu, MenuItem, Typography} from '@material-ui/core'
import IntLinkReset from '../links/intLinkReset'
import {genTo} from '../../../content/nav'

const NavMenuButton = props => {
  const {text, list, ...others} = props

  const menuId = text.toLowerCase().replace(' ', '-')

  const [elem, setElem] = useState(null)

  const handleClick = e => setElem(e.currentTarget)

  const handleClose = () => setElem(null)

  return (
    <>
      <Button variant="outlined" aria-controls={menuId} aria-haspopup={true} onClick={handleClick} {...others}>
        <Typography variant="subtitle1">
          {text}
        </Typography>
      </Button>
      <Menu id={menuId} className="header-menu" anchorEl={elem} keepMounted open={Boolean(elem)} onClose={handleClose}>
        {list.map(({text, to}) => (
          <MenuItem onClick={handleClose} key={text}>
            <IntLinkReset to={to ? to : genTo(text)}>
              <Typography variant="subtitle1">
                {text}
              </Typography>
            </IntLinkReset>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default NavMenuButton
