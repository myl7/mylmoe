import React, {useState} from 'react'
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab'
import {ArrowUpward as ArrowUpwardIcon} from '@material-ui/icons'
import {animateScroll} from 'react-scroll'

const style = {
  position: 'fixed',
  bottom: '1em',
  right: '1em'
}

const Action = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleGoTopClick = () => {
    handleClose()
    animateScroll.scrollToTop()
  }

  return (
    <SpeedDial ariaLabel="Actions" icon={
      <SpeedDialIcon />
    } open={open} onOpen={handleOpen} onClose={handleClose} style={style}>
      <SpeedDialAction icon={
        <ArrowUpwardIcon color="secondary" />
      } tooltipTitle="Top" onClick={handleGoTopClick} title="Top" FabProps={{size: 'medium'}} />
    </SpeedDial>
  )
}

export default Action
