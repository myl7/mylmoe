import React, {useState} from 'react'
import {SpeedDialAction} from '@material-ui/lab'
import {Share as ShareIcon} from '@material-ui/icons'
import ShareDialog from './shareDialog'

const Share = props => {
  const {onClick, ...others} = props

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    onClick()
    setOpen(true)
  }

  return (
    <>
      <SpeedDialAction icon={
        <ShareIcon color="secondary" />
      } tooltipTitle="Share" onClick={handleClick} title="Share" {...others} />
      <ShareDialog open={open} setOpen={setOpen} />
    </>
  )
}

export default Share
