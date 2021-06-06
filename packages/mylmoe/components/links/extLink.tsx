import {forwardRef} from 'react'
import {Link, LinkProps} from '@material-ui/core'

const ExtLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <Link target="_blank" rel="noopener" ref={ref} {...props} />
})

export default ExtLink
