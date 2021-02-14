import React from 'react'
import {SpeedDialAction} from '@material-ui/lab'
import {Link as LinkIcon} from '@material-ui/icons'

const CopyLink = props => {
  const {onClick, ...others} = props

  const handleClick = () => {
    onClick()
    const input = document.createElement('input')
    const meta = document.querySelector('link[rel=canonical]')
    const link = meta.href
    document.body.appendChild(input)
    input.value = link
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  return (
    <SpeedDialAction icon={
      <LinkIcon color="secondary" />
    } tooltipTitle="Copy link" onClick={handleClick} title="Copy link" {...others} />
  )
}

export default CopyLink
