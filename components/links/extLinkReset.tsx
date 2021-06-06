import {CSSProperties, forwardRef} from 'react'
import {LinkProps} from '@material-ui/core'
import ExtLink from './extLink'

const style: CSSProperties = {
  color: 'inherit',
  textDecoration: 'inherit'
}

const ExtLinkReset = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <ExtLink ref={ref} style={style} {...props} />
})

export default ExtLinkReset
