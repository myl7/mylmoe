import React, {useState} from 'react'
import {Button, Menu, MenuItem, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  menuPaper: {
    backgroundColor: '#202020'
  }
})

export default (props) => {
  let {id, items, ...others} = props

  const classes = useStyles()

  const [MenuElem, setMenuElem] = useState(null)

  const handleMenuClick = e => setMenuElem(e.currentTarget)
  const handleMenuClose = () => setMenuElem(null)

  return (
    <>
      <Button aria-controls={id} aria-haspopup={'true'} onClick={handleMenuClick} variant={'outlined'}
              color={'primary'} {...others} />
      <Menu id={id} anchorEl={MenuElem} keepMounted open={Boolean(MenuElem)} onClose={handleMenuClose}
            getContentAnchorEl={null} classes={{paper: classes.menuPaper}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}>
        {items.map((item, i) => <MenuItem key={i} {...item} onClick={handleMenuClose} />)}
      </Menu>
    </>
  )
}
