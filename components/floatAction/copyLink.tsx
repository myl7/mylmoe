import React, { FC } from 'react'
import { SpeedDialAction, SpeedDialActionProps } from '@material-ui/lab'
import { Link as LinkIcon } from '@material-ui/icons'

const CopyLink: FC<SpeedDialActionProps> = props => {
  const { onClick, ...others } = props

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick!(e)
    const input = document.createElement('input')
    const meta: HTMLLinkElement = document.querySelector('link[rel=canonical]')!
    const link = meta.href
    document.body.appendChild(input)
    input.value = link
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
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
