import React from 'react'
import {Fab} from '@material-ui/core'
import {ArrowUpward} from '@material-ui/icons'
import {animateScroll} from 'react-scroll/modules'

const style = {
  position: 'fixed',
  top: '5.15em',
  right: '0.75em'
}

const GoTop = () => {
  const handleClick = () => animateScroll.scrollToTop()

  return (
    <Fab aria-label="Go top" color="primary" onClick={handleClick} size="medium" style={style}>
      <ArrowUpward />
    </Fab>
  )
}

export default GoTop
