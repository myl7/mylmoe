import { Launch as LaunchIcon } from '@mui/icons-material'
import { FC } from 'react'
import { SvgIconProps } from '@mui/material'

const ExtLinkSign: FC<SvgIconProps> = props => {
  return <LaunchIcon style={{ fontSize: '0.8rem' }} {...props} />
}

export default ExtLinkSign
