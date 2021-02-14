import React from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import {shareClass} from '../shareThis'

const ShareDialog = props => {
  const {open, setOpen} = props

  const handleClose = () => setOpen(false)

  return (
    <Dialog keepMounted open={open} aria-labelledby="share-dialog-title" onClose={handleClose}>
      <DialogTitle id="share-dialog-title">Share to?</DialogTitle>
      <DialogContent>
        <div className={shareClass} />
      </DialogContent>
    </Dialog>
  )
}

export default ShareDialog
