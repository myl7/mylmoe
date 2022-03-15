import React, { FC } from 'react'
import { ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material'
import { SpeedDialAction, SpeedDialActionProps } from '@mui/material'
import { animateScroll } from 'react-scroll'

const GoTop: FC<SpeedDialActionProps> = props => {
  const { onClick, ...others } = props

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick!(e)
    animateScroll.scrollToTop()
  }

  return (
    <SpeedDialAction
      icon={<ArrowUpwardIcon color="secondary" />}
      tooltipTitle="Go top"
      onClick={handleClick}
      title="Go top"
      {...others}
    />
  )
}

export default GoTop
