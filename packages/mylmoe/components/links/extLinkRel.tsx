import {forwardRef} from 'react'
import {Link, LinkProps} from '@material-ui/core'

const ExtLinkRel = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <Link target="_blank" ref={ref} {...props} />
})

export default ExtLinkRel
