import {Launch as LaunchIcon} from '@material-ui/icons'
import {FC} from 'react'
import {SvgIconProps} from '@material-ui/core'

const ExtLinkSign: FC<SvgIconProps> = props => {
  return <LaunchIcon style={{fontSize: '0.8rem'}} {...props} />
}

export default ExtLinkSign
