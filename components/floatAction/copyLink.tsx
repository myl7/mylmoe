import React, { FC } from 'react'
import { SpeedDialAction, SpeedDialActionProps } from '@mui/material'
import { Link as LinkIcon } from '@mui/icons-material'

const CopyLink: FC<SpeedDialActionProps> = props => {
  const { onClick, ...others } = props

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick!(e)
    const input = document.createElement('input')
    const meta: HTMLLinkElement = document.querySelector('link[rel=canonical]')!
    const link = meta.href
    navigator.clipboard.writeText(link)
  }

  return (
    <SpeedDialAction
      icon={<LinkIcon color="secondary" />}
      tooltipTitle="Copy link"
      onClick={handleClick}
      title="Copy link"
      {...others}
    />
  )
}

export default CopyLink
