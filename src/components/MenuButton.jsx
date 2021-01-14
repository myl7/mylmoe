import React, {useState} from 'react'
import {Button, Menu, MenuItem} from '@material-ui/core'

export default (props) => {
  let {id, items, ...others} = props

  const [menuElem, setMenuElem] = useState(null)

  const handleMenuClick = e => setMenuElem(e.currentTarget)
  const handleMenuClose = () => setMenuElem(null)

  return (
    <>
      <Button aria-controls={id} aria-haspopup={'true'} variant={'outlined'} onClick={handleMenuClick} {...others} />
      <Menu id={id} anchorEl={menuElem} keepMounted open={Boolean(menuElem)} onClose={handleMenuClose}
            getContentAnchorEl={null} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}>
        {items.map((item, i) => <MenuItem key={i} {...item} onClick={handleMenuClose} />)}
      </Menu>
    </>
  )
}
