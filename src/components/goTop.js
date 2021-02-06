import React from 'react'
import {Fab} from '@material-ui/core'
import {ArrowUpward} from '@material-ui/icons'
import {animateScroll} from 'react-scroll/modules'

const style = {
  position: 'fixed',
  bottom: '2em',
  right: '2em'
}

const GoTop = () => {
  const handleClick = () => animateScroll.scrollToTop()

  return (
    <Fab aria-label="Go top" color="primary" onClick={handleClick} style={style}>
      <ArrowUpward />
    </Fab>
  )
}

export default GoTop
