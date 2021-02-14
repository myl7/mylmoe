import React from 'react'
import {ArrowUpward as ArrowUpwardIcon} from '@material-ui/icons'
import {SpeedDialAction} from '@material-ui/lab'
import {animateScroll} from 'react-scroll'

const GoTop = props => {
  const {onClick, ...others} = props

  const handleClick = () => {
    onClick()
    animateScroll.scrollToTop()
  }

  return (
    <SpeedDialAction icon={
      <ArrowUpwardIcon color="secondary" />
    } tooltipTitle="Go top" onClick={handleClick} title="Go top" {...others} />
  )
}

export default GoTop
