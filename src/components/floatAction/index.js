import React, {useState} from 'react'
import {SpeedDial, SpeedDialIcon} from '@material-ui/lab'
import GoTop from './goTop'

const style = {
  position: 'fixed',
  bottom: '1em',
  right: '1em'
}

const FloatAction = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <SpeedDial ariaLabel="Floating actions" icon={
      <SpeedDialIcon />
    } open={open} onOpen={handleOpen} onClose={handleClose} style={style}>
      <GoTop onClick={handleClose} FabProps={{size: 'medium'}} />
    </SpeedDial>
  )
}

export default FloatAction
