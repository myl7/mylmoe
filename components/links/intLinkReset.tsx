import {CSSProperties, FC} from 'react'
import {LinkProps} from '@material-ui/core'
import {LinkProps as NextLinkProps} from 'next/link'
import IntLink from './intLink'

const style: CSSProperties = {
  color: 'inherit',
  textDecoration: 'inherit'
}

const IntLinkReset: FC<NextLinkProps&{linkProps?: LinkProps}> = props => {
  return <IntLink {...props} linkProps={{style: style}} />
}

export default IntLinkReset
