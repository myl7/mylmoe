import React from 'react'
import {Fab} from '@material-ui/core'
import {ArrowUpward as ArrowUpwardIcon} from '@material-ui/icons'
import {animateScroll} from 'react-scroll/modules'

const style = {
  position: 'fixed',
  bottom: '1em',
  right: '1em'
}

const GoTop = () => {
  const handleClick = () => animateScroll.scrollToTop()

  return (
    <Fab aria-label="Go top" color="primary" onClick={handleClick} style={style}>
      <ArrowUpwardIcon />
    </Fab>
  )
}

export default GoTop
